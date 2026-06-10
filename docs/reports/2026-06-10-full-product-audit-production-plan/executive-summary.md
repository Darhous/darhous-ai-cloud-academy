# Executive Summary — Full Product Audit (2026-06-10)

## Verdict

**Darhous / NexaLearn is not production-shippable today.** The codebase builds (CI green at HEAD), core portals function with substantial static content, and Phase 5 landing work added real UI — but the product fails owner-visible UX expectations, has zero published Tier-A CMS content, splits admin/CMS architecture unsafely, and carries high-severity security and localization defects.

**Audit-only station:** No fixes were implemented in this commit.

## Starting state (audit baseline)

| Item | Value |
|------|-------|
| Branch | `main` |
| HEAD at audit | `94348be86157f4d7b634069234ec89fb7ed5bc4b` |
| Latest CI | Success — run `27241835196` on Phase 5G log finalization |
| Typecheck | Passed locally |
| Lint | Passed locally — 0 errors, 69 warnings (re-validated in continuation session) |
| Build | Passed locally (exit 0, 1274 SSG pages); CI build also passed at same HEAD |

## Current state (post-implementation 2026-06-10)

| Item | Value |
|------|-------|
| HEAD | `3caf179` |
| Completed stations | L1-V1 · L1-V1.1 · B1 (code complete) |
| Typecheck | PASS (0 errors) |
| Lint | PASS (0 errors, 69 warnings — baseline unchanged) |
| Build | PASS (exit 0, 1274 pages) |
| Tags | `checkpoint/landing-scroll-stack-cards-v1` · `checkpoint/landing-scroll-stack-cards-v1-1` · `checkpoint/brand-nexalearn-ahmed-darhous-b1` |

## Finding counts

| Severity | Count |
|----------|------:|
| Critical | 8 |
| High | 17 |
| Medium | 26 |
| Low | 14 |
| **Total** | **65** |

## Navigation & dead content

| Metric | Count |
|--------|------:|
| Dead links in active nav/footer/landing | 0 |
| Dead pages (linked but 404) | 0 |
| Orphan routes (exist, not in nav/footer/landing) | 18 |
| Disconnected showcase components (unmounted) | 2 |

## Owner cards / scroll effect — ✅ Resolved (L1-V1.1)

**Original gap:** No scroll-stacked card implementation; `Premium3DShowcaseCarousel.tsx` unmounted; cards below fold.

**Implemented (2026-06-10):** `ScrollStackSection.tsx` — sticky stacked portal cards with scale 1→0.82, opacity 1→0.35, black overlay 0→0.5, sticky top `90+index×28px`, 175vh section travel, `01/08` progress counter, RTL-safe logical props. Moved immediately after `HeroSection` (was 5th section, now 2nd). Static overlapping stack for `prefers-reduced-motion` (no flat grid fallback). Mobile: large full-width single-column flow.

**Still pending:** `Premium3DShowcaseCarousel.tsx` mount (L1-V3); `SmartPlatformTour` trigger button (L1-V3).

See `cards-scroll-effects-visibility-review.md` for original proof and `docs/reports/2026-06-10-landing-scroll-stack-cards-v1-1/` for implementation report.

## Content state

| Layer | State |
|-------|-------|
| `content-source` normalized | 1,040 records (not read at runtime) |
| Supabase Tier-A | 600 draft, **0 published** |
| Live-wired (frozen) | 210 |
| Deferred (tools_hub, nano_banana) | 230 |
| Public today | Primarily `src/data/*` static + hybrid merge for 22 CMS registry tables |

**Blocker:** Publishing + public route wiring for 19 Tier-A draft tables — not more file import.

## Admin readiness

**Not production-ready.** Admin IA shell exists (grouped sidebar), but:

- `AdminDashboardClient.tsx` remains ~5,300+ lines
- Generic CMS edit breaks on 21/22 types (status field rejected)
- Hard DELETE enabled on registry tables
- Tier-A content is preview-only, not publishable from unified workflow
- Two parallel CMS systems (registry vs draft-preview)

**Score:** 4/10 production readiness

## UI architecture scalability

**Not scalable** for hundreds/thousands of topics without refactor.

- Portal registry is good (`portals.ts`) but pages duplicate layouts
- No shared design-system package; card/button variants scattered
- Adding a portal still touches nav, footer, landing, admin, sitemap manually
- Landing is over-coupled to many section components without a composition config

**Verdict:** `ui_architecture_scalable: false`

## Security (code review)

High risk in certificate PDF/verify APIs (service-role, GET mutations, weak ownership). CMS DELETE and status handling unsafe. No client-side service key exposure found. XSS risk moderate on blog/MDX paths.

## Recommended repair order (abbreviated)

| # | Station | Status |
|---|---------|--------|
| 1 | **L1-V1/V1.1** Landing scroll-stack cards | ✅ Done |
| 2 | **B1** NexaLearn brand/metadata (code complete) | ✅ Done (design assets pending) |
| 3 | **L1-V2** Marquee strips | ❌ Next up |
| 4 | **L1-V3** 3D showcase mount + tour trigger | ❌ Pending |
| 5 | **L1-V4** Motion polish + page transitions | ❌ Pending |
| 6 | **A1** Admin CMS hardening — fix PATCH/status, disable DELETE | ❌ Production blocker |
| 7 | **S1** Certificate security + URL canonicalization | ❌ Production blocker |
| 8 | **N1** Navigation orphan cleanup | ❌ Quick wins |
| 9 | **L2** English localization leak fixes | ❌ EN market blocker |
| 10 | **C1** Controlled Tier-A pilot publish | ❌ Needs A1 first |
| 11 | **C2/R1/A2/P1** Scale + design system + performance | ❌ Later |

Full detail: `production-repair-master-plan.md`

## Next recommended station

**`landing-marquee-strips-v1` (L1-V2)**

New `MarqueeStrip` component reusing existing `.marquee-track` / `.marquee-track-rtl` CSS from `globals.css`. Zero new CSS. Skills strip + brand strip below the hero.
