# Dead Pages & Dead Links Audit

**Scope:** Navbar, Footer, Landing, Admin shortcuts, internal hrefs in major clients  
**HEAD:** `94348be86157f4d7b634069234ec89fb7ed5bc4b`

## Summary

| Category | Count |
|----------|------:|
| Dead links (UI → 404) in active nav/footer/landing | **0** |
| Dead pages (route exists, zero inbound nav) | **12** primary orphans |
| Orphan routes total (incl. portal sub-routes, auth flows) | **18** top-level + ~35 sub-routes |
| `href="#"` (skip link only) | 1 (`#main-content` — valid) |
| Empty / javascript:void hrefs | **0** in components |
| Unmounted components with valid links | 2 carousels |
| Wrong admin destination links | 1 confirmed |

## Dead links (none in primary navigation)

All Navbar, Footer, and Landing `Link`/`href` values resolve to existing `page.tsx` files.

### Wrong destination (not 404)

| Source | Link | Problem |
|--------|------|---------|
| `AutomationGlossaryClient.tsx` | Admin CTA → `/admin` or dashboard | Should target admin glossary/CMS tab |
| Certificate clients | `/certificates/verify/{code}` | Works but non-canonical vs localized route |
| Email templates | `/en/language/verify/{id}` | Redirects — extra hop |

## Orphan pages (exist, not linked from nav/footer/landing)

| Route | Why orphan | Should be public? |
|-------|------------|-------------------|
| `/cloud` | Not in `portals.ts`, nav, footer, landing | Yes — page is real marketing shell |
| `/prompts` | Not in nav; only in unmounted carousel | Yes |
| `/automation-glossary` | Phase 4 pilot; no nav entry | Yes (pilot) |
| `/learning-plans` | Dashboard-internal | Auth-only OK |
| `/certificates` | Dashboard flow | Auth OK |
| `/onboarding` | Post-register flow | Auth OK |
| `/forgot-password`, `/reset-password` | Linked from login only | Auth OK |
| `/projects/[slug]/build` | No list link to build step | Partial orphan |
| `/u/[username]` | Public profiles | SEO OK |
| `/certificates/verify/[code]` | Legacy non-locale | Public OK |
| `/coming-soon` | In portals grid as card | Linked from landing grid only |

## Disconnected tools

| Tool | Route | Nav? | Admin? |
|------|-------|------|--------|
| Cloud Academy | `/cloud` | No | No dedicated portal tab |
| Tools Hub (global) | `/tools` | Yes | via ai-tools-cms |
| Automation tools | `/automation/tools` | Portal only | automation-cms |
| Compare tools | `/compare-tools` | AI Studio dropdown | Partial |
| Roadmap generator | `/roadmap-generator` | Navbar | No footer link |
| Tool recommender | `/tool-recommender` | Navbar | No footer link |

## Duplicated / superseded routes

| Pattern | Routes | Issue |
|---------|--------|-------|
| Certificate verify | `/[locale]/certificates/verify/[certId]`, `/certificates/verify/[code]`, `/[locale]/language/verify/[certId]` | 3 URL families |
| Homepage | `/` → redirect `/ar` | OK |
| AI tools | `/tools` vs portal-specific tool pages | Intentional split |

## Placeholder actions

No `javascript:void` or empty `href=""` in interactive buttons. Form placeholders are input hints only.

## Auth-blocked pages without explanation

| Route | Behavior |
|-------|----------|
| `/admin` | Redirects non-admin (middleware/layout) |
| `/dashboard` | Requires login |
| `/profile` | Requires login |

Error messaging varies — not uniformly explained on redirect.

## Hidden pages that should be public

- `/cloud` — full page, sitemap listed, no nav
- `/automation-glossary` — public pilot content
- `/prompts` — substantial content

## Public pages that should be admin-only

None identified as incorrectly public. Admin CMS API routes are server-protected (with noted security gaps in `security-audit.md`).

## Unmounted link sources (dead UX, live routes)

`Premium3DShowcaseCarousel` and `FeaturedShowcaseCarousel` contain 12+ valid internal links but **never render**.

## Recommended cleanup (plan)

1. Add `/cloud` to `portals.ts` or remove page + sitemap entry
2. Add `/prompts` to footer "More links"
3. Link `/automation-glossary` from automation portal hub
4. Canonicalize certificate verify URLs
5. Delete or mount showcase carousels
6. Fix automation glossary admin CTA
