# Next Implementation Plan

| Priority | Area | Library | Reason | Risk |
| --- | --- | --- | --- | --- |
| 1 | Login and registration controls | HeroUI | Accessible form controls and validation states | Medium |
| 2 | Forgot/reset password flows | HeroUI | Consistent operational form behavior | Low |
| 3 | Admin confirmation dialogs | HeroUI | Accessible modal and destructive-action patterns | Medium |
| 4 | Admin tables and filters | HeroUI | Data-dense application controls | Medium |
| 5 | Shared compact badges | shadcn/ui | Locally owned primitive with portal token mapping | Low |
| 6 | Shared content card shell | shadcn/ui | Reduce repeated card markup without replacing existing visual identity | Medium |
| 7 | Landing announcement accent | Magic UI animated gradient text | Small, purposeful marketing emphasis | Low |
| 8 | Landing campaign CTA | Magic UI shimmer button | Use only after reduced-motion and contrast adaptation | Medium |
| 9 | Portal overview story | Aceternity bento grid | Structured cinematic storytelling | Medium |
| 10 | Selected portal hero background | Aceternity background beams | Controlled atmosphere after mobile performance measurement | High |

## Implementation Rules

- Pilot one feature at a time.
- Adapt tokens before visual review.
- Verify Arabic and English at 375, 768, 1024, and 1440 px.
- Measure client bundle impact for Magic UI and Aceternity components.
- Do not migrate existing buttons, cards, navbar, or footer in bulk.
- Keep `ui-lab` unlisted and `noindex`.

## Required Checks After Each Pilot

```bash
npm run typecheck
npm run lint
npm run build
git diff --check
```

Also perform keyboard, RTL/LTR, reduced-motion, dark/light, and mobile overflow checks.
