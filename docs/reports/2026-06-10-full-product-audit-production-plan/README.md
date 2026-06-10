# Full Product Audit & Production Plan — 2026-06-10

**Station:** `full-product-audit-production-plan`  
**Mode:** Audit and planning only — no implementation  
**Starting HEAD:** `94348be86157f4d7b634069234ec89fb7ed5bc4b`  
**Branch:** `main`  
**Tag (this station):** `checkpoint/full-product-audit-production-plan-v1`

## Purpose

This package is the authoritative zero-ambiguity audit of Darhous / NexaLearn as of 2026-06-10. It answers what is broken, missing, disconnected, dead, unfinished, duplicated, unsafe, hard to develop, or blocking production — and provides an executable repair plan.

## Owner-confirmed UX issue

The owner does **not** see the expected landing cards / stacked scroll / layered card effect live. This is audited in:

- `landing-homepage-visual-audit.md`
- `cards-scroll-effects-visibility-review.md`
- `landing-visual-reorder-plan.md` (reference-derived ahmedali.online → NexaLearn reorder plan, merged into Phase L1)
- `production-repair-master-plan.md` (Phase L1 — Landing Visual Repair, split into sub-stations L1-V1…V4)

## Report index

| # | File | Scope |
|---|------|--------|
| 1 | `executive-summary.md` | Top-level verdict and counts |
| 2 | `landing-homepage-visual-audit.md` | `/ar` and `/en` homepage sections |
| 3 | `cards-scroll-effects-visibility-review.md` | Cards, motion, scroll-stack, owner visibility root cause |
| 4 | `dead-pages-and-dead-links-audit.md` | Broken/orphan links and pages |
| 5 | `route-map-and-navigation-inventory.md` | Full route map vs navigation |
| 6 | `content-inventory-and-publishing-status.md` | Content estate vs surfaced content |
| 7 | `admin-complete-audit.md` | Admin/CMS production readiness |
| 8 | `portal-by-portal-audit.md` | Per-portal scores and blockers |
| 9 | `ui-architecture-scalability-audit.md` | Developability and design-system gaps |
| 10 | `security-audit.md` | Auth, CMS, certificates, XSS |
| 11 | `performance-audit.md` | Bundle, motion, hydration |
| 12 | `accessibility-audit.md` | a11y, RTL, reduced motion |
| 13 | `seo-metadata-sharing-audit.md` | Metadata, OG, brand consistency |
| 14 | `build-ci-vercel-audit.md` | typecheck, lint, build, CI, Vercel |
| 15 | `issues-register.md` | Master issue table |
| 16 | `production-repair-master-plan.md` | **Primary deliverable** — phased repair order (L1 = landing, split V1–V4) |
| 17 | `phase-breakdown-roadmap.md` | Executable station prompts (L1 expanded into L1-V1…V4) |
| 18 | `landing-visual-reorder-plan.md` | Reference-derived landing reorder plan (ahmedali.online → NexaLearn), merged into L1 |
| 19 | `validation-report.md` | Commands run and results |
| 20 | `protected-files-review.md` | Protected file compliance |
| 21 | `summary.json` | Machine-readable audit summary |

## How to use

1. Read `executive-summary.md` and `production-repair-master-plan.md` first.
2. Use `issues-register.md` as the backlog source of truth.
3. Execute repairs only via stations defined in `phase-breakdown-roadmap.md`.
4. Do **not** start implementation from this audit commit without an approved station prompt.

## Related prior audits

- `docs/reports/2026-06-10-final-comprehensive-project-audit/` — same-day partial audit (not superseding this package)
- Phase 5A–5G reports under `docs/reports/2026-06-09-phase-5*`

## Safety confirmation

This station modified **only** files under this folder and `ANTIGRAVITY_PROJECT_LOG.md`. No source code, SQL, DB, package, or env files were changed.
