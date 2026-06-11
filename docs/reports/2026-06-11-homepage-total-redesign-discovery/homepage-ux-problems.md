# Homepage UX, IA & Conversion Problems

**Date:** 2026-06-11
**Scope:** `src/app/[locale]/page.tsx`, all files in `src/components/landing/`, `src/components/layout/Navbar.tsx`, `src/config/portals.ts`, `src/lib/constants.ts`, `src/components/sections/Stats.tsx`, `src/components/community/CommunitySignup.tsx`

---

## Executive Summary

The NexaLearn homepage is architecturally broken from a conversion standpoint. It presents too many ideas simultaneously — a cinematic splash, two marquees, a 3D carousel, a sticky scroll-stack of 7 portals, a path quiz, an ecosystem map, a mentor demo, a 4-step journey, a feature grid, statistics, a final CTA, and a community signup — all before the visitor has a reason to trust the product. The information hierarchy inverts the ideal awareness-to-action funnel: portal cataloguing and deep-feature detail appear before value is established, social proof is absent or unverifiable, and CTAs proliferate to the point of noise rather than direction. The page is engineered to impress designers and developers, not to convert a first-time Arabic learner who has no idea what NexaLearn is.

---

## Section Severity Summary

| Area | Severity |
|---|---|
| 1. Information Architecture | Critical |
| 2. Section Order | Critical |
| 3. CTA Duplication | Critical |
| 4. Repeated Portal Discovery | Major |
| 5. Trust / Proof Placement | Major |
| 6. Overlong Journey | Major |
| 7. Navbar Relationship | Major |
| 8. Conversion Blockers | Critical |
| 9. Arabic/English Issues | Minor |
| 10. Mobile Risks | Major |
| 11. Accessibility Risks | Major |
| 12. Performance and Animation Risks | Major |
| 13. Brand Consistency Risks | Minor |
| 14. Current Strengths | (reference) |

---

## Detailed Analysis

### 1. Information Architecture Problems — CRITICAL

**The AIDA funnel is inverted or missing entirely.**

A new visitor landing on this page has zero prior knowledge of NexaLearn. They need:
1. Awareness — what is this, who is it for?
2. Interest — why does this matter to me?
3. Desire — show me proof it works, show me the outcome
4. Action — one obvious next step

The current page delivers the following in order:
1. CinematicIntro (brand splash — OK for awareness, but blocks the page)
2. HeroSection (partial awareness, partial interest — good start)
3. Two MarqueeStrips (scrolling skills list and portal names — no value, pure visual decoration)
4. ScrollStackSection (7 portal deep-dives — this is product depth, not top-of-funnel)
5. Premium3DShowcaseCarousel (13-item tool carousel — complex, overwhelming)
6. PathSelector (interactive quiz — this is mid-funnel, assumes the visitor is already interested)
7. EcosystemMap (portal grid — a third listing of portals)
8. MentorShowcase (feature demo — interest/desire level, placed too late)
9. HowItWorks (journey explanation — should be much earlier)
10. WhyDarhous (feature grid — should come before portal listings)
11. Stats (social proof numbers — should come directly after Hero)
12. FinalCTA (action prompt)
13. CommunitySignup (another action prompt)

**Critical gaps:**
- The value proposition for a brand-new Arabic learner ("I don't know where to start") is buried. The page should open with a concise answer to "What is NexaLearn and why does it exist?" before showing any portals.
- HowItWorks (the 4-step journey) belongs in position 3 or 4, not position 10. A visitor needs to understand the journey before they decide to explore what's inside.
- WhyDarhous (the differentiators grid) should precede the portal catalogue. Right now, the visitor sees 7 detailed portals before they know why they should trust this platform.
- Stats appear after 10 sections of content. They are social proof and should appear immediately after the hero headline.

---

### 2. Section Order Problems — CRITICAL

**Current section order and momentum analysis:**

