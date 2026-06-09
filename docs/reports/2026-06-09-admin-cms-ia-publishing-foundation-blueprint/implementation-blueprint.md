# Implementation Blueprint

## Exact Phases
1. **Phase 1: Admin Shell Extraction (Pilot)** - Decompose `AdminDashboardClient.tsx` into a modular sidebar layout with sub-components.
2. **Phase 2: Publishing Backend Actions** - Create safe, generic server actions for transitioning state (Publish, Unpublish, Archive) with audit logging.
3. **Phase 3: CMS Publishing UI** - Wire the new backend actions into the decomposed Admin CMS panels.

## Intended File Creation/Modification List
- **Modify**: `src/components/admin/AdminDashboardClient.tsx` (Reduce size drastically)
- **Create**: `src/components/admin/AdminLayout.tsx`
- **Create**: `src/components/admin/AdminSidebar.tsx`
- **Create**: `src/components/admin/AdminCommandPalette.tsx`
- **Create**: `src/app/api/admin/publish/route.ts` (or Server Actions equivalent)

## Dependency Order
Phase 1 must precede Phase 3. The 5,277-line client is too unstable to safely inject complex publishing and preview UI without modularizing it first. Phase 2 (Backend) can happen in parallel with Phase 1.

## Acceptance Criteria Per Phase
- **Phase 1**: Admin UI functions exactly as before but is modular. No missing tabs. Deep linking works.
- **Phase 2**: Backend endpoints correctly update status, reject unauthorized users, and log to audit trails.
- **Phase 3**: Clicking "Publish" in the CMS updates the UI, logs the action, and invalidates the cache.

## Rollback Strategy
All Phase 1 UI extractions must be done safely alongside the original component (e.g., using a feature flag or a parallel `/admin-v2` route temporarily) to allow immediate rollback if regressions occur.

## Checkpoint/Release Expectations
Each Phase will generate a checkpoint tag. Completion of Phase 3 will trigger a GitHub Release for "CMS Publishing Workflow Beta".
