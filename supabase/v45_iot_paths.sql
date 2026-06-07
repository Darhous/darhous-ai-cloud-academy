-- ══════════════════════════════════════════════════════════════════
-- v45 — IoT Lab — Learning Paths (iot_paths)
-- Run in: Supabase Dashboard → SQL Editor
-- FLAT type — the PathData interface has no nested array-of-object
-- fields (modules/relatedLessons/relatedProjects/etc are all plain string[])
-- — matches the ai_glossary precedent. NOTE: distinct from iot_roadmaps (v46) —
-- PathData is consumed by /iot-lab/paths (list+detail pages); Roadmap (a
-- richer staged structure) appears to be unused/dead data — see v46 note.
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS iot_paths (
  id                     TEXT        PRIMARY KEY,                 -- = existing slug (e.g. 'arduino-basics') — keeps links intact
  portal_id              TEXT        NOT NULL DEFAULT 'iot-lab',
  content_type           TEXT        NOT NULL DEFAULT 'path',
  status                 TEXT        NOT NULL DEFAULT 'published'
                                     CHECK (status IN ('published','draft','archived')),
  featured               BOOLEAN     NOT NULL DEFAULT false,
  sort_order             INT         NOT NULL DEFAULT 0,
  title                  TEXT        NOT NULL DEFAULT '',
  english_title          TEXT        NOT NULL DEFAULT '',
  level                  TEXT        NOT NULL DEFAULT 'مبتدئ'
                                     CHECK (level IN ('مبتدئ','متوسط','متقدم','خبير')),
  duration               TEXT        NOT NULL DEFAULT '',
  target_learner         TEXT        NOT NULL DEFAULT '',
  prerequisites          TEXT        NOT NULL DEFAULT '',
  description            TEXT        NOT NULL DEFAULT '',
  modules                TEXT[]      NOT NULL DEFAULT '{}',
  related_lessons        TEXT[]      NOT NULL DEFAULT '{}',
  related_projects       TEXT[]      NOT NULL DEFAULT '{}',
  related_code_examples  TEXT[]      NOT NULL DEFAULT '{}',
  related_components     TEXT[]      NOT NULL DEFAULT '{}',
  final_project          TEXT        NOT NULL DEFAULT '',
  cta_text               TEXT        NOT NULL DEFAULT '',
  created_by             UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at            TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_iot_paths_status ON iot_paths (status);
CREATE INDEX IF NOT EXISTS idx_iot_paths_level  ON iot_paths (level);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_iot_paths_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_iot_paths_updated_at ON iot_paths;
CREATE TRIGGER trg_iot_paths_updated_at
  BEFORE UPDATE ON iot_paths
  FOR EACH ROW EXECUTE FUNCTION update_iot_paths_updated_at();

-- 3. RLS
ALTER TABLE iot_paths ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_iot_paths" ON iot_paths;
CREATE POLICY "public_read_published_iot_paths"
  ON iot_paths FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "admin_manage_iot_paths" ON iot_paths;
CREATE POLICY "admin_manage_iot_paths"
  ON iot_paths FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Service role (API routes using createAdminClient) bypasses RLS — application
-- code verifies admin role before writes, matching the existing tables' convention.

-- ══════════════════════════════════════════════════════════════════
-- 4. Seed — the 18 existing learning paths (pathsData), SAME ids, status='published'.
--    Generated programmatically from the source .ts data files (zero transcription risk).
-- ══════════════════════════════════════════════════════════════════
INSERT INTO iot_paths (id, portal_id, content_type, status, featured, sort_order, title, english_title, level, duration, target_learner, prerequisites, description, modules, related_lessons, related_projects, related_code_examples, related_components, final_project, cta_text, published_at)
VALUES
  ('arduino-basics', 'iot-lab', 'path', 'published', true, 0, 'أردوينو من الصفر', 'Arduino from Zero', 'مبتدئ', 'أسبوعان', 'المبتدئون كلياً في البرمجة والإلكترونيات', 'لا شيء', 'أول خطوة لك في عالم الميكروكونترولر. ستتعلم ماهية الأردوينو، كيفية توصيله بالحاسوب، وكتابة كود بلغة C++ للتحكم في الليدات والمخرجات الرقمية.', ARRAY['مقدمة في الميكروكونترولر','أول برنامج Blink','التحكم الرقمي (Digital I/O)']::text[], ARRAY['what-is-arduino','digital-output-led','breadboard-basics']::text[], ARRAY['led-blink','traffic-light']::text[], ARRAY['blink-led']::text[], ARRAY['arduino-uno','led','resistor']::text[], 'إشارة المرور المبرمجة', 'ابدأ رحلتك الآن', now()),
  ('electronics-fundamentals', 'iot-lab', 'path', 'published', true, 10, 'أساسيات الإلكترونيات', 'Electronics Fundamentals', 'مبتدئ', 'أسبوعان', 'الراغبون في فهم الكهرباء والمكونات قبل البرمجة', 'لا شيء', 'فهم الجهد، التيار، المقاومة، وقانون أوم. كيفية قراءة المخططات الإلكترونية البسيطة والتفريق بين المكونات السلبية والنشطة.', ARRAY['الكهرباء الأساسية','المقاومات وقانون أوم','المكثفات والدايود','الترانزستور']::text[], ARRAY['ohms-law','reading-schematics']::text[], ARRAY['basic-circuit-no-code']::text[], '{}', ARRAY['resistor','capacitor','diode','transistor']::text[], 'بناء دائرة مكبر ترانزستور بسيطة', 'تعلم الكهرباء', now()),
  ('breadboard-wiring-mastery', 'iot-lab', 'path', 'published', true, 20, 'احتراف التوصيل والبريد بورد', 'Breadboard and Wiring Mastery', 'مبتدئ', 'أسبوع', 'الطلاب الذين يواجهون صعوبة في قراءة الدوائر وتوصيلها', 'أساسيات الإلكترونيات', 'دليلك العملي لفهم اللوحة التجريبية (Breadboard) وطرق التوصيل النظيفة لتجنب القصر الكهربائي والفوضى.', ARRAY['بنية البريد بورد','تنظيم الأسلاك','تجنب القصر الكهربائي']::text[], ARRAY['breadboard-basics']::text[], '{}', '{}', ARRAY['breadboard']::text[], 'توصيل 10 مكونات معاً بانتظام', 'احترف التوصيل', now()),
  ('sensors-actuators', 'iot-lab', 'path', 'published', false, 30, 'الحساسات والمشغلات', 'Sensors & Actuators', 'متوسط', '3 أسابيع', 'صناع الدوائر الذين يريدون التفاعل مع البيئة المحيطة', 'أردوينو من الصفر', 'جعل الدائرة تحس بما حولها (حرارة، ضوء، مسافة، حركة) وتتخذ قرارات بناءً عليها لتحريك موتور أو إصدار صوت.', ARRAY['الحساسات التناظرية','الحساسات الرقمية','حساسات I2C']::text[], ARRAY['analog-input-potentiometer','ultrasonic-sensor','dht11-basics']::text[], ARRAY['smart-parking','ultrasonic-meter','motion-security-alarm']::text[], ARRAY['read-ultrasonic','read-dht11']::text[], ARRAY['ultrasonic','dht11','pir','ldr']::text[], 'نظام إنذار الحركة والصوت', 'استكشف الحساسات', now()),
  ('displays-ui', 'iot-lab', 'path', 'published', false, 40, 'الشاشات وواجهات المستخدم', 'Displays and User Interfaces', 'متوسط', 'أسبوعان', 'مَن يرغب بإضافة شاشات وقوائم لمشاريعه', 'أردوينو من الصفر', 'بدلاً من السيريال مونيتور، اعرض بياناتك على شاشات LCD، OLED، وقم ببرمجة قوائم تنقل للمستخدم.', ARRAY['شاشات LCD','شاشات OLED','إدارة قوائم الأزرار']::text[], ARRAY['lcd-i2c-basics','oled-graphics']::text[], ARRAY['lcd-menu-system','oled-sensor-dashboard']::text[], ARRAY['print-lcd','draw-oled']::text[], ARRAY['lcd-i2c','oled']::text[], 'شاشة مراقبة تفاعلية مع قوائم', 'اعرض بياناتك', now()),
  ('motors-motion-control', 'iot-lab', 'path', 'published', false, 50, 'المحركات والتحكم الحركي', 'Motors and Motion Control', 'متوسط', '3 أسابيع', 'المهتمون بالروبوتات والأذرع الآلية', 'أساسيات الإلكترونيات', 'الفرق بين محركات التيار المستمر (DC)، السيرفو (Servo)، ومحركات الخطوة (Stepper)، وكيفية توفير طاقة مستقلة لها.', ARRAY['السيرفو موتور','الـ DC موتور مع L298N','الـ Stepper موتور']::text[], ARRAY['servo-motors','dc-motors']::text[], ARRAY['servo-radar','smart-fan-controller']::text[], ARRAY['servo-sweep','motor-pwm-l298n']::text[], ARRAY['servo','dc-motor','stepper-motor','l298n']::text[], 'ذراع آلي مبسط', 'حرك الأشياء', now()),
  ('esp32-esp8266-iot', 'iot-lab', 'path', 'published', false, 60, 'إنترنت الأشياء مع ESP32 و ESP8266', 'ESP32 and ESP8266 IoT', 'متوسط', '4 أسابيع', 'الراغبون في ربط مشاريعهم بالإنترنت والواي فاي', 'أردوينو من الصفر، الحساسات', 'نقل مشاريعك للقرن الحادي والعشرين بدمجها مع الواي فاي للتحكم بها عبر المتصفح أو الهاتف من أي مكان بالعالم.', ARRAY['مقدمة ESP','بناء Web Server','استخدام APIs']::text[], ARRAY['esp32-intro','http-apis']::text[], ARRAY['esp32-web-server-led']::text[], ARRAY['esp32-wifi-connect']::text[], ARRAY['esp32','esp8266']::text[], 'لوحة تحكم منزلية عبر المتصفح', 'اربطها بالإنترنت', now()),
  ('micropython-makers', 'iot-lab', 'path', 'published', false, 70, 'مايكروبايثون للصناع', 'MicroPython for Makers', 'متقدم', '3 أسابيع', 'المبرمجون بـ Python الراغبون بدخول الهاردوير', 'معرفة بأساسيات بايثون', 'إذا كنت لا تفضل C++، تعلم كيف تكتب بايثون مباشرة على متحكمات ESP32 و Raspberry Pi Pico وتتفاعل مع العالم الحقيقي.', ARRAY['تنصيب Thonny','كتابة أول سكربت','مكتبات الهاردوير في بايثون']::text[], ARRAY['micropython-intro']::text[], ARRAY['micropython-weather-station']::text[], ARRAY['micropython-blink']::text[], ARRAY['esp32','raspberry-pi-pico']::text[], 'جهاز قياس طقس بلغة بايثون', 'برمج بالبايثون', now()),
  ('smart-home-automation', 'iot-lab', 'path', 'published', false, 80, 'أتمتة المنزل الذكي', 'Smart Home Automation', 'متقدم', '4 أسابيع', 'الهواة الراغبون في أتمتة غرفهم أو منازلهم', 'ESP32 و الحساسات', 'تصميم أنظمة تحكم بالإنارة، أقفال أبواب ذكية، ومراقبة حرارة الغرفة، والتعامل الآمن مع الريلايات.', ARRAY['الريلاي والجهد العالي','RFID والأقفال الذكية','التنبيهات السحابية']::text[], ARRAY['relay-safety','rfid-basics','keypad-input']::text[], ARRAY['smart-door-lock-keypad','rfid-attendance']::text[], ARRAY['read-rfid']::text[], ARRAY['relay','rfid-mfrc522','keypad','solenoid-lock']::text[], 'غرفة ذكية كاملة', 'ابنِ منزلك الذكي', now()),
  ('robotics-track', 'iot-lab', 'path', 'published', false, 90, 'مسار الروبوتات الشامل', 'Robotics Track', 'متقدم', '5 أسابيع', 'شغوفو الروبوتات والذكاء الاصطناعي', 'المحركات، الحساسات', 'بناء سيارات روبوت متحركة، استخدام حساسات تجنب العقبات وتتبع الخطوط، وربطها بالبلوتوث.', ARRAY['تجميع الشاسيه','التحكم الاتجاهي','تتبع الخط (Line Follower)']::text[], ARRAY['robot-chassis-wiring']::text[], ARRAY['bluetooth-robot-car','obstacle-avoiding-robot','line-follower-robot']::text[], ARRAY['l298n-motor-control']::text[], ARRAY['dc-motor','l298n','ir-sensor','bluetooth-hc05']::text[], 'روبوت متتبع مسار يتفادى العقبات', 'اصنع روبوتك', now()),
  ('line-follower-mobile', 'iot-lab', 'path', 'published', false, 100, 'تتبع الخط والروبوتات المتنقلة', 'Line Follower and Mobile Robots', 'متقدم', '3 أسابيع', 'المشاركون في مسابقات الروبوتات المحلية', 'مسار الروبوتات الشامل', 'تطبيق خوارزميات متقدمة (مثل PID) لجعل الروبوت يتبع الخطوط بسلاسة وسرعة عالية دون اهتزاز.', ARRAY['مفهوم PID','استخدام مصفوفة حساسات IR','توليف الثوابت Kp, Ki, Kd']::text[], '{}', ARRAY['line-follower-robot']::text[], '{}', ARRAY['ir-sensor-array']::text[], 'روبوت سباق تتبع مسار بتقنية PID', 'تعلم خوارزميات الحركة', now()),
  ('industrial-iot-basics', 'iot-lab', 'path', 'published', false, 110, 'أساسيات إنترنت الأشياء الصناعي', 'Industrial IoT Basics', 'خبير', '3 أسابيع', 'المهندسون والتقنيون المهتمون بأتمتة المصانع', 'ESP32، الحساسات المتقدمة', 'استخدام حساسات صناعية، بروتوكولات مثل Modbus، وكيفية ضمان موثوقية الأنظمة (Reliability) في بيئة صعبة.', ARRAY['الفرق بين الصانع والصناعة','الموثوقية وتجنب التشويش','بروتوكولات المصانع']::text[], ARRAY['industrial-sensors-intro']::text[], ARRAY['factory-temp-monitor','industrial-pump-monitor']::text[], '{}', ARRAY['industrial-sensors','din-rail-modules']::text[], 'نظام مراقبة حرارة لمستودع تخزين', 'ادخل عالم الصناعة', now()),
  ('iot-cloud-dashboards', 'iot-lab', 'path', 'published', false, 120, 'لوحات التحكم السحابية IoT Dashboards', 'IoT Cloud Dashboards', 'متقدم', '4 أسابيع', 'محللو البيانات وهواة المراقبة عن بعد', 'ESP32', 'ربط ESP32 بمنصات مثل Blynk, Thingspeak, أو AWS IoT لإنشاء رسومات بيانية حية وجمع البيانات تاريخياً.', ARRAY['مقدمة في المنصات','إرسال البيانات لـ Thingspeak','إنشاء واجهة Blynk']::text[], '{}', ARRAY['iot-weather-station','soil-moisture-dashboard']::text[], ARRAY['thingspeak-send']::text[], ARRAY['esp32']::text[], 'لوحة بيانات لمزرعة أو غرفة', 'ارسم بياناتك', now()),
  ('wireless-communication', 'iot-lab', 'path', 'published', false, 130, 'الاتصالات اللاسلكية والراديو', 'Wireless Communication', 'متقدم', 'أسبوعان', 'الهواة الراغبون في ربط أردوينو بأردوينو عن بعد', 'أردوينو من الصفر', 'التخلي عن الأسلاك واستخدام موجات الراديو (NRF24L01)، البلوتوث (HC-05)، وتقنيات LoRa للمسافات الطويلة.', ARRAY['البلوتوث','وحدات NRF24L01','تقنية LoRa']::text[], '{}', ARRAY['wireless-weather-station','bluetooth-robot-car']::text[], ARRAY['nrf24-send-receive']::text[], ARRAY['bluetooth-hc05','nrf24l01','lora-module']::text[], 'نظام إرسال واستقبال عن بعد براديو NRF', 'اقطع الأسلاك', now()),
  ('ai-iot-edge', 'iot-lab', 'path', 'published', false, 140, 'الذكاء الاصطناعي وإنترنت الأشياء', 'AI + IoT Edge Projects', 'خبير', '6 أسابيع', 'الباحثون عن دمج النماذج الذكية بالأجهزة المادية', 'ESP32, بايثون', 'كيف تجعل الروبوت يتعرف على الأوجه أو الصوت باستخدام TinyML و ESP32-CAM.', ARRAY['مقدمة ESP32-CAM','تدريب نموذج TinyML','التعرف على الأجسام']::text[], '{}', ARRAY['esp32-camera-concept','ai-object-detection']::text[], '{}', ARRAY['esp32-cam']::text[], 'كاميرا أمنية تتعرف على الأشخاص', 'ادمج الذكاء الاصطناعي', now()),
  ('energy-monitoring', 'iot-lab', 'path', 'published', false, 150, 'مراقبة الطاقة والعدادات الذكية', 'Energy Monitoring and Smart Metering', 'متقدم', '3 أسابيع', 'المهتمون بالطاقة الشمسية وتوفير الاستهلاك', 'أساسيات الإلكترونيات', 'قراءة التيار والجهد للأجهزة المنزلية باستخدام حساسات SCT، وبناء عداد كهرباء ذكي متصل بالإنترنت.', ARRAY['حساسات التيار المتناوب','قراءة الجهد المنزلي بأمان','حساب الاستطاعة بالواط']::text[], '{}', ARRAY['home-energy-monitor','solar-battery-monitor']::text[], '{}', ARRAY['sct013','voltage-sensor']::text[], 'عداد كهرباء واي فاي', 'راقب استهلاكك', now()),
  ('agriculture-iot', 'iot-lab', 'path', 'published', false, 160, 'الزراعة الذكية والري', 'Agriculture IoT and Smart Irrigation', 'متوسط', '3 أسابيع', 'المزارعون الهواة ومن يملكون نباتات منزلية', 'الحساسات، الريلاي', 'لا تدع نباتاتك تموت! استخدم حساسات رطوبة التربة والمضخات لإنشاء نظام زراعي يسقي نفسه ذاتياً ويرسل لك التقارير.', ARRAY['حساس التربة','المضخات المائية المغمورة','المنطق المستقل للاعتمادية']::text[], '{}', ARRAY['smart-plant-monitor','smart-irrigation-controller','mini-greenhouse-automation']::text[], ARRAY['read-soil-moisture']::text[], ARRAY['soil-moisture','water-pump','relay']::text[], 'حديقة ذكية تسقي نفسها متى احتاجت', 'ازرع بذكاء', now()),
  ('capstone-projects', 'iot-lab', 'path', 'published', false, 170, 'مشاريع التخرج الشاملة (Capstone)', 'Capstone Maker Projects', 'خبير', 'مفتوح', 'من أتموا مسارات متعددة ويريدون تحديات حقيقية', 'مسارات متوسطة ومتقدمة متعددة', 'بناء منتجات أو مشاريع كبيرة تدمج بين الـ Hardware، الـ Cloud، وحل المشكلات الهندسية لتكون ضمن معرض أعمالك.', ARRAY['تصميم العلب بالطباعة ثلاثية الأبعاد','تصميم الـ PCB','توثيق المشروع المفتوح المصدر']::text[], ARRAY['project-architecture','debugging-advanced']::text[], ARRAY['smart-parking-gate','people-counter','water-tank-monitor','exam-hall-monitor']::text[], '{}', '{}', 'منتج IoT متكامل', 'ابنِ منتجك الأول', now());
