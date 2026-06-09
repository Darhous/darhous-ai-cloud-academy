# Admin CMS IA and Publishing Foundation Blueprint

## Phase Information
- **Phase Title**: Admin CMS Information Architecture + Tier-A Publishing Workflow Foundation Blueprint
- **Date**: 2026-06-09
- **Purpose**: Deep inspection and planning for breaking down the monolithic admin client and establishing a safe publishing lifecycle for 600+ draft records.

## Files/Reports Inspected
- `src/components/admin/AdminDashboardClient.tsx`
- `src/app/[locale]/admin/page.tsx`
- `src/lib/admin/cms-registry.ts`
- `src/lib/admin/draft-content-preview-config.ts`
- `src/config/portals.ts`
- 13 Project Audit Reports
- Previous Antigravity rules and project logs.

## Summary Verdict
The codebase is currently stable but severely monolithic in the admin section (~5,277 lines). Adding complex publishing UI directly to this monolith introduces critical risk. A structural decomposition must precede the publishing workflow integration.

## Recommended Pilot
**Option A: Admin IA shell implementation first, no publishing actions.**
*Why*: The current 29-tab monolithic client is a major bottleneck. Safely extracting it into a grouped, nested architecture minimizes merge conflicts, improves rendering performance, and creates the clean sub-components necessary to safely build out the CMS publishing workflows in the future.

## What Was Not Changed
No application code, configurations, database records, or protected files were modified. This phase was purely read-only documentation.

## Explicit Safety Confirmation
- No Supabase SQL executed.
- No DB writes performed.
- No application code modified.
- All protected files untouched.

## Next Recommended Station
**Admin IA Shell Implementation (Option A Pilot)**
