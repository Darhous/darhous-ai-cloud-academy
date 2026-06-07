-- ══════════════════════════════════════════════════════════════════
-- v42 — IoT Lab — Lessons (iot_lessons)
-- Run in: Supabase Dashboard → SQL Editor
-- FLAT type — the Lesson interface has no nested array-of-object fields
-- (content/codeExample/etc are single strings, componentsNeeded is string[]).
-- English fields are OPTIONAL (nullable) — pages fall back to Arabic when absent,
-- matching the "// English fields — optional, fall back to Arabic" convention
-- in the Lesson interface itself.
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS iot_lessons (
  id                  TEXT        PRIMARY KEY,                 -- = existing slug (e.g. 'what-is-arduino') — keeps links intact
  portal_id           TEXT        NOT NULL DEFAULT 'iot-lab',
  content_type        TEXT        NOT NULL DEFAULT 'lesson',
  status              TEXT        NOT NULL DEFAULT 'published'
                                  CHECK (status IN ('published','draft','archived')),
  featured            BOOLEAN     NOT NULL DEFAULT false,
  sort_order          INT         NOT NULL DEFAULT 0,
  title               TEXT        NOT NULL DEFAULT '',
  category            TEXT        NOT NULL DEFAULT '',
  duration            TEXT        NOT NULL DEFAULT '',
  description         TEXT        NOT NULL DEFAULT '',
  content             TEXT        NOT NULL DEFAULT '',
  components_needed   TEXT[]      NOT NULL DEFAULT '{}',
  wiring_notes        TEXT        NOT NULL DEFAULT '',
  code_example        TEXT        NOT NULL DEFAULT '',
  common_mistakes     TEXT        NOT NULL DEFAULT '',
  simulator_link      TEXT,
  next_lesson_id      TEXT,
  -- Optional English fields (fall back to Arabic when absent)
  title_en            TEXT,
  category_en         TEXT,
  description_en      TEXT,
  content_en          TEXT,
  wiring_notes_en     TEXT,
  common_mistakes_en  TEXT,
  created_by          UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at         TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_iot_lessons_status   ON iot_lessons (status);
CREATE INDEX IF NOT EXISTS idx_iot_lessons_category ON iot_lessons (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_iot_lessons_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_iot_lessons_updated_at ON iot_lessons;
CREATE TRIGGER trg_iot_lessons_updated_at
  BEFORE UPDATE ON iot_lessons
  FOR EACH ROW EXECUTE FUNCTION update_iot_lessons_updated_at();

-- 3. RLS
ALTER TABLE iot_lessons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_iot_lessons" ON iot_lessons;
CREATE POLICY "public_read_published_iot_lessons"
  ON iot_lessons FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "admin_manage_iot_lessons" ON iot_lessons;
CREATE POLICY "admin_manage_iot_lessons"
  ON iot_lessons FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Service role (API routes using createAdminClient) bypasses RLS — application
-- code verifies admin role before writes, matching the existing tables' convention.

-- ══════════════════════════════════════════════════════════════════
-- 4. Seed — the 59 existing lessons (lessonsDataPart1..4), SAME ids, status='published'.
--    Generated programmatically from the source .ts data files (zero transcription risk).
-- ══════════════════════════════════════════════════════════════════
INSERT INTO iot_lessons (id, portal_id, content_type, status, featured, sort_order, title, category, duration, description, content, components_needed, wiring_notes, code_example, common_mistakes, simulator_link, next_lesson_id, title_en, category_en, description_en, content_en, wiring_notes_en, common_mistakes_en, published_at)
VALUES
  ('what-is-arduino', 'iot-lab', 'lesson', 'published', true, 0, 'ما هو الأردوينو؟ (المفهوم البسيط)', 'أساسيات الأردوينو', '10 دقائق', 'فهم الفرق بين الكمبيوتر العادي والمتحكم الدقيق من خلال تشبيه مبسط.', 'الأردوينو هو ببساطة (عقل إلكتروني) صغير. تخيل أنك مدير مصنع (المبرمج)، والأردوينو هو العامل المطيع الذي يقف على خط الإنتاج. تعطيه ورقة تعليمات (الكود)، وهو يقوم بتنفيذها حرفياً وبسرعة هائلة. الأردوينو ليس كمبيوتراً لتشغيل الألعاب أو تصفح الإنترنت، بل هو (متحكم دقيق - Microcontroller) صُمم ليقرأ البيانات من العالم المادي (مثلاً: حرارة، ضغط زر) ويتخذ قراراً فورياً (مثلاً: تشغيل مروحة، إضاءة لمبة).', ARRAY['لوحة Arduino Uno','كابل USB الطابعة']::text[], 'قم بتوصيل الكابل باللوحة ثم بالكمبيوتر. ستلاحظ إضاءة لمبة صغيرة خضراء (ON) تدل على وصول الطاقة.', '// فهم المبادئ لا يحتاج لكود', 'الاعتقاد بأن الأردوينو يمكنه تشغيل نظام ويندوز أو تخزين ملفات ضخمة. ذاكرته صغيرة جداً (32 كيلوبايت) وتكفي فقط لتنفيذ أوامر برمجية نصية.', NULL, 'arduino-ide-setup', 'What Is Arduino? (The Simple Concept)', 'Arduino Basics', 'Understanding the difference between a regular computer and a microcontroller through a simple analogy.', 'Arduino is simply a small ''electronic brain''. Imagine you are a factory manager (the programmer), and Arduino is the obedient worker on the production line. You hand it an instruction sheet (the code), and it executes those instructions literally at incredible speed. Arduino is not a computer for running games or browsing the internet — it is a Microcontroller designed to read data from the physical world (e.g., temperature, button press) and make instant decisions (e.g., run a fan, light an LED).', 'Connect the cable to the board and then to your computer. You will notice a small green LED (ON) lighting up, indicating power is connected.', 'Believing that Arduino can run Windows or store large files. Its memory is very small (32 KB) and is only enough to execute text-based programming commands.', now()),
  ('arduino-ide-setup', 'iot-lab', 'lesson', 'published', true, 10, 'تجهيز بيئة العمل (Arduino IDE)', 'أساسيات الأردوينو', '15 دقيقة', 'كيف تنزل البرنامج وتتأكد من تعريف اللوحة بنجاح لتكون جاهزاً لكتابة أول كود.', 'لكي نكتب ورقة التعليمات للأردوينو، نحتاج لبرنامج مخصص يُسمى (Arduino IDE) وهو بيئة التطوير المتكاملة. 
1. حمل البرنامج من arduino.cc.
2. بعد التثبيت، افتح البرنامج. 
3. اذهب إلى قائمة Tools > Board واختر Arduino Uno. 
4. من نفس القائمة اختر Port وحدد المنفذ الذي ظهر (غالباً COM3 في الويندوز أو /dev/ttyUSB0 في الماك/لينكس).
الآن أنت جاهز للتحدث مع اللوحة.', ARRAY['كمبيوتر','كابل USB','Arduino Uno']::text[], 'تأكد من توصيل الكابل مباشرة بالكمبيوتر وليس عبر موزع USB (Hub) رخيص لتجنب مشاكل الطاقة.', 'void setup() {
  // يوضع هنا الكود الذي ينفذ مرة واحدة
}

void loop() {
  // يوضع هنا الكود الذي يتكرر باستمرار
}', 'نسيان اختيار المنفذ (Port) الصحيح، مما يؤدي لظهور خطأ Upload Error عند محاولة رفع الكود.', NULL, 'digital-output-led', 'Setting Up Your Workspace (Arduino IDE)', 'Arduino Basics', 'How to download the IDE software and verify your board is recognized, so you''re ready to write your first code.', 'To write instruction sheets for Arduino, we need a dedicated program called the Arduino IDE (Integrated Development Environment).
1. Download it from arduino.cc.
2. After installation, open the program.
3. Go to Tools > Board and select Arduino Uno.
4. From the same menu, select Port and choose the port that appears (usually COM3 on Windows or /dev/ttyUSB0 on Mac/Linux).
You are now ready to communicate with the board.', 'Make sure to connect the cable directly to the computer and not through a cheap USB hub to avoid power issues.', 'Forgetting to select the correct Port, which causes an ''Upload Error'' when trying to upload code.', now()),
  ('digital-output-led', 'iot-lab', 'lesson', 'published', true, 20, 'المخرج الرقمي: وميض الليد (Blink)', 'Digital I/O', '20 دقيقة', 'البرنامج الأيقوني ''Hello World'' في عالم الهاردوير. اجعل الليد المدمج يومض.', 'الدوال الأساسية في الأردوينو تنقسم لقسمين: 
- `setup()`: أوامر تنفذ مرة واحدة عند تشغيل اللوحة، تُستخدم للتهيئة (مثل تحديد الدبوس كمخرج).
- `loop()`: أوامر تتكرر إلى الأبد (مثل تشغيل الليد ثم إطفائه).
المخرج الرقمي يعني حالتين فقط: إما 5V (HIGH) أو 0V (LOW).', ARRAY['Arduino Uno']::text[], 'في هذا الدرس لن نحتاج لمكونات خارجية، سنستخدم الليد المدمج في الأردوينو والمتصل داخلياً بالدبوس رقم 13.', 'void setup() {
  pinMode(13, OUTPUT); // تهيئة المنفذ 13 كمخرج
}

void loop() {
  digitalWrite(13, HIGH); // تشغيل الليد (5 فولت)
  delay(1000);            // انتظار ثانية
  digitalWrite(13, LOW);  // إطفاء الليد (0 فولت)
  delay(1000);            // انتظار ثانية
}', 'نسيان الفاصلة المنقوطة (;) في نهاية كل سطر برمجي، مما يتسبب في خطأ ترجمة (Compilation error).', 'https://wokwi.com/projects/305567166302257730', 'breadboard-basics', 'Digital Output: LED Blink', 'Digital I/O', 'The iconic ''Hello World'' of the hardware world. Make the built-in LED blink.', 'Arduino''s core functions are split into two parts:
- setup(): Commands that run once when the board powers on, used for initialization (like setting a pin as output).
- loop(): Commands that repeat forever (like turning an LED on then off).
Digital output means only two states: either 5V (HIGH) or 0V (LOW).', 'In this lesson we need no external components. We''ll use the built-in LED on Arduino which is internally connected to pin 13.', 'Forgetting the semicolon (;) at the end of every programming line, causing a Compilation error.', now()),
  ('breadboard-basics', 'iot-lab', 'lesson', 'published', false, 30, 'فهم اللوحة التجريبية (Breadboard)', 'أساسيات التوصيل', '15 دقيقة', 'كيف توصل المكونات ببعضها بدون لحام.', 'اللوحة التجريبية مليئة بالثقوب. الثقوب الجانبية (بجوار الخطوط الحمراء والزرقاء) متصلة ببعضها طولياً، وتُستخدم لتوزيع الطاقة (الموجب والسالب) على كامل اللوحة. الثقوب في المنتصف متصلة ببعضها أفقياً (في صفوف قصيرة من 5 ثقوب) وتُستخدم لربط المكونات معاً. تذكر أن المنتصف مفصول بـ ''خندق'' يفصل الجانب الأيمن عن الأيسر.', ARRAY['Breadboard','أسلاك توصيل (Jumpers)','LED','مقاومة 220 أوم']::text[], 'لتشغيل ليد خارجي، صل الموجب (الأنود - الطرف الطويل) بـ 5V عبر مقاومة، والسالب (الكاثود - الطرف القصير) بـ GND.', '// فهم التوصيل النظري قبل البرمجة', 'توصيل طرفي المكون (كالليد) في نفس الصف الأفقي، مما يسبب قصر كهربائي بين طرفيه ولن يمر التيار عبره.', NULL, 'ohms-law', 'Understanding the Breadboard', 'Wiring Basics', 'How to connect components together without soldering.', 'The breadboard is full of holes. The side holes (next to the red and blue lines) are connected lengthwise and are used to distribute power (positive and negative) across the entire board. The holes in the middle are connected horizontally in short rows of 5 holes and are used to connect components together. Remember that the middle is separated by a ''ravine'' that divides the left side from the right.', 'To power an external LED, connect the positive lead (Anode — the long leg) to 5V through a resistor, and the negative lead (Cathode — the short leg) to GND.', 'Inserting both legs of a component (like an LED) into the same horizontal row, creating a short circuit between the two legs with no current flowing through it.', now()),
  ('ohms-law', 'iot-lab', 'lesson', 'published', false, 40, 'قانون أوم (لماذا نحتاج المقاومة؟)', 'أساسيات الإلكترونيات', '25 دقيقة', 'حماية الليدات من الاحتراق بفهم بسيط للتيار والجهد.', 'الجهد (الفولت) هو ''الضغط'' الذي يدفع الكهرباء. التيار (الأمبير) هو كمية الكهرباء المارة. الأردوينو يعطي 5V، بينما الليد الأحمر الصغير يحتاج 2V فقط، وسيحاول سحب تيار هائل يؤدي لاحتراقه فورا. المقاومة تعمل كـ ''مطب سرعة'' يقلل التيار ويستهلك الجهد الزائد. قانون أوم: V = I * R.', ARRAY['LED','مقاومات مختلفة القيم (220، 1K، 10K)','بطارية أو أردوينو']::text[], 'جرب توصيل الليد بمقاومة 220 أوم ولاحظ الإضاءة، ثم استبدلها بـ 10K أوم ولاحظ كيف أصبح الليد باهتاً جداً.', '// تجربة فيزيائية لا تحتاج لكود', 'توصيل الليد بدون مقاومة بالـ 5V مباشرة، سيومض الليد بسرعة ثم يحترق ويصدر رائحة تلف.', NULL, 'digital-input-button', 'Ohm''s Law (Why Do We Need Resistors?)', 'Electronics Basics', 'Protecting LEDs from burning out with a simple understanding of current and voltage.', 'Voltage (Volts) is the ''pressure'' that pushes electricity. Current (Amps) is the amount of electricity flowing. Arduino provides 5V, while a small red LED only needs 2V and will try to draw a massive current that will burn it instantly. A resistor acts as a ''speed bump'' that reduces current and consumes the excess voltage. Ohm''s Law: V = I × R.', 'Try connecting an LED with a 220 Ohm resistor and observe the brightness, then swap it for a 10K Ohm resistor and notice how the LED becomes very dim.', 'Connecting an LED directly to 5V without a resistor — the LED will flash briefly then burn out, emitting a burning smell.', now()),
  ('digital-input-button', 'iot-lab', 'lesson', 'published', false, 50, 'المدخل الرقمي: قراءة الأزرار', 'Digital I/O', '25 دقيقة', 'كيف يعرف الأردوينو أنك ضغطت على الزر؟', 'لنجعل الأردوينو يشعر بالبيئة، نستخدم digitalRead(). الأزرار تعمل كمفاتيح تقطع أو توصل التيار. لكن إذا كان الزر غير مضغوط، هل الدبوس يقرأ 0 أم 1؟ الإجابة: سيقرأ قيماً عشوائية لأنه ''عائم'' ويتأثر بالكهرباء الساكنة بالهواء. لحل هذا، نستخدم مقاومة سحب (Pull-down) لربطه بـ GND ليكون 0 باستقرار، أو نسهل الأمر ونستخدم المقاومة المدمجة داخل الأردوينو باستخدام وضع INPUT_PULLUP.', ARRAY['Arduino Uno','زر ضغاط (Push Button)','أسلاك']::text[], 'صل أحد طرفي الزر بـ GND والطرف الآخر بالدبوس 2. سنستخدم INPUT_PULLUP داخلياً.', 'void setup() {
  pinMode(2, INPUT_PULLUP);
  pinMode(13, OUTPUT);
}
void loop() {
  // الزر يعطي LOW عند الضغط لأنه موصل بالـ GND
  if (digitalRead(2) == LOW) {
    digitalWrite(13, HIGH);
  } else {
    digitalWrite(13, LOW);
  }
}', 'نسيان استخدام PULLUP مما يجعل الليد يومض عشوائياً بمجرد اقتراب يدك من الزر.', 'https://wokwi.com/projects/305569485123224130', 'analog-output-pwm', 'Digital Input: Reading Buttons', 'Digital I/O', 'How does Arduino know when you pressed the button?', 'To make Arduino sense the environment, we use digitalRead(). Buttons act as switches that break or complete a circuit. But if the button is not pressed, does the pin read 0 or 1? The answer: it will read random values because it is ''floating'' and is affected by static electricity in the air. To fix this, we use a pull-down resistor to connect it to GND so it reads 0 stably, or we simplify things by using the built-in resistor inside Arduino with INPUT_PULLUP mode.', 'Connect one side of the button to GND and the other to pin 2. We''ll use INPUT_PULLUP internally.', 'Forgetting to use PULLUP, causing the LED to blink randomly just by moving your hand near the button.', now()),
  ('analog-output-pwm', 'iot-lab', 'lesson', 'published', false, 60, 'المخرج التناظري المزيف (PWM)', 'Analog I/O', '20 دقيقة', 'الأردوينو لا يمكنه إخراج 3 فولت، إما 0 أو 5. فكيف نتحكم في إضاءة الليد تدريجياً؟', 'تقنية تعديل عرض النبضة (PWM) هي خدعة بصرية. الأردوينو يفتح ويغلق 5V بسرعة هائلة (مئات المرات في الثانية). إذا كان مفتوحاً نصف الوقت ومغلقاً نصف الوقت، العين ترى الليد يضيء بنصف قوته (متوسط 2.5V). الدبابيس التي تدعم هذه الخدعة بجوارها علامة المد (~).', ARRAY['Arduino Uno','LED','مقاومة 220 أوم']::text[], 'صل الليد بالدبوس 9 (أو 3، 5، 6، 10، 11) عبر مقاومة.', 'void setup() {
  pinMode(9, OUTPUT);
}
void loop() {
  // تدرج الإضاءة من 0 (مطفأ) إلى 255 (أقصى إضاءة)
  for(int i = 0; i <= 255; i++) {
    analogWrite(9, i);
    delay(10);
  }
}', 'استخدام analogWrite() على دبوس لا يحتوي على علامة (~)، الليد لن يتدرج بل سيُضاء وينطفئ فجأة.', NULL, 'analog-input-potentiometer', 'Fake Analog Output (PWM)', 'Analog I/O', 'Arduino can''t output 3 volts — only 0 or 5. So how do we gradually control LED brightness?', 'Pulse Width Modulation (PWM) is an optical trick. Arduino turns 5V on and off at an extremely fast rate (hundreds of times per second). If it''s on half the time and off half the time, the eye perceives the LED as glowing at half power (an average of 2.5V). Pins that support this trick have a tilde (~) symbol next to them.', 'Connect the LED to pin 9 (or 3, 5, 6, 10, 11) through a resistor.', 'Using analogWrite() on a pin without the (~) symbol — the LED won''t dim gradually but will suddenly turn on and off.', now()),
  ('analog-input-potentiometer', 'iot-lab', 'lesson', 'published', false, 70, 'المدخل التناظري: المقاومة المتغيرة', 'Analog I/O', '25 دقيقة', 'قراءة قيم متدرجة بدلاً من 0 و 1 فقط.', 'الأردوينو يمتلك محول إشارات تناظرية إلى رقمية (ADC) بدقة 10 بت. هذا يعني أنه يقرأ الجهد من 0V إلى 5V ويحوله إلى رقم دقيق بين 0 و 1023. الدبابيس A0 إلى A5 مخصصة لذلك. البوتنشيومتر (المقاومة المتغيرة) تعمل كمقسم جهد، كلما أدرت المفتاح، تغير الجهد الداخل للدبوس.', ARRAY['Arduino Uno','مقاومة متغيرة (Potentiometer)']::text[], 'الطرف الأيمن بـ 5V، الأيسر بـ GND، والطرف الأوسط بدبوس A0.', 'void setup() {
  Serial.begin(9600);
}
void loop() {
  int sensorValue = analogRead(A0);
  Serial.println(sensorValue); // يعرض القيم من 0 لـ 1023
  delay(100);
}', 'توصيل الطرف الأوسط بالـ 5V والطرف الجانبي بـ A0 سيؤدي إما لعدم تغير القراءة أو قصر كهربائي عند لف المفتاح للآخر.', 'https://wokwi.com/projects/305569894747341378', 'serial-monitor', 'Analog Input: The Variable Resistor (Potentiometer)', 'Analog I/O', 'Reading gradual values instead of just 0 and 1.', 'Arduino has an Analog-to-Digital Converter (ADC) with 10-bit precision. This means it reads voltage from 0V to 5V and converts it to a precise number between 0 and 1023. Pins A0 to A5 are dedicated for this purpose. The potentiometer (variable resistor) acts as a voltage divider — as you turn the knob, the voltage entering the pin changes.', 'Right leg to 5V, left leg to GND, and the middle leg to pin A0.', 'Connecting the middle leg to 5V and a side leg to A0, which will either result in a fixed reading or a short circuit when the knob is turned all the way.', now()),
  ('serial-monitor', 'iot-lab', 'lesson', 'published', false, 80, 'مراقب السيريال (Serial Monitor)', 'التواصل والتشخيص', '15 دقيقة', 'كيف تجعل الأردوينو يتحدث إليك ويرسل رسائل نصية لشاشة الكمبيوتر.', 'السيريال مونيتور هي نافذتك لداخل عقل الأردوينو. بدونها، أنت تطير أعمى ولا تعرف ماذا تقرأ الحساسات. دالة `Serial.begin(9600)` تهيئ الاتصال بسرعة 9600 بت في الثانية. `Serial.print()` تطبع النص، و `Serial.println()` تطبعه وتنزل سطراً جديداً. يمكن استخدامها لاكتشاف الأخطاء (Debugging).', ARRAY['Arduino Uno']::text[], 'يعمل عبر كابل الـ USB مباشرة (الدبابيس 0 و 1 تُستخدم للاتصال التسلسلي داخلياً).', 'int counter = 0;
void setup() {
  Serial.begin(9600);
  Serial.println("Hello, IoT Lab!");
}
void loop() {
  counter++;
  Serial.print("Counter is: ");
  Serial.println(counter);
  delay(1000);
}', 'سرعة البود (Baud Rate) في أسفل نافذة السيريال مونيتور لا تتطابق مع الرقم في Serial.begin()، مما يظهر نصوصاً هيروغليفية غريبة.', NULL, 'ultrasonic-sensor', 'Serial Monitor (Communicating with Arduino)', 'Communication & Debugging', 'How to make Arduino talk to you and send text messages to your computer screen.', 'The Serial Monitor is your window into Arduino''s mind. Without it, you''re flying blind and don''t know what the sensors are reading. Serial.begin(9600) initializes the connection at 9600 bits per second. Serial.print() prints text, and Serial.println() prints and moves to a new line. It can be used for debugging.', 'Works directly through the USB cable (pins 0 and 1 are used internally for serial communication).', 'The Baud Rate at the bottom of the Serial Monitor window doesn''t match the number in Serial.begin(), causing strange hieroglyphic characters to appear.', now()),
  ('ultrasonic-sensor', 'iot-lab', 'lesson', 'published', false, 90, 'حساس المسافة (Ultrasonic HC-SR04)', 'الحساسات', '30 دقيقة', 'قياس المسافة بالسنتيمتر كما تفعل الخفافيش.', 'حساس الموجات فوق الصوتية يحتوي على ''سماعة'' ترسل نبضة صوتية (Trig)، و ''ميكروفون'' يستمع للصدى المرتد (Echo). سرعة الصوت معروفة (340 متر/ثانية). من خلال حساب الزمن الذي استغرقته النبضة للذهاب والعودة، يقسم الأردوينو الزمن على 2 ليحسب المسافة بدقة جيدة.', ARRAY['Arduino Uno','HC-SR04','أسلاك']::text[], 'VCC بـ 5V، GND بـ GND، Trig بدبوس 9، Echo بدبوس 10.', 'const int trigPin = 9;
const int echoPin = 10;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}
void loop() {
  digitalWrite(trigPin, LOW); delayMicroseconds(2);
  digitalWrite(trigPin, HIGH); delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  long duration = pulseIn(echoPin, HIGH);
  int distance = duration * 0.034 / 2;
  Serial.print("Distance: "); Serial.println(distance);
  delay(500);
}', 'توصيل Trig كمدخل و Echo كمخرج بالخطأ، مما يجعل القراءة دائماً 0.', 'https://wokwi.com/projects/299313271173677576', 'dht11-basics', 'Distance Sensor (Ultrasonic HC-SR04)', 'Sensors', 'Measuring distance in centimeters, just like bats do.', 'The ultrasonic sensor contains a ''speaker'' that sends a sound pulse (Trig) and a ''microphone'' that listens for the returning echo (Echo). The speed of sound is known (340 m/s). By measuring the time the pulse takes to travel out and come back, Arduino divides by 2 to calculate the distance accurately.', 'VCC to 5V, GND to GND, Trig to pin 9, Echo to pin 10.', 'Connecting Trig as input and Echo as output by mistake, causing the reading to always be 0.', now()),
  ('dht11-basics', 'iot-lab', 'lesson', 'published', false, 100, 'حساس الحرارة والرطوبة (DHT11)', 'الحساسات', '25 دقيقة', 'كيف تعرف الجو المحيط بالغرفة؟ مقدمة لاستخدام المكتبات الجاهزة.', 'بعض الحساسات ترسل بياناتها كإشارات تماثلية بسيطة، لكن DHT11 يرسل حزمة بيانات رقمية معقدة جداً. بدلاً من كتابة 100 سطر لفك تشفيرها، نستخدم (المكتبات). المكتبة هي كود كتبه مبرمجون آخرون يختصر علينا العمل. يجب تنزيل مكتبة DHT من مدير المكتبات في Arduino IDE.', ARRAY['Arduino Uno','حساس DHT11','مقاومة 10K']::text[], 'VCC بـ 5V. طرف البيانات بالدبوس 2 مع مقاومة سحب 10K لـ VCC (بعض موديلات DHT11 تأتي بـ 3 أطراف والمقاومة مدمجة). GND بـ GND.', '#include <DHT.h>
#define DHTPIN 2
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}
void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  if (isnan(h) || isnan(t)) { Serial.println("Failed"); return; }
  Serial.print("Temp: "); Serial.print(t);
  Serial.print(" C, Humidity: "); Serial.println(h);
  delay(2000);
}', 'محاولة قراءة الحساس بسرعة كبيرة، DHT11 يحتاج على الأقل ثانيتين بين كل قراءة وأخرى.', 'https://wokwi.com/projects/305572629618131522', 'servo-motors', 'Temperature & Humidity Sensor (DHT11)', 'Sensors', 'How to sense the surrounding room environment. An introduction to using pre-built libraries.', 'Some sensors send their data as simple analog signals, but DHT11 sends a very complex digital data packet. Instead of writing 100 lines to decode it, we use Libraries. A library is code written by other programmers that saves us work. You need to download the DHT library from the Library Manager in the Arduino IDE.', 'VCC to 5V. Data pin to pin 2 with a 10K pull-up resistor to VCC (some DHT11 modules come with 3 pins and a built-in resistor). GND to GND.', 'Trying to read the sensor too frequently. DHT11 needs at least 2 seconds between each reading.', now()),
  ('servo-motors', 'iot-lab', 'lesson', 'published', false, 110, 'محركات السيرفو (تحكم دقيق بالزوايا)', 'المحركات', '25 دقيقة', 'كيف تحرك ذراعاً آلياً بدقة للزاوية 90 أو 180 درجة.', 'السيرفو ليس محركاً يدور بلا توقف. بل يحتوي على محرك DC، صندوق تروس (Gears)، ودائرة تحكم تقرأ إشارات الـ PWM من الأردوينو وتترجمها لزاوية دقيقة بين 0 و 180 درجة. نستخدم مكتبة `<Servo.h>` المدمجة للتحكم به بسهولة عبر دالة `write(angle)`.', ARRAY['Arduino Uno','محرك Servo SG90 صغير']::text[], 'السلك البني/الأسود بـ GND، الأحمر بـ 5V، البرتقالي/الأصفر بدبوس يدعم PWM (مثل دبوس 9).', '#include <Servo.h>
Servo myServo;

void setup() {
  myServo.attach(9); // ربط السيرفو بالدبوس 9
}
void loop() {
  myServo.write(0); delay(1000);
  myServo.write(90); delay(1000);
  myServo.write(180); delay(1000);
}', 'استخدام سيرفو كبير (مثل MG996R) وتشغيله من طاقة الأردوينو مباشرة، سيسبب انقطاع الطاقة وإعادة تشغيل الأردوينو بشكل مستمر. يجب استخدام بطارية خارجية للسيرفو الكبير.', 'https://wokwi.com/projects/305570087786021442', 'dc-motors', 'Servo Motors (Precise Angle Control)', 'Motors', 'How to move a robotic arm precisely to 90 or 180 degrees.', 'A servo is not a motor that spins continuously. It contains a DC motor, a gearbox, and a control circuit that reads PWM signals from Arduino and translates them into a precise angle between 0 and 180 degrees. We use the built-in <Servo.h> library to control it easily using the write(angle) function.', 'Brown/black wire to GND, red to 5V, orange/yellow to a PWM-capable pin (like pin 9).', 'Using a large servo (like MG996R) powered directly from Arduino, which will cause voltage drops and continuous Arduino resets. An external power source must be used for large servos.', now()),
  ('dc-motors', 'iot-lab', 'lesson', 'published', false, 120, 'محركات التيار المستمر (DC Motors) والدرايفر', 'المحركات', '30 دقيقة', 'كيف تصنع سيارة روبوت ولماذا نحتاج L298N.', 'محرك DC يدور باستمرار، ويعكس اتجاهه إذا عكست أقطاب البطارية. **قاعدة ذهبية:** لا توصل محرك DC بدبابيس الأردوينو أبداً! الأردوينو يعطي 20mA كحد أقصى، والمحرك يسحب 500mA أو أكثر مما يحرق الدبوس فورا. الحل هو استخدام ''متحكم محركات'' (Motor Driver) مثل L298N، والذي يتلقى إشارات تحكم ضعيفة من الأردوينو ويفتح بوابة لتيار البطارية القوي للمحرك.', ARRAY['Arduino Uno','Motor Driver L298N','DC Motor','بطارية 9V أو 18650']::text[], 'بطارية 9V تدخل لـ 12V في L298N. نوصل GND الـ L298N بـ GND الأردوينو (مهم جداً). أقطاب المحرك بـ OUT1 و OUT2. دبابيس التحكم IN1 و IN2 لدبابيس 8 و 9 في الأردوينو.', 'const int in1 = 8;
const int in2 = 9;
void setup() {
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
}
void loop() {
  digitalWrite(in1, HIGH); digitalWrite(in2, LOW); // دوران يمين
  delay(2000);
  digitalWrite(in1, LOW); digitalWrite(in2, LOW); // توقف
  delay(1000);
  digitalWrite(in1, LOW); digitalWrite(in2, HIGH); // دوران يسار
  delay(2000);
}', 'عدم ربط سلك الـ GND بين L298N والأردوينو. بدون هذا السلك المشترك، إشارات التحكم لن تُفهم وستدور المحركات بشكل عشوائي أو لا تدور.', NULL, 'lcd-i2c-basics', 'DC Motors & Motor Driver', 'Motors', 'How to build a robot car and why we need the L298N.', 'A DC motor spins continuously and reverses direction when you reverse battery polarity. Golden rule: Never connect a DC motor directly to Arduino pins! Arduino can supply max 20mA, while a motor may draw 500mA or more, instantly burning the pin. The solution is to use a Motor Driver like L298N, which receives weak control signals from Arduino and opens a gate for the strong battery current to flow to the motor.', '9V battery goes into the 12V terminal of L298N. Connect L298N''s GND to Arduino''s GND (very important). Motor wires to OUT1 and OUT2. Control pins IN1 and IN2 to Arduino pins 8 and 9.', 'Not connecting the shared GND wire between L298N and Arduino. Without this common ground, the control signals won''t be understood and motors will spin randomly or not at all.', now()),
  ('lcd-i2c-basics', 'iot-lab', 'lesson', 'published', false, 130, 'شاشات الكريستال السائل (LCD I2C)', 'الشاشات', '25 دقيقة', 'طباعة الرسائل بوضوح باستخدام 4 أسلاك فقط.', 'شاشات الـ LCD التقليدية تتطلب 6 أسلاك بيانات، مما يستنزف منافذ الأردوينو. لذلك نستخدم موديول I2C الملحوم خلف الشاشة، والذي يختزل الأسلاك إلى 4 فقط (طاقتين، وسلكين للبيانات SDA و SCL). بروتوكول I2C يسمح بتوصيل عدة أجهزة على نفس السلكين طالما أن لكل جهاز ''عنوان'' مختلف (Address).', ARRAY['Arduino Uno','شاشة LCD 16x2 مع موديول I2C']::text[], 'VCC بـ 5V، GND بـ GND. سلك SDA يُوصل بدبوس A4 في الأونو، و SCL بدبوس A5.', '#include <Wire.h>
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 16, 2); // العنوان غالباً 0x27 أو 0x3F

void setup() {
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0); // العمود 0، الصف 0
  lcd.print("Darhous IoT Lab");
}
void loop() {
  lcd.setCursor(0, 1);
  lcd.print(millis() / 1000);
  delay(1000);
}', 'شاشة مضيئة كلياً أو أزرار مربعات سوداء ولكن لا نص؟ جرب تدوير المسمار النحاسي الصغير (Potentiometer) خلف الموديول لضبط التباين (Contrast) بمفك.', NULL, 'relay-safety', 'LCD Display (I2C)', 'Displays', 'Printing clear messages using only 4 wires.', 'Traditional LCD screens require 6 data wires, consuming Arduino''s ports. So we use an I2C module soldered to the back of the screen, which reduces the wires to just 4 (2 power, and 2 data wires: SDA and SCL). The I2C protocol allows multiple devices to share the same two wires as long as each device has a unique ''address''.', 'VCC to 5V, GND to GND. SDA wire connects to pin A4 on the Uno, and SCL to pin A5.', 'Screen is fully lit or shows black squares but no text? Try turning the small brass screw (Potentiometer) on the back of the module with a screwdriver to adjust the contrast.', now()),
  ('relay-safety', 'iot-lab', 'lesson', 'published', false, 140, 'الريلاي والتحكم بجهد 220 فولت', 'التحكم العالي والسلامة', '30 دقيقة', 'كيف تشغل مصباح المنزل عبر الأردوينو بأمان.', 'الريلاي (Relay) هو مفتاح ميكانيكي يتم تشغيله كهرومغناطيسياً. يمر تيار 5V من الأردوينو ليجذب قطعة معدنية داخل الريلاي ''تك''، فتغلق دائرة تيار عالٍ 220V من الجهة الأخرى. الأردوينو معزول تماماً. **تحذير صارم:** الكهرباء المنزلية مميتة! لا تعمل على هذا المشروع والكهرباء موصولة، استخدم شريطاً لاصقاً لعزل الأسلاك المكشوفة وتأكد من قطع سلك ''الحار'' (Live) فقط ليمر عبر الريلاي.', ARRAY['Arduino Uno','Relay Module 1 Channel','مصباح أو مروحة صغيرة']::text[], 'طاقة الريلاي: VCC و GND و IN للأردوينو. جهة الجهد العالي: السلك المقطوع يوصل بطرفي COM (المشترك) و NO (Normally Open).', 'const int relayPin = 7;
void setup() {
  pinMode(relayPin, OUTPUT);
}
void loop() {
  digitalWrite(relayPin, HIGH); // بعض موديلات الريلاي تعمل بـ LOW لتشغيلها
  delay(5000);
  digitalWrite(relayPin, LOW);
  delay(5000);
}', 'توصيل السلكين (الحار والبارد معاً) داخل الريلاي، هذا سيسبب قصر كهربائي هائل وانفجار عند تشغيل الريلاي. الريلاي يقطع سلكاً واحداً فقط كما يفعل مفتاح الإضاءة في الجدار.', NULL, 'esp32-intro', 'Relay & 220V Control', 'High-Voltage Control & Safety', 'How to switch a home light bulb through Arduino safely.', 'A relay is a mechanically operated switch activated electromagnetically. A 5V current from Arduino passes through to attract a metal piece inside the relay with a ''click'', which closes a 220V high-current circuit on the other side. Arduino is completely isolated. STRICT WARNING: Household electricity is lethal! Never work on this project while the power is connected. Use tape to insulate exposed wires and ensure you cut only the ''live'' wire to pass through the relay.', 'Relay power: VCC, GND, and IN to Arduino. High-voltage side: the cut wire connects to COM (Common) and NO (Normally Open) terminals.', 'Connecting both wires (live and neutral) inside the relay — this will cause a massive short circuit and explosion when the relay triggers. The relay cuts only ONE wire, just like a regular wall light switch.', now()),
  ('esp32-intro', 'iot-lab', 'lesson', 'published', false, 150, 'مقدمة إلى ESP32 و الواي فاي', 'إنترنت الأشياء (IoT)', '30 دقيقة', 'انقل مشاريعك للإنترنت. ما هو الـ ESP32 وكيف نجهزه في بيئة الأردوينو؟', 'لوحة ESP32 أقوى بـ 10 أضعاف من الأردوينو أونو، تحتوي على بلوتوث وواي فاي مدمج، وتعمل بجهد 3.3V. لبرمجتها بـ Arduino IDE، نحتاج لإضافة رابط مدير اللوحات (Board Manager URL) الخاص بـ Espressif، ثم تثبيت حزمة ESP32. بعد ذلك يمكننا استخدام مكتبة WiFi.h للاتصال بالشبكة.', ARRAY['لوحة ESP32','كابل Micro-USB أو Type-C']::text[], 'اللوحة تعمل בـ 3.3 فولت. لا تصل أبداً أي مخرج 5 فولت من مستشعر عادي مباشرة إلى دبابيس ESP32 دون استخدام مقسم جهد (Voltage Divider).', '#include <WiFi.h>
const char* ssid = "Your_SSID";
const char* password = "Your_PASSWORD";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500); Serial.print(".");
  }
  Serial.println("\nConnected!");
  Serial.print("IP: "); Serial.println(WiFi.localIP());
}
void loop() {}', 'اختيار بورد خاطئ (مثل Arduino Uno) عند الرفع لـ ESP32. يجب اختيار ''DOIT ESP32 DEVKIT V1'' أو الموديل المطابق لدوحتك.', 'https://wokwi.com/projects/new/esp32', 'http-apis', 'Introduction to ESP32 and Wi-Fi', 'Internet of Things (IoT)', 'Take your projects online. What is ESP32 and how do we set it up in the Arduino IDE?', 'The ESP32 board is 10x more powerful than Arduino Uno, has built-in Bluetooth and Wi-Fi, and operates at 3.3V. To program it with Arduino IDE, we need to add the Espressif board manager URL, then install the ESP32 package. After that we can use the WiFi.h library to connect to a network.', 'The board operates at 3.3V. Never directly connect a 5V sensor output to ESP32 pins without using a voltage divider.', 'Selecting the wrong board (like Arduino Uno) when uploading to ESP32. You must select ''DOIT ESP32 DEVKIT V1'' or the model matching your board.', now()),
  ('http-apis', 'iot-lab', 'lesson', 'published', false, 160, 'جلب بيانات من الإنترنت (HTTP GET)', 'إنترنت الأشياء (IoT)', '25 دقيقة', 'كيف تجعل اللوحة تسأل سيرفراً عن الطقس أو الوقت عبر واجهات برمجة التطبيقات (API).', 'اللوحة المتصلة بالواي فاي يمكنها التصرف كمتصفح ويب (Client). يمكننا إرسال طلب HTTP GET لموقع يعيد لنا البيانات. المواقع غالباً ترد بصيغة JSON، وهي صيغة نصية مهيكلة. مثلاً يمكننا طلب وقت الساعة الحالية من خادم وقت عالمي أو حالة الطقس من موقع OpenWeatherMap.', ARRAY['لوحة ESP32']::text[], 'مجرد توصيل USB، لا مكونات خارجية مطلوبة.', '#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "Your_SSID";
const char* password = "Your_PASSWORD";
const char* url = "http://worldtimeapi.org/api/timezone/Asia/Riyadh";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);
}
void loop() {
  if(WiFi.status() == WL_CONNECTED){
    HTTPClient http;
    http.begin(url);
    int httpCode = http.GET();
    if (httpCode > 0) {
      String payload = http.getString();
      Serial.println(payload);
    }
    http.end();
  }
  delay(10000);
}', 'محاولة الاتصال بمواقع HTTPS (المشفرة) باستخدام كود HTTP عادي. لـ HTTPS يجب إرفاق الشهادة الأمنية (Certificate) أو ضبط Client على Insecure.', NULL, 'mqtt-basics', 'Fetching Data from the Internet (HTTP GET)', 'Internet of Things (IoT)', 'How to make your board ask a server for weather data or time via APIs.', 'A Wi-Fi-connected board can act as a web browser (Client). We can send an HTTP GET request to a website that returns data to us. Websites typically respond in JSON format, which is a structured text format. For example, we can request the current time from a world time server or weather data from OpenWeatherMap.', 'Just a USB connection — no external components required.', 'Trying to connect to HTTPS (encrypted) sites using plain HTTP code. For HTTPS you must include the security certificate or set the client to Insecure mode.', now()),
  ('mqtt-basics', 'iot-lab', 'lesson', 'published', false, 170, 'بروتوكول MQTT (الخفيف والسريع)', 'إنترنت الأشياء (IoT)', '30 دقيقة', 'البروتوكول المفضل للـ IoT. إرسال واستقبال البيانات كرسائل نصية قصيرة جداً.', 'بدلاً من أن يسأل ESP32 الخادم باستمرار ''هل هناك جديد؟'' (HTTP)، يستخدم MQTT أسلوب النشر والاشتراك (Publish/Subscribe). يوجد وسيط (Broker). الأجهزة (Clients) تنشر رسائل على (Topic) معين، وأجهزة أخرى تشترك في هذا הـ Topic لتصلها الرسائل فوراً. هذا يوفر البطارية ويجعل الاستجابة أسرع بكثير للتحكم بالروبوتات والمنازل الذكية.', ARRAY['ESP32','مكتبة PubSubClient']::text[], 'بدون مكونات، مجرد تجربة برمجة.', '// الكود طويل، يتطلب تضمين مكتبة PubSubClient
// يجب تحديد سيرفر البروكر مثل broker.mqtt-dashboard.com
// استخدم دالة client.publish("darhous/temp", "25.5"); للنشر
// ودالة client.subscribe("darhous/led"); للاستقبال.', 'استخدام Topic عام جداً (مثل ''test'') على بروكر عام مجاني، مما يجعلك تستقبل رسائل عشوائية من آلاف المستخدمين حول العالم الذين يختبرون أكوادهم.', NULL, 'esp32-web-server', 'MQTT Protocol (Lightweight & Fast)', 'Internet of Things (IoT)', 'The preferred IoT protocol. Send and receive data as very short text messages.', 'Instead of ESP32 constantly asking the server ''Is there anything new?'' (HTTP), MQTT uses a Publish/Subscribe model. A Broker server exists in the middle. Devices (Clients) publish messages to a specific Topic, and other devices subscribe to that Topic to receive messages instantly. This saves battery and makes response much faster for robotics and smart home control.', 'No components needed — this is a pure programming exercise.', 'Using a very generic Topic (like ''test'') on a free public broker, causing you to receive random messages from thousands of users worldwide who are testing their code.', now()),
  ('esp32-web-server', 'iot-lab', 'lesson', 'published', false, 180, 'إنشاء صفحة تحكم (Web Server)', 'إنترنت الأشياء (IoT)', '35 دقيقة', 'استضف صفحة ويب داخل ESP32 للتحكم فيها من جوالك.', 'اللوحة يمكنها العمل كخادم (Server). يمكنك كتابة كود HTML بسيط يتم إرساله إلى أي متصفح يطلب عنوان الـ IP الخاص باللوحة. عندما يضغط المستخدم على زر في الصفحة، المتصفح يرسل طلب GET يعود للوحة التي بدورها تشغل ليد أو ريلاي.', ARRAY['ESP32','LED']::text[], 'صل الليد بالدبوس 2.', '// يتطلب استخدام مكتبة WebServer.h
// نعرّف مسارات مثل server.on("/led/on", []() {
//   digitalWrite(2, HIGH);
//   server.send(200, "text/plain", "LED IS ON");
// });', 'كتابة كود HTML ضخم داخل الأردوينو كمتغير String، مما يستهلك الذاكرة ويجعل الكود غير قابل للقراءة. الأفضل استخدام SPIFFS لحفظ الملفات.', NULL, 'reading-schematics', 'Creating a Control Panel (Web Server)', 'Internet of Things (IoT)', 'Host a web page inside the ESP32 to control it from your phone.', 'The board can act as a server. You can write simple HTML code that gets sent to any browser that requests the board''s IP address. When the user presses a button on the page, the browser sends a GET request back to the board, which in turn turns on an LED or relay.', 'Connect the LED to pin 2.', 'Writing large HTML code inside Arduino as a String variable, consuming memory and making the code unreadable. It''s better to use SPIFFS to store files.', now()),
  ('reading-schematics', 'iot-lab', 'lesson', 'published', false, 190, 'قراءة المخططات الإلكترونية (Schematics)', 'أساسيات الإلكترونيات', '20 دقيقة', 'كيف تقرأ رموز الخرائط الإلكترونية لتستغني عن الصور التوضيحية.', 'رسوم البريد بورد (مثل Fritzing) جيدة للمبتدئين، لكن المهندسين يستخدمون الرموز القياسية. الخط المتعرج يعني مقاومة، المثلث ذو الخط العمودي يعني دايود، الخطان المتوازيان أحدهما أطول يعني بطارية. قراءة المخطط ضرورية إذا أردت تصميم الدائرة المطبوعة الخاصة بك (PCB).', ARRAY['ورقة وقلم للتطبيق النظري']::text[], 'ارسم دائرة بطارية ومفتاح وليد ومقاومة باستخدام الرموز القياسية لتتدرب.', '// درس نظري', 'الخلط بين عقد التوصيل (نقطة سوداء حيث تتقاطع الخطوط) وبين الخطوط المتقاطعة بدون نقطة (لا يوجد اتصال بينها).', NULL, 'micropython-intro', 'Reading Electronic Schematics', 'Electronics Basics', 'How to read circuit diagram symbols to move beyond pictorial diagrams.', 'Breadboard pictures (like Fritzing diagrams) are good for beginners, but engineers use standard schematic symbols. A zigzag line means a resistor, a triangle with a vertical line means a diode, two parallel lines one longer means a battery. Reading schematics is essential if you want to design your own Printed Circuit Board (PCB).', 'Draw a circuit with a battery, switch, LED, and resistor using standard symbols to practice.', 'Confusing junction nodes (black dots where lines intersect, meaning they ARE connected) with crossing lines without a dot (meaning they are NOT connected).', now()),
  ('micropython-intro', 'iot-lab', 'lesson', 'published', false, 200, 'مقدمة في مايكروبايثون (MicroPython)', 'برمجة متقدمة', '25 دقيقة', 'اكتب كود بايثون نظيف وسهل على المتحكمات الدقيقة.', 'بايثون أسهل في القراءة من C++. نسخة المايكرو صُممت خصيصاً للموارد المحدودة لتعمل على ESP32 و Raspberry Pi Pico. بدلاً من الانتظار لترجمة الكود (Compile)، بايثون مفسرة (Interpreted) وتعمل فوراً عبر واجهة REPL النصية. يجب تنزيل برنامج الثابت (Firmware) الخاص بمايكروبايثون وحرقه على اللوحة باستخدام Thonny IDE.', ARRAY['ESP32 أو Pico','كمبيوتر ببرنامج Thonny']::text[], 'توصيل USB عادي.', 'from machine import Pin
from time import sleep

led = Pin(2, Pin.OUT)

while True:
    led.value(not led.value()) # عكس الحالة
    sleep(1)', 'محاولة استخدام مكتبات بايثون الضخمة (مثل Numpy أو Pandas)، المايكروبايثون تدعم فقط المكتبات الخفيفة المخصصة لها.', NULL, 'robot-chassis-wiring', 'Introduction to MicroPython', 'Advanced Programming', 'Write clean and easy Python code on microcontrollers.', 'Python is easier to read than C++. The Micro version was designed specifically for limited resources to run on ESP32 and Raspberry Pi Pico. Instead of waiting for code to compile, Python is interpreted and runs immediately via a text REPL interface. You must download the MicroPython firmware and flash it to the board using Thonny IDE.', 'Standard USB connection.', 'Trying to use large Python libraries (like Numpy or Pandas). MicroPython only supports lightweight libraries specifically designed for it.', now()),
  ('robot-chassis-wiring', 'iot-lab', 'lesson', 'published', false, 210, 'تجميع شاسيه الروبوت (Robot Chassis)', 'الروبوتات', '40 دقيقة', 'تركيب الهيكل الميكانيكي وتوزيع البطاريات والمحركات.', 'روبوتك يحتاج إلى هيكل صلب. أهم نقطة هي توزيع الوزن والتخطيط للأسلاك (Cable Management). نستخدم درايفر L298N لتشغيل العجلتين. بطاريات ليثيوم 18650 (جهد كلي 7.4V إلى 8.4V) موصلة بمنفذ 12V في L298N. ثم نأخذ سلكاً من منفذ 5V الموجود على L298N لتشغيل الأردوينو! هكذا ببطارية واحدة نشغل النظام كله.', ARRAY['شاسيه 2WD','L298N','Arduino Uno','حامل بطاريات 18650']::text[], 'حذارِ من عكس قطبية البطاريات الموصلة لـ L298N، سيحترق فوراً. ولا تنسَ ربط الـ GND بين L298N والأردوينو.', '// تجميع ميكانيكي وكهربائي (شاهد كود درس DC Motors للحركة الأساسية)', 'وضع الحساسات أو الأردوينو فوق درايفر L298N مباشرة؛ المشتت الحراري للدرايفر يسخن بشدة وقد يذيب الأسلاك أو البلاستيك.', NULL, 'line-follower-logic', 'Assembling the Robot Chassis', 'Robotics', 'Building the mechanical frame and organizing batteries and motors.', 'Your robot needs a solid frame. The most important thing is weight distribution and cable management. We use an L298N driver to power the two wheels. Lithium 18650 batteries (total voltage 7.4V to 8.4V) are connected to the 12V terminal on L298N. Then we take a wire from the 5V output on L298N to power the Arduino! With one battery pack, we power the entire system.', 'Beware of reversing the battery polarity on L298N — it will burn instantly. And don''t forget to connect the GND between L298N and Arduino.', 'Placing sensors or Arduino directly on top of the L298N driver — the driver''s heat sink gets very hot and may melt wires or plastic.', now()),
  ('line-follower-logic', 'iot-lab', 'lesson', 'published', false, 220, 'منطق روبوت تتبع الخط', 'الروبوتات', '30 دقيقة', 'كيف يفكر الروبوت للبقاء على الخط الأسود؟', 'نستخدم حساسين للأشعة تحت الحمراء (IR) موجهين للأرض. 
- إذا اكتشف كلا الحساسين اللون الأبيض: الروبوت يتحرك للأمام.
- إذا اكتشف الحساس الأيمن خطاً أسوداً: يعني أن الروبوت انحرف لليسار، يجب أن يلتف لليمين.
- إذا اكتشف الحساس الأيسر الخط: يلتف لليسار.
هذا منطق بسيط جداً يسمى (Bang-Bang Control).', ARRAY['سيارة روبوت','حساسين IR (TCRT5000)']::text[], 'الحساسات تعطي قراءة رقمية (0 للأبيض، 1 للأسود أو العكس حسب اللوحة) وتوصل بمنافذ ديجيتال.', 'int leftIR = 4; int rightIR = 5;
// ... داخل الـ loop ...
int L = digitalRead(leftIR);
int R = digitalRead(rightIR);
if(L == 0 && R == 0) { moveForward(); }
else if(L == 1 && R == 0) { turnLeft(); }
else if(L == 0 && R == 1) { turnRight(); }', 'عدم معايرة الحساسات. حساسات IR تحتوي على مقاومة متغيرة صغيرة (مسمار) يجب إدارته حتى يتعرف الحساس على اللون الأسود بدقة في إضاءة الغرفة الحالية.', NULL, 'rfid-basics', 'Line Follower Robot Logic', 'Robotics', 'How does the robot think to stay on the black line?', 'We use two Infrared (IR) sensors aimed at the ground.
- If both sensors detect white: the robot moves forward.
- If the right sensor detects a black line: the robot has drifted left, it must turn right.
- If the left sensor detects the line: it turns left.
This simple logic is called Bang-Bang Control.', 'The sensors give a digital reading (0 for white, 1 for black or vice versa depending on the module) and connect to digital pins.', 'Not calibrating the sensors. IR sensors have a small variable resistor (trim pot) that must be adjusted until the sensor correctly identifies black in the current room lighting.', now()),
  ('rfid-basics', 'iot-lab', 'lesson', 'published', false, 230, 'البطاقات الذكية (RFID MFRC522)', 'أنظمة الأمان والمنزل الذكي', '30 دقيقة', 'قراءة الميداليات وبطاقات الأبواب الذكية.', 'موديول MFRC522 يعمل على تردد 13.56MHz ويقرأ البطاقات التي لا تحتوي على بطاريات بداخلها (Passive Tags) باستخدام الحث الكهرومغناطيسي. يستخدم بروتوكول SPI للاتصال، والذي يتطلب أسلاكاً محددة (MISO, MOSI, SCK, CS). لكل بطاقة رقم تعريفي فريد (UID) مبرمج من المصنع لا يمكن تغييره بسهولة.', ARRAY['Arduino Uno','RC522 RFID Module','بطاقة وميدالية']::text[], 'يعمل בـ 3.3 فولت وليس 5 فولت (5 فولت سيتلفه). SCK בـ 13، MISO בـ 12، MOSI בـ 11. SDA(SS) בـ 10. RST בـ 9.', '#include <SPI.h>
#include <MFRC522.h>
MFRC522 mfrc522(10, 9);
void setup() {
  Serial.begin(9600); SPI.begin(); mfrc522.PCD_Init();
}
void loop() {
  if ( ! mfrc522.PICC_IsNewCardPresent() || ! mfrc522.PICC_ReadCardSerial() ) return;
  String uid = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    uid += String(mfrc522.uid.uidByte[i], HEX);
  }
  Serial.println(uid);
  mfrc522.PICC_HaltA();
}', 'توصيل سلك الـ 3.3V الخاص بالموديول بدبوس الـ 5V في الأردوينو.', NULL, 'keypad-input', 'Smart Cards (RFID MFRC522)', 'Security & Smart Home', 'Reading keyfobs and smart door cards.', 'The MFRC522 module operates at 13.56MHz and reads passive tags (cards with no internal battery) using electromagnetic induction. It uses the SPI protocol for communication, which requires specific wires (MISO, MOSI, SCK, CS). Each card has a unique identification number (UID) programmed at the factory that cannot be easily changed.', 'Operates at 3.3V, NOT 5V (5V will damage it). SCK to 13, MISO to 12, MOSI to 11, SDA(SS) to 10, RST to 9.', 'Connecting the module''s 3.3V power wire to the 5V pin on Arduino.', now()),
  ('keypad-input', 'iot-lab', 'lesson', 'published', false, 240, 'لوحة الأرقام الغشائية (Membrane Keypad 4x4)', 'الإدخال والتحكم', '25 دقيقة', 'كيف تقرأ 16 زراً باستخدام 8 أسلاك فقط.', 'بدلاً من تخصيص 16 منفذاً للأزرار، الكيباد يعتمد على شبكة متقاطعة من (الصفوف والأعمدة - Matrix). مكتبة `<Keypad.h>` تقوم بمسح سريع: ترسل إشارة للصف الأول وتقرأ كل الأعمدة، ثم الصف الثاني وهكذا. هذا يوفر نصف منافذ الأردوينو.', ARRAY['Arduino Uno','4x4 Keypad']::text[], 'قم بتوصيل الأسلاك الثمانية بترتيب متتالٍ لمنافذ رقمية (مثلاً من 2 إلى 9).', '#include <Keypad.h>
const byte ROWS = 4; const byte COLS = 4;
char keys[ROWS][COLS] = {
  {''1'',''2'',''3'',''A''}, {''4'',''5'',''6'',''B''}, {''7'',''8'',''9'',''C''}, {''*'',''0'',''#'',''D''}
};
byte rowPins[ROWS] = {9, 8, 7, 6};
byte colPins[COLS] = {5, 4, 3, 2};
Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

void setup(){ Serial.begin(9600); }
void loop(){
  char key = keypad.getKey();
  if (key){ Serial.println(key); }
}', 'إذا كانت الأرقام تظهر معكوسة (تضغط 1 يظهر 4)، اعكس ترتيب مصفوفة الدبابيس (rowPins) أو (colPins).', NULL, 'oled-graphics', 'Membrane Keypad (4×4)', 'Input & Control', 'How to read 16 buttons using only 8 wires.', 'Instead of dedicating 16 pins for buttons, the keypad uses a matrix of Rows and Columns. The <Keypad.h> library performs a fast scan: it sends a signal to the first row and reads all columns, then the second row, and so on. This saves half of Arduino''s pins.', 'Connect the eight wires in sequential order to digital pins (e.g., pins 2 through 9).', 'If numbers appear mirrored (pressing 1 shows 4), reverse the order of the rowPins or colPins arrays.', now()),
  ('oled-graphics', 'iot-lab', 'lesson', 'published', false, 250, 'شاشات OLED (الرسومات والخطوط)', 'الشاشات', '30 دقيقة', 'ارسم دوائر، خطوطاً، وأيقونات دقيقة جداً.', 'شاشات OLED لا تحتاج لإضاءة خلفية (كل بكسل يضيء ذاتياً)، مما يعطي لوناً أسود حقيقياً ويوفر الطاقة. الأكثر شيوعاً هي مقاس 0.96 بوصة وتعمل ببروتوكول I2C. نستخدم مكتبة `Adafruit_SSD1306` للرسم بيكسل ببيكسل، مما يسمح بعرض رسومات ونصوص بأحجام مختلفة بخلاف شاشات LCD المحدودة بالخانات.', ARRAY['Arduino Uno','OLED Display 0.96 I2C']::text[], 'مثل الـ LCD، VCC لـ 5V أو 3.3V. SDA لـ A4 و SCL لـ A5.', '#include <Adafruit_SSD1306.h>
Adafruit_SSD1306 display(128, 64, &Wire, -1);

void setup() {
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.setTextSize(2);
  display.setTextColor(WHITE);
  display.setCursor(10, 20);
  display.println("IoT Lab");
  display.display(); // هذا السطر ضروري لإظهار التعديلات
}
void loop() {}', 'نسيان أمر `display.display();` في نهاية الكود، مما يترك الشاشة سوداء بالرغم من صحة الكود والتوصيل.', NULL, 'industrial-sensors-intro', 'OLED Display (Graphics & Fonts)', 'Displays', 'Draw circles, lines, and tiny icons.', 'OLED screens don''t need a backlight (each pixel lights itself), giving true black and saving power. The most common is 0.96-inch operating via I2C. We use the Adafruit_SSD1306 library to draw pixel by pixel, allowing graphics and text at various sizes unlike the limited character-based LCD.', 'Like the LCD: VCC to 5V or 3.3V. SDA to A4 and SCL to A5.', 'Forgetting the display.display() command at the end of your code, leaving the screen black even though the code and wiring are correct.', now()),
  ('industrial-sensors-intro', 'iot-lab', 'lesson', 'published', false, 260, 'مقدمة للحساسات الصناعية والموثوقية', 'الأنظمة الصناعية (IIoT)', '20 دقيقة', 'لماذا لا يُستخدم الأردوينو العادي وحساس DHT11 في المصانع؟', 'بيئة المصانع مليئة بـ ''الضوضاء الكهرومغناطيسية'' الناتجة من المحركات الضخمة. هذه الضوضاء تشوش إشارات 5V الضعيفة للأردوينو، وقد تؤدي لإعادة تشغيل اللوحة (Reset) عشوائياً. الأنظمة الصناعية تستخدم حساسات تعتمد على تيار 4-20mA، وبروتوكولات قوية مثل Modbus، ومعالجات معزولة بصرياً (Opto-isolators) لتحمل بيئات العمل القاسية المستمرة لسنوات.', ARRAY['نظري']::text[], 'للأمان في بيئة شبه صناعية، استخدم دائماً Optocouplers لعزل دبابيس الدخل والخرج للمتحكم.', '// درس نظري', 'الاعتماد على أسلاك Jumper العادية لربط حساس يبعد 5 أمتار. طول السلك يزيد مقاومته ويعمل كـ (أنتينا) يلتقط التشويش. يجب استخدام أسلاك معزولة (Shielded Cable).', NULL, 'project-architecture', 'Introduction to Industrial Sensors & Reliability', 'Industrial Systems (IIoT)', 'Why isn''t a regular Arduino and DHT11 sensor used in factories?', 'Factory environments are full of electromagnetic noise from massive motors. This noise disrupts Arduino''s weak 5V signals and may cause random board resets. Industrial systems use sensors based on 4–20mA current loops, robust protocols like Modbus, and optically isolated processors to withstand harsh environments continuously for years.', 'For safety in a semi-industrial environment, always use Optocouplers to isolate the input and output pins of the controller.', 'Relying on regular jumper wires to connect a sensor 5 meters away. Long wires increase resistance and act as an antenna, picking up noise. Shielded cables must be used.', now()),
  ('project-architecture', 'iot-lab', 'lesson', 'published', false, 270, 'هيكلة المشاريع الكبرى (Architecture)', 'مهارات متقدمة', '25 دقيقة', 'كيف تبني كوداً يحتوي على مئات الأسطر دون أن تعم الفوضى.', 'عند دمج واي فاي، حساس مسافة، شاشة OLED، وريلاي في نفس الكود، فإن وضع كل شيء داخل `loop()` سيجعل الكود بطيئاً ومعقداً. يجب تقسيم الكود إلى ''دوال'' (Functions) مستقلة: `readSensors()`, `updateDisplay()`, `sendToCloud()`. وأيضاً استخدام تقنية `millis()` بدلاً من `delay()` لضمان عدم توقف المعالج عن العمل.', '{}', '', 'unsigned long lastTime = 0;
void setup() { }
void loop() {
  if(millis() - lastTime > 1000) {
    lastTime = millis();
    readSensors();
  }
  checkButtons(); // يعمل باستمرار بدون بلوك
}
void readSensors() { /* كود الحساسات */ }
void checkButtons() { /* كود الأزرار */ }', 'استخدام delay(5000) لقراءة الحساس كل 5 ثوانٍ، مما يعني أن اللوحة لن تستجيب لأي ضغطة زر أو رسالة واي فاي خلال هذه الـ 5 ثوانٍ.', NULL, 'debugging-advanced', 'Structuring Large Projects (Architecture)', 'Advanced Skills', 'How to build code with hundreds of lines without everything becoming chaos.', 'When combining Wi-Fi, a distance sensor, an OLED display, and a relay in the same code, putting everything inside loop() will make the code slow and complex. You must split the code into independent ''Functions'': readSensors(), updateDisplay(), sendToCloud(). Also use the millis() technique instead of delay() to ensure the processor never stops working.', NULL, 'Using delay(5000) to read a sensor every 5 seconds — this means the board won''t respond to any button press or Wi-Fi message for those 5 seconds.', now()),
  ('debugging-advanced', 'iot-lab', 'lesson', 'published', false, 280, 'تقنيات تنقيح الأخطاء (Debugging)', 'مهارات متقدمة', '20 دقيقة', 'ماذا تفعل عندما لا يعمل المشروع ولا يوجد خطأ في الترجمة؟', 'أصعب أنواع الأخطاء هي ''الأخطاء المنطقية'' (Logic Errors). 
الخطوة الأولى: بسّط الدائرة. افصل كل المكونات وجرب المكون المشتبه به بكود مستقل.
الخطوة الثانية: الطباعة التتبعية (Print Debugging). ضع `Serial.println("I am here 1");` في أماكن مختلفة من الكود لمعرفة أين يعلق البرنامج (Hangs).', '{}', 'استخدم المالتيميتر (الأفوميتر) دائماً للتحقق من وصول الجهد (5V و GND) فعلياً لأرجل الحساس قبل افتراض أن الحساس معطل.', '// استخدام الماكرو لتسهيل التتبع
#define DEBUG 1
#if DEBUG
  #define debugPrint(x) Serial.println(x)
#else
  #define debugPrint(x)
#endif

void loop() {
  debugPrint("Reading sensor...");
  // ... كود الحساس ...
}', 'تخمين مكان العطل وتغيير أسطر الكود عشوائياً. اتبع منهجاً علمياً باستبعاد الأسباب واحداً تلو الآخر.', NULL, '', 'Debugging Techniques', 'Advanced Skills', 'What to do when your project doesn''t work and there are no compilation errors.', 'The hardest type of errors are Logic Errors.
Step 1: Simplify the circuit. Disconnect all components and test the suspected component with standalone code.
Step 2: Print Debugging. Place Serial.println("I am here 1"); at different places in the code to find where the program hangs.', 'Always use a multimeter to verify that voltage (5V and GND) is actually reaching the sensor''s legs before assuming the sensor is faulty.', 'Guessing where the fault is and randomly changing lines of code. Follow a scientific approach by eliminating causes one by one.', now()),
  ('ldr-sensor-basics', 'iot-lab', 'lesson', 'published', false, 290, 'حساس الضوء (LDR)', 'الحساسات التناظرية', '20 دقيقة', 'كيف تجعل دائرتك تستشعر الظلام لتشغيل الإضاءة تلقائياً.', 'المقاومة المعتمدة على الضوء (LDR) تقل مقاومتها كلما زاد الضوء الساقط عليها. بقراءتها باستخدام منفذ تناظري (A0) كجزء من مقسم جهد (Voltage Divider) مع مقاومة ثابتة 10K، يمكننا الحصول على قيمة رقمية تعبر عن شدة الإضاءة (0 للظلام الدامس، و1023 للإضاءة الساطعة جداً).', ARRAY['Arduino Uno','حساس LDR','مقاومة 10K أوم']::text[], 'صل LDR بين 5V و A0، وصل مقاومة 10K بين A0 و GND. هذا هو مقسم الجهد.', 'const int ldrPin = A0;
const int ledPin = 13;
void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
}
void loop() {
  int lightLevel = analogRead(ldrPin);
  Serial.println(lightLevel);
  if (lightLevel < 300) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
  delay(500);
}', 'توصيل LDR مباشرة بين 5V و A0 بدون مقاومة 10K نحو الأرضي. النتيجة ستكون قراءة 1023 ثابتة دائماً لأن الجهد لن ينقسم.', 'https://wokwi.com/projects/305569894747341378', 'mq-gas-sensor', 'Light Sensor (LDR)', 'Analog Sensors', 'How to make your circuit sense darkness to automatically turn on lighting.', 'A Light Dependent Resistor (LDR) decreases its resistance as more light falls on it. By reading it using an analog pin (A0) as part of a voltage divider with a fixed 10K resistor, we get a numeric value representing light intensity (0 for complete darkness, 1023 for very bright light).', 'Connect LDR between 5V and A0, and connect a 10K resistor between A0 and GND. This is the voltage divider.', 'Connecting the LDR directly between 5V and A0 without the 10K resistor to ground — the result will always be a fixed reading of 1023 since the voltage won''t divide.', now()),
  ('mq-gas-sensor', 'iot-lab', 'lesson', 'published', false, 300, 'حساسات الغاز والدخان (MQ Series)', 'حساسات السلامة', '25 دقيقة', 'اكتشاف الغازات السامة أو القابلة للاشتعال كجزء من نظام إنذار.', 'سلسلة MQ (مثل MQ-2 للدخان والغازات المتفجرة، MQ-7 لأول أكسيد الكربون) تحتوي على سخان داخلي يسخن مادة كيميائية تتفاعل مع الغاز المستهدف، مما يغير مقاومتها. الحساس يستهلك تياراً مرتفعاً نسبياً بسبب السخان.', ARRAY['Arduino Uno','حساس غاز (MQ-2)']::text[], 'الحساسات من سلسلة MQ غالباً تأتي مع موديول صغير به مخرج تناظري (A0) ومخرج رقمي (D0). صل VCC בـ 5V (وليس 3.3V) لأن السخان يحتاج طاقة.', 'void setup() {
  Serial.begin(9600);
}
void loop() {
  int gasLevel = analogRead(A0);
  Serial.print("Gas Level: ");
  Serial.println(gasLevel);
  if(gasLevel > 400) {
    Serial.println("ALARM: High Gas Concentration!");
  }
  delay(1000);
}', 'عدم إعطاء الحساس وقتاً للتسخين (Burn-in Time). حساسات MQ تحتاج للعمل لعدة دقائق (وأحياناً 24 ساعة للمعايرة الدقيقة للمرة الأولى) حتى تستقر قراءاتها.', NULL, 'soil-moisture-sensor', 'Gas & Smoke Sensors (MQ Series)', 'Safety Sensors', 'Detecting toxic or flammable gases as part of an alarm system.', 'The MQ series (e.g., MQ-2 for smoke and explosive gases, MQ-7 for carbon monoxide) contains an internal heater that warms a chemical material that reacts with the target gas, changing its resistance. The sensor draws relatively high current due to the heater.', 'MQ sensors usually come with a module having both analog (A0) and digital (D0) outputs. Connect VCC to 5V (not 3.3V) because the heater requires power.', 'Not giving the sensor time to warm up (Burn-in Time). MQ sensors need several minutes of operation (and sometimes 24 hours for accurate first-time calibration) before their readings stabilize.', now()),
  ('soil-moisture-sensor', 'iot-lab', 'lesson', 'published', false, 310, 'حساس رطوبة التربة', 'الزراعة الذكية', '20 دقيقة', 'قياس رطوبة التربة لمعرفة متى تحتاج نبتتك للماء.', 'حساس التربة التقليدي يعتمد على قياس المقاومة بين شوكتين مغروستين في التربة. الماء موصل للكهرباء (بفضل الأملاح)، فكلما زادت رطوبة التربة، قلت المقاومة وزاد الجهد العائد للمنفذ التناظري. ملاحظة: الحساسات الرخيصة تصدأ (تتآكل) بسرعة بسبب التحليل الكهربائي المستمر.', ARRAY['Arduino Uno','Soil Moisture Sensor Module']::text[], 'صل الدبوس التناظري للموديول (A0) بـ A0 في الأردوينو. VCC בـ 5V.', 'void setup() {
  Serial.begin(9600);
}
void loop() {
  int moisture = analogRead(A0);
  Serial.println(moisture);
  // في بعض الحساسات، التربة الجافة تقرأ قيمة عالية (1023)
  if(moisture > 800) {
    Serial.println("التربة جافة جداً!");
  }
  delay(2000);
}', 'ترك الحساس متصلاً بالكهرباء باستمرار في تربة رطبة، مما يسبب تآكل أقطابه خلال أيام. الحل: تشغيل طاقته عبر دبوس رقمي فقط عند أخذ القراءة (لثانية واحدة كل ساعة).', NULL, 'water-pump-relay', 'Soil Moisture Sensor', 'Smart Agriculture', 'Measuring soil moisture to know when your plant needs water.', 'The traditional soil sensor works by measuring resistance between two prongs inserted into soil. Water conducts electricity (thanks to dissolved salts), so the wetter the soil, the lower the resistance and the higher the voltage returned to the analog pin. Note: cheap sensors corrode quickly due to continuous electrolysis.', 'Connect the module''s analog pin (A0) to A0 on Arduino. VCC to 5V.', 'Leaving the sensor powered continuously in wet soil, which causes the electrodes to corrode within days. Solution: power it through a digital pin only when taking a reading (for one second every hour).', now()),
  ('water-pump-relay', 'iot-lab', 'lesson', 'published', false, 320, 'مضخات المياه المغمورة', 'الزراعة الذكية', '25 دقيقة', 'كيف تضخ الماء آلياً بناءً على حساس الرطوبة.', 'مضخة الماء الصغيرة 5V تسحب تياراً يتراوح بين 150mA و 300mA، وهو أكثر بكثير مما يستطيع دبوس الأردوينو تحمله (أقصاه 20mA). لذلك نستخدم ترانزستور أو ريلاي لفتح وإغلاق طاقة المضخة من البطارية أو مصدر طاقة منفصل.', ARRAY['Arduino Uno','مضخة مياه 5V','Relay Module','مصدر طاقة 5V قوي']::text[], 'استخدم الريلاي لقطع سلك (الموجب) للمضخة. صل الريلاي والأردوينو بـ GND مشترك إذا استخدمت مصدرين للطاقة.', 'const int pumpPin = 7;
void setup() {
  pinMode(pumpPin, OUTPUT);
}
void loop() {
  digitalWrite(pumpPin, HIGH); // تشغيل المضخة
  delay(3000); // ضخ الماء لـ 3 ثوانٍ
  digitalWrite(pumpPin, LOW);
  delay(10000);
}', 'تشغيل المضخة في الهواء (بدون غمرها في الماء)، مما يسبب تلف المروحة الداخلية بسرعة بسبب الاحتكاك الحراري.', NULL, 'pir-motion-sensor', 'Submersible Water Pumps', 'Smart Agriculture', 'How to pump water automatically based on a soil moisture sensor.', 'A small 5V water pump draws between 150mA and 300mA — far more than an Arduino pin can handle (max 20mA). Therefore we use a transistor or relay to open and close the pump''s power from a battery or separate power source.', 'Use a relay to cut the positive wire of the pump. Connect the relay and Arduino to a shared GND if using two power sources.', 'Running the pump in air (without submerging it in water), which quickly damages the internal impeller due to thermal friction.', now()),
  ('pir-motion-sensor', 'iot-lab', 'lesson', 'published', false, 330, 'حساس الحركة (PIR Sensor)', 'حساسات السلامة', '20 دقيقة', 'اكتشاف حركة الأشخاص لاختراع نظام إنذار أو إضاءة ذكية.', 'حساس الأشعة تحت الحمراء السلبية (PIR) يقيس التغيرات في حرارة الأشعة تحت الحمراء الناتجة عن الكائنات الدافئة في محيطه. عندما يتحرك شخص في مجال رؤيته، يرسل الحساس إشارة (HIGH) لدبوس الأردوينو الرقمي. يحتوي الحساس غالباً على مقاومتين متغيرتين (Potentiometers) لضبط حساسية المسافة وزمن استمرار إشارة (HIGH).', ARRAY['Arduino Uno','HC-SR501 PIR Sensor']::text[], 'VCC בـ 5V، GND בـ GND، ودبوس الإشارة الأوسط بدبوس رقمي مثل 2.', 'const int pirPin = 2;
const int ledPin = 13;
void setup() {
  pinMode(pirPin, INPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  Serial.println("Calibrating PIR...");
  delay(30000); // يحتاج 30 ثانية ليتكيف مع حرارة الغرفة
}
void loop() {
  if (digitalRead(pirPin) == HIGH) {
    digitalWrite(ledPin, HIGH);
    Serial.println("Motion Detected!");
  } else {
    digitalWrite(ledPin, LOW);
  }
}', 'اختبار الحساس فور تشغيل الأردوينو. الحساس يحتاج إلى وقت إحماء (Warm-up time) من 30 لـ 60 ثانية ليتعرف على بيئة الغرفة قبل أن يستقر.', NULL, 'buzzer-alarms', 'Motion Sensor (PIR)', 'Safety Sensors', 'Detecting people''s movement to build an alarm or smart lighting system.', 'A Passive Infrared (PIR) sensor measures changes in infrared heat from warm objects in its field. When a person moves within its view, the sensor sends a HIGH signal to the Arduino''s digital pin. The sensor usually has two potentiometers to adjust detection range and how long the HIGH signal stays active.', 'VCC to 5V, GND to GND, and the middle signal pin to a digital pin like 2.', 'Testing the sensor immediately after powering Arduino. The sensor needs a warm-up time of 30 to 60 seconds to recognize the room environment before it stabilizes.', now()),
  ('buzzer-alarms', 'iot-lab', 'lesson', 'published', false, 340, 'الإنذار الصوتي (Buzzer)', 'الخرج والتنبيه', '15 دقيقة', 'إصدار أصوات ونغمات تحذيرية مع وظيفة tone().', 'البازر (Buzzer) نوعان: Active (يصدر صوتاً ثابتاً بمجرد توصيل 5V) و Passive (يحتاج إلى إشارة PWM بترددات مختلفة لإصدار نغمات). لعمل نغمات موسيقية أو أصوات إنذار متدرجة، نستخدم البازر السلبي (Passive) مع الدالة `tone(pin, frequency)` التي تحدد التردد بالهيرتز.', ARRAY['Arduino Uno','Passive Buzzer','مقاومة 100 أوم']::text[], 'صل الطرف الموجب بدبوس يدعم PWM (مثل 9) عبر مقاومة صغيرة لحماية الدبوس، والطرف السالب בـ GND.', 'const int buzzerPin = 9;
void setup() {
  pinMode(buzzerPin, OUTPUT);
}
void loop() {
  tone(buzzerPin, 1000); // 1000 Hz
  delay(500);
  tone(buzzerPin, 2000); // 2000 Hz
  delay(500);
  noTone(buzzerPin);
  delay(1000);
}', 'استخدام Active Buzzer مع دالة `tone()`. الصوت سيكون مشوهاً جداً لأن Active Buzzer يمتلك مذبذباً داخلياً خاصاً به.', NULL, 'stepper-motors', 'Sound Alarm (Buzzer)', 'Output & Alerts', 'Generating warning tones with the tone() function.', 'Buzzers come in two types: Active (emits a fixed sound when you supply 5V) and Passive (requires a PWM signal at different frequencies to produce tones). For musical tones or graded alarm sounds, we use a Passive Buzzer with the tone(pin, frequency) function, which sets the frequency in Hz.', 'Connect the positive leg to a PWM-capable pin (like pin 9) through a small resistor to protect the pin, and the negative leg to GND.', 'Using an Active Buzzer with the tone() function — the sound will be very distorted because an Active Buzzer has its own internal oscillator.', now()),
  ('stepper-motors', 'iot-lab', 'lesson', 'published', false, 350, 'محركات الخطوة (Stepper Motors)', 'المحركات', '30 دقيقة', 'تحكم بدقة أجزاء المليمتر (كما في طابعات 3D).', 'محرك الخطوة لا يدور بحرية، بل يتحرك ''خطوات'' صغيرة (مثلاً 200 خطوة لتكمل دورة كاملة). هذا يسمح بتحديد الزاوية والسرعة والموقع بدقة متناهية دون الحاجة لحساسات خارجية. يتطلب درايفر مخصص (مثل A4988) للتحكم الدقيق، أو ULN2003 للمحركات الصغيرة الرخيصة (28BYJ-48).', ARRAY['Arduino Uno','28BYJ-48 Stepper Motor','ULN2003 Driver']::text[], 'اربط دبابيس IN1 إلى IN4 في الدرايفر بمنافذ رقمية (8,9,10,11). المحرك الصغير يحتاج مصدر 5V قوي.', '#include <Stepper.h>
const int stepsPerRevolution = 2048;
Stepper myStepper(stepsPerRevolution, 8, 10, 9, 11);
void setup() {
  myStepper.setSpeed(10);
}
void loop() {
  myStepper.step(stepsPerRevolution); // دورة كاملة
  delay(1000);
  myStepper.step(-stepsPerRevolution); // عكس الدوران
  delay(1000);
}', 'ترتيب دبابيس 28BYJ-48 في دالة Stepper ليس بالترتيب الرياضي. يجب كتابة 8, 10, 9, 11 للحصول على دوران سلس، وإلا سيهتز المحرك ولن يدور.', NULL, 'shift-registers', 'Stepper Motors (Precise Millimeter Control)', 'Motors', 'Control with fractions of a millimeter precision (like in 3D printers).', 'A stepper motor doesn''t spin freely — it moves in ''steps'' (e.g., 200 steps for a full rotation). This allows specifying angle, speed, and position with extreme precision without external sensors. It requires a dedicated driver (like A4988) for precise control, or ULN2003 for small cheap motors (28BYJ-48).', 'Connect driver pins IN1 to IN4 to digital pins (8, 9, 10, 11). The small motor needs a powerful 5V source.', 'The pin order for the 28BYJ-48 in the Stepper() function is NOT sequential. You must write 8, 10, 9, 11 for smooth rotation — otherwise the motor will vibrate and not rotate.', now()),
  ('shift-registers', 'iot-lab', 'lesson', 'published', false, 360, 'مضاعفة المنافذ (Shift Register 74HC595)', 'مهارات متقدمة', '35 دقيقة', 'التحكم بـ 8 ليدات باستخدام 3 منافذ أردوينو فقط.', 'عندما تنفد منافذ الأردوينو الديجيتال، نستخدم مسجل الإزاحة (74HC595). هو شريحة إلكترونية تستقبل البيانات كـ ''قطار متسلسل'' عبر سلك واحد (يتحكم به كلوكات أو نبضات)، ثم تعرضها على 8 مخارج متوازية في نفس اللحظة. يمكنك حتى ربط عدة شرائح ببعضها للتحكم بعشرات الليدات.', ARRAY['Arduino Uno','74HC595 IC','8 ليدات','8 مقاومات 220 أوم']::text[], 'يتطلب تركيزاً شديداً. Data Pin لـ 11, Latch Pin لـ 8, Clock Pin لـ 12.', 'const int latchPin = 8;
const int clockPin = 12;
const int dataPin = 11;
void setup() {
  pinMode(latchPin, OUTPUT);
  pinMode(dataPin, OUTPUT);
  pinMode(clockPin, OUTPUT);
}
void loop() {
  digitalWrite(latchPin, LOW);
  shiftOut(dataPin, clockPin, MSBFIRST, 0b10101010); // إضاءة تبادلية
  digitalWrite(latchPin, HIGH);
  delay(1000);
}', 'نسيان توصيل دبوس MR و OE في الشريحة. MR للـ 5V و OE للـ GND لتعمل الشريحة كالمتوقع.', NULL, 'eeprom-basics', 'Multiplying Ports (Shift Register 74HC595)', 'Advanced Skills', 'Control 8 LEDs using only 3 Arduino pins.', 'When Arduino''s digital pins run out, we use the 74HC595 shift register. It''s an IC that receives data as a ''serial train'' through one wire (clocked by pulses), then outputs it to 8 parallel outputs simultaneously. You can even chain multiple chips together to control dozens of LEDs.', 'Requires close attention: Data Pin to 11, Latch Pin to 8, Clock Pin to 12.', 'Forgetting to connect the MR and OE pins on the chip — MR to 5V and OE to GND for the chip to work as expected.', now()),
  ('eeprom-basics', 'iot-lab', 'lesson', 'published', false, 370, 'الذاكرة الدائمة (EEPROM)', 'تخزين البيانات', '25 دقيقة', 'حفظ الإعدادات أو درجات الحرارة حتى بعد فصل الكهرباء.', 'المتغيرات العادية تُحفظ في الـ RAM وتُفقد عند فصل الكهرباء عن الأردوينو. لكن الـ EEPROM هي ذاكرة صغيرة (1 كيلو بايت في الأونو) تحتفظ ببياناتها دائماً. يمكنك استخدامها لتخزين أعلى درجة حرارة مسجلة، أو حالة زر ليعود ليعمل بمجرد عودة الكهرباء.', ARRAY['Arduino Uno']::text[], 'لا تحتاج لمكونات خارجية.', '#include <EEPROM.h>
void setup() {
  Serial.begin(9600);
  int savedVal = EEPROM.read(0);
  Serial.print("Saved Value: "); Serial.println(savedVal);
  
  // حفظ قيمة جديدة (استخدم هذا بحذر فالـ EEPROM لها عمر افتراضي)
  EEPROM.write(0, savedVal + 1);
}
void loop() {}', 'وضع دالة `EEPROM.write()` داخل `loop()` السريع! الـ EEPROM تتحمل 100,000 عملية كتابة فقط، وستتلف الشريحة فعلياً خلال دقائق إذا كتبت عليها باستمرار.', NULL, 'ws2812b-rgb', 'Permanent Memory (EEPROM)', 'Data Storage', 'Saving settings or temperature readings even after power is disconnected.', 'Regular variables are stored in RAM and are lost when Arduino loses power. But EEPROM is a small memory (1 KB in the Uno) that retains its data permanently. You can use it to store the highest recorded temperature, or a button state so it returns to active as soon as power is restored.', 'No external components required.', 'Placing EEPROM.write() inside a fast loop()! EEPROM can only handle 100,000 write operations — the chip will physically fail within minutes if you write to it continuously.', now()),
  ('ws2812b-rgb', 'iot-lab', 'lesson', 'published', false, 380, 'التحكم بشريط الليد الذكي (WS2812B NeoPixel)', 'الإضاءة الذكية', '25 دقيقة', 'كل ليد لون مختلف، عبر سلك واحد فقط.', 'الـ WS2812B هو شريط ليد متطور جداً، كل ليد داخله رقاقة تحكم صغيرة (IC) الخاصة به. يمكنك التحكم في لون وسطوع كل ليد على حدة في شريط طوله 5 أمتار باستخدام دبوس (Pin) ديجيتال واحد فقط! نستخدم مكتبة `FastLED` المذهلة لهذا الغرض.', ARRAY['Arduino Uno','شريط WS2812B','مقاومة 330 أوم','مكثف 1000uF']::text[], 'استخدم مصدر 5V عالي التيار للشريط. ضع المكثف بين الموجب والسالب للمصدر. الداتا يتم توصيله عبر مقاومة 330 أوم لدبوس 6.', '#include <FastLED.h>
#define NUM_LEDS 10
#define DATA_PIN 6
CRGB leds[NUM_LEDS];
void setup() { 
  FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
}
void loop() {
  for(int i = 0; i < NUM_LEDS; i++) {
    leds[i] = CRGB::Red;
    FastLED.show();
    delay(50);
    leds[i] = CRGB::Black;
  }
}', 'تزويد شريط طويل يضم 60 ليد أو أكثر بالطاقة من منفذ 5V الخاص بالأردوينو. كل ليد يستهلك 60mA، فشريط من 60 ليد قد يسحب 3.6 أمبير، مما يحرق الأردوينو أو منفذ اللابتوب فورا.', NULL, 'battery-safety', 'Smart LED Strip Control (WS2812B NeoPixel)', 'Smart Lighting', 'Every LED a different color, through a single wire.', 'The WS2812B is a very advanced LED strip — each LED has its own tiny control chip (IC). You can control the color and brightness of each individual LED on a 5-meter strip using just a single digital pin! We use the amazing FastLED library for this purpose.', 'Use a high-current 5V power supply for the strip. Place a capacitor between the positive and negative of the supply. Data is connected through a 330 Ohm resistor to pin 6.', 'Powering a long strip with 60 or more LEDs from Arduino''s 5V pin. Each LED draws 60mA — a 60-LED strip may draw 3.6A, instantly burning the Arduino or the laptop port.', now()),
  ('battery-safety', 'iot-lab', 'lesson', 'published', false, 390, 'الطاقة والبطاريات والسلامة', 'الطاقة (Power)', '30 دقيقة', 'كيف تختار البطارية الصحيحة دون التسبب في حريق.', 'الأردوينو يحتاج جهد ثابت ومستقر. بطاريات 9V المربعة سيئة جداً للمحركات ومشاريع الروبوتات (تيارها ضعيف جداً). الأفضل هو بطاريات ليثيوم 18650 القابلة للشحن (الواحدة 3.7V). لكن بطاريات الليثيوم حساسة جداً، وتفريغها أقل من 3.0V يتلفها، كما أن قصرها الكهربائي قد يسبب انفجارها. استخدم وحدات شحن وتفريغ وحماية مثل TP4056 معها.', ARRAY['بطاريات 18650','حامل بطاريات','TP4056 Module','المالتيميتر']::text[], 'وحدة TP4056 لها أطراف B+ و B- للبطارية، وأطراف OUT+ و OUT- لدائرتك لتضمن الحماية.', '// درس نظري هام لسلامة المشاريع.', 'توصيل بطاريات الليثيوم على التوالي (لزيادة الجهد) بدون نظام موازنة خلايا (BMS). شحنها بهذا الشكل خطير جداً.', NULL, 'multitasking-millis', 'Power, Batteries & Safety', 'Power Management', 'How to choose the right battery without starting a fire.', 'Arduino needs stable, consistent voltage. 9V block batteries are terrible for motor projects (very weak current). The best choice is rechargeable lithium 18650 batteries (3.7V each). But lithium batteries are very sensitive — discharging below 3.0V will damage them, and short-circuiting them can cause an explosion. Use a charge/discharge protection module like TP4056.', 'The TP4056 module has B+ and B- terminals for the battery, and OUT+ and OUT- for your circuit to ensure protection.', 'Connecting lithium batteries in series (to increase voltage) without a cell balancing system (BMS). Charging them this way is very dangerous.', now()),
  ('multitasking-millis', 'iot-lab', 'lesson', 'published', false, 400, 'المهام المتعددة (Multitasking with Millis)', 'مهارات متقدمة', '35 دقيقة', 'تخلص من دالة delay() واجعل الأردوينو ينفذ أكثر من شيء في نفس الوقت.', 'الدالة `delay()` هي ''دالة محتكرة'' (Blocking Function). عند تنفيذ `delay(5000)`، يتوقف المعالج عن قراءة الحساسات أو الأزرار لـ 5 ثوانٍ كاملة. للمشاريع الحقيقية، نستخدم دالة `millis()` التي تعمل كساعة إيقاف، نقرأها في كل لفة من `loop()`، ونتحقق مما إذا كان الوقت المطلوب قد انقضى لتنفيذ مهمة معينة، تاركين الكود يستمر.', ARRAY['Arduino Uno','2 LED']::text[], 'ليدين منفصلين.', 'unsigned long lastBlink = 0;
const int ledPin = 13;
int ledState = LOW;

void setup() { pinMode(ledPin, OUTPUT); }
void loop() {
  unsigned long currentMillis = millis();
  // يومض كل 500 مللي ثانية بدون إيقاف الـ loop
  if (currentMillis - lastBlink >= 500) {
    lastBlink = currentMillis;
    ledState = !ledState;
    digitalWrite(ledPin, ledState);
  }
  // هنا يمكنك قراءة حساسات أخرى براحة
}', 'استخدام نوع بيانات `int` لحفظ قيمة `millis()`. `millis()` يصل لأرقام ضخمة وسيتجاوز حجم المتغير (Overflow) خلال 32 ثانية فقط إذا كان `int`. يجب استخدام `unsigned long`.', NULL, 'esp32-spiffs', 'Multitasking with millis()', 'Advanced Skills', 'Get rid of the delay() function and make Arduino do more than one thing at the same time.', 'The delay() function is a ''blocking function''. When you run delay(5000), the processor stops reading sensors or buttons for 5 full seconds. For real projects, we use the millis() function which acts like a stopwatch — we read it in every loop() cycle and check if the required time has elapsed to execute a specific task, leaving the code free to continue.', 'Two separate LEDs.', 'Using an int data type to store the millis() value. millis() reaches large numbers and will overflow the variable size within just 32 seconds if using int. Must use unsigned long.', now()),
  ('esp32-spiffs', 'iot-lab', 'lesson', 'published', false, 410, 'نظام الملفات في ESP32 (SPIFFS)', 'إنترنت الأشياء (IoT)', '30 دقيقة', 'استضافة ملفات HTML كاملة داخل اللوحة.', 'بدلاً من كتابة كود HTML معقد داخل String في كود الـ C++، يمكننا تقسيم ذاكرة فلاش في لوحة ESP32 لتكون ''قرصاً صلباً'' صغيراً (SPIFFS). يمكننا حفظ ملفات `index.html` و `style.css` فيها، وتوجيه الـ Web Server ليقرأ هذه الملفات ويرسلها للمتصفح. هذا يجعل بناء واجهات تحكم جميلة وسهلاً للغاية.', ARRAY['ESP32']::text[], '', '#include <SPIFFS.h>
#include <WebServer.h>
WebServer server(80);
void setup() {
  SPIFFS.begin(true);
  server.serveStatic("/", SPIFFS, "/index.html");
  server.begin();
}
void loop() {
  server.handleClient();
}', 'نسيان رفع الملفات لـ SPIFFS. مجرد كتابة الكود لا يرفع الملفات، يجب استخدام إضافة Arduino ESP32 SPIFFS Data Upload لرفع محتويات مجلد ''data''.', NULL, 'http-post-thingspeak', 'ESP32 File System (SPIFFS)', 'Internet of Things (IoT)', 'Host complete HTML files inside the board.', 'Instead of writing complex HTML code as String variables inside C++ code, we can partition the flash memory on ESP32 to act as a small ''hard drive'' (SPIFFS). We can save index.html and style.css files there, and direct the Web Server to read and send these files to the browser. This makes building beautiful control interfaces very easy.', NULL, 'Forgetting to upload files to SPIFFS. Writing the code alone doesn''t upload the files — you must use the Arduino ESP32 SPIFFS Data Upload plugin to upload contents from the ''data'' folder.', now()),
  ('http-post-thingspeak', 'iot-lab', 'lesson', 'published', false, 420, 'إرسال البيانات إلى Thingspeak (IoT Cloud)', 'إنترنت الأشياء (IoT)', '35 دقيقة', 'سجل بيانات الحرارة على السحابة وراقبها عبر رسوم بيانية من أي مكان.', 'منصة ThingSpeak من أفضل المنصات المجانية لمراقبة بيانات الحساسات. لرفع درجة حرارة الغرفة إليها، يحتاج ESP32 فقط لإرسال طلب HTTP GET إلى رابط (URL) يحتوي على API Key الخاص بك وقيمة الحساس المضافة كمتغير في الرابط. سيقوم الموقع بتسجيل القيمة ورسمها.', ARRAY['ESP32','DHT11']::text[], 'توصيل DHT11 بلوحة ESP32 على منفذ رقمي.', '#include <WiFi.h>
#include <HTTPClient.h>
String apiKey = "YOUR_API_KEY";
String url = "http://api.thingspeak.com/update?api_key=" + apiKey + "&field1=";
void loop() {
  int temp = 25; // اقرأ الحساس هنا
  HTTPClient http;
  http.begin(url + String(temp));
  int code = http.GET();
  http.end();
  delay(20000); // ThingSpeak مجاني يسمح بتحديث كل 15 ثانية فقط
}', 'وضع الكود داخل `loop()` السريع بدون `delay` طويل كافٍ، مما يؤدي لحظر حسابك (Banned) مؤقتاً لتجاوز معدل الإرسال المسموح (Rate Limit).', NULL, 'ota-update', 'Sending Data to ThingSpeak (IoT Cloud)', 'Internet of Things (IoT)', 'Log temperature data to the cloud and monitor it via charts from anywhere.', 'ThingSpeak is one of the best free platforms for monitoring sensor data. To upload room temperature to it, ESP32 only needs to send an HTTP GET request to a URL containing your API Key and the sensor value added as a variable in the URL. The site will record the value and plot it on a chart.', 'Connect DHT11 to ESP32 on a digital pin.', 'Putting the code inside a fast loop() without a sufficient long delay, causing your account to be temporarily banned for exceeding the allowed send rate (Rate Limit).', now()),
  ('ota-update', 'iot-lab', 'lesson', 'published', false, 430, 'تحديث الأكواد عن بعد (OTA)', 'إنترنت الأشياء (IoT)', '25 دقيقة', 'رفع الأكواد الجديدة للـ ESP32 عبر الواي فاي دون كابل USB.', 'تقنية Over-The-Air (OTA) تعني أنك بمجرد برمجة اللوحة لتتصل بالشبكة المحلية وتفعل مكتبة ArduinoOTA، سيظهر اسم اللوحة كـ Port شبكي في قائمة Ports في الـ Arduino IDE. يمكنك بعد ذلك تحديث الكود للروبوت وهو يسير في الغرفة أو لجهاز معلق على الجدار دون توصيل كابل.', ARRAY['ESP32']::text[], '', '#include <WiFi.h>
#include <ArduinoOTA.h>
void setup() {
  WiFi.begin("SSID", "PASS");
  while(WiFi.status() != WL_CONNECTED) delay(500);
  ArduinoOTA.begin();
}
void loop() {
  ArduinoOTA.handle();
}', 'نسيان وضع `ArduinoOTA.handle();` في دالة `loop()`، بدونها لن تتمكن اللوحة من الاستماع لطلبات التحديث الشبكية الجديدة، وسيتوجب عليك إعادة استخدام الكابل.', NULL, 'end', 'Over-The-Air Code Updates (OTA)', 'Internet of Things (IoT)', 'Upload new code to ESP32 via Wi-Fi without a USB cable.', 'Over-The-Air (OTA) technology means that once you program the board to connect to the local network and enable the ArduinoOTA library, the board''s name will appear as a network Port in the Ports menu in Arduino IDE. You can then update the code on a robot while it''s moving around the room or on a wall-mounted device without connecting a cable.', NULL, 'Forgetting to put ArduinoOTA.handle() in the loop() function — without it the board cannot listen for new network update requests and you''ll be forced to use the cable again.', now()),
  ('lora-communication', 'iot-lab', 'lesson', 'published', false, 440, 'الاتصالات طويلة المدى (LoRa)', 'الاتصالات اللاسلكية', '30 دقيقة', 'إرسال البيانات عبر الكيلومترات (أحياناً 10 كم+) بدون إنترنت أو شرائح اتصال.', 'تقنية LoRa (Long Range) تعتمد على إرسال حزم بيانات صغيرة جداً بترددات راديو منخفضة (مثل 433MHz أو 868MHz). التكنولوجيا توفر مسافات هائلة مقابل استهلاك طاقة ضئيل، لكنها بطيئة جداً ومناسبة فقط لإرسال بيانات استشعار (حرارة، إحداثيات GPS) ولا تصلح للصوت أو الفيديو.', ARRAY['عدد 2 Arduino Uno','عدد 2 LoRa SX1278 Modules']::text[], 'استخدم بروتوكول SPI. LoRa يحتاج 3.3V تماماً كالمكتوب في الـ Datasheet. 5V ستحرقه.', '// الكود يستلزم مكتبة LoRa.h
// الإرسال: 
// LoRa.beginPacket();
// LoRa.print("Hello 10KM Away");
// LoRa.endPacket();', 'تشغيل موديل LoRa أو أي مرسل لاسلكي قبل توصيل الهوائي (Antenna). تشغيله بدون هوائي قد يؤدي لتلف شريحة مكبر الإشارة (Amplifier) داخل الموديول.', '', 'bluetooth-hc05', 'Long-Range Communication (LoRa)', 'Wireless Communication', 'Send data over kilometers (sometimes 10 km+) without internet or SIM cards.', 'LoRa (Long Range) technology relies on transmitting very small data packets at low radio frequencies (like 433MHz or 868MHz). The technology provides enormous distances at minimal power consumption, but it is very slow and only suitable for sending sensor data (temperature, GPS coordinates) — not suitable for audio or video.', 'Use the SPI protocol. LoRa requires exactly 3.3V as specified in the datasheet — 5V will burn it.', 'Powering on a LoRa module or any wireless transmitter before connecting the antenna. Operating without an antenna may damage the amplifier chip inside the module.', now()),
  ('bluetooth-hc05', 'iot-lab', 'lesson', 'published', false, 450, 'التحكم بالبلوتوث (HC-05)', 'الاتصالات اللاسلكية', '25 دقيقة', 'كيف تربط هاتفك المحمول بالأردوينو عبر البلوتوث الكلاسيكي للتحكم بروبوت.', 'מודيול HC-05 يعمل كجسر مسلسل (Serial Bridge) لاسلكي. البيانات التي ترسلها من هاتفك عبر تطبيق بلوتوث تصل للموديول الذي يمررها بدوره للأردوينو عبر طرفي الـ TX و RX.', ARRAY['Arduino Uno','HC-05 Bluetooth','هاتف ذكي ببرنامج Bluetooth Terminal']::text[], 'صل TX البلوتوث بـ RX الأردوينو، و RX البلوتوث بـ TX الأردوينو. ملحوظة: RX في HC-05 يعمل بـ 3.3V لذا يُفضل استخدام مقسم جهد (مقاومتين) للإشارة القادمة من الأردوينو (5V).', 'char incomingByte;
void setup() {
  Serial.begin(9600); // يفترض توصيل البلوتوث بدبابيس 0 و 1
  pinMode(13, OUTPUT);
}
void loop() {
  if (Serial.available() > 0) {
    incomingByte = Serial.read();
    if(incomingByte == ''1'') digitalWrite(13, HIGH);
    if(incomingByte == ''0'') digitalWrite(13, LOW);
  }
}', 'محاولة رفع كود جديد للأردوينو بينما البلوتوث لا يزال موصولاً بالدبابيس 0 و 1 (RX/TX). الأردوينو يعتمد على هذه الدبابيس لتلقي الكود من الكمبيوتر وسيفشل الرفع.', '', 'ir-remote', 'Bluetooth Control (HC-05)', 'Wireless Communication', 'How to connect your phone to Arduino via Classic Bluetooth to control a robot.', 'The HC-05 module acts as a wireless Serial Bridge. Data you send from your phone via a Bluetooth terminal app reaches the module, which passes it to Arduino through the TX and RX pins.', 'Connect Bluetooth TX to Arduino RX, and Bluetooth RX to Arduino TX. Note: RX on HC-05 operates at 3.3V so it''s recommended to use a voltage divider (two resistors) for the signal from Arduino (5V).', 'Trying to upload new code to Arduino while Bluetooth is still connected to pins 0 and 1 (RX/TX). Arduino uses these pins to receive code from the computer and the upload will fail.', now()),
  ('ir-remote', 'iot-lab', 'lesson', 'published', false, 460, 'ريموت الكنترول (IR Receiver)', 'الإدخال والتحكم', '20 دقيقة', 'تحكم بمشاريعك باستخدام ريموت التلفاز القديم.', 'مستقبل الأشعة تحت الحمراء (مثل TSOP1838) يقرأ ومضات غير مرئية من الريموت ويحولها لرموز (Hex Codes). كل زر في أي ريموت يصدر رمزاً فريداً. باستخدام مكتبة `IRremote.h`، يمكننا فك هذا الرمز وتنفيذ أمر (مثلا: إذا كان الرمز FFA25D، شعل المصباح).', ARRAY['Arduino Uno','IR Receiver','IR Remote']::text[], 'مستقبل الـ IR له 3 أطراف: VCC و GND و Signal. يوصل طرف الـ Signal لأي دبوس رقمي.', '#include <IRremote.h>
const int RECV_PIN = 11;
IRrecv irrecv(RECV_PIN);
decode_results results;
void setup() {
  Serial.begin(9600);
  irrecv.enableIRIn();
}
void loop() {
  if (irrecv.decode(&results)) {
    Serial.println(results.value, HEX);
    irrecv.resume();
  }
}', 'ضوء الشمس المباشر أو المصابيح الفلورية القوية تصدر أشعة تحت حمراء قد تشوش على الحساس وتتسبب في عدم استجابته.', '', 'stepper-vs-servo', 'Remote Control (IR Receiver)', 'Input & Control', 'Control your projects using an old TV remote.', 'An infrared receiver (like TSOP1838) reads invisible flashes from the remote and converts them to codes (Hex Codes). Every button on any remote emits a unique code. Using the IRremote.h library, we can decode this code and execute a command (e.g., if the code is FFA25D, turn on the light).', 'The IR receiver has 3 legs: VCC, GND, and Signal. Connect the Signal leg to any digital pin.', 'Direct sunlight or strong fluorescent lights emit infrared rays that can interfere with the sensor and prevent it from responding.', now()),
  ('stepper-vs-servo', 'iot-lab', 'lesson', 'published', false, 470, 'مقارنة متقدمة للمحركات (Stepper vs Servo vs DC)', 'المحركات', '20 دقيقة', 'درس هندسي لاختيار المحرك المناسب للمهمة المناسبة.', '1. محرك الـ DC: ممتاز للسرعة العالية والحركة المستمرة (عجلات السيارات). 
2. السيرفو (Servo): ممتاز للقوة والتحكم بالزاوية (الأذرع الآلية والتوجيه) لكنه لا يدور 360 درجة. 
3. الخطوة (Stepper): ممتاز للتحكم بالموقع بدقة مذهلة دون الحاجة لرد فعل عكسي، وسرعته بطيئة وتصميمه يجعله يحافظ على موقعه (Holding Torque) كالموجود في طابعات الـ 3D.', ARRAY['نظري']::text[], '', '// درس تصميم هندسي', 'استخدام Servo لتحريك عجلة روبوت، أو استخدام Stepper للسرعة. اختيار المحرك الخاطئ يعقد المشروع برمجياً وميكانيكياً.', '', 'pid-control', 'Advanced Motor Comparison (Stepper vs Servo vs DC)', 'Motors', 'An engineering lesson on choosing the right motor for the right task.', '1. DC Motor: Excellent for high speed and continuous movement (robot wheels).
2. Servo: Excellent for torque and angle control (robotic arms and steering) but cannot rotate 360 degrees.
3. Stepper: Excellent for precise position control without feedback sensors, slow speed, and has holding torque to maintain position — like 3D printers.', NULL, 'Using a Servo to drive a robot wheel, or using a Stepper for high speed. Choosing the wrong motor complicates the project both programmatically and mechanically.', now()),
  ('pid-control', 'iot-lab', 'lesson', 'published', false, 480, 'مفهوم التحكم بخوارزمية (PID)', 'الروبوتات', '30 دقيقة', 'كيف تحافظ طائرات الدرون على توازنها؟ فهم الرياضيات وراء الحركة الناعمة.', 'PID (Proportional, Integral, Derivative). هو نظام تغذية عكسية (Feedback). الروبوت يقرأ خطأه (مثلاً كم يبعد عن منتصف الخط الأسود). 
- الـ P يوجهه للتصحيح بسرعة بناءً على حجم الخطأ الحاضر.
- الـ I يصحح الأخطاء المتراكمة مع الزمن (إذا كان الروبوت ينحرف قليلاً باستمرار بسبب خلل في العجلات).
- الـ D يتنبأ بسرعة الانحراف لتخفيف الفرملة قبل الوصول للمنتصف لمنع التذبذب (الاهتزاز).', ARRAY['نظري/متقدم']::text[], '', 'float error = setPoint - currentPosition;
float P = Kp * error;
I = I + (Ki * error);
float D = Kd * (error - lastError);
float output = P + I + D;
lastError = error;
// استخدم output لضبط سرعة المحركات', 'وضع قيم عالية للثابت Kp مما يجعل الروبوت يهتز بعنف ويفقد مساره تماماً. ضبط الثوابت (Tuning) هو فن يحتاج تجربة وخطأ.', '', 'pcb-design', 'PID Control Algorithm', 'Robotics', 'How do drones maintain their balance? Understanding the math behind smooth movement.', 'PID stands for Proportional, Integral, Derivative. It is a feedback control system. The robot reads its error (e.g., how far it is from the center of the black line).
- P guides it to correct quickly based on the current error magnitude.
- I corrects accumulated errors over time (if the robot drifts slightly due to a wheel imbalance).
- D predicts the rate of change to ease braking before reaching center, preventing oscillation.', NULL, 'Setting a high Kp constant that causes the robot to oscillate violently and lose the line entirely. Tuning the constants is an art that requires trial and error.', now()),
  ('pcb-design', 'iot-lab', 'lesson', 'published', false, 490, 'مقدمة في تصميم الدوائر المطبوعة (PCB)', 'مهارات متقدمة', '25 دقيقة', 'انتقل من فوضى الأسلاك إلى منتج احترافي حقيقي.', 'اللوحة التجريبية جيدة للاختبار، لكن للمشاريع الدائمة (أو المنتجات) نلجأ لتصميم لوحة إلكترونية مطبوعة (PCB) باستخدام برامج مثل EasyEDA أو KiCad. تقوم برسم المخطط (Schematic) ثم تمرير المكونات وتوصيل النحاس بينها، ثم يمكنك إرسال الملف (Gerber) لمصانع ليتم تصنيع اللوحة الخضراء الاحترافية لك.', ARRAY['برنامج تخطيط (مثل EasyEDA)']::text[], '', '// لا يوجد كود برمجي، التصميم بصري CAD.', 'نسيان عرض مسارات النحاس (Trace Width) الكافية للطاقة. المسار الرفيع للـ 5V المتصل بمحرك سيحترق كفتيل القنبلة بسبب التيار العالي.', '', 'power-management', 'Introduction to PCB Design', 'Advanced Skills', 'Move from wire spaghetti to a real professional product.', 'A breadboard is fine for testing, but for permanent projects (or products) we turn to designing a Printed Circuit Board (PCB) using tools like EasyEDA or KiCad. You draw the schematic, place the components, route the copper traces between them, then send the Gerber file to a manufacturer to produce the professional green board for you.', NULL, 'Forgetting sufficient trace width for power paths. A thin trace for 5V connected to a motor will burn like a fuse wire due to the high current.', now()),
  ('power-management', 'iot-lab', 'lesson', 'published', false, 500, 'إدارة الطاقة في المشاريع (Power Management)', 'الطاقة (Power)', '25 دقيقة', 'كيف تجعل بطارية مشروعك تعمل لأشهر وليس لساعات.', 'مشاريع הـ IoT (كمستشعر حرارة زراعي) يجب ألا تحتاج لتغيير بطاريتها أسبوعياً. 
الحلول: 
1. إزالة الليدات من بوردة الأردوينو لأنها تستهلك طاقة مستمرة.
2. استخدام الأردوينو بدون منظم جهد (Standalone ATmega328P).
3. تفعيل أوضاع السبات (Deep Sleep)، بحيث ينام المتحكم لساعة، يستيقظ لثانية لإرسال القراءة عبر الواي فاي، ثم ينام مجدداً، مما يقلل الاستهلاك لـ ميكرو أمبيرات.', ARRAY['ESP32 أو ATmega328P']::text[], '', '// أمر السبات لـ ESP32 لمدة 10 ثوانٍ
#define uS_TO_S_FACTOR 1000000
void setup(){
  // كود الحساسات والواي فاي هنا
  esp_sleep_enable_timer_wakeup(10 * uS_TO_S_FACTOR);
  esp_deep_sleep_start();
}
void loop(){}', 'ترك حساس يسحب تياراً كبيراً (كحساسات الدخان MQ) متصلاً بـ VCC الدائم. حساس MQ سيعفر البطارية في يوم واحد حتى لو كان المعالج نائماً. يجب التحكم بطاقة الحساس عبر ترانزستور لإيقاظه فقط حين الحاجة.', '', 'json-parsing', 'Power Management in Projects', 'Power Management', 'How to make your project''s battery last months instead of hours.', 'IoT projects (like an agricultural temperature sensor) should not need battery replacement weekly.
Solutions:
1. Remove LEDs from the Arduino board as they draw continuous power.
2. Use Arduino without a voltage regulator (Standalone ATmega328P).
3. Enable Deep Sleep modes, so the controller sleeps for an hour, wakes for one second to send a reading via Wi-Fi, then sleeps again — reducing consumption to microamps.', NULL, 'Leaving a high-current sensor (like MQ smoke sensors) connected to permanent VCC. An MQ sensor will drain the battery in a day even if the processor is asleep. You must control the sensor''s power via a transistor to wake it only when needed.', now()),
  ('json-parsing', 'iot-lab', 'lesson', 'published', false, 510, 'تحليل وتفكيك البيانات (JSON Parsing)', 'إنترنت الأشياء (IoT)', '30 دقيقة', 'كيف يفهم الـ ESP32 البيانات المعقدة القادمة من الويب.', 'عندما تطلب بيانات طقس من خادم، يعيدها لك كنص بصيغة JSON:
`{"temp":25, "city":"Riyadh"}`
لاستخراج الرقم 25 برمجياً، نستخدم مكتبة ArduinoJson القوية جداً والتي تقوم بفك النص (Deserialization) وتحويله لمتغيرات مفيدة بسهولة وأمان في الذاكرة المحدودة.', ARRAY['ESP32','مكتبة ArduinoJson']::text[], '', '#include <ArduinoJson.h>
void setup() {
  Serial.begin(9600);
  String input = "{\"temp\":25, \"city\":\"Riyadh\"}";
  StaticJsonDocument<200> doc;
  deserializeJson(doc, input);
  int t = doc["temp"]; // 25
  String c = doc["city"]; // Riyadh
  Serial.println(t);
}
void loop() {}', 'تحديد مساحة (Buffer) للمستند JSON أقل من الحجم الفعلي للبيانات المستلمة، مما يؤدي لفشل تحليل البيانات بصمت.', '', 'interrupts', 'JSON Parsing (Reading Web Data)', 'Internet of Things (IoT)', 'How the ESP32 understands complex data coming from the web.', 'When you request weather data from a server, it returns it as a JSON text:
{"temp":25, "city":"Riyadh"}
To programmatically extract the number 25, we use the ArduinoJson library which deserializes the text and converts it to useful variables safely within limited memory.', NULL, 'Allocating a buffer (memory size) for the JSON document smaller than the actual size of the received data, causing silent parsing failure.', now()),
  ('interrupts', 'iot-lab', 'lesson', 'published', false, 520, 'المقاطعات البرمجية (Interrupts)', 'مهارات متقدمة', '30 دقيقة', 'كيف تنتبه لضغطة الزر فوراً حتى لو كان الأردوينو مشغولاً بشيء آخر.', 'في الأكواد الطويلة (خاصة تلك التي تستخدم Delay)، قد تضغط الزر والأردوينو لا يلاحظك لأنه في السطر الخاطئ. (المقاطعة) هي خاصية هاردوير؛ بمجرد الضغط على زر متصل بـ (Interrupt Pin)، يترك الأردوينو كل ما يفعله فورا، ينفذ دالة طوارئ صغيرة (ISR)، ثم يعود لما كان يفعله. دبابيس 2 و 3 في الأونو تدعم المقاطعة.', ARRAY['Arduino Uno','زر ضغاط']::text[], 'صل الزر بدبوس رقم 2 أو 3.', 'volatile bool state = false;
void setup() {
  pinMode(13, OUTPUT);
  pinMode(2, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(2), blink, FALLING);
}
void loop() {
  // الأردوينو نائم في دالة delay لا نهاية لها، لكن المقاطعة ستعمل
  delay(10000);
}
void blink() {
  state = !state;
  digitalWrite(13, state);
}', 'كتابة دالة طوارئ (ISR) طويلة جداً أو تحتوي على `delay()` أو `Serial.print()`. الـ ISR يجب أن يكون خاطفاً (يغير متغيراً ويخرج).', '', 'esp32-dual-core', 'Hardware Interrupts', 'Advanced Skills', 'How to detect a button press instantly even if Arduino is busy doing something else.', 'In long code (especially those using delay), pressing a button might go unnoticed because Arduino is on the wrong line. An Interrupt is a hardware feature — the moment a button connected to an Interrupt Pin is pressed, Arduino immediately drops everything it''s doing, executes a small emergency function (ISR), then returns to what it was doing. Pins 2 and 3 on the Uno support interrupts.', 'Connect the button to pin 2 or 3.', 'Writing a long ISR function or one containing delay() or Serial.print(). The ISR must be lightning-fast (change a variable and exit).', now()),
  ('esp32-dual-core', 'iot-lab', 'lesson', 'published', false, 530, 'البرمجة متعدده الأنوية (Dual-Core) لـ ESP32', 'إنترنت الأشياء (IoT)', '25 دقيقة', 'كيف تشغل وظيفتين مختلفتين في نفس اللحظة تماماً.', 'بينما يملك الأونو نواة واحدة، الـ ESP32 يمتلك معالجين (Core 0 و Core 1). افتراضياً يعمل الكود الخاص بك في Core 1، بينما يتولى Core 0 الواي فاي. باستخدام بيئة FreeRTOS المدمجة، يمكنك إجبار الأردوينو على تشغيل مهمة معقدة (مثل قراءة كاميرا) في النواة 0 بينما הנواة 1 تدير الشاشة.', ARRAY['ESP32']::text[], '', 'TaskHandle_t Task1;
void setup() {
  xTaskCreatePinnedToCore(
      Task1code, "Task1", 10000, NULL, 1, &Task1, 0); 
  // Task 1 runs on Core 0
}
void Task1code( void * pvParameters ){
  for(;;) {
    // هذا الكود سيعمل بالتوازي مع دالة loop() العادية
  }
}
void loop() {}', 'استخدام نفس المتغيرات من كلا النواتين في نفس اللحظة بدون استخدام ''أقفال'' (Mutex)، مما يسبب تعارض بيانات (Race Condition) وانهيار النظام.', '', 'sd-card-logging', 'Dual-Core Programming for ESP32', 'Internet of Things (IoT)', 'How to run two different functions at exactly the same time.', 'While Arduino Uno has a single core, ESP32 has two processors (Core 0 and Core 1). By default your code runs on Core 1 while Core 0 handles Wi-Fi. Using the built-in FreeRTOS environment, you can force Arduino to run a complex task (like reading a camera) on Core 0 while Core 1 manages the display.', NULL, 'Using the same variables from both cores simultaneously without using locks (Mutex), causing data conflicts (Race Condition) and system crashes.', now()),
  ('sd-card-logging', 'iot-lab', 'lesson', 'published', false, 540, 'تسجيل البيانات على بطاقة SD', 'تخزين البيانات', '30 دقيقة', 'اجمع بيانات الطقس لمزرعتك لمدة أشهر في ملف إكسيل.', 'الـ Data Logging مهم في المشاريع الزراعية أو الصناعية المعزولة عن الإنترنت. نستخدم موديول SD Card (يتواصل عبر SPI) ونكتب عليه ملفات بصيغة CSV لتُقرأ في إكسيل لاحقاً. يجب أن نحرص على عدم كتابة البيانات في كل جزء من الثانية لتجنب ملء الذاكرة بسرعة وإبطاء النظام.', ARRAY['Arduino Uno أو ESP32','Micro SD Card Module']::text[], 'بروتوكول SPI. لـ Uno: CS(4), MOSI(11), MISO(12), SCK(13).', '#include <SPI.h>
#include <SD.h>
File dataFile;
void setup() {
  Serial.begin(9600);
  if (!SD.begin(4)) { Serial.println("Failed"); return; }
}
void loop() {
  dataFile = SD.open("data.csv", FILE_WRITE);
  if (dataFile) {
    dataFile.println("12:00, 25.5C");
    dataFile.close();
  }
  delay(60000); // سجل كل دقيقة
}', 'نزع بطاقة הـ SD أثناء تشغيل الأردوينو أو كتابة الكود بدون إغلاق الملف `dataFile.close()` مما يسبب تلف الملف بأكمله.', '', 'watchdog-timer', 'Data Logging to SD Card', 'Data Storage', 'Collect weather data for your farm for months in an Excel file.', 'Data Logging is important in agricultural or industrial projects isolated from the internet. We use an SD Card module (communicating via SPI) and write CSV files that can be read in Excel later. We must be careful not to write data every fraction of a second to avoid filling memory quickly and slowing the system.', 'SPI protocol. For Uno: CS(4), MOSI(11), MISO(12), SCK(13).', 'Removing the SD card while Arduino is running, or writing code without closing the file with dataFile.close(), which corrupts the entire file.', now()),
  ('watchdog-timer', 'iot-lab', 'lesson', 'published', false, 550, 'كلب الحراسة (Watchdog Timer)', 'الأنظمة الصناعية (IIoT)', '20 دقيقة', 'كيف تنقذ الروبوت إذا علق (تجمد) الكود كلياً وبدون تدخل بشري.', 'لنفترض أن الروبوت يعمل في مكان بعيد أو مصنع، وحدث خلل برمجي جعله يتجمد في حلقة لا نهائية. من سيعيد تشغيله؟ الـ Watchdog هو عداد تنازلي صلب داخل المعالج، يجب على برنامجك أن يصفره باستمرار. إذا تجمد برنامجك، سينتهي العداد ويقوم الـ Watchdog بعمل (Hardware Reset) قسري لإعادة إحياء النظام فوراً.', ARRAY['Arduino Uno أو ESP32']::text[], '', '#include <avr/wdt.h>
void setup() {
  Serial.begin(9600);
  wdt_enable(WDTO_2S); // عداد لثانيتين
}
void loop() {
  wdt_reset(); // يجب تصفير العداد قبل مرور ثانيتين
  // إذا وضعنا هنا delay(3000) سيعيد الأردوينو التشغيل فوراً
}', 'تفعيل الـ Watchdog بفترة قصيرة جداً واستخدام `delay()` طويل في `setup()` سيجعل الأردوينو يعلق في حلقة إعادة تشغيل لا نهائية بمجرد برمجته.', '', 'stepper-a4988', 'Watchdog Timer', 'Industrial Systems (IIoT)', 'How to rescue the robot if the code completely freezes — without human intervention.', 'Suppose the robot is operating in a remote location or factory, and a programming fault causes it to freeze in an infinite loop. Who will restart it? The Watchdog is a hard countdown timer inside the processor — your program must continuously reset it. If your program freezes, the timer expires and the Watchdog forces a Hardware Reset to immediately revive the system.', NULL, 'Enabling the Watchdog with a very short period and using a long delay() in setup() — the Arduino will get stuck in an infinite reboot loop the moment it''s programmed.', now()),
  ('stepper-a4988', 'iot-lab', 'lesson', 'published', false, 560, 'التحكم المتقدم بـ Stepper (A4988)', 'المحركات', '25 دقيقة', 'درايفر طابعات الـ 3D، دقة وحركة احترافية.', 'للمحركات الخطوية الصناعية الكبيرة (NEMA 17)، نستخدم درايفرات تعتمد على اتجاه وخطوة (STEP / DIR) مثل A4988 أو DRV8825. بدلاً من التعامل مع 4 أسلاك، هذا الدرايفر يحتاج فقط لإشارة تفيده بـ الاتجاه (HIGH أو LOW) وإشارة ثانية تعطيه ''نبضة'' ليمشي خطوة واحدة.', ARRAY['Arduino Uno','NEMA 17 Stepper','A4988 Driver','مكثف 100uF']::text[], 'مهم جداً: ضع المكثف بجوار دبابيس VMOT و GND للدرايفر، وإلا سيحترق فوراً عند تشغيل الطاقة.', 'const int stepPin = 3; const int dirPin = 4;
void setup() {
  pinMode(stepPin,OUTPUT); pinMode(dirPin,OUTPUT);
}
void loop() {
  digitalWrite(dirPin,HIGH); // اتجاه
  for(int x = 0; x < 200; x++) {
    digitalWrite(stepPin,HIGH);
    delayMicroseconds(500);
    digitalWrite(stepPin,LOW);
    delayMicroseconds(500);
  }
  delay(1000);
}', 'تشغيل المحرك بدون ضبط المسمار الصغير (VREF) الموجود على الدرايفر لتقييد التيار، مما يتسبب في احتراق المحرك أو الدرايفر.', '', 'hall-effect', 'Advanced Stepper Control (A4988)', 'Motors', 'The 3D printer driver — professional precision and movement.', 'For large industrial stepper motors (NEMA 17), we use STEP/DIR-based drivers like A4988 or DRV8825. Instead of dealing with 4 wires, this driver only needs a direction signal (HIGH or LOW) and a second signal giving it a ''pulse'' to move one step.', 'Very important: place the capacitor next to the VMOT and GND pins of the driver, otherwise it will burn instantly when power is applied.', 'Running the motor without adjusting the small screw (VREF) on the driver to limit the current, which causes the motor or driver to burn.', now()),
  ('hall-effect', 'iot-lab', 'lesson', 'published', false, 570, 'حساس المجال المغناطيسي (Hall Effect)', 'الحساسات', '15 دقيقة', 'قياس السرعة والمجالات المغناطيسية.', 'الحساس ذو التأثير הـ Hall يكتشف وجود المغناطيس أو يحدد قوته التناظرية. يستخدم بكثرة في المصانع لعد سرعة الدوران للمحركات (بوضع مغناطيس على عجلة ومقابلتها للحساس ليعطي نبضة مع كل لفة)، وكبديل لا يبلى ميكانيكياً لأزرار نهاية الشوط (Limit Switches).', ARRAY['Arduino Uno','Hall Effect Sensor (Analog/Digital)','مغناطيس صغير']::text[], 'VCC و GND ومخرج رقمي/تناظري.', 'const int hallPin = 2;
void setup() {
  Serial.begin(9600);
  pinMode(hallPin, INPUT);
}
void loop() {
  if(digitalRead(hallPin) == LOW) {
    Serial.println("Magnet Detected!");
  }
  delay(100);
}', 'الاقتراب من الحساس بالقطب الخاطئ للمغناطيس، معظم حساسات الـ Hall حساسة لقطب واحد فقط (الجنوبي أو الشمالي).', '', 'rtc-module', 'Hall Effect Sensor (Magnetic Field)', 'Sensors', 'Measuring speed and magnetic fields.', 'The Hall effect sensor detects the presence of a magnet or measures its analog strength. It is widely used in factories to count motor rotation speed (by placing a magnet on a wheel facing the sensor to give one pulse per revolution), and as a mechanically non-wearing alternative to limit switches.', 'VCC, GND, and digital/analog output.', 'Approaching the sensor with the wrong magnetic pole — most Hall sensors are sensitive to only one pole (either South or North).', now()),
  ('rtc-module', 'iot-lab', 'lesson', 'published', false, 580, 'الساعة الزمنية الحقيقية (RTC DS3231)', 'الوقت والتزامن', '25 دقيقة', 'كيف تجعل الأردوينو يتذكر الوقت والتاريخ حتى لو فصلت عنه الكهرباء.', 'الأردوينو يمتلك عداد `millis()` ولكنه لا يعرف الساعة ولا التاريخ ويبدأ من الصفر إذا انقطعت الكهرباء. وحدة الـ RTC (Real Time Clock) تحتوي على شريحة دقيقة وبطارية دائرية (Coin cell) صغيرة تبقيها تحسب الوقت لسنوات بدقة. تتواصل عبر بروتوكول I2C.', ARRAY['Arduino Uno','DS3231 RTC Module']::text[], 'SDA بـ A4 و SCL بـ A5 كباقي وحدات I2C.', '#include <Wire.h>
#include "RTClib.h"
RTC_DS3231 rtc;
void setup() {
  Serial.begin(9600);
  if (!rtc.begin()) { Serial.println("RTC FAIL"); return; }
  if (rtc.lostPower()) {
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__))); // يضبطه وقت الرفع
  }
}
void loop() {
  DateTime now = rtc.now();
  Serial.print(now.hour()); Serial.print('':''); Serial.println(now.minute());
  delay(1000);
}', 'توقع أن الـ RTC يعوض الوقت المفقود تلقائياً بدون بطارية 3V (CR2032)، البطارية هي حجر الأساس لهذه القطعة.', '', 'end', 'Real Time Clock (RTC DS3231)', 'Time & Synchronization', 'How to make Arduino remember the time and date even after disconnecting power.', 'Arduino has a millis() counter but it doesn''t know the clock or date and starts from zero when power is lost. An RTC (Real Time Clock) module contains a precise chip and a small coin cell battery that keeps it counting time for years. It communicates via I2C protocol.', 'SDA to A4 and SCL to A5, like other I2C modules.', 'Expecting the RTC to automatically compensate for lost time without a 3V battery (CR2032) — the battery is the cornerstone of this component.', now());
