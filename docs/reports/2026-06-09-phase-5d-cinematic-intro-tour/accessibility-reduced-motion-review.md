# Accessibility and Reduced Motion Review

## Reduced Motion
The CinematicIntro strictly leverages useReducedMotion() from ramer-motion. If shouldReduce is true, the intro immediately unmounts itself without any animations or artificial delays, bypassing the 2.8s timer completely.

## Keyboard Accessibility
The intro supports keyboard dismissing via the Escape, Enter, or Space keys to allow power users to skip the animation safely. Additionally, it contains a visible "Skip" button.