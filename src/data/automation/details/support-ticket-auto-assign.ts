import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "support-ticket-auto-assign",
  businessUseCase:
    "كل بريد يصل لصندوق الدعم يُفحص تلقائيًا، يُصنَّف حسب الكلمات المفتاحية (تقني / فوترة / عام)، ثم يُنشئ له تذكرة Trello ويُسندها للشخص المختص — ليُركّز الفريق على الحل لا على الفرز.",
  whoNeedsIt:
    "فرق دعم العملاء، الشركات التقنية الناشئة، ومزودو الخدمات الذين يستقبلون أكثر من 20 طلب دعم أسبوعيًا.",
  jsonFileName: "support-ticket-auto-assign.json",
  workflowMapNodes: [
    {
      id: "n1",
      order: 1,
      type: "trigger",
      label: "بريد الدعم",
      tool: "Gmail",
      description: "يراقب صندوق بريد الدعم ويُشغَّل عند كل رسالة جديدة.",
    },
    {
      id: "n2",
      order: 2,
      type: "condition",
      label: "تصنيف الفئة",
      tool: "n8n Switch node",
      description: "يُحدّد الفئة بحث الكلمات المفتاحية: 'خطأ/bug' → تقني، 'دفع/فاتورة' → مالي، غيرها → عام.",
    },
    {
      id: "n3",
      order: 3,
      type: "action",
      label: "تذكرة Trello",
      tool: "Trello",
      description: "يُنشئ card في القائمة المناسبة مع عنوان البريد ومعلومات المُرسِل والأولوية.",
      output: "تذكرة Trello في القائمة الصحيحة مع الإسناد",
    },
    {
      id: "n4",
      order: 4,
      type: "notification",
      label: "تأكيد للعميل",
      tool: "Gmail",
      description: "يُرسل ردًّا تلقائيًا للعميل برقم التذكرة ووقت الاستجابة المتوقع.",
      riskNote: "أضف آلية escalation للتذاكر التي تتجاوز 2 ساعة بدون رد.",
    },
  ],
};

export default detail;
