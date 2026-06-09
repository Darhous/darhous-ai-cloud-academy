# Phase 5: UI/UX Pro Max + Launch Candidate Blueprint

**Suggested file:** `docs/reports/phase-5-ui-ux-pro-max-blueprint.md`  
**Project:** Darhous AI Cloud Academy / NexaLearn  
**Audit date:** June 9, 2026  
**Mode:** Read-only planning audit

---

## 1. Executive Creative Vision

Phase 5 should turn the existing platform into a coherent premium learning ecosystem, not merely add more gradients and animation.

The target experience is:

> **NexaLearn by Darhous: an Arabic-first intelligent learning universe where AI guides the learner across specialized portals, practical projects, assessments, career outcomes, and verified achievements.**

The visual concept should be an **intelligent learning constellation**:

- A calm, cinematic dark environment with precise highlights.
- Strong bilingual editorial typography.
- One unified platform identity.
- A distinct accent color for each portal.
- An AI Mentor acting as the visual and functional center.
- Selective depth, pointer response, and scroll storytelling.
- Real product interfaces and content previews instead of generic feature cards.
- Operational screens such as admin, exams, and forms optimized for clarity rather than spectacle.

The implementation is realistic because the codebase already contains:

- Framer Motion.
- Portal color tokens.
- Dark and light themes.
- RTL/LTR layouts.
- Landing-page section components.
- Portal entry transitions.
- Reduced-motion support.
- An ecosystem map.
- Dashboard previews.
- A grouped admin shell.

Phase 5 should consolidate these foundations into a deliberate system and remove duplicated or uncontrolled visual effects.

---

## 2. Current UI/UX Reality Check

### Actual architecture reviewed

Primary surfaces include:

