/**
 * Shared CMS content-type registry — drives BOTH the generic admin CRUD API
 * routes (server) and the generic admin panel UI (client) for the 22
 * remaining content tables (Automation 11, IoT Lab 10, Digital Exams 1).
 *
 * Rationale: hand-rolling 22× (2 API route files + 1 panel tab) would mean
 * ~8000 lines of near-identical boilerplate. Instead, every type is described
 * ONCE here (table name, portal, fields + UI kind), and:
 *   - /api/admin/cms/[table]/route.ts + [id]/route.ts validate + persist
 *     generically by reading the matching registry entry
 *   - GenericCmsTypePanel renders list + bilingual form generically from
 *     the same `fields` array (using the existing AdminTextField /
 *     AdminTextAreaField / AdminTagsField / AdminToggleField primitives)
 *
 * No "server-only" import here — this file is shared by client components.
 */

export type CmsFieldKind =
  | "text"      // single-line string column
  | "textarea"  // multi-line prose string column
  | "array"     // TEXT[] — edited as comma-separated tags
  | "lines"     // TEXT[] — edited as one item per line (for longer list items)
  | "jsonb"     // JSONB — edited as raw JSON (dir="ltr", no `mono` per AdminTextAreaField constraint)
  | "number"    // INT
  | "select"    // TEXT with a constrained set of options
  | "toggle";   // BOOLEAN

export interface CmsFieldConfig {
  name: string;
  labelAr: string;
  labelEn: string;
  kind: CmsFieldKind;
  dir?: "rtl" | "ltr";
  required?: boolean;
  rows?: number;
  options?: { value: string; label: string }[];
  /** Default value used when creating a new row. */
  default?: string | number | boolean;
}

export interface CmsTypeConfig {
  /** Unique key used as the sub-tab id, e.g. "automation-tools". */
  key: string;
  table: string;
  portalId: string;
  contentType: string;
  labelAr: string;
  labelEn: string;
  /** Column shown as the row's display title in the list view. */
  titleField: string;
  /** Fields beyond id/status/featured/sort_order (handled generically). */
  fields: CmsFieldConfig[];
}

const LEVEL_OPTIONS = [
  { value: "مبتدئ", label: "مبتدئ" },
  { value: "متوسط", label: "متوسط" },
  { value: "متقدم", label: "متقدم" },
];

const text = (name: string, labelAr: string, labelEn: string, extra: Partial<CmsFieldConfig> = {}): CmsFieldConfig =>
  ({ name, labelAr, labelEn, kind: "text", dir: "rtl", ...extra });
const textLtr = (name: string, labelAr: string, labelEn: string, extra: Partial<CmsFieldConfig> = {}): CmsFieldConfig =>
  ({ name, labelAr, labelEn, kind: "text", dir: "ltr", ...extra });
const ta = (name: string, labelAr: string, labelEn: string, extra: Partial<CmsFieldConfig> = {}): CmsFieldConfig =>
  ({ name, labelAr, labelEn, kind: "textarea", dir: "rtl", rows: 3, ...extra });
const arr = (name: string, labelAr: string, labelEn: string, extra: Partial<CmsFieldConfig> = {}): CmsFieldConfig =>
  ({ name, labelAr, labelEn, kind: "array", dir: "rtl", ...extra });
const lines = (name: string, labelAr: string, labelEn: string, extra: Partial<CmsFieldConfig> = {}): CmsFieldConfig =>
  ({ name, labelAr, labelEn, kind: "lines", dir: "rtl", rows: 5, ...extra });
const jsonb = (name: string, labelAr: string, labelEn: string, extra: Partial<CmsFieldConfig> = {}): CmsFieldConfig =>
  ({ name, labelAr, labelEn, kind: "jsonb", dir: "ltr", rows: 8, ...extra });
const numF = (name: string, labelAr: string, labelEn: string, extra: Partial<CmsFieldConfig> = {}): CmsFieldConfig =>
  ({ name, labelAr, labelEn, kind: "number", default: 0, ...extra });
const sel = (name: string, labelAr: string, labelEn: string, options: { value: string; label: string }[], extra: Partial<CmsFieldConfig> = {}): CmsFieldConfig =>
  ({ name, labelAr, labelEn, kind: "select", options, ...extra });

