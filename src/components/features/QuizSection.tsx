"use client";

import { useState, useEffect } from "react";
import type { QuizQuestion } from "@/data/courses";
import { CheckCircle2, XCircle, RefreshCw } from "lucide-react";

interface QuizSectionProps {
  quiz: QuizQuestion[];
  locale: string;
  courseId: string;
}

export default function QuizSection({ quiz, locale, courseId }: QuizSectionProps) {
  const isAr = locale === "ar";
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [submitted, setSubmitted] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const storageKey = `quiz_${courseId}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setBestScore(Number(saved));
    } catch {}
  }, [storageKey]);

  function selectAnswer(qId: string, idx: number) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: idx }));
  }

  function submit() {
    if (Object.keys(answers).length < quiz.length) return;
    setSubmitted(true);
    const correct = quiz.filter((q) => answers[q.id] === q.correctIndex).length;
    const score = Math.round((correct / quiz.length) * 100);
    try {
      const prev = localStorage.getItem(storageKey);
      if (!prev || score > Number(prev)) {
        localStorage.setItem(storageKey, String(score));
        setBestScore(score);
      }
    } catch {}
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  const correctCount = submitted ? quiz.filter((q) => answers[q.id] === q.correctIndex).length : 0;
  const score = submitted ? Math.round((correctCount / quiz.length) * 100) : 0;

  return (
    <div
      className="glass-card rounded-2xl p-6 flex flex-col gap-6"
      style={{ border: "1px solid rgba(142,213,255,0.1)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-xl" style={{ color: "var(--color-on-surface)" }}>
          ✅ {isAr ? "اختبر معلوماتك" : "Test Your Knowledge"}
        </h2>
        {bestScore !== null && (
          <span className="text-xs font-mono px-2.5 py-1 rounded-full" style={{ background: "rgba(60,224,251,0.1)", color: "var(--color-tertiary)", border: "1px solid rgba(60,224,251,0.2)" }}>
            {isAr ? `أفضل نتيجة: ${bestScore}%` : `Best: ${bestScore}%`}
          </span>
        )}
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {quiz.map((q, qi) => {
          const chosen = answers[q.id] ?? null;
          const isCorrect = submitted && chosen === q.correctIndex;
          const isWrong = submitted && chosen !== null && chosen !== q.correctIndex;

          return (
            <div key={q.id} className="flex flex-col gap-3">
              <p className="font-semibold text-base" style={{ color: "var(--color-on-surface)" }}>
                <span className="font-mono text-sm me-2" style={{ color: "var(--color-outline)" }}>
                  Q{qi + 1}.
                </span>
                {isAr ? q.questionAr : q.questionEn}
              </p>
              <div className="space-y-2">
                {(isAr ? q.options.map((o) => o.ar) : q.options.map((o) => o.en)).map((opt, oi) => {
                  const isChosen = chosen === oi;
                  const showCorrect = submitted && oi === q.correctIndex;
                  const showWrong = submitted && isChosen && oi !== q.correctIndex;

                  return (
                    <button
                      key={oi}
                      onClick={() => selectAnswer(q.id, oi)}
                      disabled={submitted}
                      className="w-full text-start px-4 py-3 rounded-xl text-sm transition-all duration-200 border flex items-center gap-3"
                      style={{
                        background: showCorrect
                          ? "rgba(60,224,251,0.1)"
                          : showWrong
                          ? "rgba(239,68,68,0.1)"
                          : isChosen
                          ? "rgba(142,213,255,0.1)"
                          : "var(--color-surface-container)",
                        borderColor: showCorrect
                          ? "rgba(60,224,251,0.4)"
                          : showWrong
                          ? "rgba(239,68,68,0.4)"
                          : isChosen
                          ? "rgba(142,213,255,0.3)"
                          : "var(--color-outline-variant)",
                        color: showCorrect
                          ? "var(--color-tertiary)"
                          : showWrong
                          ? "#f87171"
                          : "var(--color-on-surface)",
                        cursor: submitted ? "default" : "pointer",
                      }}
                    >
                      {showCorrect && <CheckCircle2 size={15} style={{ flexShrink: 0 }} />}
                      {showWrong && <XCircle size={15} style={{ flexShrink: 0 }} />}
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {submitted && (
                <div
                  className="p-3 rounded-xl text-sm"
                  style={{
                    background: isCorrect ? "rgba(60,224,251,0.06)" : "rgba(239,68,68,0.06)",
                    borderLeft: `2px solid ${isCorrect ? "var(--color-tertiary)" : "#f87171"}`,
                    color: "var(--color-on-surface-variant)",
                  }}
                >
                  💡 {isAr ? q.explanationAr : q.explanationEn}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Result */}
      {submitted && (
        <div
          className="p-4 rounded-xl text-center"
          style={{
            background: score >= 70 ? "rgba(60,224,251,0.08)" : "rgba(239,68,68,0.08)",
            border: `1px solid ${score >= 70 ? "rgba(60,224,251,0.2)" : "rgba(239,68,68,0.2)"}`,
          }}
        >
          <p className="font-display font-bold text-3xl mb-1" style={{ color: score >= 70 ? "var(--color-tertiary)" : "#f87171" }}>
            {score}%
          </p>
          <p className="text-sm font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
            {correctCount}/{quiz.length} {isAr ? "إجابة صحيحة" : "correct answers"}
          </p>
          <p className="text-sm mt-1" style={{ color: score >= 70 ? "var(--color-tertiary)" : "#f87171" }}>
            {score >= 70
              ? isAr ? "أحسنت! فهمك ممتاز." : "Great job! Excellent understanding."
              : isAr ? "راجع المحتوى وأعد المحاولة." : "Review the content and try again."}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {!submitted ? (
          <button
            onClick={submit}
            disabled={Object.keys(answers).length < quiz.length}
            className="glow-button-primary text-white font-mono text-sm px-6 py-2.5 rounded-xl flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isAr ? `إرسال (${Object.keys(answers).length}/${quiz.length})` : `Submit (${Object.keys(answers).length}/${quiz.length})`}
          </button>
        ) : (
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 font-mono text-sm px-6 py-2.5 rounded-xl flex-1 transition-all hover:opacity-80"
            style={{ background: "var(--color-surface-container-high)", color: "var(--color-on-surface)" }}
          >
            <RefreshCw size={14} />
            {isAr ? "إعادة المحاولة" : "Try Again"}
          </button>
        )}
      </div>
    </div>
  );
}
