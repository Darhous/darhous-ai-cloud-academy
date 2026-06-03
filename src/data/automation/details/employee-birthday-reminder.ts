import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "employee-birthday-reminder",
  businessUseCase:
    "كل صباح يفحص الـ workflow جدول الموظفين، ومن يُصادف عيد ميلاده اليوم يتلقى بريدًا شخصيًا وينبّه مديره على Slack — بدون أي تدخل من HR، وبدون أن تنسى أحدًا أبدًا.",
  whoNeedsIt:
    "أقسام الموارد البشرية، مديرو الفرق الصغيرة، والشركات التي تُولي أهمية لبناء ثقافة عمل إيجابية.",
  jsonFileName: "employee-birthday-reminder.json",
  workflowMapNodes: [
    {
      id: "n1",
      order: 1,
      type: "trigger",
      label: "جدول يومي الصباح",
      tool: "n8n Schedule",
      description: "يعمل كل يوم الساعة 8 صباحًا للبحث عن أعياد الميلاد.",
    },
    {
      id: "n2",
      order: 2,
      type: "action",
      label: "قراءة قائمة الموظفين",
      tool: "Google Sheets",
      description: "يقرأ جدول الموظفين ويُصفّي من يُوافق اليوم تاريخ ميلاده.",
    },
    {
      id: "n3",
      order: 3,
      type: "notification",
      label: "إرسال التهنئة والإشعار",
      tool: "Gmail + Slack",
      description: "يُرسل بريد تهنئة شخصي للموظف، ورسالة Slack للمدير لتقديم تهنئة حضورية.",
      output: "بريد تهنئة + رسالة Slack مع اسم الموظف",
      riskNote: "تأكد من إزالة الموظفين المُستقيلين من الجدول لتجنب الإحراج.",
    },
  ],
};

export default detail;
