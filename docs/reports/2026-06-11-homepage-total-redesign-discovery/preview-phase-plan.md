# Preview Phase Plan

**Date:** 2026-06-11
**Project:** NexaLearn by Ahmed Darhous
**Phase:** Preview routes for five homepage concepts — no production changes

---

## Purpose

This plan governs the phase immediately following this discovery report. The phase creates five
isolated preview routes — one per design direction — so that each concept can be reviewed at real
device widths without touching the production homepage.

The production homepage at `src/app/[locale]/page.tsx` must not be modified during this phase.

---

## 1. Folder Structure

All preview routes live under `src/app/[locale]/design-lab/`. This path is already isolated from
navigation and is consistent with the existing `ui-lab` pattern established in the UI library
foundation phase.

```
src/app/[locale]/design-lab/
  layout.tsx                        ← Shared layout wrapper for all design-lab routes (noindex, no navbar link)
  homepage-concept-1/
    page.tsx                        ← Direction 1: Learning Command Center
    _components/
      CommandCenterShell.tsx
      PortalSidebar.tsx
      RecommendationCenter.tsx
  homepage-concept-2/
    page.tsx                        ← Direction 2: Guided Learning Journey
    _components/
      GoalQuestionHero.tsx
      ChapterReveal.tsx
      OutcomeForecast.tsx
  homepage-concept-3/
    page.tsx                        ← Direction 3: Minimal Trust-First Landing
    _components/
      MinimalHero.tsx
      PortalCompactGrid.tsx
  homepage-concept-4/
    page.tsx                        ← Direction 4: Cinematic Portal Universe
    _components/
      ConstellationHero.tsx
      PortalUniversePanel.tsx
      PortalNavStrip.tsx
  homepage-concept-5/
    page.tsx                        ← Direction 5: Interactive Goal-Based Gateway
    _components/
      QuestionFlowHero.tsx
      PersonalizedResult.tsx

src/components/design-lab/
  shared/
    DesignLabShell.tsx              ← Common wrapper: noindex signal, preview banner, locale switcher
    DesignTokens.tsx                ← Exports all NexaLearn CSS vars as typed constants for use in previews
    PreviewFontLoader.tsx           ← Ensures Cairo + Geist are loaded for preview routes
    PortalDataProxy.tsx             ← Re-exports portals config without modification

docs/reports/2026-06-11-homepage-total-redesign-discovery/
  redesign-opportunity-map.md      ← (this discovery phase)
  redesign-directions-brief.md     ← (this discovery phase)
  preview-phase-plan.md            ← (this file)
  agent-work-allocation.md         ← (this discovery phase)
```

---

## 2. Rules for Preview Routes

Every preview route must follow all of the following rules without exception.

### Never Replace Production

- `src/app/[locale]/page.tsx` must not be modified
- `src/components/landing/HomepageClient.tsx` must not be modified
- No imports from preview components may appear in production routes

### Never Add to Navigation

- The `design-lab` path must not appear in the Navbar, Footer, or Sidebar
- No link to any `/design-lab/*` route may appear in production routes
- The existing `ui-lab` precedent confirms this pattern is already established

### Mark noindex via Metadata

Every `page.tsx` inside `design-lab/` must export a `generateMetadata` function returning:

```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    robots: { index: false, follow: false },
    title: "Design Preview — NexaLearn",
  };
}
```

The shared `DesignLabShell.tsx` component may also include an HTML `<meta name="robots">` tag
as a secondary belt-and-suspenders measure, but the `generateMetadata` export is mandatory.

### Arabic RTL and English LTR

- Every preview must render correctly at both `/ar/design-lab/homepage-concept-N` and `/en/design-lab/homepage-concept-N`
- The `locale` parameter from the page's `params` prop must be read and passed through to all child components
- All directional CSS must use `start`/`end` instead of `left`/`right`, or use inline style with `[isAr ? "right" : "left"]` keying
- No hard-coded `text-left`, `text-right`, `flex-row-reverse` without an `isAr` condition wrapping it

