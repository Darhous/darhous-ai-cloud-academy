# English Localization and Arabic Leakage Audit

## High-Impact Leakage

- `src/config/portals.ts` stores every portal feature list in Arabic only.
- `PortalCard.tsx` renders that same list for both locales. English homepage cards therefore contain Arabic feature chips.
- `src/data/digital-exam-subjects.ts` defines 902 questions and answers in Arabic-only fields.
- `DigitalExamClient.tsx` renders `q.question` and `q.options` directly on `/en`, so the English exam shell contains Arabic questions, answer choices, review text, and AI-explanation input.

## Additional Mixed-Language Cases

- Several Arabic dashboard branches render the English phrase “My Darhous Hub.”
- Mentor system context includes an Arabic separator even for English requests.
- Certificate verification metadata is English-only even on localized Arabic routes.
- Old Arabic academy branding remains in English-facing share/metadata systems through common layout assets.

## Assessment

This is not isolated copy debt. The English digital-exam product is not actually localized, and homepage portal cards visibly leak Arabic. A dedicated localization QA phase is required before English launch approval.

