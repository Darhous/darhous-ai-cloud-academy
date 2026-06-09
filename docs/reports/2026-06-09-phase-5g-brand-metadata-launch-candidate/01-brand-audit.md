# Phase 5G: Brand and Metadata Audit

## Objective
Audit the presence of the old "Darhous Academy" branding versus the new "NexaLearn" launch brand across the repository to determine what must be updated for the launch candidate and what should be deferred to a dedicated brand overhaul phase.

## Findings
The audit revealed the "Darhous Academy" and "Darhous AI Cloud Academy" brands deeply embedded in:
1. **Metadata and Open Graph**: `src/app/layout.tsx`, `src/app/og/route.tsx`, `src/lib/constants.ts`
2. **Translation strings**: Extensive usage in `src/messages/ar.json` and `src/messages/en.json`
3. **Database and Seeds**: Assumed presence based on standard structure
4. **Email Templates**: `src/lib/email/templates.ts`
5. **Component Text**: Several deep UI components.

## Decision
Due to the strict safety requirements of Phase 5G, only the **Metadata and Open Graph (Launch Candidate Surfaces)** are updated to "NexaLearn by Darhous". The remaining deep surfaces are audited, documented, and explicitly deferred to a future phase to prevent unintended side effects and Arabic-leak issues before launch.
