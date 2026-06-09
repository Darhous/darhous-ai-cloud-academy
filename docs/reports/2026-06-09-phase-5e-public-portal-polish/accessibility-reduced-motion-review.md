# Accessibility & Reduced Motion Review

## Motion Sensitivity Handling
The newly added `CinematicIntro` progress bar respects the user's OS-level motion preference. 
- If `prefers-reduced-motion` is detected, `useReducedMotion()` returns `true`.
- The `CinematicIntro` component evaluates `if (seen || shouldReduce) setShow(false)`.
- As a result, the entire intro component is suppressed. The progress bar safely inherits this behavior and causes no animation distress.

## Interactive Elements Focus State
- Portal Cards and map interactions are fully keyboard navigable (`Link` objects with standard focus behaviors).
- Links in `HeroSection`, `EcosystemMap`, and `FinalCTA` maintain visible focus states through the global framework settings.
- The `ComingSoonPortal.tsx` utilizes accessible button behaviors and color contrasts that adhere to AA standards.
