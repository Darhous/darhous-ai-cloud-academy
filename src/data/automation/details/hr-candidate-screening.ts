import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "hr-candidate-screening",
  businessUseCase:
    "قسم HR يستقبل مئات الطلبات ويراجعها يدويًا دون ترتيب. هذا الـ workflow يجمع التقديمات، يعطي كل مرشح تقييمًا أوليًا بالذكاء الاصطناعي، ويبني قائمة قصيرة — مع إبقاء القرار النهائي بشريًا.",
  whoNeedsIt:
    "أقسام الموارد البشرية، شركات التوظيف، والشركات الناشئة التي تتلقى أعدادًا كبيرة من المتقدمين.",
  jsonFileName: "darhous-workflow-hr-candidate-screening.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "طلب توظيف", tool: "Google Forms", description: "يبدأ عند تقديم مرشح لنموذج التوظيف.", output: "اسم، سيرة، خبرة، دور" },
    { id: "n2", order: 2, type: "ai", label: "تقييم أولي", tool: "Gemini / OpenAI", description: "يقيّم مطابقة المرشح للمعايير ويعطي درجة.", input: "السيرة + المعايير", riskNote: "بيانات السيرة حساسة؛ راجع سياسة الخصوصية والمراجعة البشرية إلزامية." },
    { id: "n3", order: 3, type: "storage", label: "تسجيل النتيجة", tool: "Google Sheets", description: "يسجّل الدرجة والحالة في جدول المرشحين." },
    { id: "n4", order: 4, type: "notification", label: "إشعار HR", tool: "Slack", description: "يُخطر فريق HR بالمرشحين المؤهلين للقائمة القصيرة." },
  ],
};

export default detail;
