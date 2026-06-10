# Implementation Notes

## Desktop Scroll Math

The section owns one `useScroll` instance:

```ts
useScroll({
  target: containerRef,
  offset: ["start start", "end end"],
});
```

Each card is rendered through `StackedCard`, keeping `useTransform` hooks outside the portal map. The stack has `min-height: 175vh`. Cards have a minimum height of `22rem`; after the first card, each card uses:

```ts
marginBlockStart: "calc(-22rem + 15vh)"
```

This compresses the normal document flow to roughly `15vh` per new card while preserving sticky positioning. The sticky offset is:

```ts
top: 90 + index * 28
```

The 28px increment leaves a visible edge for every pinned card.

## Recede Window

For every card except the last:

```ts
recedeStart = (index + 0.35) / (total - 1)
recedeEnd = (index + 1) / (total - 1)
```

Within that clamped window:

- Scale moves from `1` to `0.82`.
- Opacity moves from `1` to `0.35`.
- A pointer-transparent black overlay moves from `0` to `0.5` opacity.

The final card remains fully scaled, fully opaque, and undimmed. A sticky logical-end counter exposes the active deck position as `01 / 08` through `08 / 08`.

## Reduced Motion

Reduced motion does not use a grid. It renders the same large cards in one centered column, applies a small negative block-start overlap (`-mt-4`, `md:-mt-8`), increases z-index by portal order, and adds a drop shadow. There is no scroll-driven animation and all card content remains readable.

## Mobile

Below `md`, cards render as large, full-width `PortalCard` instances in a single vertical flow with no horizontal layout or scroll.

## Directionality

The implementation uses logical positioning (`marginBlockStart` and `ms-auto`) so the deck and counter work in both RTL and LTR layouts.
