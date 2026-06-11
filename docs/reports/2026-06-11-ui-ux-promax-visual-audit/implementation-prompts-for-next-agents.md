# Implementation Prompts for Next Agents

## Prompt 1: Phase 1

Read every file in `docs/reports/2026-06-11-ui-ux-promax-visual-audit/` first. Implement **Phase 1 Visual Foundation Fixes only**. Do not touch unrelated business logic, APIs, database code, or content datasets. Preserve all existing user changes and do not delete files. Fix deployment identity documentation, canonical brand strings, portal registry/icon architecture, Cloud discovery decision, hard-coded RTL, English portal content, and semantic design tokens. Run `npm run typecheck`, `npm run lint`, `npm run build`, and `git diff --check`. Write an implementation report under a new dated report folder. Commit only phase files and the report, push, then create a checkpoint tag and GitHub release after all validation passes.

## Prompt 2: Phase 2

Read the Pro Max audit reports first. Implement **Phase 2 Landing Page Upgrade only**. Do not modify portal internals, auth, APIs, certificates, or data schemas. Preserve user changes and delete nothing. Make CTA outcomes distinct, apply the approved section order, keep one portal visualization, reduce competing motion, move verified trust proof near the hero, and keep reduced-motion parity. Test Arabic/English at 375/768/1024/1440. Run typecheck, lint, build, and diff check. Create a report with before/after evidence, then commit/push/tag/release only after success.

## Prompt 3: Phase 3

Read the complete audit and roadmap first. Implement **Phase 3 Portal Experience Upgrade only**. Build shared PortalHero/PortalStats/PortalSection primitives and migrate only the portal set approved for this phase. Do not alter APIs, learning logic, auth, or datasets. Preserve all changes and delete nothing. Maintain locale parity, SVG icons, shared typography, portal accent tokens, and one signature motif per portal. Run typecheck/lint/build plus route screenshots. Write an implementation report and perform commit/push/tag/release after validation.

## Prompt 4: Phase 4

Read the Pro Max mobile and RTL/LTR reports first. Implement **Phase 4 Mobile + RTL/LTR Polish only**. Do not redesign desktop content or alter business logic. Fix 44px targets, safe areas, overflow, fixed-element collisions, footer/mobile navigation density, logical spacing, directional icons, Arabic/English parity, and mobile atmosphere performance. Test 375, 390, 393, 768, 1024, and 1440. Run typecheck/lint/build and write a screenshot-based report. Commit/push/tag/release only after all acceptance criteria pass.

## Prompt 5: Phase 5

Read the motion report and methodology first. Implement **Phase 5 Motion & Interaction Polish only**. Do not change content hierarchy, routes, APIs, or branding. Centralize motion variants, remove continuous decorative motion identified by the audit, replace unstable card scaling, enforce 150–300ms interaction timing, and guarantee static reduced-motion parity. Run typecheck/lint/build and reduced-motion QA. Report changed animations and performance observations, then commit/push/tag/release after success.

## Prompt 6: Phase 6

Read all Pro Max reports first. Implement **Phase 6 Production Polish only**. Scope is auth UI, footer, loading/error/empty states, certificate trust surfaces, metadata, Open Graph, and image optimization. Do not alter auth logic, certificate validation logic, APIs, database tables, or legal wording beyond link/accessibility presentation. Run typecheck/lint/build, metadata checks, and auth-state QA. Write a report and commit/push/tag/release only after validation.

## Prompt 7: Phase 7

Read the audit and every prior phase report. Execute **Phase 7 Final QA & Launch Readiness only**. Do not introduce new design features. Verify routes, Arabic/English, mobile/tablet/desktop, keyboard, focus, contrast, reduced motion, auth states, error/empty/loading states, OG previews, build, and the live Vercel SHA. Fix only confirmed launch blockers and document each fix. Run `npm run check` and `git diff --check`. Produce the final launch report, then commit/push/tag/release only when all Must Fix items are closed.
