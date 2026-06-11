# Agent Work Allocation for Preview Phase

**Date:** 2026-06-11
**Project:** NexaLearn by Ahmed Darhous
**Phase:** Homepage concept preview — multi-agent work split

---

## Overview

The preview phase creates five isolated homepage concept routes plus the shared foundation they
all depend on. This document defines which agent owns which files, what each agent is forbidden
from touching, and how to run the entire phase safely in a single-agent environment.

The Integration Agent (main session owner) is the only agent allowed to run `npm run build`,
commit, or resolve merge conflicts.

---

## Agent A — Shared Foundation

Agent A must complete before any other concept agent begins. All concept agents (B through F)
depend on the components and layout built by Agent A.

### What Agent A Builds

- The shared `design-lab` layout at `src/app/[locale]/design-lab/layout.tsx`
- `DesignLabShell.tsx` — preview wrapper with noindex signal, preview banner ("This is a design preview — not the live site"), and locale switcher
- `DesignTokens.tsx` — typed TypeScript exports for all CSS custom properties defined in `src/app/globals.css` (primary, secondary, tertiary colors, surface tokens, motion tokens, spacing)
- `PreviewFontLoader.tsx` — verifies Cairo and Geist are loaded; does not re-import them if already available via the root layout
- `PortalDataProxy.tsx` — single re-export: `export { portals } from "@/config/portals"` and `export type { Portal } from "@/config/portals"` — all concept agents import portals exclusively through this proxy, never directly

### Files Agent A Creates

```
src/app/[locale]/design-lab/layout.tsx
src/components/design-lab/shared/DesignLabShell.tsx
src/components/design-lab/shared/DesignTokens.tsx
src/components/design-lab/shared/PreviewFontLoader.tsx
src/components/design-lab/shared/PortalDataProxy.tsx
```

### Files Agent A Must NOT Touch

- `src/app/[locale]/page.tsx`
- `src/components/landing/HomepageClient.tsx`
- Any existing file in `src/components/landing/`
- Any existing file in `src/components/sections/`
- `src/app/globals.css`
- `src/config/portals.ts`
- Any existing navigation component

### Completion Signal

Agent A reports done when: (a) all five files above exist, (b) `npx tsc --noEmit` passes, and
(c) `GET /ar/design-lab` and `GET /en/design-lab` return something other than a 404 (a blank
layout page is acceptable at this stage).

---

## Agent B — Concept 2 Preview (Guided Learning Journey)

Agent B implements Direction 2 from the Redesign Directions Brief.

### Which Design Direction

Direction 2 — The Guided Learning Journey. The above-fold is a single goal question with three
illustrated answer cards. Goal selection drives chapter-based scroll reveals below. Sections are
narrative, not product catalog.

### Files Agent B Creates

```
src/app/[locale]/design-lab/homepage-concept-2/page.tsx
src/app/[locale]/design-lab/homepage-concept-2/_components/GoalQuestionHero.tsx
src/app/[locale]/design-lab/homepage-concept-2/_components/ChapterReveal.tsx
src/app/[locale]/design-lab/homepage-concept-2/_components/OutcomeForecast.tsx
```

### Files Agent B Must NOT Touch

- Everything in Agent A's ownership list
- `src/app/[locale]/page.tsx`
- `src/components/landing/HomepageClient.tsx`
- Any file outside `src/app/[locale]/design-lab/homepage-concept-2/` and `src/components/design-lab/` (read-only access to shared components)
- Any other concept agent's directory

### Key Implementation Rules for Agent B

