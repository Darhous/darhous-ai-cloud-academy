# Public UX and Visual Features Audit

## Implemented and Mounted

`src/components/landing/HomepageClient.tsx` mounts:

- Cinematic intro with progress and skip behavior
- Hero
- Learning path selector
- Ecosystem map
- Portal card grid
- Mentor showcase
- How-it-works section
- Why Darhous section
- Statistics
- Final CTA
- Smart Platform Tour component

Mouse-reactive surfaces, magnetic buttons, background motion, reduced-motion checks, RTL/LTR switching, and mobile layouts are present in code.

## Visibility Problems

- `SmartPlatformTour.tsx` initializes `open` to false. Its delayed `setOpen(true)` trigger is commented out and no manual opening control was found. It is mounted but effectively invisible.
- Cards and paths are below the cinematic intro and hero, so a visitor who does not scroll will not see them.
- The implementation is a sequence of sections; a distinct, explicit “scroll as stations” interaction was not found.
- English portal cards display Arabic feature chips because `portal.features` has no localized variants.
- Modal-style intro/tour code does not show a complete focus-trap/focus-return implementation.

## Conclusion

The requested cards, paths, ecosystem, and motion system exist in code and are reachable on the homepage. One major requested motion/tour element is unreachable, and the exact station-style experience is not clearly implemented.

