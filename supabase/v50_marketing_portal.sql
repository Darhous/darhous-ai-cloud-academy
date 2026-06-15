-- ══════════════════════════════════════════════════════════════════
-- v50 — Marketing Academy Portal
-- Run in: Supabase Dashboard → SQL Editor (idempotent, safe to re-run)
-- ──────────────────────────────────────────────────────────────────
-- Adds the `marketing` portal: content tables (tracks/modules/lessons/
-- assignments/case_studies/simulations/audits/glossary), student-state
-- tables (submissions, lab_progress), and a reusable gamification layer
-- (xp, xp_events, badges, user_badges, achievements).
--
-- Conventions match v28+: id TEXT PK (slug), portal_id/content_type/status,
-- updated_at trigger, RLS = public_read_published_* + admin_manage_*.
-- Student-state + gamification tables use own-row RLS (auth.uid() = user_id).
-- ══════════════════════════════════════════════════════════════════

-- ──────────────────────────────────────────────────────────────────
-- Shared trigger function (one generic fn for all marketing tables)
-- ──────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_marketing_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- Helper: admin check via profiles.role
-- (mirrors existing admin_manage_* policies in v28+)

-- ══════════════════════════════════════════════════════════════════
-- 1. CONTENT TABLES
-- ══════════════════════════════════════════════════════════════════

-- ── marketing_tracks ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS marketing_tracks (
  id              TEXT PRIMARY KEY,
  portal_id       TEXT NOT NULL DEFAULT 'marketing',
  content_type    TEXT NOT NULL DEFAULT 'track',
  status          TEXT NOT NULL DEFAULT 'published'
                    CHECK (status IN ('published','draft','archived')),
  featured        BOOLEAN NOT NULL DEFAULT false,
  sort_order      INT NOT NULL DEFAULT 0,
  stage           TEXT NOT NULL DEFAULT 'beginner'
                    CHECK (stage IN ('beginner','intermediate','advanced','expert')),
  difficulty      INT  NOT NULL DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5),
  duration_hours  INT  NOT NULL DEFAULT 0,
  title_ar        TEXT NOT NULL DEFAULT '',
  title_en        TEXT NOT NULL DEFAULT '',
  description_ar  TEXT NOT NULL DEFAULT '',
  description_en  TEXT NOT NULL DEFAULT '',
  skills_ar       TEXT[] NOT NULL DEFAULT '{}',
  skills_en       TEXT[] NOT NULL DEFAULT '{}',
  prereqs         TEXT[] NOT NULL DEFAULT '{}',
  final_project_ar TEXT NOT NULL DEFAULT '',
  final_project_en TEXT NOT NULL DEFAULT '',
  icon            TEXT NOT NULL DEFAULT '',
  color           TEXT NOT NULL DEFAULT '#ec4899',
  created_by      UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at     TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_marketing_tracks_status ON marketing_tracks (status);
CREATE INDEX IF NOT EXISTS idx_marketing_tracks_stage  ON marketing_tracks (stage);

