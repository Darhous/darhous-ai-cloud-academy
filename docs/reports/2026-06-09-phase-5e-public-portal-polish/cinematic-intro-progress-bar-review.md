# Cinematic Intro Progress Bar Review

The project owner requested a subtle loading/progress bar in the cinematic intro.

## Design Decisions
- **Height & Width:** Set to a sleek `2px` height with a maximum width of `220px` to keep it subtle and premium.
- **Glow Effect:** Applied a linear gradient and an outer box shadow `boxShadow: "0 0 10px var(--color-primary)"` to match the brand aesthetic.
- **Timing:** Synchronized the progress fill animation to last `2.2s` after a `0.3s` initial delay, naturally completing just before the `2.8s` auto-dismissal.
- **RTL Support:** Used a dynamic `transformOrigin` (`isAr ? "right" : "left"`) to ensure the bar fills from the correct direction depending on the active locale.
- **No Extra Dependencies:** Achieved entirely with Framer Motion, avoiding external libraries, videos, or Canvas/WebGL.

The progress bar is successfully integrated into the intro modal.
