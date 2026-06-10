# Landing Visual Reorder Plan — Reference-Derived (ahmedali.online → NexaLearn)

**Status:** Plan only — no implementation. Merged into `production-repair-master-plan.md` Phase **L1** (now broken into sub-stations V1–V4).
**Owner intent:** Reproduce the reference site's scroll experience (stacked cards, marquees, scroll-linked color reveal, kinetic hero, numbered process, timeline, mouse-move, page transitions) on the NexaLearn homepage.
**Hard constraint:** **No content removed.** Reorder existing sections and layer effects only.

---

## 1. Reference site analysis (ahmedali.online)

The site's feel comes from **6 recurring motion patterns layered over ordinary content**, not from any single section:

| # | Reference pattern | Technique |
|---|---|---|
| 1 | Kinetic hero ("i craft digital…") | Rotating/sliding words + portrait + CTA |
| 2 | Infinite skills marquee (SEO ✳ Web Dev ✳ AI…) | Horizontal `marquee`, loops forever, pauses on hover |
| 3 | "Built Different" scroll color reveal | Heading fills color progressively, scroll-linked |
| 4 | **Stacked cards** (What I Do Best) | `position: sticky` cards that pile up while scrolling |
| 5 | Numbered process 01→04 (How I Work) + connector line | Vertical timeline, large numbers, animated line |
| 6 | Experience timeline + client-logo marquee | Repeating cards + a second logo marquee |
| — | Mouse-move + page transitions | Pointer-tracked tilt/glow + fade/slide on route change |

**Design language:** "Motion-Driven" (confirmed via ui-ux-pro-max). Neutral background, high contrast, one strong type family (Inter), all distinction from scroll-linked motion — not ornament. Performance ⚠ and accessibility ⚠ (must respect `prefers-reduced-motion`).

---

## 2. Reuse inventory — what already exists in our codebase

The good news: most primitives already exist; some are just unmounted or mis-ordered.

| Reference need | Already in repo | State |
|---|---|---|
| Marquee strip | `globals.css` → `.marquee-track` + `.marquee-track-rtl` (RTL-aware, hover-pause, `@keyframes marquee/-rtl`) | ✅ ready, unused on landing |
| 3D / layered cards | `components/layout/Premium3DShowcaseCarousel.tsx` (rotateY/translateZ) + `FeaturedShowcaseCarousel.tsx` + data `data/showcase.ts` (25 items) | ⚠ exists but **mounted nowhere** |
| Numbered 01→04 + connector line | `components/landing/sections/HowItWorks.tsx` | ✅ live (equals "How I Work") |
| Mouse-move tilt/glow | `components/ui/InteractiveSurface.tsx` (used on `PortalCard`) | ✅ live (only 3°, mouse-only) |
| Kinetic hero + animated panel | `components/landing/sections/HeroSection.tsx` | ✅ strong already |
| Content cards | `PortalGrid` (8 portals) + `EcosystemMap` | ✅ live |
| Count-up / stats | `Stats` + `WhyDarhous` | ✅ live |
| Float / orb / shimmer motion | `globals.css` (`orb-breathe`, `float`, `pulse-glow`, `shimmer-sweep`) | ✅ available |

