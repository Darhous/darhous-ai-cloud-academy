# Implementation Notes

### `src/app/[locale]/automation-glossary/page.tsx` (NEW)
*   **Purpose:** Act as the server-rendered entry point for the new automation glossary pilot page.
*   **Before Behavior:** N/A (did not exist).
*   **After Behavior:** Evaluates the authenticated session utilizing `verifyAdminRequest()`, securely fetches published `automation_glossary` records via `fetchPublishedList()`, and injects the `isAdmin` boolean along with the data into the client component.
*   **Why Change Is Safe:** Explicitly fetches only the pilot table. Exclusively queries published data. Server-side session verification mitigates CDN cache bleeding.
*   **Public Behavior Changed:** Yes, a new public route is now available.
*   **Admin Behavior Changed:** Yes, admins now possess an inline monitoring lens.
*   **CMS/Publishing Behavior Changed:** No.

### `src/app/[locale]/automation-glossary/AutomationGlossaryClient.tsx` (NEW)
*   **Purpose:** Handle the interactive visual presentation of the automation terms list and admin controls.
*   **Before Behavior:** N/A (did not exist).
*   **After Behavior:** Renders terms matching a search query. Conditionally overlays a yellow "Admin Mode Active" banner, a "Manage in Admin" dashboard link, and green "Published" tags strictly when `isAdmin` equals true.
*   **Why Change Is Safe:** Contains no interactive mutation functions. Purely visual reflection of the secure props dispatched from the server.
*   **Public Behavior Changed:** Yes, introduces the public-facing pilot UI.
*   **Admin Behavior Changed:** Yes, introduces inline monitoring artifacts.
*   **CMS/Publishing Behavior Changed:** No.
