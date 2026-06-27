# Launch Readiness Checklist

## P0 — Must Fix Before Launch

**Security**
- [ ] Migrate `supabase/migrations/20240101000000_production_hardening.sql` to Supabase production project
- [ ] Deploy `supabase/functions/moderate-entry/` to Supabase Edge Functions
- [ ] Set `SUPABASE_SERVICE_ROLE_KEY` as secret in Supabase Edge Functions dashboard
- [ ] Verify RLS policies are active on `pit_entries`, `support_requests`, `moderation_logs`
- [ ] Confirm `witness_feed_deduped` view is deployed

**Application Integrity**
- [ ] Run `npm run build` — **current status: PASS**
- [ ] Run `npm run lint` — **current status: PASS**
- [ ] Verify no client-side direct `supabase.from().insert()` calls remain in pages

**Moderation Pipeline**
- [ ] Test Edge Function via `curl` / Postman
- [ ] Verify rate limiting triggers at 10+ requests
- [ ] Verify duplicate detection blocks repeated identical text
- [ ] Verify regex blocks test threat patterns

## P1 — Should Fix Soon

**UX Resilience**
- [ ] Add a real `skip-to-content` link
- [ ] Add `lang="en"` to `index.html`
- [ ] Customize focus ring styles for dark theme (currently default browser ring)
- [ ] Add image optimization pipeline (`vite-plugin-imagemin` or equivalent)

**Monitoring**
- [ ] Set up log export from Supabase → external observability tool (even a simple webhook)
- [ ] Configure alerting for `submission_rate_limited` spikes
- [ ] Add Sentry or equivalent error tracking (currently only `__error` console tracking)

**Performance**
- [ ] Run Lighthouse and hit targets (FCP < 1.5s, LCP < 2.5s)
- [ ] Add `Cache-Control` headers to hosting provider
- [ ] Consider `vite-plugin-pwa` for offline support
- [ ] Audit images for `format="webp"` and proper sizing

## P2 — Nice to Have

**Feature Enhancements**
- [ ] CAPTCHA integration for high-threat contexts
- [ ] AI moderation API integration inside Edge Function
- [ ] Admin moderation review dashboard
- [ ] Redis-backed rate limiting (replace moderation_logs check)
- [ ] Supabase Realtime for live witness feed
- [ ] Multi-language support (Swahili primary)
- [ ] PWA manifest and service worker
- [ ] Email notifications for support requests

**Documentation**
- [ ] Add incident response playbook
- [ ] Document moderation escalation process
- [ ] Create operator runbook for deploying Edge Function updates

## Deployment Steps

1. **Database:** Run SQL migration in Supabase Dashboard
2. **Edge Function:** `supabase functions deploy moderate-entry`
3. **Secrets:** Add `SUPABASE_SERVICE_ROLE_KEY` in Edge Function secrets
4. **Environment:** Update `.env.local` with production URL/keys
5. **Build:** `npm run build`
6. **Deploy:** Upload `dist/` to hosting provider (Vercel / Netlify / Cloudflare Pages)
7. **Verify:** Run smoke tests against production URL
   - Submit a pit entry → verify it appears in witness feed
   - Submit a support request → verify success message
   - Trigger rate limit → verify 429 response
   - Test witness feed deduplication

## Rollback Plan

If moderation Edge Function fails in production:
1. Revert client code to direct Supabase inserts (git revert)
2. RLS policies already block direct writes, so reverting is safe
3. Database remains protected; no data loss occurs

## Support Contacts

- Supabase support: https://supabase.com/docs/support
- Edge Function logs: Supabase Dashboard > Edge Functions > Logs
- Database queries: Supabase Dashboard > Database > Query performance
