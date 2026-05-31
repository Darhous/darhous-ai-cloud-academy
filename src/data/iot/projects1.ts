export interface Project {
  id: string;
  title: string;
  category: string;
  difficulty: "سهل" | "متوسط" | "صعب" | "تخرج";
  duration: string;
  description: string;
  features: string[];
  components: string[];
  wiringGuide: string;
  codeSnippet: string;
  videoUrl?: string;
  simulatorLink?: string;
}

export const projectsDataPart1: Project[] = [
  {
    id: "led-blink",
    title: "وميض الليد الأول",
    category: "أساسيات",
    difficulty: "سهل",
    duration: "10 دقائق",
    description: "تطبيقك الأول. تشغيل وإطفاء ضوء صغير كإثبات أنك تتحكم في عقل الأردوينو.",
    features: ["استخدام المخرجات الرقمية", "التحكم بالزمن (delay)"],
    components: ["Arduino Uno", "LED", "مقاومة 220 أوم"],
    wiringGuide: "الموجب للدبوس 13، السالب للأرضي عبر مقاومة.",
    codeSnippet: "void setup() { pinMode(13, OUTPUT); }\nvoid loop() { digitalWrite(13, HIGH); delay(1000); digitalWrite(13, LOW); delay(1000); }",
    simulatorLink: "https://wokwi.com/projects/305567166302257730"
  },
  {
    id: "traffic-light",
    title: "إشارة المرور المبرمجة",
    category: "أساسيات",
    difficulty: "سهل",
    duration: "20 دقيقة",
    description: "بناء إشارة مرور ثلاثية الألوان تحاكي الواقع وتعتمد على التوقيت المنطقي.",
    features: ["التحكم المتسلسل", "استخدام دبابيس متعددة"],
    components: ["Arduino Uno", "LED أحمر، أصفر، أخضر", "3 مقاومات"],
    wiringGuide: "الأحمر بـ 13، الأصفر بـ 12، الأخضر بـ 11.",
    codeSnippet: "void loop() {\n  digitalWrite(13, HIGH); delay(5000);\n  digitalWrite(13, LOW); digitalWrite(12, HIGH); delay(2000);\n  digitalWrite(12, LOW); digitalWrite(11, HIGH); delay(5000);\n  digitalWrite(11, LOW);\n}"
  },
  {
    id: "smart-parking",
    title: "رادار الاصطفاف الذكي",
    category: "الحساسات",
    difficulty: "متوسط",
    duration: "40 دقيقة",
    description: "نظام تحذير يقيس مسافة السيارة عن الجدار ويطلق صوتاً متسارعاً كلما اقتربت.",
    features: ["قياس المسافة الصوتية", "إصدار نغمات بناءً على متغير", "المنطق الشرطي"],
    components: ["Arduino Uno", "HC-SR04", "Buzzer"],
    wiringGuide: "Trig بـ 9، Echo بـ 10، البازر بـ 8.",
    codeSnippet: "long d = readUltrasonicDistance(9, 10);\nif(d < 10) { tone(8, 1000, 100); delay(100); }\nelse if(d < 30) { tone(8, 1000, 100); delay(500); }",
    simulatorLink: "https://wokwi.com/projects/299313271173677576"
  },
  {
    id: "smart-plant-monitor",
    title: "مراقب النبتة الذكي",
    category: "الزراعة",
    difficulty: "سهل",
    duration: "30 دقيقة",
    description: "جهاز صغير يغرس في حوض النبتة وينير باللون الأحمر إذا كانت التربة جافة جداً.",
    features: ["قراءة تناظرية", "مقارنة القيم (Threshold)"],
    components: ["Arduino Uno", "حساس رطوبة تربة", "LED أحمر"],
    wiringGuide: "A0 لحساس التربة، دبوس 13 لليد.",
    codeSnippet: "if(analogRead(A0) > 800) digitalWrite(13, HIGH); else digitalWrite(13, LOW);"
  },
  {
    id: "motion-security-alarm",
    title: "إنذار الحركة الأمني",
    category: "السلامة",
    difficulty: "متوسط",
    duration: "30 دقيقة",
    description: "جهاز إنذار يكتشف حركة الأشعة تحت الحمراء ويطلق سارينة صوتية قوية.",
    features: ["اكتشاف الحركة السلبية", "الاستجابة الفورية"],
    components: ["Arduino Uno", "PIR Sensor", "Active Buzzer"],
    wiringGuide: "إشارة PIR بـ 2، البازر بـ 8.",
    codeSnippet: "if(digitalRead(2) == HIGH) { tone(8, 2000); } else { noTone(8); }"
  },
  {
    id: "lcd-menu-system",
    title: "شاشة التحكم التفاعلية",
    category: "واجهات المستخدم",
    difficulty: "صعب",
    duration: "ساعة",
    description: "بناء واجهة من عدة صفحات على شاشة LCD للتنقل بين إعدادات المشروع عبر الأزرار.",
    features: ["إدارة حالة النظام (State Machine)", "استخدام بروتوكول I2C", "منع الارتداد (Debounce)"],
    components: ["Arduino Uno", "LCD 16x2 I2C", "3 أزرار"],
    wiringGuide: "LCD I2C בـ A4 و A5، الأزرار בـ 2, 3, 4.",
    codeSnippet: "// يعتمد على مكتبة LiquidCrystal_I2C\nint menuPage = 0;\n// كود إدارة الصفحات طويل، يرجى مراجعة الدرس"
  },
  {
    id: "servo-radar",
    title: "رادار الموجات الصوتية",
    category: "روبوتات",
    difficulty: "متوسط",
    duration: "45 دقيقة",
    description: "يثبت حساس المسافة على محرك سيرفو ويدور يميناً ويساراً لمسح البيئة كأنه رادار حربي.",
    features: ["الدمج بين الحركة والقراءة", "استخدام المصفوفات (Arrays)"],
    components: ["Arduino Uno", "Servo Motor", "HC-SR04"],
    wiringGuide: "السيرفو بـ 9، Trig بـ 10، Echo بـ 11.",
    codeSnippet: "for(int pos = 0; pos <= 180; pos++) { myServo.write(pos); delay(15); measureDistance(); }"
  },
  {
    id: "smart-fan-controller",
    title: "مروحة الحرارة الذكية",
    category: "أتمتة المنزل",
    difficulty: "متوسط",
    duration: "40 دقيقة",
    description: "تقرأ الحرارة، وإذا تجاوزت 30 درجة، تبدأ المروحة بالدوران عبر ريلاي.",
    features: ["تحكم بالتيار المتردد/الأحمال العالية", "قراءة رقمية معقدة (DHT11)"],
    components: ["Arduino Uno", "DHT11", "Relay Module", "مروحة صغيرة"],
    wiringGuide: "DHT11 بـ 2، الريلاي بـ 7.",
    codeSnippet: "if(dht.readTemperature() > 30) digitalWrite(7, HIGH); else digitalWrite(7, LOW);"
  },
  {
    id: "esp32-web-server-led",
    title: "التحكم اللاسلكي من الجوال",
    category: "إنترنت الأشياء",
    difficulty: "صعب",
    duration: "50 دقيقة",
    description: "اصنع شبكة واي فاي خاصة بك لتدخل إليها من الجوال وتضغط زراً يضيء مصباح الغرفة.",
    features: ["إنشاء Web Server", "استخدام ESP32", "كتابة كود HTML مبسط"],
    components: ["ESP32", "Relay Module", "مصباح"],
    wiringGuide: "الريلاي موصل بدبوس 2 في ESP32 (3.3V Logic).",
    codeSnippet: "server.on(\"/on\", [](){ digitalWrite(2, HIGH); server.send(200, \"text/html\", \"ON\"); });"
  },
  {
    id: "bluetooth-robot-car",
    title: "سيارة البلوتوث الكلاسيكية",
    category: "روبوتات",
    difficulty: "صعب",
    duration: "ساعتان",
    description: "تجميع شاسيه سيارة والتحكم بها من خلال تطبيق على الجوال مثل سيارات الألعاب المتقدمة.",
    features: ["التجميع الميكانيكي", "استقبال الأوامر التسلسلية (Serial)", "قيادة محركين L298N"],
    components: ["Arduino Uno", "L298N", "2 DC Motors", "HC-05 Bluetooth"],
    wiringGuide: "L298N بـ 8,9,10,11. البلوتوث بـ RX/TX. طاقة مشتركة.",
    codeSnippet: "if(Serial.available()){ char c = Serial.read(); if(c=='F') goForward(); }"
  },
  {
    id: "obstacle-avoiding-robot",
    title: "السيارة ذاتية القيادة (تجنب العقبات)",
    category: "روبوتات",
    difficulty: "صعب",
    duration: "ساعة ونصف",
    description: "تتحرك السيارة للأمام، وعندما يستشعر السونار جداراً، تتوقف، ترجع للخلف، وتقرر الانعطاف.",
    features: ["القيادة الذاتية (Autonomous)", "المنطق المركب"],
    components: ["سيارة مجمعة مسبقاً", "HC-SR04"],
    wiringGuide: "إضافة حساس المسافة للسيارة السابقة.",
    codeSnippet: "if(dist < 20) { stop(); delay(500); goBack(); delay(500); turnRight(); }"
  },
  {
    id: "smart-door-lock-keypad",
    title: "الخزنة السرية (كلمة المرور)",
    category: "أتمتة المنزل",
    difficulty: "صعب",
    duration: "ساعة",
    description: "الباب لن يفتح إلا إذا كتبت الرقم السري 1234 على لوحة الأرقام. 3 أخطاء تطلق إنذاراً.",
    features: ["استقبال النصوص وتخزينها (Strings)", "مقارنة المصفوفات", "مكتبة Keypad"],
    components: ["Arduino Uno", "4x4 Keypad", "Solenoid Lock", "Relay"],
    wiringGuide: "الكيباد للمنافذ 2-9، الريلاي للمنفذ 10.",
    codeSnippet: "if(key == '#') { checkPassword(); }"
  },
  {
    id: "rfid-attendance",
    title: "نظام تسجيل الحضور بالبطاقات",
    category: "الأنظمة التجارية",
    difficulty: "صعب",
    duration: "ساعة وربع",
    description: "مرر بطاقتك الجامعية الذكية، وسيتحقق النظام من صلاحيتك لفتح بوابة المختبر.",
    features: ["قراءة وتفكيك Hex", "بروتوكول SPI", "الأمان والتحقق"],
    components: ["Arduino Uno", "RC522 RFID", "Servo", "Buzzer"],
    wiringGuide: "SPI (10,11,12,13) لـ RC522، والسيرفو يمثل البوابة.",
    codeSnippet: "if(uid == \"A1B2C3D4\") { openGate(); } else { soundAlarm(); }"
  },
  {
    id: "factory-temp-monitor",
    title: "مراقب المصنع (درجات الحرارة العالية)",
    category: "الأنظمة الصناعية",
    difficulty: "متوسط",
    duration: "45 دقيقة",
    description: "استخدام حساس حرارة صناعي ذو مسبار مقاوم للماء لقياس حرارة سائل يغلي.",
    features: ["التعامل مع حساسات 1-Wire", "دقة القياس"],
    components: ["Arduino Uno", "DS18B20", "مقاومة 4.7K"],
    wiringGuide: "الدبوس الأوسط من الحساس يوصل بالدبوس 2، مع مقاومة 4.7K بينه وبين VCC.",
    codeSnippet: "// استخدام مكتبة DallasTemperature\nsensors.requestTemperatures();\nfloat t = sensors.getTempCByIndex(0);"
  },
  {
    id: "gas-leak-alarm",
    title: "مكتشف تسرب الغاز",
    category: "السلامة",
    difficulty: "سهل",
    duration: "25 دقيقة",
    description: "وضع حساس غاز بجوار أسطوانة المطبخ، يطلق إنذاراً حاداً إذا زادت نسبة الغاز عن حد الأمان.",
    features: ["قراءة تناظرية", "حساسات MQ"],
    components: ["Arduino Uno", "MQ-2 Gas Sensor", "Buzzer"],
    wiringGuide: "A0 لـ MQ-2، رقم 8 للبازر.",
    codeSnippet: "if(analogRead(A0) > 400) { tone(8, 2500); } else { noTone(8); }"
  },
  {
    id: "iot-weather-station",
    title: "محطة الطقس العالمية (IoT)",
    category: "إنترنت الأشياء",
    difficulty: "تخرج",
    duration: "ساعتان",
    description: "محطة أرصاد جوية تقيس الحرارة، الرطوبة، والضغط، وترسلها كل دقيقة لمنصة ThingSpeak لترسم جرافيكس حية.",
    features: ["HTTP GET", "الرفع السحابي", "I2C المتعدد"],
    components: ["ESP32", "BME280", "DHT11"],
    wiringGuide: "BME280 בـ I2C، و DHT11 בـ الدبوس 4.",
    codeSnippet: "http.begin(url + \"&field1=\" + String(t) + \"&field2=\" + String(p));\nhttp.GET();"
  },
  {
    id: "smart-aquarium-monitor",
    title: "مراقب حوض الأسماك الذكي",
    category: "تخرج",
    difficulty: "تخرج",
    duration: "ساعتان",
    description: "تأكد من سلامة أسماكك، يقيس حرارة الماء (بمسبار مغمور)، ومستوى الماء، ويشغل إضاءة ليد في الليل.",
    features: ["الدمج المتعدد", "التعامل مع بيئة مائية"],
    components: ["Arduino Uno", "DS18B20", "Water Level Sensor", "LDR", "Relay"],
    wiringGuide: "دمج بين مشاريع LDR، ومسبار الحرارة، والريلاي.",
    codeSnippet: "if(waterLevel < LOW_LIMIT) { sendAlert(); }"
  },
  {
    id: "line-follower-robot",
    title: "متتبع الخط السريع",
    category: "روبوتات",
    difficulty: "صعب",
    duration: "ساعة ونصف",
    description: "روبوت يسير على شريط أسود متعرج في الأرض بسرعة وموثوقية، ولا يخرج عن المسار.",
    features: ["التحكم الانعكاسي (Reflexive)", "استخدام حساسين IR للحركة التناظرية"],
    components: ["سيارة مجمعة", "2 IR TCRT5000"],
    wiringGuide: "الحساسات موجهة للأرض أسفل مقدمة السيارة.",
    codeSnippet: "if(L == 1 && R == 0) turnRight(); else if(L == 0 && R == 1) turnLeft();"
  }
];
