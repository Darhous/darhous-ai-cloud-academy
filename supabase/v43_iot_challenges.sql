-- ══════════════════════════════════════════════════════════════════
-- v43 — IoT Lab — Challenges (iot_challenges)
-- Run in: Supabase Dashboard → SQL Editor
-- FLAT type — the Challenge interface has no nested array-of-object
-- fields (tasks is plain string[]) — matches the ai_glossary precedent.
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS iot_challenges (
  id            TEXT        PRIMARY KEY,                 -- = existing slug (e.g. 'blind-blink') — keeps links intact
  portal_id     TEXT        NOT NULL DEFAULT 'iot-lab',
  content_type  TEXT        NOT NULL DEFAULT 'challenge',
  status        TEXT        NOT NULL DEFAULT 'published'
                            CHECK (status IN ('published','draft','archived')),
  featured      BOOLEAN     NOT NULL DEFAULT false,
  sort_order    INT         NOT NULL DEFAULT 0,
  title         TEXT        NOT NULL DEFAULT '',
  description   TEXT        NOT NULL DEFAULT '',
  level         TEXT        NOT NULL DEFAULT 'مبتدئ'
                            CHECK (level IN ('مبتدئ','متوسط','صعب')),
  xp_reward     INT         NOT NULL DEFAULT 0,
  badge_id      TEXT,
  tasks         TEXT[]      NOT NULL DEFAULT '{}',
  created_by    UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at   TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_iot_challenges_status ON iot_challenges (status);
CREATE INDEX IF NOT EXISTS idx_iot_challenges_level  ON iot_challenges (level);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_iot_challenges_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_iot_challenges_updated_at ON iot_challenges;
CREATE TRIGGER trg_iot_challenges_updated_at
  BEFORE UPDATE ON iot_challenges
  FOR EACH ROW EXECUTE FUNCTION update_iot_challenges_updated_at();

-- 3. RLS
ALTER TABLE iot_challenges ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_iot_challenges" ON iot_challenges;
CREATE POLICY "public_read_published_iot_challenges"
  ON iot_challenges FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "admin_manage_iot_challenges" ON iot_challenges;
CREATE POLICY "admin_manage_iot_challenges"
  ON iot_challenges FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Service role (API routes using createAdminClient) bypasses RLS — application
-- code verifies admin role before writes, matching the existing tables' convention.

-- ══════════════════════════════════════════════════════════════════
-- 4. Seed — the 40 existing challenges (challengesData), SAME ids, status='published'.
--    Generated programmatically from the source .ts data files (zero transcription risk).
-- ══════════════════════════════════════════════════════════════════
INSERT INTO iot_challenges (id, portal_id, content_type, status, featured, sort_order, title, description, level, xp_reward, badge_id, tasks, published_at)
VALUES
  ('blind-blink', 'iot-lab', 'challenge', 'published', true, 0, 'تحدي الوميض الأعمى', 'هل تستطيع كتابة كود وميض الليد (Blink) من الصفر دون النظر لأي مرجع أو كود سابق؟', 'مبتدئ', 50, 'first-blood', ARRAY['تعريف دبوس كمخرج في setup','تشغيل الليد في loop','الانتظار باستخدام delay','إطفاء الليد والانتظار مرة أخرى']::text[], now()),
  ('wrong-resistor', 'iot-lab', 'challenge', 'published', true, 10, 'مفتش المقاومات', 'لديك ليد يعمل בـ 2V ويسحب 20mA وبطارية 9V. ما هي قيمة المقاومة الصحيحة لكي لا يحترق؟ قم بحسابها نظرياً.', 'مبتدئ', 50, NULL, ARRAY['استخدام قانون أوم (V=IR)','طرح جهد الليد من جهد المصدر','حساب قيمة المقاومة بالأوم']::text[], now()),
  ('button-read', 'iot-lab', 'challenge', 'published', true, 20, 'مستكشف الأزرار', 'قم بتوصيل زر ضغاط بدون استخدام مقاومة خارجية، مستغلاً ميزة الأردوينو الداخلية.', 'مبتدئ', 60, NULL, ARRAY['استخدام وضع INPUT_PULLUP','قراءة حالة الزر وطباعتها في السيريال مونيتور','التأكد من أن الزر يعطي 0 عند الضغط و 1 عند الإفلات']::text[], now()),
  ('traffic-logic', 'iot-lab', 'challenge', 'published', false, 30, 'منطق إشارة المرور', 'برمج إشارة مرور متكاملة (أحمر 5 ثوانٍ، أصفر ثانيتين، أخضر 5 ثوانٍ) وتأكد أنها تعمل بشكل منطقي دون تداخل.', 'مبتدئ', 70, NULL, ARRAY['توصيل 3 ليدات بألوان مختلفة','إطفاء الألوان الأخرى عند إضاءة لون معين','ضبط التوقيت بشكل دقيق']::text[], now()),
  ('measure-distance', 'iot-lab', 'challenge', 'published', false, 40, 'الحاكم الرقمي', 'شغل حساس المسافة (Ultrasonic) واطبع المسافة بالسنتيمتر على الشاشة، وتأكد من أن القراءة لا تظهر أرقاماً سالبة.', 'مبتدئ', 80, 'sensor-novice', ARRAY['توصيل حساس HC-SR04 بشكل صحيح','استخدام دالة pulseIn','تطبيق معادلة سرعة الصوت']::text[], now()),
  ('servo-sweep-manual', 'iot-lab', 'challenge', 'published', false, 50, 'السيرفو اليدوي', 'اجعل محرك السيرفو يتحرك من زاوية 0 إلى 180 درجة، ولكن تحكم بسرعة دورانه باستخدام المقاومة المتغيرة (Potentiometer).', 'مبتدئ', 70, NULL, ARRAY['قراءة المقاومة المتغيرة','تحويل القراءة لدالة delay صغيرة داخل حلقة التكرار','تحريك السيرفو']::text[], now()),
  ('rgb-rainbow', 'iot-lab', 'challenge', 'published', false, 60, 'قوس قزح المصغر', 'استخدم לيد RGB لإنتاج ألوان (الأحمر، الأخضر، الأزرق، الأصفر، البنفسجي، السماوي، والأبيض) متتالية.', 'مبتدئ', 80, NULL, ARRAY['معرفة أي أرجل لليد هي R, G, B','استخدام digitalWrite أو analogWrite','الخلط لإنتاج الألوان الثانوية']::text[], now()),
  ('ldr-night', 'iot-lab', 'challenge', 'published', false, 70, 'حارس الليل', 'اصنع دائرة باستخدام LDR تضيء ليداً بمجرد أن تغطي الحساس بيدك، وتطفئه عند إبعاد يدك.', 'مبتدئ', 70, NULL, ARRAY['عمل مقسم جهد','قراءة التناظري وتحديد حد فاصل (Threshold)']::text[], now()),
  ('buzzer-sos', 'iot-lab', 'challenge', 'published', false, 80, 'نداء الاستغاثة', 'اجعل البازر يصدر نداء SOS بشفرة مورس (3 قصير، 3 طويل، 3 قصير).', 'مبتدئ', 60, NULL, ARRAY['استخدام دالة tone','تحديد فترات التوقف بين النبضات بدقة']::text[], now()),
  ('serial-calculator', 'iot-lab', 'challenge', 'published', false, 90, 'الآلة الحاسبة التسلسلية', 'أرسل رقمين من السيريال مونيتور مفصولين بفاصلة، واجعل الأردوينو يطبع مجموعهما.', 'مبتدئ', 90, NULL, ARRAY['استخدام Serial.readStringUntil','تفكيك النص لأرقام (parsing)']::text[], now()),
  ('relay-click', 'iot-lab', 'challenge', 'published', false, 100, 'نقرة الريلاي', 'قم بتوصيل وحدة ريلاي واجعلها تفتح وتغلق كل 3 ثوانٍ وتأكد من سماع صوت ''التيك'' الميكانيكي المميز.', 'مبتدئ', 60, NULL, ARRAY['توصيل VCC و GND و IN','برمجتها كأنها ليد عادي']::text[], now()),
  ('motor-direction', 'iot-lab', 'challenge', 'published', false, 110, 'عكس الاتجاه', 'استخدم درايفر L298N لتشغيل محرك DC لمدة ثانيتين يميناً وثانيتين يساراً.', 'مبتدئ', 80, NULL, ARRAY['توصيل الأسلاك بشكل صحيح وتوحيد الـ GND','برمجة منافذ IN1 و IN2 بشكل متعاكس']::text[], now()),
  ('lcd-hello', 'iot-lab', 'challenge', 'published', false, 120, 'تحية الشاشة', 'اطبع اسمك على السطر الأول من شاشة LCD I2C، والسطر الثاني يعرض عداد الثواني منذ تشغيل اللوحة.', 'مبتدئ', 70, NULL, ARRAY['توصيل I2C وإضافة المكتبة','استخدام دالة millis()/1000']::text[], now()),
  ('temperature-limit', 'iot-lab', 'challenge', 'published', false, 130, 'الحد الحراري', 'اقرأ الحرارة بحساس DHT11، إذا زادت عن 30 درجة أضئ ليداً أحمر، وإذا كانت أقل أضئ ليداً أخضر.', 'مبتدئ', 70, NULL, ARRAY['استخدام مكتبة DHT','وضع الشروط المنطقية']::text[], now()),
  ('button-toggle', 'iot-lab', 'challenge', 'published', false, 140, 'مفتاح التشغيل (Toggle)', 'اضغط الزر مرة فيضيء الليد ويبقى مضيئاً (لا تظل ضاغطاً). اضغطه مرة أخرى فينطفئ.', 'مبتدئ', 90, NULL, ARRAY['حفظ حالة الليد في متغير','قراءة الانتقال من LOW إلى HIGH (Edge detection)']::text[], now()),
  ('servo-by-distance', 'iot-lab', 'challenge', 'published', false, 150, 'المسافة تحرك السيرفو', 'اربط بين حساس المسافة ومحرك السيرفو. إذا كان الجسم بعيداً يكون السيرفو في زاوية 0، وكلما اقترب الجسم زادت الزاوية تدريجياً لتبلغ 180 درجة.', 'متوسط', 100, 'mechanic-mind', ARRAY['قراءة المسافة بالسنتيمتر','تحديد أقصى وأدنى مسافة مطلوبة','استخدام الدالة map() لربط نطاق المسافة بنطاق الزاوية']::text[], now()),
  ('send-temp-data', 'iot-lab', 'challenge', 'published', false, 160, 'الطقس المتسلسل', 'اقرأ بيانات حساس الحرارة والرطوبة، وقم بتنسيقها كنص JSON لطباعتها في السيريال (مثال: {"T": 25, "H": 60}).', 'متوسط', 110, NULL, ARRAY['قراءة القيم كمتغيرات float','دمج النصوص (String concatenation) أو استخدام sprintf','طباعة النص المنسق']::text[], now()),
  ('smart-irrigation-logic', 'iot-lab', 'challenge', 'published', false, 170, 'مهندس الري الذكي', 'اكتب منطق ري: لا تضخ الماء إذا كانت التربة رطبة. وإذا كانت جافة، لا تضخ الماء إذا كان الوقت ليلاً (استخدم LDR لمعرفة الليل).', 'متوسط', 120, NULL, ARRAY['قراءة حساس التربة (تناظري)','قراءة حساس الضوء LDR (تناظري)','استخدام العمليات المنطقية AND (&&) لجمع الشروط']::text[], now()),
  ('debug-robot-wiring', 'iot-lab', 'challenge', 'published', false, 180, 'المفتش الميكانيكي', 'الروبوت يدور حول نفسه بدلاً من التقدم للأمام. برمجياً كيف تحل المشكلة دون تغيير أسلاك درايفر L298N؟', 'متوسط', 130, 'debugger-pro', ARRAY['تحديد المحرك المعكوس','تغيير قيم HIGH و LOW لأحد المحركين في الكود']::text[], now()),
  ('choose-right-sensor', 'iot-lab', 'challenge', 'published', false, 190, 'مستشار الحساسات', 'تريد بناء نظام يعد الأشخاص الداخلين من الباب. أيهما تختار ولماذا؟ (Ultrasonic أم PIR أم IR Obstacle؟) قم ببرمجة الكود للحساس الفائز.', 'متوسط', 100, NULL, ARRAY['اختيار IR Obstacle كأفضل خيار لسرعة استجابته وقصر مداه','تطبيق كود لعد الأشخاص وحل مشكلة الارتداد المزدوج']::text[], now()),
  ('debounce-without-delay', 'iot-lab', 'challenge', 'published', false, 200, 'تنظيف الأزرار الاحترافي', 'طبق مفهوم الـ Debounce (تنظيف الإشارة من التذبذب) برمجياً باستخدام `millis()` بدلاً من `delay()` المبتدئين.', 'متوسط', 140, NULL, ARRAY['استخدام متغير لتخزين زمن آخر ضغطة','مقارنة الزمن المنقضي بـ 50ms']::text[], now()),
  ('fade-without-delay', 'iot-lab', 'challenge', 'published', false, 210, 'التدرج بدون بلوك', 'اجعل الليد يتدرج سطوعه (Fade) صعوداً وهبوطاً، ولكن باستخدام millis() لكي يتمكن الأردوينو من طباعة جملة للسيريال في نفس الوقت بسرعة عالية.', 'متوسط', 150, NULL, ARRAY['فهم آلية التوقيت','تحديث قيمة analogWrite في فترات منتظمة']::text[], now()),
  ('keypad-password', 'iot-lab', 'challenge', 'published', false, 220, 'كلمة المرور البسيطة', 'استخدم 4x4 Keypad، اجمع 4 أرقام من المستخدم، إذا كانت ''1234'' أضئ الليد الأخضر، وإلا أضئ الأحمر.', 'متوسط', 150, NULL, ARRAY['تخزين الأرقام المدخلة في String أو مصفوفة char','مقارنة النصوص']::text[], now()),
  ('oled-animation', 'iot-lab', 'challenge', 'published', false, 230, 'مُحرك الشاشات', 'ارسم دائرة صغيرة في وسط شاشة OLED، واجعلها تتحرك لليمين حتى تختفي من الشاشة.', 'متوسط', 140, NULL, ARRAY['استخدام مكتبة Adafruit_SSD1306','مسح الشاشة، تحديث موقع X، رسم الدائرة، ثم display() في حلقة']::text[], now()),
  ('joystick-servo', 'iot-lab', 'challenge', 'published', false, 240, 'ذراع التحكم (Pan & Tilt)', 'استخدم عصا تحكم (Joystick) للتحكم في زاوية محركين سيرفو (X و Y) لمحاكاة توجيه كاميرا.', 'متوسط', 150, NULL, ARRAY['قراءة محورين A0 و A1','استخدام map() لكل محور','تحريك السيرفو الأول والثاني']::text[], now()),
  ('shift-register-pattern', 'iot-lab', 'challenge', 'published', false, 250, 'أنماط الإزاحة', 'استخدم مسجل الإزاحة 74HC595 لإضاءة 8 ليدات بنمط ''السيارة نايت رايدر'' (نقطة حمراء تتحرك ذهاباً وإياباً).', 'متوسط', 160, NULL, ARRAY['كتابة كود يعتمد على إزاحة البتات (Bitwise Shift)','استخدام shiftOut()']::text[], now()),
  ('rfid-lock', 'iot-lab', 'challenge', 'published', false, 260, 'قفل البطاقات', 'اقرأ بطاقة RFID. إذا تطابق الـ UID مع رقم محفوظ في الكود، حرك السيرفو لفتح القفل لمدة 3 ثوانٍ.', 'متوسط', 150, NULL, ARRAY['تحويل مصفوفة بايتات הـ UID إلى نص (String)','مقارنة النصوص']::text[], now()),
  ('stepper-one-rev', 'iot-lab', 'challenge', 'published', false, 270, 'دورة واحدة بالضبط', 'اجعل محرك الخطوة (28BYJ-48) يدور دورة كاملة 360 درجة لليمين، يتوقف ثانية، ثم دورة كاملة لليسار.', 'متوسط', 130, NULL, ARRAY['حساب عدد الخطوات للدورة (2048)','إعطاء الأمر المناسب من مكتبة Stepper']::text[], now()),
  ('eeprom-counter', 'iot-lab', 'challenge', 'published', false, 280, 'عداد لا ينسى', 'في كل مرة يشتغل فيها الأردوينو، يقرأ رقماً من الذاكرة (EEPROM)، يزيد عليه 1، يحفظه مجدداً، ثم يطبعه. اطفئ اللوحة وشغلها لتتأكد.', 'متوسط', 160, NULL, ARRAY['استخدام EEPROM.read و EEPROM.write','الحذر من وضع الـ write في الـ loop!']::text[], now()),
  ('serial-menu', 'iot-lab', 'challenge', 'published', false, 290, 'قائمة السيريال التفاعلية', 'اطبع قائمة: اضغط 1 للإضاءة، 2 للإطفاء، 3 لمعرفة الحرارة. استقبل المدخل ونفذ المطلوب.', 'متوسط', 140, NULL, ARRAY['طباعة نصوص القائمة','استخدام Switch Case للتعامل مع المدخلات']::text[], now()),
  ('pid-line-follower', 'iot-lab', 'challenge', 'published', false, 300, 'سيد المسارات (PID)', 'اكتب خوارزمية PID مبسطة لروبوت تتبع الخط باستخدام مصفوفة حساسات (5 IR Sensors) لتحديد الخطأ (Error) وتعديل سرعة المحركات.', 'صعب', 250, 'algorithm-master', ARRAY['حساب الخطأ (Error) من موقع الخط','حساب P, I, D','دمج الناتج لتقليل أو زيادة سرعة PWM للمحركات']::text[], now()),
  ('esp32-web-control', 'iot-lab', 'challenge', 'published', false, 310, 'الخادم اللاسلكي السريع', 'استخدم ESP32 لاستضافة صفحة ويب فيها زر. عند الضغط عليه، يتغير لون صفحة الويب وتضيء لمبة متصلة باللوحة دون إعادة تحميل الصفحة (استخدم AJAX/Fetch).', 'صعب', 200, NULL, ARRAY['تجهيز WiFi Access Point أو Client','كتابة مسار (Route) في C++','كتابة جافاسكربت بسيطة']::text[], now()),
  ('multitasking-os', 'iot-lab', 'challenge', 'published', false, 320, 'نظام التشغيل المصغر', 'أردوينو أونو واحد ينفذ 3 مهام في وقت واحد دون توقف: يومض ليد كل ثانية، يقرأ حساس مسافة كل 500ms، وينتظر ضغطة زر لتشغيل سيرفو. يمنع استخدام delay() تماماً.', 'صعب', 300, 'architecture-god', ARRAY['بناء هيكلة تعتمد على millis()','تنظيف الكود باستخدام الدوال (Functions) أو الـ Classes']::text[], now()),
  ('api-json-parser', 'iot-lab', 'challenge', 'published', false, 330, 'محلل البيانات السحابية', 'الـ ESP32 يجلب بيانات الطقس من موقع OpenWeatherMap بصيغة JSON. قم باستخراج درجة الحرارة واسم المدينة باستخدام مكتبة ArduinoJson واطبعها.', 'صعب', 220, NULL, ARRAY['عمل اتصال HTTP GET صحيح','تحديد سعة الـ Buffer للـ JSON','استخراج الحقول المطلوبة بدقة']::text[], now()),
  ('ota-firmware', 'iot-lab', 'challenge', 'published', false, 340, 'المبرمج اللاسلكي', 'جهز لوحة ESP32 بكود يدعم OTA، ثم قم بتحديث الكود برمجياً عبر الواي فاي دون لمس اللوحة.', 'صعب', 200, NULL, ARRAY['استخدام مكتبة ArduinoOTA','وضع דالة handle في الـ loop','معرفة مكان اللوحة في الشبكة']::text[], now()),
  ('i2c-two-boards', 'iot-lab', 'challenge', 'published', false, 350, 'حوار اللوحات', 'اربط لوحتي أردوينو أونو معاً عبر سلكي I2C. الأول (Master) يقرأ زر ضغط، ويرسل أمراً للثاني (Slave) ليضيء ลيداً.', 'صعب', 240, NULL, ARRAY['تحديد عناوين I2C للـ Slave','استخدام Wire.onRequest و Wire.onReceive','إرسال البيانات من الـ Master']::text[], now()),
  ('nrf24-chat', 'iot-lab', 'challenge', 'published', false, 360, 'الراديو المشفر', 'استخدم قطعتي NRF24L01 لعمل نظام ''ووكي توكي'' نصي. ما تكتبه في السيريال للوحة الأولى، يُطبع في السيريال للوحة الثانية عن بعد.', 'صعب', 250, NULL, ARRAY['ضبط عناوين الأنابيب (Pipes)','التأكد من طاقة 3.3V مستقرة','استخدام دوال write و read اللاسلكية']::text[], now()),
  ('ds3231-alarm', 'iot-lab', 'challenge', 'published', false, 370, 'المنبه الدقيق', 'استخدم وحدة RTC DS3231 واضبط لها منبهاً (Alarm) يطلق البازر في تمام الساعة 7:00 صباحاً من كل يوم.', 'صعب', 210, NULL, ARRAY['قراءة الوقت من الـ RTC','برمجة شروط التطابق','توفير بطارية للـ RTC']::text[], now()),
  ('matrix-animation', 'iot-lab', 'challenge', 'published', false, 380, 'رسام المصفوفات', 'استخدم شاشة 8x8 LED Matrix مع MAX7219 لرسم وجه يبتسم، ثم يتغير لوجه حزين كل ثانيتين.', 'صعب', 230, NULL, ARRAY['تحويل الرسمة لأكواد Hex (مصفوفة بايتات)','إرسال البيانات عبر بروتوكول SPI للرقاقة']::text[], now()),
  ('memory-game', 'iot-lab', 'challenge', 'published', false, 390, 'لعبة الذاكرة (سيمون يقول)', 'لعبة تعتمد على 4 ليدات و 4 أزرار. الأردوينو يعرض تسلسلاً ضوئياً عشوائياً، وعليك إعادة ضغطه بالترتيب الصحيح. اللعبة تزيد الصعوبة في كل جولة.', 'صعب', 300, 'game-developer', ARRAY['تخزين التسلسل في مصفوفة عشوائية','إدارة جولات اللعبة','التحقق من صحة الضغطات في الوقت الفعلي','إنذار الفوز أو الخسارة']::text[], now());
