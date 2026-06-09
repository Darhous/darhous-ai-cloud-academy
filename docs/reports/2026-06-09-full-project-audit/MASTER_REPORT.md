# Full Project Audit and Launch-Readiness Strategy

## 1. What Exists Now?

NexaLearn/Darhous is a large bilingual Next.js 16 learning platform with 87 page routes, 63 APIs, seven available portal experiences, AI utilities, exams, career tools, automation/IoT libraries, student accounts, certificates, profiles, and a broad admin studio. It has strong metadata coverage, sitemap/robots support, published-only DB readers, RLS-backed content tables, and a verified read-only preview for imported drafts.

## 2. What Is Production-Ready?

Locally, TypeScript passes and lint has no errors. Core public static/hybrid experiences appear structurally ready. Admin route authorization, published-only public queries, RLS policy intent, metadata, RTL layout, focus styles, and reduced-motion CSS are solid foundations.

Production readiness is conditional because the complete build, deployed environment, live auth roles, RLS behavior, external integrations, and full route crawl were not verified.

## 3. What Is in the Database but Not Live?

600 Tier-A records across 19 tables are verified in Supabase Production as `draft`. None are published. They are available in the admin read-only Draft Preview but are not meaningfully wired to public portal pages.

## 4. What Is Live-Wired Already?

The latest authoritative checkpoint classifies 210 records as live-wired/existing and intentionally excluded from Tier-A conversion. Existing application content also comes from hardcoded datasets and older DB-backed CMS tables such as courses, tools, prompts, projects, paths, glossary, blog, Automation CMS, IoT CMS, and Exam CMS.

## 5. What Is Deferred and Why?

230 normalized records are deferred/schema-risk, including `tools_hub` and `nano_banana`. Their schemas may conflict with active application models. They must remain untouched until a dedicated architecture decision.

## 6. Which Routes/Pages Are Complete?

Strong route families include:

- homepage and primary core libraries;
- portal landing pages;
- many Automation and IoT list/detail experiences;
- language and digital exam workflows;
- auth/account/admin route shells;
- metadata-rich dynamic detail pages.

“Complete” here means code structure and visible feature surface, not fully live-verified behavior.

## 7. Which Routes/Pages Are Dead Ends or Weak?

- Project detail has an inactive “Build This Project” CTA despite a build route existing.
- Some blog details show “Full content coming soon.”
- The coming-soon portal is intentionally non-functional.
- No route-level loading/error/not-found experiences exist.
- Some private or AI-backed routes can only be validated with production configuration.

## 8. Which Links/Buttons Are Broken or Suspicious?

- Confirmed inactive project CTA.
- Coach output candidate `/projects` omits locale.
- Admin preview links hardcode Arabic.
- Some new-window behavior is inconsistent.
- Sitemap uses static datasets and may omit future DB-only published content.
- No generic `#` placeholder links were found.

## 9. Which Admin Areas Are Too Crowded?

All of them share one flat level. The admin has 29 top-level horizontal tabs in a 5,277-line client component. Content CMS, portal settings, users, analytics, email, security, and system health need grouped navigation and deep links.

## 10. Which Tables Exist but Are Not Meaningfully Used?

The 19 Tier-A tables are production-populated and previewable but not publicly integrated. They are best classified as `draft-preview-only`. Deferred `tools_hub` and `nano_banana` tables are not active migrations.

## 11. Which Used Tables Lack Clean Admin UX?

The existing CMS tables are managed, but their tools are fragmented across many tabs. The 19 Tier-A tables lack publish/edit/archive UX entirely. Operational tables are visible through mixed bespoke panels rather than a coherent admin shell.

## 12. What Must Be Done Before Launch?

1. Obtain a clean CI/deployment build.
2. Fix confirmed dead links/actions and thin indexed content.
3. Add critical route loading/error/not-found states.
4. Redesign admin information architecture.
5. Implement a safe Tier-A single-record publishing pilot.
6. Test anonymous/student/admin authorization and RLS.
7. Add targeted automated smoke tests.
8. Reconcile 180/260 versus 210/230 documentation.
9. Run bilingual responsive/accessibility/performance QA.
10. Define rollback/unpublish and release procedure.

## 13. What Can Wait Until After Launch?

- bulk publish/delete;
- scheduled publishing;
- complete inline Admin Mode rollout;
- full motion redesign;
- advanced version history;
- deferred schema implementation;
- broad personalization.

## 14. Recommended Next Implementation Phase

**Admin CMS Information Architecture + Tier-A Publishing Workflow Foundation**

First preserve behavior while replacing the flat admin navigation. Then add a feature-flagged, single-table Tier-A publishing pilot with explicit draft/published/archive transitions and audit logs.

## 15. Exact Safest Future Sequence

1. Fix links/dead ends and add route recovery states.
2. Create grouped admin shell without changing APIs.
3. Define Tier-A lifecycle and validation registry.
4. Implement one-table single-record publish/unpublish/archive pilot.
5. Verify RLS, cache invalidation, audit logs, and anonymous non-leakage.
6. Add inline Admin Mode for that pilot content type.
7. Wire its published-only public list/detail experience.
8. Repeat content type by content type.
9. Apply the calmer UI/UX Pro Max design system.
10. Add selective AhmedAli-inspired motion.
11. Decide deferred schemas separately.
12. Run full launch candidate QA.

## Top 10 Critical Findings

1. 600 drafts are not live and lack lifecycle controls.
2. 19 Tier-A tables lack public integration.
3. Admin navigation has 29 flat tabs.
4. Admin client is 5,277 lines.
5. Build completion is not verified.
6. No automated tests exist.
7. No route-level loading/error/not-found files exist.
8. Project CTA is inactive.
9. Static fallback can mask DB failures.
10. Content classification documentation conflicts.

## Top 10 UX Opportunities

1. Grouped RTL-aware admin sidebar.
2. Admin command palette.
3. Favorites/recent admin tools.
4. Contextual Admin Mode.
5. Editorial homepage hierarchy.
6. Calm neutral cards with portal accents.
7. Premium bilingual typography.
8. Standard empty/loading/error states.
9. Selective stacked-card and kinetic-word motion.
10. Source-neutral content components ready for DB wiring.

## Top 10 Launch Blockers/Risks

1. Unverified clean production build.
2. No test suite.
3. Draft publishing absent.
4. RLS/live role matrix unverified.
5. Inactive/weak public CTAs/content.
6. Admin IA overload.
7. Missing route resilience.
8. Static/DB duplication and silent fallback.
9. External integration environment uncertainty.
10. Count/documentation integrity mismatch.

## Final Recommendation

The platform should not be treated as a content-import project anymore. It is now a CMS lifecycle, integration, and launch-quality project. The highest-value work is controlled publishing and admin usability, followed by published-only public wiring, then visual redesign and motion.

## Safety Confirmation

Documentation only. No Supabase SQL executed; no DB writes; no migrations; no imports/seeds; no publishing; no CRUD implementation; no app behavior changes; no public UI wiring; no `tools_hub` or `nano_banana` implementation changes; no live-wired/deferred record changes; no forbidden untracked files touched.
