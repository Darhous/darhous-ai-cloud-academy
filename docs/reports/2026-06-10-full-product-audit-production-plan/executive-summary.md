# Executive Summary — Full Product Audit (2026-06-10)

## Verdict

**Darhous / NexaLearn is not production-shippable today.** The codebase builds (CI green at HEAD), core portals function with substantial static content, and Phase 5 landing work added real UI — but the product fails owner-visible UX expectations, has zero published Tier-A CMS content, splits admin/CMS architecture unsafely, and carries high-severity security and localization defects.

**Audit-only station:** No fixes were implemented in this commit.

## Starting state

| Item | Value |
|------|-------|
| Branch | `main` |
| HEAD | `94348be86157f4d7b634069234ec89fb7ed5bc4b` |
| Latest CI | Success — run `27241835196` on Phase 5G log finalization |
| Typecheck | Passed locally |
| Lint | Hung/timed out locally (>5 min); prior audit: 0 errors, 69 warnings |
| Build | In progress at audit time; CI build passed at same HEAD |

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

## Owner cards / scroll effect — confirmed gap

**Root cause (summary):** Portal cards and mouse-reactive tilt exist in `PortalGrid` and `EcosystemMap`, but the **3D layered showcase carousel** (`Premium3DShowcaseCarousel.tsx`) and **featured carousel** are **never imported** on the homepage. There is **no scroll-stacked / sticky-over-card** implementation on the live homepage. `SmartPlatformTour` auto-open was **disabled in Phase 5D**. Cards sit **below the fold** after intro, hero, and path selector; `glass-panel-promax` styling is subtle especially in light mode.

See `cards-scroll-effects-visibility-review.md` for proof and repair steps.

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

1. **L1** Landing visual repair — mount showcase / implement scroll-stack, fix tour trigger
2. **A1** Admin CMS hardening — fix PATCH/status, disable DELETE, extract panels
3. **S1** Certificate security + URL canonicalization
4. **C1** Controlled Tier-A pilot publish (1 portal, 1 type) with QA gates
5. **N1** Navigation orphan cleanup (`/cloud`, glossary, cert URLs)
6. **B1** NexaLearn brand/metadata completion
7. **L2** English localization leak fixes
8. **R1** Design-system foundation for portals

Full detail: `production-repair-master-plan.md`

## Next recommended station

**`landing-visual-repair-and-showcase-integration-v1`**

Mount or replace the unmounted 3D showcase, implement scroll-stacked portal section per approved design, re-enable tour with explicit user trigger, and add owner acceptance checklist.
