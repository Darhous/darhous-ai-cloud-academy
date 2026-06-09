# Extraction Notes

Panel Selected: Admin Theme Panel
Why Selected: It is a pure, read-only static presentation panel with no state mutations, complex props, or destructive actions, making it extremely safe to extract.
Original Location: `src/components/admin/AdminDashboardClient.tsx` around lines 1241-1305.
New Component Path: `src/components/admin/panels/AdminThemePanel.tsx`
Props Passed: 
- `isAr`

State Ownership: All state ownership (`tab` state) remains in `AdminDashboardClient.tsx` since the panel only consumes the `isAr` prop.
Types/Interfaces Added: Explicit prop interface `AdminThemePanelProps` added in the extracted component.
Behavior Preservation Notes: UI structure, conditional loading states, tailwind classes, and translations are kept exactly the same as in the original inline block.
What was Not Extracted: Other tabs.
Future Extraction Candidates: Audit Panel, Communications Panel, Users Panel, Certificates Panel.
Subagents: Subagents were not used, as the extraction was straightforward and isolated.
