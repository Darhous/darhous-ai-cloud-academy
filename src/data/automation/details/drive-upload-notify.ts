import type { WorkflowDetail } from "../types";

const detail: WorkflowDetail = {
  id: "drive-upload-notify",
  businessUseCase:
    "الملفات تصل دون متابعة لمن رفعها أو أين خُزنت. هذا الـ workflow ينظّم كل ملف يُرفع، يسجّل بياناته المرجعية، ويُخطر الفريق فورًا — فلا يضيع أي ملف.",
  whoNeedsIt:
    "فرق العمليات، الإدارة، وأي فريق يتعامل مع ملفات مشتركة كثيرة ويحتاج تنظيمًا وإشعارًا.",
  jsonFileName: "darhous-workflow-drive-upload-notify.json",
  workflowMapNodes: [
    { id: "n1", order: 1, type: "trigger", label: "ملف جديد", tool: "Google Drive", description: "يبدأ عند رفع ملف لمجلد مراقَب.", output: "اسم الملف، رافعه، التاريخ" },
    { id: "n2", order: 2, type: "storage", label: "تسجيل مرجعي", tool: "Google Sheets", description: "يسجّل بيانات الملف في جدول قابل للبحث." },
    { id: "n3", order: 3, type: "notification", label: "إشعار الفريق", tool: "Slack", description: "يُخطر الفريق بوصول ملف جديد مع الرابط.", riskNote: "تأكد من صلاحيات الوصول المناسبة للملف." },
  ],
};

export default detail;
