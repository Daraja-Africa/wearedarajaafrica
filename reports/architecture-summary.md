# Architecture Summary — Daraja Africa Production Hardening

## Overview

The application follows a **client-first static site** architecture backed by Supabase for data persistence and authentication. This hardening pass introduced a server-side moderation layer without requiring a custom backend.

## Pre-Hardening Architecture

```
Browser
  → React SPA (Vite)
    → Direct Supabase client writes (bypassable)
      → PostgreSQL
```

**Critical flaw:** Client-side code could write directly to `pit_entries` and `support_requests` with no server-side validation.

## Post-Hardening Architecture

```
Browser
  → React SPA (Vite)
    → API wrapper (src/api/moderation.js)
      → Supabase Edge Function (moderate-entry)
        → Rate limit check (moderation_log)
        → Duplicate check (pit_entries exact text)
        → Regex security checks
        → Database INSERT via service_role
          → PostgreSQL with RLS
```

## Data Flow

### Pit Entry (Write Path)

1. User selects destination (Pit or Void)
2. User writes entry → names emotion on wheel
3. Client calls `submitPitEntry()` API wrapper
4. API wrapper resolves client IP via ipify.org
5. Edge Function receives request
6. Edge Function checks rate limit in moderation_logs
7. Edge Function checks for exact duplicates in pit_entries
8. Edge Function applies content pattern rules (regex)
9. If blocked: logs to moderation_logs, returns 422
10. If passed: inserts into pit_entries, logs approval
11. Client updates Witness Mode feed optimistically

### Support Request (Write Path)

1. User submits Get Help form
2. Client calls `submitSupportRequest()`
3. Edge Function performs same rate/duplicate checks
4. Inserts into support_requests
5. Client shows confirmation UI

### Witness Mode (Read Path)

1. Client uses `witness_feed_deduped` SQL view
2. View deduplicates by exact text across 30 days
3. Returns newest approved entries, capped at 50
4. UI skeleton shown while loading; error state on failure

## Component Architecture

```
src/pages/ThePit.jsx
  → GhostBackground (animated meme text)
  → EntryForm (textarea + back/submit)
  → ReleaseFlow (emotion wheel + release button)
  → ConductModal (code of conduct gate)
  → WitnessWall (deduplicated, moderated feed)

src/components/ErrorBoundary.jsx
  → Global catch for React rendering errors

src/components/LoadingSkeleton.jsx
  → Route-level loading state for lazy-loaded pages
```

## State Management

- **Local React state** for pit modes and form fields
- **React Query** for server state (queries only; no mutations)
- **Session storage** for consent persistance
- **No Redux / Zustand / Jotai** — keeps bundle lean

## Security Boundaries

| Layer | Responsibility | Enforcement |
|-------|----------------|-------------|
| Edge Function | Moderation, rate limiting, deduplication | Primary |
| RLS policies | Block unauthorized direct DB writes | Primary |
| Client validation | Required fields, length, UX feedback | Secondary |
| Regex patterns | Block credible threats / self-harm | Primary |

## Technology Choices

- **Vite 6** — fast build, native ESM
- **React 18** — concurrent features not yet used
- **Supabase** — Postgres + Auth + Edge Functions
- **Tailwind CSS 3** — utility-first styling
- **Lucide React** — icon library
- **React Router 6** — client-side routing
- **TanStack Query** — server state caching
