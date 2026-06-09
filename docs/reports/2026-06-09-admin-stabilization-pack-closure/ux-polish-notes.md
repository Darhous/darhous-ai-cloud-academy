# UX Polish Notes

**Issues reviewed:**
1. ESLint warnings for unused imports in admin components.
2. ESLint warnings for `react-hooks/set-state-in-effect` in `AdminDashboardClient.tsx`.

**Polish applied:**
- Removed unused `Mail` import from `src/components/admin/admin-navigation.ts` to clean up the linter output.

**Polish deferred:**
- Deferred fixing the 15 `react-hooks/set-state-in-effect` warnings in `AdminDashboardClient.tsx`.
- **Reason:** These warnings stem from the legacy data-fetching logic (`useEffect` calling `fetchData` which then calls multiple `setState` hooks). Fixing this requires a significant architectural refactor of how the admin dashboard loads and caches data (e.g., migrating to React Query or SWR). Doing this now violates the "behavior-preserving, safe stabilization" constraints of Phase 1.

**Confirmation:**
No redesign was performed. No new features were added.
