# Tier-A Publishing Workflow Foundation

## 19 Tier-A Table Strategy
We have 19 critical content tables (AI, Automation, IoT, Career, Exams, Language, etc.) with 600 imported draft rows. A unified schema strategy enforces that all Tier-A tables must support:
- `status` (draft, published, archived)
- `published_at` (timestamp)
- `created_by` / `updated_by`

## State Machine
Allowed Transitions:
- **Draft -> Published**: Requires validation.
- **Published -> Draft**: Pulls content offline immediately.
- **Draft -> Archived**: Safely shelves unused content.
- **Published -> Archived**: Requires stronger "Are you sure?" confirmation since it drops live content.
- **Archived -> Draft**: Restores content to edit mode.

## Authorization Contract
- Client components cannot determine publishing authorization.
- Server-side validation must check the user's role (admin or specifically authorized editor) before mutating the `status` field.
- RLS policies must block unauthorized updates to the `status` field.

## Audit Log Contract
Every state change must be written to the `admin_audit_logs` table (or similar), recording the exact `action` (e.g. `publish`), the `target_type` (table name), the `record_id`, and the `user_id`.

## Validation Gate
Before moving to `published`, the backend must run a validation check (e.g. verifying `title`, `slug`, and `content` are not empty).

## Route Mapping Requirement
Published content is only valuable if it can be accessed. A strict mapping between a CMS table and a Next.js `app/` route must be maintained.

## Preview vs. Public Separation
- **Preview**: Uses bypass tokens or admin session to read `draft` rows.
- **Public**: Queries strictly append `.eq('status', 'published')`.

## Cache Invalidation Principles
When a record changes to `published` or from `published` to another state, the associated Next.js cache path or tag must be revalidated (`revalidatePath` or `revalidateTag`).

## Postponed Dangerous Features
- Hard Delete (Archive only)
- Bulk Publish
- Bulk Archive
- Scheduled Publishing
- Workflow Automation
