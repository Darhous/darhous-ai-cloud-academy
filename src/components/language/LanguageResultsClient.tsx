"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Award, RotateCcw, LayoutDashboard, BookOpen, ChevronRight, ChevronLeft } from "lucide-react";

const CEFR_COLOR: Record<string, string> = {
  C2: "#fbbf24", C1B: "#f59e0b", C1A: "#f59e0b",
  B2B: "#4ade80", B2A: "#4ade80",
  B1B: "#3ce0fb", B1A: "#3ce0fb",
  A2B: "#d0bcff", A2A: "#d0bcff",
  A1B: "#94a3b8", A1A: "#94a3b8",
};

const CEFR_DESC: Record<string, { en: string; ar: string }> = {
  C2: { en: "Mastery — near-native level", ar: "إتقان — مستوى شبه أصيل" },
  C1B: { en: "Advanced — highly effective command", ar: "متقدم — إتقان عالٍ جداً" },
  C1A: { en: "Advanced — effective independence", ar: "متقدم — استقلالية فعّالة" },
  B2B: { en: "Upper-Intermediate — nuanced comprehension", ar: "فوق المتوسط — فهم دقيق" },
  B2A: { en: "Upper-Intermediate — clear spontaneous expression", ar: "فوق المتوسط — تعبير واضح" },
  B1B: { en: "Intermediate — handling familiar topics", ar: "متوسط — التعامل مع المواضيع المألوفة" },
  B1A: { en: "Intermediate — independent user", ar: "متوسط — مستخدم مستقل" },
  A2B: { en: "Elementary — routine situations", ar: "أساسي — المواقف الاعتيادية" },
  A2A: { en: "Elementary — immediate need", ar: "أساسي — الحاجة الفورية" },
  A1B: { en: "Beginner — very basic expressions", ar: "مبتدئ — تعابير أساسية جداً" },
  A1A: { en: "Beginner — very limited understanding", ar: "مبتدئ — فهم محدود جداً" },
};

interface ResultData {
  score: number;
  level: string;
  stages_completed: number;
  is_incomplete: boolean;
  breakdown: {
    grammar: number;
    vocabulary: number;
    reading: number;
    stages?: Array<{ stage: number; score: number; difficulty: string }>;
  };
  created_at?: string;
}

function SkillBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium" style={{ color: "var(--color-on-surface)" }}>{label}</span>
        <span className="text-sm font-mono font-bold" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-2 rounded-full" style={{ background: "var(--color-outline-variant)" }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

