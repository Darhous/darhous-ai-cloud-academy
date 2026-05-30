"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trophy, Zap, Banana, Code, Rocket, LogIn, Loader2, CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";

interface Challenge {
  id: string;
  slug: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  category: string;
  difficulty: string;
  points: number;
  is_active: boolean;
}

const categoryIcons: Record<string, React.ReactNode> = {
  prompt: <Zap size={20} />,
  nano_banana: <Banana size={20} />,
  claude_code: <Code size={20} />,
  project: <Rocket size={20} />,
};

const difficultyColors: Record<string, string> = {
  beginner: "#4ade80",
  intermediate: "#fbbf24",
  advanced: "#ef4444",
};

// Fallback static challenges for when Supabase is not configured
const staticChallenges: Challenge[] = [
  { id: "1", slug: "prompt-clarity-challenge", title: { ar: "تحدي وضوح البرومبت", en: "Prompt Clarity Challenge" }, description: { ar: "اكتب برومبت واضحاً ومحدداً للحصول على أفضل نتيجة من AI. ابدأ بـ: أنت خبير في...", en: "Write a clear, specific prompt to get the best AI output. Start with: You are an expert in..." }, category: "prompt", difficulty: "beginner", points: 10, is_active: true },
  { id: "2", slug: "nano-banana-creative", title: { ar: "تحدي Nano Banana الإبداعي", en: "Nano Banana Creative Challenge" }, description: { ar: "استخدم Nano Banana لتحويل صورتك إلى لوحة فنية فريدة. شارك البرومبت الذي استخدمته.", en: "Use Nano Banana to transform your photo into a unique artwork. Share the prompt you used." }, category: "nano_banana", difficulty: "beginner", points: 15, is_active: true },
  { id: "3", slug: "claude-code-challenge", title: { ar: "تحدي Claude Code", en: "Claude Code Challenge" }, description: { ar: "استخدم Claude Code لبناء أداة صغيرة مفيدة في أقل من 30 دقيقة. شارك الكود والنتيجة.", en: "Use Claude Code to build a small useful tool in under 30 minutes. Share the code and result." }, category: "claude_code", difficulty: "intermediate", points: 25, is_active: true },
  { id: "4", slug: "ai-project-launch", title: { ar: "تحدي إطلاق مشروع AI", en: "AI Project Launch Challenge" }, description: { ar: "انشر مشروع AI على Vercel أو GitHub. يجب أن يستخدم API أو نموذج AI حقيقي.", en: "Deploy an AI project to Vercel or GitHub. Must use a real API or AI model." }, category: "project", difficulty: "advanced", points: 50, is_active: true },
];

export default function ChallengesClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const { user, loading: authLoading, supabaseConfigured } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>(staticChallenges);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [submission, setSubmission] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!supabaseConfigured) return;
    const supabase = createClient();
    if (!supabase) return;
    supabase.from("challenges").select("*").eq("is_active", true).order("points", { ascending: true }).then(({ data }) => {
      if (data && data.length > 0) setChallenges(data);
    });
  }, [supabaseConfigured]);

  async function handleSubmit() {
    if (!submission.trim()) return;
    if (!user) { setError(isAr ? "يجب تسجيل الدخول للمشاركة" : "Please sign in to participate"); return; }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/challenges/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId: selectedChallenge?.id, content: submission }),
      });
      if (res.ok) { setSubmitted(true); setSubmission(""); }
      else { const d = await res.json(); setError(d.error ?? (isAr ? "حدث خطأ" : "An error occurred")); }
    } catch { setError(isAr ? "حدث خطأ في الاتصال" : "Connection error"); }
    finally { setSubmitting(false); }
  }

  return (
    <div className="container-xl py-12 flex flex-col gap-10">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)", color: "#fbbf24" }}>
          <Trophy size={12} /> {isAr ? "تحديات AI" : "AI Challenges"}
        </div>
        <h1 className="font-display font-bold text-4xl md:text-5xl mb-3" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "تحديات الذكاء الاصطناعي" : "AI Challenges"}
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "شارك في التحديات، اكسب النقاط، وطوّر مهاراتك في AI" : "Join challenges, earn points, and level up your AI skills"}
        </p>
      </div>

      {/* Challenge cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((c) => {
          const color = difficultyColors[c.difficulty] ?? "#8ed5ff";
          return (
            <div
              key={c.id}
              className="glass-card rounded-2xl p-6 flex flex-col gap-4 cursor-pointer hover:scale-[1.02] transition-transform"
              style={{ border: `1px solid ${color}20` }}
              onClick={() => { setSelectedChallenge(c); setSubmitted(false); setError(""); }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15`, color }}>
                  {categoryIcons[c.category] ?? <Trophy size={20} />}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: `${color}15`, color }}>
                    {isAr ? (c.difficulty === "beginner" ? "مبتدئ" : c.difficulty === "intermediate" ? "متوسط" : "متقدم") : c.difficulty}
                  </span>
                  <span className="text-xs font-mono font-bold" style={{ color: "#fbbf24" }}>+{c.points}pts</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-base mb-1" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? c.title.ar : c.title.en}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? c.description.ar : c.description.en}
                </p>
              </div>
              <button className="text-xs font-mono px-4 py-2 rounded-xl w-fit mt-auto" style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
                {isAr ? "شارك في التحدي" : "Join Challenge"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Submission modal */}
      {selectedChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }} onClick={() => setSelectedChallenge(null)}>
          <div className="glass-card rounded-2xl p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-bold text-lg mb-2" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? selectedChallenge.title.ar : selectedChallenge.title.en}
            </h2>
            <p className="text-sm mb-4" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? selectedChallenge.description.ar : selectedChallenge.description.en}
            </p>

            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-6">
                <CheckCircle size={40} style={{ color: "#4ade80" }} />
                <p className="font-bold" style={{ color: "#4ade80" }}>{isAr ? "تم تقديم مشاركتك! 🎉" : "Submission received! 🎉"}</p>
              </div>
            ) : !authLoading && !user ? (
              <div className="text-center py-4">
                <LogIn size={32} className="mx-auto mb-3" style={{ color: "var(--color-primary)" }} />
                <p className="text-sm mb-3" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? "سجّل دخولك للمشاركة" : "Sign in to participate"}
                </p>
                <Link href={`/${locale}/login`} className="glow-button-primary text-white font-mono px-6 py-2 rounded-xl text-sm">
                  {isAr ? "تسجيل الدخول" : "Sign In"}
                </Link>
              </div>
            ) : (
              <>
                <textarea
                  value={submission}
                  onChange={(e) => setSubmission(e.target.value)}
                  placeholder={isAr ? "اكتب مشاركتك هنا..." : "Write your submission here..."}
                  rows={5}
                  className="w-full rounded-xl p-3 text-sm outline-none resize-none"
                  style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }}
                  dir={isAr ? "rtl" : "ltr"}
                />
                {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
                <div className="flex gap-3 mt-4">
                  <button onClick={handleSubmit} disabled={submitting || !submission.trim()} className="glow-button-primary text-white font-mono px-5 py-2 rounded-xl text-sm flex items-center gap-2 disabled:opacity-50">
                    {submitting ? <Loader2 size={14} className="animate-spin" /> : null}
                    {isAr ? "إرسال" : "Submit"}
                  </button>
                  <button onClick={() => setSelectedChallenge(null)} className="font-mono px-4 py-2 rounded-xl text-sm" style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}>
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
