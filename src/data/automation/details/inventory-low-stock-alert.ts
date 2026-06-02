import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "inventory-low-stock-alert",
  businessUseCase:
    "المخازن تكتشف نفاد المنتجات بعد فوات الأوان. هذا الـ workflow يفحص جدول المخزون يوميًا ويُرسل تقريرًا يُدرج كل منتج وصل دون حد التنبيه — مع الكمية والتاريخ — قبل أن تخسر مبيعات.",
  whoNeedsIt:
    "مديرو المخازن، أصحاب المتاجر الإلكترونية، والشركات التجارية التي تدير مخزونًا في Google Sheets.",
  jsonFileName: "inventory-low-stock-alert.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "جدول يومي", tool: "n8n Schedule", description: "يبدأ تلقائيًا كل صباح في وقت محدد." },
    { id: "n2", order: 2, type: "action", label: "قراءة المخزون", tool: "Google Sheets", description: "يقرأ جدول المخزون الكامل مع الكميات وحدود التنبيه." },
    { id: "n3", order: 3, type: "condition", label: "فلتر الناقص", tool: "n8n Filter node", description: "يُصفّي المنتجات التي تساوي الكمية الحالية أو أقل من حد التنبيه." },
    { id: "n4", order: 4, type: "notification", label: "تقرير التنبيه", tool: "Gmail", description: "يُرسل بريدًا يُدرج المنتجات الناقصة بجدول واضح للمسؤول.", output: "تقرير يومي بالمنتجات الناقصة", riskNote: "لا ترسل إذا لم تكن هناك منتجات ناقصة لتجنب الضوضاء." },
  ],
};

export default detail;
