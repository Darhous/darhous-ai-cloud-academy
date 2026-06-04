-- ══════════════════════════════════════════════════════════════════
-- v14 — Nano Banana Custom Prompts
-- Run in: Supabase Dashboard → SQL Editor
-- ══════════════════════════════════════════════════════════════════

-- 1. Create the table
CREATE TABLE IF NOT EXISTS nano_banana_custom_prompts (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ar      TEXT        NOT NULL,
  title_en      TEXT        NOT NULL DEFAULT '',
  description_ar TEXT       NOT NULL DEFAULT '',
  description_en TEXT       NOT NULL DEFAULT '',
  category      TEXT        NOT NULL DEFAULT 'fun',
  category_label_ar TEXT    NOT NULL DEFAULT 'ترفيه',
  category_label_en TEXT    NOT NULL DEFAULT 'Fun',
  difficulty    TEXT        NOT NULL DEFAULT 'beginner',
  best_input_ar TEXT        NOT NULL DEFAULT 'صورة واضحة للوجه',
  best_input_en TEXT        NOT NULL DEFAULT 'Clear face photo',
  prompt_ar     TEXT        NOT NULL,
  prompt_en     TEXT        NOT NULL DEFAULT '',
  accent        TEXT        NOT NULL DEFAULT '#f59e0b',
  gradient      TEXT        NOT NULL DEFAULT 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(251,191,36,0.08) 100%)',
  emoji         TEXT        NOT NULL DEFAULT '🍌',
  tags          TEXT[]      NOT NULL DEFAULT '{}',
  featured      BOOLEAN     NOT NULL DEFAULT false,
  image_url     TEXT,
  created_by    UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Enable RLS
ALTER TABLE nano_banana_custom_prompts ENABLE ROW LEVEL SECURITY;

-- 3. Anyone can read (public)
DROP POLICY IF EXISTS "public_read_nano_banana_custom_prompts" ON nano_banana_custom_prompts;
CREATE POLICY "public_read_nano_banana_custom_prompts"
  ON nano_banana_custom_prompts FOR SELECT USING (true);

-- 4. Only admins can insert / update / delete (via service-role in API)
-- The API routes use service_role key + verify admin in application code.
-- No row-level INSERT/DELETE policy is needed when using service_role (bypasses RLS).
-- But to be safe — allow admins to manage via anon key flows too:
DROP POLICY IF EXISTS "admin_manage_nano_banana_custom_prompts" ON nano_banana_custom_prompts;
CREATE POLICY "admin_manage_nano_banana_custom_prompts"
  ON nano_banana_custom_prompts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- ══════════════════════════════════════════════════════════════════
-- Storage bucket — run manually in Supabase Dashboard → Storage
-- ══════════════════════════════════════════════════════════════════
-- 1. Go to: Storage → New Bucket
-- 2. Name: nano-banana
-- 3. Public: YES (toggle ON — allows public read access)
-- 4. Click Create

-- Or via SQL (may not work in all Supabase tiers):
-- INSERT INTO storage.buckets (id, name, public) VALUES ('nano-banana', 'nano-banana', true)
-- ON CONFLICT (id) DO NOTHING;
