# Implementation Notes

### `src/app/api/admin/cms/[table]/route.ts`
*   **Purpose:** Securely restrict the lifecycle creation status for the CMS POST endpoint.
*   **Before:** Administrators could construct POST bodies with `status: "published"` across any of the 22 registered CMS tables.
*   **After:** `PUBLISHING_ALLOWLIST` explicitly enforces newly created items as `"draft"`, unless the target table is `automation_glossary`.
*   **Risk:** Low. Prevents accidental mass activations.
*   **Behavior Changed:** Yes, for admin environments handling table instantiation.
*   **Public Behavior Changed:** No.

### `src/app/api/admin/cms/[table]/[id]/route.ts`
*   **Purpose:** Lock down item status transition commands in the PATCH endpoint to exclusively allowed tables.
*   **Before:** Administrators could alter states to `"published"` or `"archived"` on any registered CMS table.
*   **After:** Attempts to modify statuses for non-allowlisted tables return a `403` error (`Publishing lifecycle is currently locked`).
*   **Risk:** Low. Creates a secure fallback.
*   **Behavior Changed:** Yes, enforces pilot table boundaries.
*   **Public Behavior Changed:** No.

### `src/components/admin/cms/GenericCmsTypePanel.tsx`
*   **Purpose:** Remove misleading lifecycle/status controls for non-allowlisted tables.
*   **Before:** Status dropdown (`AdminStatusField`) and Archive action button were fully interactive across all 22 CMS types.
*   **After:** The "Archive" button is hidden. The status field dropdown is explicitly marked as `disabled` unless rendering `automation_glossary`.
*   **Risk:** Zero. Purely visual restriction complementing the API safeguards.
*   **Behavior Changed:** Yes, disables user intent for invalid actions.
*   **Public Behavior Changed:** No.

### `src/components/admin/content-form/fields.tsx`
*   **Purpose:** Propagate standard HTML `disabled` attributes to encapsulated React UI fragments.
*   **Before:** `AdminSelectField` and `AdminStatusField` lacked `disabled` props.
*   **After:** Both components properly forward `disabled` properties directly to the underlying `select` element.
*   **Risk:** Zero. General UI improvement.
*   **Behavior Changed:** No logic changed, only component capabilities.
*   **Public Behavior Changed:** No.
