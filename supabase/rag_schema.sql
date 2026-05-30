-- ============================================================
-- Darhous AI Cloud Academy — RAG Foundation Schema
-- Version: 3.0.0
-- This file sets up the foundation for Retrieval-Augmented Generation.
-- Full RAG requires pgvector extension. See RAG_MENTOR_PLAN.md.
-- ============================================================

-- ── Enable pgvector (run first, requires Supabase pro or manual enable) ──
-- Run this ONLY if pgvector is available on your Supabase plan:
-- create extension if not exists vector;

-- ── content_index ───────────────────────────────────────────
-- Stores indexed content for mentor retrieval.
-- embedding column is optional — add only after enabling pgvector.
create table if not exists public.content_index (
  id           uuid primary key default gen_random_uuid(),
  source_type  text not null check (source_type in ('course','blog','tool','project','prompt','nano_banana','glossary')),
  slug         text not null,
  locale       text not null default 'ar',
  title        text not null,
  content      text not null,
  metadata     jsonb,
  -- embedding vector(768), -- Uncomment after enabling pgvector
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (source_type, slug, locale)
);
alter table public.content_index enable row level security;
-- Public read (content is not sensitive)
create policy "Public reads content index" on public.content_index
  for select using (true);
-- Admin manages content index
create policy "Admin manages content index" on public.content_index
  using (public.is_admin(auth.uid()));
create policy "Admin inserts content index" on public.content_index
  for insert with check (public.is_admin(auth.uid()));

-- ── mentor_sources ──────────────────────────────────────────
-- Tracks which content sources were used in a mentor response.
create table if not exists public.mentor_sources (
  id          uuid primary key default gen_random_uuid(),
  session_id  text,
  sources     jsonb not null,
  created_at  timestamptz not null default now()
);
alter table public.mentor_sources enable row level security;
create policy "Anyone inserts mentor sources" on public.mentor_sources
  for insert with check (true);
create policy "Admin reads mentor sources" on public.mentor_sources
  for select using (public.is_admin(auth.uid()));

-- ── How to populate content_index ───────────────────────────
-- Run this SQL to index all courses (example):
-- INSERT INTO content_index (source_type, slug, locale, title, content, metadata)
-- SELECT 'course', id, 'ar', title_ar, description_ar, jsonb_build_object('level', level, 'category', category)
-- FROM ... (your courses table if migrated to DB)
-- Currently courses are in /src/data/courses.ts — run the populate script:
-- node scripts/populate-content-index.js

-- ── pgvector similarity search (future) ─────────────────────
-- After enabling pgvector + adding embedding column:
-- CREATE INDEX ON content_index USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
--
-- Example search query:
-- SELECT title, content, 1 - (embedding <=> query_embedding) as similarity
-- FROM content_index
-- ORDER BY embedding <=> query_embedding
-- LIMIT 5;

-- ============================================================
-- END OF RAG SCHEMA
-- ============================================================
