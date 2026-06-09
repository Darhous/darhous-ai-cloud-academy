# Extraction Notes

## Panel Chosen
**Admin Overview Panel** (`tab === "overview"`)

## Why This Panel Was Chosen
It is the first rendered tab and acts as a read-only, high-level summary of the system. It involves zero mutations or complex callbacks, meaning extracting it carries virtually zero risk of breaking application state or causing publishing bugs.

## Original Location
Inside `src/components/admin/AdminDashboardClient.tsx`, between lines ~528 and ~570.

## New Component Path
`src/components/admin/panels/AdminOverviewPanel.tsx`

## Props Passed
- `isAr`: boolean
- `users`: UserRow[]
- `subscribers`: any[]
- `messages`: MessageRow[]
- `health`: HealthStatus | null
- `healthLoading`: boolean

## State Ownership Decision
State remains owned by `AdminDashboardClient.tsx` because variables like `users`, `messages`, and `health` are fetched at the root level and likely shared across other tabs. Moving the state down would involve breaking global hooks or prop-drilling from a new provider, which is out of scope for a simple, behavior-preserving extraction.

## Behavior Preservation
- The exact layout, classes, and `StatCard` dependencies were preserved. 
- `StatCard` was converted from an internal helper function to an exported function in `AdminDashboardClient.tsx` to avoid duplicating UI components and to maintain visual consistency.

## What Was Not Extracted
- The analytics tab
- The site builder
- The CMS lifecycle modules (e.g., Blog CMS, Prompts CMS)
- Nano Banana sub-forms

## Future Extraction Candidates
- `AdminAnalyticsPanel.tsx`
- `AdminSiteBuilderPanel.tsx`
- `AdminSettingsPanel.tsx`
