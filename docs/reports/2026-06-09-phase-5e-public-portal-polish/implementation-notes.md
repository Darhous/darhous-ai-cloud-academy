# Implementation Notes

## 1. Cinematic Intro Progress Bar
**File:** `src/components/landing/CinematicIntro.tsx`

We added a sleek, non-blocking `framer-motion` progress bar directly beneath the `NexaLearn by Darhous` brand text.
- **Styling:** Max-width of 220px, 2px height, with a premium `primary` color glow.
- **Animation:** Expanding `scaleX` from 0 to 1 over 2.2 seconds.
- **Reduced Motion:** Fully hidden if `useReducedMotion()` is true, since the entire `CinematicIntro` overlay returns `null`/`false` and is not rendered for users with reduced motion enabled.

## 2. Ecosystem Map Portal Badges
**File:** `src/components/landing/sections/EcosystemMap.tsx`

The ecosystem map's portal nodes had hardcoded UI snippets that assumed every portal rendered is fully "Live/متاح", breaking consistency if the portal status is updated to `beta` in `portals.ts`.
- **Change:** Extracted an inline helper function `s` that mirrors the robust logic from `PortalCard.tsx` mapping portal `status` to dynamic badges (Available, Beta, Coming Soon).
- **Application:** Replaced the 4 hardcoded badge checks in `EcosystemMap.tsx` with this dynamic block.
