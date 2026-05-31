export interface RoadmapStage {
  title: string;
  description: string;
  recommendedLessons: string[];
  recommendedProjects: string[];
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  duration: string;
  targetOutcome: string;
  stages: RoadmapStage[];
}

export const roadmapsData: Roadmap[] = [
  {
    id: "beginner-maker",
    title: "من الصفر إلى صانع (Beginner Maker)",
    description: "أفضل مسار تبدأ به إن كنت لا تعرف شيئاً عن البرمجة والإلكترونيات. ستتعلم الأساسيات وتبني أول مشاريعك التفاعلية.",
    duration: "4 - 6 أسابيع",
    targetOutcome: "بناء دوائر ذكية تعتمد على الحساسات والأردوينو دون الحاجة للمساعدة.",
    stages: [
      {
        title: "المرحلة الأولى: الأساسيات والكهرباء",
        description: "فهم الجهد، التيار، والمقاومة. وبناء أول دائرة بسيطة بدون برمجة.",
        recommendedLessons: ["what-is-arduino", "breadboard-basics"],
        recommendedProjects: []
      },
      {
        title: "المرحلة الثانية: البرمجة الأولى",
        description: "التحكم في المخرجات الرقمية والتناظرية.",
        recommendedLessons: ["digital-output-led", "analog-output-pwm"],
        recommendedProjects: ["led-blink", "traffic-light"]
      },
      {
        title: "المرحلة الثالثة: الإدخال والحساسات",
        description: "جعل الدائرة تتفاعل مع العالم الخارجي عبر الأزرار والحساسات التناظرية.",
        recommendedLessons: ["digital-input-button", "analog-input-potentiometer"],
        recommendedProjects: ["smart-parking"]
      }
    ]
  },
  {
    id: "electronics-basics",
    title: "أساسيات الإلكترونيات",
    description: "مسار نظري وعملي مكثف لفهم كيفية عمل القطع الإلكترونية قبل ربطها بالمتحكمات الدقيقة.",
    duration: "2 - 3 أسابيع",
    targetOutcome: "فهم المخططات الإلكترونية واختيار المكونات الصحيحة لمشروعك.",
    stages: [
      {
        title: "فهم الدائرة المفتوحة والمغلقة",
        description: "التيار والجهد والبطاريات.",
        recommendedLessons: ["breadboard-basics"],
        recommendedProjects: []
      },
      {
        title: "قانون أوم والمقاومات",
        description: "حساب المقاومة المناسبة لليد لتجنب احتراقه.",
        recommendedLessons: ["analog-input-potentiometer"],
        recommendedProjects: []
      }
    ]
  },
  {
    id: "sensors-specialist",
    title: "متخصص الحساسات (Sensors Specialist)",
    description: "مسار متقدم يغطي كيفية قراءة ومعالجة البيانات من البيئة المحيطة (حرارة، مسافة، غاز، ضوء).",
    duration: "4 أسابيع",
    targetOutcome: "القدرة على دمج حساسات متعددة وقراءة بياناتها بدقة واستقرار.",
    stages: [
      {
        title: "حساسات البيئة الأساسية",
        description: "الحرارة، الرطوبة، والضوء.",
        recommendedLessons: [],
        recommendedProjects: ["smart-plant-monitor"]
      },
      {
        title: "حساسات الحركة والمسافة",
        description: "تحديد مواقع الأشياء واكتشاف الدخلاء.",
        recommendedLessons: ["ultrasonic-sensor"],
        recommendedProjects: ["ultrasonic-meter", "motion-security-alarm"]
      }
    ]
  },
  {
    id: "esp32-iot-dev",
    title: "مطور إنترنت الأشياء ESP32",
    description: "نقطة الدخول الحقيقية لعالم الـ IoT. تعلم كيف تربط مشاريعك بالإنترنت والواي فاي والسحابة.",
    duration: "5 - 7 أسابيع",
    targetOutcome: "بناء لوحة تحكم سحابية لمراقبة البيانات والتحكم بالأجهزة من أي مكان في العالم.",
    stages: [
      {
        title: "التعرف على ESP32",
        description: "الفرق بين الأردوينو و ESP، وكيفية إعداد بيئة التطوير.",
        recommendedLessons: ["esp32-intro"],
        recommendedProjects: ["esp32-web-server-led"]
      },
      {
        title: "بروتوكولات الـ IoT",
        description: "فهم HTTP و MQTT لإرسال البيانات.",
        recommendedLessons: ["mqtt-basics", "http-apis"],
        recommendedProjects: ["mqtt-temp-publisher"]
      }
    ]
  },
  {
    id: "robotics-beginner",
    title: "مبتدئ الروبوتات",
    description: "كيف تحرك الأشياء وتصنع روبوتات تتحرك وتتجنب العقبات أو تتبع المسارات.",
    duration: "6 أسابيع",
    targetOutcome: "بناء سيارة روبوت متكاملة تعمل بالبلوتوث وتتجنب العقبات ذاتياً.",
    stages: [
      {
        title: "أساسيات المحركات",
        description: "الفرق بين DC و Servo ومحركات الخطوة.",
        recommendedLessons: ["servo-motors", "dc-motors"],
        recommendedProjects: ["servo-radar"]
      },
      {
        title: "تجميع الروبوت الأول",
        description: "شاسيه الروبوت، درايفر L298N، وكتابة كود الحركة.",
        recommendedLessons: ["robot-chassis-wiring"],
        recommendedProjects: ["bluetooth-robot-car", "obstacle-avoiding-robot"]
      }
    ]
  },
  {
    id: "smart-home-builder",
    title: "باني المنازل الذكية",
    description: "مسار تطبيقي يركز على أتمتة المنازل (الإنارة، الأبواب، التكييف).",
    duration: "4 أسابيع",
    targetOutcome: "بناء نموذج مصغر لغرفة ذكية تعتمد على المستشعرات والتحكم عن بعد.",
    stages: [
      {
        title: "التحكم في أحمال التيار المتردد",
        description: "الاستخدام الآمن للريلاي (Relay).",
        recommendedLessons: ["relay-safety"],
        recommendedProjects: ["smart-fan-controller"]
      },
      {
        title: "الأمان والتحكم بالوصول",
        description: "استخدام كلمات المرور والبطاقات الذكية.",
        recommendedLessons: ["rfid-basics", "keypad-input"],
        recommendedProjects: ["smart-door-lock-keypad", "rfid-attendance"]
      }
    ]
  },
  {
    id: "industrial-iot-starter",
    title: "مقدمة في الـ IIoT",
    description: "نظرة على إنترنت الأشياء الصناعي ومراقبة الآلات والمصانع والاعتمادية.",
    duration: "3 أسابيع",
    targetOutcome: "فهم الفرق بين دوائر الهواة ودوائر الصناعة ومراقبة بيئة المستودعات.",
    stages: [
      {
        title: "المراقبة الصناعية",
        description: "تطبيقات المراقبة في الوقت الفعلي للحرارة والغازات.",
        recommendedLessons: ["industrial-sensors-intro"],
        recommendedProjects: ["factory-temp-monitor", "gas-leak-alarm"]
      }
    ]
  },
  {
    id: "capstone-builder",
    title: "مشاريع التخرج (Capstone)",
    description: "تتويج لما تعلمته. مسار لتنفيذ مشاريع ضخمة ودمج العديد من التقنيات معاً.",
    duration: "مفتوح",
    targetOutcome: "امتلاك معرض أعمال (Portfolio) تقني قوي.",
    stages: [
      {
        title: "التخطيط والهندسة",
        description: "كيف تخطط لمشروعك، تختار القطع، وتبني نموذجاً أولياً.",
        recommendedLessons: ["project-architecture", "debugging-advanced"],
        recommendedProjects: ["iot-weather-station", "smart-aquarium-monitor"]
      }
    ]
  }
];
