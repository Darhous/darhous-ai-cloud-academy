# Visual & Motion Audit — NexaLearn Homepage
**Date:** 2026-06-11
**Auditor:** UI/UX Pro Max Principles
**Scope:** Full homepage visual identity, animation system, effects inventory

---

## 1. Current Visual Identity

### Color System

The design uses a two-layer CSS variable system: a custom token layer (`--color-*`) and a shadcn-compatible semantic layer (`--background`, `--primary`, etc.). Both layers duplicate the same values, creating unnecessary redundancy.

**Dark mode (default) palette:**
- Background: `#0c0e12` — very dark near-black blue
- Surface: `#111318` — slightly lighter
- Primary: `#8ed5ff` — sky blue (used as the dominant accent)
- Secondary: `#d0bcff` — soft violet/lilac
- Tertiary: `#3ce0fb` — cyan-teal
- Text (on-surface): `#e2e2e8` — warm white-gray
- Outline: `#8b90a0` / `#414755`

**Portal identity tokens:** Six portals each have a distinct color token (`--portal-color`) ranging from sky blue through violet, cyan, amber, green, and orange. This is a well-structured idea but is not yet connected to the homepage visually (the EcosystemMap and ScrollStackSection use inline `portal.color` values from a config object rather than the CSS data-attribute tokens).

**Light mode:** Exists and is structurally complete, but the homepage appears to be primarily designed and tested in dark mode. Light mode color shifts are included for all glass panels and orbs.

