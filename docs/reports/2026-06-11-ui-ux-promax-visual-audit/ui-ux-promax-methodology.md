# UI/UX Pro Max Methodology

## UI/UX Pro Max Skill Methodology Applied

The audit uses `.codex/skills/ui-ux-pro-max/SKILL.md` as its governing method and `UX PROMAX.MD` as historical project context. The historical file was not accepted as current evidence without checking the present source.

The required design-system search returned:

- Pattern: **Enterprise Gateway**
- Style: **Liquid Glass**
- Color intent: learning indigo plus progress green
- Typography direction: Arabic-specific display/body families
- Primary risks: Liquid Glass contrast and performance
- Anti-patterns: cheap visuals and fast/excessive animation
- Delivery rules: SVG icons, visible focus, 4.5:1 contrast, reduced motion, 44px touch targets, and 375/768/1024/1440 responsive verification

## Scoring Model

Each category is scored from 0 to 100 using source evidence, live evidence where available, and production validation.

| Category | Weight |
|---|---:|
| Visual hierarchy | 12% |
| Layout and structure | 10% |
| Design consistency | 10% |
| User experience | 12% |
| Conversion readiness | 10% |
| Mobile UX | 12% |
| RTL/LTR quality | 12% |
| Accessibility | 10% |
| Motion and interaction | 6% |
| Production polish | 6% |

Severity is defined as:

- **Critical:** prevents trustworthy launch or blocks a locale/core journey.
- **High:** materially damages comprehension, accessibility, conversion, or mobile use.
- **Medium:** noticeable inconsistency or friction with a viable workaround.
- **Low:** polish issue with limited user impact.

Priority is:

- **Must Fix:** required before publishing the intended product.
- **Should Fix:** schedule immediately after launch blockers.
- **Nice to Have:** polish after the system is stable.

## Evidence Sources

- 92 page files, 9 layouts, 128 component files.
- `package.json`, root and locale layouts, global CSS, portal registry, landing sections, navigation, footer, auth, dashboard guard, portal roots, certificate verification, metadata, sitemap, robots, and global state files.
- Live root inspection on the Vercel URL.
- `npm run typecheck`, `npm run lint`, and `npm run build`.
- Next.js 16.2.6 local documentation for metadata/OG, production, loading, and error handling.

## Audit Rules

1. Findings must map to a UI/UX Pro Max dimension.
2. Existing strengths reduce the score penalty but do not excuse launch blockers.
3. Code presence is not treated as proof of live deployment.
4. A bilingual route is not scored as bilingual when its content or direction is hard-coded.
5. Hover behavior is not considered a complete mobile interaction.
6. Decorative motion is penalized when multiple continuous or scroll-linked systems compete.
7. Build success confirms technical compilability, not visual acceptance.

## Constraints

- No production source code was changed.
- Existing uncommitted user changes were preserved.
- The in-app browser was unavailable, so no fabricated screenshot claims are included.
- Live inspection was limited to the available web response; full mobile/tablet device interaction remains an acceptance gate.
- Authenticated dashboard/admin behavior was assessed from code, not a real user session.

## What Was Not Evaluated

- Curriculum correctness or educational outcomes.
- Supabase/RLS security beyond UX-visible states.
- AI response quality.
- Legal validity of terms, privacy, or certificates.
- Real Core Web Vitals field data.
- Paid acquisition, pricing, or market positioning.
