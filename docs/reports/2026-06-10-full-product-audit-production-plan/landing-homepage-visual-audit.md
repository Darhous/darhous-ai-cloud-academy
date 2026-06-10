# Landing / Homepage Visual Audit

**Routes audited:** `/ar`, `/en` (via `src/app/[locale]/page.tsx` → `HomepageClient.tsx`)  
**HEAD:** `94348be86157f4d7b634069234ec89fb7ed5bc4b`

## Section mount order (live)

From `HomepageClient.tsx`:

1. `CinematicIntro` — fixed overlay, sessionStorage-gated
2. `SmartPlatformTour` — overlay, **never auto-opens** (Phase 5D)
3. `HeroSection` — hero + CTAs scroll to `#beginner-path`
4. `PathSelector` — 4-step wizard + week plan cards
5. `EcosystemMap` — 3×3 grid with mentor center + 6 portals
6. `PortalGrid` — all 8 portals including coming-soon
7. `MentorShowcase`
8. `HowItWorks`
9. `WhyDarhous` + `Stats`
10. `FinalCTA`
11. `CommunitySignup`

## Per-section findings

### Cinematic intro (`CinematicIntro.tsx`)

| Check | Result |
|-------|--------|
| Implemented | Yes — NexaLearn by Darhous splash |
| Rendered on first visit | Yes, unless `sessionStorage['darhous-cinematic-intro-seen-v1']` |
| Reduced motion | Skipped entirely |
| Blocks homepage | Yes — full-screen `z-[9999]` for ~2.8s |
| Phase 5D integrated | Yes (tag `checkpoint/phase-5d-cinematic-intro-tour-v1`) |

**Owner impact:** Repeat visits in same tab never show intro again. Not related to missing cards.

### Smart platform tour (`SmartPlatformTour.tsx`)

| Check | Result |
|-------|--------|
| Component mounted | Yes |
| Auto-open | **Disabled** — `useEffect` body commented with "DISABLED IN PHASE 5D" |
| Manual trigger | **None** — no navbar/footer/button opens tour |
| Reduced motion | Respected when open |

**Owner impact:** Tour described in reports is invisible in production UX.

### Hero (`HeroSection.tsx`)

| Check | Result |
|-------|--------|
| Premium styling | Yes — gradient, motion, magnetic-adjacent CTAs |
| Portal cards | No — scroll hint only |
| CTAs | Scroll to path selector, register links |
| RTL/LTR | Supported via locale |
| Mobile | Column stack verified in structure |

### Path selector (`PathSelector.tsx`)

| Check | Result |
|-------|--------|
| Interactive cards | Yes — selection chips + animated week plan |
| Scroll-stack effect | **No** — standard in-view fade animations only |
| Links | Mentor, register, portal links in results |

### Ecosystem map (`EcosystemMap.tsx`)

| Check | Result |
|-------|--------|
| Portal cards | Yes — 6 available portals + mentor hub |
| Mouse effects | Yes — `InteractiveSurface` tilt 2°, spotlight |
| Visual prominence | Medium — requires scroll past hero + path |
| English | Titles/descriptions localized; **portal `features` arrays still Arabic on EN** (config issue) |

### Portal grid (`PortalGrid.tsx`)

| Check | Result |
|-------|--------|
| All portals rendered | Yes — 8 cards including coming-soon |
| Mouse reactive cards | Yes — `PortalCard` + `InteractiveSurface` |
| Stagger animation | Yes — framer-motion `whileInView` |
| Below fold | Yes — ~4 sections above on desktop |

### Mentor showcase, How it works, Why Darhous, Final CTA

All mounted with framer-motion. `FinalCTA` uses `MagneticButton` (Phase 5C). No scroll-stack patterns.

## Unmounted legacy showcase components

| Component | File | Imported anywhere? |
|-----------|------|-------------------|
| Premium 3D Showcase | `src/components/layout/Premium3DShowcaseCarousel.tsx` | **No** |
| Featured Showcase | `src/components/layout/FeaturedShowcaseCarousel.tsx` | **No** |

These implement a **3D layered card carousel** (rotateY, translateZ, depth stack) — likely what prior plans/reports described as premium card experience. They are **dead code on the live homepage**.

## Phase 5D integration status

| Claimed in Phase 5D | Live at HEAD |
|---------------------|--------------|
| Cinematic intro | Yes |
| Tour control (non-intrusive) | Partial — tour disabled, not controlled |
| CI/Vercel visibility fix | Yes — CI green |
| Mouse reactive cards (5C) | Yes on PortalGrid/EcosystemMap |
| 3D showcase carousel | **Not integrated** |
| Scroll-over-card stack | **Not implemented** |

## Responsive / RTL / mobile

| Area | Status |
|------|--------|
| RTL `dir` on layout | Yes — `[locale]/layout.tsx` |
| Horizontal overflow | `overflow-x-hidden` on homepage wrapper |
| Touch tilt | Disabled (`pointerType !== "mouse"`) — correct |
| Light theme glass panels | Low contrast possible — `glass-panel-promax` subtle borders |

## Explicit answers (owner visibility)

| Question | Answer |
|----------|--------|
| Are expected cards in the code? | **Yes** — PortalGrid, EcosystemMap, PathSelector week cards; **also** unmounted 3D carousel |
| Rendered on live routes? | Portal cards **yes** (below fold); 3D carousel **no** |
| Hidden behind flags/sessionStorage? | Intro yes; tour effectively yes (never opens); cards **no** |
| One locale only? | Both `/ar` and `/en` — same structure |
| Too subtle? | **Partially** — glass styling + below-fold placement |
| Scroll-card effect implemented? | **No** on homepage |
| Why owner doesn't see them? | **(1)** Expecting 3D/stack effect not mounted; **(2)** must scroll far; **(3)** subtle glass; **(4)** EN feature pills show Arabic |

## Production readiness score: Landing

**5/10** — Structure exists; owner-visible premium effect missing; tour broken; localization leak on cards.
