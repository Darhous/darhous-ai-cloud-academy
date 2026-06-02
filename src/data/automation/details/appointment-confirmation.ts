import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "appointment-confirmation",
  businessUseCase:
    "الحجوزات تحتاج تأكيدًا وتذكيرًا لتقليل الغياب. هذا الـ workflow يرسل تأكيدًا فور إنشاء الموعد، ثم تذكيرًا قبله بفترة كافية — فينخفض معدل الغياب بشكل ملحوظ.",
  whoNeedsIt:
    "العيادات، الصالونات، المستشارون، والفريلانسرز الذين يحجزون مواعيد مع العملاء.",
  jsonFileName: "darhous-workflow-appointment-confirmation.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "موعد جديد", tool: "Google Calendar", description: "يبدأ عند إنشاء حدث موعد جديد.", output: "عميل، وقت، خدمة" },
    { id: "n2", order: 2, type: "action", label: "رسالة تأكيد", tool: "Gmail", description: "يرسل تأكيدًا فوريًا بتفاصيل الموعد." },
    { id: "n3", order: 3, type: "transform", label: "انتظار للتذكير", tool: "Wait", description: "ينتظر حتى قبل الموعد بـ 24 ساعة.", riskNote: "اضبط المنطقة الزمنية لتجنب إرسال متأخر." },
    { id: "n4", order: 4, type: "notification", label: "تذكير", tool: "WhatsApp / Gmail", description: "يرسل تذكيرًا قبل الموعد بفترة محددة." },
  ],
};

export default detail;
