# Homepage and Landing Page Review

## First Impression

The local homepage communicates an ambitious AI learning ecosystem and has stronger visual craft than the live version. Its primary weakness is not lack of design; it is the simultaneous use of too many premium effects. UI/UX Pro Max requires a clear first focal point and only one or two key animated elements per view. Here the user meets a cinematic intro, rotating headline, animated dashboard, two marquees, sticky portal stack, 3D carousel, path selector, ecosystem map, mentor typing, timeline pulses, and a large CTA.

## Hero

**What works**

- Strong, outcome-oriented H1.
- Clear NexaLearn naming.
- Credible proof points below the subtitle.
- Responsive type sizing and reduced-motion handling.
- Product mockup shows the ecosystem rather than a generic illustration.

**What blocks readiness**

- Three hero actions compete; the first two perform the same action.
- The badge is brand-heavy and long.
- The mockup contains non-interactive chips styled with `cursor-pointer`.
- Continuous pulse/bounce/orb motion remains active for normal-motion users.
- No immediate external trust signal, learner result, or verified outcome.

**Required change**

Use one primary CTA, one secondary CTA, and a text-link tour. Make “Start Your Journey” open onboarding/path selection and “Explore Portals” move to portal discovery.

## Section Order

Current local sequence:

1. Hero
2. Two marquees
3. Sticky portal stack
4. 3D showcase
5. Path selector
6. Ecosystem map
7. Mentor
8. Journey timeline
9. Why NexaLearn
10. Stats
11. Final CTA
12. Community signup

Recommended sequence:

1. Hero
2. Trust/outcome strip
3. Portal discovery
4. Path selector
5. AI mentor
6. Learning outcomes and certificates
7. How it works
8. Final CTA

The sticky portal stack and ecosystem map duplicate portal discovery. Keep one. The 3D carousel can be moved after the core conversion path or removed.

## Portal Cards

The large sticky cards have strong typography and color identity, but the registry still injects emoji as the primary icon. The `hover:scale-[1.04]` CTA and large sticky scroll sequence increase motion without improving choice. On mobile the stack becomes flat, which is safer, but every card remains visually heavy.

Use SVG identity marks, show one primary value statement per portal, and reduce feature pills from five to three.

## Trust Signals

Stats exist late on the page. The hero proof points are product claims, not social proof. Add:

- Verified learner/project/certificate counts with data source.
- A small learner outcome quote or partner/credential signal.
- “Free to start” and account requirement transparency.
- Certificate verification link.

Do not add an unverified logo wall.

## Conversion Readiness

Current conversion score: **61/100**

The page explains breadth well but asks the user to process too many products before committing. The final CTA has good contrast but “Now or Never” introduces pressure rather than trust. Community signup after the final CTA creates a second ending.

## Publish Blockers

- Live site does not show this local landing experience.
- Hero CTA intents are duplicated.
- Portal icon system violates the skill.
- Page is over-animated and over-long.
- Trust evidence is late and weak.
- Legacy brand strings remain in supporting surfaces.

## Ordered Upgrade

1. Deploy current audited build to preview and capture all target widths.
2. Correct hero action semantics.
3. Choose one portal discovery component.
4. Remove one marquee and demote the 3D carousel.
5. Move verified proof directly under hero.
6. Replace emoji with SVG.
7. Rewrite final CTA around outcomes.
8. End the page once, with one final conversion surface.
