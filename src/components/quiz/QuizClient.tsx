"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ChevronRight, ChevronLeft, Trophy, RotateCcw, Loader2 } from "lucide-react";
import type { QuizQuestion } from "@/data/courses";

interface Props {
  courseSlug: string;
  quizId: string;
  questions: QuizQuestion[];
  isAr: boolean;
}

type QuizState = "idle" | "active" | "review" | "done";

export default function QuizClient({ courseSlug, quizId, questions, isAr }: Props) {
  const [state, setState] = useState<QuizState>("idle");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [direction, setDirection] = useState(1);

  const Next = isAr ? ChevronLeft : ChevronRight;
  const Prev = isAr ? ChevronRight : ChevronLeft;

  const q = questions[current];
  const userAnswer = answers[current];
  const isAnswered = userAnswer !== null;
  const isCorrect = userAnswer === q.correctIndex;
  const score = answers.filter((a, i) => a === questions[i].correctIndex).length;

  const selectAnswer = (idx: number) => {
    if (isAnswered) return;
    const next = [...answers];
    next[current] = idx;
    setAnswers(next);
    setShowExplanation(true);
  };

  const goNext = () => {
    if (current < questions.length - 1) {
      setDirection(1); setCurrent(c => c + 1); setShowExplanation(false);
    } else {
      handleSubmit();
    }
  };

  const goPrev = () => {
    if (current > 0) { setDirection(-1); setCurrent(c => c - 1); setShowExplanation(false); }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const finalAns = answers.filter((a, i) => a === questions[i].correctIndex).length;
    setFinalScore(finalAns);
    try {
      await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course_slug: courseSlug,
          quiz_id: quizId,
          score: finalAns,
          total: questions.length,
          answers: answers.map((a, i) => ({ question_id: questions[i].id, answer: a })),
        }),
      });
    } catch { /* save failed silently */ }
    setSubmitting(false);
    setState("done");
  };

  const reset = () => {
    setCurrent(0);
    setAnswers(Array(questions.length).fill(null));
    setShowExplanation(false);
    setFinalScore(0);
    setState("active");
  };

  const percent = Math.round((finalScore / questions.length) * 100);
  const passed = percent >= 70;

  // Idle
  if (state === "idle") {
    return (
      <div className="glass-card rounded-2xl p-6 flex flex-col items-center gap-4 text-center">
        <div className="text-4xl">🧠</div>
        <h3 className="font-display font-bold text-xl" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "اختبر معلوماتك" : "Test Your Knowledge"}
        </h3>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? `${questions.length} سؤال — الاجتياز: 70%` : `${questions.length} questions — Pass: 70%`}
        </p>
        <button onClick={() => setState("active")}
          className="px-6 py-2.5 rounded-xl font-medium text-sm transition-all hover:opacity-90"
          style={{ background: "var(--color-primary)", color: "var(--color-on-primary)" }}>
          {isAr ? "ابدأ الاختبار" : "Start Quiz"}
        </button>
      </div>
    );
  }

  // Done
  if (state === "done") {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-8 flex flex-col items-center gap-5 text-center">
        <div className="text-5xl">{passed ? "🏆" : "📚"}</div>
        <div>
          <p className="font-display font-bold text-3xl" style={{ color: passed ? "var(--color-tertiary)" : "var(--color-on-surface)" }}>
            {percent}%
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--color-on-surface-variant)" }}>
            {finalScore} / {questions.length} {isAr ? "إجابة صحيحة" : "correct"}
          </p>
        </div>
        <div className="w-full rounded-full h-3 overflow-hidden" style={{ background: "var(--color-surface-container)" }}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 1, delay: 0.3 }}
            className="h-full rounded-full"
            style={{ background: passed ? "var(--color-tertiary)" : "var(--color-primary)" }} />
        </div>
        <p className="font-semibold" style={{ color: passed ? "var(--color-tertiary)" : "var(--color-error)" }}>
          {passed
            ? (isAr ? "🎉 رائع! اجتزت الاختبار" : "🎉 Excellent! You passed")
            : (isAr ? "راجع الدرس وحاول مرة أخرى" : "Review the lesson and try again")}
        </p>
        <div className="flex gap-3">
          <button onClick={reset}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
            style={{ border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface-variant)" }}>
            <RotateCcw size={15} />
            {isAr ? "إعادة الاختبار" : "Retry"}
          </button>
          <button onClick={() => setState("review")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90"
            style={{ background: "var(--color-primary)", color: "var(--color-on-primary)" }}>
            {isAr ? "مراجعة الإجابات" : "Review Answers"}
          </button>
        </div>
      </motion.div>
    );
  }

  // Review mode
  if (state === "review") {
    return (
      <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
        <h3 className="font-semibold" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "مراجعة الإجابات" : "Review Answers"}
        </h3>
        {questions.map((qq, i) => {
          const ua = answers[i];
          const correct = ua === qq.correctIndex;
          return (
            <div key={qq.id} className="p-4 rounded-xl"
              style={{ background: correct ? "var(--color-tertiary)10" : "var(--color-error)10", border: `1px solid ${correct ? "var(--color-tertiary)" : "var(--color-error)"}30` }}>
              <p className="text-sm font-medium mb-2" style={{ color: "var(--color-on-surface)" }}>
                {i + 1}. {isAr ? qq.questionAr : qq.questionEn}
              </p>
              <div className="flex items-center gap-2 text-xs">
                {correct ? <CheckCircle2 size={14} style={{ color: "var(--color-tertiary)" }} /> : <XCircle size={14} style={{ color: "var(--color-error)" }} />}
                <span style={{ color: "var(--color-on-surface-variant)" }}>
                  {ua !== null ? (isAr ? qq.options[ua].ar : qq.options[ua].en) : (isAr ? "لم تُجب" : "Not answered")}
                </span>
              </div>
              {!correct && (
                <p className="text-xs mt-1.5" style={{ color: "var(--color-tertiary)" }}>
                  ✓ {isAr ? qq.options[qq.correctIndex].ar : qq.options[qq.correctIndex].en}
                </p>
              )}
            </div>
          );
        })}
        <button onClick={() => setState("done")}
          className="px-5 py-2 rounded-xl text-sm font-medium self-start transition-all hover:opacity-80"
          style={{ border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface-variant)" }}>
          {isAr ? "العودة للنتيجة" : "Back to Results"}
        </button>
      </div>
    );
  }

  // Active quiz
  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -50 : 50, opacity: 0 }),
  };

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between text-sm">
        <span className="font-mono" style={{ color: "var(--color-primary)" }}>
          {current + 1} / {questions.length}
        </span>
        <div className="flex-1 mx-4 rounded-full h-1.5 overflow-hidden" style={{ background: "var(--color-surface-container)" }}>
          <div className="h-full rounded-full transition-all duration-300"
            style={{ width: `${((current + 1) / questions.length) * 100}%`, background: "var(--color-primary)" }} />
        </div>
        <span className="font-mono text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
          {score} ✓
        </span>
      </div>

      {/* Question */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div key={current} custom={direction} variants={variants}
          initial="enter" animate="center" exit="exit"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="flex flex-col gap-4">
          <p className="font-semibold text-base leading-relaxed" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? q.questionAr : q.questionEn}
          </p>

          {/* Options */}
          <div className="flex flex-col gap-2">
            {q.options.map((opt, i) => {
              const selected = userAnswer === i;
              const correct = i === q.correctIndex;
              let bg = "var(--color-surface-container)";
              let border = "var(--color-outline-variant)";
              let color = "var(--color-on-surface)";
              if (isAnswered) {
                if (correct) { bg = "var(--color-tertiary)15"; border = "var(--color-tertiary)"; color = "var(--color-tertiary)"; }
                else if (selected) { bg = "var(--color-error)15"; border = "var(--color-error)"; color = "var(--color-error)"; }
              } else if (selected) {
                bg = "var(--color-primary)12"; border = "var(--color-primary)";
              }
              return (
                <button key={i} onClick={() => selectAnswer(i)} disabled={isAnswered}
                  className="flex items-center gap-3 p-3.5 rounded-xl text-start text-sm transition-all hover:opacity-90 disabled:cursor-default"
                  style={{ background: bg, border: `1px solid ${border}`, color }}>
                  <span className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                    style={{ background: `${border}20`, color: border }}>
                    {["A","B","C","D"][i]}
                  </span>
                  {isAr ? opt.ar : opt.en}
                  {isAnswered && correct && <CheckCircle2 size={16} className="ms-auto flex-shrink-0" style={{ color: "var(--color-tertiary)" }} />}
                  {isAnswered && selected && !correct && <XCircle size={16} className="ms-auto flex-shrink-0" style={{ color: "var(--color-error)" }} />}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                className="p-4 rounded-xl text-sm"
                style={{ background: isCorrect ? "var(--color-tertiary)08" : "var(--color-primary)08", border: `1px solid ${isCorrect ? "var(--color-tertiary)" : "var(--color-primary)"}20` }}>
                <p className="font-medium mb-1" style={{ color: isCorrect ? "var(--color-tertiary)" : "var(--color-primary)" }}>
                  {isCorrect ? (isAr ? "✓ إجابة صحيحة!" : "✓ Correct!") : (isAr ? "✗ إجابة خاطئة" : "✗ Incorrect")}
                </p>
                <p style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? q.explanationAr : q.explanationEn}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <div className="flex items-center justify-between pt-2">
        <button onClick={goPrev} disabled={current === 0}
          className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm transition-opacity hover:opacity-70 disabled:opacity-30"
          style={{ border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface-variant)" }}>
          <Prev size={15} />
          {isAr ? "السابق" : "Prev"}
        </button>
        {isAnswered && (
          <button onClick={goNext}
            className="flex items-center gap-1 px-5 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-90"
            style={{ background: "var(--color-primary)", color: "var(--color-on-primary)" }}>
            {submitting ? <Loader2 size={15} className="animate-spin" />
              : current === questions.length - 1 ? (isAr ? "إنهاء الاختبار" : "Finish Quiz")
              : (isAr ? "التالي" : "Next")}
            {!submitting && <Next size={15} />}
          </button>
        )}
      </div>
    </div>
  );
}
