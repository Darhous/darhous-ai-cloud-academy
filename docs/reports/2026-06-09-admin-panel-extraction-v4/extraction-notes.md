# Extraction Notes

Panel Selected: Admin Portals Panel (`tab === "portals"`)
Why Selected: It relied entirely on a constant array (`allPortals`) and a purely local state variable (`portalVisibility`) that had no dependencies outside of this tab.
Original Location: `src/components/admin/AdminDashboardClient.tsx` around lines 671.
New Component Path: `src/components/admin/panels/AdminPortalsPanel.tsx`
Props Passed: 
- `isAr: boolean`
- `locale: string`

State Ownership Decision: Moved `portalVisibility` state ENTIRELY into `AdminPortalsPanel.tsx`. Also moved the import of `allPortals` inside it. This allowed removing them completely from `AdminDashboardClient.tsx`, improving overall cleanliness.
Types/Interfaces Added: `AdminPortalsPanelProps`
Behavior Preservation Notes: The map loop and the local toggle buttons behave exactly as before. The toggle does not interact with the DB, it is purely presentational.
What was Not Extracted: `users`, `audit`, `content` tabs.
Future Extraction Candidates: None recommended individually.
Recommendation on whether to stop individual extractions and move to phase closure: Yes. We should stop individual extractions. The remaining panels are deeply coupled with centralized data fetching (`fetchData` pulling `users`, `messages`, `auditLogs`, etc.) in `AdminDashboardClient.tsx`. Extracting them would either require passing 15+ props or moving data fetching into the components, which violates the "read-only behavior preserving" constraint of this current pack. Moving to Closure is the smartest decision.
Subagents used: No subagents were used.
