# Motion and Interaction Review

## Pro Max Rules Applied

- Animate one or two key elements per view.
- Use 150–300ms for micro-interactions.
- Avoid continuous decorative animation.
- Do not rely on hover for primary actions.
- Respect `prefers-reduced-motion`.
- Avoid scale transforms that shift or destabilize dense layouts.

## Current Strengths

- Global reduced-motion block exists.
- Framer Motion components often use `useReducedMotion`.
- Motion timing tokens exist.
- Buttons include active feedback.
- Dropdowns are clickable, not hover-only.

## Motion Inventory

- Rotating hero words.
- Hero entrance sequence.
- Ambient orb breathing/drift.
- Progress bar growth.
- Pulse and bounce indicators.
- Two infinite marquees.
- Sticky scroll-stack transforms.
- 3D showcase carousel.
- Ecosystem radar.
- Mentor typing and bounce dots.
- Timeline line growth and infinite dot pulses.
- Magnetic CTA.
- Ripple and shimmer effects.
- Page transition.

This exceeds the Pro Max “1–2 key elements” guidance.

## Recommendations

### Keep

- Short hero entrance.
- Progress feedback tied to real state.
- One portal discovery interaction.
- Button hover/focus color/shadow feedback.
- Loading spinner/skeleton motion.

### Remove or Demote

- Second marquee.
- Infinite timeline pulses.
- CTA ripple loop.
- Multiple orb animations.
- Simultaneous sticky stack and 3D carousel.
- Bounce on the scroll hint after initial discovery.

### Interaction Corrections

- Replace card `hover:scale-105` with border/accent/elevation.
- Keep micro-interactions at 150–250ms.
- Use `ease-out` for entry and `ease-in` for exit.
- Do not style non-clickable spans as `cursor-pointer`.
- Ensure touch actions have pressed/selected states independent of hover.

## Performance Risk

Fixed blurred layers, backdrop filters, and multiple Framer Motion observers can increase paint/compositing work. On mobile:

- Make atmosphere static.
- Avoid fixed blur larger than the viewport.
- Lazy-load below-fold showcases.
- Render static portal cards under reduced motion and low-width breakpoints.

## Acceptance

- No more than two continuous animated regions in a viewport.
- Reduced-motion mode contains no continuous decorative animation.
- Interaction feedback completes within 300ms.
- No hover causes layout shift.
- Scroll remains native; no scroll-jacking.
