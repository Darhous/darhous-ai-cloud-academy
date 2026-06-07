-- ══════════════════════════════════════════════════════════════════
-- v44 — IoT Lab — Simulator Templates (Wokwi) (iot_simulators)
-- Run in: Supabase Dashboard → SQL Editor
-- FLAT type — the SimulatorTemplate interface is fully flat/primitive
-- (id/title/description/category/wokwiId) — matches the ai_glossary precedent.
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS iot_simulators (
  id            TEXT        PRIMARY KEY,                 -- = existing slug (e.g. 'uno-blank') — keeps links intact
  portal_id     TEXT        NOT NULL DEFAULT 'iot-lab',
  content_type  TEXT        NOT NULL DEFAULT 'simulator',
  status        TEXT        NOT NULL DEFAULT 'published'
                            CHECK (status IN ('published','draft','archived')),
  featured      BOOLEAN     NOT NULL DEFAULT false,
  sort_order    INT         NOT NULL DEFAULT 0,
  title         TEXT        NOT NULL DEFAULT '',
  description   TEXT        NOT NULL DEFAULT '',
  category      TEXT        NOT NULL DEFAULT 'أردوينو'
                            CHECK (category IN ('أردوينو','ESP32','محركات','شاشات','حساسات','أخرى')),
  wokwi_id      TEXT        NOT NULL DEFAULT '',
  created_by    UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at   TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_iot_simulators_status   ON iot_simulators (status);
CREATE INDEX IF NOT EXISTS idx_iot_simulators_category ON iot_simulators (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_iot_simulators_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_iot_simulators_updated_at ON iot_simulators;
CREATE TRIGGER trg_iot_simulators_updated_at
  BEFORE UPDATE ON iot_simulators
  FOR EACH ROW EXECUTE FUNCTION update_iot_simulators_updated_at();

-- 3. RLS
ALTER TABLE iot_simulators ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_iot_simulators" ON iot_simulators;
CREATE POLICY "public_read_published_iot_simulators"
  ON iot_simulators FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "admin_manage_iot_simulators" ON iot_simulators;
CREATE POLICY "admin_manage_iot_simulators"
  ON iot_simulators FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Service role (API routes using createAdminClient) bypasses RLS — application
-- code verifies admin role before writes, matching the existing tables' convention.

-- ══════════════════════════════════════════════════════════════════
-- 4. Seed — the 35 existing simulator templates (simulatorsData), SAME ids, status='published'.
--    Generated programmatically from the source .ts data files (zero transcription risk).
-- ══════════════════════════════════════════════════════════════════
INSERT INTO iot_simulators (id, portal_id, content_type, status, featured, sort_order, title, description, category, wokwi_id, published_at)
VALUES
  ('uno-blank', 'iot-lab', 'simulator', 'published', true, 0, 'Arduino Uno (فارغ)', 'لوحة أردوينو أونو فارغة للبدء من الصفر.', 'أردوينو', '305567166302257730', now()),
  ('uno-blink', 'iot-lab', 'simulator', 'published', true, 10, 'Blink LED', 'المثال الكلاسيكي لوامض الليد.', 'أردوينو', '305567166302257730', now()),
  ('uno-traffic', 'iot-lab', 'simulator', 'published', true, 20, 'إشارة المرور', 'محاكاة إشارة مرور بـ 3 ليدات.', 'أردوينو', '305569485123224130', now()),
  ('uno-button', 'iot-lab', 'simulator', 'published', false, 30, 'قراءة زر', 'زر ضغاط يضيء ليداً.', 'حساسات', '305569485123224130', now()),
  ('uno-pot', 'iot-lab', 'simulator', 'published', false, 40, 'مقاومة متغيرة (Potentiometer)', 'قراءة جهد متغير من مقبض دوار.', 'حساسات', '305569894747341378', now()),
  ('uno-ultra', 'iot-lab', 'simulator', 'published', false, 50, 'حساس المسافة (Ultrasonic)', 'حساب المسافة باستخدام HC-SR04.', 'حساسات', '299313271173677576', now()),
  ('uno-servo', 'iot-lab', 'simulator', 'published', false, 60, 'السيرفو موتور', 'التحكم بزاوية السيرفو باستخدام مكتبة Servo.', 'محركات', '305570087786021442', now()),
  ('uno-lcd', 'iot-lab', 'simulator', 'published', false, 70, 'شاشة LCD I2C', 'طباعة النصوص على شاشة 16x2.', 'شاشات', '305570535354925634', now()),
  ('uno-oled', 'iot-lab', 'simulator', 'published', false, 80, 'شاشة OLED', 'رسم أشكال ونصوص على OLED 0.96.', 'شاشات', '305571234554925634', now()),
  ('uno-dht11', 'iot-lab', 'simulator', 'published', false, 90, 'حساس الحرارة DHT11', 'قراءة الحرارة والرطوبة.', 'حساسات', '305572629618131522', now()),
  ('uno-dht22', 'iot-lab', 'simulator', 'published', false, 100, 'حساس الحرارة DHT22', 'النسخة الأكثر دقة من حساس الحرارة.', 'حساسات', '305572629618131522', now()),
  ('uno-keypad', 'iot-lab', 'simulator', 'published', false, 110, 'لوحة الأرقام Keypad', 'قراءة الأرقام من كيباد 4x4.', 'حساسات', '305571666302257730', now()),
  ('uno-pir', 'iot-lab', 'simulator', 'published', false, 120, 'حساس الحركة PIR', 'اكتشاف الحركة السلبية.', 'حساسات', '305571666302257730', now()),
  ('uno-relay', 'iot-lab', 'simulator', 'published', false, 130, 'الريلاي Relay', 'استخدام الريلاي للتحكم بأحمال عالية نظرياً.', 'محركات', '305571666302257730', now()),
  ('uno-ws2812', 'iot-lab', 'simulator', 'published', false, 140, 'شريط الليد الذكي WS2812', 'تلوين شريط Neopixel بـ FastLED.', 'محركات', '305571666302257730', now()),
  ('uno-buzzer', 'iot-lab', 'simulator', 'published', false, 150, 'البازر Buzzer', 'عزف نغمات موسيقية.', 'أخرى', '305571666302257730', now()),
  ('uno-stepper', 'iot-lab', 'simulator', 'published', false, 160, 'Stepper Motor', 'دوران محرك خطوي.', 'محركات', '305571666302257730', now()),
  ('uno-7segment', 'iot-lab', 'simulator', 'published', false, 170, 'شاشة 7-Segment', 'شاشة الـ 7 قطع الفردية.', 'شاشات', '305571666302257730', now()),
  ('uno-tm1637', 'iot-lab', 'simulator', 'published', false, 180, 'شاشة الأرقام TM1637', 'عداد بـ 4 أرقام.', 'شاشات', '305571666302257730', now()),
  ('uno-joystick', 'iot-lab', 'simulator', 'published', false, 190, 'عصا التحكم Joystick', 'قراءة X و Y.', 'حساسات', '305571666302257730', now()),
  ('esp32-blank', 'iot-lab', 'simulator', 'published', false, 200, 'ESP32 (فارغ)', 'لوحة ESP32 فارغة لمشاريع הـ IoT.', 'ESP32', '305569255678444098', now()),
  ('esp32-wifi', 'iot-lab', 'simulator', 'published', false, 210, 'ESP32 WiFi Scan', 'مسح شبكات الواي فاي (محاكاة).', 'ESP32', '305569255678444098', now()),
  ('esp32-dht', 'iot-lab', 'simulator', 'published', false, 220, 'ESP32 + DHT22', 'نظام טقس بـ ESP32.', 'ESP32', '305569255678444098', now()),
  ('esp32-oled', 'iot-lab', 'simulator', 'published', false, 230, 'ESP32 + OLED', 'عرض رسومات على شاشة عبر ESP32.', 'ESP32', '305569255678444098', now()),
  ('esp32-servo', 'iot-lab', 'simulator', 'published', false, 240, 'ESP32 + Servo', 'تحكم بسيرفو موتور (يستخدم مكتبات مخصصة).', 'ESP32', '305569255678444098', now()),
  ('nano-blank', 'iot-lab', 'simulator', 'published', false, 250, 'Arduino Nano (فارغ)', 'لوحة الأونو المصغرة.', 'أردوينو', '305567166302257730', now()),
  ('mega-blank', 'iot-lab', 'simulator', 'published', false, 260, 'Arduino Mega (فارغ)', 'اللوحة الكبيرة للمشاريع الضخمة.', 'أردوينو', '305567166302257730', now()),
  ('attiny-blank', 'iot-lab', 'simulator', 'published', false, 270, 'ATtiny85 (فارغ)', 'المتحكم الأصغر בـ 8 أرجل.', 'أردوينو', '305567166302257730', now()),
  ('pico-blank', 'iot-lab', 'simulator', 'published', false, 280, 'Raspberry Pi Pico', 'لوحة بيكو مبرمجة بـ C++.', 'أخرى', '305567166302257730', now()),
  ('micropython-esp32', 'iot-lab', 'simulator', 'published', false, 290, 'MicroPython ESP32', 'بيئة بايثون لـ ESP32.', 'ESP32', '305569255678444098', now()),
  ('uno-shift-register', 'iot-lab', 'simulator', 'published', false, 300, 'Shift Register 74HC595', 'التحكم בـ 8 ليدات בـ 3 دبابيس.', 'أخرى', '305571666302257730', now()),
  ('uno-matrix', 'iot-lab', 'simulator', 'published', false, 310, 'LED Matrix 8x8', 'مصفوفة الليدات MAX7219.', 'شاشات', '305571666302257730', now()),
  ('uno-rtc', 'iot-lab', 'simulator', 'published', false, 320, 'الساعة DS1307', 'قراءة الوقت والتاريخ.', 'حساسات', '305571666302257730', now()),
  ('uno-rfid', 'iot-lab', 'simulator', 'published', false, 330, 'محاكاة RFID', 'قراءة البطاقات (قد تكون المحاكاة محدودة).', 'أخرى', '305571666302257730', now()),
  ('uno-ir', 'iot-lab', 'simulator', 'published', false, 340, 'ريموت IR', 'استقبال أكواد الريموت.', 'أخرى', '305571666302257730', now());