-- ── marketing_modules ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS marketing_modules (
  id           TEXT PRIMARY KEY,
  portal_id    TEXT NOT NULL DEFAULT 'marketing',
  content_type TEXT NOT NULL DEFAULT 'module',
  status       TEXT NOT NULL DEFAULT 'published'
                 CHECK (status IN ('published','draft','archived')),
  track_id     TEXT NOT NULL,
  sort_order   INT  NOT NULL DEFAULT 0,
  title_ar     TEXT NOT NULL DEFAULT '',
  title_en     TEXT NOT NULL DEFAULT '',
  summary_ar   TEXT NOT NULL DEFAULT '',
  summary_en   TEXT NOT NULL DEFAULT '',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_marketing_modules_track ON marketing_modules (track_id, sort_order);

-- ── marketing_lessons ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS marketing_lessons (
  id           TEXT PRIMARY KEY,
  portal_id    TEXT NOT NULL DEFAULT 'marketing',
  content_type TEXT NOT NULL DEFAULT 'lesson',
  status       TEXT NOT NULL DEFAULT 'published'
                 CHECK (status IN ('published','draft','archived')),
  module_id    TEXT NOT NULL,
  track_id     TEXT NOT NULL,
  sort_order   INT  NOT NULL DEFAULT 0,
  est_minutes  INT  NOT NULL DEFAULT 0,
  title_ar     TEXT NOT NULL DEFAULT '',
  title_en     TEXT NOT NULL DEFAULT '',
  objectives   TEXT[] NOT NULL DEFAULT '{}',
  blocks       JSONB NOT NULL DEFAULT '[]'::jsonb,   -- ordered content blocks
  topics       JSONB NOT NULL DEFAULT '[]'::jsonb,   -- fine-grained topics
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_marketing_lessons_module ON marketing_lessons (module_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_marketing_lessons_track  ON marketing_lessons (track_id);

-- ── marketing_assignments ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS marketing_assignments (
  id            TEXT PRIMARY KEY,
  portal_id     TEXT NOT NULL DEFAULT 'marketing',
  content_type  TEXT NOT NULL DEFAULT 'assignment',
  status        TEXT NOT NULL DEFAULT 'published'
                  CHECK (status IN ('published','draft','archived')),
  track_id      TEXT NOT NULL DEFAULT '',
  lesson_id     TEXT,
  level         TEXT NOT NULL DEFAULT 'beginner',
  sort_order    INT  NOT NULL DEFAULT 0,
  title_ar      TEXT NOT NULL DEFAULT '',
  title_en      TEXT NOT NULL DEFAULT '',
  brief_ar      TEXT NOT NULL DEFAULT '',
  brief_en      TEXT NOT NULL DEFAULT '',
  deliverable   TEXT NOT NULL DEFAULT '',
  rubric        JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_capstone   BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_marketing_assignments_track ON marketing_assignments (track_id);

-- ── marketing_case_studies ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS marketing_case_studies (
  id           TEXT PRIMARY KEY,
  portal_id    TEXT NOT NULL DEFAULT 'marketing',
  content_type TEXT NOT NULL DEFAULT 'case_study',
  status       TEXT NOT NULL DEFAULT 'published'
                 CHECK (status IN ('published','draft','archived')),
  track_id     TEXT NOT NULL DEFAULT '',
  sort_order   INT  NOT NULL DEFAULT 0,
  title_ar     TEXT NOT NULL DEFAULT '',
  title_en     TEXT NOT NULL DEFAULT '',
  body_ar      TEXT,
  body_en      TEXT,
  metrics      JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── marketing_simulations ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS marketing_simulations (
  id              TEXT PRIMARY KEY,
  portal_id       TEXT NOT NULL DEFAULT 'marketing',
  content_type    TEXT NOT NULL DEFAULT 'simulation',
  status          TEXT NOT NULL DEFAULT 'published'
                    CHECK (status IN ('published','draft','archived')),
  track_id        TEXT NOT NULL DEFAULT '',
  sort_order      INT  NOT NULL DEFAULT 0,
  title_ar        TEXT NOT NULL DEFAULT '',
  title_en        TEXT NOT NULL DEFAULT '',
  scenario        JSONB NOT NULL DEFAULT '{}'::jsonb,
  starting_budget INT  NOT NULL DEFAULT 0,
  kpi_targets     JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── marketing_audits ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS marketing_audits (
  id           TEXT PRIMARY KEY,
  portal_id    TEXT NOT NULL DEFAULT 'marketing',
  content_type TEXT NOT NULL DEFAULT 'audit',
  status       TEXT NOT NULL DEFAULT 'published'
                 CHECK (status IN ('published','draft','archived')),
  track_id     TEXT NOT NULL DEFAULT '',
  sort_order   INT  NOT NULL DEFAULT 0,
  title_ar     TEXT NOT NULL DEFAULT '',
  title_en     TEXT NOT NULL DEFAULT '',
  checklist    JSONB NOT NULL DEFAULT '[]'::jsonb,
  scoring      JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── marketing_glossary ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS marketing_glossary (
  id            TEXT PRIMARY KEY,
  portal_id     TEXT NOT NULL DEFAULT 'marketing',
  content_type  TEXT NOT NULL DEFAULT 'glossary',
  status        TEXT NOT NULL DEFAULT 'published'
                  CHECK (status IN ('published','draft','archived')),
  sort_order    INT  NOT NULL DEFAULT 0,
  term_ar       TEXT NOT NULL DEFAULT '',
  term_en       TEXT NOT NULL DEFAULT '',
  definition_ar TEXT NOT NULL DEFAULT '',
  definition_en TEXT NOT NULL DEFAULT '',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ══════════════════════════════════════════════════════════════════
-- 2. STUDENT-STATE TABLES (own-row RLS)
-- ══════════════════════════════════════════════════════════════════

-- ── marketing_submissions ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS marketing_submissions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  assignment_id TEXT NOT NULL,
  track_id      TEXT NOT NULL DEFAULT '',
  content       TEXT,
  attachments   JSONB NOT NULL DEFAULT '[]'::jsonb,
  status        TEXT NOT NULL DEFAULT 'submitted'
                  CHECK (status IN ('submitted','in_review','approved','revise')),
  ai_score      INT,
  ai_feedback   TEXT,
  reviewer_id   UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  grade         INT,
  reviewer_note TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, assignment_id)
);
CREATE INDEX IF NOT EXISTS idx_marketing_submissions_user ON marketing_submissions (user_id);

-- ── marketing_lab_progress (mirrors automation_lab_progress) ───────
CREATE TABLE IF NOT EXISTS marketing_lab_progress (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  lab_id        TEXT NOT NULL,
  checked_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  completed     BOOLEAN NOT NULL DEFAULT false,
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, lab_id)
);
CREATE INDEX IF NOT EXISTS idx_marketing_lab_progress_user ON marketing_lab_progress (user_id);

-- ══════════════════════════════════════════════════════════════════
-- 3. GAMIFICATION (own-row RLS; designed to graduate to global later)
-- ══════════════════════════════════════════════════════════════════

-- ── marketing_xp (one row per user) ───────────────────────────────
CREATE TABLE IF NOT EXISTS marketing_xp (
  user_id        UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  total_xp       INT NOT NULL DEFAULT 0,
  level          INT NOT NULL DEFAULT 1,
  current_streak INT NOT NULL DEFAULT 0,
  longest_streak INT NOT NULL DEFAULT 0,
  last_active    DATE,
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── marketing_xp_events (append-only ledger) ──────────────────────
CREATE TABLE IF NOT EXISTS marketing_xp_events (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  action     TEXT NOT NULL,
  xp         INT  NOT NULL DEFAULT 0,
  ref        TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_marketing_xp_events_user ON marketing_xp_events (user_id, created_at DESC);

-- ── marketing_badges (catalog) ────────────────────────────────────
CREATE TABLE IF NOT EXISTS marketing_badges (
  id          TEXT PRIMARY KEY,
  title_ar    TEXT NOT NULL DEFAULT '',
  title_en    TEXT NOT NULL DEFAULT '',
  desc_ar     TEXT NOT NULL DEFAULT '',
  desc_en     TEXT NOT NULL DEFAULT '',
  icon        TEXT NOT NULL DEFAULT '🏅',
  criteria    JSONB NOT NULL DEFAULT '{}'::jsonb,
  sort_order  INT NOT NULL DEFAULT 0
);

-- ── marketing_user_badges ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS marketing_user_badges (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  badge_id  TEXT NOT NULL,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, badge_id)
);

-- ── marketing_achievements ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS marketing_achievements (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  kind       TEXT NOT NULL,
  title_ar   TEXT NOT NULL DEFAULT '',
  title_en   TEXT NOT NULL DEFAULT '',
  meta       JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_marketing_achievements_user ON marketing_achievements (user_id);

-- ══════════════════════════════════════════════════════════════════
-- 4. TRIGGERS (updated_at) — content + state tables
-- ══════════════════════════════════════════════════════════════════
DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'marketing_tracks','marketing_modules','marketing_lessons','marketing_assignments',
    'marketing_case_studies','marketing_simulations','marketing_audits','marketing_glossary',
    'marketing_submissions'
  ]
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_%1$s_updated_at ON %1$s;', t);
    EXECUTE format(
      'CREATE TRIGGER trg_%1$s_updated_at BEFORE UPDATE ON %1$s
         FOR EACH ROW EXECUTE FUNCTION update_marketing_updated_at();', t);
  END LOOP;
END $$;

-- ══════════════════════════════════════════════════════════════════
-- 5. ROW LEVEL SECURITY
-- ══════════════════════════════════════════════════════════════════

-- 5a. Content tables: public read published + admin manage
DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'marketing_tracks','marketing_modules','marketing_lessons','marketing_assignments',
    'marketing_case_studies','marketing_simulations','marketing_audits','marketing_glossary',
    'marketing_badges'
  ]
  LOOP
    EXECUTE format('ALTER TABLE %1$s ENABLE ROW LEVEL SECURITY;', t);
    EXECUTE format('DROP POLICY IF EXISTS "public_read_published_%1$s" ON %1$s;', t);
    EXECUTE format(
      'CREATE POLICY "public_read_published_%1$s" ON %1$s FOR SELECT USING (%2$s);',
      t,
      CASE WHEN t = 'marketing_badges' THEN 'true' ELSE 'status = ''published''' END
    );
    EXECUTE format('DROP POLICY IF EXISTS "admin_manage_%1$s" ON %1$s;', t);
    EXECUTE format(
      'CREATE POLICY "admin_manage_%1$s" ON %1$s FOR ALL
         USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = ''admin''))
         WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = ''admin''));',
      t);
  END LOOP;
END $$;

-- 5b. Student-state + gamification: own-row RLS
ALTER TABLE marketing_submissions   ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_lab_progress  ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_xp            ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_xp_events     ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_user_badges   ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_achievements  ENABLE ROW LEVEL SECURITY;

-- submissions: student owns; reviewers/admin can read+grade
DROP POLICY IF EXISTS "own_marketing_submissions" ON marketing_submissions;
CREATE POLICY "own_marketing_submissions" ON marketing_submissions
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "review_marketing_submissions" ON marketing_submissions;
CREATE POLICY "review_marketing_submissions" ON marketing_submissions
  FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin','mentor','reviewer','instructor')))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin','mentor','reviewer','instructor')));

DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'marketing_lab_progress','marketing_xp','marketing_xp_events',
    'marketing_user_badges','marketing_achievements'
  ]
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "own_%1$s" ON %1$s;', t);
    EXECUTE format(
      'CREATE POLICY "own_%1$s" ON %1$s FOR ALL
         USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);', t);
  END LOOP;
END $$;

-- ══════════════════════════════════════════════════════════════════
-- 6. SEED — the 16 tracks (matches src/data/marketing/tracks.ts)
--    Modules/lessons are seeded by the content pipeline; tracks here
--    so the public route's fetchPublishedList merge works immediately.
-- ══════════════════════════════════════════════════════════════════
INSERT INTO marketing_tracks
  (id, sort_order, stage, difficulty, duration_hours, title_ar, title_en, description_ar, description_en, prereqs, icon, color, featured)
VALUES
  ('marketing-foundations',     1, 'beginner',     1, 8,  'أساسيات التسويق', 'Marketing Foundations', 'النموذج الذهني للتسويق الحديث.', 'The mental model of modern marketing.', '{}', '🎯', '#22c55e', true),
  ('branding-positioning',      2, 'beginner',     2, 6,  'العلامة التجارية والتموضع', 'Branding & Positioning', 'ابنِ علامة يتم اختيارها لا مجرد رؤيتها.', 'Build a brand that is chosen, not just seen.', '{marketing-foundations}', '✨', '#22c55e', false),
  ('copywriting',               3, 'beginner',     2, 10, 'كتابة الإعلانات', 'Copywriting', 'الإقناع على الصفحة بأطر مثبتة.', 'Persuasion on the page with proven frameworks.', '{marketing-foundations}', '✍️', '#22c55e', true),
  ('content-marketing',         4, 'intermediate', 2, 10, 'تسويق المحتوى', 'Content Marketing', 'ابنِ محرك محتوى متكامل.', 'Build a complete content engine.', '{marketing-foundations,copywriting}', '📝', '#3b82f6', false),
  ('social-media-marketing',    5, 'intermediate', 2, 9,  'التسويق عبر وسائل التواصل', 'Social Media Marketing', 'النمو العضوي عبر المنصات.', 'Organic growth across platforms.', '{marketing-foundations}', '📱', '#3b82f6', false),
  ('seo-organic-growth',        6, 'intermediate', 3, 11, 'تحسين محركات البحث', 'SEO & Organic Growth', 'كيف يعمل البحث وكيف تتصدّر.', 'How search works and how to rank.', '{content-marketing}', '🔍', '#3b82f6', false),
  ('email-marketing',           7, 'intermediate', 2, 8,  'التسويق بالبريد الإلكتروني', 'Email Marketing', 'القوائم والتدفقات وعزو الإيرادات.', 'Lists, flows, and revenue attribution.', '{copywriting}', '📧', '#3b82f6', false),
  ('meta-ads',                  8, 'intermediate', 3, 12, 'إعلانات Meta', 'Meta Ads', 'الحزمة الكاملة لإعلانات فيسبوك وإنستغرام.', 'The full Facebook & Instagram ads stack.', '{marketing-foundations,copywriting}', '📘', '#3b82f6', true),
  ('google-ads',                9, 'advanced',     3, 12, 'إعلانات Google', 'Google Ads', 'البحث و PMax و YouTube و Shopping.', 'Search, PMax, YouTube, and Shopping.', '{marketing-foundations}', '🔎', '#a855f7', false),
  ('tiktok-ads',               10, 'advanced',     3, 8,  'إعلانات TikTok', 'TikTok Ads', 'Spark Ads ومحتوى المبدعين.', 'Spark Ads and creator content.', '{social-media-marketing,meta-ads}', '🎵', '#a855f7', false),
  ('sales-funnels',            11, 'advanced',     3, 10, 'قمع المبيعات', 'Sales Funnels', 'من العرض إلى بنية القمع الكاملة.', 'From offer to full funnel architecture.', '{copywriting,email-marketing}', '🪜', '#a855f7', true),
  ('conversion-optimization',  12, 'advanced',     4, 9,  'تحسين معدل التحويل', 'Conversion Rate Optimization', 'المزيد من نفس الزيارات.', 'More from the same traffic.', '{sales-funnels}', '📊', '#a855f7', false),
  ('analytics-attribution',    13, 'advanced',     4, 10, 'التحليلات والعزو', 'Analytics & Attribution', 'GA4 واللوحات ونماذج العزو.', 'GA4, dashboards, and attribution.', '{meta-ads}', '📈', '#a855f7', false),
  ('marketing-automation',     14, 'advanced',     4, 14, 'أتمتة التسويق', 'Marketing Automation', 'CRM وأتمتة بدون كود مع n8n/Make/Zapier.', 'CRM and no-code automation with n8n/Make/Zapier.', '{email-marketing,sales-funnels}', '⚙️', '#a855f7', true),
  ('ai-marketing',             15, 'expert',       4, 12, 'التسويق بالذكاء الاصطناعي', 'AI Marketing', 'الـ AI عبر سير عمل التسويق كله.', 'AI across the whole marketing workflow.', '{copywriting,content-marketing}', '🤖', '#ec4899', true),
  ('mcp-marketing-systems',    16, 'expert',       5, 16, 'أنظمة التسويق بالـ MCP', 'MCP Marketing Systems', 'ابنِ أنظمة تسويق وكيلة بـ Model Context Protocol.', 'Build agentic marketing systems with the Model Context Protocol.', '{marketing-automation,ai-marketing}', '🧩', '#ec4899', true)
