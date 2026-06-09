# Visual Acceptance Review

- **Premium Hierarchy**: Established. The headline uses a subtle metallic/glass gradient and sits above 3 clear proof points and highly contrasting CTAs.
- **Arabic-First**: Verified. "تعلّم بذكاء. ابنِ بمهارة. تقدّم بثقة." anchors the design.
- **Generic Glass Clutter**: Reduced. The old multi-layered UI mockup was replaced with a focused 2-panel "Command Center".
- **Responsive Mobile Layout**: Verified. Used `md:flex-row` and `hidden md:block` for the headline break.
- **Reduced-Motion Respect**: Verified. All custom animations in `HeroSection` explicitly disable or shorten their duration if `useReducedMotion()` is true.
- **Dark/Light Compatibility**: Verified. The `globals.css` utility classes provide explicit `html.light` overrides for shadows, borders, and backdrop layers to maintain contrast on bright backgrounds.