**Identity assessment:** The color system is internally coherent in structure but has a significant redundancy problem — every semantic value is declared twice (once as `--color-*`, once as shadcn's `--primary`/`--background`/etc.). This is a maintenance hazard and the source of theme inconsistency if they drift.

### Typography

Three font families are loaded via Google Fonts:

| Role | Font | Weight Range |
|---|---|---|
| Display (EN) | Geist | 300–800 |
| Display (AR) | Cairo | 400–700 |
| Body (EN) | IBM Plex Sans | 300–700 |
| Body (AR) | IBM Plex Sans Arabic | 300–700 |
| Mono | JetBrains Mono | 400–600 |

All five fonts are loaded on every page load. The font system is structurally correct — RTL gets `IBM Plex Sans Arabic` as body and `Cairo` as display. However:
- `Geist` is listed in the `@theme` block as `--font-heading` but is set via CSS variable `--font-display-en`. These two tokens have different names for the same intent.
- `font-mono` classes appear 40+ times in the codebase, mostly for badges, labels, and code hints. JetBrains Mono adds visual character but the 400–600 range being loaded is adequate.
- The headline hierarchy (`h1`, `h2` use display fonts; body uses IBM Plex Sans) is correctly structured.

### Design Language

The design language is **dark cinematic premium with glassmorphism accents**. The intended aesthetic is: a serious AI-powered platform seen through the lens of a command center or OS interface. Secondary attributes: futuristic, Arabic-first, accessible.

This is internally consistent in intent but inconsistently executed. The command-center OS mockup in HeroSection is the strongest expression of this language. The WhyDarhous 8-card grid and FinalCTA are visually weaker — they look like a standard SaaS landing page rather than a cinematic experience.

### Cohesion Assessment

**Cohesive:** Color tokens, motion tokens, glass panel variants, portal color system, RTL font switching.

**Inconsistent:**
- Glass panel variants proliferate: `glass-panel`, `glass-card`, `glass-panel-promax` — three variants with overlapping use cases, no clear rules for when to use which.
- `glow-button-primary` and `premium-glow-button` are used in the same section (PathSelector result area) — two button styles for functionally equivalent CTAs.
- Section headers all use the same structure (eyebrow badge + h2 in `text-gradient-premium` + subtitle) with zero variation across 7 sections. This repetition drains impact from each section.

---

## 2. Visual Overload Assessment

### Distinct Visual Effects Inventory

1. Ambient orbs (radial-gradient blobs with blur 80px–140px)
2. Glass panels (`glass-panel-promax` with backdrop-filter blur 24px)
3. Gradient text (`text-gradient-premium`, `gradient-text`)
4. Inline border gradients (portal color borders on cards)
5. Box shadows (multiple intensities: 30px, 80px, 100px)
6. Glow buttons (primary with box-shadow pulse, secondary with border glow)
7. CTA ripple ring animation
8. Orb breathe/drift animations (CSS keyframes)
9. Marquee animations (CSS keyframes, horizontal scroll)
10. Radar pulse rings (ecosystem map)
11. Bar shimmer animation (progress bars in OS mockup)
12. Node pulse animation (roadmap nodes)
13. Grid overlay (`.bg-grid-overlay`)
14. Gradient line borders (bottom of scroll-stack cards)
15. Watermark numbers (giant transparent portal numbers in scroll-stack cards)
16. 3D tilt + spotlight (InteractiveSurface component)
17. Typewriter animation (MentorShowcase)
18. Bounce animation (scroll hint chevron)
19. Rotating/flip word animation (RotatingWord)
20. Scroll-driven scale/overlay (scroll-stack sticky cards)
21. Staggered fade-up on scroll-into-view (all sections)
22. Scroll progress bar (top of viewport)
23. Section dot navigation (side rail)
24. Cinematic intro blur-out exit transition

**Total distinct effects: 24**

### Section-Level Assessment

| Section | Score | Reason |
|---|---|---|
| CinematicIntro | Clean | Single orb, single text reveal, progress bar. Restrained. |
| HeroSection | Overloaded | Two ambient orbs + breathe animation, OS mockup with bar shimmer, 6 progress bars animating in sequence, marquee TechMarquee (20 rows), staggered text reveals, rotating word, scroll hint bounce. |
| MarqueeStrip (x2) | Moderate | Two pill marquees stacked, each directional. Acceptable as a separator. |
| ScrollStackSection | Moderate | Scroll-driven sticky with scale/overlay. Effective concept, clean execution. |
| Premium3DShowcaseCarousel | Unknown — not deeply read, but uses 3D transform CSS and gradient backgrounds. Likely moderate. |
| PathSelector | Clean | Interactive form with state-driven glow buttons. No animation overload. |
| EcosystemMap | Overloaded | Per-card tilt+spotlight (7 instances), radar pulse rings, per-card portal color glows, large center radial glow (800x800px blur). |
| MentorShowcase | Moderate | Typewriter effect, slide-in messages, tilt+spotlight. Purposeful but competes with section above. |
| HowItWorks | Clean | Timeline with scroll-driven line fill, staggered dots. Elegant and purposeful. |
| WhyDarhous | Moderate | 8 cards with stagger, scroll-driven heading opacity. Acceptable. |
| FinalCTA | Overloaded | Two giant orbs (800px and 600px), CTA ripple ring, MagneticButton, shimmer sweep on link, glass panel with gradient background, box-shadow 80px. |

**Most overloaded:** HeroSection, EcosystemMap, FinalCTA.

---

## 3. Motion / Animation Audit

### Framer Motion Usage

| Animation | Location | Type | Verdict |
|---|---|---|---|
| `fadeUp` variants (opacity + y) | All sections | Scroll-reveal | Essential — standard and tasteful |
| `stagger` container variants | WhyDarhous, PathSelector | Scroll-reveal | Essential — adds rhythm |
| Slide variants (AnimatePresence + x) | SmartPlatformTour step transitions | UX interaction | Essential |
| Blur + opacity exit | CinematicIntro exit | Cinematic | Essential — signature moment |
| Scale + opacity scale-in | SmartPlatformTour modal | UX interaction | Essential |
| `scaleX` progress bars | HeroSection OS mockup | Data visualization | Decorative — acceptable |
| `scaleX` accent lines | HowItWorks | Visual polish | Decorative — acceptable |
| `scaleY` timeline line fill | HowItWorks | Narrative | Essential — tells the story |
| Pulse ring (scale + opacity loop) | HowItWorks dots | Ambient | Excessive — 4 dots each looping |
| User/mentor message slide-in | MentorShowcase | Storytelling | Essential |
| Heading opacity via `useTransform` | WhyDarhous | Scroll parallax | Decorative — subtle, keep |
| `scale` + `overlayAlpha` scroll-driven | ScrollStackSection | Cinematic | Essential — this is the hero interaction |
| Dot size/opacity animate | ScrollIndicator | Navigation feedback | Essential |
| Progress bar fill | CinematicIntro | Loading cue | Essential |
| `y: 24` + opacity modal | SmartPlatformTour | Modal entrance | Essential |

### CSS Keyframe Animations

| Keyframe | Usage | Verdict |
|---|---|---|
| `orb-breathe` | HeroSection orb 1 | Excessive — large area, constant motion |
| `orb-drift` | HeroSection orb 2 | Excessive — same orb system as above |
| `cta-ripple` | FinalCTA button | Decorative — borderline, draws eye to CTA |
| `bar-shimmer` | Progress bars | Decorative — acceptable |
| `radar-pulse` | EcosystemMap center | Excessive — two stacked rings looping |
| `node-pulse` | Roadmap (global CSS) | Not actively used on homepage |
| `marquee` / `marquee-rtl` | MarqueeStrip, TechMarquee | Decorative — functional separator |
| `float` / `pulse-glow` | Defined in globals, not used on homepage | Unused |
| `fade-in-up` | Defined in globals, Framer Motion handles actual reveals | Redundant |
| `shimmer-sweep` | FinalCTA register link, SmartPlatformTour CTA | Decorative — on-hover, acceptable |
| `bounce` | Scroll hint chevron | Decorative — cliched but universally understood |
| `pulse` (opacity) | Online indicator dots | Functional — signals live state |

### CinematicIntro Assessment

**Effectiveness: High.** The component does one thing — brand reveal with logo, tagline, and progress bar — then self-dismisses. The blur+opacity exit is the platform's strongest single animation moment. It sets a cinematic expectation the rest of the page fails to sustain. The `shouldReduce` path correctly shortens to 1.2 seconds. The keyboard skip (Escape/Enter/Space) and click-to-dismiss are excellent UX.

**Problem:** If `MotionConfig reducedMotion="never"` overrides the `useReducedMotion()` hook system-wide, the `shouldReduce` checks inside CinematicIntro become dead code. This is a critical bug.

### RotatingWord Assessment

**Effectiveness: High.** Simple, purposeful, brand-defining. The sliding flip between "Learn / Build / Grow / Lead" or Arabic equivalents is the most efficient way to communicate platform breadth. Duration 0.32s with `[0.16, 1, 0.3, 1]` ease is crisp. The per-word color cycling (blue, violet, cyan, amber) directly communicates the portal system.

**Problem:** No `useReducedMotion` check inside `RotatingWord`. The word continues cycling with full animation even when reduce-motion is preferred (further compounded by `MotionConfig reducedMotion="never"`).

### TechMarquee Assessment

**Verdict: Excessive.** This is the most significant animation problem on the homepage.

- 20 individual items, each rendered as its own CSS-animated row
- Each row has a different `animationDuration` (13s to 30s)
- Each row independently occupies full viewport width
- Total animated DOM nodes: 20 rows × 8 repeats × 2 sets = 320 span elements scrolling simultaneously
- Each row uses `willChange: "transform"` — promoting 20 layers to the GPU compositor

The visual result is an overwhelming wall of colored Arabic text scrolling in alternating directions. It provides no hierarchy, no signal, no resting point for the eye. A user cannot read any single item. It functions as visual noise decorating the bottom of the hero, not as communication.

### MarqueeStrip (2 instances) Assessment

**Verdict: Acceptable, borderline.** Two horizontal pill marquees stacked between the hero and the portal cards. These are thinner, use fewer items, and their pill format is more legible. The `shouldReduceMotion` check correctly converts them to a static flex-wrap layout. The RTL direction toggle between the two strips is a nice detail. However, combined with TechMarquee appearing in the same viewport scroll area, the marquee density is too high.

### AnimatePresence and Staggered Cards Assessment

**AnimatePresence** is used correctly: only for CinematicIntro exit (appropriate), SmartPlatformTour modal (appropriate), and RotatingWord word swaps (appropriate). No erroneous use detected.

**Staggered cards** (WhyDarhous, PathSelector) use `staggerChildren: 0.07s`. This is correct — 70ms stagger for 8 cards means the last card appears 560ms after the first. Acceptable. Stagger is disabled when `shouldReduce`.

---

## 4. Glass / Gradients / Orbs / 3D / Marquee Usage

### Glass Panels

Three variants exist in globals.css:
- `glass-panel` — 65% opacity dark background, 12px blur, subtle border
- `glass-card` — 70% opacity, 20px blur, asymmetric border (brighter top)
- `glass-panel-promax` — 40% opacity, 24px blur, stronger shadow, inner glow

**Usage pattern is not consistent.** `glass-panel-promax` appears on: HeroSection command mockup, EcosystemMap portal cards, PathSelector form, MentorShowcase, FinalCTA. The original `glass-panel` and `glass-card` are defined in globals but their homepage usage was not found in the section files — they may be used in layout components not audited. This suggests `glass-panel-promax` has become the de facto glass style, making the other two variants dead code candidates.

### Ambient Orbs

**HeroSection:** Two orbs, 65vw and 55vw diameter, with `orb-breathe` and `orb-breathe-slow` animations. At 65vw width on a 1440px screen, the blue orb is 936px wide. These are enormous and constantly animated. They create a soft atmospheric glow but the continuous breathing motion across such a large area creates GPU pressure and subconscious unease.

**EcosystemMap:** One 800x800px radial-gradient with blur 80px at 20% opacity, centered. This is large but static (no animation), making it more acceptable.

**WhyDarhous:** One 600x600px radial-gradient with blur 60px at 15% opacity. Static. Acceptable.

**FinalCTA:** Two orbs — 800px and 600px — at 30% opacity. Both are very large and both are inside a rounded card with `overflow: hidden`, so they serve as card-level ambient lighting. Acceptable in isolation, but the pattern repeats too many times across the page.

**Assessment:** Orbs are used 5+ times. Each individual use is reasonable but the cumulative effect as the user scrolls is a page that never rests — there is always a blurred glow somewhere. Orbs should be reduced to 2 maximum per page: one in the hero, one in the final CTA.

### Marquee Ticker

As assessed above: MarqueeStrip (2 strips) is marginal. TechMarquee (20 rows) is excessive. The ticker concept adds value as a separator but the current implementation is a major visual and performance hazard.

### 3D Usage

3D perspective transforms are used in `InteractiveSurface`, applied to: 7 EcosystemMap portal cards and the MentorShowcase mockup. This is a mouseover-driven tilt effect (up to 2–6 degrees), checked against `useReducedMotion`. The implementation correctly skips the tilt for touch pointers and reduces to a flat lift (`translateY(-8px)`) fallback.

The concept is good. The problem is density: 7 tilt-enabled cards in one section means the GPU is managing 7 `perspective(1000px)` transforms simultaneously on hover, plus radar pulse rings. On mobile these are all disabled which is correct.

---

## 5. Effects to Remove

| Effect | Reason |
|---|---|
| TechMarquee (20-row full-height marquee) | 320 animated DOM nodes, pure visual noise, zero legibility, 20 GPU compositor layers. Highest-priority cut. |
| `orb-breathe` / `orb-breathe-slow` CSS animations on HeroSection orbs | Constant viewport-width animation creates compositor pressure and visual anxiety. Replace with static orbs. |
| Double-stacked radar pulse rings in EcosystemMap | Two looping rings per center card on a section that already has 7 tilt surfaces. Cut to zero or one. |
| HowItWorks dot outer-ring loop animation (`scale + opacity` on each dot, Infinity) | Four concurrent pulsing rings in a linear timeline. Cut; the dot and colored line are sufficient. |
| `node-pulse` and `float` / `pulse-glow` CSS keyframes | Defined globally but not used on the current homepage. Dead CSS. |
| `fade-in-up` CSS keyframe | Redundant — Framer Motion handles all reveal animations. |
| Second ambient orb in FinalCTA (600px) | Two orbs inside a single card at 30% opacity is excessive. One is enough. |
| `bar-shimmer` on HeroSection OS mockup progress bars | Progress bars already animate scaleX via Framer Motion. The shimmer is a second animation on the same element. |

---

## 6. Effects to Keep

| Effect | Reason |
|---|---|
| CinematicIntro blur+opacity exit | The platform's single strongest animation moment. Brand-defining. Keep. |
| RotatingWord flip animation | Efficient brand communication, per-word color cycling maps to portal system. Keep. Fix: add reducedMotion check. |
| ScrollStackSection scroll-driven scale/overlay | This is a genuine cinematic storytelling device. The sticky card stack with scroll-driven recede is the best UX innovation on the page. Keep. |
| Framer Motion `fadeUp` scroll reveals | Standard, tasteful, universally expected. Essential. |
| `stagger` container variants | Adds rhythm without distraction. Keep at current 0.07s. |
| HowItWorks timeline `scaleY` line fill | Narrative animation — the line "draws itself" as the user reads steps. Purposeful. |
| HowItWorks step accent line `scaleX` | Subtle, on-scroll, one-shot. Keep. |
| InteractiveSurface 3D tilt + spotlight | Keep but limit to 3 cards maximum in any single section. Currently applied to 7 in EcosystemMap — reduce. |
| MarqueeStrip (2-strip version) | Keep as a visual separator between hero and portals. One strip, not two stacked. |
| Typewriter in MentorShowcase | Storytelling device — demonstrates the mentor working. Keep. Fix: `shouldReduce ? 0 : 28` already handles speed correctly. |
| `shimmer-sweep` on-hover for CTAs | On-hover only, CSS-driven, communicates interactivity. Keep. |
| `cta-ripple` on primary CTA button | Draws attention to the primary action. Acceptable as a single instance. |
| Scroll progress bar + section dot navigation | Functional, not decorative. Keep. |
| Smooth `icon-nudge` on arrows | Micro-interaction, on-hover only. Keep. |
| `orb-breathe` concept as static glow | Remove the animation; keep the orb as a static radial gradient for atmospheric depth. |

---

## 7. Signature Interaction Opportunity

**The current homepage has no single signature interaction.** It has 24 distinct effects competing for attention, with no hierarchy.

**Proposed signature:** The scroll-driven cinematic reveal.

The ScrollStackSection already contains the seed: a sticky card stack where each portal card recedes as the next one ascends. This is cinematic, purposeful, and tells the story of the platform's breadth in a single scrolling motion.

The signature interaction for the redesign should be: **a scroll-narrative where the entire homepage is driven by one continuous scroll journey**, with sections appearing as chapters rather than as isolated animated components. Each section entrance is a single smooth reveal — no individual floating orbs, no simultaneous stagger explosions. The scroll itself is the animation engine.

This means:
- One cinematic viewport-height intro section (hero) with no ambient animation
- Scroll triggers one reveal at a time
- The portal stack's receding cards remain as the centerpiece
- TechMarquee is replaced by a single, legible static technology word cloud or one-row pill strip
- All secondary ambient effects (orbs, shimmer, pulse rings) are removed or made static

---

## 8. Reduced-Motion Requirements

### Current State: Critically Broken

`MotionProvider` wraps the application with `<MotionConfig reducedMotion="never">`. This globally overrides the OS-level `prefers-reduced-motion: reduce` preference and disables the `useReducedMotion()` hook for all Framer Motion components.

The consequence: every component that checks `const shouldReduce = useReducedMotion()` receives `false` regardless of the user's OS setting. This affects:
- CinematicIntro (auto-dismiss timer shortening)
- HeroSection fadeUp delays
- ScrollStackSection scale transforms
- SmartPlatformTour slide transitions
- EcosystemMap hover effects
- MentorShowcase typewriter speed
- MentorShowcase message slide distances
- HowItWorks stagger and timeline

CSS media query `@media (prefers-reduced-motion: reduce)` in globals.css still works (it neutralizes all CSS keyframe animations), but Framer Motion animations are unaffected by this media query — they are controlled entirely by `MotionConfig`.

The result is that users who need reduced motion still receive full Framer Motion animations for every scroll reveal, modal entrance, word rotation, and typewriter effect. This fails WCAG 2.3.3 (Animation from Interactions).

### Recommendation

1. Remove `reducedMotion="never"` from `MotionProvider`. Replace with `reducedMotion="user"` which is Framer Motion's built-in OS-aware mode.
2. All existing `useReducedMotion()` checks in section components then become live and functional.
3. `RotatingWord` needs a `useReducedMotion` check added — it currently has none at all.
4. `TechMarquee` has no reduce-motion check. When it is replaced (see section 5), this problem disappears.

---

## 9. Mobile Animation Rules for the Redesign

**Unsafe for mobile (current):**
- TechMarquee: 20 GPU layers is dangerous on mobile browsers. Confirmed unsafe.
- Two ambient orbs at 65vw in HeroSection: on a 390px mobile viewport, these are ~253px wide blobs with filter:blur(140px). This is a known performance cliff on Safari/iOS.
- InteractiveSurface tilt: already correctly disabled for touch pointers via `e.pointerType !== "mouse"` check. Safe.
- ScrollStackSection: uses `position: sticky` with `hidden md:block` — already bypassed on mobile. Safe.
- CTA ripple ring (`cta-ripple`): continuous box-shadow animation. Can cause jank on low-end devices.

**Rules for the redesign:**
1. Maximum 1 blur filter element per viewport on mobile. No stacking of multiple backdrop-filter + filter:blur elements.
2. All CSS `animation: infinite` properties must be disabled below 768px breakpoint OR must be inside `@media (prefers-reduced-motion: no-preference)`.
3. `will-change: transform` is prohibited on more than 3 elements simultaneously on mobile.
4. No `backdrop-filter: blur()` on elements larger than 200px on mobile — fallback to solid background instead.
5. All marquee animations must reduce to a static display below 480px.
6. Framer Motion `MotionConfig reducedMotion="user"` handles Framer animations; CSS media query block in globals.css handles CSS keyframes. Both must be active.

---

## 10. RTL/LTR Visual Direction Rules

### Current RTL Implementation

**Done correctly:**
- Font switching: `body[dir="rtl"]` switches to `IBM Plex Sans Arabic` and `Cairo` display
- `direction: rtl` applied to `SmartPlatformTour` modal via `dir={isAr ? "rtl" : "ltr"}`
- Logical CSS properties used throughout: `insetInlineEnd`, `paddingInlineEnd`, `ms-1` (margin-start)
- Arrow components swap: `const Arrow = isAr ? ArrowLeft : ArrowRight`
- `icon-nudge` CSS uses `translateX(-3px)` for RTL direction
- Marquee direction flips: `locale === "ar" ? "marquee-track-rtl" : "marquee-track"`
- Progress bar `transformOrigin` adjusts: `isAr ? "right" : "left"` for scaleX animations
- HowItWorks accent line gradient reverses: `linear-gradient(${isAr ? "to left" : "to right"})`

**Broken or risky in RTL:**
- `TechMarquee` forces `direction: ltr` on the wrapper via `style={{ direction: "ltr" }}`. This means Arabic text in this component always scrolls left-to-right regardless of locale. While this avoids RTL marquee reversals, it means Arabic text flows in the wrong reading direction.
- `HeroSection` ambient orbs use `end-[-5%]` and `start-[-10%]` Tailwind logical properties — these are correct. But the orb color positioning (blue on end, violet on start) means in RTL the blue orb moves to the left side. This is fine visually but may need awareness.
- `MentorShowcase` user bubble uses `borderRadius: isAr ? "4px 20px 20px 20px" : "20px 4px 20px 20px"` — RTL chat bubble tail is on the correct side. Good.
- `ScrollStackSection` watermark number positioning uses `[isAr ? "left" : "right"]: "-1%"` — correct.
- The grid overlay (`.bg-grid-overlay`) has no RTL considerations needed — it's symmetric.

**Rules for the redesign:**
1. Never use directional CSS properties (`left`, `right`, `margin-left`) in component styles. Always use logical properties (`inset-inline-start`, `inset-inline-end`, `margin-inline-start`).
2. All CTA arrows must be determined by a single `const Arrow = isAr ? ArrowLeft : ArrowRight` pattern — never hardcode arrow direction.
3. Text-based marquees must not force `direction: ltr` on Arabic content. Either render a separate RTL marquee or use a truly neutral approach.
4. Gradient text-fills (`background-clip: text`) on Arabic headlines require visual QA — some Arabic weights at large sizes render with gradient banding artifacts that don't appear in Latin.
5. All animation offset values (slide-in X distances, nudge distances) must invert for RTL. The existing `shouldReduce ? 0 : (isAr ? -20 : 20)` pattern in MentorShowcase is the correct model.
6. `transformOrigin` for scale animations must be `isAr ? "right" : "left"` for any `scaleX` animation that grows from an edge.

---

## 11. Why Total Redesign is Justified

### The Core Argument

A redesign is justified when the accumulated technical and visual debt makes polishing more expensive than rebuilding, and when the fundamental composition is architecturally flawed — not just poorly styled.

**Argument 1: The page has no narrative arc.**
Ten distinct sections appear in sequence, each with its own header (eyebrow badge + gradient h2 + subtitle), its own visual treatment, and its own ambient decoration. The user experiences ten separate landing pages scrolled into one viewport. There is no single story. The sections do not build on each other.

**Argument 2: The animation system is self-defeating.**
24 distinct animation effects applied simultaneously create perceptual noise. When everything moves, nothing communicates movement. The background breathes, the words rotate, the marquees scroll, the orbs pulse, the progress bars shimmer, the radar rings expand. The user's attention system habituates to the motion and ignores it — which defeats the entire purpose of using motion.

**Argument 3: MotionConfig reducedMotion="never" is an unfixable structural bug in the current design.**
The current design was built with the assumption that animations always run. Fixing the accessibility bug would require auditing and potentially redesigning every animated section to look correct in a reduced-motion state. In a total redesign, reduced motion is designed from zero correctly.

**Argument 4: Glass panel variants are inconsistent and three-headed.**
`glass-panel`, `glass-card`, and `glass-panel-promax` exist with no clear selection rules. In practice, `glass-panel-promax` has won and the other two are orphaned. A redesign can consolidate to one surface token with elevation variants.

**Argument 5: The duplicate color token system will cause maintenance drift.**
`--color-primary: #8ed5ff` and `--primary: #8ed5ff` must both be updated whenever the brand color changes. This is already a source of future bugs.

**Argument 6: TechMarquee is a performance bomb with no UX value.**
320 simultaneously animated DOM nodes cannot be polished into something acceptable. The component must be removed and replaced with a fundamentally different approach.

**Argument 7: The section header pattern eliminates impact.**
Seven sections in a row each begin with an eyebrow badge, a gradient h2, and a muted subtitle. Identical structure, identical visual weight. By the fifth section, the user is trained to skip the header. A total redesign can break this pattern with varied section entry treatments.

**Conclusion:** The current homepage cannot be polished because its structural problems — the animation density, the narrative fragmentation, the accessibility override, the component proliferation — are foundational. Fixing them section by section would leave an inconsistent patchwork. A total redesign from a single creative direction, governed by the five-source component policy (see File 2), is the correct path.