| Position | Section | Momentum Effect |
|---|---|---|
| 1 | CinematicIntro | Neutral — delays content 4.4 seconds, can't be skipped easily |
| 2 | HeroSection | Builds momentum — strong headline and CTA |
| 3 | Two Marquees | Breaks momentum — decorative, no message |
| 4 | ScrollStackSection | Breaks momentum — too much depth too soon |
| 5 | Premium3DShowcaseCarousel | Breaks momentum — 13 items, auto-advancing, no hierarchy |
| 6 | PathSelector | Attempts to recover — but requires all 4 inputs before any output |
| 7 | EcosystemMap | Repeats portal content — momentum dead |
| 8 | MentorShowcase | Good content, wrong timing — trust should be earned by here |
| 9 | HowItWorks | Should be position 3 or 4 |
| 10 | WhyDarhous | Should be position 5 |
| 11 | Stats | Should be position 4 |
| 12 | FinalCTA | Correct position — but far too late |
| 13 | CommunitySignup | Dilutes the FinalCTA |

**Key momentum breaks:**
- Sections 3-5 create a three-section wall of visual noise after the Hero. A visitor who scrolls through these with no clear reason to continue will bounce.
- The PathSelector requires 4 separate selections before showing any result. This friction appears before trust has been established.
- The EcosystemMap (position 7) is a third portal listing. By this point a visitor has already seen portals in the ScrollStack and the 3D Carousel.

**Ideas that repeat without progression:**
- "6 portals" or similar counts appear in: CinematicIntro badge area, HeroSection OS mock (6 items), MarqueeStrip 2 (portal names), ScrollStackSection header and 7 cards, Premium3DShowcaseCarousel (includes portals + tools mixed), EcosystemMap header and 6 cards — and again in the Navbar Portals dropdown.
- The AI Mentor is mentioned in: HeroSection mock panel, PathSelector result (2 CTAs), EcosystemMap center card, MentorShowcase, HowItWorks step 2, WhyDarhous feature card, FinalCTA secondary button — 7 distinct appearances with no escalation in depth.

---

### 3. CTA Duplication / Unclear Actions — CRITICAL

**CTA inventory:**

| Section | CTA Text | Destination |
|---|---|---|
| HeroSection | "ابدأ رحلتك الآن" / "Start Your Journey" | Scrolls to PathSelector |
| HeroSection | "تصفح المسارات" / "Explore Paths" | Scrolls to PathSelector (same!) |
| HeroSection | "جولة سريعة" / "Quick Tour" | Opens SmartPlatformTour overlay |
| HeroSection | Scroll hint "اكتشف المنصة" | Scrolls to PathSelector (same!) |
| ScrollStackSection | Per-portal CTA (7 cards) | Each portal's own page |
| PathSelector (result) | "ابدأ خطتي الآن" / "Start My Plan Now" | /register |
| PathSelector (result) | "اسأل المرشد الذكي" / "Ask the AI Mentor" | /mentor |
| Premium3DShowcaseCarousel | 13 cards each with "Explore →" | 13 different pages |
| EcosystemMap | 6 portal cards (clickable) | Each portal's page |
| EcosystemMap | AI Mentor center card | /mentor |
| MentorShowcase | Send button | /mentor |
| MentorShowcase | "افتح المرشد الكامل" link | /mentor |
| FinalCTA | "ابدأ مجانًا الآن" / "Start Free Now" | /register |
| FinalCTA | "جرب المرشد الذكي" / "Try AI Mentor" | /mentor |
| CommunitySignup | "انضم الآن" / "Join Now" | Form submit (email list) |

**Total CTAs: 35+ distinct interactive elements leading to 15+ different destinations.**

