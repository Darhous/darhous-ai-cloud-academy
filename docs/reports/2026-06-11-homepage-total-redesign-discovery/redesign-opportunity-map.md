# Redesign Opportunity Map

**Date:** 2026-06-11
**Project:** NexaLearn by Ahmed Darhous
**Scope:** Complete homepage architecture redesign — opportunity analysis and section blueprint

---

## Context

The current homepage was diagnosed in the 2026-06-11 visual audit with a conversion score of 61/100.
Its primary structural failure is section accumulation: twelve distinct sections with competing
motion, duplicate portal discovery, and no clear dominant narrative thread. The hero has three
competing CTAs that perform the same action. The page explains breadth at the cost of depth.

This map defines a fundamentally different architecture — fewer sections, stronger sequencing,
and a clear single conversion path from first pixel to registration.

---

## New Homepage Section Architecture

| # | Section | Goal | Current Content Feeding It | Recommended Library | Motion Idea | Mobile Behavior | RTL Notes | Risk | Complexity |
|---|---------|------|---------------------------|--------------------|-----------------------------|-----------------|-----------|------|------------|
| 1 | **Outcome-First Hero** | Convert the skeptic in one scroll height. Show the result, not the platform. | H1, subtitle, proof points, badge from `HeroSection.tsx` | Framer Motion (existing) + one Magic UI animated gradient text fragment for the headline keyword | One slow headline keyword gradient cycle; no orbs, no bounce; scroll-driven opacity fade on scroll-down | Full-width, single column, CTA below fold is acceptable, no floating elements | `dir="rtl"` on section root; ensure headline gradient reads right-to-left naturally; CTA arrow flips | Low — existing motion system, no new dependencies | Low |
| 2 | **Instant Trust Strip** | Defeat the "is this real?" objection before the user scrolls | Stats from `Stats` component; proof points from HeroSection; community data from `CommunitySignup` | shadcn/ui horizontal scroll strip on mobile | Count-up animation on viewport enter; no continuous motion afterward | Horizontal scrollable pill strip; no grid | RTL number formatting; Arabic ordinal labels | Low — stat data already in codebase | Low |
| 3 | **Goal Gateway** | Let the visitor self-identify in one tap. Replace the buried PathSelector with a visible entry gate. | PathSelector level/goal/interest buttons; mentor routing | HeroUI `Tabs` or `ButtonGroup` for the three primary goal paths | Selected tab pulses once on click; tab indicator slides smoothly | Full-width stacked; tabs become a horizontal scroll strip | Tab labels and icon positions must flip; selected indicator anchors correctly in RTL | Medium — replaces PathSelector without breaking it | Medium |
| 4 | **Living Portals** | Show all seven portals as individually distinct worlds, not a uniform card grid. One portal at a time, driven by the Goal Gateway selection. | ScrollStackSection portal cards; EcosystemMap portal data; portals config (`src/config/portals.ts`) | Framer Motion `AnimatePresence` for portal switching; Aceternity bento for featured portal story panel | Active portal slides in horizontally; background atmosphere shifts to portal accent color; previous portal fades | Accordion of portals by goal cluster; no sticky behavior on mobile | Directional slide animation must reverse for RTL; portal accent used for border and glow, not text color | High — replaces both ScrollStackSection and EcosystemMap | High |
| 5 | **AI Mentor Live Demo** | Show the mentor doing something real — not a static mockup with a fake typing animation. The demo should feel like a product screenshot, not marketing art. | MentorShowcase typing animation; PathSelector recommended plan output | Existing Framer Motion for entrance; HeroUI for the chat input styling | Typing cursor blinks; mentor response fades in character by character; no looping after done | Full-width card; chat bubble max-width 100%; send button is 44px min | Bubble border-radius asymmetry is already RTL-aware in existing code; preserve this | Low — component already exists; simplify and elevate it | Low |
| 6 | **Verified Outcomes** | Replace abstract features ("8 features") with concrete learner results. Certificates, project counts, career outcomes. | WhyDarhous features grid; Stats component; HowItWorks | shadcn/ui card primitives for outcome evidence cards | Stagger entrance on viewport; no hover transforms greater than 2px | 2-column on mobile; no horizontal scroll | Feature text fully localized; icon sizes consistent 20px | Low | Low |
| 7 | **Journey in Three Steps** | Collapse the four-step timeline into three bold, readable steps. Remove the vertical timeline gutter; use horizontal sequence on desktop. | HowItWorks four steps (collapse step 3+4) | Existing Framer Motion; no new library | Step number scales up on enter; connector line draws left-to-right (right-to-left for RTL) | Vertical stacked; number above label | Connector line direction reverses; step numbers remain in Arabic-Indic numerals when `isAr` | Low | Low |
| 8 | **Social Proof + Community** | One surface that shows real learner activity and a zero-friction email capture. Replaces the bottom CommunitySignup + duplicate final CTA ending. | CommunitySignup component; community learner data | HeroUI `Input` for email field; Framer Motion entrance | Input glow on focus; submit button ripple once on click | Full-width, single input + button row | `dir="rtl"` input alignment; placeholder text in Arabic | Low | Low |
| 9 | **Final Registration CTA** | One unambiguous closing action. Outcome-framed. No "Now or Never" pressure. | FinalCTA section | Existing glass panel; MagneticButton | Subtle background shimmer on mouse proximity; no continuous ring | Stacked buttons, full-width on mobile | Button arrow direction flips; copy verified for both locales | Low | Low |

