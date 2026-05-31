import { ComponentData } from "./components1";

export const componentsDataPart2: ComponentData[] = [
  // شاشات (7)
  {
    id: "lcd-16x2", name: "LCD 16x2 (بدون I2C)", category: "شاشات", priceRange: "2$ - 4$",
    description: "شاشة تعرض 16 حرفاً في سطرين. النسخة العادية بدون محول I2C تتطلب توصيل 6 أسلاك بيانات للأردوينو، مما يستهلك منافذ كثيرة.",
    pins: [{ name: "RS, EN, D4-D7", description: "أسلاك التحكم والبيانات" }]
  },
  {
    id: "lcd-i2c-module", name: "I2C Module for LCD", category: "شاشات", priceRange: "1$ - 2$",
    description: "قطعة سوداء صغيرة تلحم خلف شاشة LCD لتقليل عدد الأسلاك المطلوبة من 6 إلى 2 فقط (SDA و SCL).",
    pins: [{ name: "SDA", description: "بيانات" }, { name: "SCL", description: "نبضات المزامنة" }]
  },
  {
    id: "oled-096", name: "OLED 0.96 inch", category: "شاشات", priceRange: "3$ - 6$",
    description: "شاشة صغيرة جداً لكنها عالية الدقة ومشرقة باللون الأزرق أو الأبيض. قادرة على رسم أيقونات وخطوط ورسوم بيانية ببيكسلات واضحة.",
    pins: [{ name: "I2C أو SPI", description: "حسب الموديول" }]
  },
  {
    id: "7-segment", name: "7-Segment Display", category: "شاشات", priceRange: "0.5$ - 1$",
    description: "شاشة رقمية كلاسيكية تعرض رقماً واحداً فقط (من 0 إلى 9) وتستخدم 8 ليدات داخلية لرسم الرقم.",
    pins: [{ name: "A-G, DP", description: "أرجل الليدات الداخلية" }, { name: "Common", description: "كاثود أو أنود مشترك" }]
  },
  {
    id: "tm1637", name: "TM1637 4-Digit Display", category: "شاشات", priceRange: "2$ - 4$",
    description: "أربع شاشات 7-Segment مدمجة مع شريحة تحكم ذكية لعرض الساعات أو الأرقام الكبيرة بـ 4 أسلاك فقط.",
    pins: [{ name: "CLK / DIO", description: "للتحكم التسلسلي" }]
  },
  {
    id: "tft-touch", name: "TFT Touch Screen 2.4", category: "شاشات", priceRange: "10$ - 15$",
    description: "شاشة ملونة تعمل باللمس، تُركب كدرع (Shield) فوق الأردوينو لعمل واجهات استخدام تشبه الهواتف الذكية القديمة.",
    pins: [{ name: "Shield Pins", description: "تستخدم كل منافذ الأونو تقريباً" }]
  },
  {
    id: "ws2812-matrix", name: "LED Matrix 8x8", category: "شاشات", priceRange: "3$ - 6$",
    description: "مصفوفة ليدات حمراء لطباعة أحرف متحركة، تُدار بواسطة شريحة MAX7219 ويمكن ربط عدة شاشات لتشكيل لوحة إعلانية.",
    pins: [{ name: "DIN, CS, CLK", description: "واجهة SPI" }]
  },

  // طاقة وأسلاك (15)
  {
    id: "breadboard", name: "Breadboard (اللوحة التجريبية)", category: "طاقة وأسلاك", priceRange: "2$ - 5$",
    description: "الأساس الذي تُبنى عليه كل المشاريع لاختبارها وتوصيلها ببعض بدون لحام.",
    pins: [{ name: "الصفوف والأعمدة", description: "توصيلات داخلية مخفية" }]
  },
  {
    id: "jumper-wires", name: "Jumper Wires", category: "طاقة وأسلاك", priceRange: "2$ (لـ 40 سلك)",
    description: "أسلاك التوصيل، تأتي بثلاثة أنواع: (ذكر-ذكر) לلبريد بورد، (أنثى-أنثى) لتوصيل الحساسات، و(ذكر-أنثى).",
    pins: [{ name: "M/M, M/F, F/F", description: "أنواع النهايات" }]
  },
  {
    id: "resistor", name: "Resistors (المقاومات)", category: "طاقة وأسلاك", priceRange: "0.01$",
    description: "تقلل مرور التيار لحماية القطع الإلكترونية الأخرى من الاحتراق. القيم الشائعة: 220، 1K، 10K.",
    pins: [{ name: "لا يوجد قطبية", description: "يمكن تركيبها بأي اتجاه" }]
  },
  {
    id: "potentiometer", name: "Potentiometer (مقاومة متغيرة)", category: "طاقة وأسلاك", priceRange: "0.5$",
    description: "مفتاح دوار كالموجود في الراديو القديم لتغيير الصوت. يستخدم لتغيير الجهد الذي يقرأه المنفذ التناظري.",
    pins: [{ name: "الطرفين", description: "طاقة 5V و GND" }, { name: "الأوسط", description: "الإشارة A0" }]
  },
  {
    id: "capacitor", name: "Capacitor (المكثفات)", category: "طاقة وأسلاك", priceRange: "0.1$",
    description: "خزانات طاقة سريعة. تستخدم لتنعيم التيار (ترشيح الضوضاء) ومنع إعادة تشغيل المعالج عند تشغيل المحركات.",
    pins: [{ name: "قطبي / غير قطبي", description: "مكثف السيراميك لا يهم اتجاهه، والإلكتروليتي (الأسطواني) له قطب سالب" }]
  },
  {
    id: "diode-1n4007", name: "Diode 1N4007", category: "طاقة وأسلاك", priceRange: "0.05$",
    description: "صمام باتجاه واحد. يسمح بمرور التيار في جهة ويمنعه من الرجوع. أساسي لحماية الترانزستورات من الجهد العكسي للمحركات.",
    pins: [{ name: "الخط الرمادي", description: "يشير للكاثود (اتجاه خروج التيار)" }]
  },
  {
    id: "transistor-pn2222", name: "Transistor PN2222 (BJT)", category: "طاقة وأسلاك", priceRange: "0.1$",
    description: "مفتاح إلكتروني صغير يسمح لإشارة الأردوينو الضعيفة بتشغيل محرك صغير أو أضواء تستهلك حتى 800mA.",
    pins: [{ name: "B, C, E", description: "القاعدة (Control)، المجمع (VCC)، الباعث (GND)" }]
  },
  {
    id: "mosfet-irlz44n", name: "MOSFET IRLZ44N", category: "طاقة وأسلاك", priceRange: "1$ - 2$",
    description: "ترانزستور للأحمال الثقيلة جداً (Logic Level MOSFET)، يستطيع تشغيل محركات ومصابيح قوية لعدة أمبيرات ببرودة وأمان.",
    pins: [{ name: "G, D, S", description: "البوابة، المصرف، المنبع" }]
  },
  {
    id: "battery-9v", name: "9V Battery + Clip", category: "طاقة وأسلاك", priceRange: "2$",
    description: "بطارية مربعة كلاسيكية. جيدة لتشغيل الأردوينو عبر منفذ الـ DC، ولكنها سيئة جداً للمحركات لأن تيارها ضعيف وتفرغ بسرعة.",
    pins: [{ name: "+/-", description: "تُوصل لمدخل Vin أو جاك الطاقة" }]
  },
  {
    id: "battery-18650", name: "Li-ion 18650 Battery", category: "طاقة وأسلاك", priceRange: "3$ - 6$",
    description: "بطارية الليثيوم الأسطوانية، نفس المستخدمة في سيارات تسلا! قوية جداً وتوفر تياراً هائلاً للمحركات.",
    pins: [{ name: "تحذير", description: "قصرها الكهربائي خطر جداً ويسبب اشتعالاً" }]
  },
  {
    id: "tp4056", name: "TP4056 Charger Module", category: "طاقة وأسلاك", priceRange: "1$ - 2$",
    description: "دائرة شحن ضرورية لبطاريات 18650، تشحن البطارية من شاحن الجوال بآمان وتمنع التفريغ الزائد الذي يتلف البطارية.",
    pins: [{ name: "B+/B-", description: "للبطارية" }, { name: "OUT+/OUT-", description: "للدائرة" }]
  },
  {
    id: "step-down-lm2596", name: "LM2596 Step Down", category: "طاقة وأسلاك", priceRange: "2$ - 4$",
    description: "يحول الجهد العالي (مثلا 12V) إلى جهد منخفض ومستقر (مثلا 5V) بكفاءة عالية لتشغيل الأردوينو والمحركات معاً من بطارية واحدة.",
    pins: [{ name: "IN+/IN-", description: "من البطارية" }, { name: "OUT+/OUT-", description: "إلى المشروع" }]
  },
  {
    id: "step-up-mt3608", name: "MT3608 Step Up", category: "طاقة وأسلاك", priceRange: "1$ - 3$",
    description: "يرفع الجهد المنخفض لجهد أعلى. مفيد لتشغيل أردوينو (5V) من بطارية ليثيوم واحدة (3.7V).",
    pins: [{ name: "يجب ضبط المسمار", description: "للوصول للجهد المطلوب قبل التوصيل بالأردوينو" }]
  },
  {
    id: "logic-level-converter", name: "Logic Level Converter", category: "طاقة وأسلاك", priceRange: "1$ - 2$",
    description: "يربط الأردوينو (5V) بشكل آمن بقطع الـ 3.3V (مثل البلوتوث والـ SD Card) لتجنب حرقها بالإشارات عالية الجهد.",
    pins: [{ name: "HV / LV", description: "الجانب العالي / الجانب المنخفض" }]
  },
  {
    id: "power-supply-module", name: "Breadboard Power Supply", category: "طاقة وأسلاك", priceRange: "2$ - 3$",
    description: "تركب على اللوحة التجريبية، وتوفر لك مسارين للـ 5V والـ 3.3V المستقرة لمشروعك عبر شاحن حائط عادي.",
    pins: [{ name: "Rails", description: "تغذي خطوط الطاقة الجانبية" }]
  },

  // أخرى ودروع الاتصال والتحكم (11)
  {
    id: "push-button", name: "Push Button (زر ضغاط)", category: "أخرى", priceRange: "0.1$",
    description: "يغلق الدائرة عند الضغط، ويفصلها عند الرفع. أهم جهاز إدخال بشري في المشاريع.",
    pins: [{ name: "4 أرجل", description: "داخلياً كل رجلين متقابلتين متصلتان معاً" }]
  },
  {
    id: "keypad-4x4", name: "4x4 Membrane Keypad", category: "أخرى", priceRange: "2$ - 3$",
    description: "لوحة أرقام مسطحة تستخدم نظام المصفوفة للتعرف على 16 زراً باستخدام 8 منافذ فقط.",
    pins: [{ name: "R1-R4, C1-C4", description: "الصفوف والأعمدة" }]
  },
  {
    id: "joystick", name: "Analog Joystick Module", category: "أخرى", priceRange: "2$ - 4$",
    description: "عصا تحكم كالموجودة في أذرع البلايستيشن، تحتوي على مقاومتين متغيرتين للحركة في محورين X و Y مع زر ضغط مركزي.",
    pins: [{ name: "VRx / VRy", description: "مخارج تناظرية لـ A0 و A1" }]
  },
  {
    id: "l298n", name: "L298N Motor Driver", category: "أخرى", priceRange: "3$ - 5$",
    description: "القطعة الأساسية لقيادة سيارات الروبوت. توفر التيار العالي لمحركين وتسمح بعكس اتجاه دورانهما.",
    pins: [{ name: "IN1-IN4", description: "للتحكم" }, { name: "12V, 5V, GND", description: "للطاقة" }]
  },
  {
    id: "l293d-shield", name: "L293D Motor Shield", category: "أخرى", priceRange: "4$ - 6$",
    description: "درع يركب فوق الأردوينو مباشرة للتحكم בـ 4 محركات DC أو محركين Stepper بسهولة فائقة دون فوضى الأسلاك.",
    pins: [{ name: "تركيب مباشر", description: "يستخدم معظم دبابيس الأردوينو" }]
  },
  {
    id: "sd-card-module", name: "Micro SD Card Module", category: "أخرى", priceRange: "2$ - 4$",
    description: "قارئ بطاقات ذاكرة لحفظ كميات هائلة من بيانات الحساسات (Data Logging) أو قراءة ملفات نصية.",
    pins: [{ name: "SPI", description: "MOSI, MISO, SCK, CS" }]
  },
  {
    id: "rtc-ds3231", name: "DS3231 RTC Module", category: "أخرى", priceRange: "3$ - 5$",
    description: "ساعة زمنية دقيقة جداً لا تفقد الوقت، بفضل بطاريتها المستقلة ومستشعر الحرارة الداخلي الذي يعوض تغيرات الطقس.",
    pins: [{ name: "I2C", description: "SDA و SCL" }]
  },
  {
    id: "cnc-shield", name: "CNC Shield V3", category: "أخرى", priceRange: "5$ - 8$",
    description: "درع يوضع على الأونو لتركيب درايفرات (A4988) لبناء آلة رسم أو طابعة 3D أو ماكينة حفر ليزر.",
    pins: [{ name: "دبابيس محاور", description: "X, Y, Z, A" }]
  },
  {
    id: "a4988-driver", name: "A4988 Stepper Driver", category: "أخرى", priceRange: "2$ - 3$",
    description: "درايفر دقيق يتحكم במحركات הـ Stepper. يحتاج لإشارة واحدة فقط للخطوة وإشارة للاتجاه.",
    pins: [{ name: "STEP / DIR", description: "دبابيس التحكم" }]
  },
  {
    id: "nrf24l01", name: "NRF24L01+ Wireless", category: "أخرى", priceRange: "2$ - 4$",
    description: "مرسل ومستقبل راديو بتردد 2.4GHz قوي جداً واقتصادي الطاقة، يستخدم للتحكم بالطائرات بدون طيار أو مشاريع الاتصالات عن بعد.",
    pins: [{ name: "SPI", description: "يعمل בـ 3.3V فقط، ومشهور باحتياجه لمكثف للحفاظ على طاقته" }]
  },
  {
    id: "bluetooth-hc05", name: "HC-05 Bluetooth", category: "أخرى", priceRange: "4$ - 6$",
    description: "يربط مشروعك בהاتفك أو الكمبيوتر لاسلكياً. الـ HC-05 يمكنه الإرسال والاستقبال وعمل الاقتران بأجهزة بلوتوث أخرى.",
    pins: [{ name: "TX / RX", description: "اتصال تسلسلي عادي" }]
  }
];
