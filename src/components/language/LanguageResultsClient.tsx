"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  Award, RotateCcw, LayoutDashboard, BookOpen, ChevronRight, ChevronLeft,
  Share2, MessageCircle, Copy, Check, ChevronDown, ChevronUp,
  TrendingUp, Calendar, XCircle, CheckCircle, AlertTriangle, Briefcase, Clock,
} from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { generateFeedback } from "@/data/language-feedback";

// ── Colour maps ────────────────────────────────────────────────────────────────
const CEFR_COLOR: Record<string, string> = {
  C2: "#fbbf24", C1B: "#f59e0b", C1A: "#f59e0b",
  B2B: "#4ade80", B2A: "#4ade80",
  B1B: "#3ce0fb", B1A: "#3ce0fb",
  A2B: "#d0bcff", A2A: "#d0bcff",
  A1B: "#94a3b8", A1A: "#94a3b8",
};

const CEFR_DESC: Record<string, { en: string; ar: string }> = {
  C2:  { en: "Mastery — near-native level",                 ar: "إتقان — مستوى شبه أصيل" },
  C1B: { en: "Advanced — highly effective command",          ar: "متقدم — إتقان عالٍ جداً" },
  C1A: { en: "Advanced — effective independence",            ar: "متقدم — استقلالية فعّالة" },
  B2B: { en: "Upper-Intermediate — nuanced comprehension",   ar: "فوق المتوسط — فهم دقيق" },
  B2A: { en: "Upper-Intermediate — clear spontaneous expression", ar: "فوق المتوسط — تعبير واضح" },
  B1B: { en: "Intermediate — handling familiar topics",       ar: "متوسط — التعامل مع المواضيع المألوفة" },
  B1A: { en: "Intermediate — independent user",              ar: "متوسط — مستخدم مستقل" },
  A2B: { en: "Elementary — routine situations",               ar: "أساسي — المواقف الاعتيادية" },
  A2A: { en: "Elementary — immediate need",                  ar: "أساسي — الحاجة الفورية" },
  A1B: { en: "Beginner — very basic expressions",            ar: "مبتدئ — تعابير أساسية جداً" },
  A1A: { en: "Beginner — very limited understanding",        ar: "مبتدئ — فهم محدود جداً" },
};

const STATUS_COLOR: Record<string, string> = {
  excellent: "#4ade80", good: "#3ce0fb", developing: "#fbbf24", needs_work: "#ef4444",
};

// ── Types ──────────────────────────────────────────────────────────────────────
interface WrongAnswer {
  questionText: string;
  options: { a: string; b: string; c: string; d: string };
  userAnswer: "a" | "b" | "c" | "d" | null;
  correctAnswer: "a" | "b" | "c" | "d";
  timeSpent: number;
  category: string;
  stage: number;
}

interface ResultData {
  id?: string;
  score: number;
  level: string;
  stages_completed: number;
  is_incomplete: boolean;
  time_taken?: number;
  flags_count?: number;
  certificate_id?: string;
  breakdown: {
    grammar: number;
    vocabulary: number;
    reading: number;
    stages?: Array<{ stage: number; score: number; difficulty: string }>;
  };
  wrong_answers?: WrongAnswer[];
  created_at?: string;
}

