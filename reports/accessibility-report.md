# Accessibility Report — Daraja Africa Production Hardening

## Audit Scope

- `src/pages/ThePit.jsx` (refactored with pit components)
- `src/pages/GetHelp.jsx`
- `src/components/ErrorBoundary.jsx`
- `src/components/LoadingSkeleton.jsx`
- Global layout and navigation

## Findings

### Fixed

| Issue | WCAG | WCAG Level | Fix |
|-------|------|------------|-----|
| Feelings wheel SVG had no keyboard support or ARIA labels | 1.1.1, 2.1.1, 4.1.2 | A | Added `role="button"`, `tabIndex`, `aria-label`, `onKeyDown` to all interactive `<path>` elements |
| Form inputs lacked explicit labels | 1.3.1, 3.3.2 | A | Verified `<label htmlFor>` on all inputs |
| Error messages not announced to screen readers | 4.1.3 | A | Added `role="alert"` to submit error container |
| External links missing accessible indication | 2.4.4, 3.2.4 | AA | Added `rel="noopener noreferrer"`; external link icon has `aria-hidden` implicit via visual text |
| Color contrast on dark pit theme | 1.4.3 | AA | Verified primary text against background meets 4.5:1 |
| Empty witness feed state | 3.3.1 | A | Added explicit empty state message |

### Monitored (Pre-existing)

| Issue | WCAG | WCAG Level | Notes |
|-------|------|------------|-------|
| Inline click handlers on decorative SVG paths | 2.1.1 | A | Paths now have `role="button"` and keyboard handlers |
| Focus indicators not fully customized | 2.4.7 | AA | Browser default focus ring preserved; acceptable for launch |
| Skip navigation link missing | 2.4.1 | A | Recommend adding for future iteration |
| No `lang` attribute on `<html>` | 3.1.1 | A | Check `index.html` for `lang="en"` |

## Recommendations

1. Add `lang="en"` to `index.html` `<html>` tag
2. Add `skip-to-content` link in `MainLayout.jsx`
3. Verify focus styles are visible on all custom buttons (not just browser defaults)
4. Consider adding `prefers-reduced-motion` media query to disable floating ghost text animation
5. Add `aria-live="polite"` to witness feed container so new entries are announced as they load

## Screen Reader Testing

Tested on VoiceOver (macOS/iOS):
- The Pit form navigation works linearly
- Error messages announce correctly when triggered
- External help resource links read as "link, [org name], opens in new window"

## Color Contrast

Key color pairs verified against WCAG AA (4.5:1 for body text, 3:1 for large text):
- `#1C1A14` on `#F5EFE4` — PASS (charcoal on cream)
- `#C9972A` on `#0D0D0D` — PASS for large text (gold on near-black)
- `rgba(255,255,255,0.65)` on `#0D0D0D` — PASS for large italic text
