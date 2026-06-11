"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import {
  CheckCircle, XCircle, Flag, ChevronRight, ChevronLeft,
  LogIn, Download, Copy, AlertTriangle, Shuffle,
  MessageCircle, BarChart2,
} from "lucide-react";
import type { ExamQuestion, ExamSubject } from "@/data/digital-exam-subjects";

type Phase = "intro" | "running" | "done" | "saving";
type QCount = 10 | 15 | 20 | 30;

interface Answer {
  questionId: number;
  selected: "a" | "b" | "c" | "d" | null;
  correct: boolean;
  timeSpent: number;
}

interface AiExplanation {
  questionId: number;
  explanation: string;
}

/** Fisher-Yates shuffle */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function DigitalExamClient({
  subject,
  locale,
}: {
  subject: ExamSubject;
  locale: string;
}) {
  const _router = useRouter();
  const isAr = locale === "ar";
  const Arrow = isAr ? ChevronLeft : ChevronRight;
  const { user, isAuthenticated, loading, supabaseConfigured } = useAuth();

  const [phase, setPhase] = useState<Phase>("intro");
  const [questionCount, setQuestionCount] = useState<QCount>(20);
  const [activeQuestions, setActiveQuestions] = useState<ExamQuestion[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const answersRef = useRef<Answer[]>([]);
  const [selected, setSelected] = useState<"a" | "b" | "c" | "d" | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [qStart, setQStart] = useState(Date.now());
  const [examStart, setExamStart] = useState(0);
  const [resultData, setResultData] = useState<{
    score: number; percentage: number; passed: boolean; id?: string;
  } | null>(null);

  // Anti-cheat
  const flagsRef = useRef(0);
  const [flagsCount, setFlagsCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [terminated, setTerminated] = useState(false);

  // AI Explanations
  const [aiExplanations, setAiExplanations] = useState<AiExplanation[] | null>(null);
  const [loadingExplain, setLoadingExplain] = useState(false);

  // Copy share
  const [copied, setCopied] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const feedbackRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (feedbackRef.current) clearTimeout(feedbackRef.current);
  }, []);

  const advanceQ = useCallback(() => {
    setSelected(null);
    setShowFeedback(false);
    setQIndex((i) => i + 1);
  }, []);

  const recordAnswer = useCallback((
    q: ExamQuestion,
    sel: "a" | "b" | "c" | "d" | null,
    timeSpent: number,
  ) => {
    const a: Answer = { questionId: q.id, selected: sel, correct: sel === q.correct, timeSpent };
    answersRef.current = [...answersRef.current, a];
    setAnswers((prev) => [...prev, a]);
  }, []);

  // Anti-cheat: visibilitychange listener
  useEffect(() => {
    if (phase !== "running") return;
    const handler = () => {
      if (document.visibilityState === "hidden") {
        flagsRef.current += 1;
        setFlagsCount(flagsRef.current);
        setShowWarning(true);
        if (flagsRef.current >= 3) {
          // Auto-terminate
          clearTimers();
          setTerminated(true);
        }
      }
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [phase, clearTimers]);

  // When terminated → finish
  useEffect(() => {
    if (terminated && phase === "running") {
      finishExam(answersRef.current, true);
    }
  }, [terminated]); // eslint-disable-line react-hooks/exhaustive-deps

  // Timer tick
  const startTimer = useCallback(() => {
    clearTimers();
    setTimeLeft(60);
    setQStart(Date.now());
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearTimers();
          const q = activeQuestions[qIndex];
          if (q) recordAnswer(q, null, 60);
          advanceQ();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, [clearTimers, activeQuestions, qIndex, recordAnswer, advanceQ]);

  // Watch qIndex
  useEffect(() => {
    if (phase !== "running") return;
    if (qIndex >= activeQuestions.length) {
      clearTimers();
      finishExam(answersRef.current, false);
      return;
    }
    startTimer();
  }, [qIndex, phase]); // eslint-disable-line react-hooks/exhaustive-deps

  async function finishExam(finalAnswers: Answer[], autoTerminated: boolean) {
    setPhase("saving");
    const totalSec = Math.round((Date.now() - examStart) / 1000);
    const score = finalAnswers.filter((a) => a.correct).length;
    const total = activeQuestions.length || questionCount;
    const percentage = Math.round((score / Math.max(total, 1)) * 100);
    const passed = percentage >= 80;

    setResultData({ score, percentage, passed });

    if (user) {
      try {
        const res = await fetch("/api/exams/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject: subject.id,
            subject_label: subject.labelAr || subject.label,
            score,
            total,
            time_taken: totalSec,
            flags_count: flagsRef.current,
            auto_terminated: autoTerminated,
            answers: finalAnswers.map((a) => ({
              id: a.questionId,
              selected: a.selected,
              correct: a.correct,
            })),
          }),
        });
        if (res.ok) {
          const { id } = await res.json();
          setResultData((prev) => (prev ? { ...prev, id } : prev));
        }
      } catch {
        // results still shown locally
      }
    }
    setPhase("done");
  }

  function handleStart() {
    const pool = shuffle(subject.questions).slice(0, questionCount);
    setActiveQuestions(pool);
    setExamStart(Date.now());
    setAnswers([]);
    answersRef.current = [];
    setQIndex(0);
    flagsRef.current = 0;
    setFlagsCount(0);
    setShowWarning(false);
    setTerminated(false);
    setAiExplanations(null);
    setPhase("running");
  }

  function handleSelect(opt: "a" | "b" | "c" | "d") {
    if (showFeedback || selected) return;
    clearTimers();
    const q = activeQuestions[qIndex];
    if (!q) return;
    const timeSpent = Math.round((Date.now() - qStart) / 1000);
    setSelected(opt);
    setShowFeedback(true);
    recordAnswer(q, opt, timeSpent);
    feedbackRef.current = setTimeout(() => {
      setShowFeedback(false);
      advanceQ();
    }, 1300);
  }

  useEffect(() => () => clearTimers(), [clearTimers]);

  async function handleGetExplanations() {
    const wrong = answers.filter((a) => !a.correct);
    if (!wrong.length) return;
    setLoadingExplain(true);
    try {
      const res = await fetch("/api/exams/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: subject.labelAr,
          wrongs: wrong.map((a) => {
            const q = activeQuestions.find((q) => q.id === a.questionId);
            return {
              questionId: a.questionId,
              question: q?.question ?? "",
              userAnswer: a.selected ? q?.options[a.selected] ?? "" : "لم يجب",
              correctAnswer: q ? q.options[q.correct] : "",
            };
          }),
        }),
      });
      if (res.ok) {
        const { explanations } = await res.json();
        setAiExplanations(explanations as AiExplanation[]);
      }
    } catch {
      //
    } finally {
      setLoadingExplain(false);
    }
  }

  async function handleCopyResult() {
    if (!resultData) return;
    const text = isAr
      ? `نتيجتي في اختبار ${subject.labelAr}:\n${resultData.percentage}% — ${resultData.score}/${activeQuestions.length} إجابة صحيحة\n${resultData.passed ? "✅ ناجح" : "❌ راسب"}\nNexaLearn التعليمية`
      : `My result in ${subject.label} exam:\n${resultData.percentage}% — ${resultData.score}/${activeQuestions.length} correct\n${resultData.passed ? "✅ Passed" : "❌ Failed"}\nNexaLearn`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleWhatsApp() {
    if (!resultData) return;
    const text = encodeURIComponent(
      isAr
        ? `حصلت على ${resultData.percentage}% في اختبار ${subject.labelAr} على NexaLearn التعليمية! ${resultData.passed ? "✅ ناجح" : "📊 مستمر في التعلم"}`
        : `I scored ${resultData.percentage}% in ${subject.label} exam on NexaLearn! ${resultData.passed ? "✅ Passed" : "📊 Keep learning"}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }

  // ── Auth gate ──────────────────────────────────────────────────────────────
  if (!loading && supabaseConfigured && !isAuthenticated) {
    return (
      <div className="container-xl py-16 flex flex-col items-center gap-8 text-center">
        <LogIn size={40} style={{ color: subject.color }} />
        <h2 className="font-display font-bold text-3xl" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "تسجيل الدخول مطلوب" : "Sign In Required"}
        </h2>
        <p className="max-w-md" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "سجّل دخولك لحفظ نتائج اختباراتك." : "Sign in to save your exam results."}
        </p>
        <div className="flex gap-4">
          <Link href={`/${locale}/login`} className="glow-button-primary text-white font-mono px-8 py-3 rounded-xl">
            {isAr ? "تسجيل الدخول" : "Sign In"}
          </Link>
          <Link href={`/${locale}/digital-exams`} className="glow-button-secondary font-mono px-6 py-3 rounded-xl">
            {isAr ? "رجوع" : "Go Back"}
          </Link>
        </div>
      </div>
    );
  }

  // ── Intro ──────────────────────────────────────────────────────────────────
  if (phase === "intro") {
    const counts: QCount[] = [10, 15, 20, 30];
    const totalAvailable = subject.questions.length;
    return (
      <div className="container-xl py-16 flex flex-col items-center gap-10 max-w-xl mx-auto text-center">
        <div style={{ fontSize: "64px" }}>{subject.icon}</div>
        <h1 className="font-display font-bold text-4xl" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? subject.labelAr : subject.label}
        </h1>
        <p className="text-lg" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? subject.descriptionAr : subject.description}
        </p>

        {/* Exam info */}
        <div className="grid grid-cols-2 gap-4 w-full text-start">
          {[
            { icon: "📦", enLabel: `${totalAvailable} questions in bank`, arLabel: `${totalAvailable} سؤال في بنك الأسئلة` },
            { icon: "⏱️", enLabel: "60 seconds per question", arLabel: "60 ثانية لكل سؤال" },
            { icon: "🏆", enLabel: "Pass score: 80%+", arLabel: "درجة النجاح: 80%+" },
            { icon: "🔀", enLabel: "Questions shuffled randomly", arLabel: "أسئلة عشوائية في كل مرة" },
          ].map((item, i) => (
            <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-3" style={{ border: `1px solid ${subject.color}15` }}>
              <span className="text-xl">{item.icon}</span>
              <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? item.arLabel : item.enLabel}
              </p>
            </div>
          ))}
        </div>

        {/* Question count selector */}
        <div className="w-full">
          <p className="text-sm font-semibold mb-3 text-start" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "عدد الأسئلة:" : "Number of questions:"}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            {counts.map((c) => {
              const available = Math.min(c, totalAvailable);
              const active = questionCount === c;
              return (
                <button
                  key={c}
                  onClick={() => setQuestionCount(c)}
                  disabled={totalAvailable < c}
                  className="px-5 py-2 rounded-xl font-mono font-bold text-sm transition-all"
                  style={{
                    background: active ? subject.color + "25" : "rgba(255,255,255,0.03)",
                    border: `1.5px solid ${active ? subject.color : "rgba(255,255,255,0.1)"}`,
                    color: active ? subject.color : "var(--color-on-surface-variant)",
                    opacity: totalAvailable < c ? 0.4 : 1,
                    cursor: totalAvailable < c ? "not-allowed" : "pointer",
                  }}
                >
                  {available}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleStart}
          className="glow-button-primary text-white font-bold font-mono px-12 py-4 rounded-2xl text-lg flex items-center gap-3"
          style={{ background: `linear-gradient(135deg, ${subject.color}80, ${subject.color}40)` }}
        >
          <Shuffle size={18} />
          {isAr ? `ابدأ الاختبار (${questionCount} سؤال) ←` : `Start Exam (${questionCount} questions) →`}
        </button>
        <div className="flex gap-4">
          <Link href={`/${locale}/digital-exams/history`} className="text-sm flex items-center gap-1" style={{ color: "var(--color-on-surface-variant)" }}>
            <BarChart2 size={14} />{isAr ? "سجل أدائي" : "My History"}
          </Link>
          <Link href={`/${locale}/digital-exams`} className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "رجوع إلى الاختبارات" : "Back to Exams"}
          </Link>
        </div>
      </div>
    );
  }

  // ── Running ────────────────────────────────────────────────────────────────
  if (phase === "running") {
    const q = activeQuestions[qIndex];
    if (!q) return null;
    const progress = (qIndex / activeQuestions.length) * 100;
    const timerPct = (timeLeft / 60) * 100;
    const timerColor = timeLeft <= 10 ? "#ef4444" : timeLeft <= 20 ? "#f59e0b" : "#4ade80";
    const isTF = q.type === "truefalse";
    const opts: ("a" | "b" | "c" | "d")[] = isTF ? ["a", "b"] : ["a", "b", "c", "d"];

    return (
      <div className="container-xl py-10 max-w-3xl mx-auto flex flex-col gap-6">

        {/* Anti-cheat warning banner */}
        {showWarning && (
          <div
            className="rounded-2xl px-5 py-4 flex items-center gap-3"
            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.35)" }}
          >
            <AlertTriangle size={18} style={{ color: "#ef4444", flexShrink: 0 }} />
            <div className="flex-1">
              <p className="text-sm font-bold" style={{ color: "#ef4444" }}>
                {isAr
                  ? `⚠️ تحذير ${flagsCount}/3 — تم رصد تبديل التبويب. عند 3 تحذيرات سيُنهى الاختبار تلقائياً.`
                  : `⚠️ Warning ${flagsCount}/3 — Tab switch detected. At 3 warnings the exam auto-terminates.`}
              </p>
            </div>
            <button
              onClick={() => setShowWarning(false)}
              className="text-xs font-mono px-3 py-1 rounded-lg"
              style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" }}
            >
              {isAr ? "أغلق" : "Dismiss"}
            </button>
          </div>
        )}

        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? subject.labelAr : subject.label} — {isAr ? "س" : "Q"}{qIndex + 1}/{activeQuestions.length}
              {flagsCount > 0 && (
                <span className="ml-2 font-bold" style={{ color: "#f59e0b" }}>
                  ⚠️ {flagsCount}
                </span>
              )}
            </span>
            <div className="w-48 h-1.5 rounded-full" style={{ background: "var(--color-outline-variant)" }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: subject.color }} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Timer ring */}
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                <circle
                  cx="24" cy="24" r="20" fill="none" stroke={timerColor} strokeWidth="4"
                  strokeDasharray={`${(125.6 * timerPct) / 100} 125.6`} strokeLinecap="round"
                  style={{ transition: "stroke-dasharray 1s linear, stroke 0.3s" }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold" style={{ color: timerColor }}>
                {timeLeft}
              </span>
            </div>
            <button
              onClick={() => { clearTimers(); finishExam(answersRef.current, false); }}
              className="text-xs font-mono px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444" }}
            >
              <Flag size={12} className="inline mr-1" />{isAr ? "إنهاء" : "Finish"}
            </button>
          </div>
        </div>

        {/* Question */}
        <div className="glass-card rounded-2xl p-8" style={{ border: `1px solid ${subject.color}15` }}>
          {isTF && (
            <span className="inline-block mb-3 text-xs font-mono px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "var(--color-on-surface-variant)" }}>
              {isAr ? "صح / خطأ" : "True / False"}
            </span>
          )}
          <p className="font-semibold text-lg leading-relaxed mb-8" style={{ color: "var(--color-on-surface)" }}>
            {q.question}
          </p>
          <div className="flex flex-col gap-3">
            {opts.map((opt) => {
              let borderColor = "rgba(255,255,255,0.06)";
              let bg = "rgba(255,255,255,0.02)";
              let textColor = "var(--color-on-surface)";

              if (showFeedback) {
                if (opt === q.correct) { borderColor = "#4ade80"; bg = "rgba(74,222,128,0.08)"; textColor = "#4ade80"; }
                else if (opt === selected) { borderColor = "#ef4444"; bg = "rgba(239,68,68,0.08)"; textColor = "#ef4444"; }
              } else if (selected === opt) {
                borderColor = subject.color;
                bg = `${subject.color}10`;
              }

              const optLabel = isTF
                ? (opt === "a" ? (isAr ? "✅ صح" : "✅ True") : (isAr ? "❌ خطأ" : "❌ False"))
                : `${opt.toUpperCase()}. ${q.options[opt]}`;

              return (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  disabled={!!selected}
                  className="flex items-center gap-4 rounded-xl px-5 py-4 text-start transition-all hover:opacity-80"
                  style={{ border: `1px solid ${borderColor}`, background: bg, cursor: selected ? "default" : "pointer" }}
                >
                  {!isTF && (
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold flex-shrink-0" style={{ background: "rgba(255,255,255,0.04)", color: textColor }}>
                      {opt.toUpperCase()}
                    </span>
                  )}
                  <span className="text-sm flex-1" style={{ color: textColor }}>
                    {isTF ? optLabel : q.options[opt]}
                  </span>
                  {showFeedback && opt === q.correct && <CheckCircle size={16} style={{ color: "#4ade80" }} />}
                  {showFeedback && opt === selected && opt !== q.correct && <XCircle size={16} style={{ color: "#ef4444" }} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1 flex-wrap">
          {activeQuestions.map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full" style={{
              background: i < qIndex
                ? (answers[i]?.correct ? "#4ade80" : "#ef4444")
                : i === qIndex ? subject.color : "rgba(255,255,255,0.1)",
            }} />
          ))}
        </div>
      </div>
    );
  }

  // ── Saving ─────────────────────────────────────────────────────────────────
  if (phase === "saving") {
    return (
      <div className="container-xl py-24 flex flex-col items-center gap-6 text-center">
        <div className="w-14 h-14 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: subject.color, borderTopColor: "transparent" }} />
        <p className="font-semibold" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "جاري حفظ نتائجك..." : "Saving your results..."}
        </p>
      </div>
    );
  }

  // ── Done ───────────────────────────────────────────────────────────────────
  if (phase === "done" && resultData) {
    const { score, percentage, passed, id: resultId } = resultData;
    const total = activeQuestions.length;
    const wrongAnswers = answers.filter((a) => !a.correct);

    return (
      <div className="container-xl py-12 flex flex-col items-center gap-8 max-w-2xl mx-auto text-center">

        {/* Result hero */}
        <div
          className="w-full rounded-3xl p-10 flex flex-col items-center gap-4"
          style={{
            background: passed
              ? "linear-gradient(135deg, rgba(74,222,128,0.08) 0%, rgba(74,222,128,0.03) 100%)"
              : "linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(239,68,68,0.03) 100%)",
            border: `1px solid ${passed ? "rgba(74,222,128,0.25)" : "rgba(239,68,68,0.25)"}`,
          }}
        >
          <div style={{ fontSize: "48px" }}>{passed ? "🏆" : "📊"}</div>
          <h2 className="font-display font-bold text-3xl" style={{ color: "var(--color-on-surface)" }}>
            {passed
              ? (isAr ? "🎉 اجتزت الاختبار!" : "🎉 Exam Passed!")
              : (isAr ? "نتيجة الاختبار" : "Exam Result")}
          </h2>
          <p className="font-mono font-black text-6xl" style={{ color: passed ? "#4ade80" : "#ef4444" }}>
            {percentage}%
          </p>
          <p style={{ color: "var(--color-on-surface-variant)" }}>
            {score}/{total} {isAr ? "إجابة صحيحة" : "correct answers"}
          </p>
          {flagsCount > 0 && (
            <div className="px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", color: "#f59e0b" }}>
              <AlertTriangle size={12} /> {flagsCount} {isAr ? "تحذير تبديل تبويب" : "tab switch warning(s)"}
            </div>
          )}
          {passed && (
            <div className="px-4 py-2 rounded-full text-sm font-mono" style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80" }}>
              {isAr ? "✅ ناجح — درجة أعلى من 80%" : "✅ Passed — scored above 80%"}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          {/* Certificate button (passed + saved) */}
          {passed && resultId && (
            <a
              href={`/api/certificates/exams/${resultId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
              style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80" }}
            >
              <Download size={15} />
              {isAr ? "تحميل الشهادة PDF" : "Download Certificate PDF"}
            </a>
          )}
          {/* WhatsApp share */}
          <button
            onClick={handleWhatsApp}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
            style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.3)", color: "#25d366" }}
          >
            <MessageCircle size={15} />
            {isAr ? "شارك على واتساب" : "Share on WhatsApp"}
          </button>
          {/* Copy result */}
          <button
            onClick={handleCopyResult}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
            style={{ background: "rgba(142,213,255,0.1)", border: "1px solid rgba(142,213,255,0.2)", color: "#8ed5ff" }}
          >
            {copied ? <CheckCircle size={15} /> : <Copy size={15} />}
            {copied ? (isAr ? "تم النسخ!" : "Copied!") : (isAr ? "نسخ النتيجة" : "Copy Result")}
          </button>
        </div>

        {/* Wrong answers / improvement tips */}
        {!passed && (
          <div className="w-full glass-card rounded-2xl p-6 text-start" style={{ border: "1px solid rgba(251,191,36,0.15)" }}>
            <h3 className="font-bold text-base mb-4 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
              <span style={{ fontSize: "18px" }}>💡</span>
              {isAr ? "خطوات التحسين" : "Next Steps to Pass"}
            </h3>
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: "📖",
                  arLabel: `راجع أساسيات ${subject.labelAr}`,
                  enLabel: `Review ${subject.label} fundamentals`,
                  arDesc: `حصلت على ${percentage}% — تحتاج 80% للنجاح. ركّز على الأسئلة التي أخطأت فيها.`,
                  enDesc: `Scored ${percentage}% — need 80% to pass. Focus on questions you missed.`,
                },
                {
                  icon: "🎯",
                  arLabel: "راجع الإجابات الخاطئة بالأسفل",
                  enLabel: "Review incorrect answers below",
                  arDesc: `أخطأت في ${wrongAnswers.length} أسئلة. تحقق من الإجابات الصحيحة.`,
                  enDesc: `Got ${wrongAnswers.length} wrong. Check the correct answers below.`,
                },
                {
                  icon: "🔄",
                  arLabel: "أعد الاختبار عند الاستعداد",
                  enLabel: "Retake when ready",
                  arDesc: "الأسئلة عشوائية في كل مرة — ستواجه أسئلة مختلفة.",
                  enDesc: "Questions are shuffled each time — you will face different questions.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <span className="text-base mt-0.5 flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--color-on-surface)" }}>
                      {isAr ? item.arLabel : item.enLabel}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
                      {isAr ? item.arDesc : item.enDesc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Per-question review */}
        <div className="w-full glass-card rounded-2xl p-6" style={{ border: "1px solid rgba(255,255,255,0.05)" }}>
          <h3 className="font-bold text-base mb-4 text-start" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "مراجعة الإجابات" : "Answer Review"}
          </h3>
          <div className="flex flex-col gap-2">
            {activeQuestions.map((q, i) => {
              const a = answers[i];
              return (
                <div key={q.id} className="flex items-start gap-3 text-start">
                  {a?.correct
                    ? <CheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: "#4ade80" }} />
                    : <XCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: "#ef4444" }} />
                  }
                  <div className="flex-1 min-w-0">
                    <p className="text-xs" style={{ color: "var(--color-on-surface)" }}>{q.question}</p>
                    {!a?.correct && (
                      <p className="text-[10px] mt-0.5" style={{ color: "#4ade80" }}>
                        {isAr ? "الصواب:" : "Correct:"} {q.options[q.correct]}
                      </p>
                    )}
                    {!a?.correct && aiExplanations && (() => {
                      const exp = aiExplanations.find((e) => e.questionId === q.id);
                      return exp ? (
                        <p className="text-[10px] mt-1 leading-relaxed" style={{ color: "#8ed5ff" }}>
                          💡 {exp.explanation}
                        </p>
                      ) : null;
                    })()}
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Explanations button */}
          {wrongAnswers.length > 0 && (
            <button
              onClick={handleGetExplanations}
              disabled={loadingExplain || !!aiExplanations}
              className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-opacity"
              style={{
                background: "rgba(208,188,255,0.08)",
                border: "1px solid rgba(208,188,255,0.2)",
                color: "#d0bcff",
                opacity: loadingExplain || !!aiExplanations ? 0.6 : 1,
                cursor: loadingExplain || !!aiExplanations ? "default" : "pointer",
              }}
            >
              {loadingExplain
                ? (isAr ? "⏳ جاري إنشاء الشرح..." : "⏳ Generating explanations...")
                : aiExplanations
                  ? (isAr ? "✅ تم إضافة الشرح أعلاه" : "✅ Explanations added above")
                  : (isAr ? "✨ اشرح لي الإجابات الخاطئة بالذكاء الاصطناعي" : "✨ Explain wrong answers with AI")}
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href={`/${locale}/dashboard`} className="glow-button-primary text-white font-mono px-8 py-3 rounded-xl">
            {isAr ? "لوحة التحكم" : "Dashboard"}
          </Link>
          <button
            onClick={() => {
              setPhase("intro");
              setAnswers([]);
              answersRef.current = [];
              setQIndex(0);
              setResultData(null);
              setActiveQuestions([]);
              flagsRef.current = 0;
              setFlagsCount(0);
              setAiExplanations(null);
            }}
            className="glow-button-primary font-mono px-8 py-3 rounded-xl"
            style={{ background: `linear-gradient(135deg, ${subject.color}60, ${subject.color}30)` }}
          >
            {isAr ? "إعادة الاختبار" : "Retry Exam"}
          </button>
          <Link href={`/${locale}/digital-exams`} className="glow-button-secondary font-mono px-6 py-3 rounded-xl flex items-center gap-2">
            {isAr ? "اختبار آخر" : "Try Another Exam"} <Arrow size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
