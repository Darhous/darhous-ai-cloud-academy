import { NextRequest, NextResponse } from "next/server";
import { callGemini } from "@/lib/gemini";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { aiGuard } from "@/lib/ai-guard";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`mentor-mission:${ip}`, { limit: 5, windowSec: 3600 });
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const guard = await aiGuard(req);
  if (guard instanceof Response) return guard;

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: "AI not configured", missingKey: true }, { status: 503 });
  }

  try {
    const body = await req.json();
    const { userContext, locale } = body;
    const isAr = locale === "ar";

    const systemPrompt = isAr
      ? `أنت NexaLearn Mission Generator. مهمتك إنشاء "مهمة اليوم" التعليمية المخصصة.

رد بـ JSON فقط (لا markdown، لا نص خارج الـ JSON) بهذا الهيكل الدقيق:
{
  "title": "عنوان المهمة (10 كلمات max)",
  "description": "وصف مختصر ومحفز (2-3 جمل)",
  "steps": ["خطوة 1", "خطوة 2", "خطوة 3"],
  "challenge": "التحدي الاختياري (جملة واحدة)",
  "estimated_minutes": 20,
  "resource": "رابط أو مصدر اختياري (أو null)"
}

قواعد المهمة:
- قابلة للإنجاز في 15-25 دقيقة فعلياً
- عملية وليست نظرية (كود أو تطبيق أو ممارسة)
- مناسبة لمستوى المتعلم بناءً على السياق
- إذا لم يوجد سياق، افترض مبتدئاً في AI`
      : `You are NexaLearn Mission Generator. Create a personalized "Mission of the Day".

Reply with JSON only (no markdown, no text outside JSON):
{
  "title": "Mission title (10 words max)",
  "description": "Brief motivating description (2-3 sentences)",
  "steps": ["Step 1", "Step 2", "Step 3"],
  "challenge": "Optional challenge (one sentence)",
  "estimated_minutes": 20,
  "resource": "Optional link or resource (or null)"
}

Rules: achievable in 15-25 minutes, practical not theoretical, level-appropriate.`;

    const contextMsg = userContext
      ? (isAr ? `سياق المتعلم:\n${userContext}` : `Learner context:\n${userContext}`)
      : (isAr ? "لا يوجد سياق متعلم — افترض مبتدئاً في AI" : "No learner context — assume AI beginner");

    const raw = await callGemini(
      [{ role: "user", content: contextMsg }],
      systemPrompt,
      undefined,
      512
    );

    // Parse JSON — strip possible markdown fences
    const jsonStr = raw.replace(/```json|```/g, "").trim();
    const mission = JSON.parse(jsonStr);

    return NextResponse.json({ mission });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown";
    console.error("[Mission API]", msg);
    return NextResponse.json({ error: "Failed to generate mission" }, { status: 500 });
  }
}