---

## Section Narratives

### Section 1 — Outcome-First Hero

**Problem it solves:** The current hero leads with the platform name and a rotating adjective. Visitors arrive asking "what will I be able to do?" — not "what is this platform called?". The rotating word (Learn / Build / Grow / Lead) answers this indirectly. The new hero leads with the outcome the learner will achieve, stated in one confident line, before naming the platform. The cinematic command center mockup currently appears below the hero and adds visual complexity before trust is established.

**What makes it different:** The current hero contains a cinematic mockup, three CTAs, two ambient orbs, a tech marquee, continuous pulse animations, a badge, a chevron bounce, and a RotatingWord — all in one viewport. The new hero contains a headline, one evidence line, and two CTAs. The only moving element is one keyword cycling between four colors, once every 2.4 seconds.

**Content mapping:** `HeroSection.tsx` headline text, subtitle, proof points, and the primary CTA button. The cinematic dashboard mockup is moved to the mentor demo section (Section 5) or removed. The TechMarquee is moved to the trust strip (Section 2) or removed. The RotatingWord is kept but limited to one animation per page load.

---

### Section 2 — Instant Trust Strip

**Problem it solves:** On the current homepage, stats appear at position 10 of 12, just before the final CTA. A visitor who leaves after the hero has seen zero external evidence. Trust signals must appear in the first scroll height or first 200px below the fold.

**What makes it different:** Today trust lives at the bottom. The new design puts one horizontal strip of four to six data points (learners, certificates, portals, questions in exam bank) directly below the hero, before any portal or product detail. This strip does not use glass panels or gradient cards — it is plain text with a subtle divider, letting the numbers speak.

**Content mapping:** The `Stats` component data. The proof point text from `HeroSection.tsx` (AI-Powered Paths, Interactive Labs, Mentorship). The community learner count from `CommunitySignup` if the data is real.

---

### Section 3 — Goal Gateway

**Problem it solves:** The PathSelector is buried at position 5 of 12 on the current page, and requires answering four questions before showing any result. Most mobile visitors never reach it. The new design makes goal selection the dominant transition point — the moment a visitor picks a goal, the rest of the page reorganizes to show only what is relevant to them.

**What makes it different:** The current PathSelector is a form inside a glass panel — it reads as a quiz widget, not a navigation decision. The new Goal Gateway is a top-level section with three large tap targets (Learn AI, Build a Career, Get Certified) that control what appears in Section 4. No four-question form — one tap and the page responds.

**Content mapping:** The `interest` and `goal` filter logic from `PathSelector.tsx`. The recommended path output can appear inside Section 4 (Living Portals), filtering which portals are shown first.

---

### Section 4 — Living Portals

**Problem it solves:** The current homepage shows portals twice: once as large sticky scroll cards (ScrollStackSection) and once as a 3x3 grid around a central AI Mentor card (EcosystemMap). Both show the same seven portals with the same card anatomy. The duplication consumes scroll real estate and forces the visitor to process the same information twice.

**What makes it different:** The new section shows one portal at a time in a large feature panel. The portal panel has a full-width background atmosphere using that portal's gradient and accent color. The left column shows portal identity (icon, title, status). The right column shows three concrete value statements, not five feature pills. A portal selector — driven by the Goal Gateway choice in Section 3 — determines which portal loads first. The visitor can tap through the others. This replaces both ScrollStackSection and EcosystemMap with one component.

**Content mapping:** Portal data from `src/config/portals.ts` — specifically `titleAr`, `titleEn`, `descriptionAr`, `descriptionEn`, `color`, `gradient`, `features`, `featuresEn`, `ctaAr`, `ctaEn`, `status`, and `href`. The portal's first three `featuresEn` entries become the value statements.

---

### Section 5 — AI Mentor Live Demo

**Problem it solves:** The current MentorShowcase shows a static chat mockup with a typewriter animation. The user message is pre-set. The mentor response is pre-written. After the typing completes, the mockup is inert. It reads as marketing illustration, not product.

**What makes it different:** The new demo keeps the chat format but shows it as an elevated product screenshot. The user message is linked to the Goal Gateway choice (if the visitor chose "Learn AI", the pre-set user message is about learning AI). The mentor's response includes a six-week plan that is also generated by the PathSelector logic. A real "Open Mentor" link is prominent and clearly labeled. The demo does not loop — it runs once and stops.

