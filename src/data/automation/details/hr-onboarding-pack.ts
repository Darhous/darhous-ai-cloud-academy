import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "hr-onboarding-pack",
  businessUseCase:
    "الموظف الجديد يستقبل الخطوات والوثائق بشكل متفرق فتتأخر جاهزيته. هذا الـ workflow ينشئ تلقائيًا قائمة مهام ومجلد مستندات ويرسل رسالة ترحيب فور اعتماد التوظيف.",
  whoNeedsIt:
    "أقسام الموارد البشرية ومدراء الفرق الذين يريدون تجربة onboarding متسقة لكل موظف جديد.",
  jsonFileName: "darhous-workflow-hr-onboarding-pack.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "موظف معتمد", tool: "HR System / Webhook", description: "يبدأ عند تغيير حالة المرشح إلى مقبول.", output: "اسم، دور، تاريخ بداية، مدير" },
    { id: "n2", order: 2, type: "storage", label: "مجلد الموظف", tool: "Google Drive", description: "ينشئ مجلدًا منظمًا لوثائق الموظف." },
    { id: "n3", order: 3, type: "action", label: "قائمة مهام", tool: "Trello", description: "ينشئ board onboarding بالمهام الأساسية." },
    { id: "n4", order: 4, type: "notification", label: "ترحيب وإشعار", tool: "Gmail / Slack", description: "يرسل رسالة ترحيب ويُخطر المدير بموعد البداية.", riskNote: "تأكد من اكتمال بيانات الموظف قبل التشغيل." },
  ],
};

export default detail;