**Only genuinely missing primitive:** the sticky **scroll-stack** (owner's "الكروت المتراكبة").

---

## 3. Why the owner doesn't see it today (confirmed)

1. Scroll-stack effect was **never coded** — it lived only in `UX PROMAX.MD` vision text.
2. `Premium3DShowcaseCarousel` is **never imported** (zero references in `src/app`).
3. `SmartPlatformTour` auto-open is **commented out** (Phase 5D) with no trigger button → dead center-of-page block.
4. `InteractiveSurface` tilt is **3° max, mouse-only** → invisible on touch and very subtle on desktop.

---

## 4. Proposed section flow (reorder + layer — nothing removed)

Legend: **[keep]** reused as-is · **[mount]** mount existing asset · **[new]** new small primitive/effect.

| # | Section | Source | Layer added |
|---|---|---|---|
| 1 | `CinematicIntro` | [keep] | intro overlay (unchanged) |
| 2 | `HeroSection` | [keep] | **[new]** kinetic rotating sub-headline word |
| 3 | **Skills Marquee** | **[new]** wrapper, reuses CSS marquee | infinite ticker of portal/tool tags |
| 4 | **Portal ScrollStack** | **[new]** primitive wrapping existing `PortalCard` | sticky stacked cards |
| 5 | `EcosystemMap` | [keep] | mouse-move tilt (kept) |
| 6 | **3D Showcase** | **[mount]** `Premium3DShowcaseCarousel` + `showcase.ts` | layered 3D depth carousel |
| 7 | `PathSelector` | [keep] | interactive quiz (unchanged) |
| 8 | `HowItWorks` | [keep] | 01→04 process + connector line |
| 9 | `MentorShowcase` | [keep] | AI mentor demo (unchanged) |
| 10 | **Color Reveal band** | **[new]** effect on one heading | scroll-linked text color fill |
| 11 | `WhyDarhous` + `Stats` | [keep] | count-up stats (unchanged) |
| 12 | **Brand Marquee** | **[new]** wrapper, reuses CSS marquee | client/brand logo ticker |
| 13 | `FinalCTA` + `CommunitySignup` | [keep] | conversion close |
| — | `SmartPlatformTour` | [keep, re-wired] | becomes **button-triggered** from hero (not a section) |

**Net:** 10 of 13 sections reused unchanged, 3 are mounts of existing assets, only **3 new small primitives** (`ScrollStackSection`, `MarqueeStrip`, `ScrollColorReveal`).

---

## 5. The 3 new primitives (spec)

### ① `ScrollStackSection` — sticky stacked cards (owner's #1 ask)
- Wraps existing cards (`PortalCard` from `portals.ts`, or `showcase.ts`).
- Each card: `position: sticky; top: ~80px`; `scale`/`opacity` driven by `useScroll` + `useTransform` (framer-motion already in deps).
- **No card removed** — same 8 portals, stacking instead of a flat grid.
- **Reduced-motion:** falls back to the normal grid; all cards stay visible.

### ② `MarqueeStrip` — skills + client marquees
- Thin component consuming the **existing** `.marquee-track-rtl` CSS — zero new CSS.
- Data from `portals.features` + `data/tools.ts` (skills strip) and brand/portal labels (trust strip).

### ③ `ScrollColorReveal` — scroll-linked color fill
- One heading (e.g. inside `WhyDarhous`) whose color fills progressively via `useScroll`.
- Single-element effect only (respects "animate 1–2 elements per view").

---

## 6. Sub-stations V1–V4 (executable order)

| Sub-station | Scope | Files likely affected | Forbidden |
|---|---|---|---|
| **L1-V1** `landing-scroll-stack-cards-v1` | Build `ScrollStackSection`; reorder `HomepageClient` | `components/landing/sections/*`, `HomepageClient.tsx` | DB/SQL/env/admin/package |
| **L1-V2** `landing-marquee-strips-v1` | `MarqueeStrip` (skills + brand), reuse CSS marquee | new `MarqueeStrip.tsx`, `data/*` | rewriting CSS marquee |
| **L1-V3** `landing-showcase-mount-and-tour-trigger-v1` | Mount `Premium3DShowcaseCarousel`; tour opens via hero button | `HomepageClient.tsx`, `SmartPlatformTour.tsx`, `HeroSection.tsx` | tour core logic redesign |
| **L1-V4** `landing-motion-polish-and-page-transitions-v1` | `ScrollColorReveal`, tilt 3°→~6° + touch fallback, localize `portals.features`, `[locale]/template.tsx` page transitions | `WhyDarhous.tsx`, `InteractiveSurface.tsx`, `config/portals.ts`, new `template.tsx` | — |

---

## 7. Acceptance criteria (every sub-station)

- [ ] No existing section/text disappears (before/after diff of rendered sections).
- [ ] Works on `/ar` (RTL) and `/en` (LTR) at equal quality.
- [ ] `prefers-reduced-motion` keeps ALL content visible with motion disabled.
- [ ] `npm run typecheck && npm run lint && npm run build` pass.
- [ ] Owner protocol: open `/ar` incognito → scroll → cards pile up within first ~2 viewport heights.
- [ ] No regression to portal links / CTAs.

## 8. Rollback

One checkpoint tag per sub-station: `checkpoint/landing-scroll-stack-cards-v1`, `…-marquee-strips-v1`, `…-showcase-mount-and-tour-trigger-v1`, `…-motion-polish-and-page-transitions-v1`. Revert is composition-only in `HomepageClient.tsx`.

## 9. Optional A/B flag

`NEXT_PUBLIC_LANDING_SHOWCASE=stack|carousel|grid` to compare the scroll-stack vs the 3D carousel vs the current grid during L1 without deleting any path.
