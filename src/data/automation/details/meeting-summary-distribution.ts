import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "meeting-summary-distribution",
  businessUseCase:
    "نقاط الاجتماع تضيع إن لم تُحوّل إلى مهام ومتابعة. هذا الـ workflow يلخّص الاجتماع بالذكاء الاصطناعي، يستخرج المهام والمسؤوليات، ويوزّعها على الحضور تلقائيًا.",
  whoNeedsIt:
    "مدراء المشاريع، الفرق التشغيلية، وأي فريق يعقد اجتماعات منتظمة ويريد متابعة فعّالة لقراراتها.",
  jsonFileName: "darhous-workflow-meeting-summary-distribution.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "إدخال الملاحظات", tool: "Manual / Form", description: "يبدأ بإدخال ملاحظات الاجتماع.", output: "محاور، حضور، ملاحظات" },
    { id: "n2", order: 2, type: "ai", label: "استخراج المهام", tool: "Gemini / OpenAI", description: "يحوّل الملاحظات إلى مهام واضحة بمسؤول لكل مهمة.", riskNote: "لا تُدخل محتوى سريًا إلى نموذج خارجي." },
    { id: "n3", order: 3, type: "storage", label: "إنشاء المهام", tool: "Notion", description: "ينشئ المهام في لوحة المشروع." },
    { id: "n4", order: 4, type: "output", label: "توزيع الملخص", tool: "Gmail", description: "يرسل الملخص والمهام لكل الحضور." },
  ],
};

export default detail;
