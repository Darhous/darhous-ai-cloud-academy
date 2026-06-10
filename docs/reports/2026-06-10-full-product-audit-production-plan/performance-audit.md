# Performance Audit

## Bundle risks

| Factor | Impact |
|--------|--------|
| Large static imports (`lessons/content.ts`, exam banks) | High — parsed at build |
| `framer-motion` on most landing sections | Medium |
| `recharts` in admin/dashboard | Medium — route-level |
| `@react-pdf/renderer` | High when certificate routes load |
| 88 routes | CI build ~2 min — acceptable |

## Client components

Heavy `"use client"` on landing, portals, admin. Homepage is fully client-rendered via `HomepageClient`.

## Images

Next Image usage inconsistent; some emoji icons instead of optimized assets.

## Rerenders

`InteractiveSurface` pointer listeners per card — OK for ~14 cards; scale poorly to 100+.

## Hydration

- `CinematicIntro` returns `null` until mounted — good pattern
- `Premium3DShowcaseCarousel` uses `window` in render path for reduced motion — would be risky if mounted

## Scroll/motion performance

- No scroll-jacking on homepage — good
- Multiple `whileInView` observers — acceptable
- Backdrop blur on glass panels — GPU cost on mobile

## Mobile

Touch correctly disables tilt. Large dashboard client may jank on low-end devices.

## Vercel build

CI at HEAD: **success** (run 27241835196). Local build: compile started; prior audits noted occasional EPERM/hang on Windows sandbox.

## Recommendations

1. Code-split admin panels
2. Dynamic import for PDF/chart modules
3. Paginate large static lists
4. Lazy-load below-fold landing sections
5. Virtualize long CMS tables

**Verdict:** Acceptable for beta; needs optimization before scale.
