import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "ecommerce-new-order-notify",
  businessUseCase:
    "لحظة ورود طلب جديد من المتجر الإلكتروني، يتلقى فريق التجهيز إشعارًا فوريًا على Telegram مع كامل تفاصيل الطلب، ويتلقى العميل بريد تأكيد — كل ذلك في أقل من 10 ثوانٍ بدون أي تدخل بشري.",
  whoNeedsIt:
    "أصحاب المتاجر الإلكترونية، شركات الدروبشيبينج، وأي متجر يُدير طلباته على WooCommerce أو Shopify أو أي منصة تدعم Webhooks.",
  jsonFileName: "ecommerce-new-order-notify.json",
  workflowMapNodes: [
    {
      id: "n1",
      order: 1,
      type: "trigger",
      label: "Webhook طلب جديد",
      tool: "n8n Webhook",
      description: "يستقبل بيانات الطلب الجديد من منصة التجارة الإلكترونية فور تأكيده.",
    },
    {
      id: "n2",
      order: 2,
      type: "notification",
      label: "إشعار الفريق",
      tool: "Telegram Bot",
      description: "يُرسل رسالة Telegram للمجموعة أو القناة مع رقم الطلب والمنتجات والمبلغ.",
      output: "رسالة Telegram فورية للفريق",
    },
    {
      id: "n3",
      order: 3,
      type: "action",
      label: "تأكيد العميل + تسجيل",
      tool: "Gmail + Google Sheets",
      description: "يُرسل بريد تأكيد للعميل برقم الطلب والوقت المتوقع، ويُسجّل الطلب في Sheets.",
      riskNote: "أضف فحص معرف الطلب لتجنب إشعارات مكررة عند إعادة إرسال Webhook.",
    },
  ],
};

export default detail;