// ── Sub-components ─────────────────────────────────────────────────────────────
function SkillBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium" style={{ color: "var(--color-on-surface)" }}>{label}</span>
        <span className="text-sm font-mono font-bold" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-2 rounded-full" style={{ background: "var(--color-outline-variant)" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };
  return (
    <button onClick={handle}
      className="flex items-center gap-2 text-sm font-mono px-4 py-2 rounded-xl transition-all hover:opacity-80"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--color-on-surface-variant)" }}>
      {copied ? <><Check size={14} style={{ color: "#4ade80" }} /> Copied!</> : <><Copy size={14} /> {label}</>}
    </button>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function LanguageResultsClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ChevronLeft : ChevronRight;
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showWrong, setShowWrong] = useState(false);
  const [showWeekly, setShowWeekly] = useState(false);

  const id = searchParams.get("id");
  const scoreParam = searchParams.get("score");
  const levelParam = searchParams.get("level");

  useEffect(() => {
    async function fetchResult() {
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
            // Fire-and-forget email — failure does not affect results display
            fetch("/api/language/email-result", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ result_id: id }),
            }).catch(() => {/* silent */});
            return;
          }
        }
      }
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
        <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--portal-color)", borderTopColor: "transparent" }} />
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
  const cefrDesc  = CEFR_DESC[result.level] ?? { en: "", ar: "" };
  const grammar   = result.breakdown.grammar ?? 0;
  const vocab     = result.breakdown.vocabulary ?? 0;
  const reading   = result.breakdown.reading ?? 0;

  const feedback = generateFeedback(
    result.score,
    result.level,
    grammar,
    vocab,
    reading,
    result.stages_completed,
    result.is_incomplete,
  );

  const radarData = [
    { skill: isAr ? "قواعد" : "Grammar",    value: grammar },
    { skill: isAr ? "مفردات" : "Vocabulary", value: vocab },
    { skill: isAr ? "قراءة" : "Reading",     value: reading },
  ];

  const wrongAnswers: WrongAnswer[] = result.wrong_answers ?? [];
  const hasSkills = grammar > 0 || vocab > 0 || reading > 0;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const verifyUrl = result.certificate_id ? `${siteUrl}/${locale}/language/verify/${result.certificate_id}` : null;
  const shareText = `🎓 I just completed the Darhous English Assessment!\n\n📊 Level: ${result.level}\n⭐ Score: ${Math.round(result.score)}%\n\nTake the free test: ${siteUrl}/${locale}/language${verifyUrl ? `\n\nVerify my certificate: ${verifyUrl}` : ""}`;

  const linkedInUrl = result.certificate_id && result.created_at
    ? `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME` +
      `&name=${encodeURIComponent("Darhous English Placement Assessment")}` +
      `&organizationName=${encodeURIComponent("Darhous Academy")}` +
      `&issueYear=${new Date(result.created_at).getFullYear()}` +
      `&issueMonth=${new Date(result.created_at).getMonth() + 1}` +
      (verifyUrl ? `&certUrl=${encodeURIComponent(verifyUrl)}&certId=${encodeURIComponent(result.certificate_id ?? "")}` : "")
    : null;

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="container-xl py-12 flex flex-col gap-8 max-w-3xl mx-auto">

      {/* ── Hero — CEFR level ──────────────────────────────────── */}
      <div className="rounded-3xl p-10 flex flex-col items-center gap-6 text-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${cefrColor}10 0%, rgba(208,188,255,0.05) 100%)`, border: `1px solid ${cefrColor}25` }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 0%, rgba(208,188,255,0.04) 0%, transparent 70%)" }} />
        <div className="relative z-10 flex flex-col items-center gap-4 w-full">
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-3xl font-display font-black text-4xl"
            style={{ background: `${cefrColor}15`, border: `2px solid ${cefrColor}40`, color: cefrColor }}>
            {result.level}
          </div>
          <div>
            <h1 className="font-display font-bold text-3xl mb-1" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "مستواك اللغوي" : "Your Language Level"}
            </h1>
            <p className="text-lg" style={{ color: cefrColor }}>{isAr ? cefrDesc.ar : cefrDesc.en}</p>
          </div>
          <p className="font-mono font-bold text-5xl" style={{ color: "var(--color-on-surface)" }}>
            {result.score.toFixed(1)}%
          </p>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-2 justify-center text-xs font-mono">
            {result.is_incomplete && (
              <span className="px-3 py-1 rounded-full" style={{ background: "rgba(251,191,36,0.1)", color: "#fbbf24" }}>
                {isAr ? "تقييم جزئي" : "Partial Assessment"}
              </span>
            )}
            {result.stages_completed > 0 && (
              <span className="px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)" }}>
                {result.stages_completed}/10 {isAr ? "مراحل" : "stages"}
              </span>
            )}
            {result.time_taken ? (
              <span className="px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)" }}>
                {Math.floor(result.time_taken / 60)}m {result.time_taken % 60}s
              </span>
            ) : null}
            {(result.flags_count ?? 0) > 0 && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full" style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444" }}>
                <AlertTriangle size={11} /> {result.flags_count} {isAr ? "تحذير" : "flag"}
              </span>
            )}
          </div>

          {/* Next milestone */}
          <div className="flex items-start gap-2 px-4 py-3 rounded-xl text-sm text-start w-full max-w-md"
            style={{ background: `${cefrColor}08`, border: `1px solid ${cefrColor}20` }}>
            <TrendingUp size={16} style={{ color: cefrColor, flexShrink: 0, marginTop: 2 }} />
            <p style={{ color: "var(--color-on-surface-variant)" }}>{feedback.next_milestone}</p>
          </div>

          {/* Encouragement */}
          <p className="text-sm italic max-w-lg" style={{ color: "var(--color-on-surface-variant)" }}>
            {feedback.encouragement}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <a href={`/api/certificates/language/${result.id}`} target="_blank" rel="noreferrer"
              className="glow-button-primary text-white font-mono px-6 py-2.5 rounded-xl text-sm flex items-center gap-2">
              <Award size={15} />
              {isAr ? "تحميل الشهادة" : "Download Certificate"}
            </a>
            {linkedInUrl && (
              <a href={linkedInUrl} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 text-sm font-mono px-4 py-2.5 rounded-xl transition-all hover:opacity-80"
                style={{ background: "rgba(0,119,181,0.1)", border: "1px solid rgba(0,119,181,0.3)", color: "#0077b5" }}>
                <Share2 size={14} />
                {isAr ? "LinkedIn" : "Share LinkedIn"}
              </a>
            )}
            <button onClick={handleWhatsApp}
              className="flex items-center gap-2 text-sm font-mono px-4 py-2.5 rounded-xl transition-all hover:opacity-80"
              style={{ background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.3)", color: "#25d366" }}>
              <MessageCircle size={14} />
              WhatsApp
            </button>
            {verifyUrl && <CopyButton text={verifyUrl} label={isAr ? "نسخ رابط الشهادة" : "Copy Verify Link"} />}
            <CopyButton text={shareText} label={isAr ? "نسخ النتيجة" : "Copy Result"} />
          </div>
        </div>
      </div>

      {/* ── Skills + Radar grid ──────────────────────────────────── */}
      {hasSkills && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Skill bars + analysis */}
          <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid var(--portal-color-border)" }}>
            <h2 className="font-display font-bold text-lg mb-5 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
              <Award size={18} style={{ color: "var(--portal-color)" }} />
              {isAr ? "تفصيل المهارات" : "Skills Breakdown"}
            </h2>
            <div className="flex flex-col gap-4">
              <SkillBar label={isAr ? "القواعد" : "Grammar"} pct={grammar} color="var(--portal-color)" />
              <SkillBar label={isAr ? "المفردات" : "Vocabulary"} pct={vocab} color="#4ade80" />
              <SkillBar label={isAr ? "القراءة" : "Reading"} pct={reading} color="#3ce0fb" />
            </div>
            {/* Skill analysis notes */}
            <div className="flex flex-col gap-2 mt-4">
              {(["grammar", "vocabulary", "reading"] as const).map((sk) => {
                const info = feedback.skill_analysis[sk];
                return (
                  <div key={sk} className="text-xs px-3 py-2 rounded-lg"
                    style={{ background: `${STATUS_COLOR[info.status]}10`, borderLeft: `3px solid ${STATUS_COLOR[info.status]}`, color: "var(--color-on-surface-variant)" }}>
                    <strong style={{ color: STATUS_COLOR[info.status] }}>
                      {sk.charAt(0).toUpperCase() + sk.slice(1)}
                    </strong>: {info.note}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Radar chart */}
          <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="font-display font-bold text-lg mb-4" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "مخطط المهارات" : "Skills Radar"}
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fontWeight: 600, fill: "var(--color-on-surface-variant)" }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar dataKey="value" stroke={cefrColor} fill={cefrColor} fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ── Strengths & Weaknesses ───────────────────────────────── */}
      <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid var(--portal-color-border)" }}>
        <h2 className="font-display font-bold text-lg mb-5 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
          <BookOpen size={18} style={{ color: "var(--portal-color)" }} />
          {isAr ? "تقييم شامل" : "Detailed Analysis"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <p className="text-xs font-mono font-bold mb-3" style={{ color: "#4ade80" }}>✓ {isAr ? "نقاط القوة" : "STRENGTHS"}</p>
            <ul className="flex flex-col gap-2">
              {feedback.strengths.map((s, i) => (
                <li key={i} className="text-sm leading-relaxed flex gap-2 items-start" style={{ color: "var(--color-on-surface-variant)" }}>
                  <CheckCircle size={13} style={{ color: "#4ade80", flexShrink: 0, marginTop: 2 }} />{s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-mono font-bold mb-3" style={{ color: "#fbbf24" }}>⚠ {isAr ? "مجالات التحسين" : "AREAS TO IMPROVE"}</p>
            <ul className="flex flex-col gap-2">
              {feedback.weaknesses.map((w, i) => (
                <li key={i} className="text-sm leading-relaxed flex gap-2 items-start" style={{ color: "var(--color-on-surface-variant)" }}>
                  <AlertTriangle size={13} style={{ color: "#fbbf24", flexShrink: 0, marginTop: 2 }} />{w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Study Advice ─────────────────────────────────────────── */}
      <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid rgba(60,224,251,0.08)" }}>
        <h2 className="font-display font-bold text-lg mb-5 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
          <BookOpen size={18} style={{ color: "var(--color-tertiary)" }} />
          {isAr ? "توصيات الدراسة" : "Study Recommendations"}
        </h2>
        <div className="flex flex-col gap-2.5">
          {feedback.advice.map((tip, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-xl text-sm leading-relaxed"
              style={{ background: "rgba(60,224,251,0.04)", border: "1px solid rgba(60,224,251,0.08)", color: "var(--color-on-surface-variant)" }}>
              <span className="font-mono font-bold flex-shrink-0" style={{ color: "var(--color-tertiary)" }}>{i + 1}.</span>
              {tip}
            </div>
          ))}
        </div>
      </div>

      {/* ── Weekly Study Plan (collapsible) ──────────────────────── */}
      <div className="glass-card rounded-2xl overflow-hidden" style={{ border: "1px solid var(--portal-color-border)" }}>
        <button
          onClick={() => setShowWeekly((v) => !v)}
          className="w-full flex items-center justify-between px-6 py-4 text-start"
          style={{ background: "var(--portal-color-faint)" }}>
          <span className="font-display font-bold flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
            <Calendar size={18} style={{ color: "var(--portal-color)" }} />
            {isAr ? "خطة الدراسة الأسبوعية" : "Weekly Study Plan"}
          </span>
          {showWeekly ? <ChevronUp size={18} style={{ color: "var(--color-on-surface-variant)" }} /> : <ChevronDown size={18} style={{ color: "var(--color-on-surface-variant)" }} />}
        </button>
        {showWeekly && (
          <div className="px-6 pb-6 flex flex-col gap-3 pt-2">
            {feedback.weekly_plan.map((day, i) => (
              <div key={i} className="flex gap-3 p-3.5 rounded-xl text-sm leading-relaxed"
                style={{
                  background: i % 2 === 0 ? `${cefrColor}08` : "var(--portal-color-faint)",
                  border: `1px solid ${i % 2 === 0 ? cefrColor + "20" : "var(--portal-color-border)"}`,
                  color: "var(--color-on-surface-variant)",
                }}>
                <span style={{ flexShrink: 0 }}>{i === 0 ? "📅" : i === 1 ? "📖" : "✍️"}</span>
                {day}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Stage Performance ────────────────────────────────────── */}
      {result.breakdown.stages && result.breakdown.stages.length > 0 && (
        <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="font-display font-bold text-lg mb-4" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "أداء كل مرحلة" : "Stage Performance"}
          </h2>
          <div className="flex flex-col gap-2.5">
            {result.breakdown.stages.map((s) => (
              <div key={s.stage} className="flex items-center gap-3">
                <span className="text-xs font-mono w-14 flex-shrink-0" style={{ color: "var(--color-on-surface-variant)" }}>S{s.stage}</span>
                <div className="flex-1 h-1.5 rounded-full" style={{ background: "var(--color-outline-variant)" }}>
                  <div className="h-full rounded-full" style={{ width: `${s.score}%`, background: s.score >= 70 ? "#4ade80" : s.score >= 40 ? "#fbbf24" : "#ef4444" }} />
                </div>
                <span className="text-xs font-mono w-8 text-end flex-shrink-0" style={{ color: "var(--color-on-surface)" }}>{s.score}%</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded flex-shrink-0" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)" }}>{s.difficulty}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Wrong Answers Review (collapsible) ───────────────────── */}
      {wrongAnswers.length > 0 && (
        <div className="glass-card rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(239,68,68,0.12)" }}>
          <button
            onClick={() => setShowWrong((v) => !v)}
            className="w-full flex items-center justify-between px-6 py-4 text-start"
            style={{ background: "rgba(239,68,68,0.04)" }}>
            <span className="font-display font-bold flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
              <XCircle size={18} style={{ color: "#ef4444" }} />
              {isAr ? "مراجعة الأخطاء" : "Questions You Got Wrong"}
              <span className="text-xs font-mono px-2 py-0.5 rounded-full text-white" style={{ background: "#ef4444" }}>
                {wrongAnswers.length}
              </span>
            </span>
            {showWrong ? <ChevronUp size={18} style={{ color: "var(--color-on-surface-variant)" }} /> : <ChevronDown size={18} style={{ color: "var(--color-on-surface-variant)" }} />}
          </button>
          {showWrong && (
            <div className="px-6 pb-6 flex flex-col gap-4 pt-2">
              {wrongAnswers.map((item, idx) => (
                <div key={idx} className="rounded-xl p-4" style={{ background: "rgba(239,68,68,0.04)", borderLeft: "3px solid #ef4444" }}>
                  <p className="text-sm font-semibold mb-3 leading-relaxed" style={{ color: "var(--color-on-surface)" }}>
                    <span className="font-mono mr-2" style={{ color: "#ef4444" }}>{idx + 1}.</span>
                    {item.questionText}
                  </p>
                  <div className="flex flex-col gap-1.5 text-xs">
                    <div className="flex gap-2 items-start px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.08)" }}>
                      <XCircle size={13} style={{ color: "#ef4444", flexShrink: 0, marginTop: 1 }} />
                      <span style={{ color: "var(--color-on-surface-variant)" }}>
                        <strong style={{ color: "#ef4444" }}>{isAr ? "إجابتك: " : "Your answer: "}</strong>
                        {item.userAnswer ? item.options[item.userAnswer] : (isAr ? "(تخطي)" : "(skipped)")}
                      </span>
                    </div>
                    <div className="flex gap-2 items-start px-3 py-2 rounded-lg" style={{ background: "rgba(74,222,128,0.08)" }}>
                      <CheckCircle size={13} style={{ color: "#4ade80", flexShrink: 0, marginTop: 1 }} />
                      <span style={{ color: "var(--color-on-surface-variant)" }}>
                        <strong style={{ color: "#4ade80" }}>{isAr ? "الإجابة الصحيحة: " : "Correct answer: "}</strong>
                        {item.options[item.correctAnswer]}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Career Hub Handoff ───────────────────────────────────── */}
      <div className="rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.2)" }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(245,158,11,0.1)" }}>
          <Briefcase size={20} style={{ color: "#f59e0b" }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "اكتشف فرصك المهنية" : "Discover Career Opportunities"}
          </p>
          <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr
              ? `بناءً على مستواك ${result.level}، اكتشف الوظائف المناسبة وحلّل سيرتك الذاتية عبر بوابة المسار المهني.`
              : `Based on your ${result.level} level, explore matching jobs and analyse your CV through the Career Hub.`}
          </p>
        </div>
        <Link href={`/${locale}/career`}
          className="flex-shrink-0 flex items-center gap-2 font-mono text-sm px-4 py-2.5 rounded-xl transition-all hover:opacity-80 whitespace-nowrap"
          style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", color: "#f59e0b", textDecoration: "none" }}>
          <Briefcase size={14} />
          {isAr ? "ابحث عن فرصك" : "Find My Opportunities"}
          <Arrow size={13} />
        </Link>
      </div>

      {/* ── Actions ──────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href={`/${locale}/dashboard`} className="glow-button-primary text-white font-mono px-8 py-3 rounded-xl flex items-center gap-2">
          <LayoutDashboard size={16} />
          {isAr ? "لوحة التحكم" : "Dashboard"}
        </Link>
        <Link href={`/${locale}/language/assessment`} className="glow-button-secondary font-mono px-6 py-3 rounded-xl flex items-center gap-2">
          <RotateCcw size={16} />
          {isAr ? "إعادة الاختبار" : "Retake Assessment"}
        </Link>
        <Link href={`/${locale}/language/history`}
          className="font-mono px-6 py-3 rounded-xl flex items-center gap-2 text-sm transition-all hover:opacity-80"
          style={{ color: "var(--color-on-surface-variant)" }}>
          <Clock size={14} />
          {isAr ? "سجل الاختبارات" : "View History"}
        </Link>
        <Link href={`/${locale}/language`} className="font-mono px-6 py-3 rounded-xl flex items-center gap-2 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "بوابة اللغة" : "Language Portal"} <Arrow size={14} />
        </Link>
      </div>

    </div>
  );
}
