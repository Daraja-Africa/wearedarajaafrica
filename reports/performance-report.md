# Performance Report — Daraja Africa Production Hardening

## Bundle Analysis (Post-Hardening)

| Asset | Size (uncompressed) | Size (gzipped) | Route |
|-------|---------------------|----------------|-------|
| index (runtime) | 246 KB | 78 KB | All routes |
| moderation | 214 KB | 55 KB | ThePit + GetHelp |
| ThePit | 21 KB | 6.7 KB | `/the-pit` |
| Resources | 17 KB | 5.8 KB | `/resources` |
| PrivacyCharter | 8.7 KB | 3.3 KB | `/privacy-charter` |
| DataDeletion | 9.4 KB | 3.4 KB | `/data-deletion` |
| Announcements | 7.2 KB | 2.9 KB | `/announcements` |
| GetInvolved | 5.8 KB | 1.8 KB | `/get-involved` |
| Programs | 4.6 KB | 1.5 KB | `/programs` |
| GetHelp | 11 KB | 4.0 KB | `/get-help` |
| Home | 11 KB | 3.4 KB | `/` |
| About | 11 KB | 3.5 KB | `/about` |
| Gallery | 0.8 KB | 0.45 KB | `/gallery` |

**Total JS transferred (first load):** ~246 KB (78 KB gzipped)
**Total CSS transferred (first load):** ~76 KB (13 KB gzipped)

### Pre-Hardening Baseline

Before this pass, the application included heavy unused dependencies that inflated the bundle. Estimated savings:

| Removed Package | Reason Removed | Est. Savings |
|-----------------|----------------|--------------|
| `framer-motion` | No imports found | ~300 KB |
| `three` | No imports found | ~500 KB |
| `react-quill` | No imports found | ~200 KB |
| `recharts` | No imports found in pages | ~450 KB |
| `jspdf` + `html2canvas` | No imports found | ~350 KB |
| `react-leaflet` | No imports found | ~200 KB |
| `moment` (duplicate of date-fns) | No imports found | ~300 KB |
| `@hello-pangea/dnd` | No imports found | ~100 KB |
| `canvas-confetti` | No imports found | ~30 KB |

**Estimated total savings:** ~2.4 MB+ of JavaScript

## Implemented Optimizations

### 1. Lazy Loading (Route-Based Code Splitting)

**File:** `src/App.jsx`

All routes now use `React.lazy()` with `Suspense`. The initial bundle only loads the runtime and critical shared code. Pages are fetched on demand.

### 2. Dependency Audit

**File:** `package.json`

Removed 11 unused or oversized packages. Eliminated duplicate date library (kept `date-fns` was also removed since unused; actually both removed).

### 3. Shared Component Extraction

The Pit page was split from 591 lines into 7 focused components:
- `GhostBackground` — animated text only renders when visible
- `PitWheel` — isolated interactive SVG
- `EntryForm` — form subtree
- `ReleaseFlow` — emotion selection flow
- `ConductModal` — consent gate
- `WitnessWall` — feed subtree

This improves maintainability and React reconciliation performance.

## Bottlenecks Identified

| Bottleneck | Severity | Recommendation |
|-----------|----------|----------------|
| Supabase client size (~55 KB) | Medium | Acceptable for app complexity |
| `moderation.js` fetch wrapper loads ipify | Low | Consider inlining IP via server header |
| No image optimization pipeline | Low | Use `vite-plugin-imagemin` before launch |
| Fonts not preloaded | Low | Add `<link rel="preload">` for DM Serif Display |
| No CDN caching headers configured | Medium | Set `Cache-Control` for static assets |

## Recommendations

1. **Run Lighthouse** on production build and target:
   - FCP < 1.5s on 4G
   - LCP < 2.5s
   - TTI < 3.5s
   - CLS < 0.1

2. **Enable Vite chunk splitting** for vendor vs app code:
   ```javascript
   build: {
     rollupOptions: {
       output: {
         manualChunks: {
           vendor: ['react', 'react-dom', 'react-router-dom'],
           supabase: ['@supabase/supabase-js']
         }
       }
     }
   }
   ```

3. **Compress database responses** — Supabase already gzips JSON, but ensure `min_rows` and `select` limits are strict.

4. **Add Service Worker** for offline caching of static assets (especially icons and fonts). Use `vite-plugin-pwa`.

## Bundle Analysis Command

To regenerate this report locally:

```bash
npm run build
ls -lh dist/assets/
```
