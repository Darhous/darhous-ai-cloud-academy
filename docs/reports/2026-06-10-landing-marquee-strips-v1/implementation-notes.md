# Implementation Notes

## MarqueeStrip

`MarqueeStrip` accepts:

```ts
{
  items: string[];
  locale: string;
  speed?: "slow" | "normal" | "fast";
}
```

- Arabic selects `marquee-track-rtl`.
- Other locales select `marquee-track`.
- Items are duplicated once inside the same track for a seamless loop.
- Every entry uses the `marquee-item` class and renders a middle-dot separator.
- Existing track animations are reused; speed changes only their inline `animationDuration`.
- Borders, typography, spacing, and token-based text color are local Tailwind/inline styles.
- No global CSS was added or changed.

## Reduced Motion

`useReducedMotion()` replaces the animated track with a static centered `flex-wrap` row. Items are rendered once and remain fully readable.

## Homepage Placement

Both strips are grouped with zero gap immediately after `HeroSection` and immediately before `ScrollStackSection`.

The first strip follows the page locale direction. The portal strip passes the inverse track locale, producing counter-directional movement without adding a new direction prop or CSS.

## Portal Registry Compatibility

The current registry exposes `titleAr` and `titleEn`, not `nameAr` and `name`. The portal strip maps all eight portals through those actual localized title fields. Portal data and links are unchanged.
