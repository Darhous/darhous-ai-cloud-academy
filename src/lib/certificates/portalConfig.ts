/**
 * portalConfig.ts — Per-portal certificate defaults + smart issuance dropdowns.
 *
 * PORTAL_CERT_CONFIG: label/value defaults used by preview & issuance routes.
 * PORTAL_SMART_CONFIG: dropdown options + auto-fill maps for the admin smart form.
 */

// ── Base cert config ──────────────────────────────────────────────────────────
export interface PortalCertConfig {
  academySubtitle: string;
  certTypeLabel: string;
  bodyLine1: string;
  bodyLine2: string;
  box1Label: string;
  box1Value: string;
  box1Color: string;
  box2Label: string;
  box2Value: string;
  box2Color: string;
}

export const PORTAL_CERT_CONFIG: Record<string, PortalCertConfig> = {
  language: {
    academySubtitle: "E N G L I S H   L A N G U A G E   P R O F I C I E N C Y",
    certTypeLabel:   "CERTIFICATE OF COMPLETION",
    bodyLine1:       "has successfully completed the NexaLearn English Language Placement Assessment",
    bodyLine2:       "CEFR Level B2 — Upper-Intermediate",
    box1Label:       "CEFR LEVEL", box1Value: "B2",    box1Color: "#27ae60",
    box2Label:       "SCORE",      box2Value: "82%",   box2Color: "#1a2a6e",
  },
  "digital-exams": {
    academySubtitle: "D I G I T A L   T R A N S F O R M A T I O N   E X A M S",
    certTypeLabel:   "CERTIFICATE OF ACHIEVEMENT",
    bodyLine1:       "has successfully completed the NexaLearn Digital Transformation Examination",
    bodyLine2:       "IT Fundamentals — Hardware, Software & Networks",
    box1Label:       "SCORE",  box1Value: "91%",    box1Color: "#16a34a",
    box2Label:       "STATUS", box2Value: "PASSED", box2Color: "#14532d",
  },
  automation: {
    academySubtitle: "A U T O M A T I O N   A C A D E M Y",
    certTypeLabel:   "CERTIFICATE OF COMPLETION",
    bodyLine1:       "has successfully completed the NexaLearn Automation programme",
    bodyLine2:       "No-Code & AI Process Automation — Advanced",
    box1Label:       "LEVEL",  box1Value: "ADVANCED",  box1Color: "#f59e0b",
    box2Label:       "STATUS", box2Value: "CERTIFIED", box2Color: "#1a1000",
  },
  "ai-academy": {
    academySubtitle: "A I   C L O U D   A C A D E M Y",
    certTypeLabel:   "CERTIFICATE OF COMPLETION",
    bodyLine1:       "has successfully completed the NexaLearn curriculum",
    bodyLine2:       "Generative AI & Large Language Models — Professional",
    box1Label:       "LEVEL",  box1Value: "PRO",       box1Color: "#8b5cf6",
    box2Label:       "STATUS", box2Value: "CERTIFIED", box2Color: "#1a0a2e",
  },
  career: {
    academySubtitle: "C A R E E R   H U B   P R O G R A M M E",
    certTypeLabel:   "CERTIFICATE OF READINESS",
    bodyLine1:       "has demonstrated professional readiness through the NexaLearn Career Hub",
    bodyLine2:       "IT & Technology Career Readiness Programme",
    box1Label:       "TRACK",  box1Value: "IT TECH", box1Color: "#f59e0b",
    box2Label:       "STATUS", box2Value: "READY",   box2Color: "#1a1000",
  },
  "iot-lab": {
    academySubtitle: "I o T   &   A R D U I N O   L A B",
    certTypeLabel:   "CERTIFICATE OF COMPLETION",
    bodyLine1:       "has successfully completed the NexaLearn IoT Lab hands-on programme",
    bodyLine2:       "Arduino, Sensors & Embedded Systems — Advanced",
    box1Label:       "PROJECTS", box1Value: "12/12",    box1Color: "#f97316",
    box2Label:       "STATUS",   box2Value: "CERTIFIED", box2Color: "#1a0900",
  },
  marketing: {
    academySubtitle: "M A R K E T I N G   A C A D E M Y",
    certTypeLabel:   "CERTIFICATE OF COMPLETION",
    bodyLine1:       "has successfully completed the NexaLearn Marketing Academy programme",
    bodyLine2:       "Digital Marketing, Automation & AI/MCP Systems — Professional",
    box1Label:       "LEVEL",  box1Value: "PROFESSIONAL", box1Color: "#ec4899",
    box2Label:       "STATUS", box2Value: "CERTIFIED",    box2Color: "#3b0a23",
  },
};

