# Launch Readiness Checklist

## UI

- [ ] Canonical NexaLearn/Darhous lockup approved.
- [ ] No structural emoji icons.
- [ ] Shared button/card/form variants used.
- [ ] Light and dark contrast pass.
- [ ] No duplicate homepage portal visualization.

## UX

- [ ] Hero actions have distinct outcomes.
- [ ] Navbar is task-based and keyboard operable.
- [ ] Deep routes have breadcrumbs/local navigation.
- [ ] Empty and error states provide recovery.
- [ ] Legal links are available at registration.

## Mobile

- [ ] 375, 390, 393, 768, 1024 screenshots approved.
- [ ] All controls are at least 44x44px.
- [ ] No horizontal overflow.
- [ ] Fixed controls do not overlap.
- [ ] Mobile footer/navigation density is acceptable.

## RTL/LTR

- [ ] No hard-coded RTL in localized route roots.
- [ ] English Career/Automation/IoT are fully English LTR.
- [ ] Arabic copy and line height are reviewed.
- [ ] Mixed-language values use LTR isolation where needed.
- [ ] Directional icons flip correctly.

## SEO and Open Graph

- [ ] One canonical OG source uses NexaLearn identity.
- [ ] 1200x630 preview tested.
- [ ] Portal OG variants approved or intentionally deferred.
- [ ] Language verify metadata is defined.
- [ ] Sitemap and robots match public/private route policy.

## Performance

- [ ] Production Lighthouse measured.
- [ ] Heavy motion reduced on mobile.
- [ ] Raw `<img>` warnings resolved.
- [ ] Build time recorded and acceptable for release workflow.
- [ ] No unexpected console errors.

## Accessibility

- [ ] Focus visible on all controls.
- [ ] Skip link works.
- [ ] Form labels use `htmlFor`.
- [ ] Errors use `role="alert"` or `aria-live`.
- [ ] Reduced motion removes continuous decoration.
- [ ] Contrast meets 4.5:1 for body text.

## Auth and Trust

- [ ] Login/register/forgot/reset states tested.
- [ ] Loading, disabled, success, and failure states tested.
- [ ] Certificate issuer naming is consistent.
- [ ] Footer social links and contact details verified.
- [ ] Dashboard brand strings are canonical.

## Vercel and Build

- [ ] `npm run typecheck` passes.
- [ ] `npm run lint` passes with approved warning budget.
- [ ] `npm run build` passes.
- [ ] `git diff --check` passes.
- [ ] Live deployment SHA equals approved release SHA.
- [ ] Live Arabic and English homepages match approved screenshots.