**Critical CTA problems:**
- The Hero has 3 buttons, 2 of which go to the same place (PathSelector scroll). This creates confusion about which to click.
- There is no single unambiguous primary action on the page. The visitor cannot answer "what do you want me to do?" with confidence.
- The FinalCTA competes directly with CommunitySignup immediately after it. One asks the visitor to register; the next asks them to join a newsletter. These are two different commitment levels presented back-to-back with no separation.
- The /mentor link appears at minimum 5 times across separate sections. This repetition without escalating urgency is noise, not guidance.
- The PathSelector only reveals its CTAs (/register and /mentor) after completing all 4 quiz steps. A visitor who wants to register cannot do so until they complete the quiz — this is a friction trap disguised as personalization.

---

### 4. Repeated Portal Discovery Areas — MAJOR

**Portal exposure count:**

1. MarqueeStrip 2 — portal names scroll across (text only)
2. ScrollStackSection — 7 full portal cards with sticky scroll mechanic, each with title, description, 5 feature pills, and a CTA link
3. Premium3DShowcaseCarousel — 13 items including portals, tools, and pages mixed without clear categorization
4. EcosystemMap — 7 cards (6 portals + AI Mentor center)
5. Navbar Portals dropdown — all portals listed again

A visitor encounters portal names/cards in at least 4 separate scroll sections before reaching the bottom of the page. The repetition does not escalate — each occurrence gives roughly the same information (title, brief description, CTA) without building on prior context. This is the opposite of progressive disclosure. The effect is cognitive fatigue, not comprehension.

**The 3D Carousel compounds this problem** by mixing learning portals (AI Academy, Language, Digital Exams) with AI Studio tools (Prompt Studio, Tool Recommender, Roadmap Generator) with content pages (Claude Mastery, Projects Library, Prompt Library) with the Student Dashboard — all in a single carousel with no grouping, labeling, or hierarchy. A visitor cannot form a mental model of the product from this carousel.

---

### 5. Trust / Proof Placement — MAJOR

**What exists:**
- Stats section (12+ paths, 100+ lessons, 60+ AI tools, 30+ projects, 4 cloud tracks, ∞ Arabic Platform) — appears at position 11 in the section order.
- CheckCircle proof points in HeroSection (AI-Powered Paths, Interactive Labs, Continuous Mentorship) — these are claims, not proof.
- WhyDarhous feature grid — these are promises ("Project-Based Learning"), not evidence.

**What is missing:**
- Zero student testimonials or quotes anywhere on the page.
- Zero social proof numbers tied to actual users (enrolled students, active learners, certificates issued).
- Zero third-party validation (press mentions, partner logos, or instructor credentials).
- The Stats numbers (12+, 100+, 60+, 30+, 4, ∞) are not verifiable from the page context. The "∞ Arabic Platform" stat is not a number — it is a marketing slogan formatted as a metric, which reduces the credibility of all other stats.

**Placement problem:**
Stats appear after 10 sections. Even if the numbers are impressive, a visitor who has already bounced due to section overload will never see them. Social proof must appear within the first 2-3 scrolls — ideally immediately below the Hero headline — to anchor trust before the product catalogue begins.

---

### 6. Overlong Journey / Scroll Depth — MAJOR

**Estimated scroll distance:** 13 distinct sections plus the CinematicIntro overlay, plus the Navbar at the top.

**Section height estimates:**
- CinematicIntro: Full viewport (4.4 seconds blocking)
- HeroSection: ~120vh (hero text + command center mockup + tech marquee)
- Two Marquees: ~12vh combined
- ScrollStackSection: Very long — `minHeight: ${total * 240 + 520}px` = `7 * 240 + 520 = 2200px` on desktop. This single section is taller than the entire rest of the page.
- Premium3DShowcaseCarousel: ~60vh
- PathSelector: ~70vh (before quiz result) to ~100vh (after showing plan)
- EcosystemMap: ~80vh
- MentorShowcase: ~70vh
- HowItWorks: ~80vh
- WhyDarhous: ~70vh
- Stats: ~30vh
- FinalCTA: ~60vh
- CommunitySignup: ~60vh

**Total estimated page height: approximately 9,000–11,000px** (depending on screen size).

