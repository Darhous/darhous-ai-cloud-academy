# Accessibility Audit

---

## Positive Findings

### Skip Link
**File:** `src/app/[locale]/layout.tsx`
```tsx
<a href="#main-content" className="sr-only focus:not-sr-only ...">
  {isAr ? "تخطى إلى المحتوى الرئيسي" : "Skip to main content"}
</a>
```
✅ Properly implemented, bilingual

### Reduced Motion Support
- `useReducedMotion()` from framer-motion used throughout
- CinematicIntro: `if (shouldReduce) setShow(false)` — intro disabled for reduced-motion users
- SmartPlatformTour: all animation durations reduced
- InteractiveSurface: tilt disabled, spotlight disabled
- All framer-motion transitions use reduced-motion variants
- **Status: ✅ Excellent reduced-motion handling**

### ARIA on Dialogs/Modals
- CinematicIntro: `role="dialog"`, `aria-modal="true"`, `aria-label`
- SmartPlatformTour: `role="dialog"`, `aria-modal="true"`, `aria-label`
- Tour navigation dots: `role="tablist"`, `role="tab"`, `aria-selected`, `aria-label`
- **Status: ✅ Good dialog accessibility**

### Keyboard Navigation
- CinematicIntro: Escape, Enter, Space to dismiss ✅
- SmartPlatformTour: Escape, Arrow keys, tab navigation ✅
- Navbar: Standard link/button elements, keyboard accessible ✅

### Semantic HTML
- `<main id="main-content">` set in layout ✅
- `<footer>` used for footer ✅
- Headings used (h1, h2, h3) in sections ✅
- `<ul>/<li>` for navigation lists ✅

### Form Labels
- Login/Register forms use `LoginForm`/`RegisterForm` components
- Assumed to have labels (components not fully audited)

---

## Issues Found

### Color Contrast Concerns
- Primary color: `#8ed5ff` on dark background `#0c0e12`
- Light blue on very dark — likely passes WCAG AA for large text, may fail for small text
- `color-on-surface-variant: #c1c6d7` on `#0c0e12` background — needs contrast check
- Light mode: `primary: #0284c7` on `#f8fafc` — good contrast
- No contrast audit tools run (no browser in audit environment)

### Focus States
- Navbar links: custom styling, focus states not explicitly specified
- Interactive cards: no visible focus ring seen in code
- `PortalCard`, `EcosystemMap` cards: `Link` elements without explicit `focus-visible` styles
- **Risk:** Keyboard users may not see focus indicator on cards

### Admin Tables
- Admin panels use lists/tables of content items
- No explicit `<table>`, `<thead>`, `<tbody>` structure found in generic panels — may use div-based grids
- Screen readers may struggle with admin content lists

### Image Alt Text
- Emoji icons used throughout (🤖, 🌐, etc.) — screen readers read emoji names
- Emoji used as portal icons: read as "robot face", "globe showing Europe-Africa" etc.
- Better pattern: wrap emoji with `aria-hidden="true"` and use separate `aria-label`
- **Status: ⚠️ Emoji icons not hidden from screen readers**

### Portal Cards — Icon Accessibility
```tsx
<div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl">
  {portal.icon}  {/* emoji string — not aria-hidden */}
</div>
```
Screen reader would read "🤖" as "robot face" before the portal title. Should be `aria-hidden="true"`.

### Arabic Text RTL
- Layout correctly sets `dir="rtl"` for Arabic ✅
- Font: "IBM Plex Sans Arabic" for RTL ✅
- `line-height: 1.7` for Arabic text ✅
- **Risk:** Automation and Career pages force `dir="rtl"` — breaking English users (confirmed bug)

### Admin Accessibility
- Admin sidebar: standard button elements, keyboard navigable
- Admin forms: fields use `AdminTextField`, `AdminTextAreaField` etc. — need label audit
- No `aria-required`, `aria-invalid` on admin form fields visible in code

### Font Loading (Accessibility Impact)
- Google Fonts @import may cause FOUT (Flash of Unstyled Text)
- Arabic users may see Latin font before Arabic font loads
- **Risk:** Brief period of incorrect font rendering

---

## Accessibility Verdict

| Category | Rating |
|----------|--------|
| Reduced motion | ✅ Excellent |
| Skip link | ✅ Present |
| Dialog ARIA | ✅ Good |
| Keyboard navigation | ✅ Good for nav |
| Focus states | ⚠️ Cards missing focus rings |
| Color contrast | ⚠️ Unverified |
| Semantic HTML | ✅ Good |
| Emoji screen reader | ⚠️ Not hidden |
| Admin accessibility | ⚠️ Partial |
| RTL Arabic | ✅ Layout correct |
| RTL bug (Automation/Career) | ❌ Breaks EN layout |

**Overall: 6/10 — Good foundation, needs focus states and emoji aria fixes**
