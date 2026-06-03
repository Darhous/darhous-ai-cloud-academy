import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "social-media-post-scheduler",
  businessUseCase:
    "فريق التسويق يجدول عشرات المنشورات أسبوعيًا على قنوات متعددة. بدلًا من الدخول يدويًا لكل منصة، يُدار كل المحتوى من Airtable ويُنشر تلقائيًا في الوقت المحدد — مع تحديث الحالة فور النشر.",
  whoNeedsIt:
    "مديرو التسويق ومنشئو المحتوى الذين يديرون حضورًا على أكثر من قناة، وكالات التسويق الرقمي، وأصحاب المشاريع الصغيرة.",
  jsonFileName: "social-media-post-scheduler.json",
  workflowMapNodes: [
    {
      id: "n1",
      order: 1,
      type: "trigger",
      label: "فحص ساعي",
      tool: "n8n Schedule",
      description: "يعمل كل ساعة للبحث عن منشورات جاهزة للنشر.",
    },
    {
      id: "n2",
      order: 2,
      type: "action",
      label: "قراءة Airtable",
      tool: "Airtable",
      description: "يسحب المنشورات ذات الحالة 'مجدول' التي حان وقتها.",
    },
    {
      id: "n3",
      order: 3,
      type: "condition",
      label: "التحقق من القناة",
      tool: "n8n Switch node",
      description: "يُوجّه كل منشور للـ node الخاص بقناته: Twitter / LinkedIn / Instagram.",
    },
    {
      id: "n4",
      order: 4,
      type: "action",
      label: "النشر وتحديث الحالة",
      tool: "Buffer API / Airtable",
      description: "يُرسل المنشور للقناة المناسبة ثم يُحدّث حالته في Airtable إلى 'منشور'.",
      output: "منشور حي على القناة + سجل Airtable محدّث",
      riskNote: "تحقق من صلاحيات API كل 60 يومًا — بعض المنصات تُلغي الرموز دوريًا.",
    },
  ],
};

export default detail;
