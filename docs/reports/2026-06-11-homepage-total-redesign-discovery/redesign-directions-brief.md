# Redesign Directions Brief

**Date:** 2026-06-11
**Project:** NexaLearn by Ahmed Darhous
**Scope:** Five genuinely distinct homepage design directions for evaluation

---

## Purpose

This brief does not implement any direction. It proposes five complete design directions for the
NexaLearn homepage — each conceptually distinct enough that a visitor would immediately know which
one they are looking at. One direction will be selected for production after preview evaluation.

---

## Direction 1 — The Learning Command Center

### Visual Concept

The homepage is structured as a data-forward dashboard. The above-fold area looks like a product
application, not a marketing page — a persistent sidebar of portal status indicators on one side,
a large central panel showing the learner's recommended starting point, and a header strip with
real-time ecosystem stats. The color palette stays dark but shifts toward structured contrast:
light text on dark application panels, with portal accent colors used only for active states
and data indicators.

### Emotional Feeling

The visitor should feel informed and in control. Not overwhelmed by options — oriented by a
clear map of a system they are about to enter. The feeling is closer to opening a tool than
browsing a brochure.

### Main User Journey

1. Visitor lands. Above-fold shows a dashboard shell with the six portals listed as status widgets on the left and a large center panel labeled "Where should you start?"
2. The center panel immediately shows the AI Mentor's default recommendation for a beginner with no prior input.
3. Visitor scrolls down to a "Tell me about yourself" input — three quick tap options that refine the center panel recommendation.
4. Refined recommendation reveals a week-by-week plan with portal links.
5. A persistent bottom strip shows "Start free — one account for all portals" with a registration link.

### Section Structure

1. Dashboard shell hero (portal sidebar + recommendation center + ecosystem status header)
2. Recommendation refiner (three-tap goal selector that updates the center panel)
3. Portal detail drawer (expanded view of the selected portal from the sidebar)
4. Outcomes panel (certificate count, learner count, completion data)
5. Registration strip (persistent, bottom-anchored on desktop)

### Signature Interaction

When the visitor taps a portal in the left sidebar, the large center panel slides to show that
portal's content with a smooth horizontal slide. The background atmosphere shifts to the portal's
gradient. The sidebar item becomes active with a colored indicator. This "select and see" pattern
makes the visitor feel like they are operating the platform, not being sold to.

### Library Mix

- Framer Motion: panel slide transitions, sidebar active state animation, count-up data
- HeroUI: the sidebar portal list (Tab component), recommendation center card shell
- shadcn/ui: compact status badges for portal availability (Live, Beta, Soon)
- Magic UI: none — this direction avoids decorative marketing effects above the fold
- Aceternity: optional for the recommendation center background atmosphere

### Content Preserved / Merged / Moved

- Preserved: portal data from `src/config/portals.ts`, PathSelector interest logic, Stats numbers
- Merged: PathSelector questions become the three-tap refiner in Section 2
- Moved: MentorShowcase becomes the center panel of Section 1
- Removed: MarqueeStrips, ScrollStackSection sticky cards, EcosystemMap grid, 3D carousel, CinematicIntro

### Strengths

- Immediately differentiates NexaLearn as a product, not a course aggregator
- Visitors experience the platform UX before registering — this reduces sign-up hesitation
- The sidebar establishes all portals in one glance without requiring separate scroll sections

### Risks

- High implementation complexity; the dashboard shell requires a purpose-built layout component
- May feel unfamiliar to Arabic-speaking users who expect a more traditional landing page format
- Sidebar layout requires careful RTL inversion testing; portal list ordering may need to change

### Estimated Complexity

Very High

### Why This Is Clearly Different from the Current Homepage

The current homepage is a vertical scroll experience with sections stacked in sequence. Direction 1
has no section-by-section scrolling for its primary content — it presents the full portal map in
one above-fold view as an application shell, then uses scroll only for supporting content.
The dashboard anatomy has no equivalent anywhere in the current codebase.

---

## Direction 2 — The Guided Learning Journey

### Visual Concept

The homepage tells a story, not a product catalog. The above-fold is minimal: a single question
in large type, "What do you want to be able to do?" followed by three illustrated answer cards.
The visitor's answer determines which narrative thread appears as they scroll. Each scroll section
is a chapter in a personalized story — "Week 1: You start here", "Week 3: You'll be able to do
this." The visual language is warm within the dark palette: illustrations replace icons, soft
gradients replace hard glass panels, and one subtle background texture gives the page depth
without complexity.

### Emotional Feeling

