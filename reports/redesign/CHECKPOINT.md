# Redesign Checkpoint — Phase 2 Complete

> **Latest tag:** `checkpoint/redesign-p2-landing` · commit `8c042ed`
> **Phase 1 tag:** `checkpoint/redesign-p1-foundation` · commit `c88404e`
> **Baseline tag:** `checkpoint/pre-redesign-plan` · commit `ad6bf0e`
> **Branch:** `main` · pushed to Vercel
> **Date:** 2026-06-06

---

## STATE AT THIS CHECKPOINT

| Item | Status |
|------|--------|
| Master plan | ✅ Written → [`MASTER_REDESIGN_PLAN.md`](./MASTER_REDESIGN_PLAN.md) |
| **Phase 1 — Foundation + a11y** | ✅ COMPLETE — `c88404e` |
| **Phase 2 — Landing redesign** | ✅ **COMPLETE** — `8c042ed` |
| HomepageClient split → 8 sections | ✅ `landing/sections/` directory with 8 files |
| `useReducedMotion` in all sections | ✅ All 8 Framer Motion components covered |
| OS mockup emoji → Lucide icons | ✅ 6 portal icons replaced |
| HowItWorks emoji → Lucide icons | ✅ 4 step icons replaced |
| WhyDarhous visual dissolution | ✅ 4-col dense grid → 2-col editorial list |
| Badge emoji → Lucide icons | ✅ Compass/Globe/Bot/Sparkles |
| Section gap reduced | ✅ 112px → 64–80px responsive |
| Content / architecture / APIs | ❌ **UNTOUCHED** |
| Phase 3 (portal identity) | ⏸️ Not started |

---

## WHAT WAS DONE IN PHASE 2

1. Split `HomepageClient.tsx` (940 lines) into 8 focused sections:
   - `sections/HeroSection.tsx` — hero + OS mockup (Lucide icons)
   - `sections/PathSelector.tsx` — self-contained path-selector state
   - `sections/EcosystemMap.tsx` — 3×3 ecosystem grid
   - `sections/PortalGrid.tsx` — all portals grid
   - `sections/HowItWorks.tsx` — 4 steps (Lucide icons)
   - `sections/MentorShowcase.tsx` — AI mentor chat preview
   - `sections/WhyDarhous.tsx` — dissolved feature list (Lucide icons)
   - `sections/FinalCTA.tsx` — final CTA section
2. `HomepageClient.tsx` is now 35 lines (thin orchestrator).
3. `useReducedMotion` from Framer Motion applied in every section:
   - y-axis motion removed when `prefers-reduced-motion` is active
   - stagger disabled, durations shortened to 150ms
   - typewriter speed set to 0 (instant reveal) for reduced-motion users
4. OS mockup colors updated to Phase 1 tokens: Language `#c084fc`, Career `#fbbf24`.
5. Typecheck ✓ · lint 0 errors ✓ · build exit 0 ✓.

---

## HOW TO ROLL BACK

**To Phase 1 state:** `git reset --hard checkpoint/redesign-p1-foundation`
**To baseline:** `git reset --hard checkpoint/pre-redesign-plan`

---

## NEXT STEP

➡️ **Phase 3 — Portal identity system** (await user GO/NO-GO)
- Add `data-portal="iot-lab"` to existing `iot-lab/layout.tsx` (minor edit with existing logic)
- Wire `var(--portal-color)` into portal-specific components (cards, headers, hero accents)
- Test Navbar/Footer global token isolation (no color bleed)
- **Risk:** Low (additive CSS tokens already in place from Phase 1).
- **Tag:** `checkpoint/redesign-p3-portal-identity`.