ON CONFLICT (id) DO NOTHING;

-- ── Seed a starter badge catalog ──────────────────────────────────
INSERT INTO marketing_badges (id, title_ar, title_en, desc_ar, desc_en, icon, sort_order) VALUES
  ('first-blood',     'أول دم',         'First Blood',     'أكملت أول درس',            'Completed your first lesson',           '🩸', 1),
  ('copy-machine',    'آلة النسخ',       'Copy Machine',    'اعتُمدت حزمة النسخ',         'Copy Pack approved',                    '✍️', 2),
  ('pixel-master',    'سيّد البكسل',     'Pixel Master',    'أكملت مسار Meta',           'Completed the Meta track',              '📘', 3),
  ('funnel-architect','مهندس الفانل',    'Funnel Architect','سلّمت مخطط الفانل',         'Submitted a Funnel Blueprint',          '🪜', 4),
  ('automator',       'المُؤتمت',         'Automator',       'أكملت كابستون الأتمتة',     'Completed the Automation capstone',     '⚙️', 5),
  ('agent-builder',   'باني الوكلاء',    'Agent Builder',   'أكملت كابستون MCP',         'Completed the MCP capstone',            '🧩', 6),
  ('streak-7',        'سلسلة 7 أيام',    '7-Day Streak',    '7 أيام نشاط متتالية',       '7 consecutive active days',             '🔥', 7),
  ('audit-ace',       'بطل التدقيق',     'Audit Ace',       '3 تدقيقات بدرجة 90%+',       '3 audits scoring 90%+',                 '🎯', 8)
ON CONFLICT (id) DO NOTHING;

-- ══════════════════════════════════════════════════════════════════
-- DONE — v50 Marketing Academy Portal
-- ══════════════════════════════════════════════════════════════════
