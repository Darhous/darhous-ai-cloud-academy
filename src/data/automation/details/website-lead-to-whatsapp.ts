import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "website-lead-to-whatsapp",
  businessUseCase:
    "الاستفسارات من الموقع لا يتبعها تواصل سريع فتضيع. فور إرسال العميل لنموذج الموقع، يُسجَّل في الـ CRM وتصله رسالة واتساب فورية ويُخطر البائع — استجابة في دقيقة بدل ساعات.",
  whoNeedsIt:
    "المتاجر الإلكترونية، مقدمو الخدمات، والشركات التي تعتمد على نموذج الموقع لتجميع الاستفسارات.",
  jsonFileName: "darhous-workflow-website-lead-to-whatsapp.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "استفسار الموقع", tool: "Webhook", description: "يستقبل بيانات نموذج الموقع لحظة الإرسال.", output: "اسم، هاتف، خدمة" },
    { id: "n2", order: 2, type: "action", label: "تحديث CRM", tool: "CRM", description: "ينشئ سجل lead ويعيّن مالكًا." },
    { id: "n3", order: 3, type: "action", label: "رسالة واتساب", tool: "WhatsApp Business API", description: "يرسل رسالة ترحيب أولية للعميل.", riskNote: "اختبر في Sandbox أولًا واستخدم قوالب معتمدة." },
    { id: "n4", order: 4, type: "notification", label: "إشعار البائع", tool: "Slack", description: "يُخطر البائع باستفسار جديد للمتابعة." },
  ],
};

export default detail;
