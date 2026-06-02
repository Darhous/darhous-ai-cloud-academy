import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "daily-ai-email-brief",
  businessUseCase:
    "مدير يستقبل عشرات الرسائل يوميًا ولا وقت لمراجعتها كلها. كل صباح يجمع الـ workflow الرسائل المهمة، يلخّصها بالذكاء الاصطناعي بالعربية، ويرسل موجزًا واحدًا بأهم القرارات المطلوبة.",
  whoNeedsIt:
    "المدراء التنفيذيون، رواد الأعمال، ومدراء الفرق الذين يغرقون في البريد ويحتاجون رؤية سريعة كل صباح.",
  jsonFileName: "darhous-workflow-daily-ai-email-brief.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "مؤقت يومي", tool: "Schedule", description: "يبدأ التشغيل كل صباح في وقت محدد." },
    { id: "n2", order: 2, type: "action", label: "جلب الرسائل", tool: "Gmail", description: "يقرأ رسائل اليوم من labels محددة.", output: "قائمة رسائل (مرسل، موضوع، محتوى)" },
    { id: "n3", order: 3, type: "ai", label: "تلخيص ذكي", tool: "Gemini / OpenAI", description: "يولّد ملخصًا عربيًا بأهم النقاط والقرارات.", input: "نصوص الرسائل", riskNote: "لا ترسل رسائل سرية إلى نموذج خارجي دون موافقة." },
    { id: "n4", order: 4, type: "output", label: "إرسال الموجز", tool: "Gmail / Notion", description: "يحفظ الملخص أو يرسله إلى بريدك الشخصي." },
  ],
};

export default detail;
