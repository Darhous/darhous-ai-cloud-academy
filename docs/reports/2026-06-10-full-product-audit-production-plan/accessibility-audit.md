# Accessibility Audit

## Keyboard navigation

| Area | Status |
|------|--------|
| Skip link `#main-content` | Present in layout |
| Cinematic intro | Escape/Enter/Space dismiss |
| Smart tour | Keyboard nav when open — but tour never opens |
| Navbar dropdowns | Partial — needs focus trap audit |
| Admin tables | Dense — tab order long |

## Focus states

`PortalCard` Link has `focus-visible:ring-2`. Many custom buttons use opacity hover only — **inconsistent**.

## ARIA

- Cinematic intro: `role="dialog"`, `aria-modal`, label
- Tour: step tabs with `role="tablist"`
- Carousel (unmounted): lacks live region announcements

## Color contrast

`glass-panel-promax` on light theme — border/contrast **may fail WCAG** for subtle text.

## Reduced motion

**Strong support** in landing — `useReducedMotion` throughout Phase 5 components. Global CSS `@media (prefers-reduced-motion: reduce)` present.

## Semantic headings

Landing sections use `h2`/`h3` hierarchy — generally correct. Multiple `h1` risk low (intro uses h1 temporarily).

## Arabic RTL

Layout `dir` set per locale. Chevron direction handled in several components. Exam/career forms mixed LTR field labels.

## Screen reader

Portal status badges readable. Motion-only affordances (tilt) have no SR equivalent — acceptable if content equivalent in text.

## Forms

Admin dual-language fields — labels present. Career STAR form has Arabic labels.

## Admin tables

Large HTML tables without consistent `scope` on headers — medium issue.

**Verdict:** Reduced motion excellent; focus/contrast need polish; admin a11y debt.
