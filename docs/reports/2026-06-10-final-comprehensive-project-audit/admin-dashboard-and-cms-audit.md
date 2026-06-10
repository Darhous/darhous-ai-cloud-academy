# Admin Dashboard and CMS Audit

## Protection

- `src/app/[locale]/admin/page.tsx` performs server-side session and admin-role checks.
- Generic CMS and draft-preview APIs call `verifyAdminRequest`.
- Draft preview uses a whitelist, forces `status = draft`, and is read-only.
- No evidence was found that admin controls are rendered to ordinary visitors on the public pilot.

## High-Risk Defects

- `GenericCmsTypePanel.tsx` always sends `status` during save.
- `src/app/api/admin/cms/[table]/[id]/route.ts` rejects any `status` field for all tables except `automation_glossary`.
- Result: editing most of the 22 generic registry types can return 403 even when the content fields are valid.
- The same generic API exposes hard `DELETE` for every registered table. The UI explicitly offers “Delete permanently.”
- Publishing is locked to one pilot table, but deletion is not comparably constrained.

## Architecture

- `CMS_REGISTRY` covers 22 existing Automation/IoT/Exam tables.
- The 19 Tier-A imported tables are not in that registry; they use `DRAFT_PREVIEW_TABLES` and remain read-only.
- `AdminDashboardClient.tsx` remains more than 5,300 lines and contains many bespoke panels despite extraction work.
- Nano Banana admin code includes destructive delete/storage operations. These are admin-gated, but conflict with the project’s repeated “untouched/deferred” risk posture.

## Navigation

All major admin tab IDs inspected have corresponding render branches. The automation glossary inline badge points to the wrong admin destination.