- `src/app/[locale]/page.tsx`
- `src/components/landing/HomepageClient.tsx`
- `src/components/landing/sections/*`
- `src/components/landing/SmartPlatformTour.tsx`
- `src/components/ecosystem/PortalCard.tsx`
- `src/components/portal/PortalIdentityIntro.tsx`
- `src/components/ui/PortalPageWrapper.tsx`
- `src/app/globals.css`
- `src/config/portals.ts`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/dashboard/StudentDashboardClient.tsx`
- `src/components/admin/AdminDashboardClient.tsx`
- `src/components/admin/AdminSidebar.tsx`
- `src/components/admin/cms/*`
- `src/lib/admin/cms-registry.ts`
- `src/app/[locale]/automation-glossary/*`
- `src/app/[locale]/loading.tsx`
- `src/app/[locale]/error.tsx`
- `src/app/[locale]/not-found.tsx`
- `src/app/[locale]/layout.tsx`
- `src/app/og/route.tsx`
- `public/og-image.svg`
- `public/manifest.webmanifest`
- `src/app/sitemap.ts`

### Strengths

- The homepage is already divided into manageable sections.
- Framer Motion `12.40.0` is installed and actively used.
- Global reduced-motion CSS exists.
- Most motion components call `useReducedMotion()`.
- Portal identities are centralized through `data-portal` tokens.
- Arabic and English font families are already separated.
- Logical CSS such as `start`, `end`, and `borderInlineEnd` is used in several areas.
- The locale layout includes a skip link and global focus-visible treatment.
- Metadata coverage is broad across the route tree.
- Portal pages already share `PortalIdentityIntro` and `PortalPageWrapper`.
- The admin route is protected server-side.
- The automation glossary correctly reads published records only.
- The admin navigation has already been reduced from a flat 29-tab strip into grouped navigation.

### Visual weaknesses

- Glass, glow, blur, gradients, environmental orbs, badges, and animated pulses are used too frequently.
- Many cards look like variations of the same generic glass panel.
- Portal identity still depends on emoji in `src/config/portals.ts`.
- Navbar, footer, portal cards, dashboard, and admin continue to use emoji as interface icons.
- There is no distinctive NexaLearn brand symbol or visual signature.
- The homepage has many good sections but lacks one memorable art-directed narrative.
- Visual hierarchy is weakened because many sections use similar cards, headings, motion, and spacing.
- “Smart Learning OS v13.0” feels like an internal version label rather than premium customer-facing positioning.
- Some CTA copy is overly dramatic or informal and should be refined for long-term brand credibility.
- Light mode is supported technically but several hard-coded dark translucent colors need systematic review.

### UX weaknesses

- The first-visit `SmartPlatformTour` automatically opens after 2.4 seconds, interrupting homepage exploration.
- Adding a separate cinematic intro without changing that behavior would create two consecutive overlays.
- The global loading, error, and 404 states are English-only.
- Error and 404 links return to `/` instead of the active locale.
- The automation glossary admin link points to `/${locale}/dashboard`, not the admin CMS destination.
- The glossary uses physical spacing such as `ml-2` and `pr-16`, which is not RTL-safe.
- Empty, no-results, loading, and degraded-data patterns are not unified.
- Portal navigation is comprehensive but dense, especially on mobile.
- The student dashboard is a 1,384-line client component with many competing panels.
- The homepage root is a client component that imports a mostly client-rendered section tree.

### Admin limitations

- `AdminDashboardClient.tsx` remains approximately 5,000 lines.
- The desktop sidebar is fixed at `w-64` and `h-screen` with no clear mobile drawer strategy.
- CMS records are presented primarily as repeated glass cards rather than a scalable record workspace.
- Status presentation varies between panels.
- Several older forms default new records to `published`; the generic CMS correctly defaults to `draft`.
- Generic CMS still exposes permanent delete actions.
- Native `confirm()` dialogs do not provide an adequately controlled publishing or destructive-action experience.
- CMS content groups remain broad and require nested information architecture.
- There is no persistent current-section context, command bar, or quick-action layer.

### Motion limitations

- Motion definitions are duplicated across homepage sections.
- Several decorative animations run continuously.
- Hover effects frequently combine scale and translation.
- There is no single motion token API for entrance, exit, hover, press, stagger, parallax, and pointer response.
- `AnimateIn.tsx` does not currently call `useReducedMotion()`, relying only on global CSS after hydration.
- Pointer-specific interactions are not separated from touch behavior.
- Fixed blurred backgrounds and backdrop filters can become expensive on mobile devices.

### Launch-readiness gaps

- No unified production-quality state system.
- No global error boundary outside the locale segment.
- No route-specific loading skeletons for important data routes.
- No automation glossary sitemap entry.
- Two competing OG approaches exist: `/og` and `public/og-image.svg`.
- Favicon and manifest still use the old Darhous identity.
- Fonts load through a blocking Google Fonts CSS `@import`.
- No automated test suite was found.
- Accessibility, responsive, reduced-motion, and production browser QA still require a formal release matrix.

---

## 3. Homepage Pro Max Proposal

### Homepage narrative

The homepage should tell one story:

1. Understand where the learner wants to go.
2. Reveal the intelligent ecosystem.
3. Show the portals as connected capabilities.
4. Demonstrate how the AI Mentor creates a path.
5. Show the real learning workflow.
6. Prove visible outcomes.
7. Invite the learner to begin.

### Section blueprint

| Section | Visual idea | Motion idea | User value | Likely files | Risk |
|---|---|---|---|---|---|
| Cinematic entry | NexaLearn signal forms from portal-colored light paths | 1.2–1.6 second transform/opacity sequence | Establishes premium identity | New homepage-only client island; `globals.css`; locale layout only if approved | Medium |
| Premium hero | Bold Arabic-first statement with an interactive “learning command center” | Staggered headline, restrained depth, pointer response on desktop | Immediately explains the product | `HeroSection.tsx`, `HomepageClient.tsx` | Medium |
| Intent selector | Four user intents: Learn, Build, Test, Advance | Selected intent changes nearby portal recommendations | Reduces choice overload | `PathSelector.tsx` | Low |
| Ecosystem overview | AI Mentor at the center of a true visual constellation | Connections illuminate on focus, hover, or intent selection | Explains the unified ecosystem | `EcosystemMap.tsx` | Medium |
| Portal constellation | Large portal cards with distinct color signatures and real outcomes | Spotlight, mild tilt, border energy, layered depth | Makes portals memorable and navigable | `PortalGrid.tsx`, `PortalCard.tsx`, `portals.ts` | Medium |
| AI Mentor preview | Real conversation, generated plan, and recommended next action | Message/plan reveal triggered once in view | Demonstrates intelligence rather than claiming it | `MentorShowcase.tsx`, mentor UI components | Medium |
| Learning paths | Horizontal or stacked learning journey cards | Scroll progress reveals stages without scroll hijacking | Shows a clear path from beginner to outcome | `HowItWorks.tsx` or a new learning-story component | Medium |
| Automation/content preview | Published automation concepts, workflows, or glossary samples | Subtle card expansion and data-line reveal | Shows practical content depth | Homepage section plus published-only server data | High |
| Dashboard preview | Auth-neutral premium mockup using representative data | Tabs switch between progress, plan, certificates | Makes the product feel complete | `HeroSection.tsx`, `HeroDashboardPreview.tsx`, dashboard components | Medium |
| Achievement preview | Certificate, skill graph, streak, and completed project | One-time progress and certificate reveal | Communicates tangible outcomes | New section; certificate assets/config | Medium |
| Trust and quality | Arabic-first, practical, verified, safe AI, human-guided | Minimal motion | Reduces uncertainty | `WhyDarhous.tsx` | Low |
| Final CTA | One clear entry action plus secondary AI Mentor action | Magnetic effect only on fine pointers | Converts without overwhelming | `FinalCTA.tsx` | Low |

### Recommended hero composition

The hero should use a split composition on wide screens:

- **Text side:** concise Arabic-first positioning, one primary CTA, one secondary CTA, three proof points.
- **Product side:** interactive NexaLearn command center showing current path, Mentor recommendation, portal progress, and next action.
- **Background:** static noise texture, two low-opacity portal light fields, and sparse lines.
- **Pointer response:** maximum 2–4 degrees of depth. No full-scene rotation.
- **Mobile:** product preview becomes a single flat card below the CTA.

Recommended Arabic positioning direction:

> تعلّم بذكاء. ابنِ بمهارة. تقدّم بثقة.

Supporting copy should explain that NexaLearn connects learning, practice, assessment, and career progress through one AI-guided system.

### Homepage component architecture

The homepage should stop treating every section as part of one large client boundary.

Recommended architecture:

- Keep `src/app/[locale]/page.tsx` as the server entry.
- Replace the all-client `HomepageClient` wrapper with a mostly server-rendered page composition.
- Keep only interactive islands as client components:
  - Intro controller.
  - Hero pointer layer.
  - Intent selector.
  - Ecosystem interactions.
  - Portal pointer effects.
  - Dashboard demo tabs.
- Dynamically load below-fold cinematic islands where useful.
- Render textual content, static cards, metadata, and SEO-relevant structure on the server.

---

## 4. Cinematic Intro / Loading Plan

### Purpose

The cinematic intro must introduce the brand, not delay access to the site.

It must not become the route-level loading UI and must not conceal server-rendered homepage content from crawlers.

### Behavior

- Show only on the homepage.
- Show once per browser session using `sessionStorage`.
- Do not show on every visit or navigation.
- Maximum non-skippable time: approximately 400ms.
- Maximum total time: 1.6 seconds.
- Provide a visible localized Skip button immediately.
- Any pointer, Enter, Space, or Escape action should safely dismiss it.
- Do not show when `prefers-reduced-motion: reduce` is active.
- Do not show on slow-device fallback conditions if performance detection is added.
- Do not combine it with the current automatic `SmartPlatformTour`.

### Recommended sequence

1. Dark neutral field appears.
2. Six portal-colored points enter from logical inline directions.
3. Their paths connect into a simple NexaLearn symbol.
4. “NexaLearn” appears, followed by the smaller signature “by Darhous.”
5. The symbol contracts toward the hero product preview.
6. The overlay fades away without moving the document layout.

### Technical approach

Use the existing stack:

- CSS for the background, paths, opacity, and simple transformations.
- Framer Motion for sequence orchestration and dismissal.
- SVG for the brand symbol and connection paths.
- No canvas, video, WebGL, or new package in the first implementation.

Framer Motion is already installed, so no package installation is required.

### SEO safety

- Homepage content must exist in the initial server-rendered HTML.
- The intro is a fixed visual layer over content, not a conditional replacement.
- The real `<h1>` remains present and accessible.
- Decorative intro elements use `aria-hidden="true"`.
- The intro must never alter metadata generation.
- The overlay should be removed from keyboard flow after dismissal.

### Mobile fallback

- No parallax.
- No blurred full-screen moving layers.
- Use a simplified logo formation and fade.
- Keep the sequence under approximately one second.
- Skip automatically under reduced motion.

### Relationship to the existing tour

The current `SmartPlatformTour.tsx` should not auto-open after the intro. Recommended change:

- Keep the tour available through a “How NexaLearn works” action.
- Or trigger it only after explicit user intent.
- Never show both intro and tour automatically in the same session.

---

## 5. Mouse-Reactive Cards & Interaction System

### Reusable component concept

Create one shared interaction foundation rather than implementing mouse calculations in every card.

Suggested conceptual API:

```tsx
<ReactiveSurface
  variant="portal"
  accent={portal.color}
  tilt
  spotlight
  magneticAction
  depth="medium"
>
  ...
</ReactiveSurface>
```

Potential component family:

- `ReactiveSurface`
- `PortalExperienceCard`
- `MagneticAction`
- `CursorSpotlight`
- `StatusBadge`

### Interaction layers

#### 3D tilt

- Enabled only for `(hover: hover) and (pointer: fine)`.
- Maximum rotation around 3–4 degrees.
- Use `requestAnimationFrame`.
- Update CSS custom properties instead of React state on every mouse move.
- Reset smoothly on pointer leave and blur.
- Decorative depth must not alter clickable geometry.

#### Cursor spotlight

- Use a radial gradient controlled through `--pointer-x` and `--pointer-y`.
- Keep opacity low.
- Disable on touch devices.
- Ensure text contrast does not depend on the spotlight.

#### Glowing border

- Use a masked or pseudo-element border layer.
- Portal accent controls hue.
- Border should remain visible without hover.
- Hover increases intensity rather than creating the only affordance.

#### Magnetic CTA

- Apply only to primary CTA content, not the entire layout box.
- Limit displacement to 4–8px.
- Disable for keyboard input, touch, and reduced motion.
- Preserve a conventional hover and focus state.

#### Portal-specific gradients

Continue using centralized portal identity, but upgrade each portal to structured tokens:

- Base accent.
- Bright accent.
- Deep accent.
- Surface tint.
- Border tint.
- Glow tint.
- Optional signature gradient.

### Accessibility fallback

- Every interactive card remains a semantic link or button.
- Keyboard focus receives the same border/spotlight emphasis.
- Card information is fully visible without hover.
- No action depends on cursor position.
- Focus rings must remain above glow effects.
- Touch target minimum: 44×44px.

### Reduced-motion behavior

- No tilt.
- No magnetic displacement.
- No moving spotlight.
- Use simple color, border, and shadow transitions.
- Preserve portal identity and hierarchy.

### Where to use it

Use selectively on:

- Homepage portal constellation.
- AI Studio showcase.
- Featured learning paths.
- Dashboard preview cards.
- Mentor suggestion cards.
- Final primary CTA.

Do not use it on:

- Admin record rows.
- Long content lists.
- Exams.
- Forms.
- Destructive actions.
- Every card across the site.

---

## 6. Motion System / Design System Upgrade

### Design tokens

Extend the existing variables in `src/app/globals.css` into explicit semantic groups.

#### Surface tokens

- `--surface-canvas`
- `--surface-section`
- `--surface-card`
- `--surface-card-raised`
- `--surface-overlay`
- `--surface-interactive`

#### Typography tokens

- Display XL through Display SM.
- Heading 1 through Heading 4.
- Body large, body, body small.
- Label and metadata.
- Code and numeric data.

Arabic sizes and line heights should be tuned independently rather than relying only on the English scale.

#### Motion tokens

- `--motion-instant`: 100–150ms
- `--motion-fast`: 180–220ms
- `--motion-base`: 260–320ms
- `--motion-story`: 500–700ms
- Standard enter easing.
- Standard exit easing.
- Standard spring for controlled interactive elements.
- Shared Framer variants for fade, rise, scale, stagger, and directional reveal.

#### Elevation tokens

- Flat.
- Raised.
- Floating.
- Overlay.
- Portal glow.

### Portal color system

Retain the existing identities:

- AI Academy: electric blue.
- Language: violet.
- Digital Exams: cyan.
- Career: amber.
- Automation: green.
- IoT Lab: orange.
- Nano Banana: amber/gold, but remain deferred from schema or product expansion.

Each portal should use its color primarily for:

- Selected state.
- Fine borders.
- Icon containers.
- Section markers.
- Progress.
- Focus.
- Small lighting fields.

The page background and body typography should remain unified.

### Card variants

1. **Editorial:** minimal border, strong content hierarchy.
2. **Portal:** accent border and optional pointer response.
3. **Learning:** progress and next action.
4. **Utility:** compact and functional.
5. **Metric:** numeric hierarchy.
6. **Record:** status, metadata, and action menu.
7. **Feature spotlight:** large storytelling surface.
8. **Empty state:** illustration/icon, explanation, and next action.

### Button variants

- Primary solid.
- Secondary outline.
- Quiet/ghost.
- Portal accent.
- Destructive.
- Icon-only.
- Magnetic primary, homepage-only.

Avoid scale-heavy hover effects on ordinary controls.

### Section backgrounds

Use three intentional section modes:

- Clean neutral.
- Subtle grid/noise.
- Portal-tinted spotlight.

Do not combine grid, two orbs, glass, gradient text, and glowing cards in every section.

### RTL-first rules

- Prefer `inline-start`, `inline-end`, `ps-*`, `pe-*`, `ms-*`, and `me-*`.
- Avoid hard-coded `left`, `right`, `pl`, `pr`, `ml`, and `mr` for semantic alignment.
- Directional motion must follow reading direction.
- Keep code, URLs, IDs, JSON, and technical diagrams explicitly LTR.
- Test Arabic heading wraps independently.
- Use Arabic-appropriate line height and paragraph width.

### Focus states

- Minimum 2px visible focus ring.
- 3px offset where space permits.
- Portal-aware color is acceptable.
- Never remove focus without replacement.
- Focus styling must be visible in light and dark themes.
- Overlay focus must be trapped and restored correctly.

---

## 7. Admin UX Improvement Plan

### Navigation hierarchy

Keep the grouped sidebar but improve it into a responsive admin shell:

- Desktop: collapsible sidebar.
- Tablet: icon rail plus expandable labels.
- Mobile: modal navigation drawer.
- Persistent current group and page title.
- Search or command action for jumping to CMS sections.
- Remember the last opened group locally.

### CMS grouping

Restructure the content group visually into:

- Publishing Queue.
- AI Academy Content.
- Automation Content.
- IoT Content.
- Exam Content.
- Blog and Glossary.
- Read-only Imported Draft Review.
- Legacy Content, clearly marked.

This is an information-architecture change, not a permission expansion.

### Dashboard priorities

Admin overview should emphasize:

1. Drafts awaiting review.
2. Published content.
3. Recently changed content.
4. System health.
5. Public route checks.
6. Quick actions.
7. Audit events.

Avoid presenting all metrics as equal glass cards.

### Status clarity

Create a shared status component:

- Draft: amber, pencil/document icon, “Not public.”
- Published: green, globe/check icon, “Visible publicly.”
- Archived: neutral gray, archive icon, “Not public.”
- Invalid or blocked: red, warning icon.

Color must not be the only distinction.

### Safer publishing workflow

For the existing pilot only:

- Default all new records to draft.
- Separate “Save draft” from “Publish.”
- Publishing requires an explicit confirmation screen.
- Confirmation displays title, table, locale coverage, current status, and public route.
- Archiving is preferred over deletion.
- Permanent deletion should remain unavailable or require a later explicitly approved phase.
- Log publish and archive actions.

### Inline admin controls

For `automation-glossary`:

- Keep controls read-only.
- Replace the broad “Admin Mode Active” banner with a compact authenticated admin toolbar.
- Link directly to the correct admin CMS section.
- Show content status only to verified administrators.
- Use an edit/manage link, not inline mutation.
- Preserve dynamic rendering where server-side admin state is checked.
- Never place admin state in a cacheable shared public response.

### Scope restriction

Do not perform a full CMS rewrite in Phase 5. The admin work should be visual and architectural:

- Responsive shell.
- Navigation clarity.
- Shared statuses.
- Quick actions.
- Publishing confirmation polish for the approved pilot.
- Inline admin polish.

CRUD expansion, bulk publishing, version history, scheduled publishing, and additional public wiring belong to later phases.

---

## 8. Public Page / Portal Polish Plan

### Standard portal header

Introduce a shared portal hero anatomy:

- Localized breadcrumb.
- Portal symbol and category.
- Clear title and promise.
- Short supporting paragraph.
- Primary action.
- Secondary action.
- Three proof metrics.
- Optional small product preview.
- Portal accent field.

Existing portal routes should migrate incrementally to this shared structure.

### Page transitions

Keep `PortalPageWrapper`, but:

- Restrict transitions to opacity plus 4–8px movement.
- Use the shared motion preset.
- Avoid animating the entire page when route content is large.
- Never delay reading or interaction.
- Disable the transition under reduced motion.

### Cards and filters

- Standardize card anatomy across courses, projects, tools, glossary, and automation.
- Use one responsive filter bar pattern.
- Preserve search state in the URL where appropriate.
- Support clear-all and no-results states.
- Use result counts consistently.
- Avoid client-side filtering for very large future DB collections without pagination.

### Automation glossary pilot

Required polish:

- Add portal identity through `data-portal="automation"` or the corresponding shared wrapper.
- Correct the admin destination.
- Replace physical spacing with logical spacing.
- Localize status labels.
- Replace emoji examples and empty-state icons with Lucide/custom SVG.
- Add a proper published-content empty state.
- Add a no-search-results state distinct from “no published records.”
- Add it to sitemap only after route ownership and public launch inclusion are approved.
- Preserve the published-only query in `fetchPublishedList()`.

### Loading states

Create shared skeleton patterns:

- Page hero skeleton.
- Card grid skeleton.
- List skeleton.
- Detail skeleton.
- Dashboard widget skeleton.
- Admin record skeleton.

Use route-level loading only where actual route suspension occurs. Component-level async actions should use local feedback.

### Error and empty states

Create localized reusable states for:

- No content published.
- No search results.
- Authentication required.
- Permission denied.
- Network unavailable.
- AI provider unavailable.
- Supabase unavailable.
- Unexpected error.
- Content not found.

Every state should include one clear next action.

---

## 9. Launch Candidate Requirements

The site is not a launch candidate until all applicable gates pass.

### Engineering gates

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `git diff --check`
- Clean production deployment build.
- No unexplained lint baseline growth.
- No client/server hydration warnings.
- No console errors on critical routes.

### Route validation

Validate both `/ar` and `/en` for:

- Homepage.
- Every public portal landing page.
- Automation glossary.
- Courses, tools, projects, blog, glossary.
- Mentor and primary AI tools.
- Login, registration, and reset flows.
- Student dashboard.
- Admin access denial and approved access.
- Certificates and verification routes.
- Dynamic content detail routes.
- Error and not-found handling.

### Responsive QA

Test at minimum:

- 375px.
- 768px.
- 1024px.
- 1440px.

For each:

- Arabic RTL.
- English LTR.
- Dark mode.
- Light mode.
- Touch and fine-pointer behavior.
- No horizontal overflow.
- No clipped fixed controls.
- No navbar or admin-sidebar collisions.

### Accessibility QA

- Keyboard-only navigation.
- Visible focus.
- Correct heading hierarchy.
- Landmarks.
- Dialog focus trap and restoration.
- Skip link.
- Form labels and error associations.
- Minimum contrast.
- Minimum target size.
- Screen-reader route announcements.
- Non-color status indicators.
- Decorative motion hidden from assistive technology.

### Motion QA

- `prefers-reduced-motion` simulation.
- Intro fully bypassed.
- No parallax or tilt under reduced motion.
- No essential content hidden behind entrance animations.
- No scroll hijacking.
- No continuous decorative animation in admin, forms, or exams.
- Smooth behavior on mid-range mobile hardware.

### Metadata and brand QA

- One canonical OG implementation.
- Correct 1200×630 previews.
- Arabic and English preview validation.
- Favicon at required sizes.
- Manifest icons including maskable assets.
- Canonical URLs.
- Locale alternates where appropriate.
- Sitemap route validation.
- Robots rules.
- Private/admin routes remain noindex.

### Security and content QA

- Admin route remains server-protected.
- Admin APIs remain authorization-protected.
- Anonymous users never receive admin controls.
- Public queries enforce `status = "published"`.
- Draft and archived records never appear publicly.
- No admin-state static caching.
- No public mutation controls.
- No expansion into deferred `tools_hub` or `nano_banana` work.
- RLS behavior verified for anonymous, student, and admin roles.

### Performance QA

- Lighthouse or equivalent production checks.
- Core Web Vitals review.
- LCP element identified and optimized.
- Homepage JavaScript measured before and after.
- Framer Motion and interactive islands inspected in bundle output.
- Below-fold interactive sections lazy-loaded where beneficial.
- Font loading migrated away from blocking CSS `@import`.
- Blur and backdrop-filter usage profiled on mobile.
- No large autoplay video or canvas in the initial launch candidate.

---

## 10. Implementation Phasing

### Phase 5A — UI/UX Foundation and Brand-Ready Design System

**Goal:** Establish the shared tokens, component variants, motion presets, state patterns, and brand abstraction before redesigning pages.

**Likely files:**

- `src/app/globals.css`
- `src/config/portals.ts`
- `src/components/ui/*`
- `src/components/ecosystem/PortalCard.tsx`
- New narrowly scoped design-system components
- Optional centralized brand configuration

**Scope:**

- Semantic tokens.
- Shared motion presets.
- Shared status badges.
- Shared empty/error/loading states.
- Portal icon strategy using Lucide or authored SVG.
- Brand-ready naming slots without activating the rename.
- Logical RTL spacing standards.

**Validation:**

```bash
npm run typecheck
npm run lint
npm run build
git diff --check
```

**Risk:** Medium.

**Checkpoint:** `checkpoint/phase-5a-ui-foundation-v1`

---

### Phase 5B — Homepage Architecture and Static Art Direction

**Goal:** Recompose the homepage narrative and visual hierarchy before adding advanced interaction.

**Likely files:**

- `src/app/[locale]/page.tsx`
- `src/components/landing/HomepageClient.tsx`
- `src/components/landing/sections/*`
- `src/components/visual/HeroDashboardPreview.tsx`

**Scope:**

- Server-first homepage composition.
- New hero hierarchy.
- Section ordering.
- Product preview.
- Portal constellation structure.
- Real outcome and achievement sections.
- Refined CTA language.
- No cinematic intro yet.

**Validation:**

- Standard engineering commands.
- Visual QA at four breakpoints.
- Arabic/English and dark/light review.
- Homepage link audit.

**Risk:** Medium-high.

**Checkpoint:** `checkpoint/phase-5b-homepage-art-direction-v1`

---

### Phase 5C — Interaction and Motion System

**Goal:** Add reusable pointer and scroll interactions without scattering custom logic.

**Likely files:**

- Shared reactive-surface components.
- `PortalCard.tsx`
- `PortalGrid.tsx`
- `EcosystemMap.tsx`
- `HeroSection.tsx`
- `FinalCTA.tsx`
- Motion preset utilities.

**Scope:**

- Spotlight.
- Controlled 3D tilt.
- Magnetic CTA.
- Portal border energy.
- One-time section reveals.
- Reduced-motion and touch fallbacks.

**Validation:**

- Pointer-fine and touch testing.
- Reduced-motion testing.
- Performance profiling.
- Keyboard/focus parity.

**Risk:** Medium-high.

**Checkpoint:** `checkpoint/phase-5c-interaction-system-v1`

---

### Phase 5D — Cinematic Intro and Guided Discovery

**Goal:** Add the short brand intro and convert the current automatic tour into optional discovery.

**Likely files:**

- New homepage intro component.
- `SmartPlatformTour.tsx`
- Homepage composition.
- Brand symbol asset or SVG component.

**Scope:**

- Session-scoped intro.
- Skip behavior.
- Motion-off bypass.
- Mobile fallback.
- Explicitly triggered platform tour.
- No blocking of server-rendered content.

**Validation:**

- First session.
- Repeat visit.
- Storage unavailable.
- Reduced motion.
- Keyboard dismissal.
- Mobile low-power behavior.
- SEO HTML inspection.

**Risk:** Medium.

**Checkpoint:** `checkpoint/phase-5d-cinematic-entry-v1`

---

### Phase 5E — Public Portal and State Polish

**Goal:** Standardize portal headers, cards, filters, loading, empty, error, and no-results states.

**Likely files:**

- Portal landing pages and layouts.
- `PortalIdentityIntro.tsx`
- `PortalPageWrapper.tsx`
- Card components.
- Locale state files.
- `automation-glossary/*`

**Scope:**

- Shared portal hero.
- Shared content states.
- Glossary pilot polish.
- Responsive card behavior.
- Localized route states.
- Consistent search/filter UI.

**Validation:**

- Public route matrix.
- Published-only verification.
- RTL/LTR review.
- Slow-network loading review.

**Risk:** Medium.

**Checkpoint:** `checkpoint/phase-5e-public-portal-polish-v1`

---

### Phase 5F — Admin UX Declutter and Inline Admin Polish

**Goal:** Professionalize the existing admin shell without expanding CMS authority.

**Likely files:**

- `AdminDashboardClient.tsx`
- `AdminSidebar.tsx`
- `admin-navigation.ts`
- `GenericCmsTypePanel.tsx`
- `DraftContentReviewPanel.tsx`
- Approved pilot-specific admin components.

**Scope:**

- Responsive shell.
- CMS sub-navigation.
- Shared status language.
- Publishing queue.
- Quick actions.
- Safer confirmation patterns.
- Correct glossary admin destination.
- No new table allowlisting.

**Validation:**

- Anonymous/student/admin access matrix.
- Mobile admin navigation.
- Pilot publish/archive protections.
- No permission regression.

**Risk:** High.

**Checkpoint:** `checkpoint/phase-5f-admin-ux-polish-v1`

---

### Phase 5G — Brand Assets, Metadata, and Launch Candidate Closure

**Goal:** Produce and validate the release candidate.

**Likely files:**

- `src/app/layout.tsx`
- `src/app/[locale]/layout.tsx`
- `src/app/og/route.tsx`
- `src/app/favicon.ico`
- Manifest and icon assets.
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- Launch reports.

**Scope:**

- Prepare “NexaLearn by Darhous” visual assets without an unapproved full rename.
- Consolidate OG behavior.
- Update favicon and manifest assets when brand approval exists.
- Font optimization.
- Complete QA matrix.
- Production deployment validation.
- Release documentation.

**Validation:**

- Full launch gate.
- Production URL smoke test.
- Social share preview validation.
- Lighthouse.
- Security and data-leakage review.

**Risk:** High.

**Checkpoint:** `checkpoint/phase-5g-launch-candidate-v1`

---

## 11. Safety Rules for Future Implementation

The implementer must:

1. Read `ANTIGRAVITY_RULES.md`.
2. Read `ANTIGRAVITY_PROJECT_LOG.md`.
3. Inspect relevant previous reports before editing.
4. Inspect `git status --short` before and after work.
5. Treat the root log as append-only.
6. Append the full prompt and final Arabic report to `ANTIGRAVITY_PROJECT_LOG.md`.
7. Stage explicit files only.
8. Never run `git add .`.
9. Never run `git add src`.
10. Never run `git add docs`.
11. Never stage broad directories.
12. Never use `git commit --amend`.
13. Never use `git tag -f`.
14. Never use force push.
15. Never use `git push --tags`.
16. Push only the explicitly approved checkpoint tag.
17. Do not install packages without explicit approval.
18. Do not modify package files without explicit approval.
19. Do not run SQL, migrations, imports, seeds, or database writes without explicit approval.
20. Do not publish content without explicit approval.
21. Do not expose draft or archived records publicly.
22. Do not render admin controls for anonymous or student users.
23. Do not cache administrator-specific public output.
24. Do not touch `tools_hub`.
25. Do not expand `nano_banana`.
26. Do not touch protected local untracked files.
27. Do not stage or commit `.claude/`, `.codex/`, `UX PROMAX.MD`, backups, audit scripts, or other protected files.
28. Preserve existing server-side admin authorization.
29. Preserve the `status = "published"` public-read rule.
30. Stop after each approved sub-phase.

---

## 12. Risks / Tradeoffs

### Excessive motion

The project already has many continuous effects. Adding more without consolidation could reduce perceived quality rather than improve it.

**Mitigation:** One major narrative effect per viewport and a shared motion budget.

### Annoying intro

A cinematic intro plus the existing automatic platform tour would be intrusive.

**Mitigation:** Session-only intro, immediate skip, and explicit tour activation.

### Hydration and bundle growth

The homepage currently has a broad client boundary. Additional pointer logic could increase hydration and JavaScript cost.

**Mitigation:** Server-first composition and isolated dynamic client islands.

### Static caching with administrator state

The glossary correctly becomes dynamic through server-side admin verification. Refactoring could accidentally weaken that protection.

**Mitigation:** Keep authorization server-side and never pass administrator controls through shared static output.

### Mobile performance

Blurred fixed backgrounds, backdrop filters, pointer effects, and large motion trees can perform poorly.

**Mitigation:** Static mobile fallbacks, fewer blurred layers, no tilt or parallax on touch devices.

### Accessibility

Parallax, moving spotlights, dialogs, and cinematic overlays can affect users with vestibular, keyboard, or screen-reader needs.

**Mitigation:** Complete reduced-motion experience, semantic controls, focus management, and no hidden essential content.

### Brand rename timing

Changing metadata, URLs, content, assets, and product copy simultaneously could create inconsistent public identity.

**Mitigation:** First create brand-ready tokens and assets. Activate the formal rename only through a separately approved brand migration.

### Admin scope expansion

Visual admin work can accidentally turn into broad CRUD or publishing expansion.

**Mitigation:** Limit Phase 5F to navigation, status clarity, confirmation UX, and the existing pilot.

### Destructive CMS controls

The generic CMS currently exposes permanent deletion.

**Mitigation:** Do not improve or expand destructive actions during visual work. Prefer archive and schedule deletion policy for a separately approved security phase.

### Too many files at once

Homepage, portal, admin, metadata, and branding changes in one commit would be difficult to review and roll back.

**Mitigation:** Use the separate checkpoints defined above.

---

## 13. Final Recommendation

The strongest first implementation step is **Phase 5A: UI/UX Foundation and Brand-Ready Design System**, followed immediately by the static homepage composition in Phase 5B.

Do not start with the cinematic intro.

The current codebase already has enough isolated animation. Its main limitation is the absence of a disciplined visual hierarchy and reusable interaction architecture. Building the intro first would place another effect on top of duplicated cards, emoji identity, inconsistent states, and a large client-rendered homepage.

The first implementation checkpoint should deliver:

- Semantic design and motion tokens.
- A shared portal icon and color model.
- Shared card, button, status, loading, empty, and error components.
- RTL-safe spacing rules.
- A server-first homepage shell.
- A static, fully responsive premium hero prototype with no pointer effects yet.
- Arabic, English, dark, light, mobile, and desktop validation.

Once that foundation is visually approved and measured, the interaction system and cinematic intro can be added without creating another disconnected layer.
