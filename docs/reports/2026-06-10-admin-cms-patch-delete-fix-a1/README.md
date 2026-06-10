# Admin CMS PATCH & DELETE Fix (A1)

## Overview
This patch addresses two critical bugs in the Admin CMS interface:
1. **BUG 1 (403 on PATCH):** The generic UI component was sending the `status` field in its regular `PATCH` payload for all CMS tables, which caused the generic API route to reject the update on non-pilot tables with an HTTP 403.
2. **BUG 2 (Hard DELETE Data Loss):** The generic `DELETE` handler was issuing a hard SQL `DELETE`, which permanently deleted records.

## Resolution
- Stripped `status` from the regular `PATCH` payload in `GenericCmsTypePanel.tsx`. Content edits no longer attempt to update status (which is restricted to specific tables or separate actions).
- Modified the `DELETE` API handler in `route.ts` to perform a soft-archive. It now updates the record's `status` to `'archived'` instead of deleting it.
- All non-pilot tables can now be safely edited without triggering a 403 error.
- All records across the 22 tables will be soft-archived rather than fully deleted.

## Scope
Modified Files:
- `src/components/admin/cms/GenericCmsTypePanel.tsx`
- `src/app/api/admin/cms/[table]/[id]/route.ts`

Read Files:
- `src/lib/admin/cms-registry.ts`
