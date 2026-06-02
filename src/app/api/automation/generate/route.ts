import { NextRequest, NextResponse } from "next/server";
import { callGemini } from "@/lib/gemini";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import type { AutomationAgentInput, AutomationBlueprint } from "@/data/automation/types";

const SYSTEM_PROMPT = `أنت خبير أتمتة أعمال متخصص في n8n و Make و Zapier.
مهمتك: تحليل وصف العملية التجارية وإنتاج blueprint أتمتة متكامل باللغة العربية.

أعد الرد بـ JSON صالح فقط — لا توضيحات، لا markdown، لا كود blocks.
يجب أن يطابق JSON هذا الهيكل بالضبط:

{
  "id": "bp-<رمز فريد قصير>",
  "title": "عنوان Blueprint: <ملخص العملية>",
  "summary": "ملخص تنفيذي واضح (3-4 جمل) يصف ما يحل هذا الـ blueprint",
  "recommendedStack": ["أداة1", "أداة2", "أداة3"],
  "stackReasoning": ["سبب اختيار أداة1", "سبب اختيار أداة2"],
  "workflowDiagram": ["الخطوة 1: ...", "الخطوة 2: ...", "الخطوة 3: ..."],
  "trigger": "وصف trigger المناسب",
  "actions": ["إجراء 1", "إجراء 2", "إجراء 3"],
  "requiredDataFields": ["حقل بيانات 1", "حقل بيانات 2"],
  "appsInvolved": ["تطبيق 1", "تطبيق 2"],
  "implementationPlan": ["أسبوع 1: ...", "أسبوع 2: ...", "أسبوع 3: ..."],
  "testingChecklist": ["اختبر ...", "تحقق من ...", "راجع ..."],
  "errorHandlingPlan": ["معالجة خطأ 1", "معالجة خطأ 2"],
  "privacyAndSecurityNotes": ["ملاحظة أمان 1", "ملاحظة أمان 2"],
  "maintenancePlan": ["صيانة دورية 1", "صيانة دورية 2"],
  "estimatedComplexity": "مبتدئ أو متوسط أو متقدم",
  "estimatedImplementationTime": "x أسابيع أو أيام",
  "monthlyCostCategory": "مجاني أو منخفض (<50$) أو متوسط أو مرتفع",
  "expectedROI": "وصف العائد المتوقع من الأتمتة",
  "upgradeIdeas": ["فكرة تطوير 1", "فكرة تطوير 2", "فكرة تطوير 3"],
  "clientProposal": "نص مقترح مختصر للعميل (2-3 جمل)",
  "technicalBrief": "ملخص تقني للمطور (2-3 جمل)",
  "buildPrompts": {
    "n8n": "Build a workflow in n8n for: <وصف الـ workflow بالإنجليزية>",
    "make": "Create a Make scenario for: <وصف الـ scenario بالإنجليزية>",
    "zapier": "Set up a Zap for: <وصف الـ Zap بالإنجليزية>",
    "python": "# Python script to automate: <وصف الـ script بالإنجليزية>\\n# Tools: <الأدوات>"
  },
  "savedAt": "<ISO timestamp>"
}

قواعد صارمة:
- أعد JSON صالح فقط بدون أي نص خارجه
- كل المحتوى باللغة العربية ما عدا buildPrompts
- estimatedComplexity يجب أن يكون: "مبتدئ" أو "متوسط" أو "متقدم" فقط
- recommendedStack يتضمن 2-4 أدوات حقيقية (n8n, Make, Zapier, Google Sheets, Notion, etc.)
- workflowDiagram يصف التسلسل المنطقي خطوة بخطوة`;

function extractJson(raw: string): string {
  // Strip markdown fences if Gemini wraps output
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) return fenced[1].trim();
  // Find first { to last }
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start !== -1 && end !== -1) return raw.slice(start, end + 1);
  return raw.trim();
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`automation:${ip}`, { limit: 5, windowSec: 60 });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: `طلبات كثيرة. انتظر ${rl.resetInSec} ثانية.` },
      { status: 429, headers: { "Retry-After": String(rl.resetInSec) } }
    );
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: "AI غير مهيأ. مفتاح API غير موجود.", missingKey: true }, { status: 503 });
  }

  let input: AutomationAgentInput;
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ error: "طلب غير صالح." }, { status: 400 });
  }

  if (!input.businessGoal || input.businessGoal.trim().length < 10) {
    return NextResponse.json({ error: "يرجى وصف هدفك التجاري بوضوح (10 أحرف على الأقل)." }, { status: 400 });
  }

  const userMessage = `
القسم: ${input.department}
الهدف: ${input.objective}
وصف العملية: ${input.businessGoal}
الخطوات الحالية: ${input.currentSteps || "غير محدد"}
المسؤول: ${input.owner || "غير محدد"}
التكرار: ${input.frequency || "غير محدد"}
نقاط الألم: ${input.painPoints || "غير محدد"}
التطبيقات المستخدمة: ${input.apps.join(", ") || "غير محدد"}
trigger المطلوب: ${input.trigger || "غير محدد"}
الإجراءات المطلوبة: ${input.desiredActions.join(", ") || "غير محدد"}
القيود: ${input.constraints.join(", ") || "لا قيود"}

أنشئ AutomationBlueprint شاملاً ومخصصاً لهذه العملية.`.trim();

  try {
    const raw = await callGemini(
      [{ role: "user", content: userMessage }],
      SYSTEM_PROMPT,
      "gemini-2.5-flash"
    );

    const jsonStr = extractJson(raw);
    const blueprint: AutomationBlueprint = JSON.parse(jsonStr);

    // Ensure required fields exist and savedAt is set
    blueprint.savedAt = new Date().toISOString();
    if (!blueprint.id) blueprint.id = `bp-${Date.now()}`;

    return NextResponse.json(blueprint);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "خطأ غير متوقع";
    console.error("[automation/generate]", msg);
    return NextResponse.json({ error: `فشل توليد الـ blueprint: ${msg}` }, { status: 500 });
  }
}
