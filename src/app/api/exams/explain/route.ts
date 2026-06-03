import { NextRequest, NextResponse } from "next/server";
import { callGemini } from "@/lib/gemini";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

interface WrongAnswer {
  questionId: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`exams-explain:${ip}`, { limit: 5, windowSec: 60 });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: `طلبات كثيرة. انتظر ${rl.resetInSec} ثانية.` },
      { status: 429, headers: { "Retry-After": String(rl.resetInSec) } }
    );
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: "AI غير مهيأ." }, { status: 503 });
  }

  let subject = "الاختبار";
  let wrongs: WrongAnswer[] = [];
  try {
    const body = await req.json();
    subject = body.subject ?? "الاختبار";
    wrongs = body.wrongs ?? [];
  } catch {
    return NextResponse.json({ error: "طلب غير صالح." }, { status: 400 });
  }

  if (!wrongs.length) {
    return NextResponse.json({ explanations: [] });
  }

  // Limit to 10 wrong answers to avoid huge prompts
  const limited = wrongs.slice(0, 10);

  const prompt = `أنت معلم خبير في مادة "${subject}". قدّم شرحًا موجزًا (جملة أو جملتان) لكل إجابة خاطئة.
أجب فقط بـ JSON صالح بدون markdown:

[
  { "questionId": <id>, "explanation": "<شرح مختصر باللغة العربية>" },
  ...
]

الأسئلة الخاطئة:
${limited.map((w, i) => `${i + 1}. السؤال: ${w.question}\n   إجابة الطالب: ${w.userAnswer || "لم يجب"}\n   الإجابة الصحيحة: ${w.correctAnswer}`).join("\n\n")}`;

  try {
    const raw = await callGemini(
      [{ role: "user", content: prompt }],
      "أنت مساعد تعليمي. ردودك دائماً بالعربية وموجزة.",
      "gemini-2.5-flash"
    );

    const jsonStr = raw
      .replace(/```json/gi, "")
      .replace(/```/gi, "")
      .trim();

    const explanations = JSON.parse(jsonStr);
    return NextResponse.json({ explanations });
  } catch {
    return NextResponse.json({ error: "فشل إنشاء الشرح." }, { status: 500 });
  }
}
