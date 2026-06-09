# AhmedAli-Inspired Motion and Visual System

This strategy uses the referenced site's principles as inspiration only. Branding, layout, content, and motion choreography must remain NexaLearn/Darhous-specific.

## Creative Direction

**“Editorial learning atlas”**: calm pages, bold bilingual type, neutral surfaces, portal-color signals, and selective motion that reveals the relationship between learning, building, testing, and career outcomes.

## Motion Layers

### 1. Kinetic Hero Phrase

- One sentence with one changing word: Learn / Build / Test / Advance.
- Arabic and English timings tuned separately.
- Use opacity/vertical transform, not character-by-character chaos.
- Static final phrase under reduced motion.

### 2. Stacked Portal Cards

- Homepage-only storytelling section.
- Four grouped cards stack slightly while scrolling.
- Each card represents a user intent, not every portal.
- Clicking opens the relevant grouped portal selection.
- No scroll hijacking.

### 3. Moving Word Rail

- Slow, user-pausable strip of outcomes or disciplines.
- CSS transform-based.
- Pauses on hover/focus.
- Disabled under reduced motion.
- Avoid duplicating the current marquee across many pages.

### 4. Layered Background Depth

- Optional dual lightweight canvas or CSS layer on homepage/major launch pages only.
- Layer A: low-frequency gradient/noise.
- Layer B: sparse pointer-responsive particles or lines.
- No continuous full-resolution canvas on mobile.
- Use a static gradient/noise image fallback.

### 5. Floating Context Pills

- Desktop only.
- Appear near selected storytelling regions: “Explore portal,” “See curriculum,” “Ask mentor.”
- Must not replace conventional CTAs.
- Hide below 1024px and for reduced motion.

### 6. Stat Counters

- Keep the existing `PortalIdentityIntro` count concept.
- Run once on intersection.
- Pair every number with a stable label.
- Do not animate operational/financial/security metrics where motion delays comprehension.

### 7. Scroll Reveals

- 1-2 reveal patterns globally.
- 300-600ms, ease-out, opacity + translate.
- No reveal for essential above-fold content.

## Page Allocation

| Surface | Allowed motion |
|---|---|
| Homepage | full narrative layer |
| Portal landing | hero reveal, stats, one stacked section |
| Blog/content | subtle title/image and related-card reveal |
| Dashboard | micro-interactions and state transitions only |
| Admin | minimal transitions, no decorative scroll effects |
| Forms/auth | focus/error/success transitions only |
| Exams | progress and answer feedback only |

## GSAP Strategy

Use GSAP/ScrollTrigger only for:

- homepage stacked-card choreography;
- one kinetic editorial section;
- optional synchronized word/background sequence.

Do not use GSAP for:

- ordinary dropdowns;
- admin navigation;
- forms;
- exams;
- card hover;
- basic page entry.

Load it dynamically only on pages that need it. Kill triggers on unmount. Use transform/opacity. Measure main-thread cost.

## Visual System

- Light editorial surfaces as default marketing direction.
- Near-black typography.
- Strong single CTA color.
- Mint interaction highlights.
- Portal-aware hairlines, labels, and selected states.
- Minimal glass for floating controls only.
- Photography/screenshots/diagrams should feel authored, not generic generated imagery.

## Reduced Motion

- Replace pinning/stacking with normal vertical flow.
- Show final word rather than cycling words.
- Disable pointer parallax and canvas movement.
- Counters render final value immediately.
- Preserve all content and actions.

## Acceptance Criteria

- No scroll lock or hijacking.
- 60fps target on mainstream desktop.
- No persistent animation in operational pages.
- LCP media does not wait for motion code.
- Motion-off experience is complete.
- RTL choreography reads in the correct inline direction.
- Keyboard users can reach every CTA without passing through decorative elements.
