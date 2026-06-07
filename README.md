<div align="center">

<img src="./public/og-image.svg" alt="Darhous AI Cloud Academy" width="100%" />

<br />

# Darhous AI Cloud Academy

### أكاديمية درهوس للذكاء الاصطناعي 

**A bilingual digital learning ecosystem for AI, cloud, automation, career development, language assessment, digital skills, and IoT.**

[![Live Platform](https://img.shields.io/badge/Explore_Live_Platform-00668A?style=for-the-badge&logo=vercel&logoColor=white)](https://darhous-ai-cloud-academy.vercel.app)
[![Arabic](https://img.shields.io/badge/العربية-0F766E?style=for-the-badge)](https://darhous-ai-cloud-academy.vercel.app/ar)
[![English](https://img.shields.io/badge/English-571BC1?style=for-the-badge)](https://darhous-ai-cloud-academy.vercel.app/en)

<br />

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-181818?style=flat-square&logo=supabase&logoColor=3ECF8E)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on_Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## One Platform. Multiple Learning Portals.

Darhous AI Cloud Academy is more than a course catalog. It is a production-grade EdTech platform that brings structured learning, practical labs, intelligent tools, assessments, projects, progress tracking, and certificates into one Arabic-first, bilingual experience.

The platform is designed for learners who want to move from **understanding concepts** to **building real skills** across modern technology and career domains.

<table>
  <tr>
    <td width="33%" valign="top">
      <h3>🤖 AI Academy</h3>
      <p>AI courses, tools, prompt engineering, intelligent labs, practical projects, challenges, and an AI mentor.</p>
      <a href="https://darhous-ai-cloud-academy.vercel.app/ar/ai-academy">Enter portal →</a>
    </td>
    <td width="33%" valign="top">
      <h3>🌐 Language Portal</h3>
      <p>English level assessment, skill evaluation, instant results, and personalized learning recommendations.</p>
      <a href="https://darhous-ai-cloud-academy.vercel.app/ar/language">Test your level →</a>
    </td>
    <td width="33%" valign="top">
      <h3>💻 Digital Exams</h3>
      <p>Assessments for IT, Microsoft Office, cybersecurity, and essential digital transformation skills.</p>
      <a href="https://darhous-ai-cloud-academy.vercel.app/ar/digital-exams">Start an exam →</a>
    </td>
  </tr>
  <tr>
    <td width="33%" valign="top">
      <h3>💼 Career Hub</h3>
      <p>AI-powered CV analysis, ATS scoring, CV building, job matching, and interview preparation.</p>
      <a href="https://darhous-ai-cloud-academy.vercel.app/ar/career">Build your career →</a>
    </td>
    <td width="33%" valign="top">
      <h3>⚙️ Automation Academy</h3>
      <p>Business automation learning paths, curated workflow recipes, practical labs, and a workflow builder.</p>
      <a href="https://darhous-ai-cloud-academy.vercel.app/ar/automation">Explore automation →</a>
    </td>
    <td width="33%" valign="top">
      <h3>🔌 IoT & Arduino Lab</h3>
      <p>Arduino lessons, applied projects, coding challenges, component references, and an interactive simulator.</p>
      <a href="https://darhous-ai-cloud-academy.vercel.app/ar/iot-lab">Enter the lab →</a>
    </td>
  </tr>
</table>

---

## Platform Highlights

| Experience | What it delivers |
| --- | --- |
| **Arabic + English** | Locale-aware Arabic RTL and English LTR experiences across the platform |
| **AI learning workspace** | AI mentor, prompt studio, prompt scoring, tool recommendations, project generation, and personalized roadmaps |
| **Structured education** | Courses, lessons, paths, challenges, glossaries, blogs, projects, and hands-on labs |
| **Assessment engine** | Language assessment, digital exams, mixed exams, result history, and explanation workflows |
| **Career intelligence** | CV analysis, ATS-oriented tooling, interview practice, templates, and job exploration |
| **Learner identity** | Authentication, onboarding, profiles, public profile pages, dashboard, progress, and leaderboards |
| **Proof of achievement** | Certificate issuing, previews, verification pages, and portal-specific certificate workflows |
| **Discovery at scale** | Search, tool comparison, categorized content, favorites, and saved learning resources |
| **Modern UX** | Responsive interface, theme support, motion, charts, command-oriented navigation, and installable PWA metadata |

---

## AI Studio

The Academy includes focused AI experiences for learning and building, rather than a single generic chat interface.

| Tool | Route | Purpose |
| --- | --- | --- |
| **AI Mentor** | `/[locale]/mentor` | Context-aware academy guidance and learning support |
| **Prompt Studio** | `/[locale]/prompt-studio` | Improve and structure prompts for stronger outputs |
| **Prompt Score** | `/[locale]/prompt-score` | Evaluate prompt quality and identify improvements |
| **Prompt Battle** | `/[locale]/prompt-battle` | Practice prompt engineering through interactive challenges |
| **Claude Code Generator** | `/[locale]/claude-code-generator` | Build detailed implementation prompts for coding workflows |
| **Tool Recommender** | `/[locale]/tool-recommender` | Match learner goals with suitable AI tools |
| **Roadmap Generator** | `/[locale]/roadmap-generator` | Generate personalized learning roadmaps |
| **Project Generator** | `/[locale]/project-generator` | Turn ideas into structured, buildable project plans |

---

## Architecture at a Glance

```text
src/
├── app/
│   ├── [locale]/                 # Localized learner-facing portal routes
│   ├── api/                      # AI, assessment, progress, email, and admin APIs
│   ├── certificates/             # Public certificate verification
│   ├── og/                       # Dynamic Open Graph output
│   ├── sitemap.ts
│   └── robots.ts
├── components/                   # Portal, feature, layout, and UI components
├── config/                       # Central platform and portal configuration
├── data/                         # Academy content and structured learning data
├── hooks/                        # Client-side behavior and persisted learner state
├── lib/                          # Integrations, services, and shared utilities
└── messages/                     # Arabic and English translations
```

The application currently contains **87 page entry files** and **48 API route files**, organized around the Next.js App Router.

---

## Technology

| Area | Technology |
| --- | --- |
| **Framework** | Next.js 16.2, React 19.2 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4, CSS variables, `tailwind-merge`, `clsx` |
| **Motion & UI** | Framer Motion, Lucide React, React Icons |
| **Data & Auth** | Supabase SSR and Supabase JS |
| **Content** | MDX Remote, Gray Matter |
| **Search** | Fuse.js |
| **Visualization** | Recharts |
| **Documents** | React PDF, PDF parsing, QR codes |
| **Email** | Resend |
| **Deployment** | Vercel |

---

## Getting Started

### Prerequisites

- Node.js compatible with Next.js 16
- npm
- Required service credentials configured locally

### Local development

```bash
git clone https://github.com/Darhous/darhous-ai-cloud-academy.git
cd darhous-ai-cloud-academy
npm install
copy .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route directs visitors into the localized platform experience.

> Keep credentials in `.env.local`. Never commit local environment files or expose server-only keys through public environment variables.

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm run check` | Run linting, type checking, and the production build |

---

## Key Routes

```text
/{locale}                              Platform home
/{locale}/ai-academy                   AI learning portal
/{locale}/language                     English assessment portal
/{locale}/digital-exams                Digital skills examination portal
/{locale}/career                       Career development hub
/{locale}/automation                   Automation academy
/{locale}/iot-lab                      IoT and Arduino learning lab
/{locale}/courses                      Course catalog
/{locale}/projects                     Applied project library
/{locale}/tools                        AI tools directory
/{locale}/dashboard                    Learner dashboard
/{locale}/certificates                 Learner certificates
/{locale}/leaderboard                  Community leaderboard
```

Use `ar` or `en` as the locale segment.

---

## Quality Workflow

Run the complete local verification pipeline before opening a pull request:

```bash
npm run check
```

This executes ESLint, TypeScript validation, and a production build in sequence.

---

## Project Documentation

| Document | Purpose |
| --- | --- |
| [`DEVELOPMENT_GUIDE.md`](./DEVELOPMENT_GUIDE.md) | Local setup, development workflow, and coding conventions |
| [`CONTENT_ARCHITECTURE.md`](./CONTENT_ARCHITECTURE.md) | Content models and platform data architecture |
| [`PLATFORM_BLUEPRINT.md`](./PLATFORM_BLUEPRINT.md) | Product structure and platform direction |
| [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) | Deployment workflow and production setup |
| [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md) | Supabase configuration guidance |
| [`ADMIN_GUIDE.md`](./ADMIN_GUIDE.md) | Administration features and operations |
| [`FUTURE_ROADMAP.md`](./FUTURE_ROADMAP.md) | Planned platform evolution |

---

## Deployment

The production application is deployed on Vercel:

### [darhous-ai-cloud-academy.vercel.app](https://darhous-ai-cloud-academy.vercel.app)

For deployment details, environment configuration, and release guidance, see [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md).

---

<div align="center">

### Build skills. Create projects. Advance with AI.

**ابنِ مهاراتك، طبّق معرفتك، وتقدّم مع الذكاء الاصطناعي**

<br />

[![Instagram](https://img.shields.io/badge/Instagram-Darhous-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/darhous/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Darhous-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/darhous/)
[![Facebook](https://img.shields.io/badge/Facebook-Darhous-0866FF?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/ahmed.darhous)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Contact-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/201030002331)

<br />

**Darhous / درهوس**

<sub>designed by <a href="mailto:ahmeddarhous@gmail.com">Ahmed Darhous</a> ©</sub>

</div>
