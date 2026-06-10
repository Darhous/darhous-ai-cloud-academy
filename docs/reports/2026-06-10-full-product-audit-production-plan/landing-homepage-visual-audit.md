# Landing / Homepage Visual Audit
**Routes audited:** `/ar` (primary), `/en`

---

## Component Rendering Order (HomepageClient.tsx)

```
1. CinematicIntro        — Splash screen overlay (sessionStorage-gated)
2. SmartPlatformTour     — Platform intro carousel (DISABLED, never shows)
3. HeroSection           — Main headline + CTA
4. PathSelector          — Beginner/Intermediate/Advanced path chooser
5. EcosystemMap          — 6-portal grid + AI Mentor center card
6. PortalGrid            — Portal cards with staggered fade-in
7. MentorShowcase        — AI Mentor feature section
8. HowItWorks            — 3-step explanation
9. WhyDarhous            — Value props
10. Stats                — Platform statistics
11. FinalCTA             — Final call to action
12. CommunitySignup      — Email subscription
```

---

## Section-by-Section Audit

### CinematicIntro
- **Implementation:** Full-screen overlay with "NexaLearn" brand text, animated progress bar, auto-dismiss after 2.8s
- **Visibility Issue:** Shows ONCE per session (sessionStorage key). On second visit in same session: invisible. On reduced-motion: invisible.
- **Content:** Shows "NexaLearn" — inconsistent with "Darhous AI Cloud Academy" branding elsewhere
- **Accessibility:** Has role="dialog", aria-modal, keyboard dismiss (Escape/Enter/Space)
- **Problem:** Owner likely can't see it because sessionStorage already has the "seen" flag

### SmartPlatformTour
- **Implementation:** 5-step carousel explaining platform features
- **Visibility:** NEVER SHOWS — auto-open logic is commented out
- **Code comment:** `// DISABLED IN PHASE 5D: To prevent intrusive auto-start behavior`
- **Dead code:** The entire component is wired but dead
- **Verdict:** Remove or re-enable with a trigger button

### HeroSection
- **Headline:** "تعلّم بذكاء. ابنِ بمهارة. تقدّم بثقة." / "Learn Intelligently. Build Skillfully. Advance Confidently."
- **Animations:** framer-motion fade-up, controlled, reduced-motion safe
- **CTA buttons:** "ابدأ مسيرتك" / "Start Your Journey" + AI Mentor link
- **OS Dashboard visual:** Shows 6 portals with simulated progress bars (decorative only)
- **Badge text:** "NexaLearn by Darhous — الجيل القادم للتعلم" — uses NexaLearn brand
- **Verdict:** Functional. Needs branding alignment.

### PathSelector
- **Purpose:** Beginner/Intermediate/Advanced path selection
- **Visible:** Yes, with expand/collapse animations
- **Issue:** Static hardcoded content, not CMS-driven
- **Verdict:** Good UX concept, works correctly

### EcosystemMap
- **Purpose:** Shows 6 portals around AI Mentor center
- **Layout:** 3-3 grid with Mentor card in the center of middle row
- **Code issue:** Uses `portals[0]`, `portals[1]`, `portals[2]`, `portals[3]`, `portals[4]`, `portals[5]` with full JSX duplication instead of `.map()` — major scalability problem
- **InteractiveSurface:** Applied to all cards, tilt effect works on hover
- **Missing:** Seventh portal (Cloud) — not in portals config, not shown here
- **Verdict:** Functional but unscalable code

### PortalGrid
- **Purpose:** Grid of all portals with staggered entrance
- **Animations:** whileInView stagger with 0.06s delay per card
- **Cards:** Uses `PortalCard` component from `/ecosystem/PortalCard.tsx`
- **Status badges:** Available/Beta/Coming Soon rendered per portal.status
- **Cloud portal:** NOT shown (not in portals array)
- **Verdict:** Works well visually

### MentorShowcase, HowItWorks, WhyDarhous
- **All:** Static content sections, fade-up on scroll
- **Content:** Arabic only or bilingual based on locale prop
- **Verdict:** Functional

### Stats Section
- **Content:** Shows platform statistics (hardcoded numbers)
- **Verdict:** Works

### FinalCTA + CommunitySignup
- **FinalCTA:** Links to /register — functional
- **CommunitySignup:** Email subscription form — needs Supabase for storage
- **Verdict:** UI works, backend depends on Supabase env

---

## RTL/LTR Behavior
- Homepage uses `locale` prop correctly for text direction
- Layout sets `dir` on `<html>` and `<body>` correctly
- `HomepageClient` passes `locale` to all sections
- Most sections are bilingual via `isAr ? ... : ...`
- **Verdict:** RTL/LTR handled correctly on homepage

---

## Mobile Behavior
- Responsive Tailwind classes used throughout
- No mobile-specific layout tested (audit environment, no browser)
- `overflow-x-hidden` on wrapper prevents horizontal scroll
- **Risk:** Large EcosystemMap grid on mobile (sm:grid-cols-3 → 1 column on mobile is correct)

---

## Phase 5D Visual Changes Integration
- CinematicIntro was added in Phase 5D ✅
- SmartPlatformTour was DISABLED in Phase 5D ✅ (but intentionally)
- InteractiveSurface 3D tilt was added in Phase 5C ✅
- No stacked card effect was added in any phase ✅ (confirmed)

---

## Summary

| Element | Status | Owner Can See? |
|---------|--------|----------------|
| CinematicIntro | Exists, sessionStorage-gated | Only on first session visit |
| SmartPlatformTour | Disabled | Never |
| Hero Section | Functional | Yes |
| PathSelector | Functional | Yes |
| EcosystemMap + cards | Functional, tilt-on-hover | Yes (tilt subtle) |
| PortalGrid | Functional | Yes |
| Stacked scroll card effect | NOT IMPLEMENTED | N/A |
| Branding "NexaLearn" vs "Darhous" | Inconsistent | Mixed signals |