// ════════════════════════════════════════════════════════════════════
// AUTOMATION (11 types)
// ════════════════════════════════════════════════════════════════════
const AUTOMATION: CmsTypeConfig[] = [
  {
    key: "automation-paths", table: "automation_paths", portalId: "automation", contentType: "path",
    labelAr: "مسارات التعلم", labelEn: "Learning Paths", titleField: "title",
    fields: [
      text("title", "العنوان", "Title", { required: true }),
      text("subtitle", "العنوان الفرعي", "Subtitle"),
      text("english_label", "التسمية الإنجليزية", "English label"),
      sel("level", "المستوى", "Level", LEVEL_OPTIONS, { default: "مبتدئ" }),
      text("duration", "المدة", "Duration"),
      arr("target_audience", "الفئة المستهدفة", "Target audience"),
      ta("outcome", "النتيجة", "Outcome"),
      lines("modules", "الوحدات", "Modules"),
      lines("practical_projects", "المشاريع العملية", "Practical projects"),
      arr("recommended_tools", "الأدوات الموصى بها", "Recommended tools"),
      text("final_capstone_project", "المشروع الختامي", "Capstone project"),
      text("category", "الفئة", "Category"),
      numF("estimated_lessons", "عدد الدروس المقدّر", "Estimated lessons"),
    ],
  },
  {
    key: "automation-tools", table: "automation_tools", portalId: "automation", contentType: "tool",
    labelAr: "الأدوات", labelEn: "Tools", titleField: "name",
    fields: [
      text("name", "الاسم", "Name", { required: true }),
      text("category", "الفئة", "Category"),
      ta("what_it_is", "ما هي؟", "What it is"),
      arr("best_use_cases", "أفضل الاستخدامات", "Best use cases"),
      sel("difficulty", "الصعوبة", "Difficulty", LEVEL_OPTIONS, { default: "مبتدئ" }),
      sel("pricing_category", "فئة التسعير", "Pricing", [
        { value: "مجاني", label: "مجاني" }, { value: "مجاني / مدفوع", label: "مجاني / مدفوع" },
        { value: "مدفوع", label: "مدفوع" }, { value: "مفاهيمي", label: "مفاهيمي" },
      ], { default: "مجاني" }),
      arr("pros", "المزايا", "Pros"),
      arr("cons", "العيوب", "Cons"),
      arr("when_to_use", "متى تستخدمه", "When to use"),
      arr("when_not_to_use", "متى لا تستخدمه", "When not to use"),
      arr("example_automations", "أمثلة أتمتة", "Example automations"),
      arr("related_learning_paths", "مسارات تعلم ذات صلة", "Related learning paths"),
      sel("arabic_support", "دعم العربية", "Arabic support", [
        { value: "كامل", label: "كامل" }, { value: "جزئي", label: "جزئي" }, { value: "محدود", label: "محدود" },
      ], { default: "محدود" }),
    ],
  },
  {
    key: "automation-case-studies", table: "automation_case_studies", portalId: "automation", contentType: "case_study",
    labelAr: "دراسات حالة", labelEn: "Case Studies", titleField: "title",
    fields: [
      text("title", "العنوان", "Title", { required: true }),
      ta("business_problem", "المشكلة", "Business problem"),
      lines("before_automation", "قبل الأتمتة", "Before automation"),
      lines("after_automation", "بعد الأتمتة", "After automation"),
      lines("workflow_map", "خريطة سير العمل", "Workflow map"),
      arr("tools_used", "الأدوات المستخدمة", "Tools used"),
      ta("expected_impact", "الأثر المتوقع", "Expected impact"),
      arr("kpi_improvements", "تحسينات المؤشرات", "KPI improvements"),
      lines("implementation_roadmap", "خارطة التنفيذ", "Implementation roadmap"),
    ],
  },
  {
    key: "automation-checklists", table: "automation_checklists", portalId: "automation", contentType: "checklist",
    labelAr: "قوائم تحقق", labelEn: "Checklists", titleField: "title",
    fields: [
      text("title", "العنوان", "Title", { required: true }),
      text("project_type", "نوع المشروع", "Project type"),
      arr("tools", "الأدوات", "Tools"),
      text("sensitivity", "الحساسية", "Sensitivity"),
      lines("discovery_checklist", "قائمة الاستكشاف", "Discovery checklist"),
      lines("build_checklist", "قائمة البناء", "Build checklist"),
      lines("qa_checklist", "قائمة الجودة", "QA checklist"),
      lines("launch_checklist", "قائمة الإطلاق", "Launch checklist"),
      lines("maintenance_checklist", "قائمة الصيانة", "Maintenance checklist"),
    ],
  },
  {
    key: "automation-comparisons", table: "automation_comparisons", portalId: "automation", contentType: "comparison",
    labelAr: "مقارنات الأدوات", labelEn: "Tool Comparisons", titleField: "title",
    fields: [
      text("title", "العنوان", "Title", { required: true }),
      text("focus", "المحور", "Focus"),
      jsonb("options", "الخيارات (JSON: [{name,bestFor,caution}])", "Options (JSON array of {name,bestFor,caution})"),
      ta("verdict", "الخلاصة", "Verdict"),
    ],
  },
  {
    key: "automation-glossary", table: "automation_glossary", portalId: "automation", contentType: "glossary",
    labelAr: "المصطلحات", labelEn: "Glossary", titleField: "term",
    fields: [
      text("term", "المصطلح", "Term", { required: true }),
      ta("arabic_definition", "التعريف بالعربية", "Arabic definition"),
      ta("simple_example", "مثال مبسط", "Simple example"),
      arr("related_terms", "مصطلحات ذات صلة", "Related terms"),
    ],
  },
  {
    key: "automation-labs", table: "automation_labs", portalId: "automation", contentType: "lab",
    labelAr: "المعامل العملية", labelEn: "Labs", titleField: "title",
    fields: [
      text("title", "العنوان", "Title", { required: true }),
      ta("objective", "الهدف", "Objective"),
      ta("scenario", "السيناريو", "Scenario"),
      arr("tools", "الأدوات", "Tools"),
      lines("steps", "الخطوات", "Steps"),
      ta("expected_output", "الناتج المتوقع", "Expected output"),
      arr("common_mistakes", "أخطاء شائعة", "Common mistakes"),
      ta("challenge_task", "مهمة التحدي", "Challenge task"),
      arr("completion_checklist", "قائمة الإنجاز", "Completion checklist"),
      sel("level", "المستوى", "Level", LEVEL_OPTIONS, { default: "مبتدئ" }),
      text("duration", "المدة", "Duration"),
    ],
  },
  {
    key: "automation-services", table: "automation_services", portalId: "automation", contentType: "service",
    labelAr: "باقات الخدمات", labelEn: "Service Packages", titleField: "title",
    fields: [
      text("title", "العنوان", "Title", { required: true }),
      ta("who_its_for", "لمن هذه الخدمة", "Who it's for"),
      lines("deliverables", "المخرجات", "Deliverables"),
      text("timeline", "الجدول الزمني", "Timeline"),
      ta("starting_scope", "نطاق البداية", "Starting scope"),
      arr("required_client_inputs", "مدخلات مطلوبة من العميل", "Required client inputs"),
      lines("final_outputs", "المخرجات النهائية", "Final outputs"),
      text("cta", "دعوة الإجراء", "CTA"),
    ],
  },
  {
    key: "automation-use-cases", table: "automation_use_cases", portalId: "automation", contentType: "use_case",
    labelAr: "حالات الاستخدام", labelEn: "Use Cases", titleField: "title",
    fields: [
      text("title", "العنوان", "Title", { required: true }),
      lines("examples", "أمثلة", "Examples"),
      lines("operational_wins", "مكاسب تشغيلية", "Operational wins"),
    ],
  },
  {
    key: "automation-prompts", table: "automation_prompts", portalId: "automation", contentType: "prompt",
    labelAr: "البرومبتات الجاهزة", labelEn: "Ready Prompts", titleField: "title",
    fields: [
      text("title", "العنوان", "Title", { required: true }),
      ta("goal", "الهدف", "Goal"),
      ta("prompt", "البرومبت", "Prompt", { rows: 5 }),
      ta("output", "الناتج", "Output"),
      arr("recommended_for", "موصى به لـ", "Recommended for"),
    ],
  },
  {
    key: "automation-workflows", table: "automation_workflows", portalId: "automation", contentType: "workflow",
    labelAr: "مكتبة الـ Workflows", labelEn: "Workflow Library", titleField: "title",
    fields: [
      text("title", "العنوان", "Title", { required: true }),
      text("category", "الفئة", "Category"),
      text("department", "القسم", "Department"),
      sel("difficulty", "الصعوبة", "Difficulty", LEVEL_OPTIONS, { default: "مبتدئ" }),
      ta("business_problem", "المشكلة", "Business problem"),
      ta("workflow_summary", "ملخص سير العمل", "Workflow summary"),
      arr("required_tools", "الأدوات المطلوبة", "Required tools"),
      lines("setup_steps", "خطوات الإعداد", "Setup steps"),
      arr("input_fields", "حقول الإدخال", "Input fields"),
      ta("output", "الناتج", "Output"),
      lines("testing_checklist", "قائمة الاختبار", "Testing checklist"),
      arr("risks", "المخاطر", "Risks"),
      arr("upgrade_ideas", "أفكار للتطوير", "Upgrade ideas"),
      text("estimated_setup_time", "وقت الإعداد المقدّر", "Estimated setup time"),
      sel("access", "الوصول", "Access", [
        { value: "Free", label: "Free" }, { value: "Pro", label: "Pro" }, { value: "Service-ready", label: "Service-ready" },
      ], { default: "Free" }),
      text("trigger_label", "المُحفّز (Trigger)", "Trigger"),
      arr("actions", "الإجراءات", "Actions"),
      ta("short_description", "وصف مختصر", "Short description"),
      ta("business_value", "القيمة التجارية", "Business value"),
      arr("required_accounts", "الحسابات المطلوبة", "Required accounts"),
      ta("credentials_guide", "دليل بيانات الاعتماد", "Credentials guide"),
      numF("node_count", "عدد العقد (Nodes)", "Node count"),
      arr("tags", "الوسوم", "Tags"),
      arr("seo_hashtags", "هاشتاجات SEO", "SEO hashtags"),
      text("industry", "القطاع", "Industry"),
      text("trigger_type", "نوع المحفّز", "Trigger type"),
      arr("integrations", "التكاملات", "Integrations"),
      text("json_file_name", "اسم ملف JSON", "JSON file name"),
      arr("related_template_ids", "قوالب ذات صلة", "Related template IDs"),
      arr("related_lab_ids", "معامل ذات صلة", "Related lab IDs"),
      arr("related_checklist_ids", "قوائم تحقق ذات صلة", "Related checklist IDs"),
      arr("common_mistakes", "أخطاء شائعة", "Common mistakes"),
      text("safety_status", "حالة الأمان", "Safety status"),
      ta("safety_notes", "ملاحظات الأمان", "Safety notes"),
      jsonb("workflow_map_nodes", "خريطة سير العمل (JSON: WorkflowMapNode[])", "Workflow map nodes (JSON array)"),
    ],
  },
];

