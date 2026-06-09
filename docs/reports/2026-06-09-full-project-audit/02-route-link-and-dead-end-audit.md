# Route, Link, and Dead-End Audit

## Route Inventory Summary

- 87 page routes.
- 63 API route handlers.
- 127 literal internal path references were statically sampled; most path fragments are correctly locale-prefixed at render time.
- No placeholder navigation links to `#` were found. The only hash link found is the valid skip link `#main-content`.
- No empty rendered `href` was found; empty strings in Navbar configuration represent the localized home suffix.

## Confirmed Findings

### Critical/High

1. **No route-level resilience files**
   - Evidence: no `loading.tsx`, `error.tsx`, or `not-found.tsx` under `src/app`.
   - Impact: dynamic route transitions can feel stalled, runtime errors fall to coarse boundaries, and invalid content IDs have inconsistent recovery UX.

2. **Inactive project CTA**
   - Route: `/[locale]/projects/[slug]`.
   - Evidence: `src/app/[locale]/projects/[slug]/page.tsx`, “Build This Project” button has no `onClick`, link, or form action.
   - Expected target likely exists at `/[locale]/projects/[slug]/build`.

3. **Partial blog dead ends**
   - Route: `/[locale]/blog/[slug]`.
   - Evidence: fallback state displays “Full content coming soon” when MDX/body content is absent.
   - Impact: sitemap-indexed article pages may provide title/excerpt but no substantive article.

4. **Coach-provided non-localized route**
   - Evidence: `src/app/api/coach/route.ts` contains an example/default `href` of `/projects`.
   - Risk: the localized app has no `/projects` page outside `/ar` or `/en`.
   - Status: Needs runtime verification because model output or downstream normalization may replace it.

### Medium

5. **Admin public-preview links hardcode Arabic**
   - Evidence: `AdminDashboardClient.tsx` uses `/ar/blog`, `/ar/glossary`, `/ar/tools`, `/ar/prompts`, `/ar/courses`, `/ar/projects`, and `/ar/paths` for multiple preview links.
   - Impact: English-admin users are redirected to Arabic public views.

6. **Navigation discoverability is uneven**
   - Primary Navbar exposes six core links plus large Portals and AI Studio dropdowns.
   - Many public routes are discoverable only through portal pages, command palette, footer, or direct links.
   - This is not necessarily orphaning, but hierarchy is difficult to learn.

7. **Sitemap is largely static-data driven**
   - Evidence: `src/app/sitemap.ts` imports local datasets.
   - Risk: published DB-only records may not be added automatically to the sitemap.
   - Tier-A publication therefore requires a sitemap strategy.

8. **Absolute base URL is duplicated**
   - `src/app/sitemap.ts`, `robots.ts`, and locale layout use the Vercel URL directly while root metadata supports `NEXT_PUBLIC_SITE_URL`.
   - Risk: custom-domain canonical inconsistency.

9. **External-window safety is inconsistent**
   - Most `_blank` anchors include `rel="noopener noreferrer"` or `rel="noreferrer"`.
   - `DigitalExamClient.tsx` uses `window.open(..., "_blank")` without explicit feature flags.
   - `PublicProfileClient.tsx` has a `_blank` internal Link without a `rel` attribute.

10. **No global 404 experience**
    - Dynamic routes often call `notFound()`, but no custom `not-found.tsx` exists.

## Route Readiness Classification

| Classification | Examples | Notes |
|---|---|---|
| Strong public experiences | home, tools, courses, prompts, major portal landings | Functional and metadata-rich |
| Strong but dependency-sensitive | mentor, CV analysis, generators, email/results | Requires env/API smoke tests |
| Hybrid/fallback experiences | automation and IoT libraries, core content lists | Can mask DB integration gaps |
| Private/auth-dependent | dashboard, profile, plans, certificates | Needs authenticated manual QA |
| Admin-only | admin studio, admin APIs | Authorization exists; UX and lifecycle need work |
| Weak/dead-end candidates | empty blog bodies, inactive project CTA, coming-soon content | Must be fixed before launch |

## Required Pre-Launch Link QA

1. Generate a normalized route manifest including dynamic route fixtures.
2. Crawl both `/ar` and `/en` builds.
3. Validate every anchor/button and expected status.
4. Test locale preservation for all internal navigation.
5. Test authenticated and unauthenticated redirects.
6. Test all external links for safe new-window behavior.
7. Validate sitemap URLs against actual routes and published records.

Items not directly executable without a running authenticated app are marked: **Needs live/manual verification**.
