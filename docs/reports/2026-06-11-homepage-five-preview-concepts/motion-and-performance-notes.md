# Motion & Performance Notes

**Date:** 2026-06-11

## Motion Inventory per Concept
1. **AI Command Center**: Medium-High. Status bars counting up, dashboard panels sliding in.
2. **The Learning Journey**: Medium. Scroll-triggered fading of journey milestones.
3. **Silent Authority**: Low. Opacity fades, subtle line expands on hover. No layout translation.
4. **Portal Constellation**: Very High. Expanding 3D orbs, background color morphing, scale transforms.
5. **Goal Gateway**: Medium. Same-viewport slide transitions, spring animations.

## Fallback Strategies
- **Reduced-Motion (`useReducedMotion` hook)**: Implemented across all concepts. When enabled:
  - Slide/Translate transforms are set to `0`.
  - Spring animations are replaced with instant opacities or disabled entirely.
  - Concept 4 (Constellation) disables the orb hover scale and simplifies the background transition.
- **Mobile Fallback**:
  - Hover states map to tap states.
  - Complex horizontal grids (Concept 1 Dashboard) collapse to single columns.
  - Concept 4 Constellation layout falls back to a staggered vertical list on very small screens.

## Risk Assessment
- **Safest Concept**: Concept 3 (Silent Authority). Extremely lightweight DOM, no complex transforms.
- **Most Cinematic / Highest Risk**: Concept 4 (Portal Constellation). Heavy use of shadows, blur filters, and `AnimatePresence`. Requires testing on low-end Android devices for frame drops.
