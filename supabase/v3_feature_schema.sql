-- ============================================================
-- Darhous AI Cloud Academy — v3.0 Feature Schema Migration
-- Version: 3.0.0
-- Run this AFTER the base schema.sql in your Supabase SQL editor.
-- Safe to re-run: uses CREATE TABLE IF NOT EXISTS + CREATE POLICY IF NOT EXISTS
-- ============================================================

-- ── 1. certificates ─────────────────────────────────────────
create table if not exists public.certificates (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references public.profiles(id) on delete cascade,
  course_slug      text not null,
  course_title     text not null,
  certificate_code text unique not null default upper(substring(replace(gen_random_uuid()::text, '-', ''), 1, 12)),
  issued_at        timestamptz not null default now(),
  metadata         jsonb,
  created_at       timestamptz not null default now(),
  unique (user_id, course_slug)
);
alter table public.certificates enable row level security;
create policy "Own certificates read" on public.certificates
  for select using (auth.uid() = user_id);
create policy "Own certificates insert" on public.certificates
  for insert with check (auth.uid() = user_id);
create policy "Admin reads certificates" on public.certificates
  for select using (public.is_admin(auth.uid()));
-- Public read for verification (by code, no auth required)
create policy "Public verify certificate" on public.certificates
  for select using (true);

