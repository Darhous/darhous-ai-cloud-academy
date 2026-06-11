# Five-Source Redesign Strategy — NexaLearn Homepage
**Date:** 2026-06-11
**Scope:** Component sourcing governance for the total homepage redesign
**Context:** This document governs which UI library handles which part of the new homepage, and how the five sources interact without creating chaos.

---

## The Five Sources

| Source | Nature | Installed |
|---|---|---|
| UI/UX Pro Max Skill | Governance layer — quality, decisions, rejection authority | Internal skill |
| HeroUI (`@heroui/react`) | App-grade controls, data-display components | Yes — `^3.1.0` |
| shadcn/ui | Local primitive components (copied into the codebase) | Yes — `shadcn ^4.11.0` |
| Magic UI | Marketing-focused motion components | Not installed — import pattern TBD |
| Aceternity UI | Cinematic storytelling components | Not installed — import pattern TBD |

---

## Source 1: UI/UX Pro Max Skill

### A. Recommended Usage on Homepage

This is not a component library. It is the decision-making layer that governs every component choice, visual token, and animation decision across all other sources. Before any component from any source lands in the codebase, UI/UX Pro Max principles answer: Does this serve communication, or does it serve decoration?

Use it to:
- Define the homepage's creative direction and section structure before writing a single line of code
- Approve or reject proposed components from the other four sources
- Set the motion budget for the entire page (maximum simultaneous animations, maximum GPU layers)
- Review color contrast ratios, touch target sizes, and RTL behavior for every imported component
- Define the one-per-section rule: each section gets one primary visual device, not three

### B. Prohibited Usage on Homepage

- Do not use UI/UX Pro Max to generate component code directly. It governs; the other sources build.
- Do not use it to justify adding effects. Its role is to reduce effects, not approve them.
- Do not invoke it after a component is already built to retroactively approve it. Approval happens before implementation.

### C. Homepage Sections It Supports

All sections — it has no domain. It is the constitutional layer above all sections.

### D. Good Use Example

Before building the new HeroSection: invoke UI/UX Pro Max to define the exact visual hierarchy — headline size, CTA button count (one primary, one secondary — no more), acceptable motion (one scroll-triggered fade-up, no ambient orbs), and RTL behavior specification. Implementation proceeds from this specification.

### E. Bad Use Example

Building an EcosystemMap section with tilt effects, radar pulses, spotlight gradients, and 7 independently animated cards, then asking UI/UX Pro Max if it "looks good." This is using design governance as validation after the fact, which defeats its purpose.

---

## Source 2: HeroUI (`@heroui/react`)

### A. Recommended Usage on Homepage

HeroUI provides production-grade interactive controls — form elements, tabs, modals, chips, buttons, progress bars, avatars. These are the components that require strong accessibility (ARIA), reliable keyboard behavior, and HeroUI's internal theming system.

