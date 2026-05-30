import "server-only";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { callGemini } from "@/lib/gemini";

// ── Deterministic local fallback (no Gemini key required) ───
function localCoachRecommendation(
  streak: number,
  completedCourses: number,
  interests: string[]
) {
  const dailyTips = [
    { ar: "اليوم، جرّب كتابة برومبت جديد وقم بتحسينه ثلاث مرات.", en: "Today, write a new prompt and improve it three times." },
    { ar: "خصّص 15 دقيقة لمراجعة دورة بدأتها ولم تكملها.", en: "Spend 15 minutes reviewing a course you started but didn't finish." },
    { ar: "جرّب استخدام Claude في حل مشكلة حقيقية تواجهها اليوم.", en: "Try using Claude to solve a real problem you're facing today." },
    { ar: "اقرأ مقالاً واحداً عن أحدث تطورات الذكاء الاصطناعي.", en: "Read one article about the latest AI developments." },
    { ar: "شارك ما تعلمته هذا الأسبوع مع شخص آخر — التعليم أفضل تعلّم.", en: "Share what you learned this week with someone — teaching is the best learning." },
  ];

  const tip = dailyTips[new Date().getDay() % dailyTips.length];

  return {
    dailyTip: tip,
    nextLesson: {
      ar: completedCourses > 0 ? "تابع الدورة التالية في مسارك" : "ابدأ بدورة أساسيات الذكاء الاصطناعي",
      en: completedCourses > 0 ? "Continue the next course in your path" : "Start with AI Fundamentals course",
      href: completedCourses > 0 ? "/courses" : "/courses/ai-fundamentals",
    },
    suggestedProject: {
      ar: interests?.includes("coding") ? "بناء chatbot بسيط مع Claude API" : "إنشاء استوديو برومبتات شخصي",
      en: interests?.includes("coding") ? "Build a simple chatbot with Claude API" : "Create your personal prompt studio",
      href: "/projects",
    },
    promptToTry: {
      ar: `أنت خبير في ${interests?.[0] ?? "الذكاء الاصطناعي"}. اشرح لي مفهوم [الموضوع] بطريقة عملية مع مثال واقعي.`,
      en: `You are an expert in ${interests?.[0] ?? "AI"}. Explain [concept] in a practical way with a real-world example.`,
    },
    streakMessage:
      streak > 0
        ? { ar: `أنت على سلسلة ${streak} ${streak === 1 ? "يوم" : "أيام"} 🔥 استمر!`, en: `You're on a ${streak}-day streak 🔥 Keep going!` }
        : { ar: "ابدأ سلسلتك التعليمية اليوم!", en: "Start your learning streak today!" },
  };
}

export async function GET(req: Request) {
  // Rate limit: 20 req / 60s per IP
  const ip = getClientIp(req);
  const rl = checkRateLimit(`coach:${ip}`, { limit: 20, windowSec: 60 });
  if (!rl.allowed) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429, headers: { "Retry-After": String(rl.resetInSec) } });
  }

  // Auth check
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} },
  });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Gather user data
  const [cpRes, lpRes, spRes, profRes] = await Promise.all([
    supabase.from("course_progress").select("course_slug,status,progress_percent").eq("user_id", user.id).order("updated_at", { ascending: false }).limit(10),
    supabase.from("lesson_progress").select("completed_at").eq("user_id", user.id).eq("completed", true).not("completed_at", "is", null),
    supabase.from("student_profiles").select("interests,level,goal").eq("user_id", user.id).single(),
    supabase.from("profiles").select("full_name").eq("id", user.id).single(),
  ]);

  const courseProgress = cpRes.data ?? [];
  const completedCourses = courseProgress.filter((c) => c.status === "completed").length;
  const interests: string[] = spRes.data?.interests ?? [];
  const level = spRes.data?.level ?? "beginner";

  // Calculate streak
  const timestamps = lpRes.data?.map((r: { completed_at: string }) => r.completed_at) ?? [];
  let streak = 0;
  if (timestamps.length > 0) {
    const toDay = (ts: string) => ts.slice(0, 10);
    const uniqueDays = [...new Set(timestamps.map(toDay))].sort().reverse();
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    if (uniqueDays[0] === today || uniqueDays[0] === yesterday) {
      streak = 1;
      for (let i = 1; i < uniqueDays.length; i++) {
        const prev = new Date(uniqueDays[i - 1]);
        const curr = new Date(uniqueDays[i]);
        if (Math.round((prev.getTime() - curr.getTime()) / 864e5) === 1) streak++;
        else break;
      }
    }
  }

  // Try Gemini if configured
  const hasGemini = !!process.env.GEMINI_API_KEY;
  if (hasGemini) {
    try {
      const contextSummary = `
User level: ${level}
Interests: ${interests.join(", ") || "general AI"}
Streak: ${streak} days
Courses started: ${courseProgress.filter((c) => c.status === "started").length}
Courses completed: ${completedCourses}
Latest course: ${courseProgress[0]?.course_slug ?? "none"}
      `.trim();

      const aiText = await callGemini(
        [{ role: "user", content: `Based on this learner's profile, give a personalized daily AI learning coach message in JSON format:\n${contextSummary}\n\nReturn ONLY valid JSON with these keys: dailyTip (ar, en strings), nextLesson (ar, en strings, href string), suggestedProject (ar, en strings, href string), promptToTry (ar, en strings), streakMessage (ar, en strings).` }],
        "You are a friendly, concise AI learning coach for the Darhous AI Academy. Always respond with valid JSON only, no markdown, no extra text. Href values should be relative paths like /courses, /prompts, /projects.",
      );

      // Strip markdown code fences if present
      const clean = aiText.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(clean);
      return NextResponse.json({ recommendation: parsed, source: "ai", streak });
    } catch {
      // Fall through to local
    }
  }

  const local = localCoachRecommendation(streak, completedCourses, interests);
  return NextResponse.json({ recommendation: local, source: "local", streak });
}
