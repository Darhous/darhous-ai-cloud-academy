export interface DraftPreviewTableConfig {
  table: string;
  portal: string;
  contentType: string;
  expectedCount: number;
  labelEn: string;
  labelAr: string;
  titleFields: string[];
  excerptFields: string[];
  safeDisplayFields: string[];
}

export const DRAFT_PREVIEW_TABLES: DraftPreviewTableConfig[] = [
  // AI Academy (2)
  {
    table: "ai_lessons",
    portal: "ai-academy",
    contentType: "lesson",
    expectedCount: 20,
    labelEn: "AI Lessons",
    labelAr: "دروس الذكاء الاصطناعي",
    titleFields: ["title_ar", "title_en", "title", "name"],
    excerptFields: ["excerpt_ar", "excerpt_en", "description", "summary"],
    safeDisplayFields: ["category", "duration", "level", "slug", "icon"],
  },
  {
    table: "ai_resources",
    portal: "ai-academy",
    contentType: "resource",
    expectedCount: 30,
    labelEn: "AI Resources",
    labelAr: "موارد الذكاء الاصطناعي",
    titleFields: ["title_ar", "title_en", "title", "name"],
    excerptFields: ["excerpt_ar", "excerpt_en", "description", "summary"],
    safeDisplayFields: ["category", "type", "url", "slug", "icon"],
  },

  // Automation (2)
  {
    table: "automation_lessons",
    portal: "automation",
    contentType: "lesson",
    expectedCount: 20,
    labelEn: "Automation Lessons",
    labelAr: "دروس الأتمتة",
    titleFields: ["title_ar", "title_en", "title", "name"],
    excerptFields: ["excerpt_ar", "excerpt_en", "description", "summary"],
    safeDisplayFields: ["category", "duration", "level", "slug", "icon"],
  },
  {
    table: "automation_resources",
    portal: "automation",
    contentType: "resource",
    expectedCount: 30,
    labelEn: "Automation Resources",
    labelAr: "موارد الأتمتة",
    titleFields: ["title_ar", "title_en", "title", "name"],
    excerptFields: ["excerpt_ar", "excerpt_en", "description", "summary"],
    safeDisplayFields: ["category", "type", "url", "slug", "icon"],
  },

  // Career (4)
  {
    table: "career_glossary",
    portal: "career",
    contentType: "glossary",
    expectedCount: 50,
    labelEn: "Career Glossary",
    labelAr: "مصطلحات المسار المهني",
    titleFields: ["title_ar", "title_en", "title", "term", "name"],
    excerptFields: ["excerpt_ar", "excerpt_en", "definition", "description"],
    safeDisplayFields: ["category", "slug", "icon"],
  },
  {
    table: "career_lessons",
    portal: "career",
    contentType: "lesson",
    expectedCount: 20,
    labelEn: "Career Lessons",
    labelAr: "دروس المسار المهني",
    titleFields: ["title_ar", "title_en", "title", "name"],
    excerptFields: ["excerpt_ar", "excerpt_en", "description", "summary"],
    safeDisplayFields: ["category", "duration", "level", "slug", "icon"],
  },
  {
    table: "career_prompts",
    portal: "career",
    contentType: "prompt",
    expectedCount: 30,
    labelEn: "Career Prompts",
    labelAr: "تلقينات المسار المهني",
    titleFields: ["title_ar", "title_en", "title", "name"],
    excerptFields: ["excerpt_ar", "excerpt_en", "description", "summary"],
    safeDisplayFields: ["category", "slug", "icon"],
  },
  {
    table: "career_resources",
    portal: "career",
    contentType: "resource",
    expectedCount: 30,
    labelEn: "Career Resources",
    labelAr: "موارد المسار المهني",
    titleFields: ["title_ar", "title_en", "title", "name"],
    excerptFields: ["excerpt_ar", "excerpt_en", "description", "summary"],
    safeDisplayFields: ["category", "type", "url", "slug", "icon"],
  },

  // Digital Exams (4)
  {
    table: "digital_exams_glossary",
    portal: "digital-exams",
    contentType: "glossary",
    expectedCount: 50,
    labelEn: "Digital Exams Glossary",
    labelAr: "مصطلحات الاختبارات الرقمية",
    titleFields: ["title_ar", "title_en", "title", "term", "name"],
    excerptFields: ["excerpt_ar", "excerpt_en", "definition", "description"],
    safeDisplayFields: ["category", "slug", "icon"],
  },
  {
    table: "digital_exams_lessons",
    portal: "digital-exams",
    contentType: "lesson",
    expectedCount: 20,
    labelEn: "Digital Exams Lessons",
    labelAr: "دروس الاختبارات الرقمية",
    titleFields: ["title_ar", "title_en", "title", "name"],
    excerptFields: ["excerpt_ar", "excerpt_en", "description", "summary"],
    safeDisplayFields: ["category", "duration", "level", "slug", "icon"],
  },
  {
    table: "digital_exams_prompts",
    portal: "digital-exams",
    contentType: "prompt",
    expectedCount: 30,
    labelEn: "Digital Exams Prompts",
    labelAr: "تلقينات الاختبارات الرقمية",
    titleFields: ["title_ar", "title_en", "title", "name"],
    excerptFields: ["excerpt_ar", "excerpt_en", "description", "summary"],
    safeDisplayFields: ["category", "slug", "icon"],
  },
  {
    table: "digital_exams_resources",
    portal: "digital-exams",
    contentType: "resource",
    expectedCount: 30,
    labelEn: "Digital Exams Resources",
    labelAr: "موارد الاختبارات الرقمية",
    titleFields: ["title_ar", "title_en", "title", "name"],
    excerptFields: ["excerpt_ar", "excerpt_en", "description", "summary"],
    safeDisplayFields: ["category", "type", "url", "slug", "icon"],
  },

  // IoT (3)
  {
    table: "iot_glossary",
    portal: "iot-lab",
    contentType: "glossary",
    expectedCount: 50,
    labelEn: "IoT Glossary",
    labelAr: "مصطلحات إنترنت الأشياء",
    titleFields: ["title_ar", "title_en", "title", "term", "name"],
    excerptFields: ["excerpt_ar", "excerpt_en", "definition", "description"],
    safeDisplayFields: ["category", "slug", "icon"],
  },
  {
    table: "iot_prompts",
    portal: "iot-lab",
    contentType: "prompt",
    expectedCount: 30,
    labelEn: "IoT Prompts",
    labelAr: "تلقينات إنترنت الأشياء",
    titleFields: ["title_ar", "title_en", "title", "name"],
    excerptFields: ["excerpt_ar", "excerpt_en", "description", "summary"],
    safeDisplayFields: ["category", "slug", "icon"],
  },
  {
    table: "iot_resources",
    portal: "iot-lab",
    contentType: "resource",
    expectedCount: 30,
    labelEn: "IoT Resources",
    labelAr: "موارد إنترنت الأشياء",
    titleFields: ["title_ar", "title_en", "title", "name"],
    excerptFields: ["excerpt_ar", "excerpt_en", "description", "summary"],
    safeDisplayFields: ["category", "type", "url", "slug", "icon"],
  },

  // Language (4)
  {
    table: "language_glossary",
    portal: "language",
    contentType: "glossary",
    expectedCount: 50,
    labelEn: "Language Glossary",
    labelAr: "مصطلحات اللغات",
    titleFields: ["title_ar", "title_en", "title", "term", "name"],
    excerptFields: ["excerpt_ar", "excerpt_en", "definition", "description"],
    safeDisplayFields: ["category", "slug", "icon"],
  },
  {
    table: "language_lessons",
    portal: "language",
    contentType: "lesson",
    expectedCount: 20,
    labelEn: "Language Lessons",
    labelAr: "دروس اللغات",
    titleFields: ["title_ar", "title_en", "title", "name"],
    excerptFields: ["excerpt_ar", "excerpt_en", "description", "summary"],
    safeDisplayFields: ["category", "duration", "level", "slug", "icon"],
  },
  {
    table: "language_prompts",
    portal: "language",
    contentType: "prompt",
    expectedCount: 30,
    labelEn: "Language Prompts",
    labelAr: "تلقينات اللغات",
    titleFields: ["title_ar", "title_en", "title", "name"],
    excerptFields: ["excerpt_ar", "excerpt_en", "description", "summary"],
    safeDisplayFields: ["category", "slug", "icon"],
  },
  {
    table: "language_resources",
    portal: "language",
    contentType: "resource",
    expectedCount: 30,
    labelEn: "Language Resources",
    labelAr: "موارد اللغات",
    titleFields: ["title_ar", "title_en", "title", "name"],
    excerptFields: ["excerpt_ar", "excerpt_en", "description", "summary"],
    safeDisplayFields: ["category", "type", "url", "slug", "icon"],
  },
];

export const DRAFT_PREVIEW_TABLES_MAP: Record<string, DraftPreviewTableConfig> = Object.fromEntries(
  DRAFT_PREVIEW_TABLES.map((c) => [c.table, c])
);
