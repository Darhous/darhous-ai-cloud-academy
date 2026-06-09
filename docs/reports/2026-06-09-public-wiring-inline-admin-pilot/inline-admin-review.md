# Inline Admin Review

## Admin Controls Added
A contextual yellow "Admin Mode Active (Pilot)" badge and a green "Published" tag are overlaid on the glossary records. A "Manage in Admin" link explicitly directs the user to the admin dashboard.

## Exact Visibility Condition
The visibility is strictly governed by the boolean `isAdmin` prop passed down from the Next.js server component. The server calculates this property exclusively through the secure `verifyAdminRequest()` session helper.

## Non-Admin Behavior
If the session token does not belong to a user mapped with the `role = "admin"` in the `profiles` table, the inline markers are completely purged from the rendered DOM.

## Anonymous Behavior
Matches non-admin behavior. Anonymous sessions return a null user object during server evaluation, guaranteeing the UI receives `isAdmin: false`.

## Whether Any Mutation Action Exists
No. The inline interface acts strictly as a read-only visual overlay combined with a navigation hyperlink.

## Why Public Mutation Controls Were Deferred
Exposing database write actions (e.g., publish, delete, edit) on public pages introduces massive cross-site request forgery (CSRF) and validation complexities. Deferring mutations forces admins to securely context-switch into the protected `/[locale]/dashboard` boundary, guaranteeing airtight intent.

## Admin Route/Link Target
The "Manage in Admin" link explicitly points to `/[locale]/dashboard`.
