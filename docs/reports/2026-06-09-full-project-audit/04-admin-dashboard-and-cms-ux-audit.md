# Admin Dashboard and CMS UX Audit

## Current State

The admin route is correctly server-protected, but its information architecture is not sustainable.

- `AdminDashboardClient.tsx`: 5,277 lines.
- 29 top-level tabs in one horizontal overflow row.
- Content, portals, users, certificates, settings, analytics, security, and multiple CMS systems share one visual level.
- The dashboard duplicates list/form patterns and mixes strategic controls with operational editing.

## Core UX Problems

1. **Flat navigation**
   - Every function is adjacent.
   - Users must scan unrelated items to find a task.

2. **Horizontal overflow**
   - `overflow-x-auto` is the primary navigation solution.
   - This hides destinations and is especially weak in RTL.

3. **No task-based hierarchy**
   - “Content Studio,” portal controls, and specific CMS tabs overlap conceptually.
   - There is no clear distinction between content type, portal, and system function.

4. **Monolithic client cost**
   - The admin imports large static datasets and many panels into one client boundary.
   - This increases bundle, hydration, state, and maintenance risk.

5. **Mixed lifecycle rules**
   - Some CMS creates default to published.
   - Tier-A preview is intentionally read-only.
   - The UI does not present a unified approval model.

6. **Weak deep linking**
   - Tab state is local state, not a route/query-based location.
   - Refresh/share/back behavior for a specific admin tool is limited.

7. **Visual density**
   - Glass cards, colored borders, badges, emojis, forms, and dense tables compete.

## Recommended Information Architecture

### Primary Sidebar

1. Overview
2. Content
3. Portals
4. Learning & Exams
5. Users & Community
6. Certificates
7. Analytics
8. Communications
9. Settings
10. Security & System

### Content Subnavigation

- Review Queue
- Drafts
- Published
- Archived
- AI Academy
- Automation
- Career
- Digital Exams
- IoT
- Language
- Existing Core CMS

### System Separation

| Group | Existing items |
|---|---|
| Content management | content, blog, glossary, tools, prompts, courses, projects, paths, Tier-A preview |
| Portals | AI Academy, Language, Automation, Digital Exams, Career, IoT, Nano Banana |
| Users | users, community/subscribers |
| Certificates | certificate issuance and verification |
| Analytics | analytics and portal metrics |
| Communications | email/notifications, contact |
| Settings | site builder, theme, mentor settings, feature flags |
| Security/system | audit logs, health |

## Interaction Model

- Desktop: persistent logical sidebar, collapsible groups, compact top utility bar.
- Tablet: collapsible rail with drawer.
- Mobile: full-height navigation sheet with search, recent tools, and grouped accordions.
- Command palette: search by action, content type, record title, portal, or admin tool.
- Favorites: pin up to five tools.
- Recents: show last five destinations.
- Breadcrumbs: `Admin > Content > Career > Drafts`.
- Deep links: URL/query should preserve section and selected record.

## Draft Review UX

The current read-only warning is good. Improve it by:

- replacing 19 wrapping table buttons with portal dropdown + content-type dropdown;
- adding status, completeness, and validation filters;
- showing schema-safe summaries before raw JSON;
- providing “Open public route” only where a route mapping exists;
- adding a clear “No publishing configured” state;
- preserving raw JSON as a secondary inspection panel.

## Accessibility

- Roving keyboard navigation for sidebar and command palette.
- Visible focus states.
- `aria-current` on active destinations.
- Accessible names for icon-only actions.
- Minimum 44px touch targets on mobile.
- Do not use color alone for status.
- Ensure modals trap focus and restore focus.

## RTL

- Sidebar should occupy the inline-start side: right in Arabic, left in English.
- Use logical properties for borders, chevrons, margins, and panel transitions.
- Avoid horizontal tab strips.
- Keep code, IDs, JSON, and URLs explicitly LTR.

## CMS Product Recommendation

Do not treat the next phase as “add more tabs.” Create a CMS shell with stable navigation, then place existing panels inside it incrementally. Preserve APIs and behavior while changing only admin composition and navigation first.
