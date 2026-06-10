# Issues Register

> **Last updated:** 2026-06-10 post L1-V1.1 + B1 implementation. Status column added.

| ID | Status | Area | Severity | Type | Route/file | Symptom | Root cause | User impact | Recommended fix | Suggested phase | Dependencies | Production blocker |
|----|--------|------|----------|------|------------|---------|------------|-------------|-----------------|-----------------|--------------|-------------------|
| FPA-001 | ⚠ Partial | Landing | Critical | UX | `Premium3DShowcaseCarousel.tsx` | Owner sees no layered/3D cards | Component never imported on homepage | Expected premium effect missing | Mount below hero or replace with scroll-stack section | L1-V3 | — | yes |
| FPA-002 | ✅ Resolved | Landing | Critical | UX | `HomepageClient.tsx` | No scroll-stacked card effect | Feature never implemented | Reports promise ≠ live UX | Implement `ScrollStackPortalShowcase` or approved equivalent | L1-V1.1 `375b67e` | — | yes |
| FPA-003 | Content | Critical | missing-content | Tier-A DB (600 rows) | No new CMS content public | 0 published + no routes | 600 drafts invisible | Controlled pilot publish + wire routes | C1 | User approval, FPA-020 | yes |
| FPA-004 | Security | Critical | security | Certificate API routes | Unauthorized cert access risk | Service-role GET without ownership | Privacy/fraud | Auth + POST-only mutations | S1 | — | yes |
| FPA-005 | Admin | Critical | admin-gap | `GenericCmsTypePanel` + PATCH API | CMS edits fail 403 | Client sends `status` always | Admins cannot maintain automation/iot/exams | Split lifecycle from content PATCH | A1 | — | yes |
| FPA-006 | Admin | Critical | security | CMS DELETE route | Permanent delete | Hard delete enabled | Irreversible data loss | Archive-only or disable DELETE | A1 | — | yes |
| FPA-007 | ❌ Open | Landing | High | UX | `SmartPlatformTour.tsx` | Tour never appears | Auto-open commented Phase 5D | Onboarding feature dead | Add explicit trigger button | L1-V3 | — | no |
| FPA-008 | ✅ Resolved | Landing | High | UX | `PortalGrid.tsx` / `portals.ts` | Cards hard to notice | Below fold + subtle glass | Users miss portals | Move showcase up; stronger contrast | L1-V1.1 `375b67e` | — | no |
| FPA-009 | Localization | High | bug | `portals.ts` features | EN page shows Arabic pills | Features not localized | English UX broken | Add featuresEn per portal | L2 | — | no |
| FPA-010 | Localization | High | bug | Digital exams client/data | EN exams show Arabic | No EN question fields | English exams unusable | Locale-specific questions or gate EN | L2 | — | yes |
| FPA-011 | ✅ Resolved | Brand | High | SEO | layout, manifest, certs | Mixed Darhous/NexaLearn | Partial Phase 5G | Share/install/certs inconsistent | Complete brand stack | B1 `edbaa3c`+`3caf179` | — | yes |
| FPA-012 | Certificates | High | bug | verify URL families | 3 URL patterns | Legacy + redirect coexist | Broken shares/QR | Single canonical localized URL | S1 | FPA-004 | yes |
| FPA-013 | Navigation | High | dead-page | `/cloud` | Page unreachable from nav | Not in portals.ts | Cloud product hidden | Add portal entry or deprecate | N1 | — | no |
| FPA-014 | Navigation | High | dead-page | `/prompts` | Orphan from nav | Not in navbar/footer | Content discovery poor | Add footer/nav link | N1 | — | no |
| FPA-015 | Navigation | High | dead-page | `/automation-glossary` | Pilot not discoverable | No nav/sitemap policy | Content wasted | Link from automation hub | N1 | — | no |
| FPA-016 | Admin | High | architecture | `AdminDashboardClient.tsx` | 5300+ line monolith | Incremental extraction incomplete | Slow development, regressions | Continue panel extraction | A2 | FPA-005 | no |
| FPA-017 | Content | High | missing-content | Tier-A 19 tables | No public list/detail pages | No UI wiring | 390+ rows per type unreachable | Build `ContentListPage` template | C2 | C1 pilot | yes |
| FPA-018 | CMS | High | admin-gap | draft-preview panel | Preview only, no publish | By design + safety rules | Cannot ship Tier-A | Publish workflow UI | C1 | User approval | yes |
| FPA-019 | Career | High | missing-content | `JobsClient.tsx` | Fake jobs | MOCK_JOBS | Trust damage | Real API or remove feature | N2 | — | no |
| FPA-020 | Process | High | architecture | ANTIGRAVITY rules | Publish forbidden | Safety policy | Blocks all Tier-A | Explicit user publish approval per batch | C1 | — | yes |
| FPA-021 | ⚠ Partial | Landing | Medium | UX | `CinematicIntro.tsx` | Intro skipped | sessionStorage | First-run only | Optional settings link to replay | L1-V4 | — | no |
| FPA-022 | Landing | Medium | UX | `glass-panel-promax` | Cards blend in light mode | Low contrast tokens | Weak visual hierarchy | Token bump light theme | L1 | R1 | no |
| FPA-023 | Navigation | Medium | dead-link | `AutomationGlossaryClient` | Admin CTA wrong | Links dashboard not CMS | Admin friction | Fix href to admin tab | N1 | — | no |
| FPA-024 | SEO | Medium | SEO | `sitemap.ts` | noindex route in sitemap | `/language/history` | SEO contradiction | Remove from sitemap | N1 | — | no |
| FPA-025 | Routes | Medium | dead-page | `/projects/[slug]/build` | Orphan build page | No inbound link | Dead end | Link from project page | N1 | — | no |
| FPA-026 | ⚠ Partial | Architecture | Medium | architecture | Showcase carousels | Dead code 573 lines | Never integrated | Maintenance burden | Mount or delete | L1-V3 | — | no |
| FPA-027 | Architecture | Medium | architecture | `constants.ts` NAV_LINKS | Stale unused links | Not imported | Confusion | Remove or wire | N3 | — | no |
| FPA-028 | Footer | Medium | dead-link | Footer vs Navbar | tool-recommender missing | Incomplete parity | Uneven discovery | Sync AI Studio links | N1 | — | no |
| FPA-029 | Content | Medium | missing-content | `content-source/` | 1040 files not runtime | Import to DB incomplete | Source ≠ live | Publish workflow not files | C1 | FPA-003 | no |
| FPA-030 | Content | Medium | architecture | `mergeById` | ID collision risk | Static+DB same namespace | Duplicates/hidden rows | ID registry + migration map | C1 | — | no |
| FPA-031 | IoT | Medium | admin-gap | iot-cms | PATCH broken | FPA-005 | IoT admins blocked | A1 fix | A1 | FPA-005 | no |
| FPA-032 | Automation | Medium | admin-gap | automation-cms | PATCH broken | FPA-005 | Automation admins blocked | A1 fix | A1 | FPA-005 | no |
| FPA-033 | Exams | Medium | admin-gap | exams-cms | PATCH broken | FPA-005 | Exam admins blocked | A1 fix | A1 | FPA-005 | no |
| FPA-034 | Deferred | Medium | missing-content | tools_hub Tier-A | 130 records blocked | Project rule | Cannot expand tools hub | Defer until schema approved | — | User approval | no |
| FPA-035 | Deferred | Medium | missing-content | nano_banana Tier-A | 130 records blocked | Project rule | Cannot expand nano CMS | Defer | — | User approval | no |
| FPA-036 | Mentor | Medium | UX | `MentorChat.tsx` | Plain text, fixed height | No structured UI | Below premium bar | Structured messages + layout | M1 | — | no |
| FPA-037 | Performance | Medium | performance | Static imports | Large bundles | lessons/content.ts size | Slow mobile | Code split + pagination | P1 | R1 | no |
| FPA-038 | Performance | Medium | performance | 1274 SSG pages | Long build | Many dynamic slugs | Deploy time | ISR selective | P1 | — | no |
| FPA-039 | A11y | Medium | accessibility | Custom buttons | Weak focus rings | Inconsistent primitives | Keyboard users struggle | Design system focus tokens | R1 | — | no |
| FPA-040 | A11y | Medium | accessibility | Light glass panels | Contrast fail risk | Subtle borders | Low vision users | Contrast audit fix | R1 | FPA-022 | no |
| FPA-041 | Security | Medium | security | Blog MDX | XSS surface | User HTML in content | Script injection | Sanitize allowlist audit | S2 | — | no |
| FPA-042 | Security | Medium | security | Login page | Shows env var names | Debug copy | Info disclosure | Remove from UI | S2 | — | no |
| FPA-043 | Admin | Medium | UX | CMS forms | Overwhelming dual fields | No wizard | Admin errors | Form sections + validation | A2 | — | no |
| FPA-044 | Cloud | Medium | dead-page | `/cloud` | Shell only | No content/CMS | Weak portal | Merge or build content | N2 | FPA-013 | no |
| FPA-045 | Docs | Medium | architecture | README | Outdated vs NexaLearn | Not updated post-5G | Wrong public impression | README rewrite post-fixes | B2 | B1 | no |
| FPA-046 | Log | Medium | architecture | `ANTIGRAVITY_PROJECT_LOG` | Encoding corruption | Historical entries | Untrustworthy log | Encoding repair station | D1 | — | no |
| FPA-047 | Git | Low | architecture | Phase 5E tag | Tag not on latest dup commit | Process gap | Traceability | Document canonical SHA | D1 | — | no |
| FPA-048 | Lint | Low | architecture | ESLint | 69 warnings | Debt accumulated | Hidden regressions | Triage warnings | P2 | — | no |
| FPA-049 | Build | Low | performance | Local lint | 5.7 min runtime | Large codebase | Slow dev feedback | Lint cache/scope | P2 | — | no |
| FPA-050 | ✅ Resolved | Homepage | Low | SEO | `[locale]/page.tsx` metadata | Darhous not NexaLearn | Not updated | SEO brand leak | Update metadata | B1 `edbaa3c` | — | no |
| FPA-051 | Footer | Low | dead-link | roadmap-generator | Navbar only | Omission | Discovery gap | Add to footer | N1 | — | no |
| FPA-052 | Auth | Low | UX | onboarding | No nav link | Flow-only | OK for auth | Document flow | — | — | no |
| FPA-053 | Dashboard | Low | performance | `StudentDashboardClient` | Very large client | Feature creep | Mobile jank | Split tabs lazy | P1 | — | no |
| FPA-054 | IoT | Low | UX | Some IoT clients | Arabic-only placeholders | Hardcoded AR | EN IoT search weak | i18n placeholders | L2 | — | no |
| FPA-055 | Career | Low | UX | CV forms | Arabic-heavy labels | Bilingual gap | EN career UX | i18n labels | L2 | — | no |
| FPA-056 | Certs | Low | SEO | Copyright 2025 | Stale year | Hardcoded | Freshness | Dynamic year | B1 | — | no |
| FPA-057 | Admin | Low | accessibility | CMS tables | Missing th scope | HTML tables | SR confusion | Table a11y pass | A2 | — | no |
| FPA-058 | Tools | Low | architecture | tools vs tools-hub naming | Confusing mapping | Naming drift | Dev confusion | Document mapping | D1 | — | no |
| FPA-059 | Nano | Low | missing-content | Tier-A deferred | Cannot import | Rule | Static only OK | Keep deferred | — | — | no |
| FPA-060 | Hooks | Low | performance | setState in effect warnings | Lint noise | Pattern debt | Perf hints | Refactor hooks | P2 | — | no |
| FPA-061 | Edge | Low | performance | Edge runtime pages | SSG disabled | next config | Mixed caching | Review edge necessity | P1 | — | no |
| FPA-062 | ⚠ Partial | OG | Low | SEO | og-image.svg | Old Darhous art | Not regenerated | New OG asset | B1 remaining | — | no |
| FPA-063 | Command palette | Low | architecture | Search | Not in nav audit scope | Separate entry | OK feature | Document in IA | D1 | — | no |
| FPA-064 | Public profile | Low | dead-page | `/u/[username]` | Limited inbound | By design | OK | SEO only | — | — | no |
| FPA-065 | Coming soon | Low | UX | coming-soon portal | In grid as card | Intentional | Slight clutter | Keep or move to footer | N3 | — | no |

## Counts (as of 2026-06-10 post L1-V1.1 + B1)

| Severity | Original | Resolved | Partial | Open |
|----------|------:|------:|------:|------:|
| Critical | 6 | 1 (FPA-002) | 1 (FPA-001) | 4 |
| High | 14 | 2 (FPA-008, FPA-011) | 0 | 12 |
| Medium | 31 | 0 | 2 (FPA-021, FPA-026) | 29 |
| Low | 14 | 1 (FPA-050) | 2 (FPA-056→cert year, FPA-062→OG SVG) | 11 |
| **Total** | **65** | **4** | **5** | **56** |

Note: FPA-001 and FPA-002 counted separately; executive summary rounds Critical to 8 including certificate brand (FPA-011/012 grouped in summary). FPA-056 (copyright year) partially resolved — year is still hardcoded but brand text updated.