The visitor should feel understood and guided — as if the platform already knows them and is
speaking directly to their situation. Not "here is our product" but "here is your path."

### Main User Journey

1. Visitor lands on a single question: "What do you want to be able to do?" Three answer paths displayed as illustrated cards below: "Get an AI skill", "Launch a career", "Pass an exam."
2. Visitor taps one. The page performs a scroll-driven reveal — sections below the fold shift to show content for that goal.
3. Section 2 appears: "Your first week with NexaLearn" — a narrative description of what the first week looks like for this goal, with specific portal names and actions.
4. Section 3: "By week 6, you'll have..." — concrete outcomes for this goal.
5. Section 4: A short live demo of the AI Mentor with a question relevant to the chosen goal.
6. Section 5: Social proof strip + registration CTA.

### Section Structure

1. Goal question hero (three illustrated answer cards, no hero paragraph)
2. Week 1 narrative (goal-specific, driven by PathSelector logic)
3. Six-week outcome forecast (certificate, skill milestone, project)
4. AI Mentor demo (question pre-loaded from chosen goal)
5. Community + trust strip
6. Registration CTA

### Signature Interaction

When the visitor selects a goal card, the cards above the fold animate to show the selected card
expanding into a "chapter header" — full width, with the goal name prominent. The sections below
the fold are already in the DOM but reveal sequentially as the visitor scrolls through chapters
using scroll-snapping. Each chapter section has a chapter number in monospace at the top-left
(or top-right in RTL).

### Library Mix

- Framer Motion: card expand animation, chapter reveal scroll-snap transitions
- shadcn/ui: chapter number badge, outcome card primitives
- Magic UI: animated gradient text for the goal question headline
- HeroUI: registration CTA input and button
- Aceternity: none — direction uses soft gradients, not cinematic glass effects

### Content Preserved / Merged / Moved

- Preserved: PathSelector goal and interest logic, recommended path output, MentorShowcase chat
- Merged: HowItWorks steps become the "Week 1 → Week 6" narrative sections
- Moved: Stats and social proof moved to Section 5, directly before CTA
- Removed: ScrollStackSection, EcosystemMap, MarqueeStrips, Premium3DShowcaseCarousel, CinematicIntro

### Strengths

- The single question hook is extremely low friction — one tap to start personalizing
- Chapter-based scroll narrative creates a memorable, magazine-like experience
- Outcome-first framing ("by week 6 you'll have X") is the most conversion-oriented approach

### Risks

- Goal-specific content requires three content branches — higher content maintenance burden
- Scroll-snap interactions can conflict with RTL browser scrollbar positioning
- If the visitor does not select a goal, the page below the fold is generic — fallback state must be defined

### Estimated Complexity

High

### Why This Is Clearly Different from the Current Homepage

The current homepage presents all content to all visitors in the same fixed order regardless of
their intent. Direction 2 makes the above-fold question the entire page structure. A visitor who
picks "Get an AI skill" sees a completely different page than one who picks "Launch a career."
No current section does this.

---

## Direction 3 — The Minimal Trust-First Landing

### Visual Concept

Almost no animation above the fold. White space-dominant within the dark palette. A single large
headline, a two-sentence outcome-focused subtitle, one primary CTA, and three trust signals
(learner count, certificate count, and one named endorsement). Below the fold: portal discovery
is a simple grid — no gradients, no glass panels, no hover transforms. The visual language is
closest to a high-end SaaS landing page (Linear, Vercel, Supabase) — the platform's quality
is communicated through precision and restraint rather than visual spectacle.

### Emotional Feeling

The visitor should feel that this platform is serious, credible, and professionally built. The
absence of marketing flourish is itself the trust signal. "If they don't need all that, they must
be confident in the product."

### Main User Journey

1. Visitor lands on a minimal above-fold: headline + subtitle + one CTA + three trust numbers. No animation, no rotating words.
2. First scroll: a clean portal grid — 3x2, each portal shown as a compact card with icon, name, status badge, and one sentence description. No glass effects.
3. Second scroll: AI Mentor demo in a contained panel — no ambient orbs, no command center.
4. Third scroll: "How it works" — three steps in bold, horizontal typography (no timeline gutter).
5. Fourth scroll: Social proof + registration.

### Section Structure

1. Minimal outcome hero (headline, subtitle, trust triad, one CTA)
2. Portal discovery grid (compact, no visual effects)
3. AI Mentor demo
4. Three-step journey
5. Social proof and registration

### Signature Interaction

