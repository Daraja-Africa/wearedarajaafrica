# Security Report — Daraja Africa Production Hardening

## Executive Summary

This security hardening addressed the critical risk of **bypassable client-side database writes** by introducing a server-side moderation pipeline, Row Level Security audit, rate limiting, and abuse monitoring. All user-generated content now passes through a Supabase Edge Function before reaching the database.

## Findings

### P0 — Fixed

| ID | Vulnerability | Severity | Status |
|----|--------------|----------|--------|
| SEC-01 | Direct client-side Supabase writes bypass content moderation | P0 | Fixed |
| SEC-02 | No server-side validation of input | P0 | Fixed |
| SEC-03 | No rate limiting or flooding protection | P0 | Fixed |
| SEC-04 | No duplicate submission detection | P0 | Fixed |
| SEC-05 | No audit logging for moderation actions | P0 | Fixed |
| SEC-06 | RLS policies absent or incomplete | P0 | Fixed |

### P1 — Remediated

| ID | Finding | Severity | Status |
|----|---------|----------|--------|
| SEC-07 | Client-side only content filtering (bad word list) | P1 | Enhanced with server-side regex + audit log |
| SEC-08 | No input sanitization on Get Help form | P1 | Moved to Edge Function |

### P2 — Addressed

| ID | Finding | Severity | Status |
|----|---------|----------|--------|
| SEC-09 | No CAPTCHA / bot protection | P2 | Deferred to future roadmap |
| SEC-10 | No WAF / IP blocking | P2 | Deferred to hosting provider |

## Implemented Controls

### 1. Server-Side Moderation Pipeline

**Location:** `supabase/functions/moderate-entry/index.ts`

Flow:
```
Request → Rate Limit Check → Duplicate Check → Regex Security Check → DB Insert
```

- Runs on Supabase Edge Function (Deno runtime)
- Uses `service_role` key — bypasses RLS intentionally
- Logs all decisions to `moderation_logs`

### 2. Row Level Security (RLS)

**Location:** `supabase/migrations/20240101000000_production_hardening.sql`

Tables hardened:
- `pit_entries` — Public read allowed; inserts blocked for non-service-role
- `support_requests` — No public reads; inserts blocked for non-service-role
- `moderation_logs` — Server-only access

### 3. Rate Limiting

- **Client-side:** `useRateLimit` hook — 10 submissions per 5 minutes
- **Server-side:** `moderation_logs` table checked by IP
- **Cooldown:** 3-second anti-rapid-fire button disable

### 4. Pattern-Based Content Blocking

Regex rules block:
- Self-harm encouragement toward self
- Violence toward others
- Credible threats of violence
- Hate speech / genocide advocacy

Blocked content is routed to the Void instead of the Pit, with a user-facing explanation.

### 5. Abuse Monitoring

- Every moderation decision logged with IP, timestamp, action, and reason
- `witness_feed_deduped` SQL view prevents feed domination by duplicates
- 30-day retention window for moderation logs

## Attack Scenarios Addressed

### ATTACK #1: Direct Database Writes

**Before:** Any user could open DevTools and run:
```javascript
supabase.from('pit_entries').insert({ text: 'spam' })
```

**After:** RLS policies block direct inserts. Only the Edge Function (using `service_role`) can write. Client must go through validation.

### ATTACK #2: Database Flooding

**Before:** Unlimited inserts per second.

**After:**
- 10 requests per 5 minutes per IP (server-side)
- 3-second cooldown between client submissions
- Exact duplicate detection blocks re-submission of identical text

### ATTACK #3: Witness Mode Abuse

**Before:** One user could dominate feed with repeated identical entries.

**After:** `witness_feed_deduped` view shows only unique texts within 30 days, capped at 50 entries.

## Recommendations (Post-Launch)

1. Deploy Edge Function and verify secrets are configured
2. Monitor `moderation_logs` for patterns in the first 30 days
3. Consider CAPTCHA if bot traffic persists
4. Add AI moderation API for nuanced content assessment
5. Rotate `service_role` key periodically
6. Enable PostgreSQL Connection Pooling in Supabase

## Residual Risk

- **VPN / Botnet IP rotation:** Rate limiting by single IP can be bypassed with distributed botnets. Mitigation: add Cloudflare Turnstile or reCAPTCHA.
- **Supabase infrastructure compromise:** Trusts Supabase's security posture. Mitigation: enable 2FA, audit Supabase access logs.
- **xss in user-generated content:** Text entries are rendered as plain text in JSX (`{entry.text}`), preventing script injection. Do not switch to `dangerouslySetInnerHTML`.

## Authentication Notes

Currently the app does not require user authentication. All actions are anonymous. This is by design for the mental health use case, but means:
- No identity-based abuse prevention
- Rate limiting depends solely on IP
- Consider anonymous session tokens via localStorage for cross-session persistence if needed
