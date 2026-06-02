import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "student-welcome-flow",
  businessUseCase:
    "مركز تعليمي يستقبل عشرات التسجيلات أسبوعيًا عبر Google Form. بدل المتابعة اليدوية، تُرسل رسالة ترحيب فورية وتُسجَّل بيانات الطالب تلقائيًا ويُخطَر المنسق — كل ذلك خلال ثوانٍ من التسجيل.",
  whoNeedsIt:
    "المراكز التعليمية، الأكاديميات، المدربون الأفراد، وأي جهة تستقبل تسجيلات عبر النماذج وتريد بداية احترافية متسقة مع كل طالب.",
  jsonFileName: "darhous-workflow-student-welcome-flow.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "تسجيل جديد", tool: "Google Forms", description: "يبدأ التشغيل عند إرسال طالب لنموذج التسجيل.", output: "بيانات الطالب (الاسم، البريد، الهاتف، الدورة)" },
    { id: "n2", order: 2, type: "storage", label: "تسجيل في الجدول", tool: "Google Sheets", description: "يضيف صفًا جديدًا بسجل الطالب في قاعدة البيانات.", input: "حقول النموذج", output: "سجل طالب محفوظ" },
    { id: "n3", order: 3, type: "action", label: "رسالة ترحيب", tool: "Gmail", description: "يرسل بريد ترحيب مخصص باسم الطالب والدورة.", input: "اسم الطالب + الدورة", riskNote: "تأكد من صحة البريد قبل الإرسال لتجنب الارتداد." },
    { id: "n4", order: 4, type: "notification", label: "إشعار المنسق", tool: "Telegram", description: "يُخطر فريق المتابعة بوصول تسجيل جديد." },
  ],
};

export default detail;
