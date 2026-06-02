import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "project-task-from-email",
  businessUseCase:
    "الطلبات الواردة بالبريد تُفقد في صندوق المشترك الفوضوي. هذا الـ workflow يُحوّل كل بريد مؤهَّل إلى مهمة منظّمة في Notion — مع العنوان والأولوية والمسؤول — فلا يضيع طلب واحد.",
  whoNeedsIt:
    "مديرو المشاريع، الفرق التشغيلية، وأصحاب المشاريع الفردية الذين يتلقّون طلبات يومية بالبريد.",
  jsonFileName: "project-task-from-email.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "بريد جديد", tool: "Gmail", description: "يبدأ عند وصول بريد يحمل label محدد أو من مُرسِل معروف.", output: "الموضوع، المُرسِل، المحتوى", riskNote: "استخدم label محدد — لا تربط بصندوق الوارد الكامل." },
    { id: "n2", order: 2, type: "transform", label: "استخراج البيانات", tool: "n8n Set node", description: "يُنظّم البيانات: العنوان من الموضوع، الأولوية من كلمات مفتاحية." },
    { id: "n3", order: 3, type: "action", label: "إنشاء المهمة", tool: "Notion", description: "يُنشئ صفحة مهمة جديدة مع كل الحقول المطلوبة في قاعدة البيانات." },
    { id: "n4", order: 4, type: "notification", label: "إشعار المسؤول", tool: "Gmail", description: "يُخطر المسؤول بإنشاء مهمة جديدة مع رابط Notion.", output: "مهمة Notion جاهزة + إشعار بريدي" },
  ],
};

export default detail;
