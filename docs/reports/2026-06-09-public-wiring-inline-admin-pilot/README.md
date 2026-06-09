# Public Wiring + Inline Admin Pilot

## Phase Title
Public Wiring + Inline Admin Pilot

## Parent Roadmap Phase
Phase 4 of 5 — Public Wiring + Inline Admin Pilot

## Date
2026-06-09

## Purpose
To test public-wiring exclusively on the pilot table (`automation_glossary`), proving that only published records appear publicly, drafts do not leak, and admins receive contextual inline management features without creating public mutation vulnerabilities or caching issues.

## Subagents Used
No subagents were used. The scope is extremely constrained to a single targeted table and route, making it optimal and safe for a central execution pass without distributed coordination risk.

## Pilot Table
`automation_glossary`

## Public Route/Page Selected
`/[locale]/automation-glossary`

## Inline Admin Approach
A server-side role check (`verifyAdminRequest()`) was utilized within the main `page.tsx` server component. When `isAdmin` is true, an admin-only badge and a "Manage in Admin" link are passed down and rendered in the `AutomationGlossaryClient` list and cards. No direct mutation actions (publish, edit, archive) are exposed on the public page.

## What Was Implemented
- Created the public route `/[locale]/automation-glossary`.
- Wired the route to securely pull only `status = 'published'` terms using the existing `fetchPublishedList` helper.
- Implemented an `isAdmin` prop evaluation ensuring dynamic rendering to avoid static cache poisoning of administrative state.
- Integrated an inline admin badge with a direct navigation link to `/[locale]/dashboard`.

## What Was Not Implemented
- Core CMS Publishing Expansion to other Tier-A tables (strictly forbidden).
- Mutation controls (publish/delete/edit) on the public surface (deferred for security).
- Caching workarounds that could risk session data leakage.

## Security Verdict
**Passed.** The route intrinsically queries exclusively for `published` entries. Next.js natively renders the page dynamically because `verifyAdminRequest` relies on cookies, entirely eliminating the risk of admin badges being leaked into public CDN caches.

## Validation Verdict
**Passed.** The code compiles with zero TypeScript errors, passes ESLint checks, and builds successfully. 

## Next Recommended Station
**Phase 5 of 5:** UI/UX Pro Max + Launch Candidate
