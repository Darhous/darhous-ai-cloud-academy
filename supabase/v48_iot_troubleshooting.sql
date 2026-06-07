-- ══════════════════════════════════════════════════════════════════
-- v48 — IoT Lab — Troubleshooting Guides (iot_troubleshooting)
-- Run in: Supabase Dashboard → SQL Editor
-- FLAT type — the TroubleshootingGuide interface has no nested
-- array-of-object fields (likelyCauses/diagnosisSteps are plain string[])
-- — matches the ai_glossary precedent.
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS iot_troubleshooting (
  id                  TEXT        PRIMARY KEY,                 -- = existing slug (e.g. 'code-upload-fails') — keeps links intact
  portal_id           TEXT        NOT NULL DEFAULT 'iot-lab',
  content_type        TEXT        NOT NULL DEFAULT 'troubleshooting',
  status              TEXT        NOT NULL DEFAULT 'published'
                                  CHECK (status IN ('published','draft','archived')),
  featured            BOOLEAN     NOT NULL DEFAULT false,
  sort_order          INT         NOT NULL DEFAULT 0,
  title               TEXT        NOT NULL DEFAULT '',
  symptoms            TEXT        NOT NULL DEFAULT '',
  likely_causes       TEXT[]      NOT NULL DEFAULT '{}',
  diagnosis_steps     TEXT[]      NOT NULL DEFAULT '{}',
  quick_fix           TEXT        NOT NULL DEFAULT '',
  prevention_tip      TEXT        NOT NULL DEFAULT '',
  related_lesson_id   TEXT,
  created_by          UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at         TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_iot_troubleshooting_status ON iot_troubleshooting (status);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_iot_troubleshooting_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_iot_troubleshooting_updated_at ON iot_troubleshooting;
CREATE TRIGGER trg_iot_troubleshooting_updated_at
  BEFORE UPDATE ON iot_troubleshooting
  FOR EACH ROW EXECUTE FUNCTION update_iot_troubleshooting_updated_at();

-- 3. RLS
ALTER TABLE iot_troubleshooting ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_iot_troubleshooting" ON iot_troubleshooting;
CREATE POLICY "public_read_published_iot_troubleshooting"
  ON iot_troubleshooting FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "admin_manage_iot_troubleshooting" ON iot_troubleshooting;
CREATE POLICY "admin_manage_iot_troubleshooting"
  ON iot_troubleshooting FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Service role (API routes using createAdminClient) bypasses RLS — application
-- code verifies admin role before writes, matching the existing tables' convention.

-- ══════════════════════════════════════════════════════════════════
-- 4. Seed — the 10 existing troubleshooting guides (troubleshootingData), SAME ids, status='published'.
--    Generated programmatically from the source .ts data files (zero transcription risk).
-- ══════════════════════════════════════════════════════════════════
INSERT INTO iot_troubleshooting (id, portal_id, content_type, status, featured, sort_order, title, symptoms, likely_causes, diagnosis_steps, quick_fix, prevention_tip, related_lesson_id, published_at)
VALUES
  ('code-upload-fails', 'iot-lab', 'troubleshooting', 'published', true, 0, 'الكود لا يُرفع على الأردوينو', 'عند الضغط على Upload في Arduino IDE يظهر خطأ avrdude: stk500_recv(): programmer is not responding.', ARRAY['المنفذ (Port) الخاطئ محدد.','نوع اللوحة (Board) غير صحيح.','كابل USB لا ينقل البيانات (كابل شحن فقط).','دبابيس RX/TX (0 و 1) موصولة بعناصر أخرى.']::text[], ARRAY['افصل الأردوينو وأعد توصيله، ولاحظ إذا ظهر منفذ COM جديد في القائمة.','قم بإزالة أي أسلاك موصولة بالدبابيس 0 و 1.','جرب كابل USB آخر وتأكد من أنه كابل Data.']::text[], 'اختر منفذ COM الصحيح من Tools > Port وافصل أسلاك RX/TX أثناء الرفع.', 'تجنب استخدام المنفذ 0 و 1 في مشاريعك إلا للاتصال التسلسلي (Serial).', 'what-is-arduino', now()),
  ('led-not-working', 'iot-lab', 'troubleshooting', 'published', true, 10, 'لمبة LED لا تعمل', 'رفعت الكود بنجاح ولكن الليد لا يضيء أبداً.', ARRAY['توصيل الليد معكوس (القطبية خاطئة).','استخدام مقاومة ذات قيمة عالية جداً (مثلاً 10K أوم بدل 220 أوم).','اللوحة التجريبية (Breadboard) غير موصولة بشكل صحيح.','نسيان تعريف المنفذ كـ OUTPUT في الكود.']::text[], ARRAY['تأكد أن الطرف الطويل من الليد (الأنود) موصل بالموجب والطرف القصير بالسالب.','تأكد من قيمة المقاومة باستخدام ألوانها أو جهاز الأفوميتر.','راجع كود setup() وتأكد من وجود pinMode(pin, OUTPUT);']::text[], 'اعكس أطراف الليد وتأكد من تعريف المنفذ كـ OUTPUT.', 'دائماً اختبر الليد مع البطارية ومقاومة مباشرة قبل تركيبه في دائرة معقدة.', 'digital-output-led', now()),
  ('sensor-wrong-readings', 'iot-lab', 'troubleshooting', 'published', true, 20, 'الحساس يعطي قراءات عشوائية أو خاطئة', 'البيانات على Serial Monitor تتغير بشكل جنوني أو تعطي قيم سالبة أو صفر باستمرار.', ARRAY['التوصيل الأرضي (GND) غير مشترك.','أسلاك التوصيل غير ثابتة (Loose connections).','قراءة منفذ تناظري (A0) وهو غير موصل بشيء (Floating pin).','استخدام جهد خاطئ (3.3V بدل 5V أو العكس).']::text[], ARRAY['اضغط على الأسلاك في اللوحة التجريبية للتأكد من ثباتها.','تأكد أن جميع الأجهزة تشترك في خط GND واحد.','راجع مصدر الطاقة للحساس وتأكد أنه مطابق لمواصفاته (Datasheet).']::text[], 'ثبت الأسلاك ووحد خط الـ GND بين جميع المكونات ومصدر الطاقة.', 'استخدم أسلاك Jumper عالية الجودة وتأكد من ثباتها في الـ Breadboard.', 'analog-input-potentiometer', now()),
  ('esp32-wifi-fail', 'iot-lab', 'troubleshooting', 'published', false, 30, 'ESP32 لا يتصل بالواي فاي', 'رسالة ''Connecting to WiFi...'' تستمر بالظهور دون نجاح الاتصال.', ARRAY['اسم الشبكة (SSID) أو كلمة المرور مكتوبة بشكل خاطئ (حساسة للأحرف).','الشبكة تعمل بتردد 5GHz (معظم لوحات ESP تدعم 2.4GHz فقط).','مشكلة في إمداد الطاقة للوحة عند محاولة تشغيل راديو الواي فاي.']::text[], ARRAY['اطبع اسم الشبكة في السيريال للتحقق من عدم وجود مسافات إضافية.','تأكد من إعدادات الراوتر أنه يبث إشارة 2.4GHz.','تأكد من توصيل اللوحة بمصدر طاقة قوي (كابل USB موثوق).']::text[], 'تأكد من اختيار شبكة 2.4GHz وتصحيح كتابة الباسورد.', 'قم ببناء دالة بسيطة تقوم بإعادة تشغيل اللوحة ESP.restart() إذا لم تتصل بالشبكة خلال 10 ثوانٍ.', 'esp32-intro', now()),
  ('servo-jitter', 'iot-lab', 'troubleshooting', 'published', false, 40, 'محرك السيرفو يهتز باستمرار ولا يستقر', 'المحرك يصدر طنيناً، يهتز ذهاباً وإياباً، أو يعيد تشغيل الأردوينو بأكمله.', ARRAY['سحب تيار أعلى من قدرة الأردوينو.','استخدام دالة delay() تعطل إشارات PWM للسيرفو.','توصيل إشارة السيرفو بمنفذ لا يدعم الـ PWM (في بعض المكتبات/المتحكمات).']::text[], ARRAY['هل المشكلة تحدث عند توصيل السيرفو بـ 5V من الأردوينو؟ المحرك يسحب تياراً عالياً.','تأكد من فصل طاقة السيرفو وتوصيلها بمصدر خارجي (بطاريات) مع توحيد الـ GND.']::text[], 'استخدم مصدر طاقة خارجي (مثل 4 بطاريات AA) لتشغيل السيرفو، واربط GND البطاريات مع GND الأردوينو.', 'لا تقم بتشغيل المحركات مباشرة من دبابيس 5V في الأردوينو أونو أبداً.', 'servo-motors', now()),
  ('oled-blank', 'iot-lab', 'troubleshooting', 'published', false, 50, 'شاشة OLED لا تعرض شيئاً', 'الشاشة سوداء تماماً بالرغم من نجاح رفع الكود.', ARRAY['توصيل I2C معكوس (SDA و SCL).','عنوان I2C غير صحيح في الكود (عادة 0x3C أو 0x3D).','المكتبة غير متوافقة أو لم يتم استدعاء display.display() في نهاية الكود.']::text[], ARRAY['ارفع كود I2C Scanner لمعرفة العنوان البرمجي الفعلي للشاشة.','تأكد أن SDA موصل بـ A4 و SCL موصل بـ A5 (في الأونو).','راجع الكود للتحقق من أمر display();']::text[], 'استخدم I2C Scanner وتأكد من العناوين وتوصيل SDA/SCL بشكل صحيح.', 'احفظ كود I2C Scanner لديك واستخدمه دائماً عند توصيل أي جهاز I2C جديد.', 'displays-oled', now()),
  ('relay-not-switching', 'iot-lab', 'troubleshooting', 'published', false, 60, 'الريلاي (Relay) يسمع صوته لكن الجهاز لا يعمل', 'تسمع صوت ''طقطقة'' من الريلاي ولكن اللمبة 220 فولت أو المحرك لا يعمل.', ARRAY['الجهاز موصل في الطرف الخطأ (Normally Open مقابل Normally Closed).','الدائرة الكهربائية للحمل (AC/DC) غير مغلقة بشكل صحيح عبر الريلاي.','جهد التشغيل للملف (Coil) غير كافٍ بسبب ضعف طاقة الأردوينو.']::text[], ARRAY['تأكد من قطع سلك واحد فقط (الخط الحار/الموجب) وتوصيله عبر أطراف COM و NO.','تأكد من توصيل مصدر طاقة الجهاز المراد تشغيله بشكل صحيح.','تحقق من صوت طقطقة الريلاي، إن لم يكن مسموعاً بوضوح فالمشكلة في طاقة إشارة التحكم.']::text[], 'صل السلك المقطوع بين COM و NO (Normally Open) بدلاً من NC ليعمل عند إعطاء إشارة HIGH.', 'دائماً اختبر استجابة الريلاي بملتيميتر (استمرارية Continuity) قبل توصيل تيار متردد خطير.', 'relay-safety', now()),
  ('serial-monitor-gibberish', 'iot-lab', 'troubleshooting', 'published', false, 70, 'مراقب السيريال يعرض رموزاً غريبة', 'ظهور رموز مثل '''' في الـ Serial Monitor بدلاً من النصوص المقروءة.', ARRAY['عدم تطابق سرعة البود (Baud Rate) بين الكود والشاشة.','إعادة تشغيل اللوحة أثناء الإرسال.']::text[], ARRAY['انظر في الكود إلى الرقم داخل Serial.begin(9600);.','انظر إلى الزاوية السفلية في نافذة Serial Monitor وتأكد من الرقم المحدد.']::text[], 'اجعل الرقم في Serial Monitor مطابقاً للرقم في الكود (غالباً 9600 أو 115200).', 'استخدم سرعة 115200 كمعيار لمشاريع ESP32 و 9600 لمشاريع الأردوينو أونو الأساسية.', 'serial-monitor', now()),
  ('motor-draw-current', 'iot-lab', 'troubleshooting', 'published', false, 80, 'المحرك يسحب تياراً عالياً ويفصل الأردوينو', 'عندما يبدأ الـ DC Motor بالدوران، تنطفئ لمبات الأردوينو ويعيد التشغيل.', ARRAY['توصيل المحرك مباشرة بدبابيس الأردوينو.','استخدام بطارية 9V ضعيفة لا تتحمل السحب اللحظي للتيار (Stall Current).']::text[], ARRAY['تأكد أنك تستخدم Motor Driver (مثل L298N) للفصل بين دائرة التحكم وطاقة المحرك.','اختبر المحرك ببطاريات ليثيوم 18650 القادرة على توفير تيار عالٍ.']::text[], 'افصل المحرك عن الأردوينو واستخدم Motor Driver ومصدر طاقة منفصل.', 'قاعدة ذهبية: لا توصل أي جهاز يسحب أكثر من 20mA (مثل المحركات) مباشرة بدبابيس الأردوينو.', 'dc-motors', now()),
  ('wokwi-simulation-fails', 'iot-lab', 'troubleshooting', 'published', false, 90, 'محاكاة Wokwi لا تعمل كما هو متوقع', 'الدائرة في الموقع تبدو صحيحة والكود لا يحتوي على أخطاء ترجمة، لكن الدائرة لا تتفاعل.', ARRAY['نسيان توصيل خط الـ GND للمكونات.','خطأ مطبعي في أرقام المنافذ في ملف diagram.json أو في الكود.','لم يتم الضغط على زر Play (بدء المحاكاة).']::text[], ARRAY['اضغط على الأسلاك في Wokwi للتأكد من أنها متصلة فعلياً بالدبابيس (تضيء عند التحديد).','راجع أرقام الدبابيس في الكود وتأكد من مطابقتها للتوصيل المرئي.']::text[], 'تأكد من توصيل الـ GND، ومطابقة الأرقام في الكود للرسم البياني، ثم أعد تشغيل المحاكي.', 'استخدم ألوان أسلاك مميزة في Wokwi (أحمر للموجب، أسود للسالب) لتسهيل تتبع الأخطاء.', 'breadboard-basics', now());