**First escape point:** The HeroSection scroll hint says "Explore the platform" and scrolls down — but a bounce-prone visitor will leave at the two decorative Marquees if they do not see a reason to continue scrolling.

**Second critical escape point:** After the ScrollStackSection (~2200px tall). Any visitor who makes it through 7 sticky portal cards without clicking one has seen maximum portal content. If they didn't act there, adding a 13-item 3D Carousel next (the very next section) will not help.

**The ScrollIndicator** (side dots) lists only 5 sections: Portals, My Path, Mentor, Journey, Ecosystem. This misrepresents the page — it shows 5 sections but the page has 13. The dots label "Portals" as the first section, which is actually the 4th scroll position. A visitor trying to use this navigation element will find it out of sync with what they see.

---

### 7. Navbar Relationship — MAJOR

**Navbar duplicates homepage content in three ways:**

1. **Portals dropdown** lists all 7 portals with icons, names, and live/coming status — the same information that appears in ScrollStackSection, 3D Carousel, and EcosystemMap.
2. **AI Studio dropdown** lists 12 tools — many of which appear in the 3D Carousel on the homepage itself.
3. **Nav links** include: Home, Paths, Tools, Claude, Projects, Blog — all pages that are also featured as cards in the 3D Carousel on the homepage.

**Result:** The Navbar and the homepage are competing catalogues of the same content. A visitor who finds what they want in the Navbar dropdown will leave the homepage immediately — the homepage journey is bypassed, not supported.

**Nav does not support the homepage funnel:** There is no "Register" or "Sign Up" button in the Navbar for unauthenticated visitors on desktop. The only signup path in the Navbar is the text-only Login link (for signed-out users, shown after Supabase is configured). A visitor who is ready to act after reading the Hero has no obvious Navbar action to take.

---

### 8. Conversion Blockers — CRITICAL

**Barrier 1: The CinematicIntro.**
The page opens with a full-screen animation that blocks all content for 4.4 seconds (reduced to 1.2 seconds for prefers-reduced-motion). A returning visitor or a visitor from a search result is blocked from the content they came to see. There is a Skip button but it appears with a 1-second delay and has 50% opacity. First-time visitors on mobile who do not see the Skip button will wait the full 4.4 seconds.

**Barrier 2: No above-the-fold register/signup CTA.**
The Hero has two primary CTAs that both scroll down the same page. Neither directs the user to register or create an account. A visitor who reads the Hero headline and is ready to sign up must scroll down through the entire page to find the FinalCTA register link, or notice the SmartPlatformTour "Start for free" button on step 5 of the tour. The PathSelector is the earliest register CTA and it requires 4 quiz completions first.

**Barrier 3: PathSelector friction.**
The PathSelector presents a compelling idea ("we'll build you a custom plan") but requires 4 separate button clicks before revealing the result. If a visitor clicks 3 of 4 and abandons, they see no plan and no CTA. There is a timeout message "Answer all 4 questions to see your plan" but no partial result or encouragement. The quiz is positioned above the primary register CTA, creating a mandatory task before conversion.

**Barrier 4: The SmartPlatformTour.**
The tour is triggered by a "Quick Tour" button in the Hero. It opens a 5-step carousel overlay. The register CTA only appears on step 5. A visitor who closes the tour on step 2 or 3 sees the overlay but never reaches the action. The tour also auto-opens for first-time visitors (localStorage-gated, after 2.4 seconds) — which means a new visitor faces: CinematicIntro (4.4s) → SmartPlatformTour auto-open (2.4s after page settles) — two consecutive overlays before seeing the homepage.

**Barrier 5: No clear pricing/cost signal.**
"Start Free" appears only in the PathSelector result, the FinalCTA, and the SmartPlatformTour last step. The Hero does not mention it is free. A cost-conscious visitor reading the Hero has no signal that signup is free, which suppresses the urge to act.