### Reduced-Motion Fallback

- Every animated element must check `useReducedMotion()` from Framer Motion
- When `shouldReduce` is `true`: translate Y offsets become 0, durations become 0.15s, opacity-only transitions are used
- Continuous animations (pulse, bounce, orb-breathe) must stop entirely when `shouldReduce` is `true`
- The reduced-motion check is verified during acceptance, not assumed

### Quality Gate — Three Checks Must Pass

Before any agent reports a preview complete, all three checks must pass with zero new errors:

```bash
npx tsc --noEmit
npm run build
git diff --check
```

Lint warnings that predate this phase are acceptable. New lint errors introduced in this phase are not.

---

## 3. One Preview Route Per Design Direction

| Route | Direction Name | Key Technical Requirement |
|-------|---------------|---------------------------|
| `/[locale]/design-lab/homepage-concept-1` | Learning Command Center | `AnimatePresence` panel switching; HeroUI Tab sidebar |
| `/[locale]/design-lab/homepage-concept-2` | Guided Learning Journey | Goal-driven section reveal; Magic UI animated text (if used) |
| `/[locale]/design-lab/homepage-concept-3` | Minimal Trust-First Landing | No above-fold animation; shadcn/ui portal grid |
| `/[locale]/design-lab/homepage-concept-4` | Cinematic Portal Universe | Framer Motion orb expand; Aceternity background (if used) |
| `/[locale]/design-lab/homepage-concept-5` | Interactive Goal-Based Gateway | Viewport-locked question slide; `getRecommendedPath` reuse |

---

## 4. Minimum Content Per Preview

Each preview must implement at minimum the following four elements. Anything beyond this minimum
is at the agent's discretion within the design direction's spec.

| Element | Minimum Requirement |
|---------|---------------------|
| Layout | Full-width dark background, global CSS variables applied, font loaded correctly in both AR and EN |
| Hero section | The signature above-fold interaction for that direction (dashboard shell, goal question, constellation, etc.) — fully functional |
| One portal section | At least one section showing portal data from `src/config/portals.ts` using real portal names, descriptions, and colors |
| One CTA | A visible, tappable call-to-action that links to `/${locale}/register` with correct RTL arrow direction |

Sections not included in the minimum (AI Mentor demo, trust strip, how-it-works) may be represented as
visible placeholder sections with a label ("Mentor Demo — to be built") rather than left blank.

---

## 5. Shared Components Across Previews

The following are built once by Agent A (Shared Foundation) and used by all concept agents.
No concept agent may rebuild these from scratch.

| Component | File | Purpose |
|-----------|------|---------|
| `DesignLabShell` | `src/components/design-lab/shared/DesignLabShell.tsx` | Wrapper with noindex meta, preview banner, locale switcher |
| `DesignTokens` | `src/components/design-lab/shared/DesignTokens.tsx` | Typed exports of all CSS vars (`--color-primary`, etc.) |
| `PreviewFontLoader` | `src/components/design-lab/shared/PreviewFontLoader.tsx` | Ensures Cairo and Geist are available in preview routes |
| `PortalDataProxy` | `src/components/design-lab/shared/PortalDataProxy.tsx` | Re-exports `portals` and `Portal` type from `src/config/portals.ts` — ensures concept agents never import portals config directly |
| `design-lab/layout.tsx` | `src/app/[locale]/design-lab/layout.tsx` | Shared layout for all five routes: applies `DesignLabShell`, sets `noindex` |

---

## 6. Suggested Execution Order

Build concepts in this order:

1. **Agent A — Shared Foundation first** (blocking; all other agents depend on it)
2. **Agent C — Concept 3 (Minimal Trust-First) second** — lowest complexity, validates the shared foundation, fastest to QA
3. **Agent B — Concept 2 (Guided Journey) third** — medium complexity, tests goal-driven section reveal
4. **Agent E — Concept 5 (Goal Gateway) fourth** — medium-high complexity, reuses PathSelector logic
5. **Agent D — Concept 1 (Command Center) fifth** — high complexity, most custom layout work
6. **Agent F — Concept 4 (Cinematic Universe) last** — very high complexity, most animation-heavy

