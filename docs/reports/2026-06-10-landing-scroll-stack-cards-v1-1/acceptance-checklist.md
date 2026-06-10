# Acceptance Checklist

- [x] `ScrollStackSection` renders immediately after `HeroSection`.
- [x] Every other homepage section remains present and in relative order.
- [x] `PortalGrid.tsx` still exists.
- [x] All eight portals from `src/config/portals.ts` render.
- [x] `id="portals"` remains on the section.
- [x] Portal data and links are unchanged.
- [x] Desktop cards are large, centered, sticky, and visibly offset.
- [x] Covered cards recede to scale `0.82`, opacity `0.35`, and overlay opacity `0.5`.
- [x] The final card never recedes.
- [x] Desktop stack travel is constrained to approximately `175vh`.
- [x] A sticky `01 / 08` progress indicator communicates the deck behavior.
- [x] Reduced motion uses a static overlapped stack, not a grid.
- [x] Mobile uses large full-width cards in a single vertical flow.
- [x] Logical CSS positioning supports RTL and LTR.
- [x] Typecheck passes.
- [x] Lint reports no errors and no warnings in the modified source files.
- [x] Production build passes.
- [x] No portal, section, file, or copy was removed.
- [x] No dependencies or package metadata were changed.
- [x] No Git operation was run.
- [x] `ANTIGRAVITY_PROJECT_LOG.md` was not modified.

## Tooling Note

The in-app browser backend was unavailable during the visual QA attempt. Static responsive behavior, source-level constraints, type checking, linting, and production compilation were still verified.
