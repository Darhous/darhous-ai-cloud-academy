# Launch Readiness Gap List

## P0: Must Resolve Before Launch

| Gap | Evidence | Resolution |
|---|---|---|
| Build not conclusively verified | compile succeeded, then `spawn EPERM`; escalated build timed out | complete clean CI/Vercel build |
| No automated tests | no test/spec files found | add targeted smoke/integration coverage |
| No route-level loading/error/not-found UX | none found under `src/app` | add shared boundaries and critical route loading |
| Inactive project CTA | project detail “Build This Project” button | wire to existing build route |
| Tier-A publish lifecycle absent | preview GET only; 600 drafts | implement audited single-record workflow |
| Admin IA overload | 29 horizontal top-level tabs | grouped CMS/admin shell |
| Production environment verification absent | local-only audit | execute launch smoke matrix |
| Content/documentation count conflict | 180/260 vs 210/230 | reconcile authoritative docs |

## P1: Strongly Recommended Before Launch

- Resolve 51 lint warnings or explicitly baseline accepted warnings.
- Verify all sitemap URLs and include future published DB records.
- Replace/complete blog detail pages with missing bodies or remove them from launch navigation/sitemap.
- Fix non-localized admin preview links and coach route output.
- Add analytics/error observability for DB fallback events.
- Validate all admin mutation defaults and prevent accidental publish.
- Test RLS with anonymous, student, and admin roles.
- Validate Arabic/English across mobile/tablet/desktop.
- Validate dark/light contrast and modal focus.
- Audit external window safety.
- Test auth redirects and password reset.

## P2: Can Follow Launch

- Full inline Admin Mode rollout after publishing is stable.
- Versioned content history beyond audit events.
- Bulk operations.
- Scheduled publishing.
- Whole-site GSAP narrative layer.
- Advanced personalization.
- `tools_hub` and `nano_banana` schema decisions.
- Deep admin analytics redesign.

## Functional QA Matrix

- Anonymous public browsing.
- Student registration/login/onboarding/logout.
- Student progress/saved items/plans.
- Admin access denial and success.
- Draft preview exact counts.
- Publish/unpublish pilot when implemented.
- Search and command palette.
- Certificate verification.
- Language assessment/result history.
- Digital exam submission/results.
- AI features with missing and valid keys.
- Contact/community/email paths.

## Non-Functional QA

- Lighthouse/Core Web Vitals.
- keyboard-only navigation;
- screen-reader landmarks and dialogs;
- reduced motion;
- 375/768/1024/1440 responsive;
- RTL/LTR;
- light/dark;
- slow network;
- Supabase unavailable/degraded;
- error logging;
- security headers and CSP decision.

## Launch Gate

Launch only when:

- build passes in deployment CI;
- P0 gaps are closed;
- no draft is visible anonymously;
- critical auth/admin/public journeys pass;
- content count documentation is reconciled;
- rollback and unpublish procedure is documented;
- release candidate is manually signed off in both locales.
