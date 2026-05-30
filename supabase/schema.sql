-- ============================================================
-- Darhous AI Cloud Academy — Supabase Schema
-- Version: 2.0.0
-- Run this in your Supabase SQL editor.
-- ============================================================

-- ── Helper: is_admin ────────────────────────────────────────
create or replace function public.is_admin(uid uuid)
returns boolean language sql security definer stable as $$
  select exists (
    select 1 from public.profiles where id = uid and role = 'admin'
  );
$$;

-- ── 1. profiles ─────────────────────────────────────────────
create table if not exists public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  email           text,
  full_name       text,
  avatar_url      text,
  role            text not null default 'student'
                  check (role in ('student','admin')),
  provider        text,
  locale          text not null default 'ar',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "Users read own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile"
  on public.profiles for update using (auth.uid() = id);
create policy "Admin reads all profiles"
  on public.profiles for select using (public.is_admin(auth.uid()));
create policy "Admin updates any profile"
  on public.profiles for update using (public.is_admin(auth.uid()));

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, provider)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'provider'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── 2. student_profiles ─────────────────────────────────────
create table if not exists public.student_profiles (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null references public.profiles(id) on delete cascade,
  level                 text default 'beginner',
  goal                  text,
  interests             text[],
  weekly_time           text,
  preferred_language    text default 'ar',
  onboarding_completed  boolean default false,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  unique (user_id)
);
alter table public.student_profiles enable row level security;
create policy "Own student profile" on public.student_profiles
  using (auth.uid() = user_id);
create policy "Admin reads all student profiles" on public.student_profiles
  for select using (public.is_admin(auth.uid()));

-- ── 3. course_progress ──────────────────────────────────────
create table if not exists public.course_progress (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  course_slug     text not null,
  status          text not null default 'not_started'
                  check (status in ('not_started','started','completed')),
  progress_percent int not null default 0,
  started_at      timestamptz,
  completed_at    timestamptz,
  last_opened_at  timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (user_id, course_slug)
);
alter table public.course_progress enable row level security;
create policy "Own course progress" on public.course_progress
  using (auth.uid() = user_id);
create policy "Admin reads course progress" on public.course_progress
  for select using (public.is_admin(auth.uid()));

-- ── 4. lesson_progress ──────────────────────────────────────
create table if not exists public.lesson_progress (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  course_slug   text not null,
  lesson_id     text not null,
  completed     boolean not null default false,
  completed_at  timestamptz,
  created_at    timestamptz not null default now(),
  unique (user_id, course_slug, lesson_id)
);
alter table public.lesson_progress enable row level security;
create policy "Own lesson progress" on public.lesson_progress
  using (auth.uid() = user_id);

-- ── 5. quiz_results ─────────────────────────────────────────
create table if not exists public.quiz_results (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  course_slug   text not null,
  quiz_id       text not null,
  score         int not null,
  total         int not null,
  percentage    int not null,
  answers       jsonb,
  created_at    timestamptz not null default now()
);
alter table public.quiz_results enable row level security;
create policy "Own quiz results" on public.quiz_results
  using (auth.uid() = user_id);
create policy "Admin reads quiz results" on public.quiz_results
  for select using (public.is_admin(auth.uid()));

-- ── 6. saved_prompts ────────────────────────────────────────
create table if not exists public.saved_prompts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  title       text not null,
  content     text not null,
  category    text,
  source      text,
  tags        text[],
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
alter table public.saved_prompts enable row level security;
create policy "Own saved prompts" on public.saved_prompts
  using (auth.uid() = user_id);

-- ── 7. favorite_items ───────────────────────────────────────
create table if not exists public.favorite_items (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  item_type   text not null
              check (item_type in ('course','tool','project','prompt','blog','nano_banana')),
  item_slug   text not null,
  created_at  timestamptz not null default now(),
  unique (user_id, item_type, item_slug)
);
alter table public.favorite_items enable row level security;
create policy "Own favorites" on public.favorite_items
  using (auth.uid() = user_id);

-- ── 8. community_subscribers ────────────────────────────────
create table if not exists public.community_subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text unique not null,
  level       text,
  interest    text,
  source      text,
  locale      text,
  user_id     uuid references public.profiles(id) on delete set null,
  created_at  timestamptz not null default now()
);
alter table public.community_subscribers enable row level security;
-- Anyone can subscribe
create policy "Anyone can subscribe" on public.community_subscribers
  for insert with check (true);
-- Only admin can read subscribers
create policy "Admin reads subscribers" on public.community_subscribers
  for select using (public.is_admin(auth.uid()));

-- ── 9. contact_messages ─────────────────────────────────────
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text,
  email       text,
  subject     text,
  message     text,
  source      text not null default 'contact',
  status      text not null default 'new'
              check (status in ('new','read','archived')),
  created_at  timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
create policy "Anyone can submit contact message" on public.contact_messages
  for insert with check (true);
create policy "Admin reads contact messages" on public.contact_messages
  for select using (public.is_admin(auth.uid()));
create policy "Admin updates contact message status" on public.contact_messages
  for update using (public.is_admin(auth.uid()));

-- ── 10. nano_banana_saved_prompts ───────────────────────────
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
create policy "Own nano banana prompts" on public.nano_banana_saved_prompts
  using (auth.uid() = user_id);

-- ── 11. admin_audit_logs ────────────────────────────────────
create table if not exists public.admin_audit_logs (
  id              uuid primary key default gen_random_uuid(),
  admin_user_id   uuid references public.profiles(id) on delete set null,
  action          text not null,
  target_type     text,
  target_id       text,
  metadata        jsonb,
  created_at      timestamptz not null default now()
);
alter table public.admin_audit_logs enable row level security;
create policy "Admin reads audit logs" on public.admin_audit_logs
  for select using (public.is_admin(auth.uid()));
create policy "Admin inserts audit logs" on public.admin_audit_logs
  for insert with check (public.is_admin(auth.uid()));

-- ── 12. platform_settings ───────────────────────────────────
create table if not exists public.platform_settings (
  key         text primary key,
  value       jsonb,
  updated_by  uuid references public.profiles(id) on delete set null,
  updated_at  timestamptz not null default now()
);
alter table public.platform_settings enable row level security;
create policy "Admin manages settings" on public.platform_settings
  using (public.is_admin(auth.uid()));
create policy "Admin inserts settings" on public.platform_settings
  for insert with check (public.is_admin(auth.uid()));

-- ── Promote user to admin ────────────────────────────────────
-- Run this manually to promote a user:
-- update public.profiles set role = 'admin' where email = 'your@email.com';

-- ── Enable Google + Apple OAuth ─────────────────────────────
-- Configure in Supabase Dashboard → Authentication → Providers
-- Google: needs Client ID + Secret from Google Cloud Console
-- Apple: needs Service ID, Team ID, Key ID, Private Key from Apple Developer

-- ============================================================
-- END OF SCHEMA
-- ============================================================
