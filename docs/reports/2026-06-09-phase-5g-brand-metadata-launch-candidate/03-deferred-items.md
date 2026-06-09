# Phase 5G: Deferred Brand and Localization Items

The following items were identified during the Phase 5G brand audit but explicitly deferred to a future dedicated "Brand Overhaul and Localization QA" phase to prevent scope creep, unintended UI regressions, or English/Arabic language leaks prior to the current launch candidate deployment.

## 1. Deep Text Replacements
The text "Darhous Academy" and its Arabic equivalents remain embedded deep inside translation files (`src/messages/ar.json`, `src/messages/en.json`). Broad replacements using automated tooling risk corrupting the strict translation schema formatting or causing accidental English leaks in the Arabic locale.

## 2. Visual Binary Logos
No binary visual assets were created, replaced, or generated (e.g., SVG, PNG). A professional replacement for the visual academy logo is deferred.

## 3. Email Templates
`src/lib/email/templates.ts` continues to use the "Darhous Academy" signatures. This was deferred to ensure automated notification safety is not impacted by untested layout shifts.

## 4. UI Components
Certain functional UI components containing hardcoded "Academy" strings were preserved without rewrite. 

## 5. English Localization QA
A full sweep for "Arabic leaks" inside the English portals was deferred. The priority remains the stability of the core Arabic-first learning portal.
