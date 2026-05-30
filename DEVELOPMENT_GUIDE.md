# 🔧 Development Guide — Darhous AI Cloud Academy

## Prerequisites

- Node.js 20+
- npm 10+
- VS Code (recommended)

## Installation

```bash
# Navigate to project
cd "C:\Users\ahmed\Desktop\ai cources\darhous-ai-cloud-academy"

# Install dependencies
npm install

# Set up environment variables (required for AI Mentor)
# Copy .env.example to .env.local and fill in GEMINI_API_KEY
copy .env.example .env.local

# Start development server
npm run dev
```

Open:
- Arabic: http://localhost:3000/ar
- English: http://localhost:3000/en

## Available Commands

```bash
npm run dev    # Development server (Turbopack)
npm run build  # Production build
npm start      # Start production server
npm run lint   # ESLint check
```

## Folder Structure Quick Reference

```
src/app/[locale]/   → Pages (one folder per route)
src/components/     → All reusable components
src/data/           → All content (courses, tools, etc.)
src/messages/       → Translation files
src/lib/            → Utilities and helpers
```

## Adding a New Dependency

```bash
npm install package-name
```

Safe to add: `fuse.js`, `react-pdf`, `@supabase/supabase-js`, `gray-matter`, `@next/mdx`

Avoid: Large UI libraries (MUI, Chakra), heavy animation libraries

## Troubleshooting

### Port already in use
```bash
npx kill-port 3000
npm run dev
```

### TypeScript errors
```bash
npm run build 2>&1 | head -50
```

### CSS not updating
Restart the dev server: Ctrl+C then `npm run dev`

### Images not loading
Place in `/public/` and reference as `/image.png`

## Code Style

- Use `"use client"` only for components with hooks/browser APIs
- Keep server components where possible (data fetching)
- Use `style={{}}` prop for dynamic CSS variables (Tailwind v4 doesn't support arbitrary CSS var values in className)
- Follow existing naming conventions

## Git Workflow

```bash
# Feature branch
git checkout -b feature/blog-mdx

# Commit with description
git commit -m "feat: add MDX blog support"

# Merge to main
git checkout main
git merge feature/blog-mdx
git push
```

## Dependency Update Safety

Before updating packages:
1. Check Next.js changelog for breaking changes
2. Run `npm run build` after any major update
3. Test Arabic and English pages
4. Test dark/light mode toggle

Safe to update regularly:
- `lucide-react`
- `clsx`
- `tailwind-merge`

Test carefully before updating:
- `next` (breaking changes possible)
- `tailwindcss` (v4 is very different from v3)
- `typescript`
