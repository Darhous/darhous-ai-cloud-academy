# Redesign Checkpoint — Phase 3 Complete

> **Latest tag:** `checkpoint/redesign-p3-portal-identity` · commit TBD
> **Phase 2 tag:** `checkpoint/redesign-p2-landing` · commit `8c042ed`
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
| **Phase 2 — Landing redesign** | ✅ COMPLETE — `8c042ed` |
| HomepageClient split → 8 sections | ✅ `landing/sections/` directory with 8 files |
| `useReducedMotion` in all sections | ✅ All 8 Framer Motion components covered |
| OS mockup emoji → Lucide icons | ✅ 6 portal icons replaced |
| HowItWorks emoji → Lucide icons | ✅ 4 step icons replaced |
| WhyDarhous visual dissolution | ✅ 4-col dense grid → 2-col editorial list |
| Badge emoji → Lucide icons | ✅ Compass/Globe/Bot/Sparkles |
| Section gap reduced | ✅ 112px → 64–80px responsive |
| Content / architecture / APIs | ❌ **UNTOUCHED** |
| **Phase 3 — Portal identity** | ✅ **COMPLETE** — commit TBD |
| IoT Lab `data-portal` layout wrapper | ✅ Wrapped existing logic with `data-portal="iot-lab"` |
| CSS token expansion (faint + border) | ✅ `--portal-color-faint` + `--portal-color-border` added to all 7 portals |
| language/page.tsx — old #d0bcff → token | ✅ All rgba(208,188,255,...) replaced |
| ai-academy/page.tsx — tokens wired | ✅ Ambient orb, badge, bottom section |
| automation/page.tsx — tokens wired | ✅ Hero, stats bar, sectors, CTA |
| iot-lab/page.tsx — tokens wired | ✅ Orbs, hero, stats, CTA |
| career/page.tsx — old #f59e0b → token | ✅ All hero/stats/CTA updated |
| digital-exams/page.tsx — tokens wired | ✅ Ambient, badge, CTA card |
| Phase 4 (pilot portals) | ⏸️ Not started |

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

## WHAT WAS DONE IN PHASE 3

1. **IoT Lab layout** — wrapped existing English-warning banner logic with `<div data-portal="iot-lab">`. The banner itself now uses `var(--portal-color)` tokens too.
2. **CSS token expansion** — added `--portal-color-faint` (4% opacity) and `--portal-color-border` (15% opacity) to all 7 `[data-portal]` blocks in `globals.css`. Now 5 variants: color, subtle(8%), faint(4%), border(15%), glow(20%).
3. **language/page.tsx** — replaced all `rgba(208,188,255,...)` + hardcoded `#d0bcff` (old token) with `var(--portal-color)` family. Language portal now shows correct new `#c084fc` purple.
4. **ai-academy/page.tsx** — ambient orb, hero badge, bottom quick-links section now use portal tokens.
5. **automation/page.tsx** — hero badge, icon box, ambient orbs, stats bar, use-case sector cards, bottom CTA now use portal tokens. Per-section color differentiation in SECTIONS array preserved.
6. **iot-lab/page.tsx** — same pattern as automation. SECTIONS array individual section colors preserved.
7. **career/page.tsx** — replaced old `#f59e0b` (pre-token amber) with `var(--portal-color)` = new `#fbbf24`. Hero badge, stats bar, CTA updated.
8. **digital-exams/page.tsx** — ambient orb, header badge, CTA card border and icon updated.
9. **Navbar/Footer verified** — zero `portal-color` references. No color bleed between portals.

---

## HOW TO ROLL BACK

**To Phase 2 state:** `git reset --hard checkpoint/redesign-p2-landing`
**To Phase 1 state:** `git reset --hard checkpoint/redesign-p1-foundation`
**To baseline:** `git reset --hard checkpoint/pre-redesign-plan`

---

## NEXT STEP

➡️ **Phase 4 — Pilot portals (Language + Automation)** (await user GO/NO-GO)
- Language: editorial hero, history strips, warm violet atmosphere, consistent card system
- Automation: two-panel layout, monospace accents, workflow hero, recipe cards
- **Risk:** Medium (deeper visual changes to page components)
- **Tags:** `checkpoint/redesign-p4a-language` · `checkpoint/redesign-p4b-automation`