- Import `portals` only through `PortalDataProxy` (`@/components/design-lab/shared/PortalDataProxy`)
- Import `getRecommendedPath` logic from `PathSelector.tsx` by copying the pure function — do not import from `PathSelector.tsx` directly (to avoid pulling in PathSelector's state)
- The copied function must be placed in a local `_lib/recommendedPath.ts` within the concept-2 directory
- Goal selection state is local to the preview route — no global state, no context
- All three `aria-label` attributes on goal answer cards must be set in both Arabic and English

---

## Agent C — Concept 3 Preview (Minimal Trust-First Landing)

Agent C implements Direction 3 from the Redesign Directions Brief. This is the lowest complexity
concept and is recommended as the first concept to be built after Agent A completes.

### Which Design Direction

Direction 3 — Minimal Trust-First Landing. Minimal animation above the fold, clean portal grid,
stats in the first viewport, no glass panels on portal cards.

### Files Agent C Creates

```
src/app/[locale]/design-lab/homepage-concept-3/page.tsx
src/app/[locale]/design-lab/homepage-concept-3/_components/MinimalHero.tsx
src/app/[locale]/design-lab/homepage-concept-3/_components/PortalCompactGrid.tsx
src/app/[locale]/design-lab/homepage-concept-3/_components/TrustTriad.tsx
```

### Files Agent C Must NOT Touch

- Everything in Agent A's ownership list
- `src/app/[locale]/page.tsx`
- `src/components/landing/HomepageClient.tsx`
- Any file outside `src/app/[locale]/design-lab/homepage-concept-3/` and `src/components/design-lab/` (read-only access to shared components)
- Any other concept agent's directory

### Key Implementation Rules for Agent C

- No continuous animations above the fold — entrance opacity fade only, with `duration: 0.3s` maximum
- Portal grid must use shadcn/ui card primitive (from `src/components/shadcn/ui/card.tsx` if it exists, otherwise build a minimal local card)
- Portal card hover: color left-border line appears, description text fades in — no scale, no shadow, no transform
- Stats numbers must read from the same source as the existing `Stats` component — do not hard-code numbers
- The `TrustTriad` component renders three data points inline in the hero, not below it

---

## Agent D — Concept 1 Preview (Learning Command Center)

Agent D implements Direction 1 from the Redesign Directions Brief.

### Which Design Direction

Direction 1 — The Learning Command Center. Dashboard shell with portal sidebar and recommendation
center panel. The signature interaction is portal switching via the sidebar.

### Files Agent D Creates

```
src/app/[locale]/design-lab/homepage-concept-1/page.tsx
src/app/[locale]/design-lab/homepage-concept-1/_components/CommandCenterShell.tsx
src/app/[locale]/design-lab/homepage-concept-1/_components/PortalSidebar.tsx
src/app/[locale]/design-lab/homepage-concept-1/_components/RecommendationCenter.tsx
src/app/[locale]/design-lab/homepage-concept-1/_components/EcosystemStatusHeader.tsx
```

### Files Agent D Must NOT Touch

- Everything in Agent A's ownership list
- `src/app/[locale]/page.tsx`
- `src/components/landing/HomepageClient.tsx`
- Any file outside `src/app/[locale]/design-lab/homepage-concept-1/` and `src/components/design-lab/` (read-only access)
- Any other concept agent's directory

### Key Implementation Rules for Agent D

- The `PortalSidebar` on RTL must appear on the right side — use `insetInlineStart` / `insetInlineEnd` CSS, not hardcoded `left`/`right`
- `CommandCenterShell` uses CSS Grid, not absolute positioning, for the sidebar + main panel layout
- `AnimatePresence` from Framer Motion handles the panel switch animation
- The HeroUI `Tab` component (if used for the sidebar items) must have its active indicator adapted to use `--color-primary` from DesignTokens
- Dashboard shell must be fully readable without JavaScript (gracefully degrades to static portal list)

---

## Agent E — Concept 5 Preview (Interactive Goal-Based Gateway)

Agent E implements Direction 5 from the Redesign Directions Brief.

### Which Design Direction

Direction 5 — The Interactive Goal-Based Gateway. Viewport-locked question slide flow — three
questions answered before showing personalized portal recommendation.

### Files Agent E Creates

```
src/app/[locale]/design-lab/homepage-concept-5/page.tsx
src/app/[locale]/design-lab/homepage-concept-5/_components/QuestionFlowHero.tsx
src/app/[locale]/design-lab/homepage-concept-5/_components/PersonalizedResult.tsx
src/app/[locale]/design-lab/homepage-concept-5/_lib/recommendedPath.ts
```

### Files Agent E Must NOT Touch

- Everything in Agent A's ownership list
- `src/app/[locale]/page.tsx`
- `src/components/landing/HomepageClient.tsx`
- Any file outside `src/app/[locale]/design-lab/homepage-concept-5/` and `src/components/design-lab/` (read-only)
- Any other concept agent's directory

### Key Implementation Rules for Agent E

- The `recommendedPath.ts` local lib is copied from PathSelector's `getRecommendedPath` function — it is a pure function and must remain pure (no hooks, no imports from React)
- The viewport-lock question flow must have a "skip to result" link accessible at all times — visible, with `aria-label="Skip to recommendation"`
- Question slide direction: slides left-to-right in LTR, right-to-left in RTL — `x: isAr ? 40 : -40` for exit, `x: isAr ? -40 : 40` for enter
- With reduced motion: questions appear/disappear with opacity only, no translation
- The personalized result must render a real recommendation from `recommendedPath.ts`, not a static mock

---

## Agent F — Concept 4 Preview (Cinematic Portal Universe)

Agent F is optional. If time and resources are sufficient, Agent F implements Direction 4.
If Agent F is skipped, the discovery report notes that Concept 4 was deferred.

### Which Design Direction

Direction 4 — The Cinematic Portal Universe. Portal constellation hero with orb expand/collapse
animation revealing portal universe panels.

### Files Agent F Creates

```
src/app/[locale]/design-lab/homepage-concept-4/page.tsx
src/app/[locale]/design-lab/homepage-concept-4/_components/ConstellationHero.tsx
src/app/[locale]/design-lab/homepage-concept-4/_components/PortalUniversePanel.tsx
src/app/[locale]/design-lab/homepage-concept-4/_components/PortalNavStrip.tsx
```

### Files Agent F Must NOT Touch

- Everything in Agent A's ownership list
- `src/app/[locale]/page.tsx`
- `src/components/landing/HomepageClient.tsx`
- Any file outside `src/app/[locale]/design-lab/homepage-concept-4/` and `src/components/design-lab/` (read-only)
- Any other concept agent's directory

### Key Implementation Rules for Agent F

- Orb positions must be deterministic (not random) — use a fixed coordinate map for each portal ID
- The Aceternity background (if used) must be gated behind `!shouldReduce` and a `dynamic(() => import(...), { ssr: false })` lazy load
- On mobile (below 768px): the constellation becomes a vertical list of portal name + color pill — no orb graphics
- The orb expand animation must complete in under 900ms — no slow cinematic transitions that feel laggy
- The `PortalNavStrip` is the fallback for visitors who do not interact with the constellation — it must be visible without any hover interaction

---

## Integration Agent (Main Session)

The Integration Agent runs in the main session and has the only commit authority.

### Responsibilities

1. Start the phase by creating the report directory structure and this document
2. Signal to Agent A that the foundation work can begin
3. After Agent A signals completion: verify `npx tsc --noEmit` and `npm run build` pass
4. Signal concept agents to begin (B and C can run in parallel; D and E can begin after B/C pass QA; F is last)
5. After each concept agent signals done: verify the Preview Acceptance Checklist in `preview-phase-plan.md` for that concept
6. Resolve any TypeScript errors introduced by concept agents before they compound
7. Run `npm run build` after all concept agents have completed — this is the final integration build
8. Commit all preview files in a single commit with message format: `feat(design-lab): add 5 homepage concept previews`
9. Push to `origin/main` and generate a Vercel preview URL for owner review
10. Never push without owner approval

### What Integration Agent Must NOT Do

- Must not modify any production route files
- Must not resolve merge conflicts by removing a concept agent's files — conflicts must be resolved by preserving all content
- Must not approve a concept agent as done if any Preview Acceptance Checklist item fails
- Must not push to main if `npm run build` is failing for any reason

---

## Conflict Prevention Table

| File | Owner | Other Agents Must Not Touch |
|------|-------|-----------------------------|
| `src/app/[locale]/page.tsx` | Production (no agent) | Yes — all agents forbidden |
| `src/components/landing/HomepageClient.tsx` | Production (no agent) | Yes — all agents forbidden |
| `src/components/landing/**/*` | Production (no agent) | Yes — all agents forbidden |
| `src/app/[locale]/design-lab/layout.tsx` | Agent A | Yes — all concept agents forbidden |
| `src/components/design-lab/shared/DesignLabShell.tsx` | Agent A | Yes — concept agents may import only |
| `src/components/design-lab/shared/DesignTokens.tsx` | Agent A | Yes — concept agents may import only |
| `src/components/design-lab/shared/PortalDataProxy.tsx` | Agent A | Yes — concept agents may import only |
| `src/app/[locale]/design-lab/homepage-concept-1/**` | Agent D | Agents B, C, E, F forbidden |
| `src/app/[locale]/design-lab/homepage-concept-2/**` | Agent B | Agents C, D, E, F forbidden |
| `src/app/[locale]/design-lab/homepage-concept-3/**` | Agent C | Agents B, D, E, F forbidden |
| `src/app/[locale]/design-lab/homepage-concept-4/**` | Agent F | Agents B, C, D, E forbidden |
| `src/app/[locale]/design-lab/homepage-concept-5/**` | Agent E | Agents B, C, D, F forbidden |
| `src/config/portals.ts` | Production (no agent) | Yes — all agents read-only via PortalDataProxy |
| `src/app/globals.css` | Production (no agent) | Yes — all agents forbidden |
| `package.json` | Integration Agent | All other agents forbidden — no new package installs without Integration Agent approval |

---

## Shared Acceptance Checklist (Each Agent Verifies Before Reporting Done)

Each concept agent must verify all of the following before reporting completion to the Integration
Agent. Partial completion is not acceptable — the agent must fix issues or explicitly note them as
known blockers requiring Integration Agent review.

| Check | Required Action |
|-------|----------------|
| TypeScript | Run `npx tsc --noEmit`; confirm zero new errors introduced by this agent's files |
| Trailing whitespace | Run `git diff --check`; confirm exit code 0 |
| noindex | Open the page HTML in browser dev tools; confirm `robots` meta tag contains `noindex` |
| Not in navigation | Search codebase for `design-lab` in Navbar, Footer, Sidebar — must return zero results |
| Arabic renders | Navigate to `/ar/design-lab/homepage-concept-N`; confirm text is in Arabic, layout is RTL, arrows point left (for forward actions in RTL) |
| English renders | Navigate to `/en/design-lab/homepage-concept-N`; confirm text is in English, layout is LTR, arrows point right |
| 375px no overflow | Set browser to 375px width; confirm no horizontal scroll on body |
| Reduced motion | Enable OS reduced-motion; confirm no translate animations or continuous pulses |
| Placeholder sections labeled | Any section not yet built has a visible placeholder label — no blank white space without explanation |
| Production files unchanged | `git diff HEAD src/app/[locale]/page.tsx` returns empty; same for `HomepageClient.tsx` |
| Portal links valid | All portal CTA hrefs are of the form `/${locale}/<valid-portal-href>`; no broken link format |

---

## How to Simulate Multi-Agent Work in a Single-Agent Environment

When only one Claude Code session is available, execute the agent work sequentially in this order:

1. **Act as Agent A.** Create all shared foundation files. Run `npx tsc --noEmit` and `npm run build`. Stop and verify before proceeding.
2. **Act as Agent C.** Build Concept 3 (Minimal Trust-First). Run the Acceptance Checklist. Fix any issues before proceeding to the next concept.
3. **Act as Agent B.** Build Concept 2 (Guided Journey). Run the Acceptance Checklist.
4. **Act as Agent E.** Build Concept 5 (Goal Gateway). Run the Acceptance Checklist.
5. **Act as Agent D.** Build Concept 1 (Command Center). Run the Acceptance Checklist.
6. **Act as Agent F (optional).** Build Concept 4 (Cinematic Universe). Run the Acceptance Checklist.
7. **Act as Integration Agent.** Run `npm run build` for the full project. Resolve any cross-concept TypeScript issues. Commit with the prescribed commit message. Push to origin. Generate Vercel preview URL. Report to owner.

**Key discipline for single-agent simulation:**
- Complete each "agent role" fully before beginning the next one — do not interleave files from different concepts
- If a TypeScript error from Agent C's work is discovered during Agent B's work, fix it immediately and run the checklist again for both before continuing
- Never commit partial work — each commit must represent one agent's complete, passing output
- The Integration Agent commit is the only production-facing commit; all prior saves are working files only

**Why this works:** Each concept directory is isolated. Files do not overlap. A single agent can safely complete all work sequentially without conflict, as long as the file boundaries defined in the Conflict Prevention Table are respected.
