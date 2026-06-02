import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "customer-feedback-routing",
  businessUseCase:
    "فرق الدعم تفقد التقييمات السلبية في صندوق البريد العام. هذا الـ workflow يصنّف كل تقييم فور استلامه ويُحيله للمسؤول المختص — الشكاوى الحرجة تصل خلال دقائق لا أيام.",
  whoNeedsIt:
    "مديرو خدمة العملاء، الشركات التي تجمع تقييمات منتظمة، وأي فريق يريد تحويل الشكاوى إلى فرص تحسين.",
  jsonFileName: "customer-feedback-routing.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "تقييم جديد", tool: "Google Forms", description: "يبدأ عند إرسال تقييم من العميل.", output: "اسم العميل، التقييم (1-5)، التعليق" },
    { id: "n2", order: 2, type: "condition", label: "تصنيف التقييم", tool: "n8n IF node", description: "1-2 نجوم → مسار الشكاوى، 3 → متابعة، 4-5 → شكر وتوثيق.", riskNote: "لا تُرسل ردًا آليًا كاملًا للشكاوى الحساسة." },
    { id: "n3", order: 3, type: "notification", label: "إشعار المسؤول", tool: "Gmail", description: "يُرسل بريدًا للمسؤول المختص مع تفاصيل التقييم حسب فئته." },
    { id: "n4", order: 4, type: "storage", label: "تسجيل التقييم", tool: "Google Sheets", description: "يُسجّل كل التقييمات مع التصنيف والتاريخ لتتبع الاتجاهات.", output: "سجل تقييمات مكتمل" },
  ],
};

export default detail;