// ════════════════════════════════════════════════════════════════════
// IOT LAB (10 types)
// ════════════════════════════════════════════════════════════════════
const IOT: CmsTypeConfig[] = [
  {
    key: "iot-components", table: "iot_components", portalId: "iot-lab", contentType: "component",
    labelAr: "المكوّنات", labelEn: "Components", titleField: "name",
    fields: [
      text("name", "الاسم", "Name", { required: true }),
      text("category", "الفئة", "Category"),
      ta("description", "الوصف", "Description"),
      jsonb("pins", "الأطراف (JSON: [{name,description}])", "Pins (JSON array of {name,description})"),
      text("price_range", "نطاق السعر", "Price range"),
      textLtr("buy_link", "رابط الشراء", "Buy link"),
    ],
  },
  {
    key: "iot-code-examples", table: "iot_code_examples", portalId: "iot-lab", contentType: "code_example",
    labelAr: "أمثلة الأكواد", labelEn: "Code Examples", titleField: "title",
    fields: [
      text("title", "العنوان", "Title", { required: true }),
      text("category", "الفئة", "Category"),
      ta("description", "الوصف", "Description"),
      jsonb("code", "الكود", "Code", { kind: "textarea", dir: "ltr", rows: 10 }),
    ],
  },
  {
    key: "iot-projects", table: "iot_projects", portalId: "iot-lab", contentType: "project",
    labelAr: "المشاريع", labelEn: "Projects", titleField: "title",
    fields: [
      text("title", "العنوان", "Title", { required: true }),
      text("category", "الفئة", "Category"),
      sel("difficulty", "الصعوبة", "Difficulty", [
        { value: "سهل", label: "سهل" }, { value: "متوسط", label: "متوسط" }, { value: "صعب", label: "صعب" },
      ], { default: "سهل" }),
      text("duration", "المدة", "Duration"),
      ta("description", "الوصف", "Description"),
      arr("features", "المزايا", "Features"),
      arr("components", "المكوّنات", "Components"),
      ta("wiring_guide", "دليل التوصيل", "Wiring guide"),
      ta("code_snippet", "مقتطف الكود", "Code snippet", { dir: "ltr", rows: 6 }),
      textLtr("video_url", "رابط الفيديو", "Video URL"),
      textLtr("simulator_link", "رابط المحاكي", "Simulator link"),
    ],
  },
  {
    key: "iot-lessons", table: "iot_lessons", portalId: "iot-lab", contentType: "lesson",
    labelAr: "الدروس", labelEn: "Lessons", titleField: "title",
    fields: [
      text("title", "العنوان", "Title", { required: true }),
      text("category", "الفئة", "Category"),
      text("duration", "المدة", "Duration"),
      ta("description", "الوصف", "Description"),
      ta("content", "المحتوى", "Content", { rows: 6 }),
      arr("components_needed", "المكوّنات المطلوبة", "Components needed"),
      ta("wiring_notes", "ملاحظات التوصيل", "Wiring notes"),
      ta("code_example", "مثال كود", "Code example", { dir: "ltr", rows: 6 }),
      ta("common_mistakes", "أخطاء شائعة", "Common mistakes"),
      textLtr("simulator_link", "رابط المحاكي", "Simulator link"),
      text("next_lesson_id", "معرف الدرس التالي", "Next lesson ID", { dir: "ltr" }),
      textLtr("title_en", "العنوان (إنجليزي)", "Title (EN)"),
      text("category_en", "الفئة (إنجليزي)", "Category (EN)", { dir: "ltr" }),
      ta("description_en", "الوصف (إنجليزي)", "Description (EN)", { dir: "ltr" }),
      ta("content_en", "المحتوى (إنجليزي)", "Content (EN)", { dir: "ltr", rows: 6 }),
      ta("wiring_notes_en", "ملاحظات التوصيل (إنجليزي)", "Wiring notes (EN)", { dir: "ltr" }),
      ta("common_mistakes_en", "أخطاء شائعة (إنجليزي)", "Common mistakes (EN)", { dir: "ltr" }),
    ],
  },
  {
    key: "iot-challenges", table: "iot_challenges", portalId: "iot-lab", contentType: "challenge",
    labelAr: "التحديات", labelEn: "Challenges", titleField: "title",
    fields: [
      text("title", "العنوان", "Title", { required: true }),
      ta("description", "الوصف", "Description"),
      sel("level", "المستوى", "Level", LEVEL_OPTIONS, { default: "مبتدئ" }),
      numF("xp_reward", "نقاط الخبرة (XP)", "XP reward"),
      text("badge_id", "معرف الشارة", "Badge ID", { dir: "ltr" }),
      lines("tasks", "المهام", "Tasks"),
    ],
  },
  {
    key: "iot-simulators", table: "iot_simulators", portalId: "iot-lab", contentType: "simulator",
    labelAr: "المحاكيات", labelEn: "Simulators", titleField: "title",
    fields: [
      text("title", "العنوان", "Title", { required: true }),
      ta("description", "الوصف", "Description"),
      text("category", "الفئة", "Category"),
      textLtr("wokwi_id", "معرف Wokwi", "Wokwi ID", { required: true }),
    ],
  },
  {
    key: "iot-paths", table: "iot_paths", portalId: "iot-lab", contentType: "path",
    labelAr: "مسارات التعلم", labelEn: "Learning Paths", titleField: "title",
    fields: [
      text("title", "العنوان", "Title", { required: true }),
      text("english_title", "العنوان الإنجليزي", "English title"),
      sel("level", "المستوى", "Level", LEVEL_OPTIONS, { default: "مبتدئ" }),
      text("duration", "المدة", "Duration"),
      ta("target_learner", "المتعلم المستهدف", "Target learner"),
      ta("prerequisites", "المتطلبات السابقة", "Prerequisites"),
      ta("description", "الوصف", "Description"),
      lines("modules", "الوحدات", "Modules"),
      arr("related_lessons", "دروس ذات صلة", "Related lessons"),
      arr("related_projects", "مشاريع ذات صلة", "Related projects"),
      arr("related_code_examples", "أمثلة أكواد ذات صلة", "Related code examples"),
      arr("related_components", "مكوّنات ذات صلة", "Related components"),
      ta("final_project", "المشروع الختامي", "Final project"),
      text("cta_text", "نص دعوة الإجراء", "CTA text"),
    ],
  },
  {
    key: "iot-roadmaps", table: "iot_roadmaps", portalId: "iot-lab", contentType: "roadmap",
    labelAr: "خرائط الطريق", labelEn: "Roadmaps", titleField: "title",
    fields: [
      text("title", "العنوان", "Title", { required: true }),
      ta("description", "الوصف", "Description"),
      text("duration", "المدة", "Duration"),
      ta("target_outcome", "النتيجة المستهدفة", "Target outcome"),
      jsonb("stages", "المراحل (JSON: RoadmapStage[])", "Stages (JSON array)"),
    ],
  },
  {
    key: "iot-exams", table: "iot_exams", portalId: "iot-lab", contentType: "exam",
    labelAr: "الاختبارات", labelEn: "Exams", titleField: "title",
    fields: [
      text("title", "العنوان", "Title", { required: true }),
      ta("description", "الوصف", "Description"),
      jsonb("questions", "الأسئلة (JSON: {question,options[],correctAnswerIndex,explanation}[])", "Questions (JSON array)"),
    ],
  },
  {
    key: "iot-troubleshooting", table: "iot_troubleshooting", portalId: "iot-lab", contentType: "troubleshooting",
    labelAr: "حل المشكلات", labelEn: "Troubleshooting", titleField: "title",
    fields: [
      text("title", "العنوان", "Title", { required: true }),
      ta("symptoms", "الأعراض", "Symptoms"),
      arr("likely_causes", "الأسباب المحتملة", "Likely causes"),
      lines("diagnosis_steps", "خطوات التشخيص", "Diagnosis steps"),
      ta("quick_fix", "حل سريع", "Quick fix"),
      ta("prevention_tip", "نصيحة وقائية", "Prevention tip"),
      text("related_lesson_id", "معرف الدرس ذو الصلة", "Related lesson ID", { dir: "ltr" }),
    ],
  },
];

