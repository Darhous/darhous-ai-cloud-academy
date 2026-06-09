# Architecture Review

## CMS Registry Summary
The CMS architecture relies on a centralized `CMS_REGISTRY` (`src/lib/admin/cms-registry.ts`), mapping 22 different Tier-A content types to their database tables, portal assignments, and specific metadata structures.

## Generic CMS Route Summary
A single API controller route (`src/app/api/admin/cms/[table]/route.ts`) handles fetching lists and creating new rows for all 22 registered tables dynamically, drastically reducing boilerplate.

## Item Route Summary
A single item controller (`src/app/api/admin/cms/[table]/[id]/route.ts`) dynamically applies PATCH and DELETE commands across all tables based on `CMS_REGISTRY` configuration.

## Generic CMS UI Summary
`GenericCmsTypePanel.tsx` dynamically renders lists, creates full bilingual forms based on the registry's `CmsFieldConfig`, and interacts with the API endpoints to manage items natively.

## Form Field Summary
Bilingual form primitives (e.g. `AdminTextField`, `AdminStatusField`, `AdminToggleField`) in `fields.tsx` are strictly styled components shared across the admin panel.

## Auth/Admin Verification Summary
All backend generic routes are securely wrapped behind the `verifyAdminRequest()` pattern which validates cookies/sessions exclusively against admin profiles.

## Why `automation_glossary` Fits
The generic architecture fully supports `automation_glossary` out-of-the-box via `CMS_REGISTRY`. Utilizing this table allows the pilot to be structurally vetted without inventing parallel API routes or distinct UI components. 

## Why `career_glossary` Was Deferred
The `career_glossary` table is currently mapped exclusively in `draft-content-preview-config.ts` for read-only visualization. Implementing a publishing lifecycle pilot for it would require prematurely duplicating the generic CMS logic, risking architecture fragmentation and contradicting the mandate to "extend existing generic mechanisms".
