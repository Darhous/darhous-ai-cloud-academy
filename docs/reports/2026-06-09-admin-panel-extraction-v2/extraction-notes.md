# Extraction Notes

Panel Selected: Admin Analytics Panel
Why Selected: It is a pure, read-only analytics dashboard section with no complex state mutations, tightly coupled forms, or destructive actions, making it extremely safe to extract.
Original Location: `src/components/admin/AdminDashboardClient.tsx` around lines 1226-1300.
New Component Path: `src/components/admin/panels/AdminAnalyticsPanel.tsx`
Props Passed: 
- `isAr`
- `users`
- `subscribers`
- `messages`
- `analyticsTotal`
- `analyticsLoading`
- `analyticsData`
- `analyticsEventCounts`

State Ownership: All state ownership remains in `AdminDashboardClient.tsx` since the panel only consumes the state values and does not mutate them.
Types/Interfaces Added: Explicit prop interface `AdminAnalyticsPanelProps` added in the extracted component. Arrays of `users`, `subscribers`, `messages` are typed as `unknown[]` because the panel only uses their `.length` property, avoiding the need to duplicate complex object types or introduce `any`.
Behavior Preservation Notes: UI structure, conditional loading states, tailwind classes, and translations are kept exactly the same as in the original inline block.
What was Not Extracted: Data fetching logic, analytics event recording logic, or other tabs.
Future Extraction Candidates: Users Panel, Certificates Panel, Theme & Branding Panel.
Subagents: Subagents were not used, as the extraction was straightforward and isolated.
