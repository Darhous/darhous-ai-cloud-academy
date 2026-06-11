# Full Visual Audit

## Audit Register

| Page/component | Problem and evidence | Pro Max criterion | User impact | Severity | Recommendation | Priority |
|---|---|---|---|---|---|---|
| Live Vercel root | Live content shows legacy Darhous/version-2 presentation while local metadata and hero use NexaLearn. | Production Polish, Consistency | Users do not see the intended product and shared links misrepresent the current brand. | Critical | Verify Vercel project/branch/domain, deploy current SHA, and compare visible copy plus asset hashes. | Must Fix |
| Career, Automation, IoT roots | Page wrappers use `dir="rtl"` regardless of locale; large copy blocks are Arabic-only. | RTL/LTR, UX | English users receive an RTL Arabic experience. | Critical | Remove hard-coded direction; build locale dictionaries and use logical properties. | Must Fix |
| Portal registry | `Cloud Academy` route exists but registry explicitly omits it. | IA, Consistency | Users cannot discover a real portal from the main ecosystem. | High | Add Cloud with approved token/icon/content or de-list the route consistently. | Must Fix |
| Portal registry and portal cards | Portal identity uses emoji strings (`🤖`, `🌐`, `💻`, etc.). | Consistency, Accessibility | OS-dependent rendering reduces premium quality and visual control. | High | Store typed icon keys and render Lucide/custom SVG with fixed 24px viewBox. | Must Fix |
| Navbar | Six links + portal dropdown + 12-item AI Studio + utilities + auth. | Hierarchy, Navigation | High cognitive load; primary product tasks are unclear. | High | Reduce to 4 task-based groups and move secondary tools to an Explore hub. | Must Fix |
| Hero | Start Journey and Explore Paths both call `scrollToPath`. | Conversion | Two labels imply different outcomes but behave identically. | High | Primary opens onboarding/path selector; secondary scrolls to portals. | Must Fix |
| Homepage | Cinematic intro, progress indicator, two marquees, sticky stack, 3D carousel, ecosystem map, animated mentor and timeline coexist. | Motion, Hierarchy | Attention is fragmented; mobile/GPU cost rises. | High | Keep one signature scroll interaction, one passive marquee maximum, and static fallbacks. | Should Fix |
| Homepage content order | Portal stack appears before path selector, but a 3D showcase and duplicated ecosystem visualization sit between decisions. | Layout, Conversion | Journey is long before a user reaches a decisive action. | High | Hero → proof → portals → path selector → mentor → outcomes → CTA. | Should Fix |
| Landing CTA copy | “Now or Never / الآن أو لا تندم لاحقًا” is pressure-oriented. | Conversion, Trust | Can feel manipulative for an educational brand. | Medium | Use outcome-led copy such as “ابدأ مسارك المجاني”. | Should Fix |
| Brand system | NexaLearn, Darhous Academy, My Darhous Hub, Darhous Portals, and legacy `public/og-image.svg` coexist. | Consistency, Production | Brand trust and social sharing are inconsistent. | High | Define canonical brand labels and replace all legacy UI/asset strings. | Must Fix |
| OG metadata | Root points to `/og`, locale layout points to legacy `/og-image.svg`; portal pages inherit the SVG. | SEO Visual Readiness | Social previews vary by route and may show old branding. | High | Use one 1200x630 raster/dynamic NexaLearn OG, then route-specific portal variants. | Must Fix |
| Auth forms | Password reveal buttons use `p-1`; social/footer icons use 36px targets. | Mobile, Accessibility | Tap accuracy is below the 44px Pro Max rule. | High | Use `min-w/min-h:44px` and at least 8px separation. | Must Fix |
| Auth feedback | Error blocks contain emoji and no `role="alert"`/`aria-live`; labels lack explicit `htmlFor`. | Accessibility, Forms | Screen-reader users may miss errors and label association is weaker. | High | Add IDs, `htmlFor`, `aria-describedby`, `role="alert"`, and SVG status icons. | Must Fix |
| Register legal consent | Terms/privacy statement is plain text rather than linked routes. | UX, Trust | Users cannot inspect terms at the commitment point. | Medium | Link both documents and retain locale. | Should Fix |
| Global loading | Single English “Loading” spinner for all locales/routes. | Loading States, RTL/LTR | Arabic users lose context; long operations lack skeleton hierarchy. | Medium | Localize and create route-family skeletons for catalogs/dashboard/exams. | Should Fix |
| Error and 404 | Global copy is English-only and home link uses `/`, not locale home. | Error Recovery, RTL/LTR | Arabic users lose locale; recovery may redirect unexpectedly. | High | Read locale, link to `/${locale}`, and localize recovery actions. | Must Fix |
| Dashboard | Protected route is guarded, but visual copy still includes “My Darhous Hub” and portal wording. | Consistency | Logged-in experience feels like another product. | High | Rename via central brand dictionary and align portal naming. | Must Fix |
| Certificate verify | Top strip says `DARHOUS ACADEMY` while body says NexaLearn; type labels contain emoji. | Trust, Consistency | Verification is a trust-critical surface with mixed issuer identity. | High | Use canonical legal/brand issuer lockup and SVG category marks. | Must Fix |
| Light mode glass | Several inline borders use `rgba(255,255,255,...)` outside light overrides. | Contrast, Consistency | Borders and hierarchy may disappear or become inconsistent in light mode. | Medium | Replace inline glass values with semantic surface/border tokens. | Should Fix |
| Portal layouts | Repeated fixed 40–55vw blurred orbs plus global orb. | Performance, Motion | Excess compositing and visual sameness across portals. | Medium | One portal atmosphere layer, static on mobile, no fixed blur on low-power mode. | Should Fix |
| Card interactions | Repeated hover scale/translate patterns up to 1.05. | Interaction | Creates motion noise and can make dense grids unstable. | Medium | Prefer border/color/shadow changes; cap transforms at 1–2px. | Should Fix |
| Content cards | Many layouts mix one-off inline colors, borders, and shadow values. | Design System | Visual changes require repetitive edits and drift over time. | Medium | Add semantic card, status, accent, and elevation tokens. | Should Fix |
| Page metadata | 88/89 localized pages define metadata; language verify route is missing. | SEO Production | One public verification route lacks deliberate search/share treatment. | Low | Add `generateMetadata`, likely `noindex`, canonical title and description. | Should Fix |
| Images | Lint finds two raw `<img>` uses in public profile/profile settings. | Performance | Potential layout shift and unnecessary bandwidth. | Medium | Use `next/image` with known aspect ratio and fallback. | Should Fix |
| Lint baseline | 75 warnings, including effect-driven state cascades. | Production Polish, Performance | Noise hides future regressions and may increase re-renders. | Medium | Establish warning budget, fix visual/client warnings first, fail CI on new warnings. | Should Fix |
| Build | Build passes but takes ~7m49s and generates 1283 pages. | Production Readiness | Slow QA/deploy feedback increases release risk. | Medium | Cache, profile static generation, and split validation in CI. | Should Fix |

## Strengths Confirmed

- Global focus-visible ring and skip link exist.
- `prefers-reduced-motion` globally neutralizes animations.
- Locale root sets `lang` and `dir`.
- Logical spacing (`ps`, `pe`, `start`, `end`) is used widely.
- Portal color tokens and wrappers create a scalable identity base.
- Auth screens share a coherent shell.
- Metadata, sitemap, robots, and dynamic OG infrastructure exist.
- Production build and TypeScript checks pass.

## Acceptance Gate

No release should be called visually ready until:

1. Live SHA and local audited SHA match.
2. `/en/career`, `/en/automation`, `/en/iot-lab` are genuinely LTR English.
3. 375/390/768/1024/1440 screenshots are reviewed.
4. Navbar keyboard and touch flows pass.
5. OG preview displays the canonical NexaLearn identity.
