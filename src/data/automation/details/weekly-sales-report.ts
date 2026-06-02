import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "weekly-sales-report",
  businessUseCase:
    "مدير مبيعات يقضي ساعات كل أسبوع في سحب الأرقام وتنسيق تقرير. هذا الـ workflow يقرأ البيانات تلقائيًا، يحسب المؤشرات، ويرسل تقريرًا منسّقًا للفريق كل يوم أحد دون أي تدخل.",
  whoNeedsIt:
    "مدراء المبيعات، فرق العمليات، وأصحاب الأعمال الذين يحتاجون متابعة منتظمة للأداء دون عبء التقارير اليدوية.",
  jsonFileName: "darhous-workflow-weekly-sales-report.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "مؤقت أسبوعي", tool: "Schedule", description: "يبدأ كل يوم أحد صباحًا." },
    { id: "n2", order: 2, type: "storage", label: "قراءة البيانات", tool: "Google Sheets", description: "يقرأ أرقام الأسبوع من جدول المبيعات.", output: "صفوف المبيعات الخام" },
    { id: "n3", order: 3, type: "transform", label: "حساب المؤشرات", tool: "Code / Function", description: "يحسب الإجمالي وعدد الصفقات والفرص المفتوحة.", input: "بيانات خام", output: "مؤشرات مجمّعة" },
    { id: "n4", order: 4, type: "output", label: "إرسال التقرير", tool: "Gmail", description: "يرسل ملخصًا منسّقًا للفريق والإدارة.", riskNote: "تحقق من تحديث البيانات قبل الإرسال لتجنب تقرير خاطئ." },
  ],
};

export default detail;