**Barrier 6: Unanswered visitor questions.**
A new Arabic learner asking fundamental questions finds no answers:
- "Is this actually free or does it cost money?" — Not answered at Hero level.
- "Do I need any technical background?" — Not answered until PathSelector (buried).
- "How long does it take to learn?" — Not answered.
- "Who built this and can I trust it?" — "by Ahmed Darhous" appears in badge but no bio, credentials, or social proof.
- "What happens after I register?" — Not answered.

---

### 9. Arabic/English Issues — MINOR

**Directionality:**
- RTL direction handling is implemented throughout via `isAr` conditionals, `isAr ? ArrowLeft : ArrowRight`, `insetInlineStart`, `insetInlineEnd`, `borderInlineEnd` etc. This is correct practice.
- The Marquee second strip has an unusual pattern: `locale={isAr ? "en" : "ar"}` — it shows the opposite locale. This may be intentional (variety) but it means Arabic visitors see Arabic portal names in an English-locale marquee context and vice versa. The visual and semantic intent is unclear.

**Translation coverage:**
- The ar.json and en.json files contain a `hero` section with keys that do not match the current HeroSection component. The current Hero is fully hardcoded with bilingual inline strings, not using translation keys. This means translation changes require code edits, not content edits.
- The footer copyright in ar.json still references "أكاديمية درهوس للذكاء الاصطناعي" (old brand name) rather than NexaLearn. This is a brand consistency error carried over from the old identity.
- The community signup INTERESTS list contains "Gemini Nano Banana" in the English list and "Gemini Nano Banana" (untranslated) in the Arabic list — a minor localization gap.

**Arabic typography:**
- The HeroSection Arabic headline uses `font-weight: 300` for the non-highlighted words ("تعلّم" and "ابنِ مستقبلك مع NexaLearn"). Light weight Arabic text at large sizes can render poorly on Windows with ClearType at certain DPI settings. No Arabic-specific font weight is tested; the fallback chain ends at `sans-serif`.
- The PathSelector Arabic text uses colloquial Egyptian dialect ("مش عارف تبدأ منين؟", "اختار إجاباتك", "هنعمل لك") — this is warm and accessible but inconsistent with the rest of the page which uses Modern Standard Arabic. This dialectal shift may confuse or alienate non-Egyptian Arabic speakers (Gulf, Levant, North Africa) who are part of the stated target audience.

---

### 10. Mobile Risks — MAJOR

**ScrollStackSection on mobile:**
The mobile version renders as a flat list of 7 full-height portal cards. Each card has `minHeight: clamp(320px, 58vh, 510px)`. At 375px width, 7 cards at minimum 320px each = at least 2,240px for this section alone. The sticky scroll effect is explicitly disabled on mobile. The cards on mobile show full-width text layout without the icon column offset — this may cause icon+text layout to stack awkwardly depending on content length.

**Premium3DShowcaseCarousel on mobile:**
The 3D stage uses `translateX(-50% + Xvw)` positioning for off-center cards, with side cards at `pos * 42vw` or `pos * 65vw`. On mobile (375px), side cards at 42% of viewport = 157px offset. With card width of `min(380px, 88vw) = 330px`, side cards will overflow viewport significantly. The `overflowX: hidden` on the stage clips them, but touch events and pointer events (`pointerEvents: "none"` on non-active cards) mean only the center card is interactive. On mobile this carousel is a large static image with two small arrow buttons at the bottom — the 3D effect is entirely lost.

**CinematicIntro:**
Uses a full fixed overlay. On mobile Safari, fixed elements can cause layout issues when the browser chrome collapses on scroll. The progress bar uses a 3.6-second transform animation — on low-end Android phones with 60fps throttling, this may stutter.

**PathSelector:**
4 sets of filter chips. On small screens, the `flex-wrap` layout means chips may wrap to 2-3 rows per question. With 4 questions in a 2-column grid (which collapses to 1 column on mobile), this section could be 500-600px tall before the user has answered a single question. The call to action ("Answer all 4 questions to see your plan") is below all chips and may not be visible without scrolling into the component.

