# Phase Breakdown Roadmap — Executable Stations

Each station is a single prompt scope. Do not combine without explicit approval.

---

## Station L1: `landing-visual-repair-and-showcase-integration-v1`

| Field | Value |
|-------|-------|
| **Objective** | Owner-visible 3D/stacked cards; tour trigger; portal feature i18n |
| **Files likely affected** | `HomepageClient.tsx`, `Premium3DShowcaseCarousel.tsx` or new scroll component, `SmartPlatformTour.tsx`, `HeroSection.tsx`, `portals.ts`, `globals.css` |
| **Forbidden** | SQL, DB, package.json, env, tools_hub, nano_banana Tier-A, protected files |
| **Validation** | `npm run typecheck`, `npm run lint`, `npm run build`, owner visual checklist |
| **Output** | `docs/reports/YYYY-MM-DD-landing-visual-repair/` + log append |
| **Commit/tag** | `feat: landing showcase and scroll cards` / `checkpoint/landing-visual-repair-v1` |

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

## Station B1: `nexalearn-brand-metadata-completion-v1`

| Field | Value |
|-------|-------|
| **Objective** | Unified NexaLearn brand on metadata, OG, manifest, certs |
| **Files** | `layout.tsx`, `manifest`, `og/**`, certificate templates |
| **Forbidden** | Content publish |
| **Validation** | Share preview screenshots; metadata unit check |
| **Tag** | `checkpoint/nexalearn-brand-v1` |

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
