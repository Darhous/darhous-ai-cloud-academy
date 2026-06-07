-- ══════════════════════════════════════════════════════════════════
-- v40 — IoT Lab — Code Examples (iot_code_examples)
-- Run in: Supabase Dashboard → SQL Editor
-- FLAT type (no nested objects in the CodeExample interface — matches
-- the ai_glossary / ai_tools / ai_prompts precedent): all fields are real
-- columns. The "code" column holds raw Arduino C++ snippets (rendered with
-- dir="ltr" + monospace in the admin form, like raw-JSON textareas).
-- ══════════════════════════════════════════════════════════════════

-- 1. Table
CREATE TABLE IF NOT EXISTS iot_code_examples (
  id            TEXT        PRIMARY KEY,                 -- = existing slug (e.g. 'blink') — keeps links intact
  portal_id     TEXT        NOT NULL DEFAULT 'iot-lab',
  content_type  TEXT        NOT NULL DEFAULT 'code_example',
  status        TEXT        NOT NULL DEFAULT 'published'
                            CHECK (status IN ('published','draft','archived')),
  featured      BOOLEAN     NOT NULL DEFAULT false,
  sort_order    INT         NOT NULL DEFAULT 0,
  title         TEXT        NOT NULL DEFAULT '',
  category      TEXT        NOT NULL DEFAULT '',
  description   TEXT        NOT NULL DEFAULT '',
  code          TEXT        NOT NULL DEFAULT '',
  created_by    UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at   TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_iot_code_examples_status   ON iot_code_examples (status);
CREATE INDEX IF NOT EXISTS idx_iot_code_examples_category ON iot_code_examples (category);

-- 2. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_iot_code_examples_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_iot_code_examples_updated_at ON iot_code_examples;
CREATE TRIGGER trg_iot_code_examples_updated_at
  BEFORE UPDATE ON iot_code_examples
  FOR EACH ROW EXECUTE FUNCTION update_iot_code_examples_updated_at();

-- 3. RLS
ALTER TABLE iot_code_examples ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_iot_code_examples" ON iot_code_examples;
CREATE POLICY "public_read_published_iot_code_examples"
  ON iot_code_examples FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "admin_manage_iot_code_examples" ON iot_code_examples;
CREATE POLICY "admin_manage_iot_code_examples"
  ON iot_code_examples FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Service role (API routes using createAdminClient) bypasses RLS — application
-- code verifies admin role before writes, matching the existing tables' convention.

-- ══════════════════════════════════════════════════════════════════
-- 4. Seed — the 80 existing code examples (codeExamplesDataPart1 + codeExamplesDataPart2), SAME ids, status='published'.
--    Generated programmatically from the source .ts data files (zero transcription risk).
-- ══════════════════════════════════════════════════════════════════
INSERT INTO iot_code_examples (id, portal_id, content_type, status, featured, sort_order, title, category, description, code, published_at)
VALUES
  ('blink', 'iot-lab', 'code_example', 'published', true, 0, 'وميض الليد (Blink)', 'أساسيات', 'أبسط كود في الأردوينو، يضيء الليد المدمج لمدة ثانية ويطفئه لثانية.', 'void setup() {
  pinMode(13, OUTPUT);
}
void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}', now()),
  ('button-read', 'iot-lab', 'code_example', 'published', true, 10, 'قراءة زر ضغاط', 'أساسيات', 'قراءة حالة زر باستخدام المقاومة الداخلية PULLUP.', 'void setup() {
  pinMode(2, INPUT_PULLUP);
  Serial.begin(9600);
}
void loop() {
  int buttonState = digitalRead(2);
  Serial.println(buttonState);
  delay(100);
}', now()),
  ('analog-read', 'iot-lab', 'code_example', 'published', true, 20, 'القراءة التناظرية (مقاومة متغيرة)', 'أساسيات', 'قراءة جهد متغير من 0 لـ 5 فولت وتحويله لرقم من 0 لـ 1023.', 'void setup() {
  Serial.begin(9600);
}
void loop() {
  int val = analogRead(A0);
  Serial.println(val);
  delay(100);
}', now()),
  ('pwm-fade', 'iot-lab', 'code_example', 'published', false, 30, 'تدرج الإضاءة (Fade)', 'أساسيات', 'استخدام PWM لتدرج إضاءة الليد من مطفأ لأقصى سطوع.', 'int brightness = 0; int fadeAmount = 5;
void setup() { pinMode(9, OUTPUT); }
void loop() {
  analogWrite(9, brightness);
  brightness = brightness + fadeAmount;
  if (brightness <= 0 || brightness >= 255) fadeAmount = -fadeAmount;
  delay(30);
}', now()),
  ('serial-input', 'iot-lab', 'code_example', 'published', false, 40, 'استقبال نصوص من السيريال', 'أساسيات', 'كيف تجعل الأردوينو يستجيب للحروف المكتوبة في لوحة المفاتيح.', 'void setup() { Serial.begin(9600); }
void loop() {
  if (Serial.available() > 0) {
    char incomingByte = Serial.read();
    Serial.print("I received: ");
    Serial.println(incomingByte);
  }
}', now()),
  ('map-function', 'iot-lab', 'code_example', 'published', false, 50, 'تحويل النطاقات (Map)', 'أساسيات', 'تحويل قراءة تناظرية (0-1023) إلى قيمة PWM (0-255).', 'void loop() {
  int sensorVal = analogRead(A0);
  int pwmVal = map(sensorVal, 0, 1023, 0, 255);
  analogWrite(9, pwmVal);
}', now()),
  ('for-loop', 'iot-lab', 'code_example', 'published', false, 60, 'حلقة التكرار (For Loop)', 'أساسيات', 'إضاءة مجموعة من الليدات بتسلسل باستخدام حلقة for.', 'void setup() {
  for(int pin = 2; pin <= 6; pin++) pinMode(pin, OUTPUT);
}
void loop() {
  for(int pin = 2; pin <= 6; pin++) {
    digitalWrite(pin, HIGH); delay(200); digitalWrite(pin, LOW);
  }
}', now()),
  ('if-else', 'iot-lab', 'code_example', 'published', false, 70, 'الشروط (If/Else)', 'أساسيات', 'اتخاذ قرارات بسيطة بناءً على المتغيرات.', 'void loop() {
  int val = analogRead(A0);
  if (val > 500) { digitalWrite(13, HIGH); }
  else { digitalWrite(13, LOW); }
}', now()),
  ('debounce', 'iot-lab', 'code_example', 'published', false, 80, 'منع ارتداد الزر (Debounce)', 'أساسيات', 'الطريقة الصحيحة لقراءة زر بدون تكرار الإشارة العشوائي.', 'int state = LOW; int lastButtonState = LOW;
unsigned long lastDebounceTime = 0;
void loop() {
  int reading = digitalRead(2);
  if (reading != lastButtonState) lastDebounceTime = millis();
  if ((millis() - lastDebounceTime) > 50) {
    if (reading != state) {
      state = reading;
      if (state == HIGH) Serial.println("Pressed!");
    }
  }
  lastButtonState = reading;
}', now()),
  ('switch-case', 'iot-lab', 'code_example', 'published', false, 90, 'حالات الاختيار (Switch Case)', 'أساسيات', 'تنفيذ أوامر مختلفة بناء على قيمة متغير واحد.', 'void loop() {
  int val = random(1, 4);
  switch (val) {
    case 1: Serial.println("One"); break;
    case 2: Serial.println("Two"); break;
    case 3: Serial.println("Three"); break;
  }
  delay(1000);
}', now()),
  ('ultrasonic', 'iot-lab', 'code_example', 'published', false, 100, 'حساس المسافة (HC-SR04)', 'حساسات', 'حساب المسافة بدقة بالسنتيمتر.', 'long duration; int distance;
void setup() { pinMode(9, OUTPUT); pinMode(10, INPUT); Serial.begin(9600); }
void loop() {
  digitalWrite(9, LOW); delayMicroseconds(2);
  digitalWrite(9, HIGH); delayMicroseconds(10); digitalWrite(9, LOW);
  duration = pulseIn(10, HIGH);
  distance = duration * 0.034 / 2;
  Serial.println(distance);
}', now()),
  ('dht11-read', 'iot-lab', 'code_example', 'published', false, 110, 'قراءة الحرارة والرطوبة (DHT11)', 'حساسات', 'استخدام مكتبة DHT لقراءة البيانات.', '#include "DHT.h"
DHT dht(2, DHT11);
void setup() { Serial.begin(9600); dht.begin(); }
void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  Serial.print("Temp: "); Serial.println(t);
  delay(2000);
}', now()),
  ('pir-motion', 'iot-lab', 'code_example', 'published', false, 120, 'حساس الحركة (PIR)', 'حساسات', 'تشغيل ليد عند اكتشاف حركة.', 'void setup() { pinMode(2, INPUT); pinMode(13, OUTPUT); }
void loop() {
  if(digitalRead(2) == HIGH) digitalWrite(13, HIGH);
  else digitalWrite(13, LOW);
}', now()),
  ('ldr-light', 'iot-lab', 'code_example', 'published', false, 130, 'حساس الضوء (LDR)', 'حساسات', 'تشغيل الضوء آلياً في الظلام.', 'void loop() {
  int light = analogRead(A0);
  if (light < 300) digitalWrite(13, HIGH);
  else digitalWrite(13, LOW);
}', now()),
  ('gas-mq2', 'iot-lab', 'code_example', 'published', false, 140, 'حساس الغاز الدخان (MQ-2)', 'حساسات', 'إنذار عند تسرب الغاز.', 'void loop() {
  int gas = analogRead(A0);
  if(gas > 400) tone(8, 1000);
  else noTone(8);
}', now()),
  ('soil-moisture', 'iot-lab', 'code_example', 'published', false, 150, 'حساس رطوبة التربة', 'حساسات', 'تحديد متى تسقي نبتتك.', 'void loop() {
  int moisture = analogRead(A0);
  Serial.println(moisture);
  if(moisture > 800) Serial.println("Dry!");
  delay(1000);
}', now()),
  ('water-level', 'iot-lab', 'code_example', 'published', false, 160, 'مقياس مستوى الماء', 'حساسات', 'معرفة عمق الماء التناظري.', 'void loop() {
  int level = analogRead(A0);
  Serial.print("Water Level: "); Serial.println(level);
  delay(500);
}', now()),
  ('sound-sensor', 'iot-lab', 'code_example', 'published', false, 170, 'حساس الصوت (KY-038)', 'حساسات', 'اكتشاف التصفيق أو الضوضاء عبر المدخل الرقمي.', 'void loop() {
  if(digitalRead(3) == HIGH) {
    Serial.println("Sound Detected!");
    delay(100); // Debounce
  }
}', now()),
  ('ir-obstacle', 'iot-lab', 'code_example', 'published', false, 180, 'حساس تجنب العقبات (IR)', 'حساسات', 'قراءة رقمية للحاجز القريب.', 'void loop() {
  if(digitalRead(4) == LOW) Serial.println("Obstacle!");
}', now()),
  ('tcrt5000-line', 'iot-lab', 'code_example', 'published', false, 190, 'حساس تتبع الخط (TCRT5000)', 'حساسات', 'التفريق بين الأبيض والأسود.', 'void loop() {
  int line = digitalRead(5);
  if(line == HIGH) Serial.println("Black Line");
  else Serial.println("White Surface");
}', now()),
  ('ds18b20-temp', 'iot-lab', 'code_example', 'published', false, 200, 'الحرارة الدقيقة (DS18B20)', 'حساسات', 'قراءة الحرارة ببروتوكول 1-Wire.', '#include <DallasTemperature.h>
OneWire oneWire(2);
DallasTemperature sensors(&oneWire);
void setup() { sensors.begin(); Serial.begin(9600); }
void loop() {
  sensors.requestTemperatures();
  Serial.println(sensors.getTempCByIndex(0));
}', now()),
  ('mpu6050-gyro', 'iot-lab', 'code_example', 'published', false, 210, 'الجايروسكوب (MPU6050)', 'حساسات', 'استخدام مكتبة Wire لقراءة القيم الأولية.', '#include <Wire.h>
void setup() { Wire.begin(); Wire.beginTransmission(0x68); Wire.write(0x6B); Wire.write(0); Wire.endTransmission(true); Serial.begin(9600); }
void loop() {
  Wire.beginTransmission(0x68); Wire.write(0x3B); Wire.endTransmission(false); Wire.requestFrom(0x68, 6, true);
  int16_t AcX = Wire.read()<<8|Wire.read();
  Serial.println(AcX);
}', now()),
  ('rfid-read', 'iot-lab', 'code_example', 'published', false, 220, 'قارئ البطاقات (RFID)', 'حساسات', 'قراءة الـ UID لبطاقة RC522.', '#include <SPI.h>
#include <MFRC522.h>
MFRC522 mfrc(10, 9);
void setup() { SPI.begin(); mfrc.PCD_Init(); }
void loop() {
  if (!mfrc.PICC_IsNewCardPresent() || !mfrc.PICC_ReadCardSerial()) return;
  // طباعة الكود هنا
}', now()),
  ('keypad-4x4', 'iot-lab', 'code_example', 'published', false, 230, 'لوحة الأرقام (Keypad)', 'حساسات', 'قراءة الأزرار المضغوطة.', '#include <Keypad.h>
char keys[4][4] = {{''1'',''2'',''3'',''A''},{''4'',''5'',''6'',''B''},{''7'',''8'',''9'',''C''},{''*'',''0'',''#'',''D''}};
byte rows[4]={9,8,7,6}; byte cols[4]={5,4,3,2};
Keypad k = Keypad(makeKeymap(keys), rows, cols, 4, 4);
void loop() { char c = k.getKey(); if(c) Serial.println(c); }', now()),
  ('joystick-xy', 'iot-lab', 'code_example', 'published', false, 240, 'عصا التحكم (Joystick)', 'حساسات', 'قراءة محوري X و Y.', 'void loop() {
  int x = analogRead(A0); int y = analogRead(A1);
  Serial.print("X: "); Serial.print(x); Serial.print(" Y: "); Serial.println(y);
}', now()),
  ('servo-basic', 'iot-lab', 'code_example', 'published', false, 250, 'تحريك السيرفو (Servo)', 'محركات', 'توجيه السيرفو לزوايا محددة.', '#include <Servo.h>
Servo s;
void setup() { s.attach(9); }
void loop() { s.write(0); delay(1000); s.write(90); delay(1000); }', now()),
  ('servo-sweep', 'iot-lab', 'code_example', 'published', false, 260, 'مسح السيرفو (Sweep)', 'محركات', 'تحريك السيرفو ذهاباً وإياباً בبطء.', 'for(int p=0; p<=180; p++) { s.write(p); delay(15); }
for(int p=180; p>=0; p--) { s.write(p); delay(15); }', now()),
  ('l298n-dc', 'iot-lab', 'code_example', 'published', false, 270, 'قيادة محرك DC (L298N)', 'محركات', 'تشغيل محرك للأمام ثم للخلف.', 'void setup() { pinMode(8, OUTPUT); pinMode(9, OUTPUT); }
void loop() {
  digitalWrite(8, HIGH); digitalWrite(9, LOW); delay(2000);
  digitalWrite(8, LOW); digitalWrite(9, HIGH); delay(2000);
}', now()),
  ('l298n-pwm', 'iot-lab', 'code_example', 'published', false, 280, 'التحكم بسرعة الـ DC', 'محركات', 'استخدام طرف EN للتحكم بالسرعة.', 'void setup() { pinMode(8, OUTPUT); pinMode(9, OUTPUT); pinMode(10, OUTPUT); }
void loop() {
  digitalWrite(8, HIGH); digitalWrite(9, LOW);
  analogWrite(10, 150); // سرعة متوسطة
}', now()),
  ('stepper-uln', 'iot-lab', 'code_example', 'published', false, 290, 'محرك الخطوة (28BYJ-48)', 'محركات', 'دوران دورة كاملة للمحرك الصغير.', '#include <Stepper.h>
Stepper stp(2048, 8, 10, 9, 11);
void setup() { stp.setSpeed(10); }
void loop() { stp.step(2048); delay(1000); }', now()),
  ('stepper-a4988', 'iot-lab', 'code_example', 'published', false, 300, 'درايفر طابعة 3D (A4988)', 'محركات', 'التحكم بمحرك NEMA 17.', 'void loop() {
  digitalWrite(DIR_PIN, HIGH);
  for(int i=0; i<200; i++) {
    digitalWrite(STEP_PIN, HIGH); delayMicroseconds(500);
    digitalWrite(STEP_PIN, LOW); delayMicroseconds(500);
  }
}', now()),
  ('relay-control', 'iot-lab', 'code_example', 'published', false, 310, 'الريلاي (Relay 5V)', 'محركات', 'تشغيل وفصل الأحمال العالية.', 'void loop() {
  digitalWrite(7, HIGH); // تشغيل الريلاي
  delay(5000);
  digitalWrite(7, LOW);
  delay(5000);
}', now()),
  ('buzzer-melody', 'iot-lab', 'code_example', 'published', false, 320, 'عزف نغمة (Buzzer)', 'محركات', 'استخدام دوال الصوت.', 'void loop() {
  tone(8, 1000); delay(200);
  tone(8, 1500); delay(200);
  noTone(8); delay(1000);
}', now()),
  ('ws2812-red', 'iot-lab', 'code_example', 'published', false, 330, 'شريط ليد (WS2812B)', 'محركات', 'تلوين شريط الليد بالأحمر.', '#include <FastLED.h>
CRGB leds[10];
void setup() { FastLED.addLeds<WS2812B, 6, GRB>(leds, 10); }
void loop() {
  fill_solid(leds, 10, CRGB::Red);
  FastLED.show();
}', now()),
  ('water-pump', 'iot-lab', 'code_example', 'published', false, 340, 'مضخة مياه (Mini Pump)', 'محركات', 'ضخ الماء لثانيتين باستخدام ترانزستور.', 'void loop() {
  digitalWrite(pumpPin, HIGH); delay(2000);
  digitalWrite(pumpPin, LOW); delay(10000);
}', now()),
  ('lcd-print', 'iot-lab', 'code_example', 'published', false, 350, 'طباعة نص (LCD I2C)', 'شاشات', 'عرض نص على الشاشة.', '#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 16, 2);
void setup() { lcd.init(); lcd.backlight(); lcd.print("Hello!"); }', now()),
  ('lcd-scroll', 'iot-lab', 'code_example', 'published', false, 360, 'نص متحرك (LCD Scroll)', 'شاشات', 'دحرجة النص الطويل.', 'void loop() {
  lcd.scrollDisplayLeft();
  delay(300);
}', now()),
  ('oled-print', 'iot-lab', 'code_example', 'published', false, 370, 'طباعة نص (OLED 0.96)', 'شاشات', 'عرض نصوص باحجام مختلفة.', 'display.clearDisplay(); display.setTextSize(2); display.setTextColor(WHITE); display.setCursor(0,0); display.println("IoT"); display.display();', now()),
  ('oled-draw', 'iot-lab', 'code_example', 'published', false, 380, 'رسم أشكال (OLED)', 'شاشات', 'رسم دائرة وخط.', 'display.drawCircle(64, 32, 10, WHITE);
display.drawLine(0, 0, 128, 64, WHITE);
display.display();', now()),
  ('7segment-tm', 'iot-lab', 'code_example', 'published', false, 390, 'عرض أرقام (TM1637)', 'شاشات', 'استخدام وحدة الـ 4 أرقام.', '#include <TM1637Display.h>
TM1637Display d(2, 3);
void setup() { d.setBrightness(7); d.showNumberDec(1234); }', now()),
  ('millis-blink', 'iot-lab', 'code_example', 'published', false, 400, 'الوميض بدون توقف (millis)', 'متقدم', 'وميض الليد بدون استخدام دالة delay التي توقف المعالج.', 'unsigned long p = 0;
void loop() {
  if(millis() - p >= 1000) {
    p = millis();
    digitalWrite(13, !digitalRead(13));
  }
}', now()),
  ('interrupt-basic', 'iot-lab', 'code_example', 'published', false, 410, 'المقاطعة البسيطة (Interrupt)', 'متقدم', 'قراءة زر بشكل لحظي مهما كان الكود مشغولاً.', 'void setup() { attachInterrupt(digitalPinToInterrupt(2), btnISR, RISING); }
void btnISR() { digitalWrite(13, HIGH); }', now()),
  ('eeprom-write', 'iot-lab', 'code_example', 'published', false, 420, 'حفظ البيانات بالذاكرة (EEPROM)', 'متقدم', 'كتابة رقم في الذاكرة الدائمة.', '#include <EEPROM.h>
void setup() { EEPROM.write(0, 255); }', now()),
  ('eeprom-read', 'iot-lab', 'code_example', 'published', false, 430, 'قراءة البيانات من EEPROM', 'متقدم', 'استرجاع الرقم حتى بعد فصل الكهرباء.', '#include <EEPROM.h>
void setup() { Serial.begin(9600); Serial.println(EEPROM.read(0)); }', now()),
  ('watchdog-timer', 'iot-lab', 'code_example', 'published', false, 440, 'كلب الحراسة (Watchdog)', 'متقدم', 'إعادة تشغيل الأردوينو آلياً إذا تجمد.', '#include <avr/wdt.h>
void setup() { wdt_enable(WDTO_2S); }
void loop() { wdt_reset(); }', now()),
  ('sleep-mode', 'iot-lab', 'code_example', 'published', false, 450, 'وضع السبات (Sleep)', 'متقدم', 'إدخال الأردوينو في وضع توفير الطاقة.', '#include <avr/sleep.h>
void sleepNow() {
  set_sleep_mode(SLEEP_MODE_PWR_DOWN);
  sleep_enable();
  sleep_mode();
}', now()),
  ('array-average', 'iot-lab', 'code_example', 'published', false, 460, 'حساب المتوسط (Array)', 'متقدم', 'تصفية قراءات الحساس العشوائية عبر أخذ المتوسط.', 'int readings[10]; int index = 0; int total = 0;
void loop() {
  total = total - readings[index];
  readings[index] = analogRead(A0);
  total = total + readings[index];
  index = (index + 1) % 10;
  int avg = total / 10;
}', now()),
  ('state-machine', 'iot-lab', 'code_example', 'published', false, 470, 'آلة الحالة (State Machine)', 'متقدم', 'تنظيم الكود لعمليات معقدة بخطوات متتالية.', 'int state = 0;
void loop() {
  if(state == 0) { // انتظار الزر }
  else if(state == 1) { // تشغيل المحرك }
  else if(state == 2) { // إيقاف }
}', now()),
  ('custom-function', 'iot-lab', 'code_example', 'published', false, 480, 'كتابة دوال خاصة (Functions)', 'متقدم', 'ترتيب الكود وتنظيف دالة loop.', 'void blinkLed(int times) {
  for(int i=0; i<times; i++) {
    digitalWrite(13, HIGH); delay(200); digitalWrite(13, LOW); delay(200);
  }
}', now()),
  ('pointer-basic', 'iot-lab', 'code_example', 'published', false, 490, 'المؤشرات (Pointers)', 'متقدم', 'تغيير قيم المتغيرات عبر عناوين الذاكرة.', 'void changeVal(int* p) { *p = 50; }
void setup() { int x = 10; changeVal(&x); // x أصبح 50 }', now()),
  ('esp32-wifi', 'iot-lab', 'code_example', 'published', false, 500, 'الاتصال بالواي فاي (ESP32)', 'متقدم', 'ربط اللوحة بالشبكة المنزلية.', '#include <WiFi.h>
void setup() {
  WiFi.begin("SSID", "PASS");
  while(WiFi.status() != WL_CONNECTED) delay(500);
  Serial.println(WiFi.localIP());
}', now()),
  ('esp32-webserver', 'iot-lab', 'code_example', 'published', false, 510, 'خادم ويب بسيط (Web Server)', 'متقدم', 'استضافة صفحة HTML.', 'WebServer server(80);
void setup() {
  server.on("/", []() { server.send(200, "text/html", "<h1>Hello</h1>"); });
  server.begin();
}
void loop() { server.handleClient(); }', now()),
  ('esp32-http-get', 'iot-lab', 'code_example', 'published', false, 520, 'طلب HTTP GET', 'متقدم', 'جلب بيانات من موقع.', 'HTTPClient http;
http.begin("http://example.com/api");
int code = http.GET();
if(code>0) Serial.println(http.getString());
http.end();', now()),
  ('esp32-http-post', 'iot-lab', 'code_example', 'published', false, 530, 'إرسال HTTP POST', 'متقدم', 'إرسال بيانات للإنترنت.', 'http.begin("http://example.com/data");
http.addHeader("Content-Type", "application/json");
http.POST("{\"temp\":25}");
http.end();', now()),
  ('esp32-mqtt-pub', 'iot-lab', 'code_example', 'published', false, 540, 'نشر رسالة MQTT', 'متقدم', 'إرسال رسالة لبروكر.', 'client.publish("home/room/temp", "24.5");', now()),
  ('esp32-mqtt-sub', 'iot-lab', 'code_example', 'published', false, 550, 'استقبال رسالة MQTT', 'متقدم', 'الاشتراك في Topic.', 'client.subscribe("home/room/light");
void callback(char* topic, byte* payload, unsigned int length) {
  if((char)payload[0] == ''1'') digitalWrite(2, HIGH);
}', now()),
  ('esp32-dual-core', 'iot-lab', 'code_example', 'published', false, 560, 'استخدام المعالج المزدوج', 'متقدم', 'تشغيل كود في النواة 0.', 'xTaskCreatePinnedToCore(Task1, "Task1", 10000, NULL, 1, NULL, 0);
void Task1(void * pvParameters) { for(;;) { delay(1000); } }', now()),
  ('esp32-bluetooth', 'iot-lab', 'code_example', 'published', false, 570, 'البلوتوث المدمج', 'متقدم', 'استخدام البلوتوث الكلاسيكي في ESP.', '#include "BluetoothSerial.h"
BluetoothSerial SerialBT;
void setup() { SerialBT.begin("ESP32_Test"); }
void loop() { if(SerialBT.available()) Serial.write(SerialBT.read()); }', now()),
  ('esp32-ble', 'iot-lab', 'code_example', 'published', false, 580, 'بلوتوث الطاقة المنخفضة (BLE)', 'متقدم', 'بث إشارة (Advertising).', '// يتطلب مكتبات BLEDevice, BLEServer, etc.
BLEDevice::init("MyESP32");
BLEServer *pServer = BLEDevice::createServer();', now()),
  ('esp32-spiffs', 'iot-lab', 'code_example', 'published', false, 590, 'نظام الملفات (SPIFFS)', 'متقدم', 'حفظ ملف نصي داخل اللوحة.', '#include <SPIFFS.h>
void setup() { SPIFFS.begin(true); File f = SPIFFS.open("/test.txt", FILE_WRITE); f.print("Hello"); f.close(); }', now()),
  ('json-parse', 'iot-lab', 'code_example', 'published', false, 600, 'تحليل JSON', 'متقدم', 'تفكيك نص JSON.', '#include <ArduinoJson.h>
StaticJsonDocument<200> doc;
deserializeJson(doc, "{\"val\":10}");
int v = doc["val"];', now()),
  ('json-create', 'iot-lab', 'code_example', 'published', false, 610, 'إنشاء JSON', 'متقدم', 'تكوين نص JSON لإرساله.', 'StaticJsonDocument<200> doc;
doc["sensor"] = "dht"; doc["temp"] = 25;
String output; serializeJson(doc, output);', now()),
  ('esp32-ota', 'iot-lab', 'code_example', 'published', false, 620, 'تحديث عن بعد (OTA)', 'متقدم', 'تفعيل الـ OTA.', 'ArduinoOTA.begin();
void loop() { ArduinoOTA.handle(); }', now()),
  ('esp32-deep-sleep', 'iot-lab', 'code_example', 'published', false, 630, 'السبات العميق لـ ESP', 'متقدم', 'النوم لتوفير البطارية.', 'esp_sleep_enable_timer_wakeup(10000000); // 10 ثواني
esp_deep_sleep_start();', now()),
  ('esp32-touch', 'iot-lab', 'code_example', 'published', false, 640, 'دبابيس اللمس', 'متقدم', 'قراءة اللمس بدون أزرار.', 'void loop() {
  Serial.println(touchRead(4));
  delay(100);
}', now()),
  ('esp32-hall', 'iot-lab', 'code_example', 'published', false, 650, 'حساس المغناطيس المدمج', 'متقدم', 'الـ ESP32 يمتلك حساس Hall Effect.', 'void loop() { Serial.println(hallRead()); delay(100); }', now()),
  ('esp32-dac', 'iot-lab', 'code_example', 'published', false, 660, 'المخرج التناظري الحقيقي (DAC)', 'متقدم', 'إخراج فولتية حقيقية (وليس PWM).', 'void setup() { dacWrite(25, 127); // 1.65V }', now()),
  ('structs', 'iot-lab', 'code_example', 'published', false, 670, 'الهياكل (Structs)', 'متقدم', 'تجميع متغيرات في كيان واحد.', 'struct Sensor { int id; float temp; };
Sensor s1 = {1, 24.5};', now()),
  ('classes', 'iot-lab', 'code_example', 'published', false, 680, 'الكلاسات (OOP)', 'متقدم', 'برمجة كائنية التوجه.', 'class Led { public: int p; Led(int pin){ p=pin; pinMode(p, OUTPUT); } void on(){ digitalWrite(p, HIGH); } };
Led myLed(13);', now()),
  ('string-manipulation', 'iot-lab', 'code_example', 'published', false, 690, 'معالجة النصوص', 'متقدم', 'دمج وقص النصوص.', 'String s = "Temp: "; s += 25; int pos = s.indexOf('':'');', now()),
  ('serial-software', 'iot-lab', 'code_example', 'published', false, 700, 'السيريال البرمجي', 'متقدم', 'عمل منفذ RX/TX وهمي.', '#include <SoftwareSerial.h>
SoftwareSerial mySerial(10, 11); // RX, TX
void setup() { mySerial.begin(9600); }', now()),
  ('i2c-scanner', 'iot-lab', 'code_example', 'published', false, 710, 'فاحص I2C', 'متقدم', 'معرفة عنوان أي جهاز I2C.', 'for(byte i = 1; i < 127; i++ ) {
  Wire.beginTransmission(i);
  if (Wire.endTransmission() == 0) Serial.println(i, HEX);
}', now()),
  ('sprintf', 'iot-lab', 'code_example', 'published', false, 720, 'تنسيق النصوص (sprintf)', 'متقدم', 'تجهيز نص بمتغيرات كـ C.', 'char buf[50];
sprintf(buf, "Temp: %d, Hum: %d", 25, 60);
Serial.println(buf);', now()),
  ('bitwise', 'iot-lab', 'code_example', 'published', false, 730, 'العمليات على البتات', 'متقدم', 'تحريك وتعديل البتات.', 'byte a = 0b00001111;
byte b = a << 2; // 0b00111100', now()),
  ('shift-register', 'iot-lab', 'code_example', 'published', false, 740, 'مسجل الإزاحة', 'متقدم', 'استخدام shiftOut.', 'shiftOut(dataPin, clockPin, MSBFIRST, 0b10101010);', now()),
  ('timer-interrupts', 'iot-lab', 'code_example', 'published', false, 750, 'مقاطعات التايمر', 'متقدم', 'تنفيذ كود بتوقيت دقيق جداً (تتطلب مكتبة).', 'Timer1.initialize(1000000); // 1 ثانية
Timer1.attachInterrupt(myFunc);', now()),
  ('pid-basic', 'iot-lab', 'code_example', 'published', false, 760, 'حسابات PID', 'متقدم', 'الكود الأساسي الرياضي.', 'error = setpoint - input;
integral += error;
derivative = error - lastError;
output = Kp*error + Ki*integral + Kd*derivative;', now()),
  ('micropython-basic', 'iot-lab', 'code_example', 'published', false, 770, 'أساسيات مايكروبايثون', 'متقدم', 'وميض לيد بالبايثون.', 'from machine import Pin
from time import sleep
led = Pin(2, Pin.OUT)
while True:
  led.value(not led.value())
  sleep(1)', now()),
  ('sd-write', 'iot-lab', 'code_example', 'published', false, 780, 'الكتابة لبطاقة SD', 'متقدم', 'حفظ البيانات في ملف.', 'File f = SD.open("log.txt", FILE_WRITE);
if(f) { f.println("Data"); f.close(); }', now()),
  ('sd-read', 'iot-lab', 'code_example', 'published', false, 790, 'القراءة من SD', 'متقدم', 'قراءة المحتوى.', 'File f = SD.open("log.txt");
if(f) { while(f.available()) Serial.write(f.read()); f.close(); }', now());
