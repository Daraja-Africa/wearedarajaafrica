-- newsletter_subscribers.sql
-- Newsletter subscription storage with RLS policies

-- Create the newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create index for efficient lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers (email);

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Drop existing policy to avoid conflicts
DROP POLICY IF EXISTS "Public insert newsletter_subscribers" ON newsletter_subscribers;

-- Allow public inserts (for anonymous newsletter signups)
CREATE POLICY "Public insert newsletter_subscribers"
  ON newsletter_subscribers FOR INSERT
  TO public
  WITH CHECK (true);

-- Drop read policy if exists (keep admin-only access)
DROP POLICY IF EXISTS "Service role all newsletter_subscribers" ON newsletter_subscribers;

-- Service role has full access for admin operations
CREATE POLICY "Service role all newsletter_subscribers"
  ON newsletter_subscribers FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);