import { NextRequest, NextResponse } from "next/server";
import { callGemini } from "@/lib/gemini";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { aiGuard } from "@/lib/ai-guard";
import type { AutomationAgentInput, AutomationBlueprint } from "@/data/automation/types";

const SYSTEM_PROMPT = `أنت خبير أتمتة أعمال متخصص في n8n و Make و Zapier.
مهمتك: تحليل وصف العملية التجارية وإنتاج blueprint أتمتة متكامل باللغة العربية.

⚠️ قواعد الإخراج — الأهم على الإطلاق:
- ابدأ ردّك مباشرةً بـ { وأنهِه بـ } — لا شيء قبله ولا بعده
- JSON صالح فقط: لا markdown، لا \`\`\`json، لا شرح، لا مقدمة
- لا قيم null أو undefined — كل حقل له قيمة نصية أو مصفوفة غير فارغة
- التحقق الذاتي: تأكد أن JSON يمكن تحليله بـ JSON.parse قبل الإرسال

الهيكل المطلوب بالضبط:

{
  "id": "bp-XXXXX",
  "title": "Blueprint: <اسم العملية التجارية>",
  "summary": "<فقرة 3-4 جمل: ما المشكلة؟ كيف تحلّها الأتمتة؟ ما النتيجة المتوقعة؟>",
  "recommendedStack": ["<أداة رئيسية>", "<أداة ثانوية>", "<أداة ثالثة>"],
  "stackReasoning": ["<سبب اختيار الأداة 1 بجملة واحدة>", "<سبب الأداة 2>", "<سبب الأداة 3>"],
  "workflowDiagram": [
    "الخطوة 1: <حدث البداية — Trigger>",
    "الخطوة 2: <استرجاع أو فلترة البيانات>",
    "الخطوة 3: <معالجة أو تحويل البيانات>",
    "الخطوة 4: <إجراء تلقائي رئيسي>",
    "الخطوة 5: <إشعار أو تأكيد أو تسجيل>"
  ],
  "trigger": "<نوع المحفّز: Webhook / Cron Schedule / Form Submission / Email / API Poll>",
  "actions": ["<إجراء دقيق 1>", "<إجراء دقيق 2>", "<إجراء دقيق 3>", "<إجراء دقيق 4>"],
  "requiredDataFields": ["<اسم الحقل ونوعه: مثل 'اسم العميل (نص)'>", "<حقل 2>", "<حقل 3>"],
  "appsInvolved": ["<تطبيق 1>", "<تطبيق 2>", "<تطبيق 3>"],
  "implementationPlan": [
    "الأسبوع 1: <إعداد الـ trigger وربط الحسابات وتهيئة البيئة>",
    "الأسبوع 2: <بناء nodes المعالجة والـ actions الرئيسية>",
    "الأسبوع 3: <الاختبار الشامل وإصلاح الأخطاء والنشر>"
  ],
  "testingChecklist": [
    "اختبر <سيناريو الحالة الطبيعية> وتحقق من <النتيجة المتوقعة>",
    "اختبر <حالة البيانات المفقودة أو الفارغة>",
    "تحقق من وصول الإشعارات في <الوقت المحدد>",
    "راجع <سجلات الأخطاء> بعد 24 ساعة تشغيل"
  ],
  "errorHandlingPlan": [
    "<آلية إعادة المحاولة عند فشل API: مثال retry 3 مرات>",
    "<إشعار فوري للمسؤول عند توقف الـ workflow>",
    "<تسجيل الأخطاء في Google Sheets أو Airtable>"
  ],
  "privacyAndSecurityNotes": [
    "<بيانات حساسة يجب تشفيرها أو إخفاؤها>",
    "<صلاحيات الوصول المطلوبة وكيفية تقليلها>"
  ],
  "maintenancePlan": [
    "<مراجعة أسبوعية: التحقق من سجلات التشغيل>",
    "<مراجعة شهرية: تحديث credentials وفحص API limits>"
  ],
  "estimatedComplexity": "مبتدئ",
  "estimatedImplementationTime": "<رقم> أسابيع",
  "monthlyCostCategory": "مجاني",
  "expectedROI": "<وصف قابل للقياس: مثال 'توفير 8 ساعات أسبوعياً وتقليل الأخطاء بنسبة 90٪'>",
  "upgradeIdeas": [
    "<إضافة AI لتحليل البيانات تلقائياً>",
    "<ربط تقرير أسبوعي تلقائي>",
    "<إضافة approval step بشري قبل الإرسال>"
  ],
  "clientProposal": "<2-3 جمل بلغة مهنية موجّهة للعميل: ما ستوفّره الأتمتة وكيف تُنفَّذ>",
  "technicalBrief": "<2-3 جمل للمطور: الـ trigger، الـ nodes الرئيسية، متطلبات الـ credentials>",
  "buildPrompts": {
    "n8n": "Build an n8n workflow that: <precise English description of the full flow>. Nodes needed: <list key nodes>.",
    "make": "Create a Make (Integromat) scenario that: <precise English description>. Modules: <list key modules>.",
    "zapier": "Set up a multi-step Zap that: <precise English description>. Steps: <list steps>.",
    "python": "# Python automation script\\n# Task: <English description>\\n# Libraries: <requests/pandas/etc>\\n# Steps: <numbered steps>"
  },
  "savedAt": "<ISO 8601 datetime>"
}

قواعد المحتوى الصارمة:
- estimatedComplexity: "مبتدئ" أو "متوسط" أو "متقدم" — هذه القيم الثلاث فقط ولا غيرها
- monthlyCostCategory: "مجاني" أو "منخفض (<50$)" أو "متوسط" أو "مرتفع" — هذه القيم فقط
- recommendedStack: 2-4 أدوات حقيقية موجودة فعلاً (n8n, Make, Zapier, Google Sheets, Airtable, Notion, Slack, Gmail, WhatsApp Business API, HubSpot, إلخ)
- workflowDiagram: 4-6 خطوات بالترتيب المنطقي الدقيق — وصف ما يحدث فعلاً في كل خطوة
- كل المحتوى عربي ما عدا buildPrompts التي تكون بالإنجليزية بالكامل
- buildPrompts يجب أن تكون تعليمات دقيقة قابلة للاستخدام المباشر`;

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
  const guard = await aiGuard(req);
  if (guard instanceof Response) return guard;

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
      "gemini-3.5-flash",
      8192
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
