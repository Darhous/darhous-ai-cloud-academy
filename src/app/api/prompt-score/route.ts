import "server-only";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { callGemini } from "@/lib/gemini";

interface ScoreCriteria {
  role: number;
  task: number;
  context: number;
  constraints: number;
  outputFormat: number;
  examples: number;
  safety: number;
}

interface PromptScoreResult {
  score: number;
  criteria: ScoreCriteria;
  missing: string[];
  strengths: string[];
  improvedPrompt: string;
  summary: { ar: string; en: string };
}

function localScorePrompt(prompt: string): PromptScoreResult {
  const p = prompt.toLowerCase();
  const criteria: ScoreCriteria = {
    role:         p.includes("you are") || p.includes("أنت") || p.includes("act as") ? 15 : 0,
    task:         prompt.length > 20 ? 15 : 5,
    context:      prompt.length > 80 ? 15 : prompt.length > 40 ? 8 : 0,
    constraints:  p.includes("do not") || p.includes("لا ت") || p.includes("only") || p.includes("فقط") ? 15 : 0,
    outputFormat: p.includes("list") || p.includes("قائمة") || p.includes("bullet") || p.includes("json") || p.includes("table") || p.includes("جدول") ? 15 : 0,
    examples:     p.includes("example") || p.includes("مثال") || p.includes("like") ? 15 : 0,
    safety:       10, // base score for safety (no harmful content assumed)
  };
  const total = Object.values(criteria).reduce((a, b) => a + b, 0);
  const score = Math.min(100, total);

  const missing: string[] = [];
  if (criteria.role === 0) missing.push("role");
  if (criteria.context === 0) missing.push("context");
  if (criteria.constraints === 0) missing.push("constraints");
  if (criteria.outputFormat === 0) missing.push("output format");
  if (criteria.examples === 0) missing.push("examples");

  const strengths: string[] = [];
  if (criteria.role > 0) strengths.push("role");
  if (criteria.task > 0) strengths.push("task");
  if (criteria.context > 0) strengths.push("context");
  if (criteria.outputFormat > 0) strengths.push("output format");

  return {
    score,
    criteria,
    missing,
    strengths,
    improvedPrompt: `You are an expert in [role]. ${prompt.trim()} Please provide a structured response with: 1) Key points, 2) Practical examples, 3) Next steps. Format as a clear bullet list.`,
    summary: {
      ar: score >= 80 ? "برومبت ممتاز! يحتوي على معظم العناصر الأساسية." : score >= 60 ? "برومبت جيد مع مجال للتحسين." : "برومبت يحتاج تطوير — أضف سياقاً ومعايير محددة.",
      en: score >= 80 ? "Excellent prompt! Contains most key elements." : score >= 60 ? "Good prompt with room for improvement." : "Prompt needs development — add context and specific criteria.",
    },
  };
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`prompt-score:${ip}`, { limit: 15, windowSec: 60 });
  if (!rl.allowed) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429, headers: { "Retry-After": String(rl.resetInSec) } });
  }

  const body = await req.json().catch(() => ({}));
  const { prompt } = body as { prompt?: string };
  if (!prompt || prompt.trim().length < 5) {
    return NextResponse.json({ error: "Prompt too short" }, { status: 400 });
  }
  if (prompt.length > 3000) {
    return NextResponse.json({ error: "Prompt too long (max 3000 chars)" }, { status: 400 });
  }

  let result: PromptScoreResult;
  let source = "local";

  if (process.env.GEMINI_API_KEY) {
    try {
      const aiText = await callGemini(
        [{
          role: "user",
          content: `Score this AI prompt out of 100 and provide improvement suggestions. Return ONLY valid JSON.\n\nPrompt: "${prompt}"\n\nJSON keys required:\n- score: number (0-100)\n- criteria: object with keys role, task, context, constraints, outputFormat, examples, safety (each 0-15 or 0-10 points)\n- missing: string[] (elements not found)\n- strengths: string[] (elements found)\n- improvedPrompt: string (better version)\n- summary: {ar: string, en: string}`,
        }],
        "You are a prompt engineering expert. Score prompts objectively. Always return valid JSON only, no markdown.",
      );
      const clean = aiText.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
      result = JSON.parse(clean);
      source = "ai";
    } catch {
      result = localScorePrompt(prompt);
    }
  } else {
    result = localScorePrompt(prompt);
  }

  // Save to Supabase if user is logged in
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseKey) {
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} },
    });
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("prompt_scores").insert({
        user_id: user.id,
        prompt,
        score: result.score,
        analysis: result,
        improved_prompt: result.improvedPrompt,
      });
    }
  }

  return NextResponse.json({ result, source });
}
