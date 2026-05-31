export interface Lesson {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  content: string;
  componentsNeeded: string[];
  wiringNotes: string;
  codeExample: string;
  commonMistakes: string;
  simulatorLink?: string;
  nextLessonId?: string;
}

export const lessonsDataPart1: Lesson[] = [
  {
    id: "what-is-arduino",
    title: "ما هو الأردوينو؟ (المفهوم البسيط)",
    category: "أساسيات الأردوينو",
    duration: "10 دقائق",
    description: "فهم الفرق بين الكمبيوتر العادي والمتحكم الدقيق من خلال تشبيه مبسط.",
    content: "الأردوينو هو ببساطة (عقل إلكتروني) صغير. تخيل أنك مدير مصنع (المبرمج)، والأردوينو هو العامل المطيع الذي يقف على خط الإنتاج. تعطيه ورقة تعليمات (الكود)، وهو يقوم بتنفيذها حرفياً وبسرعة هائلة. الأردوينو ليس كمبيوتراً لتشغيل الألعاب أو تصفح الإنترنت، بل هو (متحكم دقيق - Microcontroller) صُمم ليقرأ البيانات من العالم المادي (مثلاً: حرارة، ضغط زر) ويتخذ قراراً فورياً (مثلاً: تشغيل مروحة، إضاءة لمبة).",
    componentsNeeded: ["لوحة Arduino Uno", "كابل USB الطابعة"],
    wiringNotes: "قم بتوصيل الكابل باللوحة ثم بالكمبيوتر. ستلاحظ إضاءة لمبة صغيرة خضراء (ON) تدل على وصول الطاقة.",
    codeExample: "// فهم المبادئ لا يحتاج لكود",
    commonMistakes: "الاعتقاد بأن الأردوينو يمكنه تشغيل نظام ويندوز أو تخزين ملفات ضخمة. ذاكرته صغيرة جداً (32 كيلوبايت) وتكفي فقط لتنفيذ أوامر برمجية نصية.",
    nextLessonId: "arduino-ide-setup"
  },
  {
    id: "arduino-ide-setup",
    title: "تجهيز بيئة العمل (Arduino IDE)",
    category: "أساسيات الأردوينو",
    duration: "15 دقيقة",
    description: "كيف تنزل البرنامج وتتأكد من تعريف اللوحة بنجاح لتكون جاهزاً لكتابة أول كود.",
    content: "لكي نكتب ورقة التعليمات للأردوينو، نحتاج لبرنامج مخصص يُسمى (Arduino IDE) وهو بيئة التطوير المتكاملة. \n1. حمل البرنامج من arduino.cc.\n2. بعد التثبيت، افتح البرنامج. \n3. اذهب إلى قائمة Tools > Board واختر Arduino Uno. \n4. من نفس القائمة اختر Port وحدد المنفذ الذي ظهر (غالباً COM3 في الويندوز أو /dev/ttyUSB0 في الماك/لينكس).\nالآن أنت جاهز للتحدث مع اللوحة.",
    componentsNeeded: ["كمبيوتر", "كابل USB", "Arduino Uno"],
    wiringNotes: "تأكد من توصيل الكابل مباشرة بالكمبيوتر وليس عبر موزع USB (Hub) رخيص لتجنب مشاكل الطاقة.",
    codeExample: "void setup() {\n  // يوضع هنا الكود الذي ينفذ مرة واحدة\n}\n\nvoid loop() {\n  // يوضع هنا الكود الذي يتكرر باستمرار\n}",
    commonMistakes: "نسيان اختيار المنفذ (Port) الصحيح، مما يؤدي لظهور خطأ Upload Error عند محاولة رفع الكود.",
    nextLessonId: "digital-output-led"
  },
  {
    id: "digital-output-led",
    title: "المخرج الرقمي: وميض الليد (Blink)",
    category: "Digital I/O",
    duration: "20 دقيقة",
    description: "البرنامج الأيقوني 'Hello World' في عالم الهاردوير. اجعل الليد المدمج يومض.",
    content: "الدوال الأساسية في الأردوينو تنقسم لقسمين: \n- `setup()`: أوامر تنفذ مرة واحدة عند تشغيل اللوحة، تُستخدم للتهيئة (مثل تحديد الدبوس كمخرج).\n- `loop()`: أوامر تتكرر إلى الأبد (مثل تشغيل الليد ثم إطفائه).\nالمخرج الرقمي يعني حالتين فقط: إما 5V (HIGH) أو 0V (LOW).",
    componentsNeeded: ["Arduino Uno"],
    wiringNotes: "في هذا الدرس لن نحتاج لمكونات خارجية، سنستخدم الليد المدمج في الأردوينو والمتصل داخلياً بالدبوس رقم 13.",
    codeExample: "void setup() {\n  pinMode(13, OUTPUT); // تهيئة المنفذ 13 كمخرج\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH); // تشغيل الليد (5 فولت)\n  delay(1000);            // انتظار ثانية\n  digitalWrite(13, LOW);  // إطفاء الليد (0 فولت)\n  delay(1000);            // انتظار ثانية\n}",
    commonMistakes: "نسيان الفاصلة المنقوطة (;) في نهاية كل سطر برمجي، مما يتسبب في خطأ ترجمة (Compilation error).",
    simulatorLink: "https://wokwi.com/projects/305567166302257730",
    nextLessonId: "breadboard-basics"
  },
  {
    id: "breadboard-basics",
    title: "فهم اللوحة التجريبية (Breadboard)",
    category: "أساسيات التوصيل",
    duration: "15 دقيقة",
    description: "كيف توصل المكونات ببعضها بدون لحام.",
    content: "اللوحة التجريبية مليئة بالثقوب. الثقوب الجانبية (بجوار الخطوط الحمراء والزرقاء) متصلة ببعضها طولياً، وتُستخدم لتوزيع الطاقة (الموجب والسالب) على كامل اللوحة. الثقوب في المنتصف متصلة ببعضها أفقياً (في صفوف قصيرة من 5 ثقوب) وتُستخدم لربط المكونات معاً. تذكر أن المنتصف مفصول بـ 'خندق' يفصل الجانب الأيمن عن الأيسر.",
    componentsNeeded: ["Breadboard", "أسلاك توصيل (Jumpers)", "LED", "مقاومة 220 أوم"],
    wiringNotes: "لتشغيل ليد خارجي، صل الموجب (الأنود - الطرف الطويل) بـ 5V عبر مقاومة، والسالب (الكاثود - الطرف القصير) بـ GND.",
    codeExample: "// فهم التوصيل النظري قبل البرمجة",
    commonMistakes: "توصيل طرفي المكون (كالليد) في نفس الصف الأفقي، مما يسبب قصر كهربائي بين طرفيه ولن يمر التيار عبره.",
    nextLessonId: "ohms-law"
  },
  {
    id: "ohms-law",
    title: "قانون أوم (لماذا نحتاج المقاومة؟)",
    category: "أساسيات الإلكترونيات",
    duration: "25 دقيقة",
    description: "حماية الليدات من الاحتراق بفهم بسيط للتيار والجهد.",
    content: "الجهد (الفولت) هو 'الضغط' الذي يدفع الكهرباء. التيار (الأمبير) هو كمية الكهرباء المارة. الأردوينو يعطي 5V، بينما الليد الأحمر الصغير يحتاج 2V فقط، وسيحاول سحب تيار هائل يؤدي لاحتراقه فورا. المقاومة تعمل كـ 'مطب سرعة' يقلل التيار ويستهلك الجهد الزائد. قانون أوم: V = I * R.",
    componentsNeeded: ["LED", "مقاومات مختلفة القيم (220، 1K، 10K)", "بطارية أو أردوينو"],
    wiringNotes: "جرب توصيل الليد بمقاومة 220 أوم ولاحظ الإضاءة، ثم استبدلها بـ 10K أوم ولاحظ كيف أصبح الليد باهتاً جداً.",
    codeExample: "// تجربة فيزيائية لا تحتاج لكود",
    commonMistakes: "توصيل الليد بدون مقاومة بالـ 5V مباشرة، سيومض الليد بسرعة ثم يحترق ويصدر رائحة تلف.",
    nextLessonId: "digital-input-button"
  },
  {
    id: "digital-input-button",
    title: "المدخل الرقمي: قراءة الأزرار",
    category: "Digital I/O",
    duration: "25 دقيقة",
    description: "كيف يعرف الأردوينو أنك ضغطت على الزر؟",
    content: "لنجعل الأردوينو يشعر بالبيئة، نستخدم digitalRead(). الأزرار تعمل كمفاتيح تقطع أو توصل التيار. لكن إذا كان الزر غير مضغوط، هل الدبوس يقرأ 0 أم 1؟ الإجابة: سيقرأ قيماً عشوائية لأنه 'عائم' ويتأثر بالكهرباء الساكنة بالهواء. لحل هذا، نستخدم مقاومة سحب (Pull-down) لربطه بـ GND ليكون 0 باستقرار، أو نسهل الأمر ونستخدم المقاومة المدمجة داخل الأردوينو باستخدام وضع INPUT_PULLUP.",
    componentsNeeded: ["Arduino Uno", "زر ضغاط (Push Button)", "أسلاك"],
    wiringNotes: "صل أحد طرفي الزر بـ GND والطرف الآخر بالدبوس 2. سنستخدم INPUT_PULLUP داخلياً.",
    codeExample: "void setup() {\n  pinMode(2, INPUT_PULLUP);\n  pinMode(13, OUTPUT);\n}\nvoid loop() {\n  // الزر يعطي LOW عند الضغط لأنه موصل بالـ GND\n  if (digitalRead(2) == LOW) {\n    digitalWrite(13, HIGH);\n  } else {\n    digitalWrite(13, LOW);\n  }\n}",
    commonMistakes: "نسيان استخدام PULLUP مما يجعل الليد يومض عشوائياً بمجرد اقتراب يدك من الزر.",
    simulatorLink: "https://wokwi.com/projects/305569485123224130",
    nextLessonId: "analog-output-pwm"
  },
  {
    id: "analog-output-pwm",
    title: "المخرج التناظري المزيف (PWM)",
    category: "Analog I/O",
    duration: "20 دقيقة",
    description: "الأردوينو لا يمكنه إخراج 3 فولت، إما 0 أو 5. فكيف نتحكم في إضاءة الليد تدريجياً؟",
    content: "تقنية تعديل عرض النبضة (PWM) هي خدعة بصرية. الأردوينو يفتح ويغلق 5V بسرعة هائلة (مئات المرات في الثانية). إذا كان مفتوحاً نصف الوقت ومغلقاً نصف الوقت، العين ترى الليد يضيء بنصف قوته (متوسط 2.5V). الدبابيس التي تدعم هذه الخدعة بجوارها علامة المد (~).",
    componentsNeeded: ["Arduino Uno", "LED", "مقاومة 220 أوم"],
    wiringNotes: "صل الليد بالدبوس 9 (أو 3، 5، 6، 10، 11) عبر مقاومة.",
    codeExample: "void setup() {\n  pinMode(9, OUTPUT);\n}\nvoid loop() {\n  // تدرج الإضاءة من 0 (مطفأ) إلى 255 (أقصى إضاءة)\n  for(int i = 0; i <= 255; i++) {\n    analogWrite(9, i);\n    delay(10);\n  }\n}",
    commonMistakes: "استخدام analogWrite() على دبوس لا يحتوي على علامة (~)، الليد لن يتدرج بل سيُضاء وينطفئ فجأة.",
    nextLessonId: "analog-input-potentiometer"
  },
  {
    id: "analog-input-potentiometer",
    title: "المدخل التناظري: المقاومة المتغيرة",
    category: "Analog I/O",
    duration: "25 دقيقة",
    description: "قراءة قيم متدرجة بدلاً من 0 و 1 فقط.",
    content: "الأردوينو يمتلك محول إشارات تناظرية إلى رقمية (ADC) بدقة 10 بت. هذا يعني أنه يقرأ الجهد من 0V إلى 5V ويحوله إلى رقم دقيق بين 0 و 1023. الدبابيس A0 إلى A5 مخصصة لذلك. البوتنشيومتر (المقاومة المتغيرة) تعمل كمقسم جهد، كلما أدرت المفتاح، تغير الجهد الداخل للدبوس.",
    componentsNeeded: ["Arduino Uno", "مقاومة متغيرة (Potentiometer)"],
    wiringNotes: "الطرف الأيمن بـ 5V، الأيسر بـ GND، والطرف الأوسط بدبوس A0.",
    codeExample: "void setup() {\n  Serial.begin(9600);\n}\nvoid loop() {\n  int sensorValue = analogRead(A0);\n  Serial.println(sensorValue); // يعرض القيم من 0 لـ 1023\n  delay(100);\n}",
    commonMistakes: "توصيل الطرف الأوسط بالـ 5V والطرف الجانبي بـ A0 سيؤدي إما لعدم تغير القراءة أو قصر كهربائي عند لف المفتاح للآخر.",
    simulatorLink: "https://wokwi.com/projects/305569894747341378",
    nextLessonId: "serial-monitor"
  },
  {
    id: "serial-monitor",
    title: "مراقب السيريال (Serial Monitor)",
    category: "التواصل والتشخيص",
    duration: "15 دقيقة",
    description: "كيف تجعل الأردوينو يتحدث إليك ويرسل رسائل نصية لشاشة الكمبيوتر.",
    content: "السيريال مونيتور هي نافذتك لداخل عقل الأردوينو. بدونها، أنت تطير أعمى ولا تعرف ماذا تقرأ الحساسات. دالة `Serial.begin(9600)` تهيئ الاتصال بسرعة 9600 بت في الثانية. `Serial.print()` تطبع النص، و `Serial.println()` تطبعه وتنزل سطراً جديداً. يمكن استخدامها لاكتشاف الأخطاء (Debugging).",
    componentsNeeded: ["Arduino Uno"],
    wiringNotes: "يعمل عبر كابل الـ USB مباشرة (الدبابيس 0 و 1 تُستخدم للاتصال التسلسلي داخلياً).",
    codeExample: "int counter = 0;\nvoid setup() {\n  Serial.begin(9600);\n  Serial.println(\"Hello, IoT Lab!\");\n}\nvoid loop() {\n  counter++;\n  Serial.print(\"Counter is: \");\n  Serial.println(counter);\n  delay(1000);\n}",
    commonMistakes: "سرعة البود (Baud Rate) في أسفل نافذة السيريال مونيتور لا تتطابق مع الرقم في Serial.begin()، مما يظهر نصوصاً هيروغليفية غريبة.",
    nextLessonId: "ultrasonic-sensor"
  },
  {
    id: "ultrasonic-sensor",
    title: "حساس المسافة (Ultrasonic HC-SR04)",
    category: "الحساسات",
    duration: "30 دقيقة",
    description: "قياس المسافة بالسنتيمتر كما تفعل الخفافيش.",
    content: "حساس الموجات فوق الصوتية يحتوي على 'سماعة' ترسل نبضة صوتية (Trig)، و 'ميكروفون' يستمع للصدى المرتد (Echo). سرعة الصوت معروفة (340 متر/ثانية). من خلال حساب الزمن الذي استغرقته النبضة للذهاب والعودة، يقسم الأردوينو الزمن على 2 ليحسب المسافة بدقة جيدة.",
    componentsNeeded: ["Arduino Uno", "HC-SR04", "أسلاك"],
    wiringNotes: "VCC بـ 5V، GND بـ GND، Trig بدبوس 9، Echo بدبوس 10.",
    codeExample: "const int trigPin = 9;\nconst int echoPin = 10;\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(trigPin, OUTPUT);\n  pinMode(echoPin, INPUT);\n}\nvoid loop() {\n  digitalWrite(trigPin, LOW); delayMicroseconds(2);\n  digitalWrite(trigPin, HIGH); delayMicroseconds(10);\n  digitalWrite(trigPin, LOW);\n  long duration = pulseIn(echoPin, HIGH);\n  int distance = duration * 0.034 / 2;\n  Serial.print(\"Distance: \"); Serial.println(distance);\n  delay(500);\n}",
    commonMistakes: "توصيل Trig كمدخل و Echo كمخرج بالخطأ، مما يجعل القراءة دائماً 0.",
    simulatorLink: "https://wokwi.com/projects/299313271173677576",
    nextLessonId: "dht11-basics"
  },
  {
    id: "dht11-basics",
    title: "حساس الحرارة والرطوبة (DHT11)",
    category: "الحساسات",
    duration: "25 دقيقة",
    description: "كيف تعرف الجو المحيط بالغرفة؟ مقدمة لاستخدام المكتبات الجاهزة.",
    content: "بعض الحساسات ترسل بياناتها كإشارات تماثلية بسيطة، لكن DHT11 يرسل حزمة بيانات رقمية معقدة جداً. بدلاً من كتابة 100 سطر لفك تشفيرها، نستخدم (المكتبات). المكتبة هي كود كتبه مبرمجون آخرون يختصر علينا العمل. يجب تنزيل مكتبة DHT من مدير المكتبات في Arduino IDE.",
    componentsNeeded: ["Arduino Uno", "حساس DHT11", "مقاومة 10K"],
    wiringNotes: "VCC بـ 5V. طرف البيانات بالدبوس 2 مع مقاومة سحب 10K لـ VCC (بعض موديلات DHT11 تأتي بـ 3 أطراف والمقاومة مدمجة). GND بـ GND.",
    codeExample: "#include <DHT.h>\n#define DHTPIN 2\n#define DHTTYPE DHT11\nDHT dht(DHTPIN, DHTTYPE);\n\nvoid setup() {\n  Serial.begin(9600);\n  dht.begin();\n}\nvoid loop() {\n  float h = dht.readHumidity();\n  float t = dht.readTemperature();\n  if (isnan(h) || isnan(t)) { Serial.println(\"Failed\"); return; }\n  Serial.print(\"Temp: \"); Serial.print(t);\n  Serial.print(\" C, Humidity: \"); Serial.println(h);\n  delay(2000);\n}",
    commonMistakes: "محاولة قراءة الحساس بسرعة كبيرة، DHT11 يحتاج على الأقل ثانيتين بين كل قراءة وأخرى.",
    simulatorLink: "https://wokwi.com/projects/305572629618131522",
    nextLessonId: "servo-motors"
  },
  {
    id: "servo-motors",
    title: "محركات السيرفو (تحكم دقيق بالزوايا)",
    category: "المحركات",
    duration: "25 دقيقة",
    description: "كيف تحرك ذراعاً آلياً بدقة للزاوية 90 أو 180 درجة.",
    content: "السيرفو ليس محركاً يدور بلا توقف. بل يحتوي على محرك DC، صندوق تروس (Gears)، ودائرة تحكم تقرأ إشارات الـ PWM من الأردوينو وتترجمها لزاوية دقيقة بين 0 و 180 درجة. نستخدم مكتبة `<Servo.h>` المدمجة للتحكم به بسهولة عبر دالة `write(angle)`.",
    componentsNeeded: ["Arduino Uno", "محرك Servo SG90 صغير"],
    wiringNotes: "السلك البني/الأسود بـ GND، الأحمر بـ 5V، البرتقالي/الأصفر بدبوس يدعم PWM (مثل دبوس 9).",
    codeExample: "#include <Servo.h>\nServo myServo;\n\nvoid setup() {\n  myServo.attach(9); // ربط السيرفو بالدبوس 9\n}\nvoid loop() {\n  myServo.write(0); delay(1000);\n  myServo.write(90); delay(1000);\n  myServo.write(180); delay(1000);\n}",
    commonMistakes: "استخدام سيرفو كبير (مثل MG996R) وتشغيله من طاقة الأردوينو مباشرة، سيسبب انقطاع الطاقة وإعادة تشغيل الأردوينو بشكل مستمر. يجب استخدام بطارية خارجية للسيرفو الكبير.",
    simulatorLink: "https://wokwi.com/projects/305570087786021442",
    nextLessonId: "dc-motors"
  },
  {
    id: "dc-motors",
    title: "محركات التيار المستمر (DC Motors) والدرايفر",
    category: "المحركات",
    duration: "30 دقيقة",
    description: "كيف تصنع سيارة روبوت ولماذا نحتاج L298N.",
    content: "محرك DC يدور باستمرار، ويعكس اتجاهه إذا عكست أقطاب البطارية. **قاعدة ذهبية:** لا توصل محرك DC بدبابيس الأردوينو أبداً! الأردوينو يعطي 20mA كحد أقصى، والمحرك يسحب 500mA أو أكثر مما يحرق الدبوس فورا. الحل هو استخدام 'متحكم محركات' (Motor Driver) مثل L298N، والذي يتلقى إشارات تحكم ضعيفة من الأردوينو ويفتح بوابة لتيار البطارية القوي للمحرك.",
    componentsNeeded: ["Arduino Uno", "Motor Driver L298N", "DC Motor", "بطارية 9V أو 18650"],
    wiringNotes: "بطارية 9V تدخل لـ 12V في L298N. نوصل GND الـ L298N بـ GND الأردوينو (مهم جداً). أقطاب المحرك بـ OUT1 و OUT2. دبابيس التحكم IN1 و IN2 لدبابيس 8 و 9 في الأردوينو.",
    codeExample: "const int in1 = 8;\nconst int in2 = 9;\nvoid setup() {\n  pinMode(in1, OUTPUT);\n  pinMode(in2, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(in1, HIGH); digitalWrite(in2, LOW); // دوران يمين\n  delay(2000);\n  digitalWrite(in1, LOW); digitalWrite(in2, LOW); // توقف\n  delay(1000);\n  digitalWrite(in1, LOW); digitalWrite(in2, HIGH); // دوران يسار\n  delay(2000);\n}",
    commonMistakes: "عدم ربط سلك الـ GND بين L298N والأردوينو. بدون هذا السلك المشترك، إشارات التحكم لن تُفهم وستدور المحركات بشكل عشوائي أو لا تدور.",
    nextLessonId: "lcd-i2c-basics"
  },
  {
    id: "lcd-i2c-basics",
    title: "شاشات الكريستال السائل (LCD I2C)",
    category: "الشاشات",
    duration: "25 دقيقة",
    description: "طباعة الرسائل بوضوح باستخدام 4 أسلاك فقط.",
    content: "شاشات الـ LCD التقليدية تتطلب 6 أسلاك بيانات، مما يستنزف منافذ الأردوينو. لذلك نستخدم موديول I2C الملحوم خلف الشاشة، والذي يختزل الأسلاك إلى 4 فقط (طاقتين، وسلكين للبيانات SDA و SCL). بروتوكول I2C يسمح بتوصيل عدة أجهزة على نفس السلكين طالما أن لكل جهاز 'عنوان' مختلف (Address).",
    componentsNeeded: ["Arduino Uno", "شاشة LCD 16x2 مع موديول I2C"],
    wiringNotes: "VCC بـ 5V، GND بـ GND. سلك SDA يُوصل بدبوس A4 في الأونو، و SCL بدبوس A5.",
    codeExample: "#include <Wire.h>\n#include <LiquidCrystal_I2C.h>\nLiquidCrystal_I2C lcd(0x27, 16, 2); // العنوان غالباً 0x27 أو 0x3F\n\nvoid setup() {\n  lcd.init();\n  lcd.backlight();\n  lcd.setCursor(0, 0); // العمود 0، الصف 0\n  lcd.print(\"Darhous IoT Lab\");\n}\nvoid loop() {\n  lcd.setCursor(0, 1);\n  lcd.print(millis() / 1000);\n  delay(1000);\n}",
    commonMistakes: "شاشة مضيئة كلياً أو أزرار مربعات سوداء ولكن لا نص؟ جرب تدوير المسمار النحاسي الصغير (Potentiometer) خلف الموديول لضبط التباين (Contrast) بمفك.",
    nextLessonId: "relay-safety"
  },
  {
    id: "relay-safety",
    title: "الريلاي والتحكم بجهد 220 فولت",
    category: "التحكم العالي والسلامة",
    duration: "30 دقيقة",
    description: "كيف تشغل مصباح المنزل عبر الأردوينو بأمان.",
    content: "الريلاي (Relay) هو مفتاح ميكانيكي يتم تشغيله كهرومغناطيسياً. يمر تيار 5V من الأردوينو ليجذب قطعة معدنية داخل الريلاي 'تك'، فتغلق دائرة تيار عالٍ 220V من الجهة الأخرى. الأردوينو معزول تماماً. **تحذير صارم:** الكهرباء المنزلية مميتة! لا تعمل على هذا المشروع والكهرباء موصولة، استخدم شريطاً لاصقاً لعزل الأسلاك المكشوفة وتأكد من قطع سلك 'الحار' (Live) فقط ليمر عبر الريلاي.",
    componentsNeeded: ["Arduino Uno", "Relay Module 1 Channel", "مصباح أو مروحة صغيرة"],
    wiringNotes: "طاقة الريلاي: VCC و GND و IN للأردوينو. جهة الجهد العالي: السلك المقطوع يوصل بطرفي COM (المشترك) و NO (Normally Open).",
    codeExample: "const int relayPin = 7;\nvoid setup() {\n  pinMode(relayPin, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(relayPin, HIGH); // بعض موديلات الريلاي تعمل بـ LOW لتشغيلها\n  delay(5000);\n  digitalWrite(relayPin, LOW);\n  delay(5000);\n}",
    commonMistakes: "توصيل السلكين (الحار والبارد معاً) داخل الريلاي، هذا سيسبب قصر كهربائي هائل وانفجار عند تشغيل الريلاي. الريلاي يقطع سلكاً واحداً فقط كما يفعل مفتاح الإضاءة في الجدار.",
    nextLessonId: "esp32-intro"
  }
];