**HeroSection command center mockup:**
The mockup uses `md:flex-row` layout (2 panels side by side on desktop). On mobile it stacks. The mock progress bars inside are animated but may cause CLS if they load after initial paint on mobile connections.

---

### 11. Accessibility Risks — MAJOR

**CinematicIntro:**
- Has `role="dialog"` and `aria-modal="true"` — correct.
- Has keyboard dismiss (Escape, Enter, Space) — correct.
- The skip button has `opacity: 0.5` in the animate state — 50% opacity text on a dark background may fail WCAG AA contrast ratio (4.5:1 for small text).
- The progress bar is purely decorative and has no accessible role or aria-hidden. No issue, but worth confirming.

**SmartPlatformTour:**
- Progress dots have `role="tab"` and `aria-selected` — correct.
- Navigation buttons have `aria-label` — correct.
- The overlay has `role="dialog"` and `aria-modal="true"` — correct.
- Focus trap is not implemented. When the tour overlay opens, keyboard Tab will cycle through the page behind the overlay (since it is not a native dialog). Screen reader users may be confused.

**HeroSection:**
- The "scroll hint" `ChevronDown` button has no `aria-label`. A screen reader will announce this as an unlabeled button.
- The Hero mock panel (command center) contains interactive-looking elements (Approve Plan, Edit Goal chips) that are `<span>` elements without `role="button"` or keyboard handling. They appear clickable but are decorative — no aria-hidden.

**ScrollStackSection:**
- Portal cards are `<Link>` elements — correct.
- Feature pills have no semantic role — they are informational `<span>` elements, acceptable.
- The sticky scroll effect relies on `position: sticky` — screen readers read the page in DOM order, so the sticky visual stacking is invisible to assistive tech, which is fine.

**EcosystemMap:**
- All portal cards are `<Link>` elements — correct.
- The AI Mentor center card contains decorative radar pulse rings with `aria-hidden="true"` — correct.

**Stats section:**
- Uses raw `<div>` with no semantic role. Could be a `<dl>`/`<dt>`/`<dd>` definition list.
- The `∞` symbol for "Arabic Platform" is not meaningful to a screen reader and has no `aria-label` override.

**General touch target issue:**
ScrollIndicator dots on desktop are `6px × 6px` (inactive) and `10px × 10px` (active). These are far below the WCAG 2.5.5 target minimum of 24×24px. Although the dots are desktop-only (hidden on mobile via `hidden lg:flex`), keyboard users on desktop cannot reliably interact with 6px targets.

**Color contrast:**
Most text uses CSS variables (`var(--color-on-surface-variant)`) against dark backgrounds. Without knowing the exact resolved hex values, contrast cannot be audited from code alone. However, the opacity overrides are a consistent risk: `opacity-40`, `opacity-50`, `opacity-60`, `opacity-70` are applied to text elements throughout. If the base text color is already low contrast (as `on-surface-variant` typically is), reducing it by 40-60% will fail AA contrast.

---

### 12. Performance and Animation Risks — MAJOR

**Framer Motion budget:**
Every visible section uses Framer Motion animations. On a single page load, the following animate simultaneously or in sequence:
- CinematicIntro: fade + blur exit transition
- HeroSection: 8 sequential `fadeUp` motion variants, 6 progress bar `scaleX` animations, `RotatingWord` cycling every 2.4 seconds
- Two MarqueeStrips: continuous CSS transform animations
- ScrollStackSection: `useScroll` + `useTransform` for scale and overlay opacity per card (7 transforms)
- Premium3DShowcaseCarousel: CSS transitions on all 13 cards every 6 seconds, auto-advancing
- PathSelector: Framer Motion stagger + fadeUp on every section
- EcosystemMap: hover-based color state + motion variants per card
- MentorShowcase: typewriter effect (setInterval at 28ms) + Framer entrance animations
- HowItWorks: `useInView` per step, `scaleX` accent line, pulsing dot rings (repeat: Infinity)
- WhyDarhous: `useScroll` + `useTransform` for heading parallax

