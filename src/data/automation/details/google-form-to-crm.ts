import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "google-form-to-crm",
  businessUseCase:
    "فريق مبيعات يستقبل عملاء محتملين عبر نموذج على الموقع. بدل نسخ البيانات يدويًا إلى الـ CRM (وأحيانًا نسيانها)، يدخل كل lead تلقائيًا بسجل كامل ومالك محدد وإشعار فوري للبائع.",
  whoNeedsIt:
    "فرق المبيعات الصغيرة والمتوسطة، الوكالات، ومن يعتمد على نماذج لتجميع العملاء ويريد ألا تضيع أي فرصة.",
  jsonFileName: "darhous-workflow-google-form-to-crm.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "نموذج جديد", tool: "Google Forms", description: "يبدأ عند إرسال عميل محتمل للنموذج.", output: "اسم، هاتف، بريد، مصدر" },
    { id: "n2", order: 2, type: "action", label: "إنشاء Lead", tool: "HubSpot / CRM", description: "ينشئ سجل lead جديدًا ويعيّن مالكًا ومرحلة أولية.", input: "حقول النموذج", riskNote: "فعّل منع التكرار (deduplication) على البريد أو الهاتف." },
    { id: "n3", order: 3, type: "notification", label: "إشعار البائع", tool: "Gmail", description: "يرسل تنبيهًا للبائع المسؤول بوصول lead جديد للمتابعة الفورية." },
  ],
};

export default detail;