**Content mapping:** The `MentorShowcase.tsx` chat panel structure. The `getRecommendedPath` function from `PathSelector.tsx` feeds the mentor's suggested plan. The command-center mockup from `HeroSection.tsx` (the OS_ITEMS progress grid) can be incorporated as a sidebar within this section if it is positioned as "your learning overview after enrolling."

---

### Section 6 — Verified Outcomes

**Problem it solves:** The WhyDarhous section currently lists eight features in a 4x2 grid of icon-plus-text cards. These are product claims. The visitor has no way to verify them. "Premium UX" as a feature card is circular self-praise. The new section replaces claims with evidence.

**What makes it different:** Instead of eight features, the section shows four outcome types: certificates issued, projects completed, active learners, and portal-specific achievements. Each outcome has a real number, a one-sentence explanation, and a visual indicator (progress bar or count). A small quote from a learner (if real data exists) appears below. "One Account for All" and "Arabic-First Platform" become brief labels above the outcome grid, not individual cards.

**Content mapping:** WhyDarhous features are reduced and reframed. Stats component numbers are the primary evidence. The feature grid is not discarded — it becomes a compact two-column list of platform differentiators appended below the outcome evidence.

---

### Section 7 — Journey in Three Steps

**Problem it solves:** The current HowItWorks has four steps with a vertical timeline gutter that positions step numbers on the inline-end side. On mobile this creates an asymmetric layout where the text is full-width but a gutter eats 3rem of space at the end. The gutter concept is sound but the implementation creates RTL complexity when step numbers are on the wrong side.

**What makes it different:** Three steps instead of four (steps 3 and 4 — "Learn and Apply" and "Get Certified" — merge into one: "Learn, apply, and earn your certificate"). The layout is horizontal on desktop (three columns with a horizontal connector line) and vertical stacked on mobile (no gutter; step number is a large numeral above the text). The vertical timeline line is removed.

**Content mapping:** HowItWorks steps 1, 2, and 3+4 merged. Step text is rewritten to be shorter and more action-oriented.

---

### Section 8 — Social Proof and Community

**Problem it solves:** The `CommunitySignup` component currently appears at position 12 of 12, after the final CTA. The page has two endings. Social proof and community together should form one section that validates the decision to register before the final CTA asks for commitment.

**What makes it different:** One clean section with three elements: a one-sentence community headline, an email capture field with a zero-pressure label ("Join the waitlist" or "Get early access — free"), and a small strip of learner activity data. No card, no glass panel — a simple surface that contrasts with the surrounding dark glass panels by being slightly lighter.

**Content mapping:** `CommunitySignup.tsx` logic. The `source="ecosystem-home"` and `variant="hero"` props are preserved. Learner count from Stats.

---

### Section 9 — Final Registration CTA

**Problem it solves:** The current `FinalCTA` reads "Now or Never" — a pressure-based headline that undermines the platform's positioning as a trusted AI learning ecosystem. The call to action beneath it asks the visitor to start free, which is correct, but the framing around it introduces scarcity without evidence.

**What makes it different:** The new CTA uses an outcome headline: "Your first week is mapped. Your first portal is open. All that's left is you." or the Arabic equivalent. The glass panel background is the same. MagneticButton is preserved. The secondary CTA is "Try the AI Mentor" not a duplicate of the primary. The section does not use "Now or Never" or any countdown-style framing.

**Content mapping:** `FinalCTA.tsx` structure and button logic. MagneticButton. The ambient orb background is kept but reduced to one orb (currently two). The ripple ring animation on the primary CTA is preserved.

---

## Structural Comparison

| Current Section | New Architecture | Verdict |
|-----------------|-----------------|---------|
| CinematicIntro (lazy dialog) | Removed or deferred to onboarding flow | Remove |
| HeroSection | Section 1 — simplified | Keep, simplify |
| MarqueeStrip x2 | Section 2 trust strip (one static strip) | Replace |
| ScrollStackSection | Merged into Section 4 Living Portals | Merge |
| Premium3DShowcaseCarousel | Removed | Remove |
| PathSelector | Section 3 Goal Gateway + feeds Section 4 | Restructure |
| EcosystemMap | Merged into Section 4 Living Portals | Merge |
| MentorShowcase | Section 5 — elevated | Keep, elevate |
| HowItWorks | Section 7 — simplified to 3 steps | Simplify |
| WhyDarhous | Section 6 — reframed as outcomes | Reframe |
| Stats | Section 2 trust strip | Move up |
| FinalCTA | Section 9 — rewritten headline | Keep, rewrite |
| CommunitySignup | Section 8 — moved before final CTA | Move up |

**Net result:** 13 current sections and components collapse into 9 clearly distinct sections. Three duplicate portal discovery components become one. Two page endings become one.