export function getPortalCertConfig(portal: string): PortalCertConfig {
  return PORTAL_CERT_CONFIG[portal] ?? PORTAL_CERT_CONFIG["ai-academy"];
}

// ── Smart dropdown config ─────────────────────────────────────────────────────
export interface DropdownOption {
  value: string;
  label: string;
}

export interface AutoFill {
  box1Value?: string;
  box2Value?: string;
  bodyLine2?: string;
}

export interface SmartDropdown {
  key: string;
  labelAr: string;
  labelEn: string;
  options: DropdownOption[];
  autoFills: Record<string, AutoFill>;
}

export interface PortalSmartConfig {
  dropdowns: SmartDropdown[];
}

export const PORTAL_SMART_CONFIG: Record<string, PortalSmartConfig> = {
  // ── Language: single CEFR-level dropdown → fills everything ──────────────
  language: {
    dropdowns: [
      {
        key: "langLevel",
        labelAr: "مستوى CEFR",
        labelEn: "CEFR Level",
        options: [
          { value: "A1", label: "A1 — Beginner (مبتدئ)" },
          { value: "A2", label: "A2 — Elementary (أساسي)" },
          { value: "B1", label: "B1 — Pre-Intermediate (متوسط)" },
          { value: "B2", label: "B2 — Upper-Intermediate (فوق متوسط)" },
          { value: "C1", label: "C1 — Advanced (متقدم)" },
          { value: "C2", label: "C2 — Mastery / Proficiency (إتقان)" },
        ],
        autoFills: {
          A1: { box1Value: "A1", box2Value: "55%", bodyLine2: "CEFR Level A1 — Beginner" },
          A2: { box1Value: "A2", box2Value: "65%", bodyLine2: "CEFR Level A2 — Elementary" },
          B1: { box1Value: "B1", box2Value: "72%", bodyLine2: "CEFR Level B1 — Pre-Intermediate" },
          B2: { box1Value: "B2", box2Value: "82%", bodyLine2: "CEFR Level B2 — Upper-Intermediate" },
          C1: { box1Value: "C1", box2Value: "91%", bodyLine2: "CEFR Level C1 — Advanced" },
          C2: { box1Value: "C2", box2Value: "97%", bodyLine2: "CEFR Level C2 — Mastery / Proficiency" },
        },
      },
    ],
  },

  // ── Digital Exams: subject dropdown + score dropdown ─────────────────────
  "digital-exams": {
    dropdowns: [
      {
        key: "examSubject",
        labelAr: "المادة",
        labelEn: "Subject",
        options: [
          { value: "IT Fundamentals",    label: "IT Fundamentals — أساسيات تقنية المعلومات" },
          { value: "Microsoft Word",     label: "Microsoft Word" },
          { value: "Microsoft Excel",    label: "Microsoft Excel" },
          { value: "PowerPoint",         label: "PowerPoint" },
          { value: "Microsoft Access",   label: "Microsoft Access" },
          { value: "Mobile Applications",label: "Mobile Applications — التطبيقات المحمولة" },
          { value: "Web Applications",   label: "Web Applications — تطبيقات الويب" },
          { value: "Cybersecurity",      label: "Cybersecurity — الأمن السيبراني" },
          { value: "Internet Search",    label: "Internet Search — البحث على الإنترنت" },
        ],
        autoFills: {
          "IT Fundamentals":     { bodyLine2: "IT Fundamentals — Hardware, Software & Networks" },
          "Microsoft Word":      { bodyLine2: "Microsoft Word — Word Processing & Document Design" },
          "Microsoft Excel":     { bodyLine2: "Microsoft Excel — Spreadsheets & Data Analysis" },
          "PowerPoint":          { bodyLine2: "PowerPoint — Presentation Design & Delivery" },
          "Microsoft Access":    { bodyLine2: "Microsoft Access — Database Management" },
          "Mobile Applications": { bodyLine2: "Mobile Applications — Android & iOS Fundamentals" },
          "Web Applications":    { bodyLine2: "Web Applications — HTML, CSS & Web Technologies" },
          "Cybersecurity":       { bodyLine2: "Cybersecurity — Security Principles & Threat Management" },
          "Internet Search":     { bodyLine2: "Internet Search — Digital Research & Information Literacy" },
        },
      },
      {
        key: "examScore",
        labelAr: "الدرجة المئوية",
        labelEn: "Score",
        options: [
          { value: "60%", label: "60% — Fail (راسب)" },
          { value: "65%", label: "65% — Fail (راسب)" },
          { value: "70%", label: "70% — Pass (ناجح)" },
          { value: "75%", label: "75% — Pass (ناجح)" },
          { value: "80%", label: "80% — Pass (ناجح)" },
          { value: "85%", label: "85% — Pass with Merit (بامتياز)" },
          { value: "90%", label: "90% — Pass with Distinction (بتميز)" },
          { value: "95%", label: "95% — Pass with Distinction (بتميز)" },
          { value: "100%", label: "100% — Perfect Score (درجة كاملة)" },
        ],
        autoFills: {
          "60%":  { box1Value: "60%",  box2Value: "FAILED" },
          "65%":  { box1Value: "65%",  box2Value: "FAILED" },
          "70%":  { box1Value: "70%",  box2Value: "PASSED" },
          "75%":  { box1Value: "75%",  box2Value: "PASSED" },
          "80%":  { box1Value: "80%",  box2Value: "PASSED" },
          "85%":  { box1Value: "85%",  box2Value: "PASSED" },
          "90%":  { box1Value: "90%",  box2Value: "PASSED" },
          "95%":  { box1Value: "95%",  box2Value: "PASSED" },
          "100%": { box1Value: "100%", box2Value: "PASSED" },
        },
      },
    ],
  },

  // ── AI Academy: level dropdown ────────────────────────────────────────────
  "ai-academy": {
    dropdowns: [
      {
        key: "aiLevel",
        labelAr: "المستوى",
        labelEn: "Level",
        options: [
          { value: "BEGINNER",     label: "Beginner — مبتدئ" },
          { value: "INTERMEDIATE", label: "Intermediate — متوسط" },
          { value: "ADVANCED",     label: "Advanced — متقدم" },
          { value: "PRO",          label: "Professional — محترف" },
          { value: "EXPERT",       label: "Expert — خبير" },
        ],
        autoFills: {
          BEGINNER:     { box1Value: "BEGINNER",     box2Value: "CERTIFIED", bodyLine2: "Generative AI & Prompt Engineering — Beginner" },
          INTERMEDIATE: { box1Value: "INTERMEDIATE", box2Value: "CERTIFIED", bodyLine2: "Generative AI & Large Language Models — Intermediate" },
          ADVANCED:     { box1Value: "ADVANCED",     box2Value: "CERTIFIED", bodyLine2: "Generative AI & AI Application Development — Advanced" },
          PRO:          { box1Value: "PRO",          box2Value: "CERTIFIED", bodyLine2: "Generative AI & LLMs — Professional Level" },
          EXPERT:       { box1Value: "EXPERT",       box2Value: "CERTIFIED", bodyLine2: "Generative AI & AI Architecture — Expert" },
        },
      },
    ],
  },

  // ── Automation: level dropdown ────────────────────────────────────────────
  automation: {
    dropdowns: [
      {
        key: "autoLevel",
        labelAr: "المستوى",
        labelEn: "Level",
        options: [
          { value: "BEGINNER",     label: "Beginner — مبتدئ" },
          { value: "INTERMEDIATE", label: "Intermediate — متوسط" },
          { value: "ADVANCED",     label: "Advanced — متقدم" },
          { value: "EXPERT",       label: "Expert — خبير" },
        ],
        autoFills: {
          BEGINNER:     { box1Value: "BEGINNER",     box2Value: "CERTIFIED", bodyLine2: "No-Code & AI Process Automation — Beginner" },
          INTERMEDIATE: { box1Value: "INTERMEDIATE", box2Value: "CERTIFIED", bodyLine2: "No-Code & AI Process Automation — Intermediate" },
          ADVANCED:     { box1Value: "ADVANCED",     box2Value: "CERTIFIED", bodyLine2: "No-Code & AI Process Automation — Advanced" },
          EXPERT:       { box1Value: "EXPERT",       box2Value: "CERTIFIED", bodyLine2: "No-Code & AI Process Automation — Expert" },
        },
      },
    ],
  },

  // ── Career: track dropdown ────────────────────────────────────────────────
  career: {
    dropdowns: [
      {
        key: "careerTrack",
        labelAr: "المسار المهني",
        labelEn: "Career Track",
        options: [
          { value: "IT & Technology",      label: "IT & Technology — تقنية المعلومات" },
          { value: "Data Science & AI",    label: "Data Science & AI — علم البيانات" },
          { value: "Digital Marketing",    label: "Digital Marketing — التسويق الرقمي" },
          { value: "Software Engineering", label: "Software Engineering — هندسة البرمجيات" },
          { value: "Cybersecurity",        label: "Cybersecurity — الأمن السيبراني" },
          { value: "Cloud Computing",      label: "Cloud Computing — الحوسبة السحابية" },
          { value: "Product Management",   label: "Product Management — إدارة المنتج" },
          { value: "Business & Finance",   label: "Business & Finance — الأعمال والمالية" },
        ],
        autoFills: {
          "IT & Technology":      { box1Value: "IT TECH",   box2Value: "READY", bodyLine2: "IT & Technology Career Readiness Programme" },
          "Data Science & AI":    { box1Value: "DS & AI",   box2Value: "READY", bodyLine2: "Data Science & Artificial Intelligence Pathway" },
          "Digital Marketing":    { box1Value: "DIG MKT",   box2Value: "READY", bodyLine2: "Digital Marketing Career Readiness Programme" },
          "Software Engineering": { box1Value: "SW ENG",    box2Value: "READY", bodyLine2: "Software Engineering Career Readiness Programme" },
          "Cybersecurity":        { box1Value: "CYBERSEC",  box2Value: "READY", bodyLine2: "Cybersecurity Career Readiness Programme" },
          "Cloud Computing":      { box1Value: "CLOUD",     box2Value: "READY", bodyLine2: "Cloud Computing Career Readiness Programme" },
          "Product Management":   { box1Value: "PROD MGT",  box2Value: "READY", bodyLine2: "Product Management Career Readiness Programme" },
          "Business & Finance":   { box1Value: "BUS & FIN", box2Value: "READY", bodyLine2: "Business & Finance Career Readiness Programme" },
        },
      },
    ],
  },

  // ── Marketing: certification-level dropdown → fills everything ────────────
  marketing: {
    dropdowns: [
      {
        key: "marketingLevel",
        labelAr: "مستوى الشهادة",
        labelEn: "Certificate Level",
        options: [
          { value: "BEGINNER",     label: "Beginner — Marketing Foundations (مبتدئ)" },
          { value: "PROFESSIONAL", label: "Professional — Digital Marketing (محترف)" },
          { value: "SPECIALIST",   label: "Specialist — Growth & Automation (متخصص)" },
          { value: "EXPERT",       label: "Expert — AI & MCP Marketing (خبير)" },
        ],
        autoFills: {
          BEGINNER:     { box1Value: "BEGINNER",     box2Value: "CERTIFIED", bodyLine2: "Marketing Foundations, Branding & Copywriting — Beginner" },
          PROFESSIONAL: { box1Value: "PROFESSIONAL", box2Value: "CERTIFIED", bodyLine2: "Content, Social, SEO, Email & Paid Ads — Professional" },
          SPECIALIST:   { box1Value: "SPECIALIST",   box2Value: "CERTIFIED", bodyLine2: "Funnels, CRO, Analytics & Marketing Automation — Specialist" },
          EXPERT:       { box1Value: "EXPERT",       box2Value: "CERTIFIED", bodyLine2: "AI Marketing & MCP Agentic Systems — Expert" },
        },
      },
    ],
  },

  // ── IoT Lab: level dropdown + projects dropdown ───────────────────────────
  "iot-lab": {
    dropdowns: [
      {
        key: "iotLevel",
        labelAr: "المستوى",
        labelEn: "Level",
        options: [
          { value: "BEGINNER",     label: "Beginner — مبتدئ" },
          { value: "INTERMEDIATE", label: "Intermediate — متوسط" },
          { value: "ADVANCED",     label: "Advanced — متقدم" },
          { value: "EXPERT",       label: "Expert — خبير" },
        ],
        autoFills: {
          BEGINNER:     { box2Value: "CERTIFIED", bodyLine2: "Arduino, Sensors & IoT Fundamentals" },
          INTERMEDIATE: { box2Value: "CERTIFIED", bodyLine2: "Arduino, Sensors & IoT Systems — Intermediate" },
          ADVANCED:     { box2Value: "CERTIFIED", bodyLine2: "Arduino, IoT & Embedded Systems — Advanced" },
          EXPERT:       { box2Value: "CERTIFIED", bodyLine2: "IoT Architecture & Embedded Systems — Expert" },
        },
      },
      {
        key: "iotProjects",
        labelAr: "المشاريع المنجزة",
        labelEn: "Projects Completed",
        options: [
          { value: "3/12",  label: "3 / 12 Projects" },
          { value: "6/12",  label: "6 / 12 Projects" },
          { value: "9/12",  label: "9 / 12 Projects" },
          { value: "12/12", label: "12 / 12 Projects — Full Completion" },
        ],
        autoFills: {
          "3/12":  { box1Value: "3/12" },
          "6/12":  { box1Value: "6/12" },
          "9/12":  { box1Value: "9/12" },
          "12/12": { box1Value: "12/12" },
        },
      },
    ],
  },
};
