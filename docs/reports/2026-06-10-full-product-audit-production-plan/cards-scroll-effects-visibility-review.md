# Cards, Scroll Effects & Visibility Review

**Owner report:** Expected landing cards and stacked scroll / layered card effect are **not visible** live.  
**Status:** Confirmed UX visibility problem — included in repair plan.

## What was promised (Phase 5B–5D reports)

| Phase | Deliverable | Code evidence |
|-------|-------------|---------------|
| 5B | Homepage Pro Max redesign, portal constellation | `PortalGrid`, `EcosystemMap`, `portals.ts` |
| 5C | Mouse-reactive card system | `InteractiveSurface.tsx`, `PortalCard.tsx`, `MagneticButton.tsx` |
| 5D | Cinematic intro + tour control | `CinematicIntro.tsx`, tour auto-open **disabled** |
| Pre-5D blueprint | Learning paths scroll reveal, layered depth | Partial — fade only, no sticky stack |
| Legacy layout | Premium 3D carousel | `Premium3DShowcaseCarousel.tsx` — **orphan** |

## Implementation inventory

### A. Live homepage cards (mounted)

```
HomepageClient
  ├── EcosystemMap → InteractiveSurface + Link cards (6 portals + mentor)
  ├── PortalGrid → PortalCard → InteractiveSurface (8 portals)
  └── PathSelector → week plan cards (after 4 selections)
```

**Effects present:**
- Spotlight radial gradient on mouse move
- 2–3° 3D tilt on mouse (desktop only)
- `translateY(-6px)` lift on hover
- Framer stagger `whileInView` fade-up

**Effects absent:**
- Scroll-jacking / sticky stack
- Cards overlapping on scroll
- 3D carousel depth stack (`rotateY`, `translateZ` layers)

### B. Unmounted 3D showcase (NOT on homepage)

File: `src/components/layout/Premium3DShowcaseCarousel.tsx`

```275:316:src/components/layout/Premium3DShowcaseCarousel.tsx
  function getCardStyle(pos: number): React.CSSProperties {
    const absPos = Math.abs(pos);
    // ... translateX, scale, rotateY, translateZ layering
    if (absPos === 0) {
      return {
        transform: "translateX(-50%) scale(1) rotateY(0deg) translateZ(0px)",
        opacity: 1,
        zIndex: 20,
        // ...
      };
    }
    // side cards scaled 0.76, rotated, blurred...
  }
```

**Grep for imports:** Only self-reference and `reports/redesign/MASTER_REDESIGN_PLAN.md`. **Zero imports in `src/app` or `HomepageClient`.**

This is the strongest match for "layered card effect" described in older UX plans.

### C. Scroll-stacked cards

**Search:** No `position: sticky` card stack, no scroll-driven card pinning in `src/components/landing/**`.

`WhyDarhous` uses a static grid — not scroll stack.

**Conclusion:** Scroll-over-card / stacked scroll effect is **documented aspiration, not shipped behavior**.

## Visibility blockers (ranked)

| # | Blocker | Severity | Evidence |
|---|---------|----------|----------|
| 1 | 3D showcase never mounted | **Critical** | No import of `Premium3DShowcaseCarousel` |
| 2 | Scroll-stack never built | **Critical** | No sticky stack in landing components |
| 3 | Cards below fold | High | 4 sections before PortalGrid |
| 4 | Tour disabled | Medium | `SmartPlatformTour` open trigger commented out |
| 5 | Cinematic intro first-visit only | Low | sessionStorage |
| 6 | Reduced motion | Low | Disables tilt/intro/tour motion |
| 7 | Subtle glass styling | Medium | `glass-panel-promax` low contrast |
| 8 | EN locale feature pills Arabic | Medium | `portals.ts` `features` not localized |

## Conditional gates audit

| Gate | Affects cards? |
|------|----------------|
| `sessionStorage` cinematic intro | No — only intro overlay |
| `localStorage` tour | No — tour never opens |
| `useReducedMotion()` | Disables tilt/spotlight animations, not card presence |
| Auth | No |
| Feature flags | None found |
| CSS `display:none` on cards | None |
| Conditional skip in HomepageClient | None |

## Locale parity (`/ar` vs `/en`)

Same component tree. Differences:
- Copy from `isAr` branches
- Portal `features` pills always Arabic strings in `portals.ts`
- Metadata title still "Darhous" on homepage EN

## Owner test protocol (for repair validation)

1. Clear `sessionStorage` key `darhous-cinematic-intro-seen-v1`
2. Disable reduced motion in OS
3. Open `/ar` in incognito — scroll past hero to `#portals` and `#ecosystem`
4. Hover portal cards on desktop — expect tilt + spotlight
5. **Currently fails owner expectation:** no 3D carousel, no scroll stack at top of page
6. After repair: 3D or scroll-stack section visible within first 2 viewport heights

## Recommended fix (plan only — not implemented)

1. **Decision:** Mount `Premium3DShowcaseCarousel` below hero OR implement new `ScrollStackPortalShowcase` per approved mockup
2. Wire explicit "Platform tour" button if re-enabling tour
3. Localize `portals.features` → `featuresAr` / `featuresEn`
4. Increase card contrast tokens for light mode
5. Add `prefers-reduced-motion` static fallback that still shows cards

See `production-repair-master-plan.md` Phase L1.
