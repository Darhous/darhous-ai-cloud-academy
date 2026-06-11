# Arabic RTL and English LTR Review

## Score

**55/100**

The root locale shell is implemented correctly with `lang`, `dir`, locale metadata, logical CSS properties, and Arabic-specific font/line-height rules. The critical defect is route content that overrides this correct shell.

## Strengths

- `getDir(locale)` controls root direction.
- `body[dir="rtl"]` selects Arabic typography and 1.7 line height.
- `start/end`, `ps/pe`, and `borderInlineEnd` are used in many components.
- Directional arrows often switch by locale.
- Auth email/password fields correctly force LTR.
- Metadata is localized on most routes.

## Critical Defects

### Hard-Coded RTL

The Career, Automation, and IoT portal roots use `dir="rtl"` unconditionally. English routes therefore render RTL.

### Arabic-Only Content

The same pages include Arabic-only:

- Back links.
- Hero badges and paragraphs.
- Stats labels.
- Card titles/descriptions.
- CTA labels.

### Global Recovery States

`error.tsx`, `not-found.tsx`, and `loading.tsx` are English-only. Home links use `/` instead of the locale route.

### Mixed Brand Language

Arabic pages mix Darhous, NexaLearn, AI, IoT, ATS, and English product labels without a documented bilingual terminology policy. English pages can still expose Arabic data on some portal sections.

## Typography

Cairo for display and IBM Plex Sans Arabic for body is readable. The UI/UX Pro Max search suggested Noto Naskh Arabic/Noto Sans Arabic, but replacing current fonts is not required. The current pairing is appropriate if standardized:

- Cairo: headings only.
- IBM Plex Sans Arabic: body, controls, data.
- Geist/IBM Plex Sans: English.
- JetBrains Mono: codes and technical values, not long labels.

## Directional Icons

Continue switching arrows by locale. Do not mirror universal icons such as search, play, download, settings, or check. Timeline and progress origins must use logical direction.

## Mixed-Language Rules

- Email, URL, certificate code, version, and code snippets: `dir="ltr"`.
- Arabic sentence containing an English product name: keep the container RTL and isolate the product token with `bdi`.
- Numbers should remain visually stable; avoid manual string reversal.

## Must Fix

1. Remove every unconditional `dir="rtl"` from localized route roots.
2. Create Arabic/English content objects for Career, Automation, and IoT.
3. Localize global loading/error/404 states.
4. Preserve locale in all recovery links.
5. Add an automated check for Arabic text density in `/en/*` static HTML.
