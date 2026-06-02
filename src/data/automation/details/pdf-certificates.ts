import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "pdf-certificates",
  businessUseCase:
    "إصدار الشهادات يدويًا يستهلك وقتًا ويسبب أخطاء في الأسماء والتواريخ. فور إكمال الطالب للدورة، يولّد الـ workflow شهادة PDF مخصصة، يحفظها في Drive، ويرسلها للطالب تلقائيًا.",
  whoNeedsIt:
    "المراكز التدريبية، الأكاديميات، ومنظمي الورش الذين يصدرون شهادات إتمام بأعداد كبيرة.",
  jsonFileName: "darhous-workflow-pdf-certificates.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "إكمال دورة", tool: "Google Sheets", description: "يبدأ عند تحديث صف بحالة إكمال الطالب.", output: "اسم، مسار، تاريخ، درجة" },
    { id: "n2", order: 2, type: "action", label: "توليد PDF", tool: "PDF Generator", description: "ينشئ شهادة PDF من قالب مع بيانات الطالب.", input: "بيانات الطالب", riskNote: "تحقق من ترميز الأسماء العربية لتجنب الأحرف المشوهة." },
    { id: "n3", order: 3, type: "storage", label: "حفظ في Drive", tool: "Google Drive", description: "يخزّن الشهادة في مجلد منظم للرجوع إليها." },
    { id: "n4", order: 4, type: "output", label: "إرسال للطالب", tool: "Gmail", description: "يرسل الشهادة كمرفق إلى بريد الطالب." },
  ],
};

export default detail;