On the homepage, use HeroUI for:
- The PathSelector's filter buttons (use `Chip` or `Button` with variant="bordered" and the portal's CSS variable color as the active state)
- The SmartPlatformTour step indicator dots (use HeroUI's `Pagination` or replicate with `Chip` variants)
- Any form input elements if an email capture or signup inline form is added to the homepage
- Status badges on portal cards in EcosystemMap (HeroUI's `Chip` with color variants maps cleanly to the "Live / Beta / Soon" pattern)

### B. Prohibited Usage on Homepage

- Do not use HeroUI for decorative layout elements (cards, section backgrounds, ambient effects)
- Do not use HeroUI's `Card` component for portal cards in EcosystemMap or ScrollStackSection — its internal padding and shadow system conflicts with the custom glass panel system
- Do not mix HeroUI's color theming (NextUI/HeroUI `primary`, `secondary` color tokens) with the project's own CSS variable color tokens. HeroUI expects its own color scale; the project uses its own. Pick one authoring path and stick to it within each component.
- Do not use HeroUI for navigation or layout (Navbar, Sidebar) on the homepage — these are portal-internal patterns

### C. Homepage Sections It Supports

| Section | HeroUI Component | Role |
|---|---|---|
| PathSelector | `Button` with custom styling / `Chip` | Filter buttons for level/goal/time/interest selectors |
| EcosystemMap | `Chip` | Status badges (Live/Beta/Soon) |
| SmartPlatformTour | `Progress` or custom | Step progress indicator |
| FinalCTA | `Button` | Primary registration CTA (if replacing custom `glow-button-primary`) |

### D. Good Use Example

Replacing the PathSelector's custom `<button>` elements with HeroUI `<Button variant="bordered" size="md">` components, then using CSS variables to override the active-state color for each question. This gives correct ARIA roles (`role="radio"` grouping), keyboard navigation, and focus management without any custom code.

### E. Bad Use Example

Using HeroUI's `<Card>` component for the ScrollStackSection portal cards, then fighting HeroUI's internal `shadow`, `background`, and `border-radius` tokens to make them match the cinematic glass aesthetic. HeroUI cards are designed for app interfaces, not cinematic storytelling surfaces.

---

## Source 3: shadcn/ui

### A. Recommended Usage on Homepage

shadcn/ui components are copied directly into the codebase (they live in `src/components/ui/`). They are raw primitives — unstyled or lightly styled, built on Radix UI, fully accessible, and easily customized with Tailwind classes.

On the homepage, use shadcn/ui for:
- Dialog / Sheet primitives if the SmartPlatformTour is rebuilt using a proper accessible modal pattern
- Tooltip primitives for section navigation labels in ScrollIndicator
- Popover if any portal card adds a quick-peek content preview
- Separator component for section dividers
- Badge component for eyebrow labels (replacing the current inline `<div>` with custom border/background styles)

### B. Prohibited Usage on Homepage

- Do not use shadcn/ui for animated marketing components. shadcn primitives are interaction patterns, not visual storytelling tools.
- Do not use shadcn's `Card` for portal cards (same reason as HeroUI — the default styling fights the cinematic system).
- Do not import shadcn components that duplicate HeroUI components. If HeroUI's `Button` is already chosen for a section, do not also import shadcn's `Button`. Pick one per use-case.
- Do not install shadcn components through the CLI (`npx shadcn add`) for homepage-only use without UI/UX Pro Max approval — the CLI modifies `globals.css` with new CSS variables that can conflict with the existing token system.

### C. Homepage Sections It Supports

| Section | shadcn Component | Role |
|---|---|---|
| SmartPlatformTour | `Dialog` (Radix) | Accessible modal primitive instead of custom fixed-position div |
| ScrollIndicator | `Tooltip` | Section label tooltips on dot navigation |
| All section headers | `Badge` | Eyebrow label pills (replacing inline div elements) |
| FinalCTA | `Separator` | Visual divider if needed within the card |

### D. Good Use Example

Replacing the SmartPlatformTour's `<motion.div className="fixed inset-0 z-[9998]">` with a shadcn `Dialog` built on Radix UI primitives. This gives: correct focus trapping, Escape key handling, `aria-modal="true"` with proper screen reader announcement, and `scroll-lock` — all behaviors currently implemented manually in the component with varying completeness.

### E. Bad Use Example

Using shadcn's `Card` as the wrapper for the FinalCTA section and then adding `glass-panel-promax` classes and inline gradient backgrounds on top of it. The Radix-based Card has no semantic value here — it's just a `<div>` with padding. Use a plain `<section>` with the glassmorphism class directly.

---

## Source 4: Magic UI

### A. Recommended Usage on Homepage

Magic UI specializes in marketing-grade animated components: text reveals, number counters, beam effects, sparkles, shimmer effects, background patterns, animated gradients. It is appropriate for homepage sections that need to communicate excitement and energy with restrained, purposeful motion.

On the homepage, use Magic UI for:
- **Animated number counter** for Stats section (replace the static numbers with Magic UI's `NumberTicker` — an entrance animation that counts up from zero to the stat value)
- **Shimmer text** on a single headline (not every h2 — pick one, the FinalCTA or hero tagline)
- **Animated grid pattern** as a subtle background texture for the hero section (replaces the current `bg-grid-overlay` CSS approach with a more controlled, motion-aware version)
- **Word pull-up** or **blur-in** text animation as an alternative reveal to the current stagger fadeUp pattern — used in maximum one section

### B. Prohibited Usage on Homepage

- Do not use Magic UI's beam/sparkle effects, particle animations, or "shooting star" components. These are attention-maximizing effects that contradict the premium cinematic brand.
- Do not use Magic UI's `AnimatedBackground` or gradient blob components — the project already has an ambient orb system. Two blob systems on the same page is unacceptable.
- Do not apply Magic UI's animated text effects to more than one headline per page. Animated text everywhere is a typography crime.
- Do not use Magic UI components inside scroll-driven sections (ScrollStackSection, HowItWorks timeline). The scroll narrative must not compete with entrance animations.
- Magic UI components must pass the RTL audit before use. Most Magic UI animations assume LTR text direction.

### C. Homepage Sections It Supports

| Section | Magic UI Component | Usage |
|---|---|---|
| Stats | `NumberTicker` | Count-up animation for key metrics |
| Hero | `AnimatedGridPattern` | Subtle background texture (static or very slow) |
| FinalCTA | `ShimmerButton` | Replace custom `glow-button-primary` with a more polished shimmer CTA |
| Any one section | `BlurFade` / `WordPullUp` | Section heading entrance (one instance maximum) |

### D. Good Use Example

Adding Magic UI's `NumberTicker` to the Stats section: when the section enters the viewport, the learner count animates from 0 to 2,400 over 1.2 seconds with an ease-out curve. This is meaningful motion — it communicates real growth with a satisfying reveal. It adds no visual noise when the section is not in view.

### E. Bad Use Example

Using Magic UI's `Particles` background component in the HeroSection, displaying hundreds of floating animated dots behind the headline. This creates maximum motion in the viewport's primary focal area, competes with the RotatingWord animation, and performs poorly on mobile. The "sparkle" aesthetic also contradicts the serious AI-platform brand identity.

---

## Source 5: Aceternity UI

### A. Recommended Usage on Homepage

Aceternity UI is built for cinematic storytelling — components like the `Spotlight`, `Tracing Beam`, `Lamp Effect`, `Background Beams`, `Card Hover Effect`, and scroll-driven section reveals. It is the source for the homepage's signature visual moments — the effects that a user screenshots and shares.

On the homepage, use Aceternity UI for:
- **Spotlight** in the HeroSection: a single mouse-following spotlight that illuminates the hero content against the dark background. Replaces the current two-orb ambient system with one interactive light source.
- **Tracing Beam** for HowItWorks: replace the custom `scaleY` timeline line with Aceternity's `TracingBeam`, which draws the vertical line as the user scrolls through steps. This eliminates the HowItWorks custom `LineColumn` component.
- **Wavy Background** or **Background Lines** as a hero background texture (evaluate against Magic UI's AnimatedGridPattern; use only one).
- **3D Card Flip or Hover Effect** for one featured portal in a redesigned showcase (not applied to all 6 portal cards — Aceternity's card hover is a signature effect, not a grid pattern).

### B. Prohibited Usage on Homepage

- Do not use Aceternity's `Background Beams with Collision` — it is CPU-intensive JavaScript canvas animation and renders poorly at 60fps on mobile.
- Do not apply Aceternity's `Infinite Moving Cards` or `Focus Cards` to replace the ScrollStackSection. The scroll-stack is already the page's signature cinematic interaction and is custom-built. Aceternity's card variants are visually lighter.
- Do not use Aceternity effects as decoration for sections that are already complete. Aceternity components are expensive — each one is a visual statement. Every Aceternity component on the page must earn its place.
- Do not use more than 3 Aceternity components across the entire homepage.
- All Aceternity components use Framer Motion internally. With `MotionConfig reducedMotion="user"` fixed, this will be correctly respected.

### C. Homepage Sections It Supports

| Section | Aceternity Component | Role |
|---|---|---|
| HeroSection | `Spotlight` | Replaces ambient orbs with interactive light |
| HowItWorks | `TracingBeam` | Scroll-driven timeline draw (replaces custom LineColumn) |
| FinalCTA or ScrollStack | `Lamp Effect` or `Background Beams` | One cinematic background element (choose one) |

### D. Good Use Example

Replacing HeroSection's two breathing orb animations with Aceternity's `Spotlight` component: a single soft spotlight that follows the mouse cursor, illuminating the headline text against the `#0c0e12` background. The spotlight has no permanent animation — it only moves in response to user interaction. This gives the hero a premium, interactive quality without constant background motion. When the user is not moving the mouse, the hero is completely still — the only motion is `RotatingWord`. This is a massive improvement over the current state.

### E. Bad Use Example

Using Aceternity's `Background Beams with Collision` behind the EcosystemMap portal grid. The component renders beams of light that bounce off elements via canvas. Applied to a grid of 7 cards, the beams would create visual chaos that obscures the portal labels, text, and status chips. The EcosystemMap's job is to communicate 7 product categories clearly — background beams work against legibility.

---

## How to Avoid Mixing HeroUI and shadcn Incorrectly

HeroUI (`@heroui/react`) and shadcn/ui both provide buttons, inputs, dialogs, and badges. Using both for the same component type creates:
1. Inconsistent focus ring styles (HeroUI uses its own ring; shadcn uses `ring` CSS variable)
2. Conflicting `className` merge behavior (HeroUI uses `tailwind-variants`; shadcn uses `class-variance-authority`)
3. Duplicate import weight
4. Design inconsistency — two buttons with different internal padding, font, and border-radius

**Rule: Pick one source per component type, homepage-wide.**

| Component Type | Owner |
|---|---|
| Buttons / CTAs | HeroUI — better ARIA and state management |
| Modal / Dialog | shadcn — Radix primitive, better focus trap |
| Badges / Chips (filter) | HeroUI — built-in color variant system |
| Badges (eyebrow labels) | shadcn — simpler, easier to style |
| Form inputs | HeroUI — if any form appears on homepage |
| Tooltips | shadcn — lighter import |
| Separators | shadcn — minimal |

Do not apply HeroUI's theming tokens (`--heroui-*`) to the same element that uses shadcn's theming tokens (`--radius`, `--primary`). Keep the two systems at different component boundaries.

---

## How to Avoid Magic UI and Aceternity Overuse

Both Magic UI and Aceternity exist to create visual delight. Their failure mode is identical: when used in every section, the page becomes a fireworks show where nothing is special.

**Hard limits:**
- Maximum 2 Magic UI components on the homepage (not counting `NumberTicker`, which is low-risk)
- Maximum 3 Aceternity UI components on the homepage
- No Magic UI and Aceternity components within 400px of each other in the document flow
- Magic UI handles background textures and counter animations; Aceternity handles foreground interactive light and narrative motion. These domains must not overlap.
- Neither source should be used in sections that already have a strong layout story (ScrollStackSection, HowItWorks). These sections are their own visual feature.

**Review gate:** Before adding any Magic UI or Aceternity component, answer: "If this component were removed, would the section still communicate its core message?" If yes, the component is decoration and must earn its place through a higher creative bar. If the answer is "the section would feel dead without it," then the section's base design is too weak and the component is masking a structural problem.

---

## How UI/UX Pro Max Approves or Rejects Imported Components

Every component from any of the four libraries must pass a five-point review before being used on the homepage:

**1. Communication test:** Does this component communicate something the user needs to know, or does it perform for its own sake?

**2. Performance test:** Does this component introduce more than 1 new compositor layer, more than 1 new `backdrop-filter`, or more than 2 new CSS `animation` or `transition` properties to the viewport simultaneously?

**3. RTL test:** Does this component behave correctly in `dir="rtl"` without additional overrides? If it requires manual RTL fixes, document them before implementation.

**4. Reduced-motion test:** Does this component's motion fully stop or reduce to a static version when `prefers-reduced-motion: reduce` is active? Verify via both CSS media query and `MotionConfig reducedMotion="user"`.

**5. Uniqueness test:** Is this the only component of this type in the visible viewport at any given scroll position? If there are already 2 animated components in the same 100vh of content, this one is rejected until one of the others is removed.

**Rejection criteria:** Failing any two of the five tests results in automatic rejection. Failing the reduced-motion test alone results in rejection, regardless of other scores.

---

## Final Component Ownership Policy

One-line rule per source:

| Source | Rule |
|---|---|
| UI/UX Pro Max | Approves or rejects every other source's contributions before implementation. |
| HeroUI | Owns all interactive controls (buttons, chips, inputs, progress) that require ARIA and keyboard behavior. |
| shadcn/ui | Owns all accessible primitive wrappers (dialog, tooltip, separator) and eyebrow badge elements. |
| Magic UI | Owns background textures, number counters, and a maximum of one headline text effect per page. |
| Aceternity UI | Owns the page's two or three signature cinematic moments — interactive light, scroll-drawn narrative lines, and one hero depth effect. |

---

## Red Lines Table

| Effect / Component | Allowed? | Reason |
|---|---|---|
| TechMarquee (20-row) | No | 320 animated DOM nodes, zero legibility, GPU bomb |
| Ambient orb with CSS animation | No | Constant viewport-width motion competes with everything |
| MotionConfig reducedMotion="never" | No | Violates WCAG 2.3.3, makes all reducedMotion checks dead code |
| More than 3 Aceternity components | No | Exceeds cinematic budget; page becomes a theme park |
| More than 2 Magic UI decorative effects | No | Crosses into visual noise territory |
| HeroUI Card for portal cards | No | HeroUI Card's internal tokens conflict with glass panel system |
| shadcn Button + HeroUI Button in same section | No | Creates inconsistent focus, style, and API patterns |
| Multiple `backdrop-filter: blur()` elements in same viewport | No | Safari compositing performance cliff |
| Radar pulse rings (multiple infinite loops in one section) | No | Looping rings in dense card grids create visual anxiety |
| `background-beams-with-collision` on portal grids | No | Canvas animation obscures text and labels |
| Ambient orb (static, no animation) | Yes | Provides depth without continuous motion cost |
| ScrollStackSection scroll-driven scale | Yes | Purposeful narrative, scroll is the animation engine |
| Aceternity Spotlight in hero | Yes | Interactive, not continuous; only moves with user |
| Aceternity TracingBeam for HowItWorks | Yes | Scroll-driven, one-shot, directly serves narrative |
| Magic UI NumberTicker in Stats | Yes | Entrance-only, communicates real data, no continuous loop |
| RotatingWord flip animation | Yes | Brand-defining, single element, fixed RTL-aware, fast |
| MarqueeStrip (1 single-row strip) | Yes | Acceptable separator; reduce-motion fallback exists |
| HeroUI Chip for portal status badges | Yes | ARIA-correct, color-adaptable, lightweight |
| shadcn Dialog for SmartPlatformTour | Yes | Correct accessibility primitive for modal content |
| InteractiveSurface tilt (max 3 cards per section) | Yes | Interactive, mouse-only, reduce-motion safe |
| CTA ripple ring (one instance, FinalCTA only) | Yes | Single focus-drawing effect on primary action |
| Staggered fadeUp on scroll-reveal | Yes | Universal, tasteful, non-distracting |
| Typewriter in MentorShowcase | Yes | Storytelling, reduce-motion aware, section-specific |
| Parallax heading opacity (useTransform) | Yes | Subtle scroll parallax, no layout shift |
| Icon nudge (translateX 3px on hover) | Yes | Micro-interaction, hover-only, RTL-aware |
| `shimmer-sweep` on hover for CTAs | Yes | On-hover only, communicates interactivity |
| TechMarquee replaced by single pill strip | Yes | Reduces to 1 marquee row, legible, lighter GPU load |
| HowItWorks dot outer-ring infinite loop | No | Four concurrent infinite-loop animations in one section |
| Magic UI particles / sparkle background | No | Contradicts premium AI-platform brand identity |
| Using two different button systems in same section | No | Inconsistent ARIA, focus, and visual behavior |
| Installing shadcn via CLI without token audit | No | CLI may overwrite CSS variable tokens in globals.css |
