# Portal Pages Review

## Cross-Portal Assessment

The portal token layer is a solid architectural base. `PortalPageWrapper` plus `data-portal` enables color identity without duplicating the whole design system. The current implementation remains inconsistent because some portals use the shared shell and localized copy, while Career, Automation, and IoT force RTL and include Arabic-only sections.

| Portal | Value clarity | Visual identity | Locale quality | Main gap |
|---|---:|---:|---:|---|
| AI Academy | 82 | 68 | 78 | Emoji-heavy tool grid and repeated card patterns |
| Language | 84 | 70 | 84 | Feature emoji and duplicated integration messaging |
| Digital Exams | 86 | 71 | 82 | Dense hero/CTA card and emoji subject identity |
| Career | 81 | 74 | 28 | English route remains RTL/Arabic |
| Automation | 82 | 73 | 30 | English route remains RTL/Arabic |
| Cloud | 72 | 52 | 76 | Orphaned from registry; emoji-only provider/content identity |
| IoT Lab | 84 | 75 | 26 | English route remains RTL/Arabic |
| Certificate Verify | 78 | 70 | 68 | Mixed Darhous/NexaLearn issuer identity |

## AI Academy

The content hierarchy is understandable: hero, stats, identity, tools, courses, tools, projects. The 12-item AI Studio grid uses emoji and six columns, making labels small and reducing premium quality. Replace the grid with grouped task categories and consistent SVG marks. The bottom quick links repeat emoji-based shortcuts.

## Language

The value proposition and primary assessment CTA are strong. “Now Integrated” appears in both the CTA card and a large integration block, creating repetition. Collapse this into one confidence statement and use the recovered space for test duration, question count, certificate criteria, and privacy/account requirements.

## Digital Exams

The page has strong quantitative proof. It is also dense: a long explanatory paragraph, a CTA card, three secondary links, identity intro, and a large subject grid. Separate “Start mixed exam” from “Choose a subject.” Use SVG subject icons and ensure question counts are not the sole proxy for quality.

## Career

The visual personality is clearer through amber tokens and career-specific tools. The production blocker is locale integrity: the wrapper forces RTL and Arabic text outside locale conditions. English users receive Arabic headings, stats, descriptions, and CTAs. Resolve locale behavior before any visual refinement.

## Automation

The green identity and workflow-oriented sections fit the domain. The same locale defect applies. Long fixed blurred backgrounds plus global atmosphere increase compositing. Use one subtle workflow-grid motif and reserve motion for the workflow map.

## Cloud

The route exists and has meaningful content, but it is absent from `src/config/portals.ts`, footer, navbar portal list, and landing ecosystem. Its visual system relies heavily on emoji provider marks and generic cards. Decide whether Cloud is a first-class portal. If yes, add registry tokens, layout wrapper, SVG provider marks, and portal navigation.

## IoT Lab

Orange identity and concrete content counts provide strong differentiation. English locale is still rendered as an Arabic RTL page. The hero and sections contain Arabic-only copy and generic “دخول” CTAs. Localize every data field before launch. Replace the plug emoji with a consistent circuit/board SVG.

## Unity vs Personality

Keep shared:

- Navbar/footer shell.
- Typography scale.
- Container widths.
- Form and button primitives.
- Focus and reduced-motion behavior.
- Card anatomy and status semantics.

Differentiate:

- One accent palette per portal.
- One domain motif.
- Hero illustration/data visualization.
- Content density and primary action.
- Limited motion vocabulary.

Avoid building a completely different component system per portal.
