import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "expense-report-approval",
  businessUseCase:
    "الفرق المالية تهدر وقتًا في متابعة طلبات المصروفات اليدوية. هذا الـ workflow يُرسّل كل طلب من النموذج إلى المعتمد المناسب — مع التحقق من الحد المالي — ثم يُحدّث الجدول فور صدور القرار.",
  whoNeedsIt:
    "المديرون الماليون، أصحاب الشركات الصغيرة، وأي فريق يعالج مصروفات منتظمة ويحتاج توثيقًا وسرعة.",
  jsonFileName: "expense-report-approval.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "طلب مصروف", tool: "Google Forms", description: "يبدأ عند تقديم موظف طلب مصروف جديد.", output: "اسم الموظف، المبلغ، السبب، المرفق" },
    { id: "n2", order: 2, type: "condition", label: "التحقق من الحد", tool: "n8n IF node", description: "يُفرّع: مبالغ ≤ 500 → موافقة مدير مباشر، > 500 → تصعيد للمدير المالي.", riskNote: "اضبط الحد المالي حسب سياسة شركتك." },
    { id: "n3", order: 3, type: "action", label: "بريد الاعتماد", tool: "Gmail", description: "يُرسل بريدًا للمعتمد مع تفاصيل الطلب ورابط الموافقة أو الرفض." },
    { id: "n4", order: 4, type: "storage", label: "تسجيل الطلب", tool: "Google Sheets", description: "يُضيف الطلب لجدول المصروفات بحالة 'قيد المراجعة'." },
    { id: "n5", order: 5, type: "action", label: "تحديث الحالة", tool: "Google Sheets", description: "يُحدّث حالة الطلب (موافق / مرفوض) عند رد المعتمد.", output: "سجل مصروف مكتمل بالقرار والتاريخ" },
  ],
};

export default detail;
