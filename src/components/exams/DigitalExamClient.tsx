"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { CheckCircle, XCircle, Timer, Flag, ChevronRight, ChevronLeft, LogIn } from "lucide-react";
import type { ExamQuestion, ExamSubject } from "@/data/digital-exam-subjects";

type Phase = "intro" | "running" | "done" | "saving";

interface Answer {
  questionId: number;
  selected: "a" | "b" | "c" | "d" | null;
  correct: boolean;
  timeSpent: number;
}

export default function DigitalExamClient({ subject, locale }: { subject: ExamSubject; locale: string }) {
  const router = useRouter();
  const isAr = locale === "ar";
  const Arrow = isAr ? ChevronLeft : ChevronRight;
  const { user, isAuthenticated, loading, supabaseConfigured } = useAuth();

  const [phase, setPhase] = useState<Phase>("intro");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selected, setSelected] = useState<"a" | "b" | "c" | "d" | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [qStart, setQStart] = useState(Date.now());
  const [examStart, setExamStart] = useState(0);
  const [resultData, setResultData] = useState<{ score: number; percentage: number; passed: boolean; id?: string } | null>(null);

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
    timeSpent: number
  ) => {
    setAnswers((prev) => [
      ...prev,
      { questionId: q.id, selected: sel, correct: sel === q.correct, timeSpent },
    ]);
  }, []);

  // Timer tick
  const startTimer = useCallback(() => {
    clearTimers();
    setTimeLeft(60);
    setQStart(Date.now());
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearTimers();
          // Auto-skip
          const q = subject.questions[qIndex];
          if (q) recordAnswer(q, null, 60);
          advanceQ();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, [clearTimers, subject.questions, qIndex, recordAnswer, advanceQ]);

  // Watch qIndex
  useEffect(() => {
    if (phase !== "running") return;
    if (qIndex >= subject.questions.length) {
      clearTimers();
      finishExam();
      return;
    }
    startTimer();
  }, [qIndex, phase]); // eslint-disable-line react-hooks/exhaustive-deps

  async function finishExam() {
    setPhase("saving");
    const totalSec = Math.round((Date.now() - examStart) / 1000);
    const score = answers.filter((a) => a.correct).length;
    const total = subject.questions.length;
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= 80;

    setResultData({ score, percentage, passed });

    if (user) {
      try {
        const res = await fetch("/api/exams/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject: subject.id,
            subject_label: subject.label,
            score,
            total,
            time_taken: totalSec,
            answers: answers.map((a) => ({ id: a.questionId, selected: a.selected, correct: a.correct })),
          }),
        });
        if (res.ok) {
          const { id } = await res.json();
          setResultData((prev) => prev ? { ...prev, id } : prev);
        }
      } catch {
        // results still shown locally
      }
    }
    setPhase("done");
  }

  function handleStart() {
    setExamStart(Date.now());
    setAnswers([]);
    setQIndex(0);
    setPhase("running");
  }

  function handleSelect(opt: "a" | "b" | "c" | "d") {
    if (showFeedback || selected) return;
    clearTimers();
    const q = subject.questions[qIndex];
    if (!q) return;
    const timeSpent = Math.round((Date.now() - qStart) / 1000);
    setSelected(opt);
    setShowFeedback(true);
    recordAnswer(q, opt, timeSpent);

    feedbackRef.current = setTimeout(() => {
      setShowFeedback(false);
      advanceQ();
    }, 1200);
  }

  useEffect(() => () => clearTimers(), [clearTimers]);

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
    return (
      <div className="container-xl py-16 flex flex-col items-center gap-10 max-w-xl mx-auto text-center">
        <div style={{ fontSize: "64px" }}>{subject.icon}</div>
        <h1 className="font-display font-bold text-4xl" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? subject.labelAr : subject.label}
        </h1>
        <p className="text-lg" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? subject.descriptionAr : subject.description}
        </p>
        <div className="grid grid-cols-2 gap-4 w-full text-start">
          {[
            { icon: "📋", enLabel: "20 multiple-choice questions", arLabel: "20 سؤال اختيار من متعدد" },
            { icon: "⏱️", enLabel: "60 seconds per question", arLabel: "60 ثانية لكل سؤال" },
            { icon: "🏆", enLabel: "Pass score: 80%+", arLabel: "درجة النجاح: 80%+" },
            { icon: "💾", enLabel: "Results saved to dashboard", arLabel: "النتائج محفوظة في لوحة التحكم" },
          ].map((item, i) => (
            <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-3" style={{ border: `1px solid ${subject.color}15` }}>
              <span className="text-xl">{item.icon}</span>
              <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{isAr ? item.arLabel : item.enLabel}</p>
            </div>
          ))}
        </div>
        <button
          onClick={handleStart}
          className="glow-button-primary text-white font-bold font-mono px-12 py-4 rounded-2xl text-lg"
          style={{ background: `linear-gradient(135deg, ${subject.color}80, ${subject.color}40)` }}
        >
          {isAr ? "ابدأ الاختبار ←" : "Start Exam →"}
        </button>
        <Link href={`/${locale}/digital-exams`} className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "رجوع إلى الاختبارات" : "Back to Exams"}
        </Link>
      </div>
    );
  }

  // ── Running ────────────────────────────────────────────────────────────────
  if (phase === "running") {
    const q = subject.questions[qIndex];
    if (!q) return null;
    const progress = (qIndex / subject.questions.length) * 100;
    const timerPct = (timeLeft / 60) * 100;
    const timerColor = timeLeft <= 10 ? "#ef4444" : timeLeft <= 20 ? "#f59e0b" : "#4ade80";

    return (
      <div className="container-xl py-10 max-w-3xl mx-auto flex flex-col gap-6">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? subject.labelAr : subject.label} — Q{qIndex + 1}/{subject.questions.length}
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
                <circle cx="24" cy="24" r="20" fill="none" stroke={timerColor} strokeWidth="4"
                  strokeDasharray={`${(125.6 * timerPct) / 100} 125.6`} strokeLinecap="round"
                  style={{ transition: "stroke-dasharray 1s linear, stroke 0.3s" }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold" style={{ color: timerColor }}>
                {timeLeft}
              </span>
            </div>
            <button
              onClick={() => { clearTimers(); finishExam(); }}
              className="text-xs font-mono px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444" }}
            >
              <Flag size={12} className="inline mr-1" />{isAr ? "إنهاء" : "Finish"}
            </button>
          </div>
        </div>

        {/* Question */}
        <div className="glass-card rounded-2xl p-8" style={{ border: `1px solid ${subject.color}15` }}>
          <p className="font-semibold text-lg leading-relaxed mb-8" style={{ color: "var(--color-on-surface)" }}>
            {q.question}
          </p>
          <div className="flex flex-col gap-3">
            {(["a", "b", "c", "d"] as const).map((opt) => {
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

              return (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  disabled={!!selected}
                  className="flex items-center gap-4 rounded-xl px-5 py-4 text-start transition-all hover:opacity-80"
                  style={{ border: `1px solid ${borderColor}`, background: bg, cursor: selected ? "default" : "pointer" }}
                >
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold flex-shrink-0" style={{ background: "rgba(255,255,255,0.04)", color: textColor }}>
                    {opt.toUpperCase()}
                  </span>
                  <span className="text-sm flex-1" style={{ color: textColor }}>{q.options[opt]}</span>
                  {showFeedback && opt === q.correct && <CheckCircle size={16} style={{ color: "#4ade80" }} />}
                  {showFeedback && opt === selected && opt !== q.correct && <XCircle size={16} style={{ color: "#ef4444" }} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1 flex-wrap">
          {subject.questions.map((_, i) => (
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
    const { score, percentage, passed } = resultData;
    const total = subject.questions.length;
    const correct = answers.filter((a) => a.correct).length;

    return (
      <div className="container-xl py-12 flex flex-col items-center gap-10 max-w-2xl mx-auto text-center">
        {/* Result hero */}
        <div
          className="w-full rounded-3xl p-10 flex flex-col items-center gap-4"
          style={{
            background: passed ? "linear-gradient(135deg, rgba(74,222,128,0.08) 0%, rgba(74,222,128,0.03) 100%)" : "linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(239,68,68,0.03) 100%)",
            border: `1px solid ${passed ? "rgba(74,222,128,0.25)" : "rgba(239,68,68,0.25)"}`,
          }}
        >
          <div style={{ fontSize: "48px" }}>{passed ? "🏆" : "📊"}</div>
          <h2 className="font-display font-bold text-3xl" style={{ color: "var(--color-on-surface)" }}>
            {passed ? (isAr ? "اجتزت الاختبار!" : "Exam Passed!") : (isAr ? "نتيجة الاختبار" : "Exam Result")}
          </h2>
          <p className="font-mono font-black text-6xl" style={{ color: passed ? "#4ade80" : "#ef4444" }}>
            {percentage}%
          </p>
          <p style={{ color: "var(--color-on-surface-variant)" }}>
            {correct}/{total} {isAr ? "إجابة صحيحة" : "correct answers"}
          </p>
          {passed && (
            <div className="px-4 py-2 rounded-full text-sm font-mono" style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80" }}>
              {isAr ? "✅ ناجح — درجة أعلى من 80%" : "✅ Passed — scored above 80%"}
            </div>
          )}
        </div>

        {/* Next steps for failed exam */}
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
                  labelEn: `Review ${subject.label} fundamentals`,
                  labelAr: `راجع أساسيات ${subject.labelAr}`,
                  descEn: `You scored ${percentage}% — need 80% to pass. Focus on the questions you missed.`,
                  descAr: `حصلت على ${percentage}% — تحتاج 80% للنجاح. ركّز على الأسئلة التي أخطأت فيها.`,
                },
                {
                  icon: "🎯",
                  labelEn: "Review the incorrect answers below",
                  labelAr: "راجع الإجابات الخاطئة بالأسفل",
                  descEn: `You got ${total - correct} questions wrong. Check the correct answers shown in the review.`,
                  descAr: `أخطأت في ${total - correct} أسئلة. تحقق من الإجابات الصحيحة الموضحة في المراجعة.`,
                },
                {
                  icon: "🔄",
                  labelEn: "Retake the exam when ready",
                  labelAr: "أعد الاختبار عند الاستعداد",
                  descEn: "You can retake the exam as many times as needed. Your best score is saved.",
                  descAr: "يمكنك إعادة الاختبار عدد المرات التي تحتاجها. أفضل نتيجة هي التي تُحفظ.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <span className="text-base mt-0.5 flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--color-on-surface)" }}>
                      {isAr ? item.labelAr : item.labelEn}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
                      {isAr ? item.descAr : item.descEn}
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
            {subject.questions.map((q, i) => {
              const a = answers[i];
              return (
                <div key={q.id} className="flex items-start gap-3 text-start">
                  {a?.correct
                    ? <CheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: "#4ade80" }} />
                    : <XCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: "#ef4444" }} />
                  }
                  <div className="flex-1 min-w-0">
                    <p className="text-xs truncate" style={{ color: "var(--color-on-surface)" }}>{q.question}</p>
                    {!a?.correct && (
                      <p className="text-[10px] mt-0.5" style={{ color: "#4ade80" }}>
                        {isAr ? "الصواب:" : "Correct:"} {q.options[q.correct]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href={`/${locale}/dashboard`} className="glow-button-primary text-white font-mono px-8 py-3 rounded-xl">
            {isAr ? "لوحة التحكم" : "Dashboard"}
          </Link>
          {!passed && (
            <button
              onClick={() => { setPhase("intro"); setAnswers([]); setQIndex(0); setResultData(null); }}
              className="glow-button-primary font-mono px-8 py-3 rounded-xl"
              style={{ background: `linear-gradient(135deg, ${subject.color}60, ${subject.color}30)` }}
            >
              {isAr ? "إعادة الاختبار" : "Retry Exam"}
            </button>
          )}
          <Link href={`/${locale}/digital-exams`} className="glow-button-secondary font-mono px-6 py-3 rounded-xl flex items-center gap-2">
            {isAr ? "اختبار آخر" : "Try Another Exam"} <Arrow size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
