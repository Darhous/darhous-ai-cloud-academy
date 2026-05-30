# 📐 Content Architecture — Darhous AI Cloud Academy

All content is stored in TypeScript data files in `src/data/`. No database required for MVP.

## Course Format (`src/data/courses.ts`)

```typescript
interface Course {
  id: string;              // URL-safe unique ID
  titleAr: string;         // Arabic title
  titleEn: string;         // English title
  descriptionAr: string;   // Arabic description (1-2 sentences)
  descriptionEn: string;   // English description
  level: "beginner" | "intermediate" | "advanced";
  lessons: number;         // Total lesson count
  hours: number;           // Estimated hours
  projects: number;        // Number of projects
  skills: string[];        // Key skills (3-5)
  category: string;        // Category for filtering
  icon: string;            // Emoji icon
  featured: boolean;       // Show on home page
  color: string;           // "blue" | "violet" | "cyan" | "green"
}
```

## Tool Format (`src/data/tools.ts`)

```typescript
interface Tool {
  id: string;
  name: string;
  category: string;
  shortDescriptionAr: string;
  shortDescriptionEn: string;
  useCases: string[];
  level: "beginner" | "intermediate" | "advanced";
  pricingType: "free" | "freemium" | "paid" | "open-source";
  bestFor: string;
  tags: string[];
  featured: boolean;
  website?: string;
}
```

## Prompt Format (`src/data/prompts.ts`)

```typescript
interface Prompt {
  id: string;
  titleAr: string;
  titleEn: string;
  category: string;        // Claude | Coding | Research | Business | etc.
  useCaseAr: string;
  useCaseEn: string;
  promptText: string;      // The actual prompt (can use [VARIABLES])
  difficulty: "beginner" | "intermediate" | "advanced";
  bestModel: string;       // "Claude Sonnet" | "Claude Opus" | etc.
  tags: string[];
}
```

## Project Format (`src/data/projects.ts`)

```typescript
interface Project {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  stack: string[];
  skills: string[];
  expectedOutput: string;
  expectedOutputAr: string;
  futureIdea: string;
  futureIdeaAr: string;
  category: string;
  icon: string;
  featured: boolean;
}
```

## Blog Post Format (`src/data/blog.ts`)

```typescript
interface BlogPost {
  id: string;
  titleAr: string;
  titleEn: string;
  excerptAr: string;       // 1-2 sentence preview
  excerptEn: string;
  category: string;
  readingTime: number;     // Minutes
  date: string;            // "YYYY-MM-DD"
  featured: boolean;
  tags: string[];
  icon: string;
}
```

## Glossary Term Format (`src/data/glossary.ts`)

```typescript
interface GlossaryTerm {
  id: string;
  term: string;            // Technical term (English)
  definitionAr: string;   // Full Arabic definition
  definitionEn: string;   // Full English definition
  exampleAr: string;      // Real-world example in Arabic
  exampleEn: string;      // Real-world example in English
  category: string;       // Core AI | Cloud | Development | etc.
}
```

## Roadmap Format (`src/data/roadmaps.ts`)

```typescript
interface Roadmap {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  level: "beginner" | "intermediate" | "advanced";
  totalWeeks: number;
  outcome: string;
  outcomeAr: string;
  icon: string;
  color: string;
  nodes: RoadmapNode[];   // Each step in the path
}
```

## Expansion Plan

As content grows:

1. **Phase 2:** Add MDX files for full blog post content
   - `src/content/blog/[id].mdx`
   - Use `@next/mdx` or `next-mdx-remote`

2. **Phase 4:** Move to Supabase
   - Migrate data files to database tables
   - Keep TypeScript interfaces as API response types
   - Use Supabase realtime for live updates

3. **Phase 8:** Add admin panel
   - CRUD interface for all content types
   - Image uploads to Supabase Storage
   - Draft/publish workflow
