# Prioritized Implementation Roadmap

## Phase A: Fix Critical Broken Links/Dead Ends

- Goal: remove visible launch dead ends.
- Scope: inactive project CTA, incomplete blog pages, locale-safe coach/admin links, route recovery states.
- Likely files: project/blog routes, `api/coach/route.ts`, admin preview links, new shared route state files.
- Risks: changing indexed URLs or hiding content.
- Validation: typecheck, lint, build, route crawl, bilingual manual QA.
- DB write: No.
- Migration: No.
- Production-safe: Yes, with focused release.
- Checkpoint: `launch-readiness-links-and-route-states-v1`.

## Phase B: Admin Dashboard Information Architecture Redesign

- Goal: replace 29-tab horizontal navigation with grouped admin shell.
- Scope: sidebar, grouped sections, search/command palette, favorites/recents, deep-link state.
- Likely files: admin page/client, new admin layout/navigation components.
- Risks: regression in access to existing tools.
- Validation: admin route matrix, keyboard/RTL/mobile tests, build.
- DB write: No.
- Migration: No.
- Production-safe: Yes if behavior and APIs remain intact.
- Checkpoint: `admin-ia-shell-v1`.

## Phase C: CMS Publishing Strategy and Safe Actions

- Goal: audited single-record Tier-A lifecycle.
- Scope: status state machine, validation, publish/unpublish/archive, confirmation, audit log, cache invalidation.
- Likely files: Tier-A registry/config, new admin action handlers, review panel.
- Risks: accidental exposure, stale cache, schema mismatch.
- Validation: auth/RLS tests, anonymous leakage test, transition tests.
- DB write: Yes, future implementation.
- Migration: Possibly, only if audit/version fields are missing.
- Production-safe: Yes via one-table pilot and feature flag.
- Checkpoint: `tier-a-publishing-pilot-v1`.

## Phase D: Admin Inline Controls on Public-Facing Pages

- Goal: contextual Admin Mode.
- Scope: server capability check, client overlay, record mapping, edit/publish/archive/open controls.
- Likely files: locale layout, content cards/details, admin registry, action menu components.
- Risks: cache leakage and client-only authorization mistakes.
- Validation: anonymous HTML inspection, role matrix, cache tests, reduced-motion/mobile.
- DB write: Uses Phase C actions.
- Migration: No additional migration expected.
- Production-safe: Feature-flagged admin only.
- Checkpoint: `inline-admin-mode-v1`.

## Phase E: Public Content Wiring for Published-Only Content

- Goal: surface approved Tier-A records.
- Scope: one portal/type pilot, typed mapper, list/detail UI, sitemap, SEO, empty/error/loading.
- Likely files: portal route, shared content reader, sitemap, content components.
- Risks: duplication with static content and locale mismatch.
- Validation: published/draft fixtures, source dedupe tests, crawl.
- DB write: Publishing only through Phase C.
- Migration: No unless a verified mapping gap requires it.
- Production-safe: One content type at a time.
- Checkpoint: `tier-a-public-wiring-pilot-v1`.

## Phase F: UI/UX Pro Max Visual Redesign System

- Goal: calm premium editorial system.
- Scope: tokens, typography, cards, buttons, states, homepage/portal templates, admin visual cleanup.
- Likely files: `globals.css`, shared UI, landing sections, portal wrappers.
- Risks: broad regressions and visual inconsistency during transition.
- Validation: visual regression, responsive, contrast, RTL/LTR, build.
- DB write: No.
- Migration: No.
- Production-safe: Incremental by component/page family.
- Checkpoint: `editorial-design-system-v1`.

## Phase G: AhmedAli-Inspired Motion Layer

- Goal: selective premium storytelling motion.
- Scope: kinetic hero phrase, stacked cards, one moving rail, optional background depth, stat refinement.
- Likely files: homepage sections and motion utilities.
- Risks: bundle size, motion sensitivity, mobile performance.
- Validation: reduced motion, CPU throttling, Lighthouse, 60fps profiling.
- DB write: No.
- Migration: No.
- Production-safe: Yes after visual system stabilizes.
- Checkpoint: `editorial-motion-layer-v1`.

## Phase H: tools_hub and nano_banana Architecture Decision

- Goal: decide future schemas without implementation pressure.
- Scope: compare current app models, deferred content, ownership, migration alternatives.
- Likely files: documentation and deferred schema artifacts only initially.
- Risks: collision with active Nano Banana behavior and tool registry.
- Validation: architecture review and explicit approval.
- DB write: No during decision phase.
- Migration: Deferred.
- Production-safe: Yes as documentation only.
- Checkpoint: `deferred-content-architecture-decision-v1`.

## Phase I: Launch QA and Release Checklist

- Goal: prove release candidate health.
- Scope: CI build, tests, crawl, role/RLS matrix, accessibility, performance, SEO, rollback.
- Likely files: tests, QA docs, CI configuration.
- Risks: late discovery of integration defects.
- Validation: full release matrix.
- DB write: Only controlled test fixtures in non-production.
- Migration: No unless separately approved.
- Production-safe: Yes with staging.
- Checkpoint: `launch-candidate-v1`.

## Safest Sequence

A -> B -> C pilot -> D pilot -> E pilot -> F -> G -> H decision -> I.

Do not reverse C and E. Public wiring must not precede a controlled publishing lifecycle.
