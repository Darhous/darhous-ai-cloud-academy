# Admin-Only Read-Only Draft Content Preview Handoff

> **Status:** Implementation Complete.

## 1. Executive Summary

This station successfully implemented the **Admin-Only Read-Only Draft Content Preview Dashboard** (Phase 1 of the post-import strategy).

- A safe, read-only interface was added to the Admin Dashboard for reviewing the 600 imported Tier-A draft content records.
- The implementation remains strictly **read-only** from a data perspective.
- **No data writes, migrations, or imports happened.**
- **CRUD and publish capabilities remain intentionally disabled** to protect the integrity of the data.
- Public UI wiring remains untouched.

## 2. What Was Added

1. **Config (`src/lib/admin/draft-content-preview-config.ts`)**: Created a whitelist-based configuration containing the 19 imported Tier-A core content tables, including expected counts and display fields.
2. **API Route (`src/app/api/admin/draft-content-preview/route.ts`)**: Added a dedicated, admin-only read API. This API enforces:
   - Admin authentication.
   - Whitelisted tables only.
   - Read-only queries (no POST/PATCH/DELETE).
   - Enforced `draft` status filter.
   - Conservative pagination and search limits.
3. **UI Panel (`src/components/admin/cms/DraftContentReviewPanel.tsx`)**: Created a read-only review component. It displays total counts, handles search and pagination, and renders complex JSONB data fields as read-only blocks.
4. **Dashboard Integration (`src/components/admin/AdminDashboardClient.tsx`)**: Added a new "Draft Content Review" tab to the admin dashboard, pointing to the new read-only panel.

## 3. Safety Controls Verified

- **No Publishing:** The API strictly filters by `status = 'draft'` and provides no mutation paths.
- **No Editing/Deleting:** UI contains no writable inputs, edit buttons, or delete actions. The API lacks corresponding REST methods.
- **Restricted Access:** Both the UI tab and the API route are protected by the existing `verifyAdminRequest` and `profiles.role === 'admin'` checks.
- **Isolated Data:** `tools_hub` and `nano_banana` tables, as well as the 210 live-wired records and 230 deferred records, are completely isolated from this preview feature.

## 4. Next Recommended Station

With visibility into the imported draft data successfully established, the next logical step according to the post-import plan is **Phase 3 — Metadata quality repair tooling/report** (or Phase 2 if more detail view features are desired). This next phase involves planning the repair of `title_en`/`excerpt_*` gaps safely before any public wiring or publishing occurs.