export default function LanguageResultsClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ChevronLeft : ChevronRight;
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);

  const id = searchParams.get("id");
  const scoreParam = searchParams.get("score");
  const levelParam = searchParams.get("level");

  useEffect(() => {
    async function fetchResult() {
      // Try to fetch from Supabase if we have an ID
      if (id && user) {
        const supabase = createClient();
        if (supabase) {
          const { data } = await supabase
            .from("language_results")
            .select("*")
            .eq("id", id)
            .eq("user_id", user.id)
            .single();
          if (data) {
            setResult(data as ResultData);
            setLoading(false);
            return;
          }
        }
      }
      // Fallback: use URL params
      if (scoreParam && levelParam) {
        setResult({
          score: parseFloat(scoreParam),
          level: levelParam,
          stages_completed: 0,
          is_incomplete: false,
          breakdown: { grammar: 0, vocabulary: 0, reading: 0 },
        });
      }
      setLoading(false);
    }
    fetchResult();
  }, [id, user, scoreParam, levelParam]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#d0bcff", borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container-xl py-16 text-center">
        <p style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "لم يتم العثور على النتيجة." : "Result not found."}
        </p>
        <Link href={`/${locale}/language`} className="mt-4 inline-block glow-button-secondary font-mono px-6 py-2 rounded-xl">
          {isAr ? "رجوع" : "Go Back"}
        </Link>
      </div>
    );
  }

  const cefrColor = CEFR_COLOR[result.level] ?? "#94a3b8";
  const cefrDesc = CEFR_DESC[result.level] ?? { en: "", ar: "" };

  return (
    <div className="container-xl py-12 flex flex-col gap-12 max-w-3xl mx-auto">
      {/* Hero — CEFR level */}
      <div
        className="rounded-3xl p-10 flex flex-col items-center gap-6 text-center relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${cefrColor}10 0%, rgba(208,188,255,0.05) 100%)`,
          border: `1px solid ${cefrColor}25`,
        }}
      >
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 0%, rgba(208,188,255,0.04) 0%, transparent 70%)" }} />
        <div className="relative z-10">
          <div
            className="inline-flex items-center justify-center w-28 h-28 rounded-3xl font-display font-black text-4xl mb-4"
            style={{ background: `${cefrColor}15`, border: `2px solid ${cefrColor}40`, color: cefrColor }}
          >
            {result.level}
          </div>
          <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "مستواك اللغوي" : "Your Language Level"}
          </h1>
          <p className="text-lg" style={{ color: cefrColor }}>{isAr ? cefrDesc.ar : cefrDesc.en}</p>
          <p className="font-mono font-bold text-5xl mt-4" style={{ color: "var(--color-on-surface)" }}>
            {result.score}%
          </p>
          {result.is_incomplete && (
            <p className="text-xs mt-3 px-3 py-1 rounded-full inline-block" style={{ background: "rgba(251,191,36,0.1)", color: "#fbbf24" }}>
              {isAr ? "تقييم جزئي" : "Partial Assessment"}
            </p>
          )}
          {result.stages_completed > 0 && (
            <p className="text-sm mt-2" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? `أُكملت ${result.stages_completed} مراحل من أصل 10` : `${result.stages_completed} of 10 stages completed`}
            </p>
          )}
        </div>
      </div>

      {/* Skill breakdown */}
      {(result.breakdown.grammar > 0 || result.breakdown.vocabulary > 0 || result.breakdown.reading > 0) && (
        <div className="glass-card rounded-2xl p-8" style={{ border: "1px solid rgba(208,188,255,0.1)" }}>
          <h2 className="font-display font-bold text-xl mb-6 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
            <Award size={20} style={{ color: "#d0bcff" }} />
            {isAr ? "تفصيل المهارات" : "Skills Breakdown"}
          </h2>
          <div className="flex flex-col gap-5">
            <SkillBar label={isAr ? "القواعد" : "Grammar"} pct={result.breakdown.grammar} color="#d0bcff" />
            <SkillBar label={isAr ? "المفردات" : "Vocabulary"} pct={result.breakdown.vocabulary} color="#4ade80" />
            <SkillBar label={isAr ? "القراءة" : "Reading"} pct={result.breakdown.reading} color="#3ce0fb" />
          </div>
        </div>
      )}

      {/* Stage performance */}
      {result.breakdown.stages && result.breakdown.stages.length > 0 && (
        <div className="glass-card rounded-2xl p-8" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="font-display font-bold text-xl mb-5" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "أداء كل مرحلة" : "Stage Performance"}
          </h2>
          <div className="flex flex-col gap-2.5">
            {result.breakdown.stages.map((s) => (
              <div key={s.stage} className="flex items-center gap-4">
                <span className="text-xs font-mono w-16 flex-shrink-0" style={{ color: "var(--color-on-surface-variant)" }}>
                  Stage {s.stage}
                </span>
                <div className="flex-1 h-1.5 rounded-full" style={{ background: "var(--color-outline-variant)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${s.score}%`,
                      background: s.score >= 70 ? "#4ade80" : s.score >= 40 ? "#fbbf24" : "#ef4444",
                    }}
                  />
                </div>
                <span className="text-xs font-mono w-10 text-end flex-shrink-0" style={{ color: "var(--color-on-surface)" }}>
                  {s.score}%
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)" }}>
                  {s.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Study resources based on level */}
      <div className="glass-card rounded-2xl p-8" style={{ border: "1px solid rgba(60,224,251,0.08)" }}>
        <h2 className="font-display font-bold text-xl mb-5 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
          <BookOpen size={20} style={{ color: "var(--color-tertiary)" }} />
          {isAr ? "خطوات التحسين" : "Improvement Steps"}
        </h2>
        <div className="flex flex-col gap-3">
          {[
            ...(result.breakdown.grammar < 70 ? [{ label: isAr ? "تعزيز القواعد" : "Strengthen Grammar", desc: isAr ? "راجع قواعد الأزمنة والجمل الشرطية" : "Review tenses, conditionals, and reported speech" }] : []),
            ...(result.breakdown.vocabulary < 70 ? [{ label: isAr ? "توسيع المفردات" : "Expand Vocabulary", desc: isAr ? "مارس المصطلحات الأكاديمية والتعابير الاصطلاحية" : "Practice academic vocabulary and collocations" }] : []),
            ...(result.breakdown.reading < 70 ? [{ label: isAr ? "تحسين القراءة" : "Improve Reading", desc: isAr ? "اقرأ مقالات أكاديمية وتدرّب على استخلاص المعنى الضمني" : "Read academic texts and practice inferring meaning" }] : []),
            { label: isAr ? "استمر في التدريب" : "Keep Practicing", desc: isAr ? "أعد الاختبار بعد أسبوعين لمتابعة تقدمك" : "Retake the assessment in 2 weeks to track progress" },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)" }}>
              <span className="text-base mt-0.5">✅</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--color-on-surface)" }}>{item.label}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href={`/${locale}/dashboard`} className="glow-button-primary text-white font-mono px-8 py-3 rounded-xl flex items-center gap-2">
          <LayoutDashboard size={16} />
          {isAr ? "لوحة التحكم" : "Dashboard"}
        </Link>
        <Link href={`/${locale}/language/assessment`} className="glow-button-secondary font-mono px-6 py-3 rounded-xl flex items-center gap-2">
          <RotateCcw size={16} />
          {isAr ? "إعادة الاختبار" : "Retake Assessment"}
        </Link>
        <Link href={`/${locale}/language`} className="font-mono px-6 py-3 rounded-xl flex items-center gap-2 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "بوابة اللغة" : "Language Portal"} <Arrow size={14} />
        </Link>
      </div>
    </div>
  );
}
