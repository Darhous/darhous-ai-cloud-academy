-- ══════════════════════════════════════════════════════════════════
-- v39 — IoT Lab — Components Library (iot_components)
-- Run in: Supabase Dashboard → SQL Editor
-- HYBRID type:
--   • Real columns for every flat/primitive field
--   • JSONB for the one nested array-of-object field:
--     pins (Pin[]: name/description)
-- NOTE: ComponentData has no _ar/_en split — content is single-language
-- (Arabic-first), matching the IoT Lab portal's existing data shape.
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS iot_components (
  id            TEXT        PRIMARY KEY,                 -- = existing slug (e.g. 'arduino-uno') — keeps links intact
  portal_id     TEXT        NOT NULL DEFAULT 'iot-lab',
  content_type  TEXT        NOT NULL DEFAULT 'component',
  status        TEXT        NOT NULL DEFAULT 'published'
                            CHECK (status IN ('published','draft','archived')),
  featured      BOOLEAN     NOT NULL DEFAULT false,
  sort_order    INT         NOT NULL DEFAULT 0,
  name          TEXT        NOT NULL DEFAULT '',
  category      TEXT        NOT NULL DEFAULT '',
  description   TEXT        NOT NULL DEFAULT '',
  pins          JSONB       NOT NULL DEFAULT '[]'::jsonb,  -- Pin[]: {name, description}
  price_range   TEXT,
  buy_link      TEXT,
  created_by    UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at   TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_iot_components_status   ON iot_components (status);
CREATE INDEX IF NOT EXISTS idx_iot_components_category ON iot_components (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_iot_components_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_iot_components_updated_at ON iot_components;
CREATE TRIGGER trg_iot_components_updated_at
  BEFORE UPDATE ON iot_components
  FOR EACH ROW EXECUTE FUNCTION update_iot_components_updated_at();

-- 3. RLS
ALTER TABLE iot_components ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_iot_components" ON iot_components;
CREATE POLICY "public_read_published_iot_components"
  ON iot_components FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "admin_manage_iot_components" ON iot_components;
CREATE POLICY "admin_manage_iot_components"
  ON iot_components FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Service role (API routes using createAdminClient) bypasses RLS — application
-- code verifies admin role before writes, matching the existing tables' convention.

-- ══════════════════════════════════════════════════════════════════
-- 4. Seed — the 80 existing components (componentsDataPart1 + componentsDataPart2), SAME ids, status='published'.
--    Generated programmatically from the source .ts data files (zero transcription risk).
-- ══════════════════════════════════════════════════════════════════
INSERT INTO iot_components (id, portal_id, content_type, status, featured, sort_order, name, category, description, pins, price_range, buy_link, published_at)
VALUES
  ('arduino-uno', 'iot-lab', 'component', 'published', true, 0, 'Arduino Uno R3', 'أردوينو ومتحكمات', 'اللوحة الأشهر والأكثر استخداماً عالمياً للمبتدئين. تعتمد على معالج ATmega328P وتدعم كل الإضافات (Shields).', '[{"name":"5V/3.3V","description":"مخرج طاقة"},{"name":"A0-A5","description":"مداخل تناظرية"},{"name":"D0-D13","description":"منافذ رقمية (يدعم PWM في بعضها)"}]'::jsonb, '10$ - 25$', NULL, now()),
  ('arduino-nano', 'iot-lab', 'component', 'published', true, 10, 'Arduino Nano', 'أردوينو ومتحكمات', 'نسخة مصغرة من الأونو، مصممة لتُركب مباشرة على اللوحة التجريبية (Breadboard) وتوفر مساحة.', '[{"name":"Vin","description":"مدخل طاقة"},{"name":"A0-A7","description":"مداخل تناظرية (أكثر من الأونو)"},{"name":"D0-D13","description":"رقمي"}]'::jsonb, '5$ - 10$', NULL, now()),
  ('arduino-mega', 'iot-lab', 'component', 'published', true, 20, 'Arduino Mega 2560', 'أردوينو ومتحكمات', 'لوحة ضخمة للمشاريع المعقدة التي تحتاج لعشرات الحساسات، توفر 54 منفذ رقمي وذاكرة أكبر.', '[{"name":"D0-D53","description":"منافذ رقمية"},{"name":"A0-A15","description":"مداخل تناظرية"}]'::jsonb, '15$ - 40$', NULL, now()),
  ('esp32', 'iot-lab', 'component', 'published', false, 30, 'ESP32 DevKit', 'أردوينو ومتحكمات', 'أقوى من الأردوينو بـ 10 مرات، يعمل بـ 3.3V ويحتوي على واي فاي وبلوتوث مدمج. الخيار الأول للـ IoT.', '[{"name":"3V3","description":"مدخل/مخرج 3.3 فولت"},{"name":"GPIOs","description":"معظم الدبابيس تدعم PWM وتناظري ورقمي"}]'::jsonb, '6$ - 15$', NULL, now()),
  ('esp8266', 'iot-lab', 'component', 'published', false, 40, 'ESP8266 (NodeMCU)', 'أردوينو ومتحكمات', 'الأخ الأصغر لـ ESP32، يحتوي على واي فاي فقط ومنافذ أقل، لكنه رخيص جداً وممتاز للمشاريع البسيطة المتصلة بالإنترنت.', '[{"name":"D0-D8","description":"رقمي"},{"name":"A0","description":"المنفذ التناظري الوحيد (يقرأ بحد أقصى 1V أو 3.3V حسب اللوحة)"}]'::jsonb, '4$ - 8$', NULL, now()),
  ('raspberry-pi-pico', 'iot-lab', 'component', 'published', false, 50, 'Raspberry Pi Pico', 'أردوينو ومتحكمات', 'لوحة قوية جداً برمجياً بمعالج RP2040 ثنائي النواة، تدعم C++ و MicroPython بسلاسة تامة.', '[{"name":"GP0-GP28","description":"دبابيس متعددة المهام"},{"name":"VSYS","description":"مدخل الطاقة الرئيسي"}]'::jsonb, '4$ - 8$', NULL, now()),
  ('arduino-promini', 'iot-lab', 'component', 'published', false, 60, 'Arduino Pro Mini', 'أردوينو ومتحكمات', 'لوحة أردوينو نقية لا تحتوي على منفذ USB لتوفير الطاقة والحجم، تُبرمج عبر مبرمج FTDI خارجي.', '[{"name":"RX/TX","description":"للبرمجة"},{"name":"VCC","description":"5V أو 3.3V حسب النسخة"}]'::jsonb, '3$ - 6$', NULL, now()),
  ('attiny85', 'iot-lab', 'component', 'published', false, 70, 'ATtiny85 IC', 'أردوينو ومتحكمات', 'شريحة متحكم دقيق صغيرة بـ 8 دبابيس فقط للمشاريع الميكروية القابلة للارتداء.', '[{"name":"PB0-PB4","description":"5 منافذ فقط (رقمي/تناظري/PWM)"},{"name":"VCC/GND","description":"للطاقة"}]'::jsonb, '1$ - 3$', NULL, now()),
  ('esp32-cam', 'iot-lab', 'component', 'published', false, 80, 'ESP32-CAM', 'أردوينو ومتحكمات', 'لوحة ESP32 مدمج معها كاميرا OV2640 ومنفذ SD Card، مثالية لبث الفيديو ومشاريع التعرف على الأوجه.', '[{"name":"U0R/U0T","description":"للبرمجة عبر FTDI"},{"name":"5V","description":"للطاقة وتجنب مشاكل التشويش"}]'::jsonb, '8$ - 15$', NULL, now()),
  ('stm32', 'iot-lab', 'component', 'published', false, 90, 'STM32 (Blue Pill)', 'أردوينو ومتحكمات', 'لوحة قوية تعتمد على معالج ARM 32-bit أسرع بكثير من الأردوينو ومناسبة للتطبيقات الصناعية.', '[{"name":"PA0-PA15","description":"منافذ GPIO"},{"name":"PB0-PB15","description":"منافذ GPIO"}]'::jsonb, '3$ - 7$', NULL, now()),
  ('bbc-microbit', 'iot-lab', 'component', 'published', false, 100, 'BBC Micro:bit', 'أردوينو ومتحكمات', 'لوحة تعليمية للأطفال والمبتدئين، تحتوي على مصفوفة ليدات وحساس حرارة وبلوتوث وتُبرمج بالبلوكات (Blocks).', '[{"name":"0, 1, 2","description":"دبابيس رئيسية كبيرة"},{"name":"3V, GND","description":"للطاقة"}]'::jsonb, '15$ - 25$', NULL, now()),
  ('arduino-leonardo', 'iot-lab', 'component', 'published', false, 110, 'Arduino Leonardo', 'أردوينو ومتحكمات', 'يشبه الأونو ولكنه يتعرف على الكمبيوتر كأنه (كيبورد أو ماوس)، ممتاز لصنع أجهزة تحكم للألعاب.', '[{"name":"SDA/SCL","description":"I2C"},{"name":"D0-D13","description":"منافذ رقمية"}]'::jsonb, '12$ - 20$', NULL, now()),
  ('hc-sr04', 'iot-lab', 'component', 'published', false, 120, 'HC-SR04 Ultrasonic', 'مستشعرات', 'حساس قياس مسافة كلاسيكي يرسل موجة صوتية ويستقبل صداها لقياس المسافة بين 2 سم إلى 4 أمتار.', '[{"name":"Trig","description":"إرسال النبضة"},{"name":"Echo","description":"استقبال الصدى"}]'::jsonb, '1$ - 3$', NULL, now()),
  ('dht11', 'iot-lab', 'component', 'published', false, 130, 'DHT11 Temp & Humidity', 'مستشعرات', 'حساس رخيص وبسيط لقياس درجة حرارة الغرفة (0-50°C) والرطوبة. أداؤه بطيء قليلاً.', '[{"name":"Data","description":"يرسل البيانات الرقمية المعقدة (يحتاج مكتبة)"}]'::jsonb, '1$ - 2$', NULL, now()),
  ('dht22', 'iot-lab', 'component', 'published', false, 140, 'DHT22 (AM2302)', 'مستشعرات', 'النسخة البيضاء والمطورة من DHT11، تقيس مدى أوسع من الحرارة (حتى تحت الصفر) بدقة أعلى بكثير.', '[{"name":"Data","description":"دبوس الإشارة"}]'::jsonb, '4$ - 6$', NULL, now()),
  ('ldr', 'iot-lab', 'component', 'published', false, 150, 'LDR Photoresistor', 'مستشعرات', 'مقاومة تعتمد على الضوء، تقل مقاومتها بزيادة الضوء لتستشعر النهار والليل.', '[{"name":"Leg 1 / Leg 2","description":"لا يهم القطبية، تُوصل كمقسم جهد"}]'::jsonb, '0.2$ - 0.5$', NULL, now()),
  ('pir-hc-sr501', 'iot-lab', 'component', 'published', false, 160, 'HC-SR501 PIR Motion', 'مستشعرات', 'يكتشف حركة الكائنات الحية عبر تتبع حرارة الأشعة تحت الحمراء. ممتاز لأنظمة الإنذار.', '[{"name":"OUT","description":"إشارة HIGH عند اكتشاف حركة"}]'::jsonb, '1$ - 3$', NULL, now()),
  ('mq2-gas', 'iot-lab', 'component', 'published', false, 170, 'MQ-2 Gas Sensor', 'مستشعرات', 'يستشعر الدخان والغازات القابلة للاشتعال (كالميثان والبروبان). يحتاج لتيار عالي لتسخينه داخلياً.', '[{"name":"A0","description":"قراءة تركيز الغاز"},{"name":"D0","description":"إشارة إنذار رقمية بناء على مسمار الضبط"}]'::jsonb, '2$ - 4$', NULL, now()),
  ('mq135-air', 'iot-lab', 'component', 'published', false, 180, 'MQ-135 Air Quality', 'مستشعرات', 'مخصص لقياس جودة الهواء واكتشاف غازات כמו الأمونيا وثاني أكسيد الكربون.', '[{"name":"A0","description":"الإشارة التناظرية للتركيز"}]'::jsonb, '3$ - 5$', NULL, now()),
  ('soil-moisture', 'iot-lab', 'component', 'published', false, 190, 'Soil Moisture Sensor', 'مستشعرات', 'يقيس رطوبة التربة للنباتات عبر مقاومة الشوكتين. عيبه أنه يتآكل مع الوقت.', '[{"name":"A0","description":"مستوى الرطوبة"}]'::jsonb, '1$ - 2$', NULL, now()),
  ('capacitive-soil', 'iot-lab', 'component', 'published', false, 200, 'Capacitive Soil Sensor', 'مستشعرات', 'نسخة حديثة من حساس التربة يقيس السعة الكهربائية بدلاً من المقاومة، لذا لا يصدأ ويعيش طويلاً.', '[{"name":"AOUT","description":"قراءة تناظرية عكسية (الماء يقلل الجهد)"}]'::jsonb, '2$ - 4$', NULL, now()),
  ('water-level', 'iot-lab', 'component', 'published', false, 210, 'Water Level Sensor', 'مستشعرات', 'قطعة بها خطوط نحاسية متوازية، كلما غمرت في الماء أكثر تغيرت القراءة التناظرية لمعرفة عمق الماء.', '[{"name":"S","description":"إشارة تناظرية"}]'::jsonb, '1$ - 2$', NULL, now()),
  ('sound-sensor', 'iot-lab', 'component', 'published', false, 220, 'Sound Sensor (KY-038)', 'مستشعرات', 'يحتوي على ميكروفون صغير يكتشف الأصوات العالية كالتصفيق أو الضجيج لإطلاق إنذار.', '[{"name":"A0","description":"حجم الصوت (غير دقيق)"},{"name":"D0","description":"HIGH عند تجاوز حد الصوت"}]'::jsonb, '1$ - 2$', NULL, now()),
  ('ir-obstacle', 'iot-lab', 'component', 'published', false, 230, 'IR Obstacle Sensor', 'مستشعرات', 'يحتوي على ليد يرسل أشعة تحت حمراء وآخر يستقبلها إذا اصطدمت بحاجز وعادت. مداه قصير (2-30 سم).', '[{"name":"OUT","description":"LOW عند وجود حاجز"}]'::jsonb, '1$ - 2$', NULL, now()),
  ('tcrt5000', 'iot-lab', 'component', 'published', false, 240, 'TCRT5000 Line Tracking', 'مستشعرات', 'حساس IR موجه للأرض للتفريق بين السطح الأبيض (عاكس) والخط الأسود (ممتص للضوء) في سيارات تتبع المسار.', '[{"name":"D0","description":"إشارة الخط"}]'::jsonb, '1$ - 2$', NULL, now()),
  ('ds18b20', 'iot-lab', 'component', 'published', false, 250, 'DS18B20 Water Temp', 'مستشعرات', 'حساس حرارة دقيق ومقاوم للماء في غلاف معدني، يُستخدم في السوائل وبيئة المصانع.', '[{"name":"Data","description":"يعمل ببروتوكول 1-Wire (يتطلب مقاومة 4.7K)"}]'::jsonb, '3$ - 6$', NULL, now()),
  ('bme280', 'iot-lab', 'component', 'published', false, 260, 'BME280 Env Sensor', 'مستشعرات', 'حساس احترافي يقيس (الحرارة، الرطوبة، الضغط الجوي) في شريحة واحدة صغيرة عبر I2C.', '[{"name":"SDA/SCL","description":"واجهة I2C"}]'::jsonb, '5$ - 10$', NULL, now()),
  ('mpu6050', 'iot-lab', 'component', 'published', false, 270, 'MPU6050 Gyro/Accel', 'مستشعرات', 'حساس قياس الميلان (الجايروسكوب) والتسارع بـ 6 محاور، أساسي للطائرات بدون طيار والروبوتات المتوازنة.', '[{"name":"SDA/SCL","description":"I2C"},{"name":"INT","description":"Interrupt pin للحركة المفاجئة"}]'::jsonb, '3$ - 6$', NULL, now()),
  ('flame-sensor', 'iot-lab', 'component', 'published', false, 280, 'Flame Sensor', 'مستشعرات', 'حساس IR مضبوط على التردد الضوئي الصادر من ألسنة اللهب، يكتشف الحريق على مسافة قصيرة.', '[{"name":"D0","description":"إنذار الحريق"}]'::jsonb, '1$ - 3$', NULL, now()),
  ('hall-sensor', 'iot-lab', 'component', 'published', false, 290, 'Hall Effect Sensor', 'مستشعرات', 'يستشعر وجود المجال المغناطيسي. مفيد لعمل مفاتيح بدون تلامس أو حساب عدد لفات عجلة الروبوت.', '[{"name":"Signal","description":"قراءة المجال المغناطيسي"}]'::jsonb, '1$ - 2$', NULL, now()),
  ('rfid-rc522', 'iot-lab', 'component', 'published', false, 300, 'RFID RC522', 'مستشعرات', 'قارئ بطاقات ذكية يعتمد على موجات الراديو (13.56MHz)، أساسي لأنظمة الأمان والحضور.', '[{"name":"SPI Pins","description":"MISO, MOSI, SCK, CS"},{"name":"3.3V","description":"حذارِ من توصيله بـ 5V"}]'::jsonb, '3$ - 6$', NULL, now()),
  ('fingerprint-as608', 'iot-lab', 'component', 'published', false, 310, 'AS608 Fingerprint', 'مستشعرات', 'حساس بصمة الإصبع البصري، يحفظ البصمات في ذاكرته الداخلية ويرسل فقط (رقم المعرف ID) للأردوينو عند التطابق.', '[{"name":"TX/RX","description":"اتصال تسلسلي (Serial)"}]'::jsonb, '15$ - 25$', NULL, now()),
  ('led-5mm', 'iot-lab', 'component', 'published', false, 320, '5mm LED', 'محركات ومخرجات', 'الدايود الباعث للضوء، يتطلب دائماً مقاومة (220 أو 330 أوم) لحمايته من تيار الأردوينو.', '[{"name":"Anode (طويل)","description":"الموجب"},{"name":"Cathode (قصير)","description":"السالب GND"}]'::jsonb, '0.05$', NULL, now()),
  ('rgb-led', 'iot-lab', 'component', 'published', false, 330, 'RGB LED', 'محركات ومخرجات', 'ليد يجمع 3 ألوان بداخله (أحمر، أخضر، أزرق). يمكن دمجها لتوليد أي لون عبر الـ PWM.', '[{"name":"Common","description":"كاثود مشترك (أو أنود)"},{"name":"R, G, B","description":"أرجل الألوان"}]'::jsonb, '0.2$', NULL, now()),
  ('ws2812b', 'iot-lab', 'component', 'published', false, 340, 'WS2812B NeoPixel', 'محركات ومخرجات', 'شريط إضاءة ذكي، يمكن التحكم بكل ليد على حدة بلون وسطوع مختلف باستخدام دبوس واحد فقط.', '[{"name":"DIN","description":"إدخال البيانات"},{"name":"5V/GND","description":"طاقة خارجية ضرورية"}]'::jsonb, '5$ للمتر', NULL, now()),
  ('passive-buzzer', 'iot-lab', 'component', 'published', false, 350, 'Passive Buzzer', 'محركات ومخرجات', 'مكبر صوت بيزو صغير، يتطلب إرسال ترددات (PWM) عبر دالة tone() لعزف نغمات موسيقية.', '[{"name":"+","description":"إشارة الـ PWM"}]'::jsonb, '0.5$', NULL, now()),
  ('active-buzzer', 'iot-lab', 'component', 'published', false, 360, 'Active Buzzer', 'محركات ومخرجات', 'يصدر صوتاً واحداً ثابتاً بمجرد توصيل 5V إليه. ممتاز لإنذارات الحريق.', '[{"name":"+","description":"5V أو دبوس ديجيتال HIGH"}]'::jsonb, '0.5$', NULL, now()),
  ('servo-sg90', 'iot-lab', 'component', 'published', false, 370, 'Servo Motor SG90', 'محركات ومخرجات', 'محرك صغير وخفيف يتحرك بزاوية 180 درجة بدقة. مثالي للأذرع الآلية الصغيرة وفتح الأبواب.', '[{"name":"Signal (البرتقالي)","description":"إشارة PWM للزاوية"},{"name":"5V/GND","description":"طاقة المحرك"}]'::jsonb, '2$ - 4$', NULL, now()),
  ('servo-mg996r', 'iot-lab', 'component', 'published', false, 380, 'Servo Motor MG996R', 'محركات ومخرجات', 'سيرفو ذو تروس معدنية قوي جداً يتحمل أوزان ثقيلة، لكنه يسحب تياراً عالياً وقد يحرق الأردوينو إذا لم يفصل مصدر طاقته.', '[{"name":"Signal","description":"تحكم الزاوية"}]'::jsonb, '6$ - 10$', NULL, now()),
  ('dc-motor', 'iot-lab', 'component', 'published', false, 390, 'DC Motor (TT Gear)', 'محركات ومخرجات', 'المحرك الأصفر الشهير المستخدم لعجلات سيارات الروبوت. سرعته عالية لكنه يتطلب درايفر للتحكم به.', '[{"name":"Terminal 1/2","description":"عكس الأقطاب يعكس الدوران"}]'::jsonb, '1$ - 2$', NULL, now()),
  ('stepper-28byj', 'iot-lab', 'component', 'published', false, 400, 'Stepper Motor 28BYJ-48', 'محركات ومخرجات', 'محرك يخطو خطوات دقيقة جداً ومعه درايفر ULN2003، ممتاز للمشاريع التي تتطلب سرعة بطيئة جداً وموقعاً دقيقاً.', '[{"name":"IN1-IN4","description":"للدرايفر"}]'::jsonb, '2$ - 4$', NULL, now()),
  ('nema-17', 'iot-lab', 'component', 'published', false, 410, 'NEMA 17 Stepper', 'محركات ومخرجات', 'المحرك الاحترافي لطابعات الـ 3D، دقيق وقوي جداً، ويتطلب درايفر متقدم مثل A4988.', '[{"name":"Coil A / Coil B","description":"4 أسلاك للتحكم بالملفات"}]'::jsonb, '10$ - 15$', NULL, now()),
  ('relay-module', 'iot-lab', 'component', 'published', false, 420, '5V Relay Module', 'محركات ومخرجات', 'مفتاح كهرومغناطيسي، يسمح للأردوينو (5V) بتشغيل أجهزة تعمل بكهرباء المنزل (220V) بآمان عبر العزل.', '[{"name":"IN","description":"إشارة التحكم"},{"name":"NO/NC/COM","description":"جهة الجهد العالي للريلاي"}]'::jsonb, '1$ - 3$', NULL, now()),
  ('solid-state-relay', 'iot-lab', 'component', 'published', false, 430, 'Solid State Relay (SSR)', 'محركات ومخرجات', 'ريلاي يعمل ضوئياً بدون أجزاء ميكانيكية، أسرع ولا يصدر صوت ''طقطقة'' وممتاز للسخانات.', '[{"name":"DC IN","description":"3-32V"},{"name":"AC OUT","description":"لتحميل التيار المتردد"}]'::jsonb, '5$ - 10$', NULL, now()),
  ('water-pump', 'iot-lab', 'component', 'published', false, 440, 'Mini Water Pump 5V', 'محركات ومخرجات', 'مضخة غاطسة صغيرة لسحب الماء في مشاريع الري. تسحب تياراً عالياً ويجب تشغيلها بترانزستور أو ريلاي.', '[{"name":"VCC/GND","description":"لتشغيل الموتور الداخلي"}]'::jsonb, '2$ - 4$', NULL, now()),
  ('solenoid-lock', 'iot-lab', 'component', 'published', false, 450, 'Solenoid Lock 12V', 'محركات ومخرجات', 'قفل إلكتروني للأبواب والخزائن، يسحب لسانه المعدني للداخل عند مرور تيار 12V.', '[{"name":"+/- 12V","description":"يجب التحكم بها بريلاي"}]'::jsonb, '5$ - 10$', NULL, now()),
  ('vibration-motor', 'iot-lab', 'component', 'published', false, 460, 'Vibration Motor', 'محركات ومخرجات', 'محرك اهتزاز يشبه الموجود في الهواتف، يستخدم لإعطاء تنبيهات لمسية (Haptic feedback).', '[{"name":"VCC/GND","description":"يعمل בـ 3.3V أو 5V"}]'::jsonb, '1$ - 2$', NULL, now()),
  ('lcd-16x2', 'iot-lab', 'component', 'published', false, 470, 'LCD 16x2 (بدون I2C)', 'شاشات', 'شاشة تعرض 16 حرفاً في سطرين. النسخة العادية بدون محول I2C تتطلب توصيل 6 أسلاك بيانات للأردوينو، مما يستهلك منافذ كثيرة.', '[{"name":"RS, EN, D4-D7","description":"أسلاك التحكم والبيانات"}]'::jsonb, '2$ - 4$', NULL, now()),
  ('lcd-i2c-module', 'iot-lab', 'component', 'published', false, 480, 'I2C Module for LCD', 'شاشات', 'قطعة سوداء صغيرة تلحم خلف شاشة LCD لتقليل عدد الأسلاك المطلوبة من 6 إلى 2 فقط (SDA و SCL).', '[{"name":"SDA","description":"بيانات"},{"name":"SCL","description":"نبضات المزامنة"}]'::jsonb, '1$ - 2$', NULL, now()),
  ('oled-096', 'iot-lab', 'component', 'published', false, 490, 'OLED 0.96 inch', 'شاشات', 'شاشة صغيرة جداً لكنها عالية الدقة ومشرقة باللون الأزرق أو الأبيض. قادرة على رسم أيقونات وخطوط ورسوم بيانية ببيكسلات واضحة.', '[{"name":"I2C أو SPI","description":"حسب الموديول"}]'::jsonb, '3$ - 6$', NULL, now()),
  ('7-segment', 'iot-lab', 'component', 'published', false, 500, '7-Segment Display', 'شاشات', 'شاشة رقمية كلاسيكية تعرض رقماً واحداً فقط (من 0 إلى 9) وتستخدم 8 ليدات داخلية لرسم الرقم.', '[{"name":"A-G, DP","description":"أرجل الليدات الداخلية"},{"name":"Common","description":"كاثود أو أنود مشترك"}]'::jsonb, '0.5$ - 1$', NULL, now()),
  ('tm1637', 'iot-lab', 'component', 'published', false, 510, 'TM1637 4-Digit Display', 'شاشات', 'أربع شاشات 7-Segment مدمجة مع شريحة تحكم ذكية لعرض الساعات أو الأرقام الكبيرة بـ 4 أسلاك فقط.', '[{"name":"CLK / DIO","description":"للتحكم التسلسلي"}]'::jsonb, '2$ - 4$', NULL, now()),
  ('tft-touch', 'iot-lab', 'component', 'published', false, 520, 'TFT Touch Screen 2.4', 'شاشات', 'شاشة ملونة تعمل باللمس، تُركب كدرع (Shield) فوق الأردوينو لعمل واجهات استخدام تشبه الهواتف الذكية القديمة.', '[{"name":"Shield Pins","description":"تستخدم كل منافذ الأونو تقريباً"}]'::jsonb, '10$ - 15$', NULL, now()),
  ('ws2812-matrix', 'iot-lab', 'component', 'published', false, 530, 'LED Matrix 8x8', 'شاشات', 'مصفوفة ليدات حمراء لطباعة أحرف متحركة، تُدار بواسطة شريحة MAX7219 ويمكن ربط عدة شاشات لتشكيل لوحة إعلانية.', '[{"name":"DIN, CS, CLK","description":"واجهة SPI"}]'::jsonb, '3$ - 6$', NULL, now()),
  ('breadboard', 'iot-lab', 'component', 'published', false, 540, 'Breadboard (اللوحة التجريبية)', 'طاقة وأسلاك', 'الأساس الذي تُبنى عليه كل المشاريع لاختبارها وتوصيلها ببعض بدون لحام.', '[{"name":"الصفوف والأعمدة","description":"توصيلات داخلية مخفية"}]'::jsonb, '2$ - 5$', NULL, now()),
  ('jumper-wires', 'iot-lab', 'component', 'published', false, 550, 'Jumper Wires', 'طاقة وأسلاك', 'أسلاك التوصيل، تأتي بثلاثة أنواع: (ذكر-ذكر) לلبريد بورد، (أنثى-أنثى) لتوصيل الحساسات، و(ذكر-أنثى).', '[{"name":"M/M, M/F, F/F","description":"أنواع النهايات"}]'::jsonb, '2$ (لـ 40 سلك)', NULL, now()),
  ('resistor', 'iot-lab', 'component', 'published', false, 560, 'Resistors (المقاومات)', 'طاقة وأسلاك', 'تقلل مرور التيار لحماية القطع الإلكترونية الأخرى من الاحتراق. القيم الشائعة: 220، 1K، 10K.', '[{"name":"لا يوجد قطبية","description":"يمكن تركيبها بأي اتجاه"}]'::jsonb, '0.01$', NULL, now()),
  ('potentiometer', 'iot-lab', 'component', 'published', false, 570, 'Potentiometer (مقاومة متغيرة)', 'طاقة وأسلاك', 'مفتاح دوار كالموجود في الراديو القديم لتغيير الصوت. يستخدم لتغيير الجهد الذي يقرأه المنفذ التناظري.', '[{"name":"الطرفين","description":"طاقة 5V و GND"},{"name":"الأوسط","description":"الإشارة A0"}]'::jsonb, '0.5$', NULL, now()),
  ('capacitor', 'iot-lab', 'component', 'published', false, 580, 'Capacitor (المكثفات)', 'طاقة وأسلاك', 'خزانات طاقة سريعة. تستخدم لتنعيم التيار (ترشيح الضوضاء) ومنع إعادة تشغيل المعالج عند تشغيل المحركات.', '[{"name":"قطبي / غير قطبي","description":"مكثف السيراميك لا يهم اتجاهه، والإلكتروليتي (الأسطواني) له قطب سالب"}]'::jsonb, '0.1$', NULL, now()),
  ('diode-1n4007', 'iot-lab', 'component', 'published', false, 590, 'Diode 1N4007', 'طاقة وأسلاك', 'صمام باتجاه واحد. يسمح بمرور التيار في جهة ويمنعه من الرجوع. أساسي لحماية الترانزستورات من الجهد العكسي للمحركات.', '[{"name":"الخط الرمادي","description":"يشير للكاثود (اتجاه خروج التيار)"}]'::jsonb, '0.05$', NULL, now()),
  ('transistor-pn2222', 'iot-lab', 'component', 'published', false, 600, 'Transistor PN2222 (BJT)', 'طاقة وأسلاك', 'مفتاح إلكتروني صغير يسمح لإشارة الأردوينو الضعيفة بتشغيل محرك صغير أو أضواء تستهلك حتى 800mA.', '[{"name":"B, C, E","description":"القاعدة (Control)، المجمع (VCC)، الباعث (GND)"}]'::jsonb, '0.1$', NULL, now()),
  ('mosfet-irlz44n', 'iot-lab', 'component', 'published', false, 610, 'MOSFET IRLZ44N', 'طاقة وأسلاك', 'ترانزستور للأحمال الثقيلة جداً (Logic Level MOSFET)، يستطيع تشغيل محركات ومصابيح قوية لعدة أمبيرات ببرودة وأمان.', '[{"name":"G, D, S","description":"البوابة، المصرف، المنبع"}]'::jsonb, '1$ - 2$', NULL, now()),
  ('battery-9v', 'iot-lab', 'component', 'published', false, 620, '9V Battery + Clip', 'طاقة وأسلاك', 'بطارية مربعة كلاسيكية. جيدة لتشغيل الأردوينو عبر منفذ الـ DC، ولكنها سيئة جداً للمحركات لأن تيارها ضعيف وتفرغ بسرعة.', '[{"name":"+/-","description":"تُوصل لمدخل Vin أو جاك الطاقة"}]'::jsonb, '2$', NULL, now()),
  ('battery-18650', 'iot-lab', 'component', 'published', false, 630, 'Li-ion 18650 Battery', 'طاقة وأسلاك', 'بطارية الليثيوم الأسطوانية، نفس المستخدمة في سيارات تسلا! قوية جداً وتوفر تياراً هائلاً للمحركات.', '[{"name":"تحذير","description":"قصرها الكهربائي خطر جداً ويسبب اشتعالاً"}]'::jsonb, '3$ - 6$', NULL, now()),
  ('tp4056', 'iot-lab', 'component', 'published', false, 640, 'TP4056 Charger Module', 'طاقة وأسلاك', 'دائرة شحن ضرورية لبطاريات 18650، تشحن البطارية من شاحن الجوال بآمان وتمنع التفريغ الزائد الذي يتلف البطارية.', '[{"name":"B+/B-","description":"للبطارية"},{"name":"OUT+/OUT-","description":"للدائرة"}]'::jsonb, '1$ - 2$', NULL, now()),
  ('step-down-lm2596', 'iot-lab', 'component', 'published', false, 650, 'LM2596 Step Down', 'طاقة وأسلاك', 'يحول الجهد العالي (مثلا 12V) إلى جهد منخفض ومستقر (مثلا 5V) بكفاءة عالية لتشغيل الأردوينو والمحركات معاً من بطارية واحدة.', '[{"name":"IN+/IN-","description":"من البطارية"},{"name":"OUT+/OUT-","description":"إلى المشروع"}]'::jsonb, '2$ - 4$', NULL, now()),
  ('step-up-mt3608', 'iot-lab', 'component', 'published', false, 660, 'MT3608 Step Up', 'طاقة وأسلاك', 'يرفع الجهد المنخفض لجهد أعلى. مفيد لتشغيل أردوينو (5V) من بطارية ليثيوم واحدة (3.7V).', '[{"name":"يجب ضبط المسمار","description":"للوصول للجهد المطلوب قبل التوصيل بالأردوينو"}]'::jsonb, '1$ - 3$', NULL, now()),
  ('logic-level-converter', 'iot-lab', 'component', 'published', false, 670, 'Logic Level Converter', 'طاقة وأسلاك', 'يربط الأردوينو (5V) بشكل آمن بقطع الـ 3.3V (مثل البلوتوث والـ SD Card) لتجنب حرقها بالإشارات عالية الجهد.', '[{"name":"HV / LV","description":"الجانب العالي / الجانب المنخفض"}]'::jsonb, '1$ - 2$', NULL, now()),
  ('power-supply-module', 'iot-lab', 'component', 'published', false, 680, 'Breadboard Power Supply', 'طاقة وأسلاك', 'تركب على اللوحة التجريبية، وتوفر لك مسارين للـ 5V والـ 3.3V المستقرة لمشروعك عبر شاحن حائط عادي.', '[{"name":"Rails","description":"تغذي خطوط الطاقة الجانبية"}]'::jsonb, '2$ - 3$', NULL, now()),
  ('push-button', 'iot-lab', 'component', 'published', false, 690, 'Push Button (زر ضغاط)', 'أخرى', 'يغلق الدائرة عند الضغط، ويفصلها عند الرفع. أهم جهاز إدخال بشري في المشاريع.', '[{"name":"4 أرجل","description":"داخلياً كل رجلين متقابلتين متصلتان معاً"}]'::jsonb, '0.1$', NULL, now()),
  ('keypad-4x4', 'iot-lab', 'component', 'published', false, 700, '4x4 Membrane Keypad', 'أخرى', 'لوحة أرقام مسطحة تستخدم نظام المصفوفة للتعرف على 16 زراً باستخدام 8 منافذ فقط.', '[{"name":"R1-R4, C1-C4","description":"الصفوف والأعمدة"}]'::jsonb, '2$ - 3$', NULL, now()),
  ('joystick', 'iot-lab', 'component', 'published', false, 710, 'Analog Joystick Module', 'أخرى', 'عصا تحكم كالموجودة في أذرع البلايستيشن، تحتوي على مقاومتين متغيرتين للحركة في محورين X و Y مع زر ضغط مركزي.', '[{"name":"VRx / VRy","description":"مخارج تناظرية لـ A0 و A1"}]'::jsonb, '2$ - 4$', NULL, now()),
  ('l298n', 'iot-lab', 'component', 'published', false, 720, 'L298N Motor Driver', 'أخرى', 'القطعة الأساسية لقيادة سيارات الروبوت. توفر التيار العالي لمحركين وتسمح بعكس اتجاه دورانهما.', '[{"name":"IN1-IN4","description":"للتحكم"},{"name":"12V, 5V, GND","description":"للطاقة"}]'::jsonb, '3$ - 5$', NULL, now()),
  ('l293d-shield', 'iot-lab', 'component', 'published', false, 730, 'L293D Motor Shield', 'أخرى', 'درع يركب فوق الأردوينو مباشرة للتحكم בـ 4 محركات DC أو محركين Stepper بسهولة فائقة دون فوضى الأسلاك.', '[{"name":"تركيب مباشر","description":"يستخدم معظم دبابيس الأردوينو"}]'::jsonb, '4$ - 6$', NULL, now()),
  ('sd-card-module', 'iot-lab', 'component', 'published', false, 740, 'Micro SD Card Module', 'أخرى', 'قارئ بطاقات ذاكرة لحفظ كميات هائلة من بيانات الحساسات (Data Logging) أو قراءة ملفات نصية.', '[{"name":"SPI","description":"MOSI, MISO, SCK, CS"}]'::jsonb, '2$ - 4$', NULL, now()),
  ('rtc-ds3231', 'iot-lab', 'component', 'published', false, 750, 'DS3231 RTC Module', 'أخرى', 'ساعة زمنية دقيقة جداً لا تفقد الوقت، بفضل بطاريتها المستقلة ومستشعر الحرارة الداخلي الذي يعوض تغيرات الطقس.', '[{"name":"I2C","description":"SDA و SCL"}]'::jsonb, '3$ - 5$', NULL, now()),
  ('cnc-shield', 'iot-lab', 'component', 'published', false, 760, 'CNC Shield V3', 'أخرى', 'درع يوضع على الأونو لتركيب درايفرات (A4988) لبناء آلة رسم أو طابعة 3D أو ماكينة حفر ليزر.', '[{"name":"دبابيس محاور","description":"X, Y, Z, A"}]'::jsonb, '5$ - 8$', NULL, now()),
  ('a4988-driver', 'iot-lab', 'component', 'published', false, 770, 'A4988 Stepper Driver', 'أخرى', 'درايفر دقيق يتحكم במحركات הـ Stepper. يحتاج لإشارة واحدة فقط للخطوة وإشارة للاتجاه.', '[{"name":"STEP / DIR","description":"دبابيس التحكم"}]'::jsonb, '2$ - 3$', NULL, now()),
  ('nrf24l01', 'iot-lab', 'component', 'published', false, 780, 'NRF24L01+ Wireless', 'أخرى', 'مرسل ومستقبل راديو بتردد 2.4GHz قوي جداً واقتصادي الطاقة، يستخدم للتحكم بالطائرات بدون طيار أو مشاريع الاتصالات عن بعد.', '[{"name":"SPI","description":"يعمل בـ 3.3V فقط، ومشهور باحتياجه لمكثف للحفاظ على طاقته"}]'::jsonb, '2$ - 4$', NULL, now()),
  ('bluetooth-hc05', 'iot-lab', 'component', 'published', false, 790, 'HC-05 Bluetooth', 'أخرى', 'يربط مشروعك בהاتفك أو الكمبيوتر لاسلكياً. الـ HC-05 يمكنه الإرسال والاستقبال وعمل الاقتران بأجهزة بلوتوث أخرى.', '[{"name":"TX / RX","description":"اتصال تسلسلي عادي"}]'::jsonb, '4$ - 6$', NULL, now());
