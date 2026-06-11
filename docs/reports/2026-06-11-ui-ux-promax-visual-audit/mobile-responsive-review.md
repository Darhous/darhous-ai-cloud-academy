# Mobile and Responsive Review

## Pro Max Viewport Matrix

| Width | Required focus |
|---|---|
| 375px | Small iPhone, no horizontal overflow, 44px controls |
| 390/393px | Common iPhone/Android, card rhythm and CTA fit |
| 768px | Tablet portrait, navigation and two-column transitions |
| 1024px | Tablet landscape/small desktop, dropdown fit |
| 1440px | Desktop hierarchy and max-width discipline |

## Code-Based Findings

- The shared `.container-xl` uses 24px side padding. At 375px this leaves 327px content width, workable but tight for dense multi-action cards.
- Hero actions stack under `sm`, which is correct.
- Portal cards flatten on mobile rather than using sticky scroll, which reduces risk.
- The hero dashboard uses 2 columns on mobile and can become text-dense.
- Footer and navigation expose many stacked links.
- Auth cards use 32px padding; at 375px the available form width becomes narrow but usable.
- Several icon-only controls are 36px or smaller.
- Large fixed/blurred page backgrounds can increase mobile compositing cost.

## High-Risk Components

1. Mobile navigation drawer with portal and AI Studio accordions.
2. Hero command-center mockup with progress cards and small labels.
3. Two continuous marquee strips.
4. 3D showcase carousel.
5. Dense PathSelector options.
6. Digital Exams hero CTA card.
7. Dashboard tables/cards and admin panels.
8. IoT/Automation long content lists.

## Required Fixes

- Set icon-only buttons and social links to `min-width/min-height:44px`.
- Ensure 8px minimum spacing between adjacent controls.
- Disable fixed blur/orb animation below 768px.
- Limit homepage to one continuous animation on mobile.
- Use `overflow-wrap:anywhere` for IDs, URLs, certificate codes, and long English tool names.
- Make mobile footer groups collapsible.
- Ensure sticky mentor/scroll-to-top buttons do not overlap auth and exam actions.
- Add safe-area padding for bottom-fixed controls.
- Use horizontal card scrollers only when the next item is visibly peeking; otherwise stack.

## Tablet

At 768px, multiple components switch to desktop-like two-column layouts. Verify that the navbar remains in mobile mode until sufficient width and that portal hero cards do not produce asymmetric empty space. The 3D carousel and sticky stack should not both use scroll capture in tablet landscape.

## Acceptance Criteria

- Zero horizontal scroll at every target width.
- All actionable controls measure at least 44x44px.
- Body text is at least 16px where sustained reading occurs.
- No fixed element covers focused inputs or primary CTAs.
- Reduced-motion mode removes marquees, sticky transforms, typing, pulses, and carousel movement.
- Mobile Lighthouse performance is measured after a production deployment.

## Limitation

The internal visual browser was unavailable during this audit. These code-based findings must be closed with real screenshots and touch testing before launch.
