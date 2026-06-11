# UI/UX Pro Max Governance

## Skill Location

The executable skill was found at:

`C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\.codex\skills\ui-ux-pro-max\SKILL.md`

The project-specific UI/UX Pro Max brief was also found and read in full at:

`C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy\UX PROMAX.MD`

## Governing Direction

The project-specific brief selects **Digital Depth**: a controlled, premium, Arabic-first interface with restrained glass surfaces, typography-led hierarchy, portal-aware accents, and purposeful motion. This phase preserves that direction.

The generated UI/UX Pro Max design-system search suggested glassmorphism for the product category, but its playful font recommendation was rejected because it conflicts with the existing professional platform identity and the project-specific brief. Existing Cairo, Geist, and IBM Plex families remain authoritative.

## Extracted Rules

- Use motion only for hierarchy, feedback, or storytelling.
- Respect `prefers-reduced-motion`; avoid decorative continuous animation.
- Maintain readable contrast in light and dark themes.
- Keep focus states visible and interaction feedback between 150 and 300 ms.
- Preserve RTL/LTR behavior and use logical alignment and spacing where direction matters.
- Use Lucide or another consistent SVG icon system instead of emoji as structural UI.
- Keep mobile layouts free of horizontal overflow and test at 375, 768, 1024, and 1440 px.
- Treat glass as a material for selected surfaces, not a default decoration on every element.
- Do not allow a third-party component's defaults to override portal identity tokens.

## Library Judgment

| Library | Allowed role | Reject when |
| --- | --- | --- |
| HeroUI | Forms, inputs, modal/dialog workflows, dropdowns, tables, tabs, auth controls, and operational application UI. | A shadcn primitive already owns the same local role, or the component cannot be aligned with NexaLearn tokens and RTL behavior. |
| shadcn/ui | Editable local primitives, compact reusable composition, and project-owned design-system building blocks. | It duplicates a HeroUI operational component in the same feature without a documented reason. |
| Magic UI | Landing-page marketing motion and small visual emphasis with reduced-motion support. | The effect is continuous, distracting, content-obscuring, expensive on mobile, or used inside dashboards/forms. |
| Aceternity UI | Curated cinematic cards, bento layouts, restrained backgrounds, and scroll storytelling. | It introduces generic template styling, excessive blur/motion, weak contrast, RTL defects, or competes with the existing landing narrative. |

## Visual Consistency Controls

1. Every adopted component must map colors, radii, typography, spacing, and motion to existing NexaLearn tokens before production use.
2. HeroUI and shadcn/ui must not provide the same component type in the same feature unless an architecture note explains the exception.
3. Magic UI and Aceternity UI are opt-in presentation sources, not global styling systems.
4. Imported demos are reference implementations. Production copy, spacing, tokens, accessibility, and RTL behavior require review.
5. No effect ships without a UX purpose, reduced-motion fallback, mobile performance review, and build validation.
6. The internal `ui-lab` is the only place where all four libraries may appear together for integration verification.
