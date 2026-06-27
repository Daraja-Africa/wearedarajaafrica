-- production_hardening.sql
-- Daraja Africa — Database hardening for production launch
-- Applied via Supabase Dashboard > SQL Editor or Supabase CLI

-- ===================================================
-- PHASE 1.2 — ROW LEVEL SECURITY (RLS)
-- ===================================================

-- Enable RLS on all writable application tables
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'pit_entries' AND rowsecurity = true) THEN
    ALTER TABLE pit_entries ENABLE ROW LEVEL SECURITY;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'support_requests' AND rowsecurity = true) THEN
    ALTER TABLE support_requests ENABLE ROW LEVEL SECURITY;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'moderation_logs' AND rowsecurity = true) THEN
    ALTER TABLE moderation_logs ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Drop existing policies to avoid conflicts
DO $$
BEGIN
  DROP POLICY IF EXISTS "Public read pit_entries" ON pit_entries;
  DROP POLICY IF EXISTS "Service role insert pit_entries" ON pit_entries;
  DROP POLICY IF EXISTS "Public read support_requests" ON support_requests;
  DROP POLICY IF EXISTS "Service role insert support_requests" ON support_requests;
  DROP POLICY IF EXISTS "Service role all moderation_logs" ON moderation_logs;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- pit_entries: Public read (witness mode), inserts only via service role (Edge Function)
CREATE POLICY "Public read pit_entries"
  ON pit_entries FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Service role insert pit_entries"
  ON pit_entries FOR INSERT
  TO service_role
  WITH CHECK (true);

-- support_requests: Insert only via service role, no public reads
CREATE POLICY "Service role insert support_requests"
  ON support_requests FOR INSERT
  TO service_role
  WITH CHECK (true);

-- moderation_logs: Server-only access
CREATE POLICY "Service role all moderation_logs"
  ON moderation_logs FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

-- ===================================================
-- PHASE 1.4 — SPAM / DUPLICATE PREVENTION
-- ===================================================

-- Rate limit log table
CREATE TABLE IF NOT EXISTS moderation_logs (
  id bigserial PRIMARY KEY,
  action text NOT NULL CHECK (action IN ('submission_approved','duplicate_blocked','content_blocked','content_reviewed','rate_limited','witness_view')),
  target_table text NOT NULL,
  reason text,
  client_ip text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_moderation_logs_ip_time
  ON moderation_logs (client_ip, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_moderation_logs_action_time
  ON moderation_logs (action, created_at DESC);

-- ===================================================
-- PHASE 1.5 — ABUSE MONITORING
-- ===================================================

-- Ensure pit_entries has moderation_status
ALTER TABLE pit_entries
  ADD COLUMN IF NOT EXISTS moderation_status text DEFAULT 'approved' NOT NULL;

ALTER TABLE support_requests
  ADD COLUMN IF NOT EXISTS moderation_status text DEFAULT 'approved' NOT NULL;

-- ===================================================
-- PHASE 3 — WITNESS MODE ABUSE MITIGATION
-- ===================================================

-- Deduplicate witness feed: prefer newest approved entries
-- This helper view removes exact text duplicates within a 24h window
CREATE OR REPLACE VIEW witness_feed_deduped AS
WITH ranked AS (
  SELECT
    id,
    text,
    emotion_category,
    sub_emotion,
    destination,
    created_at,
    moderation_status,
    row_number() OVER (
      PARTITION BY md5(lower(text))
      ORDER BY created_at DESC
    ) AS rn
  FROM pit_entries
  WHERE destination = 'pit'
    AND moderation_status = 'approved'
    AND created_at >= now() - interval '30 days'
)
SELECT * FROM ranked
WHERE rn = 1
ORDER BY created_at DESC
LIMIT 50;

-- Grant read access to the view
GRANT SELECT ON witness_feed_deduped TO anon, authenticated;

-- ===================================================
-- PHASE 2 — DATABASE FLOODING PROTECTION
-- ===================================================

-- Add per-IP submission tracking
CREATE TABLE IF NOT EXISTS submission_attempts (
  id bigserial PRIMARY KEY,
  client_ip text NOT NULL,
  table_name text NOT NULL,
  attempted_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_submission_attempts_ip_time
  ON submission_attempts (client_ip, attempted_at DESC);

-- Auto-cleanup old attempts (older than 1 hour) via cron if available
-- Otherwise rely on application-layer logic; old rows don't block if queries use strict time filtering.

-- ===================================================
-- PERFORMANCE — witness feed index
-- ===================================================

CREATE INDEX IF NOT EXISTS idx_pit_entries_dest_created
  ON pit_entries (destination, created_at DESC)
  WHERE destination = 'pit';
