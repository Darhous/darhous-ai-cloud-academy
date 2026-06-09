# Extracted Panels Review

### AdminOverviewPanel
- **Component path:** `src/components/admin/panels/AdminOverviewPanel.tsx`
- **Parent tab:** `overview`
- **Prop/state boundary:** Receives `isAr`, `users`, `subscribers`, `messages`, `health`, `healthLoading`.
- **Interactivity:** Read-only dashboard.
- **DB writes:** No.
- **Publishing logic:** No.
- **Risk/Follow-up:** None.

### AdminAnalyticsPanel
- **Component path:** `src/components/admin/panels/AdminAnalyticsPanel.tsx`
- **Parent tab:** `analytics`
- **Prop/state boundary:** Receives `isAr`, `users`, `subscribers`, `messages`, `analyticsTotal`, `analyticsLoading`, `analyticsData`, `analyticsEventCounts`.
- **Interactivity:** Read-only dashboard.
- **DB writes:** No.
- **Publishing logic:** No.
- **Risk/Follow-up:** None.

### AdminThemePanel
- **Component path:** `src/components/admin/panels/AdminThemePanel.tsx`
- **Parent tab:** `theme`
- **Prop/state boundary:** Receives `isAr`.
- **Interactivity:** Read-only design token display.
- **DB writes:** No.
- **Publishing logic:** No.
- **Risk/Follow-up:** None.

### AdminPortalsPanel
- **Component path:** `src/components/admin/panels/AdminPortalsPanel.tsx`
- **Parent tab:** `portals`
- **Prop/state boundary:** Receives `isAr`, `locale`. Owns its own local `portalVisibility` state for UI toggles.
- **Interactivity:** Local UI toggles only (no persistent DB writes).
- **DB writes:** No.
- **Publishing logic:** No.
- **Risk/Follow-up:** None.
