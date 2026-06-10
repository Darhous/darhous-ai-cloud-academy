# Routes, Links, and Navigation Audit

## Inventory

- Page routes: 88
- Route handlers: 65
- Layouts: 9

## Confirmed Defects

- `src/app/[locale]/automation-glossary/AutomationGlossaryClient.tsx:39` sends admins to `/${locale}/dashboard`, not `/${locale}/admin`.
- The public automation glossary pilot is absent from the main navigation and sitemap, making it difficult to discover.
- `src/app/sitemap.ts:29` includes `/language/history`, but that page declares `noindex` and represents authenticated history.
- `src/app/[locale]/projects/[slug]/build/page.tsx` exists, but project detail links to an in-page `#build-steps` section instead. No normal UI link to the dedicated build route was found.
- Certificate verification is split across nonlocalized and localized route families. Callers do not consistently use the same route.

## Positive Findings

- No broad set of literal links pointing to nonexistent localized routes was found.
- Login, registration, dashboard, admin, and major portal links generally include the active locale.
- Private dashboard, profile, admin, learning-plan, and certificate pages declare `noindex`.

## Sitemap Gap

The sitemap omits the automation glossary pilot and includes a noindex/private history route. This is an internal contradiction, not merely an SEO preference.

