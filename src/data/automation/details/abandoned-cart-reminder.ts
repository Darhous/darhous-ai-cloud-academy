import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "abandoned-cart-reminder",
  businessUseCase:
    "العملاء يتركون السلة دون إتمام الشراء دون متابعة. هذا الـ workflow ينتظر فترة ثم يرسل تذكيرًا ودودًا (وربما حافزًا)، ويتوقف تلقائيًا إذا أتم العميل الشراء — فيستعيد جزءًا من المبيعات المفقودة.",
  whoNeedsIt:
    "المتاجر الإلكترونية وفرق التسويق التي تريد رفع معدل التحويل واستعادة السلات المتروكة.",
  jsonFileName: "darhous-workflow-abandoned-cart-reminder.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "سلة متروكة", tool: "E-commerce Webhook", description: "يبدأ عند حدث ترك السلة.", output: "عميل، عناصر، قيمة" },
    { id: "n2", order: 2, type: "transform", label: "انتظار", tool: "Wait", description: "ينتظر فترة (مثلًا 30 دقيقة) قبل التذكير." },
    { id: "n3", order: 3, type: "condition", label: "هل أتم الشراء؟", tool: "IF", description: "يتحقق من حالة الطلب قبل الإرسال.", riskNote: "أوقف التسلسل فور إتمام الشراء لتجنب إزعاج العميل." },
    { id: "n4", order: 4, type: "action", label: "تذكير بالبريد", tool: "Email Platform", description: "يرسل رسالة استعادة للسلة المتروكة." },
  ],
};

export default detail;
