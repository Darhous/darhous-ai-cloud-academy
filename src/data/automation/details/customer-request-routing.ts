import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "customer-request-routing",
  businessUseCase:
    "الطلبات تدخل من قنوات متعددة ولا تصل للفريق الصحيح بسرعة. هذا الـ workflow يحوّل كل طلب إلى تذكرة، يصنّفه حسب النوع والأولوية، ويوجهه للفريق المناسب مع وسم SLA.",
  whoNeedsIt:
    "فرق خدمة العملاء، أقسام الدعم الفني، والشركات التي تتلقى طلبات من أكثر من قناة.",
  jsonFileName: "darhous-workflow-customer-request-routing.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "طلب وارد", tool: "Webhook", description: "يستقبل الطلب من أي قناة (موقع، نموذج، بريد).", output: "عميل، نوع، أولوية، وصف" },
    { id: "n2", order: 2, type: "condition", label: "تصنيف الطلب", tool: "Switch", description: "يوجّه الطلب حسب النوع (تقني / مالي / عام).", riskNote: "تصنيف خاطئ يؤخر الحل؛ راجع قواعد التوجيه دوريًا." },
    { id: "n3", order: 3, type: "storage", label: "إنشاء تذكرة", tool: "Notion / Jira", description: "ينشئ تذكرة بسجل كامل للطلب." },
    { id: "n4", order: 4, type: "notification", label: "إشعار الفريق", tool: "Slack", description: "يُخطر الفريق المسؤول مع وسم الأولوية و SLA." },
  ],
};

export default detail;
