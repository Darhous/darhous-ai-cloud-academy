# Accessibility and Reduced Motion Review

## Reduced Motion
* `InteractiveSurface.tsx` consumes the `useReducedMotion` hook from `framer-motion`.
* When `shouldReduce` is `true`, no pointer event listeners are registered, avoiding unnecessary JavaScript execution.
* The CSS transform logic falls back cleanly to static `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`.
* `MagneticButton.tsx` implements the exact same reduced motion safeguard.

## Mobile and Touch Devices
* By strictly listening for `pointerType === "mouse"`, we ensure touch inputs (which also fire pointer events) do not trigger sticky hover states or jumpy tilt effects on mobile devices.
* Touch interactions remain completely native.

## Keyboard Accessibility
* The components do not alter tab indexes or semantic structure. `<Link>` elements inside the surfaces receive the standard browser/theme focus outlines. Focus indicators remain on top.
