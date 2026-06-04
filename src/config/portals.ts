// Portal Registry — single source of truth for all Darhous portals
// Add new portals here; they automatically appear in landing, nav, dashboard, admin.

export type PortalStatus = "available" | "coming-soon" | "beta";
export type IntegrationType = "internal" | "shell" | "external";
export type PortalCategory = "ai" | "language" | "digital" | "career" | "tech" | "future";

export interface Portal {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  href: string;
  status: PortalStatus;
  icon: string;
  color: string;
  gradient: string;
  category: PortalCategory;
  features: string[];
  integrationType: IntegrationType;
  externalRepo?: string;
  ctaAr: string;
  ctaEn: string;
  badgeAr?: string;
  badgeEn?: string;
}

export const portals: Portal[] = [
  {
    id: "ai-academy",
    titleAr: "أكاديمية الذكاء الاصطناعي",
    titleEn: "AI Academy",
    descriptionAr: "تعلم أدوات الذكاء الاصطناعي، البرومبتات، المشاريع العملية، والمعامل الذكية.",
    descriptionEn: "Learn AI tools, prompts, hands-on projects, and intelligent labs.",
    href: "/ai-academy",
    status: "available",
    icon: "🤖",
    color: "#8ed5ff",
    gradient: "linear-gradient(135deg, rgba(0,102,138,0.35) 0%, rgba(56,189,248,0.15) 100%)",
    category: "ai",
    features: ["18 دورة", "62 أداة AI", "27 برومبت", "مرشد AI", "تحديات", "شهادات"],
    integrationType: "internal",
    ctaAr: "دخول البوابة",
    ctaEn: "Enter Portal",
  },
  {
    id: "language",
    titleAr: "بوابة اللغة",
    titleEn: "Language Portal",
    descriptionAr: "اختبارات تحديد مستوى اللغة الإنجليزية، تقييم المهارات، وتوصيات لمسار التعلم.",
    descriptionEn: "English level assessment, skill evaluation, and personalized learning path recommendations.",
    href: "/language",
    status: "available",
    icon: "🌐",
    color: "#d0bcff",
    gradient: "linear-gradient(135deg, rgba(87,27,193,0.35) 0%, rgba(139,92,246,0.15) 100%)",
    category: "language",
    features: ["اختبار المستوى", "تقييم المهارات", "مسارات تعلم", "نتائج فورية"],
    integrationType: "shell",
    externalRepo: "https://github.com/Darhous/darhous-assessment",
    ctaAr: "اختبر مستواك",
    ctaEn: "Test Your Level",
  },
  {
    id: "digital-exams",
    titleAr: "اختبارات التحول الرقمي",
    titleEn: "Digital Transformation Exams",
    descriptionAr: "اختبارات IT وWord وExcel وPowerPoint وAccess والأمن السيبراني ومهارات التحول الرقمي.",
    descriptionEn: "IT, Word, Excel, PowerPoint, Access, Cybersecurity, and digital transformation exams.",
    href: "/digital-exams",
    status: "available",
    icon: "💻",
    color: "#3ce0fb",
    gradient: "linear-gradient(135deg, rgba(0,173,181,0.35) 0%, rgba(60,224,251,0.15) 100%)",
    category: "digital",
    features: ["9 مواد", "902+ سؤال", "حزمة Office", "أمن سيبراني", "نتائج معتمدة", "شهادات"],
    integrationType: "shell",
    externalRepo: "https://github.com/Darhous/Exams_Platform",
    ctaAr: "ابدأ الاختبار",
    ctaEn: "Start Exam",
  },
  {
    id: "career",
    titleAr: "بوابة درهوس المهنية",
    titleEn: "Darhous Career Hub",
    descriptionAr: "حلل سيرتك الذاتية بالذكاء الاصطناعي، اكتشف فجواتك، واحصل على وظيفتك القادمة بثقة.",
    descriptionEn: "AI-powered CV analysis, ATS scoring, job matching, interview prep, and career roadmap.",
    href: "/career",
    status: "available",
    icon: "💼",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.25) 0%, rgba(251,191,36,0.1) 100%)",
    category: "career",
    features: ["محلل ATS ذكي", "صانع السيرة الذاتية", "مطابقة الوظائف", "تحضير المقابلات", "قوالب جاهزة"],
    integrationType: "internal",
    ctaAr: "دخول البوابة",
    ctaEn: "Enter Portal",
    badgeAr: "جديد",
    badgeEn: "New",
  },
  {
    id: "automation",
    titleAr: "أكاديمية درهوس للأتمتة",
    titleEn: "Darhous Automation Academy",
    descriptionAr: "تعلم الأتمتة التجارية، استكشف 30 وصفة منتقاة، وابنِ workflows ذكية لأعمالك.",
    descriptionEn: "Learn business automation with 30 curated workflows, tools explorer, and workflow builder.",
    href: "/automation",
    status: "available",
    icon: "⚙️",
    color: "#4ade80",
    gradient: "linear-gradient(135deg, rgba(74,222,128,0.25) 0%, rgba(34,197,94,0.1) 100%)",
    category: "tech",
    features: ["30 وصفة أتمتة", "مستكشف الأدوات", "مسارات التعلم", "خدمات احترافية", "15 معمل تطبيقي"],
    integrationType: "internal",
    ctaAr: "دخول البوابة",
    ctaEn: "Enter Portal",
    badgeAr: "جديد",
    badgeEn: "New",
  },
  {
    id: "iot-lab",
    titleAr: "مختبر درهوس لإنترنت الأشياء والأردوينو",
    titleEn: "Darhous IoT Lab / Arduinoverse",
    descriptionAr: "59 درس، 72 مشروع، 40 تحدي أردوينو، ومكتبة المكونات الإلكترونية الشاملة.",
    descriptionEn: "59 lessons, 72 projects, 40 Arduino challenges, and comprehensive component library.",
    href: "/iot-lab",
    status: "available",
    icon: "🔌",
    color: "#f97316",
    gradient: "linear-gradient(135deg, rgba(249,115,22,0.25) 0%, rgba(234,88,12,0.1) 100%)",
    category: "tech",
    features: ["59 درس Arduino", "72 مشروع تطبيقي", "40 تحدي برمجي", "مكتبة المكونات", "محاكي تفاعلي"],
    integrationType: "internal",
    ctaAr: "دخول المختبر",
    ctaEn: "Enter Lab",
    badgeAr: "جديد",
    badgeEn: "New",
  },
  {
    id: "coming-soon",
    titleAr: "بوابات قادمة",
    titleEn: "Future Portals",
    descriptionAr: "مساحة مخصصة لإضافات درهوس المستقبلية: الأمن السيبراني، الروبوتات، الفريلانس، وأدوات الأعمال.",
    descriptionEn: "Space for future Darhous portals: cybersecurity, robotics, freelance, and business tools.",
    href: "/coming-soon",
    status: "coming-soon",
    icon: "🚀",
    color: "#c084fc",
    gradient: "linear-gradient(135deg, rgba(192,132,252,0.25) 0%, rgba(168,85,247,0.1) 100%)",
    category: "future",
    features: ["أمن سيبراني", "روبوتات", "فريلانس", "أدوات أعمال"],
    integrationType: "shell",
    ctaAr: "استكشف ما قادم",
    ctaEn: "See What's Coming",
    badgeAr: "قادم",
    badgeEn: "Future",
  },
];

export const availablePortals = portals.filter((p) => p.status === "available");
export const comingSoonPortals = portals.filter((p) => p.status === "coming-soon");

export function getPortalById(id: string): Portal | undefined {
  return portals.find((p) => p.id === id);
}
