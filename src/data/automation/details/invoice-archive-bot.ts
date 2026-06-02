import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "invoice-archive-bot",
  businessUseCase:
    "الفواتير تتراكم في البريد دون أرشفة منظمة، فيصعب البحث عنها وقت المحاسبة. هذا الـ workflow يلتقط مرفقات الفواتير تلقائيًا، يحفظها في Drive، ويسجّل بياناتها المرجعية في جدول قابل للبحث.",
  whoNeedsIt:
    "أصحاب الأعمال الصغيرة، المحاسبون، وفرق المالية التي تتعامل مع فواتير كثيرة عبر البريد.",
  jsonFileName: "darhous-workflow-invoice-archive-bot.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "بريد فاتورة", tool: "Gmail", description: "يبدأ عند وصول بريد يطابق شروط الفواتير.", output: "رسالة + مرفق" },
    { id: "n2", order: 2, type: "transform", label: "استخراج المرفق", tool: "Gmail", description: "يفصل ملف الفاتورة من الرسالة.", riskNote: "بعض الرسائل قد تصل بلا مرفق؛ أضف تحققًا." },
    { id: "n3", order: 3, type: "storage", label: "حفظ في Drive", tool: "Google Drive", description: "يخزّن الفاتورة في مجلد منظم باسم واضح." },
    { id: "n4", order: 4, type: "storage", label: "تسجيل مرجعي", tool: "Google Sheets", description: "يسجّل المورد والمبلغ والتاريخ ورابط الملف." },
  ],
};

export default detail;
