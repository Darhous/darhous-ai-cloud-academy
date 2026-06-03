import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "client-invoice-generator",
  businessUseCase:
    "بعد إتمام أي خدمة، يملأ المزوّد نموذجًا بسيطًا ببيانات العميل والمبلغ — فتخرج فاتورة PDF احترافية وتصل للعميل فورًا بالبريد، مع تسجيل تلقائي في جدول الإيرادات الشهرية.",
  whoNeedsIt:
    "المستقلون، الاستشاريون، صغار رواد الأعمال، ومزودو الخدمات الذين يُصدرون فواتير متعددة شهريًا.",
  jsonFileName: "client-invoice-generator.json",
  workflowMapNodes: [
    {
      id: "n1",
      order: 1,
      type: "trigger",
      label: "نموذج الخدمة",
      tool: "Google Forms",
      description: "عند إتمام الخدمة يملأ المزوّد النموذج ببيانات العميل والمبلغ والخدمة.",
    },
    {
      id: "n2",
      order: 2,
      type: "action",
      label: "توليد الفاتورة",
      tool: "Google Sheets + Apps Script",
      description: "يُنشئ فاتورة PDF بالبيانات المُدخَلة مع رقم تسلسلي تلقائي.",
      output: "ملف PDF جاهز للإرسال",
    },
    {
      id: "n3",
      order: 3,
      type: "notification",
      label: "إرسال وتسجيل",
      tool: "Gmail + Google Sheets",
      description: "يُرسل الفاتورة PDF للعميل ويُسجّل الإيراد في جدول المتابعة الشهرية.",
      riskNote: "تحقق من صحة البريد الإلكتروني للعميل قبل الإرسال.",
    },
  ],
};

export default detail;
