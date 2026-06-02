import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "lead-followup-whatsapp",
  businessUseCase:
    "العملاء المحتملون يبردون خلال دقائق إن لم تصلهم متابعة. فور دخول lead جديد للـ CRM، تُرسل رسالة واتساب معتمدة وتُنشأ مهمة متابعة للبائع — فتقفز الاستجابة من ساعات إلى ثوانٍ.",
  whoNeedsIt:
    "فرق المبيعات، العقارات، العيادات، وأي نشاط يعتمد على سرعة الرد على العملاء المحتملين عبر واتساب.",
  jsonFileName: "darhous-workflow-lead-followup-whatsapp.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "Lead جديد", tool: "CRM Webhook", description: "يبدأ عند إضافة lead جديد في الـ CRM.", output: "اسم، هاتف، خدمة، مالك" },
    { id: "n2", order: 2, type: "condition", label: "تحقق من الرقم", tool: "IF", description: "يتأكد من وجود رقم هاتف صالح قبل الإرسال.", riskNote: "إرسال لرقم غير صالح يستهلك حصة الـ API بلا فائدة." },
    { id: "n3", order: 3, type: "action", label: "رسالة واتساب", tool: "WhatsApp Business API", description: "يرسل قالبًا معتمدًا من Meta للترحيب بالعميل.", riskNote: "استخدم قوالب معتمدة فقط؛ لا تستخدم واتساب شخصي." },
    { id: "n4", order: 4, type: "action", label: "مهمة متابعة", tool: "Task Manager", description: "ينشئ مهمة للبائع المسؤول لمتابعة العميل." },
  ],
};

export default detail;
