-- ══════════════════════════════════════════════════════════════════
-- v46 — IoT Lab — Roadmaps (staged) (iot_roadmaps)
-- Run in: Supabase Dashboard → SQL Editor
-- HYBRID type:
--   • Real columns for every flat/primitive field
--   • JSONB for the one nested array-of-object field:
--     stages (RoadmapStage[]: title/description/recommendedLessons/recommendedProjects)
-- NOTE: Roadmap is a SEPARATE/DISTINCT dataset from PathData (iot_paths, v45) —
-- different shape (staged structure vs flat related-content lists) and a
-- DIFFERENT id namespace (e.g. 'beginner-maker' vs 'arduino-basics'). It does
-- NOT appear to be imported/rendered by any page under src/app — likely dead
-- data — but is seeded here for completeness since the static array exists
-- and the migration-loop convention seeds every static array found.
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS iot_roadmaps (
  id              TEXT        PRIMARY KEY,                 -- = existing slug (e.g. 'beginner-maker') — keeps links intact
  portal_id       TEXT        NOT NULL DEFAULT 'iot-lab',
  content_type    TEXT        NOT NULL DEFAULT 'roadmap',
  status          TEXT        NOT NULL DEFAULT 'published'
                              CHECK (status IN ('published','draft','archived')),
  featured        BOOLEAN     NOT NULL DEFAULT false,
  sort_order      INT         NOT NULL DEFAULT 0,
  title           TEXT        NOT NULL DEFAULT '',
  description     TEXT        NOT NULL DEFAULT '',
  duration        TEXT        NOT NULL DEFAULT '',
  target_outcome  TEXT        NOT NULL DEFAULT '',
  stages          JSONB       NOT NULL DEFAULT '[]'::jsonb, -- RoadmapStage[]
  created_by      UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at     TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_iot_roadmaps_status ON iot_roadmaps (status);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_iot_roadmaps_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_iot_roadmaps_updated_at ON iot_roadmaps;
CREATE TRIGGER trg_iot_roadmaps_updated_at
  BEFORE UPDATE ON iot_roadmaps
  FOR EACH ROW EXECUTE FUNCTION update_iot_roadmaps_updated_at();

-- 3. RLS
ALTER TABLE iot_roadmaps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_iot_roadmaps" ON iot_roadmaps;
CREATE POLICY "public_read_published_iot_roadmaps"
  ON iot_roadmaps FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "admin_manage_iot_roadmaps" ON iot_roadmaps;
CREATE POLICY "admin_manage_iot_roadmaps"
  ON iot_roadmaps FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Service role (API routes using createAdminClient) bypasses RLS — application
-- code verifies admin role before writes, matching the existing tables' convention.

-- ══════════════════════════════════════════════════════════════════
-- 4. Seed — the 8 existing roadmaps (roadmapsData), SAME ids, status='published'.
--    Generated programmatically from the source .ts data files (zero transcription risk).
-- ══════════════════════════════════════════════════════════════════
INSERT INTO iot_roadmaps (id, portal_id, content_type, status, featured, sort_order, title, description, duration, target_outcome, stages, published_at)
VALUES
  ('beginner-maker', 'iot-lab', 'roadmap', 'published', true, 0, 'من الصفر إلى صانع (Beginner Maker)', 'أفضل مسار تبدأ به إن كنت لا تعرف شيئاً عن البرمجة والإلكترونيات. ستتعلم الأساسيات وتبني أول مشاريعك التفاعلية.', '4 - 6 أسابيع', 'بناء دوائر ذكية تعتمد على الحساسات والأردوينو دون الحاجة للمساعدة.', '[{"title":"المرحلة الأولى: الأساسيات والكهرباء","description":"فهم الجهد، التيار، والمقاومة. وبناء أول دائرة بسيطة بدون برمجة.","recommendedLessons":["what-is-arduino","breadboard-basics"],"recommendedProjects":[]},{"title":"المرحلة الثانية: البرمجة الأولى","description":"التحكم في المخرجات الرقمية والتناظرية.","recommendedLessons":["digital-output-led","analog-output-pwm"],"recommendedProjects":["led-blink","traffic-light"]},{"title":"المرحلة الثالثة: الإدخال والحساسات","description":"جعل الدائرة تتفاعل مع العالم الخارجي عبر الأزرار والحساسات التناظرية.","recommendedLessons":["digital-input-button","analog-input-potentiometer"],"recommendedProjects":["smart-parking"]}]'::jsonb, now()),
  ('electronics-basics', 'iot-lab', 'roadmap', 'published', true, 10, 'أساسيات الإلكترونيات', 'مسار نظري وعملي مكثف لفهم كيفية عمل القطع الإلكترونية قبل ربطها بالمتحكمات الدقيقة.', '2 - 3 أسابيع', 'فهم المخططات الإلكترونية واختيار المكونات الصحيحة لمشروعك.', '[{"title":"فهم الدائرة المفتوحة والمغلقة","description":"التيار والجهد والبطاريات.","recommendedLessons":["breadboard-basics"],"recommendedProjects":[]},{"title":"قانون أوم والمقاومات","description":"حساب المقاومة المناسبة لليد لتجنب احتراقه.","recommendedLessons":["analog-input-potentiometer"],"recommendedProjects":[]}]'::jsonb, now()),
  ('sensors-specialist', 'iot-lab', 'roadmap', 'published', true, 20, 'متخصص الحساسات (Sensors Specialist)', 'مسار متقدم يغطي كيفية قراءة ومعالجة البيانات من البيئة المحيطة (حرارة، مسافة، غاز، ضوء).', '4 أسابيع', 'القدرة على دمج حساسات متعددة وقراءة بياناتها بدقة واستقرار.', '[{"title":"حساسات البيئة الأساسية","description":"الحرارة، الرطوبة، والضوء.","recommendedLessons":[],"recommendedProjects":["smart-plant-monitor"]},{"title":"حساسات الحركة والمسافة","description":"تحديد مواقع الأشياء واكتشاف الدخلاء.","recommendedLessons":["ultrasonic-sensor"],"recommendedProjects":["ultrasonic-meter","motion-security-alarm"]}]'::jsonb, now()),
  ('esp32-iot-dev', 'iot-lab', 'roadmap', 'published', false, 30, 'مطور إنترنت الأشياء ESP32', 'نقطة الدخول الحقيقية لعالم الـ IoT. تعلم كيف تربط مشاريعك بالإنترنت والواي فاي والسحابة.', '5 - 7 أسابيع', 'بناء لوحة تحكم سحابية لمراقبة البيانات والتحكم بالأجهزة من أي مكان في العالم.', '[{"title":"التعرف على ESP32","description":"الفرق بين الأردوينو و ESP، وكيفية إعداد بيئة التطوير.","recommendedLessons":["esp32-intro"],"recommendedProjects":["esp32-web-server-led"]},{"title":"بروتوكولات الـ IoT","description":"فهم HTTP و MQTT لإرسال البيانات.","recommendedLessons":["mqtt-basics","http-apis"],"recommendedProjects":["mqtt-temp-publisher"]}]'::jsonb, now()),
  ('robotics-beginner', 'iot-lab', 'roadmap', 'published', false, 40, 'مبتدئ الروبوتات', 'كيف تحرك الأشياء وتصنع روبوتات تتحرك وتتجنب العقبات أو تتبع المسارات.', '6 أسابيع', 'بناء سيارة روبوت متكاملة تعمل بالبلوتوث وتتجنب العقبات ذاتياً.', '[{"title":"أساسيات المحركات","description":"الفرق بين DC و Servo ومحركات الخطوة.","recommendedLessons":["servo-motors","dc-motors"],"recommendedProjects":["servo-radar"]},{"title":"تجميع الروبوت الأول","description":"شاسيه الروبوت، درايفر L298N، وكتابة كود الحركة.","recommendedLessons":["robot-chassis-wiring"],"recommendedProjects":["bluetooth-robot-car","obstacle-avoiding-robot"]}]'::jsonb, now()),
  ('smart-home-builder', 'iot-lab', 'roadmap', 'published', false, 50, 'باني المنازل الذكية', 'مسار تطبيقي يركز على أتمتة المنازل (الإنارة، الأبواب، التكييف).', '4 أسابيع', 'بناء نموذج مصغر لغرفة ذكية تعتمد على المستشعرات والتحكم عن بعد.', '[{"title":"التحكم في أحمال التيار المتردد","description":"الاستخدام الآمن للريلاي (Relay).","recommendedLessons":["relay-safety"],"recommendedProjects":["smart-fan-controller"]},{"title":"الأمان والتحكم بالوصول","description":"استخدام كلمات المرور والبطاقات الذكية.","recommendedLessons":["rfid-basics","keypad-input"],"recommendedProjects":["smart-door-lock-keypad","rfid-attendance"]}]'::jsonb, now()),
  ('industrial-iot-starter', 'iot-lab', 'roadmap', 'published', false, 60, 'مقدمة في الـ IIoT', 'نظرة على إنترنت الأشياء الصناعي ومراقبة الآلات والمصانع والاعتمادية.', '3 أسابيع', 'فهم الفرق بين دوائر الهواة ودوائر الصناعة ومراقبة بيئة المستودعات.', '[{"title":"المراقبة الصناعية","description":"تطبيقات المراقبة في الوقت الفعلي للحرارة والغازات.","recommendedLessons":["industrial-sensors-intro"],"recommendedProjects":["factory-temp-monitor","gas-leak-alarm"]}]'::jsonb, now()),
  ('capstone-builder', 'iot-lab', 'roadmap', 'published', false, 70, 'مشاريع التخرج (Capstone)', 'تتويج لما تعلمته. مسار لتنفيذ مشاريع ضخمة ودمج العديد من التقنيات معاً.', 'مفتوح', 'امتلاك معرض أعمال (Portfolio) تقني قوي.', '[{"title":"التخطيط والهندسة","description":"كيف تخطط لمشروعك، تختار القطع، وتبني نموذجاً أولياً.","recommendedLessons":["project-architecture","debugging-advanced"],"recommendedProjects":["iot-weather-station","smart-aquarium-monitor"]}]'::jsonb, now());
