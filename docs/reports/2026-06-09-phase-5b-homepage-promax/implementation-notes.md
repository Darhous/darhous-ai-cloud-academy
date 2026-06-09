# Implementation Notes

## Narrative Architecture
`HomepageClient.tsx` was reordered to match the requested narrative arc:
1. Reveal the intelligent ecosystem (`HeroSection`)
2. Path Selector (`PathSelector`)
3. Ecosystem Map (`EcosystemMap`)
4. Portal Grid (`PortalGrid`)
5. Mentor Showcase (`MentorShowcase`)
6. Practical Learning Workflow (`HowItWorks`)
7. Achievement/Outcome Signals (`WhyDarhous` and `Stats`)
8. Final Invitation (`FinalCTA`)

## Component-Level Details
- **PathSelector**: Upgraded with Lucide icons (replacing emojis) and premium container tokens.
- **EcosystemMap**: Restyled to emphasize the AI Mentor hub-and-spoke relationship. Added a neural ambient background and matching glow logic.
- **PortalCard / PortalGrid**: Transitioned from generic glass-cards to `.glass-panel-promax` design with dynamic hover elevations.
- **MentorShowcase**: Fully redesigned to match the Phase 5A "Command Center" aesthetic with simulated real-time interaction.
- **HowItWorks**: Transitioned from a standard grid into an animated, linear workflow timeline on desktop to better guide user understanding.
- **WhyDarhous & Stats**: Integrated cohesive colors, subtle backgrounds, and a clean editorial list layout instead of dense blocks.
- **FinalCTA**: Upgraded to a cinematic, glowing focal point that closes the page dynamically.

## Excluded Features
- The cinematic intro was actively deferred to Phase 5D.
- No new logical features or content tables were exposed.
