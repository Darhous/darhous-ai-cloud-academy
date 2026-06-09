# Admin Information Architecture Map

## Current Admin Structure
The current admin dashboard relies on a single monolithic client component (`AdminDashboardClient.tsx`) containing ~5,277 lines of code. It uses a horizontal scrolling or wrapping tab bar containing 29 tabs on the same level.
Tabs identified:
- **Core Systems**: overview, users, certificates, email, analytics, audit
- **Site & Branding**: site-builder, theme, mentor-control, portals
- **CMS (Generic/Custom)**: content, blog, ai-glossary, ai-tools-cms, ai-prompts-cms, ai-courses-cms, ai-projects-cms, ai-paths-cms, automation-cms, iot-cms, exams-cms, draft-preview
- **Portals (Stats/Settings)**: language, automation, digital-exams, career, iot-lab, ai-academy, nano-banana

## Proposed Grouped Structure
To reduce cognitive load and prevent React performance issues, the architecture will transition to a Grouped Shell with a primary sidebar and nested routing (or clean sub-component composition).
Primary Groups:
1. **Overview & Analytics**: Dashboard, Analytics, Audit Logs
2. **Users & Access**: Users, Certificates
3. **Site Configuration**: Site Builder, Theme & Branding, Portals Manager, Mentor Control, Email & Notify
4. **CMS & Content Engine**: Draft Preview, Content Studio, Blog, Glossary, plus CMS endpoints for all domains (AI, IoT, Automation, Exams)
5. **Portal Management**: Individual portal settings and monitoring (Nano Banana, Career, Language, etc.)

## Deep-Link Model
Transition from React state `?tab=` (or pure memory) to actual nested Next.js routes (e.g. `/admin/cms/automation`) or robust URL search params (`?group=cms&panel=automation`) ensuring a refresh maintains the exact view.

## Command Palette Model
Implement a global `Cmd+K` / `Ctrl+K` palette available exclusively to admins. This enables quick jumps to deep CMS panels (e.g., typing "IoT" immediately brings up IoT Labs CMS) bypassing manual navigation.

## Mobile, RTL & Accessibility
- **RTL**: Sidebar must dock to the right. The UI must respect logical properties (`margin-inline-start`) instead of physical ones (`ml`, `pr`).
- **Mobile**: Sidebar collapses into a hamburger menu or bottom sheet. Current horizontal tab list is very difficult to use on mobile.
- **Accessibility**: Focus traps for modals. ARIA landmarks for the shell `<nav>` and `<main>`.
