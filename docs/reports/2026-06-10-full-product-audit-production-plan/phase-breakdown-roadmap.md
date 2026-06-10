# Phase Breakdown Roadmap — Executable Stations

Each station is a single prompt scope. Do not combine without explicit approval.

---

## Station L1 — Landing Visual Repair (reference-derived, split into 4 sub-stations)

> Reproduce ahmedali.online's scroll experience by **reordering existing sections + layering effects — NO content removed.** Full spec: `landing-visual-reorder-plan.md`. Run V1→V4 in order; each is its own prompt/commit/tag.

### L1-V1: `landing-scroll-stack-cards-v1` ✅ Done

| Field | Value |
|-------|-------|
| **Status** | ✅ Committed `4856a15` · Tagged `checkpoint/landing-scroll-stack-cards-v1` |
| **Objective** | Build `ScrollStackSection` (sticky stacked cards = owner's "الكروت المتراكبة") wrapping existing `PortalCard`; reorder `HomepageClient`. Reduced-motion → grid fallback |
| **Files** | new `components/landing/sections/ScrollStackSection.tsx`, `HomepageClient.tsx` |
| **Validation** | typecheck PASS · lint 0 errors · build PASS (1274 pages) |

### L1-V1.1: `landing-scroll-stack-cards-v1-1` ✅ Done (dramatic upgrade)

| Field | Value |
|-------|-------|
| **Status** | ✅ Committed `375b67e` · Tagged `checkpoint/landing-scroll-stack-cards-v1-1` |
| **Objective** | Scale 1→0.82, opacity 1→0.35, black overlay 0→0.5, sticky top 90+index×28px, 175vh, 01/08 progress counter, moved immediately after Hero. Static overlapping stack for reduce-motion (not flat grid). Mobile large full-width flow. |
| **Files** | `components/landing/sections/ScrollStackSection.tsx`, `HomepageClient.tsx` |
| **Validation** | typecheck PASS · lint 0 errors · build PASS (1274 pages) |
| **Report** | `docs/reports/2026-06-10-landing-scroll-stack-cards-v1-1/` |

### L1-V2: `landing-marquee-strips-v1`

| Field | Value |
|-------|-------|
| **Objective** | `MarqueeStrip` (skills + brand strips) **reusing existing `.marquee-track-rtl` CSS** — zero new CSS |
| **Files** | new `components/ui/MarqueeStrip.tsx`, `data/*`, `HomepageClient.tsx` |
| **Forbidden** | rewriting CSS marquee; DB; package |
| **Validation** | RTL/LTR marquee direction; hover-pause; build |
| **Tag** | `checkpoint/landing-marquee-strips-v1` |

### L1-V3: `landing-showcase-mount-and-tour-trigger-v1`

| Field | Value |
|-------|-------|
| **Objective** | Mount orphan `Premium3DShowcaseCarousel`; re-wire `SmartPlatformTour` to hero "Take a tour" button (no auto-open) |
| **Files** | `HomepageClient.tsx`, `SmartPlatformTour.tsx`, `HeroSection.tsx`, `data/showcase.ts` |
| **Forbidden** | tour core-logic redesign; DB |
| **Validation** | carousel renders both locales; tour opens on click only; build |
| **Tag** | `checkpoint/landing-showcase-tour-v1` |

### L1-V4: `landing-motion-polish-and-page-transitions-v1`

| Field | Value |
|-------|-------|
| **Objective** | `ScrollColorReveal` on one heading; tilt 3°→~6° + touch fallback; localize `portals.features`→`featuresAr/En`; `[locale]/template.tsx` page transitions; light-mode glass contrast |
| **Files** | `WhyDarhous.tsx`, `InteractiveSurface.tsx`, `config/portals.ts`, new `app/[locale]/template.tsx`, `globals.css` |
| **Forbidden** | DB; package; content removal |
| **Validation** | reduced-motion keeps all content; `/en` pills English; build |
| **Tag** | `checkpoint/landing-motion-polish-v1` |

**Shared output:** `docs/reports/YYYY-MM-DD-landing-visual-*/` + log append per sub-station. Optional A/B flag `NEXT_PUBLIC_LANDING_SHOWCASE=stack|carousel|grid` keeps all paths alive.

---

## Station A1: `admin-cms-patch-and-delete-hardening-v1`

| Field | Value |
|-------|-------|
| **Objective** | Fix generic CMS PATCH; disable hard DELETE |
| **Files** | `api/admin/cms/**`, `GenericCmsTypePanel.tsx`, `cms-registry.ts` |
| **Forbidden** | Tier-A publish, public wiring, SQL |
| **Validation** | Manual CRUD matrix 22 tables; typecheck; build |
| **Output** | Admin hardening report + log |
| **Tag** | `checkpoint/admin-cms-hardening-v1` |

---

## Station S1: `certificate-security-and-url-canonicalization-v1`

| Field | Value |
|-------|-------|
| **Objective** | Auth on cert APIs; single verify URL |
| **Files** | `api/certificates/**`, verify pages, email templates, PDF components |
| **Forbidden** | DB schema changes without approval |
| **Validation** | Security checklist; manual IDOR test plan |
| **Tag** | `checkpoint/certificate-security-v1` |

---

## Station N1: `navigation-orphan-cleanup-v1`

| Field | Value |
|-------|-------|
| **Objective** | Cloud, prompts, glossary links; footer parity; sitemap fix |
| **Files** | `portals.ts`, `Navbar.tsx`, `Footer.tsx`, `sitemap.ts`, automation hub |
| **Forbidden** | DB, deferred portals |
| **Validation** | Link crawl script; build |
| **Tag** | `checkpoint/navigation-cleanup-v1` |

---

## Station B1: `nexalearn-brand-metadata-completion-v1` ✅ Code complete

| Field | Value |
|-------|-------|
| **Status** | ✅ Code done · `edbaa3c` + `3caf179` · Tagged `checkpoint/brand-nexalearn-ahmed-darhous-b1` |
| **Objective** | Unified NexaLearn by Ahmed Darhous brand on metadata, OG, manifest, Navbar, Footer, CinematicIntro |
| **Done** | `constants.ts` · `layout.tsx` · `og/route.tsx` · `manifest.webmanifest` · `Navbar.tsx` · `Footer.tsx` · `CinematicIntro.tsx` (brand + duration 4.4s) |
| **Remaining** | Certificate PDF template (design asset) · static `og-image.svg` regeneration (SVG design asset) |
| **Validation** | typecheck PASS · build PASS |

---

## Station L2: `english-localization-leak-fix-v1`

| Field | Value |
|-------|-------|
| **Objective** | Fix EN digital exams; portal/i18n leaks |
| **Files** | exam data, `portals.ts`, EN client components |
| **Forbidden** | DB unless exam content approved |
| **Validation** | `/en/digital-exams` manual; grep leak test |
| **Tag** | `checkpoint/en-localization-fix-v1` |

---

## Station C1: `tier-a-pilot-publish-automation-glossary-v1`

| Field | Value |
|-------|-------|
| **Objective** | User-approved publish of 5 automation glossary Tier-A rows |
| **Files** | Admin publish UI, `read-with-fallback.ts`, automation-glossary page |
| **Forbidden** | tools_hub, nano_banana, bulk 600 publish, live-wired edits |
| **Validation** | RLS test; public render; rollback script documented |
| **Tag** | `checkpoint/tier-a-pilot-publish-v1` |
| **Requires** | **Explicit user DB write approval** |

---

## Station C2: `tier-a-content-routes-template-v1`

| Field | Value |
|-------|-------|
| **Objective** | Reusable list/detail routes for lessons/resources |
| **Files** | New `ContentListPage`, portal route scaffolds |
| **Forbidden** | Mass publish |
| **Validation** | One portal end-to-end |
| **Tag** | `checkpoint/tier-a-routes-v1` |

---

## Station R1: `ui-design-system-foundation-v1`

| Field | Value |
|-------|-------|
| **Objective** | Card/Button/Section primitives; motion presets |
| **Files** | `src/components/ui/*`, `globals.css`, homepage config |
| **Forbidden** | Portal content changes |
| **Validation** | Storybook or visual checklist; lint |
| **Tag** | `checkpoint/design-system-v1` |

---

## Station A2: `admin-monolith-extraction-v2`

| Field | Value |
|-------|-------|
| **Objective** | Extract 5+ panels from AdminDashboardClient |
| **Files** | `AdminDashboardClient.tsx`, `panels/*` |
| **Forbidden** | Behavior changes to CRUD |
| **Validation** | Tab matrix regression |
| **Tag** | `checkpoint/admin-extraction-v2` |

---

## Station P1: `performance-optimization-v1`

| Field | Value |
|-------|-------|
| **Objective** | Code split, pagination, lazy landing |
| **Files** | Large clients, data imports |
| **Forbidden** | Feature additions |
| **Validation** | Build time; Lighthouse sample |
| **Tag** | `checkpoint/performance-v1` |

---

## Station QA: `launch-candidate-qa-gate-v1`

| Field | Value |
|-------|-------|
| **Objective** | Full QA gate per master plan |
| **Files** | Reports only unless blockers |
| **Validation** | Full `npm run check`; manual QA script |
| **Tag** | `checkpoint/launch-candidate-v1` |
| **Release** | GitHub release if pass |

---

## Station D1: `documentation-and-log-integrity-v1`

| Field | Value |
|-------|-------|
| **Objective** | README, log encoding, tag matrix |
| **Files** | README.md, ANTIGRAVITY_PROJECT_LOG.md, docs |
| **Forbidden** | App code |
| **Tag** | `checkpoint/docs-integrity-v1` |