**Rationale:** Concept 3 is chosen as second because it has the fewest moving parts. If the shared
foundation has a problem, Concept 3 will surface it quickly with minimal wasted work. Concept 4 is
last because if time or resources run short, it can be deferred — the four other concepts are
sufficient for a meaningful design comparison.

---

## 7. How to Validate a Preview Before Moving to Production Swap

A preview is considered ready for owner evaluation when all of the following are true:

1. `npx tsc --noEmit` exits with 0 errors (new errors only — preexisting errors are documented and acceptable)
2. `npm run build` exits with 0 errors
3. `git diff --check` exits with 0 trailing whitespace errors
4. The route renders at `/ar/design-lab/homepage-concept-N` with correct RTL layout
5. The route renders at `/en/design-lab/homepage-concept-N` with correct LTR layout
6. At 375px viewport width, no horizontal scroll overflow is present
7. At 1440px viewport width, the layout fills the viewport without centering issues
8. With `prefers-reduced-motion: reduce` set in browser, no continuous animations play
9. All links inside the preview (portal CTAs, registration links) resolve to valid routes
10. The preview banner is visible (confirming the user knows this is not the production page)

---

## 8. Preview Acceptance Checklist

| Check | Pass Condition |
|-------|---------------|
| TypeScript | `npx tsc --noEmit` exits 0 with no new errors |
| Build | `npm run build` exits 0 with no new errors |
| Trailing whitespace | `git diff --check` exits 0 |
| noindex metadata | Page source contains `<meta name="robots" content="noindex, nofollow">` or equivalent Next.js metadata |
| Not in navigation | Searching codebase for `/design-lab` finds zero results in Navbar, Footer, or Sidebar components |
| Arabic RTL | Route at `/ar/design-lab/homepage-concept-N` renders with `dir="rtl"`, arrows face correct direction, text aligns right |
| English LTR | Route at `/en/design-lab/homepage-concept-N` renders with `dir="ltr"`, arrows face correct direction, text aligns left |
| 375px no overflow | No `overflow-x: scroll` on `body` or `html` at 375px |
| 1440px layout | Content fills viewport, no orphaned single-column layout at large widths |
| Reduced motion | With OS reduced-motion enabled: no translate animations, no continuous pulse, no orb-breathe |
| All portal links resolve | Each portal CTA link targets a valid path that does not 404 |
| Registration link works | Primary CTA links to `/${locale}/register` (404 is acceptable only if register route does not yet exist — link format must be correct) |
| Placeholder sections labeled | Any section not yet built has a visible text label indicating it is a placeholder |
| Production homepage unchanged | `git diff HEAD src/app/[locale]/page.tsx` returns empty output |
| Production HomepageClient unchanged | `git diff HEAD src/components/landing/HomepageClient.tsx` returns empty output |

---

## 9. Production Replacement Process

The production homepage is not replaced during this phase. Production replacement happens in a
separate phase, after owner selection of one concept from the preview routes.

**Process:**

1. Owner reviews all five preview routes at the live Vercel preview URL (not localhost)
2. Owner selects one direction by name (e.g., "Direction 3 — Minimal Trust-First")
3. A new phase is started: "Homepage Production Replacement — Concept N"
4. That phase's agent reads the chosen concept's component files and rebuilds them as production components, applying all audit findings from the Visual Audit report
5. The production `page.tsx` and `HomepageClient.tsx` are replaced in a single commit
6. TypeScript, build, and lint checks pass before the commit is made
7. The commit is pushed and a Vercel preview deploy is generated
8. Owner approves the Vercel preview URL before the deployment is promoted to production

No preview agent has permission to modify production files. If a preview agent believes a
production file should change, it must document the recommendation in a report and stop.
