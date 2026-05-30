import "server-only";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { callGemini } from "@/lib/gemini";

interface BattleAnalysis {
  winner: "a" | "b" | "tie";
  scores: { a: number; b: number };
  breakdown: {
    clarity: { a: number; b: number };
    context: { a: number; b: number };
    constraints: { a: number; b: number };
    outputFormat: { a: number; b: number };
    safety: { a: number; b: number };
  };
  reasoning: { ar: string; en: string };
  winnerPrompt: string;
  improvedWinner: string;
}

function localBattle(promptA: string, promptB: string): BattleAnalysis {
  const scorePrompt = (p: string) => {
    const text = p.toLowerCase();
    return {
      clarity: text.length > 30 ? 20 : 10,
      context: text.length > 80 ? 20 : text.length > 40 ? 12 : 5,
      constraints: text.includes("do not") || text.includes("only") || text.includes("لا ت") || text.includes("فقط") ? 20 : 0,
      outputFormat: text.includes("list") || text.includes("json") || text.includes("table") || text.includes("قائمة") || text.includes("جدول") ? 20 : 0,
      safety: 20,
    };
  };

  const aScores = scorePrompt(promptA);
  const bScores = scorePrompt(promptB);
  const aTotal = Object.values(aScores).reduce((s, v) => s + v, 0);
  const bTotal = Object.values(bScores).reduce((s, v) => s + v, 0);
  const winner: "a" | "b" | "tie" = aTotal > bTotal ? "a" : bTotal > aTotal ? "b" : "tie";

  return {
    winner,
    scores: { a: aTotal, b: bTotal },
    breakdown: {
      clarity: { a: aScores.clarity, b: bScores.clarity },
      context: { a: aScores.context, b: bScores.context },
      constraints: { a: aScores.constraints, b: bScores.constraints },
      outputFormat: { a: aScores.outputFormat, b: bScores.outputFormat },
      safety: { a: aScores.safety, b: bScores.safety },
    },
    reasoning: {
      ar: winner === "tie" ? "البرومبتان متكافئان!" : `البرومبت ${winner === "a" ? "الأول" : "الثاني"} أفضل لأنه أطول وأكثر تفصيلاً.`,
      en: winner === "tie" ? "Both prompts are equal!" : `Prompt ${winner === "a" ? "A" : "B"} wins for being more detailed.`,
    },
    winnerPrompt: winner === "b" ? promptB : promptA,
    improvedWinner: `You are an expert. ${(winner === "b" ? promptB : promptA).trim()} Please provide a structured, detailed response.`,
  };
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`prompt-battle:${ip}`, { limit: 10, windowSec: 60 });
  if (!rl.allowed) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429, headers: { "Retry-After": String(rl.resetInSec) } });
  }

  const body = await req.json().catch(() => ({}));
  const { promptA, promptB } = body as { promptA?: string; promptB?: string };
  if (!promptA?.trim() || !promptB?.trim()) {
    return NextResponse.json({ error: "Both prompts required" }, { status: 400 });
  }
  if (promptA.length > 2000 || promptB.length > 2000) {
    return NextResponse.json({ error: "Prompts too long (max 2000 chars each)" }, { status: 400 });
  }

  let analysis: BattleAnalysis;
  let source = "local";

  if (process.env.GEMINI_API_KEY) {
    try {
      const aiText = await callGemini(
        [{
          role: "user",
          content: `Compare these two AI prompts and determine which is better. Return ONLY valid JSON.\n\nPrompt A: "${promptA}"\n\nPrompt B: "${promptB}"\n\nJSON structure:\n- winner: "a" | "b" | "tie"\n- scores: {a: number, b: number} (each out of 100)\n- breakdown: {clarity, context, constraints, outputFormat, safety} each with {a: number, b: number} (out of 20 each)\n- reasoning: {ar: string, en: string}\n- winnerPrompt: string (the winning prompt text)\n- improvedWinner: string (improved version of the winner)`,
        }],
        "You are a prompt engineering judge. Compare prompts objectively across clarity, context, constraints, output format, and safety. Return valid JSON only.",
      );
      const clean = aiText.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
      analysis = JSON.parse(clean);
      source = "ai";
    } catch {
      analysis = localBattle(promptA, promptB);
    }
  } else {
    analysis = localBattle(promptA, promptB);
  }

  // Save for logged-in users
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseKey) {
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} },
    });
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("prompt_battles").insert({
        user_id: user.id,
        prompt_a: promptA,
        prompt_b: promptB,
        winner: analysis.winner,
        analysis,
      });
    }
  }

  return NextResponse.json({ analysis, source });
}