The only noteworthy interaction is the portal card hover state: when the visitor hovers a portal
card, the card's accent color appears as a left border line (or right border in RTL) and the
portal's one-sentence description fades in below the name. No scale, no shadow, no glow — just
a color line and a text reveal. This restraint makes the hover feel precise.

### Library Mix

- shadcn/ui: portal grid cards, trust signal badges, portal status chip
- HeroUI: registration form and CTA button
- Framer Motion: used only for the mentor demo typewriter and scroll-driven entrance opacity (no Y offset)
- Magic UI: none
- Aceternity: none

### Content Preserved / Merged / Moved

- Preserved: portal data, mentor chat demo, how-it-works steps, stats numbers
- Merged: trust signals combined from Stats + HeroSection proof points into the above-fold triad
- Moved: all stats moved to Section 1 (above fold)
- Removed: ScrollStackSection, EcosystemMap, MarqueeStrips, Premium3DShowcaseCarousel, CinematicIntro, PathSelector, WhyDarhous, FinalCTA glass panel

### Strengths

- Fastest First Contentful Paint and Largest Contentful Paint of all five directions — no lazy-loaded motion
- Easiest to pass reduced-motion, keyboard navigation, and screen reader audits
- Cleanest Arabic RTL implementation — no complex animated layouts to mirror

### Risks

- May feel "too plain" for an AI learning platform audience expecting something premium
- Requires high-quality copywriting since motion is not available to compensate for weak words
- The portal grid without effects may not differentiate portals sufficiently — visitor may not understand what makes each one distinct

### Estimated Complexity

Low

### Why This Is Clearly Different from the Current Homepage

The current homepage's identity is built on dark glass, cinematic motion, and visual density.
Direction 3's identity is built on the absence of all three. A visitor cannot mistake these for
the same page. The current page requires significant scroll time to reach the registration CTA;
Direction 3 places the primary CTA in the first viewport.

---

## Direction 4 — The Cinematic Portal Universe

### Visual Concept

Each portal is given its own visual universe. The homepage above-fold shows a dark space-like
background with seven glowing orbs arranged in a loose constellation. Each orb represents one
portal — color-coded to the portal's accent, subtly pulsing. The platform name and one tagline
are centered. When the visitor hovers or taps an orb, the entire background shifts to that
portal's visual world: the gradient fills the background, the portal name appears in large type,
and three key features appear. A single "Enter portal" CTA appears. Below the constellation:
a horizontal strip of portal names acts as a secondary navigation. Below that: the AI Mentor
demo and registration CTA.

### Emotional Feeling

Awe, curiosity, and a sense of discovery. The visitor should feel like they have arrived at a
place they want to explore — not a checkout process. Each portal should feel like a door to a
different world rather than a tab in a dashboard.

### Main User Journey

1. Visitor lands on the constellation — seven glowing orbs in a dark field with the platform name and tagline in the center.
2. Visitor taps or hovers the orb that interests them (or a label strip below guides them).
3. The selected portal's universe fills the viewport: full-background gradient, portal name, three features, and an "Enter" CTA.
4. If the visitor does not tap, the homepage scrolls past the constellation to a compact horizontal portal strip.
5. Below the portal strip: AI Mentor demo with a neutral starter question.
6. Below that: Registration CTA with trust numbers.

### Section Structure

1. Constellation hero (interactive orb map, platform name, tagline)
2. Portal universe reveal (full-viewport portal-specific panel, triggered by orb selection)
3. Portal navigation strip (fallback for visitors who do not engage with constellation)
4. AI Mentor demo
5. Trust strip + registration

### Signature Interaction

The constellation to universe transition: when a portal orb is selected, the orb expands from a
point to fill the viewport background with the portal's gradient. The other orbs fade out. The
portal name rises from the orb center. The motion takes 800ms using a cubic-bezier spring curve.
A back button ("return to all portals") collapses the expanded portal back to the orb. On mobile
the constellation becomes a vertical list of orb-like tiles that tap to reveal the portal universe
panel below.

### Library Mix

- Framer Motion: orb expand/collapse animation, `AnimatePresence` for universe transitions, background color morph
- Aceternity: optional for the constellation background (background beams or aurora effect as the field)
- shadcn/ui: portal navigation strip, trust badges
- HeroUI: registration input and CTA button
- Magic UI: none above the constellation

### Content Preserved / Merged / Moved

- Preserved: portal data, colors, gradients from `src/config/portals.ts`, mentor demo
- Merged: Portal description, three features, and CTA from each portal config become the universe panel
- Moved: Trust numbers move to below the portal strip
- Removed: ScrollStackSection, EcosystemMap, MarqueeStrips, PathSelector, HowItWorks, WhyDarhous, Premium3DShowcaseCarousel, CinematicIntro

