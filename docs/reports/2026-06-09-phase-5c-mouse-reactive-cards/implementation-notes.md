# Implementation Notes

* Created `InteractiveSurface.tsx` as a reusable component that tracks pointer coordinates and applies CSS variables (`--pointer-x`, `--pointer-y`, `--tilt-x`, `--tilt-y`).
* Utilized Framer Motion's `useReducedMotion` hook to disable the effect appropriately.
* Included an overlay inside `InteractiveSurface` that renders a `radial-gradient` using `mix-blend-screen` to act as a spotlight cursor hover effect.
* Replaced `div` wrappers with `InteractiveSurface` inside `PortalCard.tsx` and `EcosystemMap.tsx`.
* Wrapped the Chat command center in `MentorShowcase.tsx` with `InteractiveSurface`.
* Implemented `MagneticButton.tsx` for the primary CTA within `FinalCTA.tsx`. It uses JS-based pointer distance tracking to slightly pull the element in the direction of the cursor.
* All pointer effects are explicitly bound to `e.pointerType === "mouse"` to avoid breaking touch/mobile interaction patterns.
* No existing global `SmartPlatformTour` logic was altered.
