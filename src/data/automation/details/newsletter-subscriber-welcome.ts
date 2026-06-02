import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "newsletter-subscriber-welcome",
  businessUseCase:
    "النشرات البريدية تفقد المشتركين الجدد حين لا يتلقّون ترحيبًا فوريًا. هذا الـ workflow يُرسل رسالة ترحيب في ثوانٍ، يُصنّف المشترك حسب اهتمامه، ويجدول رسالة متابعة — بدون أي تدخل يدوي.",
  whoNeedsIt:
    "المدوّنون، أصحاب المشاريع الصغيرة، وفرق التسويق التي تدير قوائم بريدية وتريد انطباعًا أولًا قويًا.",
  jsonFileName: "newsletter-subscriber-welcome.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "مشترك جديد", tool: "Google Forms", description: "يبدأ عند تسجيل مشترك جديد في النشرة.", output: "الاسم، البريد، الاهتمام" },
    { id: "n2", order: 2, type: "action", label: "رسالة الترحيب", tool: "Gmail", description: "يُرسل رسالة ترحيب مُخصّصة باسم المشترك ومحتوى يناسب اهتمامه." },
    { id: "n3", order: 3, type: "storage", label: "تسجيل المشترك", tool: "Google Sheets", description: "يُضيف المشترك لجدول القائمة مع تصنيف الاهتمام والتاريخ.", output: "مشترك موثّق في القائمة" },
  ],
};

export default detail;
