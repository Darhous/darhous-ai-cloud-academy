import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "course-registration-pipeline",
  businessUseCase:
    "تسجيل الطلاب ومتابعة المدفوعات والتأكيدات تتم يدويًا فتحدث أخطاء. هذا الـ workflow يدير الرحلة كاملة من التسجيل إلى التأكيد وتذكير ما قبل البداية، مع إشعار فريق المتابعة.",
  whoNeedsIt:
    "المراكز التعليمية والأكاديميات التي تدير دورات بمواعيد ودفعات متعددة وتريد تجربة تسجيل احترافية.",
  jsonFileName: "darhous-workflow-course-registration-pipeline.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "تسجيل دورة", tool: "Google Forms", description: "يبدأ عند تسجيل طالب في دورة.", output: "طالب، دورة، دفع، موعد بداية" },
    { id: "n2", order: 2, type: "storage", label: "سجل الطالب", tool: "Google Sheets", description: "يضيف الطالب مع حالة الدفع المبدئية.", riskNote: "فعّل منع التسجيل المكرر لنفس الطالب." },
    { id: "n3", order: 3, type: "action", label: "رسالة تأكيد", tool: "Gmail", description: "يرسل تأكيد القبول وتفاصيل الدورة." },
    { id: "n4", order: 4, type: "action", label: "جدولة تذكير", tool: "Google Calendar", description: "ينشئ تذكيرًا قبل موعد بداية الدورة." },
  ],
};

export default detail;