-- ── 2. learning_plans ───────────────────────────────────────
create table if not exists public.learning_plans (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references public.profiles(id) on delete cascade,
  title            text not null,
  goal             text,
  duration_days    int,
  plan             jsonb,
  progress_percent int not null default 0,
  status           text not null default 'active'
                   check (status in ('active', 'paused', 'completed', 'archived')),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
alter table public.learning_plans enable row level security;
create policy "Own learning plans" on public.learning_plans
  using (auth.uid() = user_id);
create policy "Own learning plans insert" on public.learning_plans
  for insert with check (auth.uid() = user_id);

-- ── 3. daily_tasks ──────────────────────────────────────────
create table if not exists public.daily_tasks (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references public.profiles(id) on delete cascade,
  learning_plan_id uuid references public.learning_plans(id) on delete set null,
  title            text not null,
  description      text,
  due_date         date,
  completed        boolean not null default false,
  source           text default 'manual',
  created_at       timestamptz not null default now()
);
alter table public.daily_tasks enable row level security;
create policy "Own daily tasks" on public.daily_tasks
  using (auth.uid() = user_id);
create policy "Own daily tasks insert" on public.daily_tasks
  for insert with check (auth.uid() = user_id);

-- ── 4. challenges ───────────────────────────────────────────
create table if not exists public.challenges (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       jsonb not null,
  description jsonb not null,
  category    text not null default 'prompt',
  difficulty  text not null default 'beginner'
              check (difficulty in ('beginner','intermediate','advanced')),
  points      int not null default 10,
  starts_at   timestamptz,
  ends_at     timestamptz,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);
alter table public.challenges enable row level security;
-- Public read for active challenges
create policy "Public read active challenges" on public.challenges
  for select using (is_active = true);
create policy "Admin manages challenges" on public.challenges
  using (public.is_admin(auth.uid()));

-- ── 5. challenge_submissions ────────────────────────────────
create table if not exists public.challenge_submissions (
  id           uuid primary key default gen_random_uuid(),
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  user_id      uuid not null references public.profiles(id) on delete cascade,
  content      text not null,
  score        int,
  status       text not null default 'submitted'
               check (status in ('submitted','reviewed','approved','rejected')),
  created_at   timestamptz not null default now()
);
alter table public.challenge_submissions enable row level security;
create policy "Own submissions" on public.challenge_submissions
  using (auth.uid() = user_id);
create policy "Own submissions insert" on public.challenge_submissions
  for insert with check (auth.uid() = user_id);
create policy "Admin reads submissions" on public.challenge_submissions
  for select using (public.is_admin(auth.uid()));

-- ── 6. prompt_scores ────────────────────────────────────────
create table if not exists public.prompt_scores (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references public.profiles(id) on delete cascade,
  prompt           text not null,
  score            int not null,
  analysis         jsonb,
  improved_prompt  text,
  created_at       timestamptz not null default now()
);
alter table public.prompt_scores enable row level security;
create policy "Own prompt scores" on public.prompt_scores
  using (auth.uid() = user_id);
create policy "Own prompt scores insert" on public.prompt_scores
  for insert with check (auth.uid() = user_id);

-- ── 7. prompt_battles ───────────────────────────────────────
create table if not exists public.prompt_battles (
  id        uuid primary key default gen_random_uuid(),
  user_id   uuid not null references public.profiles(id) on delete cascade,
  prompt_a  text not null,
  prompt_b  text not null,
  winner    text check (winner in ('a','b','tie')),
  analysis  jsonb,
  created_at timestamptz not null default now()
);
alter table public.prompt_battles enable row level security;
create policy "Own prompt battles" on public.prompt_battles
  using (auth.uid() = user_id);
create policy "Own prompt battles insert" on public.prompt_battles
  for insert with check (auth.uid() = user_id);

-- ── 8. public_profiles ──────────────────────────────────────
create table if not exists public.public_profiles (
  user_id             uuid primary key references public.profiles(id) on delete cascade,
  username            text unique,
  display_name        text,
  bio                 text,
  is_public           boolean not null default false,
  show_certificates   boolean not null default true,
  show_streak         boolean not null default true,
  show_projects       boolean not null default true,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
alter table public.public_profiles enable row level security;
-- Public can read public profiles
create policy "Public read public profiles" on public.public_profiles
  for select using (is_public = true);
-- Users manage their own public profile
create policy "Own public profile read" on public.public_profiles
  for select using (auth.uid() = user_id);
create policy "Own public profile write" on public.public_profiles
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── 9. analytics_events ─────────────────────────────────────
create table if not exists public.analytics_events (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references public.profiles(id) on delete set null,
  event_name  text not null,
  entity_type text,
  entity_slug text,
  metadata    jsonb,
  created_at  timestamptz not null default now()
);
alter table public.analytics_events enable row level security;
-- Anyone can insert analytics events (app sends these)
create policy "Anyone insert analytics" on public.analytics_events
  for insert with check (true);
-- Only admin reads analytics
create policy "Admin reads analytics" on public.analytics_events
  for select using (public.is_admin(auth.uid()));

-- ── 10. email_sequence_events ───────────────────────────────
create table if not exists public.email_sequence_events (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references public.profiles(id) on delete set null,
  email         text not null,
  sequence_name text not null,
  step_key      text not null,
  status        text not null default 'pending'
                check (status in ('pending','sent','failed','skipped')),
  sent_at       timestamptz,
  created_at    timestamptz not null default now()
);
alter table public.email_sequence_events enable row level security;
-- Only service role (admin) can read/write email events
create policy "Admin manages email sequences" on public.email_sequence_events
  using (public.is_admin(auth.uid()));
create policy "Admin inserts email sequences" on public.email_sequence_events
  for insert with check (public.is_admin(auth.uid()));

-- ── 11. content_items ───────────────────────────────────────
create table if not exists public.content_items (
  id          uuid primary key default gen_random_uuid(),
  type        text not null check (type in ('course','blog','prompt','tool','project','nano_banana','other')),
  slug        text not null,
  title       jsonb not null,
  description jsonb,
  body        text,
  metadata    jsonb,
  status      text not null default 'draft'
              check (status in ('draft','published','archived')),
  created_by  uuid references public.profiles(id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (type, slug)
);
alter table public.content_items enable row level security;
-- Admin only
create policy "Admin manages content items" on public.content_items
  using (public.is_admin(auth.uid()));
create policy "Admin inserts content items" on public.content_items
  for insert with check (public.is_admin(auth.uid()));
-- Public read published items
create policy "Public reads published content" on public.content_items
  for select using (status = 'published');

-- ── 12. tool_comparisons ────────────────────────────────────
create table if not exists public.tool_comparisons (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       jsonb not null,
  tools       jsonb not null,
  comparison  jsonb,
  created_at  timestamptz not null default now()
);
alter table public.tool_comparisons enable row level security;
create policy "Public reads tool comparisons" on public.tool_comparisons
  for select using (true);
create policy "Admin manages tool comparisons" on public.tool_comparisons
  using (public.is_admin(auth.uid()));

-- ── 13. user_preferences ────────────────────────────────────
create table if not exists public.user_preferences (
  user_id           uuid primary key references public.profiles(id) on delete cascade,
  theme             text default 'dark',
  content_level     text default 'beginner',
  interests         text[],
  preferred_ai_tool text,
  updated_at        timestamptz not null default now()
);
alter table public.user_preferences enable row level security;
create policy "Own preferences" on public.user_preferences
  using (auth.uid() = user_id);
create policy "Own preferences insert" on public.user_preferences
  for insert with check (auth.uid() = user_id);

-- ── 14. user_projects ───────────────────────────────────────
create table if not exists public.user_projects (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  project_slug  text not null,
  status        text not null default 'not_started'
                check (status in ('not_started','in_progress','completed','paused')),
  current_step  int not null default 0,
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (user_id, project_slug)
);
alter table public.user_projects enable row level security;
create policy "Own user projects" on public.user_projects
  using (auth.uid() = user_id);
create policy "Own user projects insert" on public.user_projects
  for insert with check (auth.uid() = user_id);

-- ── 15. Ensure nano_banana_saved_prompts exists ─────────────
-- (already in base schema, this is a no-op if it exists)
create table if not exists public.nano_banana_saved_prompts (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  prompt_id       text not null,
  prompt_title    text,
  prompt_content  text,
  category        text,
  created_at      timestamptz not null default now(),
  unique (user_id, prompt_id)
);
alter table public.nano_banana_saved_prompts enable row level security;
do $$ begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'nano_banana_saved_prompts'
    and policyname = 'Own nano banana prompts v3'
  ) then
    create policy "Own nano banana prompts v3" on public.nano_banana_saved_prompts
      using (auth.uid() = user_id);
  end if;
end $$;

-- ── Seed: starter challenges ─────────────────────────────────
insert into public.challenges (slug, title, description, category, difficulty, points, is_active)
values
  (
    'prompt-clarity-challenge',
    '{"ar": "تحدي وضوح البرومبت", "en": "Prompt Clarity Challenge"}',
    '{"ar": "اكتب برومبت واضحاً ومحدداً للحصول على أفضل نتيجة من AI. ابدأ بـ: أنت خبير في...", "en": "Write a clear, specific prompt to get the best AI output. Start with: You are an expert in..."}',
    'prompt', 'beginner', 10, true
  ),
  (
    'nano-banana-creative',
    '{"ar": "تحدي Nano Banana الإبداعي", "en": "Nano Banana Creative Challenge"}',
    '{"ar": "استخدم Nano Banana لتحويل صورتك إلى لوحة فنية فريدة. شارك البرومبت الذي استخدمته.", "en": "Use Nano Banana to transform your photo into a unique artwork. Share the prompt you used."}',
    'nano_banana', 'beginner', 15, true
  ),
  (
    'claude-code-challenge',
    '{"ar": "تحدي Claude Code", "en": "Claude Code Challenge"}',
    '{"ar": "استخدم Claude Code لبناء أداة صغيرة مفيدة في أقل من 30 دقيقة. شارك الكود والنتيجة.", "en": "Use Claude Code to build a small useful tool in under 30 minutes. Share the code and result."}',
    'claude_code', 'intermediate', 25, true
  ),
  (
    'ai-project-launch',
    '{"ar": "تحدي إطلاق مشروع AI", "en": "AI Project Launch Challenge"}',
    '{"ar": "انشر مشروع AI على Vercel أو GitHub. يجب أن يستخدم API أو نموذج AI حقيقي.", "en": "Deploy an AI project to Vercel or GitHub. Must use a real API or AI model."}',
    'project', 'advanced', 50, true
  )
on conflict (slug) do nothing;

-- ── Storage: avatars bucket instructions ─────────────────────
-- Run manually in Supabase Dashboard → Storage → Create bucket:
-- Bucket name: avatars
-- Public bucket: NO (use signed URLs or configure per below)
-- After creating, run these policies in SQL editor:

-- create policy "Users upload own avatar"
-- on storage.objects for insert with check (
--   bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]
-- );
-- create policy "Users read own avatar"
-- on storage.objects for select using (
--   bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]
-- );
-- create policy "Public reads avatars"
-- on storage.objects for select using (bucket_id = 'avatars');
-- create policy "Users update own avatar"
-- on storage.objects for update using (
--   bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]
-- );
-- create policy "Users delete own avatar"
-- on storage.objects for delete using (
--   bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]
-- );

-- ============================================================
-- END OF v3 SCHEMA
-- ============================================================