**Specific risks:**

- **INP (Interaction to Next Paint):** The MentorShowcase typewriter runs `setInterval` at 28ms on the main thread. This fires 35 times per second for several seconds. Combined with all other animations, this is a significant INP hazard on mid-range devices.
- **CLS (Cumulative Layout Shift):** The `dynamic()` imports for `Premium3DShowcaseCarousel`, `MentorShowcase`, and `ScrollIndicator` use `ssr: false`. They render as nothing on server and hydrate client-side. If the sections around them have fixed heights, CLS may be minimal — but if the carousels affect surrounding layout heights, CLS will be high.
- **ScrollStackSection height:** The desktop container uses an explicit `minHeight` of `(total * 240 + 520)px = 2200px`. This creates a very tall DOM element that forces a large layout recalculation on initial paint. Combined with `useScroll` tracking this container, there are `scrollYProgress` listeners and `useTransform` hooks active for the entire duration the user is anywhere on the page (since the container starts near the top).
- **MarqueeStrip:** Two continuously running CSS animations with no pause-on-visible mechanism. `prefers-reduced-motion` is not respected in the MarqueeStrip component based on what is visible in HomepageClient — the `speed` prop controls CSS animation duration but there is no `animation: none` override for reduced-motion.
- **CinematicIntro LCP impact:** The CinematicIntro renders as `fixed inset-0 z-[9999]` for 4.4 seconds. It is a full-screen overlay that occludes the actual page content. Lighthouse/CrUX will measure LCP against visible content — the CinematicIntro itself has no large image or text above the fold, so LCP may report against the h1 element inside it (which is small and text-only). However, the Hero h1 underneath is invisible during those 4.4 seconds, which may confuse LCP measurement.
- **HowItWorks pulsing dots:** `animate={{ scale: [1, 1.6, 1], opacity: [0.35, 0, 0.35] }}` with `repeat: Infinity` runs indefinitely for 4 elements simultaneously. Infinite animations that change opacity and scale can cause GPU repaint on some browsers.

---

### 13. Brand Consistency Risks — MINOR

