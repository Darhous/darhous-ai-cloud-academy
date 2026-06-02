import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "social-content-approval",
  businessUseCase:
    "فريق تسويق ينشر محتوى دون سلسلة اعتماد واضحة، فتحدث أخطاء أو تأخير. هذا الـ workflow ينقل المحتوى عبر حالات (مسودة → مراجعة → معتمد → منشور) مع إشعار المراجع في كل خطوة.",
  whoNeedsIt:
    "فرق التسويق، الوكالات، ومدراء وسائل التواصل الذين يديرون محتوى متعدد القنوات ويحتاجون انضباطًا في الاعتماد.",
  jsonFileName: "darhous-workflow-social-content-approval.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "محتوى جديد", tool: "Notion", description: "يبدأ عند إضافة عنصر محتوى جديد في قاعدة Notion.", output: "عنوان، قناة، مالك، موعد" },
    { id: "n2", order: 2, type: "notification", label: "طلب مراجعة", tool: "Slack", description: "يُخطر المراجع بوجود محتوى ينتظر الاعتماد." },
    { id: "n3", order: 3, type: "condition", label: "حالة الاعتماد", tool: "IF", description: "يتحقق هل تم الاعتماد أم يحتاج تعديلًا.", riskNote: "امنع تخطي خطوة الاعتماد قبل النشر." },
    { id: "n4", order: 4, type: "action", label: "تحديث الحالة", tool: "Notion", description: "يحدّث حالة المحتوى ويسلّمه لقائمة النشر." },
  ],
};

export default detail;
