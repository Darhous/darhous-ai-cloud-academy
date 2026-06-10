# Performance Audit

---

## Bundle Analysis (Code-Level)

### framer-motion Usage
- **Imported in:** 20+ components across landing, portal pages, and cards
- `HomepageClient` renders 10+ sections each using framer-motion
- `PortalGrid`, `EcosystemMap`, all portal intro sections use `motion.div`
- **Risk:** framer-motion is ~50KB gzipped. Heavy use without code-splitting inflates the initial client bundle.
- **Mitigation in place:** `useReducedMotion()` is used throughout — motion disabled for prefers-reduced-motion users

### Heavy Client Components
- `HomepageClient` is a full "use client" component rendering the entire landing page
- All landing sections are client-side due to the parent being client
- Framer-motion's `whileInView` requires client-side execution
- **Impact:** The entire landing page must hydrate on the client, delaying TTI

### AdminDashboardClient
- 327KB+ of JavaScript for one component
- Imports from 20+ data files on load
- All static data (courses, tools, lessons, projects, etc.) is bundled into the admin bundle
- **Risk:** Admin page has extremely large JS payload — acceptable for admin-only, bad if accidentally bundled with public pages

### Static Data in Bundles
- `data/courses.ts` (807 lines), `data/blog.ts` (1532 lines), `data/digital-exam-subjects.ts` (1032 lines)
- These are imported at module level and included in the JS bundle
- **Risk:** Public pages that import large static files (e.g., IoT lessons) increase bundle size

### Google Fonts
```css
@import url("https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=Geist:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap");
```
- 6 font families loaded via CSS @import
- @import in CSS is render-blocking
- 6 font families × multiple weights = large font payload
- **Recommendation:** Use Next.js `next/font` for automatic optimization (subsets, preloading, no flash)

---

## Animation Performance

### Fixed Position Effects
- Layout background: 1 fixed radial gradient orb (reduced from 3 in Phase 5)
- Landing hero: 2 ambient orbs (absolute positioned)
- Portal pages: 2 fixed orbs on each portal landing page
- **Risk:** Multiple fixed-position elements with `filter: blur()` are GPU-intensive on mobile devices

### Framer Motion Variants
- Multiple sections use `whileInView` with `viewport={{ once: true }}`
- `once: true` prevents repeated re-animations — good
- Stagger effects (0.06s between cards) are reasonable
- **Risk:** On slow devices, many stagger items could cause visible jank

### InteractiveSurface (3D Tilt)
- Uses `addEventListener("pointermove")` per surface instance
- 10+ instances on homepage (EcosystemMap + PortalGrid)
- Each fires on every mouse movement over that element
- No `throttle()` or `requestAnimationFrame` wrapper visible in the implementation
- **Risk:** Rapid pointermove events on 10+ surfaces could cause performance issues

---

## Image Optimization

- `og-image.svg` used as OG image (social sharing) — SVGs may not render in all social platforms
- Portal icons are emoji (✅ lightweight, no image files)
- No `next/image` usage found in primary content cards
- Logo/brand is text + SVG icon from lucide-react (no external image)
- **Risk:** No image CDN or optimization pipeline found — if real images are added later, they need `next/image`

---

## Hydration Risk

- `HomepageClient` is "use client" with `mounted` state checks in CinematicIntro and SmartPlatformTour
- Pattern: `if (!mounted) return null` prevents hydration mismatch ✅
- `suppressHydrationWarning` on `<html>` and `<body>` for theme init ✅
- **Risk:** Minimal — hydration handled correctly

---

## Mobile Performance

- Multiple `backdrop-filter: blur()` effects (glass-panel, glass-card classes)
- `backdrop-filter` is GPU-intensive on mobile
- Fixed backgrounds + blur = significant mobile GPU load
- **Risk:** Performance on low-end mobile devices may be poor

---

## Vercel / Build Performance

- `next.config.ts` is minimal — no custom bundle optimizations
- No `experimental.optimizePackageImports` for large dependencies
- No image domains configured (no external image sources currently)
- No `output: 'standalone'` or `output: 'export'` — standard server mode

---

## Performance Verdict

| Area | Status | Risk |
|------|--------|------|
| Bundle size | ⚠️ Moderate risk | Large static data imports |
| framer-motion everywhere | ⚠️ Watch | Handled by reduced-motion |
| Google Fonts via @import | ❌ Render-blocking | Switch to next/font |
| Admin bundle size | ⚠️ Large | Acceptable for admin-only |
| Mobile GPU | ⚠️ Risk | Multiple blur effects |
| Hydration | ✅ Handled | mounted checks present |
| InteractiveSurface pointermove | ⚠️ Watch | No throttle/RAF |
| Image optimization | ⚠️ Future risk | No next/image yet |

**Overall: 5/10 — Functional but not production-optimized**