**Color system:** The design uses a consistent set of accent colors (primary #8ed5ff, secondary #d0bcff, tertiary #3ce0fb, green #4ade80, amber #fbbf24, orange #f97316). These appear consistently across sections via CSS variables and inline style overrides.

**Inconsistencies found:**
- The `ar.json` footer copyright still reads "أكاديمية درهوس للذكاء الاصطناعي" — old brand name. Any footer that uses this translation key will show the wrong brand.
- The CommunitySignup hero variant uses a teal/tertiary color scheme, while the rest of the page leans toward primary (blue) as the dominant accent. This creates a visual shift in the final section before FinalCTA.
- The Stats section uses a grid texture background (`backgroundImage` with `rgba(255,255,255,0.05)` lines). No other section on the homepage uses this texture pattern. It looks like a different design system.
- MarqueeStrip 2 renders with `locale={isAr ? "en" : "ar"}` — this is a logic inversion that causes the Arabic locale to render a marquee with English locale styling attributes. The visible text is the portal titles in the opposite locale direction. This cross-locale rendering is confusing and may produce unexpected RTL/LTR direction issues inside the marquee.
- The HeroSection brand badge reads "NexaLearn by Ahmed Darhous — Next Gen Learning" in English and "NexaLearn by Ahmed Darhous — الجيل القادم للتعلم" in Arabic. The English suffix "Next Gen Learning" is a marketing tagline, not a brand descriptor, and differs from the page meta title tagline "Learn Smart. Build Skills. Grow With Confidence." These three taglines (badge, meta title, Hero h1 rotating words) should be unified.
- The SmartPlatformTour uses a storage key `"darhous-platform-tour-seen-v1"` — old brand name embedded in localStorage. Not visible to users but inconsistent with the brand rename.

---

### 14. Current Homepage Strengths Worth Preserving

**These elements are genuinely strong and should be carried into any redesign:**

1. **HeroSection command center mockup.** The AI Mentor chat panel + portal progress grid is an excellent "show don't tell" device. It gives a concrete visual of the product experience without requiring the visitor to click anywhere. This should be above the fold in any redesign.

2. **PathSelector quiz logic.** The idea of asking 4 questions and generating a 6-week plan is strong mid-funnel engagement. The weakness is placement (too early) and friction (requires all 4 inputs). The underlying logic (`getRecommendedPath`) is solid and should be preserved. The fix is to show partial results earlier, not to remove the quiz.

3. **ScrollStackSection big portal cards.** Each card gives clear, scannable information (icon, title, description, 5 feature pills, one CTA). The sticky scroll mechanic on desktop is visually memorable. The fix is to show fewer portals here (3 "hero portals" rather than all 7) and remove the subsequent EcosystemMap repetition.

4. **HowItWorks 4-step timeline.** Clear, scannable, well-labeled. The pulsing dot animation reinforces the "ongoing journey" concept. This section belongs much earlier in the page — it should be the third or fourth section after the Hero.

5. **FinalCTA copy.** "Start Now... Even If You Don't Know Where to Begin" directly addresses the primary anxiety of the target audience. This is the strongest conversion copy on the page. It should appear earlier (or be echoed at the Hero level).

6. **RTL implementation.** The logical CSS properties (`insetInlineStart`, `insetInlineEnd`, `borderInlineEnd`) and directional icon conditionals are properly implemented throughout. This is a solid foundation that should be preserved in any redesign.

7. **useReducedMotion support.** Every animated component checks `useReducedMotion()` and respects the preference. This is a strong accessibility foundation.

8. **MentorShowcase typewriter demo.** The live demo of the AI Mentor responding to a real beginner question is the most concrete proof-of-value on the page. The copy ("I'm a beginner and don't know where to start") exactly matches the target visitor's mental state. Preserve this component; move it earlier.

---

## Top 5 Most Critical Issues to Fix in Any Redesign

### Issue 1: No clear primary CTA in the hero — CRITICAL
Both hero buttons scroll to the same destination (PathSelector) and neither directs the user to register. The primary hero CTA must be a direct register link with "Start Free" language. The secondary CTA can be "Explore the Platform." All other hero buttons should be eliminated.

### Issue 2: The CinematicIntro blocks first impressions for 4.4 seconds — CRITICAL
A fullscreen animation that hides all page content for 4.4 seconds is a bounce machine. It must be either removed entirely or replaced with a non-blocking hero entrance animation. The intro concept (brand reveal) is fine but it must not occlude content.

### Issue 3: Portal content appears 4 times before the visitor understands why they should trust the platform — CRITICAL
The page shows portals before it answers the three fundamental questions: what is NexaLearn, who is it for, and why should I trust it. The redesign must establish value and trust (Hero → HowItWorks → Stats → single portal overview) before entering any product catalogue depth.

### Issue 4: 35+ CTAs with no hierarchy create decision paralysis — CRITICAL
The page must have one primary action (Register / Start Free), one secondary action (Try the AI Mentor), and all other links subordinated to content navigation. Every section should not have its own competing CTA. The EcosystemMap and ScrollStackSection should link to a dedicated portals directory page, not each independently CTAing to separate portal pages.

### Issue 5: Social proof appears at scroll position 11 and is unverifiable — MAJOR
Testimonials (real ones), a student counter, or at minimum a verifiable published course/portal count must appear within the first 3 scroll positions. The current stats ("∞ Arabic Platform") hurt credibility more than they help. Replacing ∞ with a real metric and moving Stats immediately below the Hero headline would meaningfully increase conversion trust.
