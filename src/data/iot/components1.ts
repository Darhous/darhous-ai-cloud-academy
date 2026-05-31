export interface ComponentData {
  id: string;
  name: string;
  category: "أردوينو ومتحكمات" | "مستشعرات" | "محركات ومخرجات" | "شاشات" | "طاقة وأسلاك" | "أخرى";
  description: string;
  pins: { name: string; description: string }[];
  priceRange?: string;
  buyLink?: string;
}

export const componentsDataPart1: ComponentData[] = [
  // أردوينو ومتحكمات (12)
  {
    id: "arduino-uno", name: "Arduino Uno R3", category: "أردوينو ومتحكمات", priceRange: "10$ - 25$",
    description: "اللوحة الأشهر والأكثر استخداماً عالمياً للمبتدئين. تعتمد على معالج ATmega328P وتدعم كل الإضافات (Shields).",
    pins: [{ name: "5V/3.3V", description: "مخرج طاقة" }, { name: "A0-A5", description: "مداخل تناظرية" }, { name: "D0-D13", description: "منافذ رقمية (يدعم PWM في بعضها)" }]
  },
  {
    id: "arduino-nano", name: "Arduino Nano", category: "أردوينو ومتحكمات", priceRange: "5$ - 10$",
    description: "نسخة مصغرة من الأونو، مصممة لتُركب مباشرة على اللوحة التجريبية (Breadboard) وتوفر مساحة.",
    pins: [{ name: "Vin", description: "مدخل طاقة" }, { name: "A0-A7", description: "مداخل تناظرية (أكثر من الأونو)" }, { name: "D0-D13", description: "رقمي" }]
  },
  {
    id: "arduino-mega", name: "Arduino Mega 2560", category: "أردوينو ومتحكمات", priceRange: "15$ - 40$",
    description: "لوحة ضخمة للمشاريع المعقدة التي تحتاج لعشرات الحساسات، توفر 54 منفذ رقمي وذاكرة أكبر.",
    pins: [{ name: "D0-D53", description: "منافذ رقمية" }, { name: "A0-A15", description: "مداخل تناظرية" }]
  },
  {
    id: "esp32", name: "ESP32 DevKit", category: "أردوينو ومتحكمات", priceRange: "6$ - 15$",
    description: "أقوى من الأردوينو بـ 10 مرات، يعمل بـ 3.3V ويحتوي على واي فاي وبلوتوث مدمج. الخيار الأول للـ IoT.",
    pins: [{ name: "3V3", description: "مدخل/مخرج 3.3 فولت" }, { name: "GPIOs", description: "معظم الدبابيس تدعم PWM وتناظري ورقمي" }]
  },
  {
    id: "esp8266", name: "ESP8266 (NodeMCU)", category: "أردوينو ومتحكمات", priceRange: "4$ - 8$",
    description: "الأخ الأصغر لـ ESP32، يحتوي على واي فاي فقط ومنافذ أقل، لكنه رخيص جداً وممتاز للمشاريع البسيطة المتصلة بالإنترنت.",
    pins: [{ name: "D0-D8", description: "رقمي" }, { name: "A0", description: "المنفذ التناظري الوحيد (يقرأ بحد أقصى 1V أو 3.3V حسب اللوحة)" }]
  },
  {
    id: "raspberry-pi-pico", name: "Raspberry Pi Pico", category: "أردوينو ومتحكمات", priceRange: "4$ - 8$",
    description: "لوحة قوية جداً برمجياً بمعالج RP2040 ثنائي النواة، تدعم C++ و MicroPython بسلاسة تامة.",
    pins: [{ name: "GP0-GP28", description: "دبابيس متعددة المهام" }, { name: "VSYS", description: "مدخل الطاقة الرئيسي" }]
  },
  {
    id: "arduino-promini", name: "Arduino Pro Mini", category: "أردوينو ومتحكمات", priceRange: "3$ - 6$",
    description: "لوحة أردوينو نقية لا تحتوي على منفذ USB لتوفير الطاقة والحجم، تُبرمج عبر مبرمج FTDI خارجي.",
    pins: [{ name: "RX/TX", description: "للبرمجة" }, { name: "VCC", description: "5V أو 3.3V حسب النسخة" }]
  },
  {
    id: "attiny85", name: "ATtiny85 IC", category: "أردوينو ومتحكمات", priceRange: "1$ - 3$",
    description: "شريحة متحكم دقيق صغيرة بـ 8 دبابيس فقط للمشاريع الميكروية القابلة للارتداء.",
    pins: [{ name: "PB0-PB4", description: "5 منافذ فقط (رقمي/تناظري/PWM)" }, { name: "VCC/GND", description: "للطاقة" }]
  },
  {
    id: "esp32-cam", name: "ESP32-CAM", category: "أردوينو ومتحكمات", priceRange: "8$ - 15$",
    description: "لوحة ESP32 مدمج معها كاميرا OV2640 ومنفذ SD Card، مثالية لبث الفيديو ومشاريع التعرف على الأوجه.",
    pins: [{ name: "U0R/U0T", description: "للبرمجة عبر FTDI" }, { name: "5V", description: "للطاقة وتجنب مشاكل التشويش" }]
  },
  {
    id: "stm32", name: "STM32 (Blue Pill)", category: "أردوينو ومتحكمات", priceRange: "3$ - 7$",
    description: "لوحة قوية تعتمد على معالج ARM 32-bit أسرع بكثير من الأردوينو ومناسبة للتطبيقات الصناعية.",
    pins: [{ name: "PA0-PA15", description: "منافذ GPIO" }, { name: "PB0-PB15", description: "منافذ GPIO" }]
  },
  {
    id: "bbc-microbit", name: "BBC Micro:bit", category: "أردوينو ومتحكمات", priceRange: "15$ - 25$",
    description: "لوحة تعليمية للأطفال والمبتدئين، تحتوي على مصفوفة ليدات وحساس حرارة وبلوتوث وتُبرمج بالبلوكات (Blocks).",
    pins: [{ name: "0, 1, 2", description: "دبابيس رئيسية كبيرة" }, { name: "3V, GND", description: "للطاقة" }]
  },
  {
    id: "arduino-leonardo", name: "Arduino Leonardo", category: "أردوينو ومتحكمات", priceRange: "12$ - 20$",
    description: "يشبه الأونو ولكنه يتعرف على الكمبيوتر كأنه (كيبورد أو ماوس)، ممتاز لصنع أجهزة تحكم للألعاب.",
    pins: [{ name: "SDA/SCL", description: "I2C" }, { name: "D0-D13", description: "منافذ رقمية" }]
  },

  // مستشعرات - بيئة وإضاءة ومسافة (20)
  {
    id: "hc-sr04", name: "HC-SR04 Ultrasonic", category: "مستشعرات", priceRange: "1$ - 3$",
    description: "حساس قياس مسافة كلاسيكي يرسل موجة صوتية ويستقبل صداها لقياس المسافة بين 2 سم إلى 4 أمتار.",
    pins: [{ name: "Trig", description: "إرسال النبضة" }, { name: "Echo", description: "استقبال الصدى" }]
  },
  {
    id: "dht11", name: "DHT11 Temp & Humidity", category: "مستشعرات", priceRange: "1$ - 2$",
    description: "حساس رخيص وبسيط لقياس درجة حرارة الغرفة (0-50°C) والرطوبة. أداؤه بطيء قليلاً.",
    pins: [{ name: "Data", description: "يرسل البيانات الرقمية المعقدة (يحتاج مكتبة)" }]
  },
  {
    id: "dht22", name: "DHT22 (AM2302)", category: "مستشعرات", priceRange: "4$ - 6$",
    description: "النسخة البيضاء والمطورة من DHT11، تقيس مدى أوسع من الحرارة (حتى تحت الصفر) بدقة أعلى بكثير.",
    pins: [{ name: "Data", description: "دبوس الإشارة" }]
  },
  {
    id: "ldr", name: "LDR Photoresistor", category: "مستشعرات", priceRange: "0.2$ - 0.5$",
    description: "مقاومة تعتمد على الضوء، تقل مقاومتها بزيادة الضوء لتستشعر النهار والليل.",
    pins: [{ name: "Leg 1 / Leg 2", description: "لا يهم القطبية، تُوصل كمقسم جهد" }]
  },
  {
    id: "pir-hc-sr501", name: "HC-SR501 PIR Motion", category: "مستشعرات", priceRange: "1$ - 3$",
    description: "يكتشف حركة الكائنات الحية عبر تتبع حرارة الأشعة تحت الحمراء. ممتاز لأنظمة الإنذار.",
    pins: [{ name: "OUT", description: "إشارة HIGH عند اكتشاف حركة" }]
  },
  {
    id: "mq2-gas", name: "MQ-2 Gas Sensor", category: "مستشعرات", priceRange: "2$ - 4$",
    description: "يستشعر الدخان والغازات القابلة للاشتعال (كالميثان والبروبان). يحتاج لتيار عالي لتسخينه داخلياً.",
    pins: [{ name: "A0", description: "قراءة تركيز الغاز" }, { name: "D0", description: "إشارة إنذار رقمية بناء على مسمار الضبط" }]
  },
  {
    id: "mq135-air", name: "MQ-135 Air Quality", category: "مستشعرات", priceRange: "3$ - 5$",
    description: "مخصص لقياس جودة الهواء واكتشاف غازات כמו الأمونيا وثاني أكسيد الكربون.",
    pins: [{ name: "A0", description: "الإشارة التناظرية للتركيز" }]
  },
  {
    id: "soil-moisture", name: "Soil Moisture Sensor", category: "مستشعرات", priceRange: "1$ - 2$",
    description: "يقيس رطوبة التربة للنباتات عبر مقاومة الشوكتين. عيبه أنه يتآكل مع الوقت.",
    pins: [{ name: "A0", description: "مستوى الرطوبة" }]
  },
  {
    id: "capacitive-soil", name: "Capacitive Soil Sensor", category: "مستشعرات", priceRange: "2$ - 4$",
    description: "نسخة حديثة من حساس التربة يقيس السعة الكهربائية بدلاً من المقاومة، لذا لا يصدأ ويعيش طويلاً.",
    pins: [{ name: "AOUT", description: "قراءة تناظرية عكسية (الماء يقلل الجهد)" }]
  },
  {
    id: "water-level", name: "Water Level Sensor", category: "مستشعرات", priceRange: "1$ - 2$",
    description: "قطعة بها خطوط نحاسية متوازية، كلما غمرت في الماء أكثر تغيرت القراءة التناظرية لمعرفة عمق الماء.",
    pins: [{ name: "S", description: "إشارة تناظرية" }]
  },
  {
    id: "sound-sensor", name: "Sound Sensor (KY-038)", category: "مستشعرات", priceRange: "1$ - 2$",
    description: "يحتوي على ميكروفون صغير يكتشف الأصوات العالية كالتصفيق أو الضجيج لإطلاق إنذار.",
    pins: [{ name: "A0", description: "حجم الصوت (غير دقيق)" }, { name: "D0", description: "HIGH عند تجاوز حد الصوت" }]
  },
  {
    id: "ir-obstacle", name: "IR Obstacle Sensor", category: "مستشعرات", priceRange: "1$ - 2$",
    description: "يحتوي على ليد يرسل أشعة تحت حمراء وآخر يستقبلها إذا اصطدمت بحاجز وعادت. مداه قصير (2-30 سم).",
    pins: [{ name: "OUT", description: "LOW عند وجود حاجز" }]
  },
  {
    id: "tcrt5000", name: "TCRT5000 Line Tracking", category: "مستشعرات", priceRange: "1$ - 2$",
    description: "حساس IR موجه للأرض للتفريق بين السطح الأبيض (عاكس) والخط الأسود (ممتص للضوء) في سيارات تتبع المسار.",
    pins: [{ name: "D0", description: "إشارة الخط" }]
  },
  {
    id: "ds18b20", name: "DS18B20 Water Temp", category: "مستشعرات", priceRange: "3$ - 6$",
    description: "حساس حرارة دقيق ومقاوم للماء في غلاف معدني، يُستخدم في السوائل وبيئة المصانع.",
    pins: [{ name: "Data", description: "يعمل ببروتوكول 1-Wire (يتطلب مقاومة 4.7K)" }]
  },
  {
    id: "bme280", name: "BME280 Env Sensor", category: "مستشعرات", priceRange: "5$ - 10$",
    description: "حساس احترافي يقيس (الحرارة، الرطوبة، الضغط الجوي) في شريحة واحدة صغيرة عبر I2C.",
    pins: [{ name: "SDA/SCL", description: "واجهة I2C" }]
  },
  {
    id: "mpu6050", name: "MPU6050 Gyro/Accel", category: "مستشعرات", priceRange: "3$ - 6$",
    description: "حساس قياس الميلان (الجايروسكوب) والتسارع بـ 6 محاور، أساسي للطائرات بدون طيار والروبوتات المتوازنة.",
    pins: [{ name: "SDA/SCL", description: "I2C" }, { name: "INT", description: "Interrupt pin للحركة المفاجئة" }]
  },
  {
    id: "flame-sensor", name: "Flame Sensor", category: "مستشعرات", priceRange: "1$ - 3$",
    description: "حساس IR مضبوط على التردد الضوئي الصادر من ألسنة اللهب، يكتشف الحريق على مسافة قصيرة.",
    pins: [{ name: "D0", description: "إنذار الحريق" }]
  },
  {
    id: "hall-sensor", name: "Hall Effect Sensor", category: "مستشعرات", priceRange: "1$ - 2$",
    description: "يستشعر وجود المجال المغناطيسي. مفيد لعمل مفاتيح بدون تلامس أو حساب عدد لفات عجلة الروبوت.",
    pins: [{ name: "Signal", description: "قراءة المجال المغناطيسي" }]
  },
  {
    id: "rfid-rc522", name: "RFID RC522", category: "مستشعرات", priceRange: "3$ - 6$",
    description: "قارئ بطاقات ذكية يعتمد على موجات الراديو (13.56MHz)، أساسي لأنظمة الأمان والحضور.",
    pins: [{ name: "SPI Pins", description: "MISO, MOSI, SCK, CS" }, { name: "3.3V", description: "حذارِ من توصيله بـ 5V" }]
  },
  {
    id: "fingerprint-as608", name: "AS608 Fingerprint", category: "مستشعرات", priceRange: "15$ - 25$",
    description: "حساس بصمة الإصبع البصري، يحفظ البصمات في ذاكرته الداخلية ويرسل فقط (رقم المعرف ID) للأردوينو عند التطابق.",
    pins: [{ name: "TX/RX", description: "اتصال تسلسلي (Serial)" }]
  },

  // محركات ومخرجات (15)
  {
    id: "led-5mm", name: "5mm LED", category: "محركات ومخرجات", priceRange: "0.05$",
    description: "الدايود الباعث للضوء، يتطلب دائماً مقاومة (220 أو 330 أوم) لحمايته من تيار الأردوينو.",
    pins: [{ name: "Anode (طويل)", description: "الموجب" }, { name: "Cathode (قصير)", description: "السالب GND" }]
  },
  {
    id: "rgb-led", name: "RGB LED", category: "محركات ومخرجات", priceRange: "0.2$",
    description: "ليد يجمع 3 ألوان بداخله (أحمر، أخضر، أزرق). يمكن دمجها لتوليد أي لون عبر الـ PWM.",
    pins: [{ name: "Common", description: "كاثود مشترك (أو أنود)" }, { name: "R, G, B", description: "أرجل الألوان" }]
  },
  {
    id: "ws2812b", name: "WS2812B NeoPixel", category: "محركات ومخرجات", priceRange: "5$ للمتر",
    description: "شريط إضاءة ذكي، يمكن التحكم بكل ليد على حدة بلون وسطوع مختلف باستخدام دبوس واحد فقط.",
    pins: [{ name: "DIN", description: "إدخال البيانات" }, { name: "5V/GND", description: "طاقة خارجية ضرورية" }]
  },
  {
    id: "passive-buzzer", name: "Passive Buzzer", category: "محركات ومخرجات", priceRange: "0.5$",
    description: "مكبر صوت بيزو صغير، يتطلب إرسال ترددات (PWM) عبر دالة tone() لعزف نغمات موسيقية.",
    pins: [{ name: "+", description: "إشارة الـ PWM" }]
  },
  {
    id: "active-buzzer", name: "Active Buzzer", category: "محركات ومخرجات", priceRange: "0.5$",
    description: "يصدر صوتاً واحداً ثابتاً بمجرد توصيل 5V إليه. ممتاز لإنذارات الحريق.",
    pins: [{ name: "+", description: "5V أو دبوس ديجيتال HIGH" }]
  },
  {
    id: "servo-sg90", name: "Servo Motor SG90", category: "محركات ومخرجات", priceRange: "2$ - 4$",
    description: "محرك صغير وخفيف يتحرك بزاوية 180 درجة بدقة. مثالي للأذرع الآلية الصغيرة وفتح الأبواب.",
    pins: [{ name: "Signal (البرتقالي)", description: "إشارة PWM للزاوية" }, { name: "5V/GND", description: "طاقة المحرك" }]
  },
  {
    id: "servo-mg996r", name: "Servo Motor MG996R", category: "محركات ومخرجات", priceRange: "6$ - 10$",
    description: "سيرفو ذو تروس معدنية قوي جداً يتحمل أوزان ثقيلة، لكنه يسحب تياراً عالياً وقد يحرق الأردوينو إذا لم يفصل مصدر طاقته.",
    pins: [{ name: "Signal", description: "تحكم الزاوية" }]
  },
  {
    id: "dc-motor", name: "DC Motor (TT Gear)", category: "محركات ومخرجات", priceRange: "1$ - 2$",
    description: "المحرك الأصفر الشهير المستخدم لعجلات سيارات الروبوت. سرعته عالية لكنه يتطلب درايفر للتحكم به.",
    pins: [{ name: "Terminal 1/2", description: "عكس الأقطاب يعكس الدوران" }]
  },
  {
    id: "stepper-28byj", name: "Stepper Motor 28BYJ-48", category: "محركات ومخرجات", priceRange: "2$ - 4$",
    description: "محرك يخطو خطوات دقيقة جداً ومعه درايفر ULN2003، ممتاز للمشاريع التي تتطلب سرعة بطيئة جداً وموقعاً دقيقاً.",
    pins: [{ name: "IN1-IN4", description: "للدرايفر" }]
  },
  {
    id: "nema-17", name: "NEMA 17 Stepper", category: "محركات ومخرجات", priceRange: "10$ - 15$",
    description: "المحرك الاحترافي لطابعات الـ 3D، دقيق وقوي جداً، ويتطلب درايفر متقدم مثل A4988.",
    pins: [{ name: "Coil A / Coil B", description: "4 أسلاك للتحكم بالملفات" }]
  },
  {
    id: "relay-module", name: "5V Relay Module", category: "محركات ومخرجات", priceRange: "1$ - 3$",
    description: "مفتاح كهرومغناطيسي، يسمح للأردوينو (5V) بتشغيل أجهزة تعمل بكهرباء المنزل (220V) بآمان عبر العزل.",
    pins: [{ name: "IN", description: "إشارة التحكم" }, { name: "NO/NC/COM", description: "جهة الجهد العالي للريلاي" }]
  },
  {
    id: "solid-state-relay", name: "Solid State Relay (SSR)", category: "محركات ومخرجات", priceRange: "5$ - 10$",
    description: "ريلاي يعمل ضوئياً بدون أجزاء ميكانيكية، أسرع ولا يصدر صوت 'طقطقة' وممتاز للسخانات.",
    pins: [{ name: "DC IN", description: "3-32V" }, { name: "AC OUT", description: "لتحميل التيار المتردد" }]
  },
  {
    id: "water-pump", name: "Mini Water Pump 5V", category: "محركات ومخرجات", priceRange: "2$ - 4$",
    description: "مضخة غاطسة صغيرة لسحب الماء في مشاريع الري. تسحب تياراً عالياً ويجب تشغيلها بترانزستور أو ريلاي.",
    pins: [{ name: "VCC/GND", description: "لتشغيل الموتور الداخلي" }]
  },
  {
    id: "solenoid-lock", name: "Solenoid Lock 12V", category: "محركات ومخرجات", priceRange: "5$ - 10$",
    description: "قفل إلكتروني للأبواب والخزائن، يسحب لسانه المعدني للداخل عند مرور تيار 12V.",
    pins: [{ name: "+/- 12V", description: "يجب التحكم بها بريلاي" }]
  },
  {
    id: "vibration-motor", name: "Vibration Motor", category: "محركات ومخرجات", priceRange: "1$ - 2$",
    description: "محرك اهتزاز يشبه الموجود في الهواتف، يستخدم لإعطاء تنبيهات لمسية (Haptic feedback).",
    pins: [{ name: "VCC/GND", description: "يعمل בـ 3.3V أو 5V" }]
  }
];
