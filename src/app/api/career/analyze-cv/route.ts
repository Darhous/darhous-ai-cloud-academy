import { NextRequest, NextResponse } from "next/server";
import { callGemini } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { text, jobDescription } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "نص السيرة الذاتية مطلوب" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "خدمة التحليل الذكي غير متاحة حالياً" },
        { status: 503 }
      );
    }

    const prompt = `
قم بتحليل السيرة الذاتية التالية. أجب **بالكامل باللغة العربية** مع الاحتفاظ بالمصطلحات التقنية الإنجليزية (مثل React, CI/CD).

نص السيرة الذاتية:
${text}

${jobDescription ? `الوصف الوظيفي المستهدف:\n${jobDescription}` : ""}

قيّم السيرة الذاتية عبر أبعاد متعددة (0-100) وقدم تحليلاً شاملاً.
أرجع ردك **فقط** كـ JSON صالح بهذا الهيكل تماماً (بدون markdown أو backticks):
{
  "overall_score": 85,
  "keyword_score": 80,
  "skills_score": 90,
  "experience_score": 85,
  "formatting_score": 70,
  "readability_score": 88,
  "summary": "ملخص عام لمدى قوة السيرة الذاتية وفرصها...",
  "strengths": ["نقطة قوة 1", "نقطة قوة 2"],
  "weaknesses": ["نقطة ضعف 1", "نقطة ضعف 2"],
  "weak_bullet_points": [{"original": "عملت على المشروع...", "suggestion": "زدت المبيعات بنسبة 20%..."}],
  "keywords_missing": ["كلمة مفتاحية", "Framework X"],
  "recommendations": ["توصية تحسين 1", "توصية تحسين 2"],
  ${jobDescription ? '"job_description_match_details": "تحليل لمدى مطابقة السيرة الذاتية للوظيفة...",' : ""}
  "role_optimization_suggestions": ["اقتراح تخصيص 1", "اقتراح 2"]
}
`;

    const responseText = await callGemini(
      [{ role: "user", content: prompt }],
      "أنت خبير ATS ومسؤول توظيف ومدرب مهني محترف. ردودك دائماً باللغة العربية.",
      "gemini-2.5-flash"
    );

    const jsonStr = responseText
      .replace(/```json/gi, "")
      .replace(/```/gi, "")
      .trim();

    try {
      const result = JSON.parse(jsonStr);
      return NextResponse.json(result);
    } catch {
      return NextResponse.json({
        overall_score: 0,
        keyword_score: 0,
        skills_score: 0,
        experience_score: 0,
        formatting_score: 0,
        readability_score: 0,
        summary: "حدث خطأ أثناء قراءة تحليل الذكاء الاصطناعي. الرجاء المحاولة مرة أخرى.",
        strengths: [],
        weaknesses: [],
        weak_bullet_points: [],
        keywords_missing: [],
        recommendations: [],
        role_optimization_suggestions: [],
        raw: jsonStr,
      });
    }
  } catch (error) {
    console.error("Error analyzing CV:", error);
    return NextResponse.json({ error: "خطأ داخلي في الخادم" }, { status: 500 });
  }
}
