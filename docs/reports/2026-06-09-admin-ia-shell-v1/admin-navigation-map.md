# Admin Navigation Map

## Old Flat Tab List
- overview
- site-builder
- portals
- users
- certificates
- mentor-control
- content
- email
- analytics
- theme
- audit
- language
- automation
- digital-exams
- career
- iot-lab
- ai-academy
- nano-banana
- blog
- ai-glossary
- ai-tools-cms
- ai-prompts-cms
- ai-courses-cms
- ai-projects-cms
- ai-paths-cms
- automation-cms
- iot-cms
- exams-cms
- draft-preview

## New Grouped Navigation Structure
1. **Overview** (`overview`)
2. **Content** (`draft-preview`, `blog`, `ai-courses-cms`, `ai-projects-cms`, `ai-paths-cms`, `ai-tools-cms`, `ai-prompts-cms`, `ai-glossary`, `automation-cms`, `iot-cms`, `exams-cms`, `content`)
3. **Portals** (`portals`, `ai-academy`, `iot-lab`, `career`, `automation`, `language`, `nano-banana`)
4. **Learning & Exams** (`digital-exams`)
5. **Users & Community** (`users`)
6. **Certificates** (`certificates`)
7. **Analytics** (`analytics`)
8. **Communications** (`email`)
9. **Settings** (`site-builder`, `theme`, `mentor-control`)
10. **Security & System** (`audit`)

## Notes
- **RTL Support**: The `AdminSidebar` conditionally reverses chevron directions based on `isAr` to maintain native RTL feel.
- **Mobile Support**: The sidebar structure replaces horizontal scrolling tabs. On smaller screens, this layout degrades gracefully, though further responsive refinements may be required in future phases.
- **Accessibility**: Icons were retained and descriptive labels kept for screen readers.
- **Deferred**: Moving tab definitions from local string union in `AdminDashboardClient` to a truly exported module was done, but preserving URLs for deep-linking was deferred.
