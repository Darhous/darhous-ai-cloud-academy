# Inline Admin Controls Strategy

## Goal

Verified admins should be able to browse the normal public experience and enter a contextual Admin Mode with actions close to the content being managed. Visitors must never receive controls or mutation capability.

## Recommended Architecture: Hybrid

### Server Responsibility

- Resolve authenticated user and `profiles.role` on the server.
- Render an admin capability marker only for verified admins.
- Authorize every mutation independently in the route handler/server action.
- Validate table, record ID, current status, target status, and allowed fields.
- Write audit-log entries for every state transition.

### Client Responsibility

- Toggle Admin Mode presentation.
- Render contextual overlays and action menus.
- Handle confirmation dialogs, optimistic disabled states, and refresh.
- Never decide authorization by itself.

Client-only role checks are insufficient. Fully server-rendering all admin UI into cacheable public pages also creates leakage risk. The hybrid model provides server authority with a small client overlay.

## Cache Safety

- Any route that reads session/admin state must be dynamically rendered for that request or isolate admin UI behind a non-cacheable authenticated boundary.
- Do not vary a shared cached public HTML response only by client role assumptions.
- Never cache admin-action responses publicly.
- Public content queries remain published-only.
- Draft preview should use an explicit admin request and never populate public caches.
- Validate Next.js 16 cache behavior against local docs before implementation.

## Admin Mode

1. Admin signs in.
2. A compact “Admin Mode” pill appears in the global utility layer.
3. Default state is off to preserve visitor-like browsing.
4. Turning it on adds:
   - subtle outlines around manageable blocks;
   - card overflow menus;
   - page-level action bar;
   - “Add New” at collection boundaries.
5. State persists for the session only.
6. A visible “Exit Admin Mode” action is always available.

## Placement

### Collection Cards

- Top inline-end overflow menu.
- Actions: Edit, Publish/Unpublish, Archive, Open in Admin.
- Avoid a row of five permanent buttons on every card.

### Detail Pages

- Sticky compact action bar below the main Navbar or a floating inline-end pill.
- Actions: Edit, Preview status, Publish/Return to Draft, Archive, Open in Admin.

### Collection Header

- “Add New” belongs next to the page title/filter tools.
- Add New should create a draft only.

## State Machine

Allowed initial lifecycle:

- `draft -> published`
- `published -> draft`
- `draft -> archived`
- `published -> archived` with stronger confirmation
- `archived -> draft`

Postpone:

- hard delete;
- bulk publish;
- bulk archive;
- cross-table publish;
- scheduled publishing;
- workflow automation.

## Authorization Contract

Every action must:

1. authenticate with `supabase.auth.getUser()`;
2. verify `profiles.role === "admin"`;
3. use a table allowlist;
4. validate requested transition;
5. perform a conditional update against the expected current status;
6. record actor, record, table, previous status, next status, timestamp, and optional reason;
7. return a minimal response;
8. invalidate only relevant public/admin caches.

RLS remains defense in depth. Service-role access should be used only where necessary and never exposed to client code.

## Confirmation Design

- Publish: show destination route, title, validation summary, and public visibility warning.
- Unpublish: explain immediate public removal and fallback behavior.
- Archive: require reason for published content.
- Destructive actions: no default-focused confirmation button.
- Provide clear success, failure, and stale-record conflict states.

## Rollback

“Rollback” for launch should mean return to draft, not automatic historical content restoration. Store immutable audit events first. Version snapshots can follow after safe single-record publishing is stable.

## Route Mapping Requirement

Inline controls require a registry mapping:

- portal/content type;
- table;
- record identifier;
- public list route;
- public detail route or “no detail route”;
- editor route;
- supported actions.

No inline action should appear where that mapping is absent.

## Security Tests

- anonymous request receives 401/403;
- student request receives 403;
- admin request succeeds only for allowlisted tables/transitions;
- draft never appears in anonymous public query;
- cached public page never contains admin controls;
- CSRF/origin strategy is validated;
- audit event is written once;
- concurrent stale status returns conflict.

All implementation remains future work.
