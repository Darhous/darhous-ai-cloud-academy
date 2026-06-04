import { NextRequest, NextResponse } from "next/server";
import { callGemini } from "@/lib/gemini";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { aiGuard } from "@/lib/ai-guard";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`career-interview:${ip}`, { limit: 5, windowSec: 60 });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: `طلبات كثيرة. انتظر ${rl.resetInSec} ثانية.` },
      { status: 429, headers: { "Retry-After": String(rl.resetInSec) } }
    );
  }
  const guard = await aiGuard(req);
  if (guard instanceof Response) return guard;

  try {
    const { situation, task, action, result } = await req.json();

    if (!situation || !task || !action || !result) {
      return NextResponse.json(
        { error: "جميع حقول STAR مطلوبة" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "خدمة التقييم الذكي غير متاحة حالياً" },
        { status: 503 }
      );
    }

    const prompt = `
قيّم إجابة المرشح التالية باستخدام أسلوب STAR.

الموقف: ${situation}
المهمة: ${task}
الإجراء: ${action}
النتيجة: ${result}

أجب **بالكامل باللغة العربية**. قدم تغذية راجعة بنّاءة ونقاط قوة وضعف ونسخة محسّنة من الإجابة.

أرجع ردك **فقط** كـ JSON صالح (بدون markdown):
{
  "score": 85,
  "feedback": "...",
  "strengths": ["...", "..."],
  "improvements": ["...", "..."],
  "improved_answer": "..."
}
`;

    const responseText = await callGemini(
      [{ role: "user", content: prompt }],
      "أنت محاور تقني خبير ومدرب مهني. تقيّم إجابات المقابلات باللغة العربية.",
      "gemini-2.5-flash"
    );

    const jsonStr = responseText
      .replace(/```json/gi, "")
      .replace(/```/gi, "")
      .trim();

    try {
      const evalResult = JSON.parse(jsonStr);
      return NextResponse.json(evalResult);
    } catch {
      return NextResponse.json({ error: "فشل تحليل رد الذكاء الاصطناعي" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error evaluating interview:", error);
    return NextResponse.json({ error: "خطأ داخلي في الخادم" }, { status: 500 });
  }
}
