import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "attendance-alerts",
  businessUseCase:
    "إدارة الحضور يدويًا تؤخر معرفة التأخير والغياب. هذا الـ workflow يسجّل الحضور لحظيًا، يفحص قواعد التوقيت، ويرسل تنبيهًا فوريًا للحالات الاستثنائية مثل التأخير.",
  whoNeedsIt:
    "أقسام الموارد البشرية، المدارس، والفروع التي تحتاج متابعة حضور لحظية دون جداول يدوية.",
  jsonFileName: "darhous-workflow-attendance-alerts.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "تسجيل حضور", tool: "Google Forms", description: "يبدأ عند check-in الموظف أو الطالب.", output: "اسم، وقت، فرع" },
    { id: "n2", order: 2, type: "storage", label: "سجل الحضور", tool: "Google Sheets", description: "يضيف صف الحضور إلى السجل اليومي." },
    { id: "n3", order: 3, type: "condition", label: "فحص التأخير", tool: "IF", description: "يقارن وقت الحضور بالحد المسموح.", riskNote: "اضبط المنطقة الزمنية الصحيحة لتجنب تنبيهات خاطئة." },
    { id: "n4", order: 4, type: "notification", label: "تنبيه استثناء", tool: "Telegram", description: "يرسل تنبيهًا عند التأخير أو الغياب." },
  ],
};

export default detail;
