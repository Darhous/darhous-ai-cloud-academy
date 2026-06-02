import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "content-repurpose-pipeline",
  businessUseCase:
    "المحتوى يُنتج مرة واحدة ولا يُعاد توزيعه بذكاء. من فكرة واحدة، يولّد هذا الـ workflow نسخًا مخصصة لكل قناة (تويتر، لينكدإن، بريد، مدونة) جاهزة للمراجعة — فتتضاعف الإنتاجية.",
  whoNeedsIt:
    "فرق التسويق، صنّاع المحتوى، والوكالات التي تريد أقصى استفادة من كل فكرة محتوى عبر قنوات متعددة.",
  jsonFileName: "darhous-workflow-content-repurpose-pipeline.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "فكرة محتوى", tool: "Manual / Notion", description: "يبدأ بإدخال الفكرة الأصلية.", output: "عنوان، جمهور، هدف" },
    { id: "n2", order: 2, type: "ai", label: "توليد النسخ", tool: "Gemini / OpenAI", description: "يولّد نسخة مخصصة لكل قناة بنبرة مناسبة.", riskNote: "راجع كل نسخة قبل النشر؛ AI قد ينتج محتوى غير دقيق." },
    { id: "n3", order: 3, type: "transform", label: "تنسيق القنوات", tool: "Code / Set", description: "يضبط طول وتنسيق كل نسخة حسب القناة." },
    { id: "n4", order: 4, type: "storage", label: "حفظ المسودات", tool: "Notion", description: "يحفظ كل النسخ في لوحة للمراجعة والجدولة." },
  ],
};

export default detail;