### Strengths

- The most distinctive and memorable visual experience of all five directions
- Makes the portal ecosystem the hero rather than a section within the page
- Users immediately understand there are multiple distinct portals, each with its own identity

### Risks

- Very High GPU cost on mobile — the orb constellation and background transitions may cause jank on lower-end devices
- Visitors who want to compare portals must tap through each one individually — no side-by-side view
- The interaction model is non-standard; visitors who don't understand "tap the orb" may not discover portal content

### Estimated Complexity

Very High

### Why This Is Clearly Different from the Current Homepage

The current homepage has portals as sections within a vertical scroll. Direction 4 makes portals
the entire above-fold interaction — the homepage is a portal selector, not a homepage with portals
inside it. The space/constellation metaphor has no analogue in the current design.

---

## Direction 5 — The Interactive Goal-Based Gateway

### Visual Concept

The page opens with a direct question in Arabic or English — the visitor's language from the
locale route. The question is the largest element on the page. Below the question: a small
number of answer choices, each designed as a large tap target (mobile-first 56px minimum height),
not a small pill button. Once the visitor answers, the page does not scroll — it transitions to
the next question in the same viewport. After three quick answers, the page transitions to a
personalized landing state showing the recommended portal, path, and mentor conversation.
The visual language throughout is conversational and clean: no complex card compositions, no
ambient effects.

### Emotional Feeling

The visitor should feel as if the platform is listening. The question-answer flow creates a
dialogue, not a brochure. The personalized result should feel earned — "this platform recommended
this because it knows my answers", not "this is generic content for everyone."

### Main User Journey

1. Visitor lands on "What do you want to achieve?" — three choices, large tap targets.
2. Visitor taps one. Same-viewport transition to "How much time can you dedicate?" — three choices.
3. Visitor taps one. Same-viewport transition to "What's your current level?" — three choices.
4. After three answers: page transitions (slide up) to personalized landing state: recommended portal name, six-week plan summary, and AI Mentor pre-loaded with a personalized question.
5. Two CTAs appear: "Start this plan free" and "Ask the mentor a question."
6. Below the personalized result: compact social proof strip and secondary portal links.

### Section Structure

1. Question flow hero (three questions, same viewport, slide transitions between questions)
2. Personalized result state (portal recommendation + plan + mentor demo)
3. Social proof strip
4. Secondary portal navigation (for visitors who want to explore beyond the recommendation)
5. Registration CTA

### Signature Interaction

The viewport-locked question transition: each question slides the current view upward as the next
question slides in from below. The progress indicator (three dots or "2 of 3") updates. The
transition takes 400ms with a spring ease. No scroll occurs — the visitor stays at the top of the
page throughout. On reduced motion: questions appear and disappear without translation, using
opacity only.

### Library Mix

- Framer Motion: question transition slide animation, personalized result reveal, reduced-motion fallback
- shadcn/ui: large tap-target answer buttons (custom class applied to shadcn Button primitive)
- HeroUI: registration form in Section 5
- Magic UI: animated gradient text for the question text (optional, can be removed)
- Aceternity: none — question flow must be clean and uncluttered

### Content Preserved / Merged / Moved

- Preserved: PathSelector question logic (level, goal, dailyTime, interest), `getRecommendedPath` function, MentorShowcase
- Merged: PathSelector four questions collapse to three; dailyTime and interest are merged or one is dropped
- Moved: Portal discovery moves below the personalized result, as secondary navigation
- Removed: ScrollStackSection, EcosystemMap, MarqueeStrips, Premium3DShowcaseCarousel, CinematicIntro, HowItWorks (folded into personalized result), WhyDarhous

### Strengths

- Highest personalization signal of all five directions — every visitor gets a different recommended state
- The question flow creates commitment before showing any product content, reducing bounce
- Mobile-first by design — the viewport-locked question flow works better on mobile than on desktop

### Risks

- Visitors who want to browse before committing may be frustrated by the forced question sequence
- Requires a "skip / show me everything" escape hatch that is easy to find but does not undermine the flow
- The personalized result must be meaningfully different for each combination, or visitors will notice it is not truly personalized

### Estimated Complexity

High

### Why This Is Clearly Different from the Current Homepage

The current homepage presents all content to all visitors with no personalization gate. Direction 5
makes personalization mandatory before showing any product content. The viewport-locked question
flow has no analogue in the current design — no section, no component, no interaction matches it.
The entire above-fold experience is question-and-answer, not hero-and-scroll.
