# We Are Daraja Africa

A React application for anonymous emotional expression and youth mental health support, built with Supabase as the backend.

## Project Overview

Daraja Africa is a mental health initiative that bridges the youth mental health gap through empathy-driven education, peer connection, and professional guidance. This application provides:

- **The Pit** — Anonymous cathartic sharing with a moderated community feed
- **The Void** — Private, unsaved emotional releases with zero audience
- **Get Help** — Curated Kenyan mental health resources and support request intake
- **Programs & Resources** — Static informational pages for outreach

All user-generated content flows through a server-side moderation pipeline before reaching the database.

## Architecture Overview

```
Client (Vite + React)
    │
    ├── Direct SELECT queries (public data)
    │       └── Supabase RLS-enforced reads
    │
    └── Writes via Edge Function
            └── moderate-entry (Supabase Edge Function)
                    ├── Rate limit check (moderation_logs)
                    ├── Duplicate check (pit_entries)
                    ├── Content pattern check (security rules)
                    ├── moderation_logs INSERT
                    └── Database INSERT (service_role)
```

**Key principle:** All database writes bypass the client and pass through a single server-side moderation function.

## Folder Structure

```
├── supabase/
│   ├── functions/
│   │   └── moderate-entry/
│   │       └── index.ts          # Unified moderation Edge Function
│   └── migrations/
│       └── 20240101000000_production_hardening.sql
├── src/
│   ├── api/
│   │   └── moderation.js         # Client-side API wrapper
│   ├── components/
│   │   ├── pit/
│   │   │   ├── PitWheel.jsx
│   │   │   ├── WitnessWall.jsx
│   │   │   ├── EntryForm.jsx
│   │   │   ├── ReleaseFlow.jsx
│   │   │   ├── ConductModal.jsx
│   │   │   └── GhostBackground.jsx
│   │   ├── layout/
│   │   │   ├── MainLayout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── ErrorBoundary.jsx
│   │   └── LoadingSkeleton.jsx
│   ├── hooks/
│   │   └── useModeration.js      # Rate limit + cooldown hooks
│   ├ lib/
│   │   ├── supabase.js           # Supabase client
│   │   ├── query-client.js       # React Query client
│   │   └── monitoring.js         # Analytics + error tracking
│   ├── pages/
│   │   ├── ThePit.jsx            # Refactored to use pit components
│   │   ├── GetHelp.jsx           # Uses moderation API (no direct DB writes)
│   │   └── ...                   # Static informational pages
│   └── App.jsx                   # Lazy-loaded routes + error boundaries
└── public/
```

## Environment Variables

```bash
# Supabase
VITE_SUPABASE_URL=<your-project-url>
VITE_SUPABASE_ANON_KEY=<your-anon-key>

# Moderation (Edge Function URL override, optional)
VITE_MODERATION_ENDPOINT=<https://<ref>.supabase.co/functions/v1/moderate-entry>
```

All secrets live in `.env.local` (git-ignored). Never commit credentials.

## Supabase Setup

1. Create a Supabase project
2. Run the SQL migration: `supabase/migrations/20240101000000_production_hardening.sql`
3. Deploy the Edge Function: `supabase functions deploy moderate-entry`
4. Set the `SUPABASE_SERVICE_ROLE_KEY` secret in Supabase Dashboard > Edge Functions > Secrets
5. Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`

### Tables Created

- `pit_entries` — moderated anonymous entries
- `support_requests` — intake from Get Help form
- `moderation_logs` — audit trail for all moderation actions
- `witness_feed_deduped` — deduplicated view for Witness Mode

### RLS Policies

All app tables have RLS enabled:
- `pit_entries`: Public read; inserts only via Edge Function (service_role)
- `support_requests`: No public read; inserts only via Edge Function (service_role)
- `moderation_logs`: Server-only access

## Security Model

### Defense in Depth

1. **Client-side validation** — UX guidance, not a security boundary
2. **Edge Function moderation** — primary enforcement point
3. **PostgreSQL RLS** — blocks direct client-to-database bypass
4. **Pattern checks** — blocks credible threats and self-harm encouragement
5. **Rate limiting** — 10 submissions per 5 minutes per IP via moderation_logs
6. **Duplicate detection** — prevents exact-text re-submission within 5 minutes

### What the Moderation Pipeline Blocks

- Credible threats of violence toward self or others
- Exact duplicate submissions (flooding)
- Rapid-fire submissions (rate limits)
- Unauthorized direct database writes (RLS + Edge Function)

### What It Cannot Block

- VPN / botnet IP rotation (use additional CAPTCHA or provider-level WAF)
- Content hosted on external services (extend moderation function as needed)

## Moderation Pipeline

```
User submits
    │
    ▼
Client validation (required fields, length)
    │
    ▼
Rate limit check (moderation_logs, last 5 min)
    │
    ▼
Duplicate check (pit_entries exact text, last 5 min)
    │
    ▼
Content pattern check (regex rules for threats, hate speech)
    │
    ├── Blocked → moderation_logs + 422 response
    │
    ▼
Database INSERT (service_role via Edge Function)
    │
    ▼
Success response → optimistic UI update
```

To integrate AI moderation in the future: add an API call inside the Edge Function before the INSERT.

## Deployment Instructions

### Static Host (Vercel / Netlify / Cloudflare Pages)

1. Build: `npm run build`
2. Deploy the `dist/` folder
3. Set environment variables in the hosting dashboard
4. Deploy Edge Function: `supabase functions deploy moderate-entry`

### Full Stack (Supabase Hosting)

```bash
npm install
supabase start
supabase functions deploy moderate-entry
npm run build
```

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Lint
npm run lint

# Type check
npm run typecheck

# Build for production
npm run build
```

### Supabase Local

```bash
# Start local Supabase
supabase start

# Apply migrations
supabase db push

# Serve Edge Functions locally
supabase functions serve
```

## Accessibility Notes

- All interactive SVG elements in the feelings wheel have `role="button"`, `tabIndex`, and `aria-label`
- Form inputs have associated `<label>` elements and `aria-required` attributes
- Error messages use `role="alert"` for screen reader announcement
- Links to external sites include `rel="noopener noreferrer"`
- Color contrast meets WCAG AA for primary text
- Focus states are preserved on all interactive elements

## Analytics and Monitoring

Lightweight, privacy-respecting tracking:

- **Client-side wrapper**: `src/lib/monitoring.js`
  - `trackEvent(name, properties)`
  - `trackError(error, context)`
  - `trackModeration(action, table, reason)`
- **Backend audit**: `moderation_logs` table captures every moderation decision
- **Philosophy**: No personal data collected; IPs used only for rate limiting and not stored beyond rollover

## Future Roadmap

- [ ] AI moderation integration (content safety API inside Edge Function)
- [ ] CAPTCHA for high-threat contexts
- [ ] Admin dashboard for moderation review queue
- [ ] Redis-backed rate limiting for Edge Function
- [ ] Realtime witness feed via Supabase Realtime
- [ ] Multi-language support (Swahili primary)
- [ ] Content export for user privacy compliance
- [ ] Offline-capable PWA
