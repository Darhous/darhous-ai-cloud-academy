# 🧠 RAG Mentor Plan — Darhous AI Cloud Academy

> Foundation laid in v3.0. Full RAG requires pgvector + embedding pipeline.

---

## Current State

The AI Mentor (`/api/mentor`) currently uses a static system prompt with no content retrieval.  
The `supabase/rag_schema.sql` creates the foundation tables for future RAG.

---

## Architecture Plan

```
User Question
    ↓
/api/mentor-rag (future route)
    ↓
1. Generate embedding for question (Gemini or OpenAI)
    ↓
2. Vector similarity search in content_index
    ↓
3. Retrieve top-5 relevant content chunks
    ↓
4. Inject chunks as context into Gemini prompt
    ↓
5. Stream response with citations
    ↓
User sees answer with source links
```

---

## Step 1: Enable pgvector in Supabase

```sql
-- Run in Supabase SQL Editor (requires Supabase Pro or manual enable):
CREATE EXTENSION IF NOT EXISTS vector;

-- Add embedding column to content_index:
ALTER TABLE public.content_index
  ADD COLUMN IF NOT EXISTS embedding vector(768);

-- Create vector index for fast search:
CREATE INDEX IF NOT EXISTS content_index_embedding_idx
  ON public.content_index
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);
```

---

## Step 2: Populate content_index

Create `scripts/populate-content-index.ts`:

```typescript
import { createClient } from "@supabase/supabase-js";
import { courses } from "../src/data/courses";
import { tools } from "../src/data/tools";
import { blogPosts } from "../src/data/blog";
import { prompts } from "../src/data/prompts";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function populate() {
  // Index courses
  for (const course of courses) {
    await supabase.from("content_index").upsert({
      source_type: "course",
      slug: course.id,
      locale: "ar",
      title: course.titleAr,
      content: `${course.titleAr} ${course.descriptionAr} ${course.skills?.join(" ")}`,
      metadata: { level: course.level, category: course.category },
    }, { onConflict: "source_type,slug,locale" });
  }
  // ... similar for tools, blog, prompts
  console.log("Content index populated!");
}

populate();
```

---

## Step 3: Generate Embeddings

Option A — Gemini embeddings:
```typescript
const res = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${apiKey}`,
  {
    method: "POST",
    body: JSON.stringify({ content: { parts: [{ text: contentText }] } }),
  }
);
const { embedding } = await res.json();
// embedding.values is a 768-dim array
```

Option B — OpenAI embeddings (text-embedding-3-small):
```typescript
const res = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: contentText,
});
const embedding = res.data[0].embedding;
```

---

## Step 4: Similarity Search

```sql
-- Example: find top-5 relevant content for a query embedding:
SELECT title, content, source_type, slug,
       1 - (embedding <=> $1::vector) AS similarity
FROM content_index
ORDER BY embedding <=> $1::vector
LIMIT 5;
```

In TypeScript:
```typescript
const { data } = await supabase.rpc("match_content", {
  query_embedding: embedding,
  match_threshold: 0.5,
  match_count: 5,
});
```

---

## Step 5: Augmented Prompt

```typescript
const retrievedContext = sources.map(s =>
  `[${s.source_type}: ${s.title}]\n${s.content}`
).join("\n\n---\n\n");

const systemPrompt = `
You are the Darhous AI Academy mentor.
Use the following academy content to answer the user's question accurately.
Always cite the source type and title.

Academy Content:
${retrievedContext}

If the content doesn't cover the question, answer from general AI knowledge.
`;
```

---

## Current Tables (from rag_schema.sql)

| Table | Purpose |
|-------|---------|
| `content_index` | Indexed content with optional embedding column |
| `mentor_sources` | Tracks which sources were used per session |

---

## Timeline

| Phase | Status |
|-------|--------|
| Foundation tables | ✅ Done (v3.0) |
| pgvector enable | 🔄 Manual (Supabase Pro required) |
| Population script | 📋 Next step |
| Embedding pipeline | 📋 After pgvector |
| RAG mentor route | 📋 After embeddings |
| Citation UI | 📋 After route |

---

## Notes

- Free Supabase plan may not support pgvector — check your plan
- Gemini `text-embedding-004` is free within generous limits
- Content index can be populated without pgvector (just no embeddings)
- The current `/api/search` does text-based search as a stopgap