// ════════════════════════════════════════════════════════════════════
// DIGITAL EXAMS (1 type)
// ════════════════════════════════════════════════════════════════════
const DIGITAL_EXAMS: CmsTypeConfig[] = [
  {
    key: "exam-subjects", table: "exam_subjects", portalId: "digital-exams", contentType: "exam_subject",
    labelAr: "مواد الاختبارات", labelEn: "Exam Subjects", titleField: "label_ar",
    fields: [
      text("label", "التسمية (إنجليزي)", "Label (EN)", { required: true, dir: "ltr" }),
      text("label_ar", "التسمية (عربي)", "Label (AR)", { required: true }),
      text("icon", "الأيقونة (إيموجي)", "Icon (emoji)", { dir: "ltr" }),
      textLtr("color", "اللون (hex)", "Color (hex)"),
      ta("description", "الوصف (إنجليزي)", "Description (EN)", { dir: "ltr" }),
      ta("description_ar", "الوصف (عربي)", "Description (AR)"),
      jsonb("questions", "الأسئلة (JSON: {id,question,type,options:{a,b,c,d},correct}[]) — ~100 سؤال", "Questions (JSON array, ~100 items)", { rows: 14 }),
    ],
  },
];

export const CMS_REGISTRY: CmsTypeConfig[] = [...AUTOMATION, ...IOT, ...DIGITAL_EXAMS];

export const CMS_BY_TABLE: Record<string, CmsTypeConfig> = Object.fromEntries(
  CMS_REGISTRY.map((c) => [c.table, c]),
);

export const CMS_BY_KEY: Record<string, CmsTypeConfig> = Object.fromEntries(
  CMS_REGISTRY.map((c) => [c.key, c]),
);

export const AUTOMATION_CMS_TYPES = AUTOMATION;
export const IOT_CMS_TYPES = IOT;
export const DIGITAL_EXAMS_CMS_TYPES = DIGITAL_EXAMS;
