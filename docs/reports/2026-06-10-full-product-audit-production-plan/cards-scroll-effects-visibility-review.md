# Cards, Scroll Effects & Visibility Review
**Status: CONFIRMED — Stacked/layered scroll card effect does NOT exist in the codebase**

---

## Owner's Observation
> "The owner does NOT see the expected landing cards / stacked scroll card effect live. The previous plan mentioned cards and a scroll-over-card / layered card effect, but the owner reports that these cards/effects are not visible."

**Verdict: Owner is correct. The effect was never implemented.**

---

## What Was Promised vs What Was Built

### Phase 5B (Homepage Pro Max Redesign)
Reports described a "full homepage pro max redesign." Inspection shows:
- `HeroSection` — fade-up animation with `framer-motion` whileInView
- `PathSelector` — standard grid layout
- `EcosystemMap` — portal cards with `InteractiveSurface` (tilt-on-hover)
- `PortalGrid` — staggered fade-up grid using `motion.div` with `staggerChildren`
- `MentorShowcase`, `WhyDarhous`, `HowItWorks` — standard sections

**No scroll-based stacking, layering, or parallax card effect exists.**

### Phase 5C (Mouse Reactive Card System)
Reports described "mouse reactive card system." Inspection shows:
- `InteractiveSurface.tsx` component was added
- Provides: 3D tilt (rotateX/Y) on mouse pointer move, up to `tiltMax` degrees
- Provides: spotlight radial gradient that follows the pointer
- Provides: subtle `translateY(-8px)` or `scale(1.02)` on hover

**This is a HOVER effect (pointer-only, mouse-only), NOT a scroll effect, NOT a stacking effect. On mobile, reduced-motion, or without active hover, it is invisible.**

---

## Why the Owner Cannot See the Cards/Effects

### 1. SmartPlatformTour — DISABLED
```js
// DISABLED IN PHASE 5D: To prevent intrusive auto-start behavior.
// useEffect(() => {
//   let seen = true;
//   try { seen = window.localStorage.getItem(STORAGE_KEY) === "1"; } catch { seen = true; }
//   if (seen) return;
//   const t = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
//   return () => clearTimeout(t);
// }, []);
```
**The tour never auto-opens. It requires `setOpen(true)` to be called explicitly. There is no UI button to trigger it from the public page.**

### 2. CinematicIntro — sessionStorage-Gated
```js
const STORAGE_KEY = "darhous-cinematic-intro-seen-v1";
// After first view, sessionStorage["darhous-cinematic-intro-seen-v1"] = "1"
// On subsequent page loads in the same session → show = false immediately
// On reduced-motion device → show = false immediately (shouldReduce = true)
```
**If the owner has already visited the page in the current browser session, the intro is invisible. If they use reduced-motion settings, it never shows.**

### 3. No Stacked Card Effect in Code
Searched entire codebase for:
- `stacked-card`, `card-stack`, `stack-card` → **0 results**
- `scroll-card`, `layered-card` → **0 results**  
- `parallax` → **0 results**
- `sticky` with card context → **0 results**

Only found: `InteractiveSurface` (tilt-on-hover, subtle)

### 4. InteractiveSurface Tilt Is Too Subtle to Notice
- Max tilt: 2-3 degrees (very small)
- Only activates on mouse pointer (not touch)
- Requires reduced-motion to be OFF
- Requires the user to be hovering over specific cards
- The visual effect is almost invisible unless you know to look for it

### 5. PortalGrid Stagger — Might Be Invisible on Fast Connections
The `whileInView` stagger animation triggers only once (once: true) and only when the element enters viewport. If the user doesn't scroll or the viewport captures the cards immediately on load, the animation may be imperceptible.

---

## What Exists vs What's Missing

| Effect | Exists | Visible | Notes |
|--------|--------|---------|-------|
| CinematicIntro splash | ✅ | ❌ gated by sessionStorage | Shows once per session; disabled for reduced-motion |
| SmartPlatformTour | ✅ (code) | ❌ disabled | Auto-open commented out in Phase 5D |
| 3D tilt on hover (cards) | ✅ | ⚠️ subtle | Only 2-3 degrees, mouse-only |
| Spotlight on hover (cards) | ✅ | ⚠️ subtle | Low opacity radial gradient |
| Fade-up scroll animation | ✅ | ✅ | Standard whileInView, fires once |
| Staggered card entrance | ✅ | ✅ | Grid cards stagger on scroll-in |
| Stacked card scroll effect | ❌ | ❌ | NEVER IMPLEMENTED |
| Layered card parallax | ❌ | ❌ | NEVER IMPLEMENTED |
| Scroll-over/under cards | ❌ | ❌ | NEVER IMPLEMENTED |
| Mouse-follow glow (landing) | ❌ | ❌ | Not found in landing sections |

---

## Repair Recommendation

To address the owner's observation:

1. **Re-enable SmartPlatformTour** — uncomment the auto-open useEffect or add a visible "Platform Tour" button on the landing page.
2. **Implement real stacked-card scroll effect** — sticky positioning with z-index layering so cards stack visually as user scrolls past them.
3. **Make InteractiveSurface more visible** — increase tilt to 6-8 degrees, add stronger spotlight, add entrance glow.
4. **CinematicIntro enhancement** — add a "replay" button in the navbar or use localStorage instead of sessionStorage so it only shows once total (not once per session).
5. **Full landing redesign station** — plan as one focused station targeting only the landing page visual experience.
