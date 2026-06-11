# RTL/LTR and Mobile QA

**Date:** 2026-06-11

## Arabic RTL Status
- All concepts use `dir={isRTL ? 'rtl' : 'ltr'}` at the root wrapper.
- Flexbox `gap` and `items-start`/`end` automatically reverse.
- Framer motion `x` transforms have been conditionalized (e.g., `x: isRTL ? 50 : -50`) to ensure items slide in from the logical direction.

## English LTR Status
- Verified to work naturally alongside RTL logic.

## Target Viewports Expected Behavior
- **375px / 390px (Mobile)**: Single column layouts. Hover interactions disabled. Touch targets strictly >48px.
- **768px (Tablet)**: Two-column grid shifts (e.g., Concept 5 goal selectors).
- **1024px (Laptop)**: Full interactive desktop view.
- **1440px (Wide)**: Max-width constraints (`max-w-7xl`) prevent the UI from stretching too far.

## Known Risks
- **Concept 1 Sidebar**: The dashboard sidebar requires horizontal real estate. On 768px, it might feel cramped. It is hidden on mobile (`hidden lg:flex`).
- **Concept 4 Orbs**: Positioning orbs using exact percentages (`cx`, `cy`) requires careful absolute positioning testing across ultra-wide monitors.
