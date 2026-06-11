# Design System Gap Analysis

## Current Foundation

The project has a useful token base in `src/app/globals.css`: dark/light surfaces, on-surface colors, primary/secondary/tertiary accents, spacing scale, motion timing, portal tokens, glass surfaces, focus rules, and reduced motion.

## Gap Table

| Layer | Current state | Gap | Required token/system |
|---|---|---|---|
| Color | Global and portal colors exist | Inline rgba values bypass themes; Career and Nano share amber | Semantic `border-subtle`, `surface-elevated`, `status-*`, distinct portal accent map |
| Typography | Cairo/IBM Plex Arabic and Geist/IBM Plex English | Multiple font intents; no documented type scale | `display-1..3`, `heading-1..4`, `body`, `caption`, locale line-height tokens |
| Spacing | 4pt variables exist | Components still use arbitrary Tailwind/inline values | Section, card, form, and shell spacing recipes |
| Shadows | Many one-off glow/shadow values | Depth hierarchy is inconsistent | `elevation-1..4`, `glow-primary`, portal glow limits |
| Cards | `glass-panel`, `glass-card`, `glass-panel-promax` | Similar surfaces overlap; inline borders differ | Card variants: interactive, content, metric, form, trust |
| Icons | Lucide plus React Icons plus emoji | Emoji violate Pro Max checklist; sizing varies | Typed icon registry with 16/20/24/32 sizes |
| Buttons | Glow, premium, secondary, magnetic | Too many treatments and transforms | Primary, secondary, ghost, danger, icon-only with fixed states |
| Forms | Repeated inline input styles | Missing IDs, error semantics, success primitives | Field component, help/error text, status alert, 44px controls |
| Backgrounds | Grid, global orb, page orbs, portal orbs | Layer accumulation and GPU cost | One global atmosphere plus optional portal motif |
| Motion | Tokens and reduced motion exist | Durations still hard-coded; continuous effects widespread | Entrance, feedback, progress, decorative policies |
| Responsive | Grids use breakpoints | No documented component behavior or visual tests | 375/390/768/1024/1440 acceptance matrix |
| Reuse | Shared wrappers and cards exist | Portal roots repeat hero/stats/card markup | PortalHero, PortalStats, PortalSectionGrid primitives |

## Missing State Tokens

- Success, warning, error, info text/background/border.
- Disabled opacity and cursor.
- Focus ring contrast for light/dark/portal.
- Skeleton base/highlight.
- Empty-state icon/surface.
- Destructive and recovery actions.

## Recommended Rules

1. No structural emoji in UI.
2. No raw white borders outside token definitions.
3. No fixed blurred orb inside portal pages on mobile.
4. No clickable control below 44x44px.
5. No hover transform greater than 2px for dense lists/cards.
6. All form errors use semantic announcement.
7. Every portal uses the shared hero/stats/section anatomy.
8. Each portal gets one accent, one motif, and one signature interaction.

## Risk

Replacing tokens is low risk. Rebuilding every portal independently is high risk. Build primitives first, migrate two pilot portals, then roll out.
