import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "crm-renewal-reminder",
  businessUseCase:
    "العقود والاشتراكات تقترب من الانتهاء دون متابعة مبكرة فتُفقد فرص التجديد. هذا الـ workflow يفحص تواريخ الانتهاء دوريًا، يرسل تنبيهًا داخليًا، وينشئ مهمة تجديد للمسؤول.",
  whoNeedsIt:
    "فرق المبيعات وإدارة الحسابات، وشركات الاشتراكات التي تريد رفع معدل التجديد.",
  jsonFileName: "darhous-workflow-crm-renewal-reminder.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "فحص دوري", tool: "Schedule", description: "يبدأ يوميًا لفحص تواريخ الانتهاء." },
    { id: "n2", order: 2, type: "storage", label: "قراءة العقود", tool: "Google Sheets / CRM", description: "يجلب العقود وتواريخ انتهائها.", output: "عملاء وتواريخ انتهاء" },
    { id: "n3", order: 3, type: "condition", label: "قرب الانتهاء", tool: "IF", description: "يصفّي العقود التي تنتهي خلال 30 يومًا.", riskNote: "حافظ على تحديث التواريخ لتجنب تنبيهات خاطئة." },
    { id: "n4", order: 4, type: "action", label: "تنبيه ومهمة", tool: "Gmail / Task", description: "يرسل تذكيرًا وينشئ مهمة تجديد للمسؤول." },
  ],
};

export default detail;
