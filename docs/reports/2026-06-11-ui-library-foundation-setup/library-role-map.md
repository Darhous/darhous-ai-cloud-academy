# Library Role Map

| Library | Role | Use in NexaLearn | Do not use | Suitable examples | Overuse risk |
| --- | --- | --- | --- | --- | --- |
| UI/UX Pro Max | Visual governance and acceptance criteria | Review hierarchy, contrast, motion, accessibility, RTL, mobile, and consistency | It is not a component library or a substitute for product requirements | Design reviews, component-source approval, pre-release visual audit | Treating generated recommendations as mandatory when they conflict with the existing product system |
| HeroUI | Production application controls | Forms, inputs, modal workflows, dropdowns, tabs, tables, auth controls | Decorative landing effects or duplicate shadcn controls in the same feature | Login form, admin table, enrollment modal | Default HeroUI styling can become a second design language unless mapped to NexaLearn tokens |
| shadcn/ui | Editable project-owned primitives | Small reusable primitives and custom compositions | A second implementation of a HeroUI operational control without a documented reason | Custom card shell, compact badge, local dialog composition | Forked primitives can drift if copied without ownership and review |
| Magic UI | Restrained marketing motion | Landing emphasis, animated headline fragment, limited grid or CTA treatment | Forms, dashboards, tables, continuous decorative motion | Campaign hero accent, launch announcement | Distraction, mobile GPU cost, reduced-motion failures |
| Aceternity UI | Cinematic composition | Bento storytelling, selected backgrounds, hover cards, scroll narratives | Replacing the entire interface or applying black template styling unchanged | Portal story bento, curated feature scene | Generic template appearance, contrast problems, heavy animation, RTL defects |

## Source Priority

1. Existing NexaLearn component or token.
2. HeroUI for operational application UI.
3. shadcn/ui for editable local primitives.
4. Magic UI for a justified marketing effect.
5. Aceternity UI for a justified cinematic composition.
6. UI/UX Pro Max review before production adoption.
