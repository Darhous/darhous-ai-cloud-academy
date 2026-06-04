import { NextRequest, NextResponse } from "next/server";
import { callGemini } from "@/lib/gemini";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { aiGuard } from "@/lib/ai-guard";

const SYSTEM_PROMPT = `أنت خبير في كتابة برومبتات Gemini لتحويل الصور.
مهمتك: تحويل الفكرة البسيطة إلى برومبت احترافي يُعطى لـ Gemini لتحويل صورة شخصية.

قواعد البرومبت الناتج:
- يبدأ بـ: "استخدم الصورة المرفقة كمرجع للشخص الأساسي، وحافظ على ملامحه وهويته البصرية."
- يصف الأسلوب البصري بدقة (ألوان، إضاءة، خلفية، نمط)
- يُحدّد الجودة المطلوبة (8K، إضاءة استوديو، إلخ)
- ينتهي بـ: "لا تضف أي عناصر أو نصوص غير مرتبطة."
- اللغة: عربية بالكامل
- الطول: 4-7 أسطر فقط
- لا markdown، لا شرح خارج البرومبت، لا مقدمة

أعد البرومبت فقط — بدون أي نص إضافي قبله أو بعده.`;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`nb-enhance:${ip}`, { limit: 5, windowSec: 60 });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: `طلبات كثيرة. انتظر ${rl.resetInSec} ثانية.` },
      { status: 429, headers: { "Retry-After": String(rl.resetInSec) } }
    );
  }
  const guard = await aiGuard(req);
  if (guard instanceof Response) return guard;

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "AI غير مهيأ. مفتاح API غير موجود." },
      { status: 503 }
    );
  }

  let idea: string;
  try {
    const body = await req.json();
    idea = (body.idea ?? "").trim();
  } catch {
    return NextResponse.json({ error: "طلب غير صالح." }, { status: 400 });
  }

  if (!idea || idea.length < 5) {
    return NextResponse.json(
      { error: "اكتب فكرتك (5 أحرف على الأقل)." },
      { status: 400 }
    );
  }

  if (idea.length > 300) {
    return NextResponse.json(
      { error: "الفكرة طويلة جدًا (300 حرف كحد أقصى)." },
      { status: 400 }
    );
  }

  try {
    const enhanced = await callGemini(
      [{ role: "user", content: `الفكرة: ${idea}` }],
      SYSTEM_PROMPT,
      "nano-banana-pro-preview",
      512
    );

    return NextResponse.json({ prompt: enhanced.trim() });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "خطأ غير متوقع";
    // If model not found, fall back to gemini-2.5-flash
    if (msg.includes("not found") || msg.includes("404")) {
      try {
        const fallback = await callGemini(
          [{ role: "user", content: `الفكرة: ${idea}` }],
          SYSTEM_PROMPT,
          "gemini-2.5-flash",
          512
        );
        return NextResponse.json({ prompt: fallback.trim(), fallback: true });
      } catch (fallbackErr) {
        const fallbackMsg = fallbackErr instanceof Error ? fallbackErr.message : "خطأ غير متوقع";
        console.error("[nano-banana/enhance] fallback error", fallbackMsg);
        return NextResponse.json(
          { error: `فشل توليد البرومبت: ${fallbackMsg}` },
          { status: 500 }
        );
      }
    }
    console.error("[nano-banana/enhance]", msg);
    return NextResponse.json(
      { error: `فشل توليد البرومبت: ${msg}` },
      { status: 500 }
    );
  }
}
