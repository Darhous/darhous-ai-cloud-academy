"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react";
import type { Exam } from "@/data/iot/exams";

interface Props { exams: Exam[] }

export default function IotExamsClient({ exams }: Props) {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const reset = () => { setSelectedExam(null); setAnswers({}); setSubmitted(false); };
  const startExam = (exam: Exam) => { setSelectedExam(exam); setAnswers({}); setSubmitted(false); };

  const score = submitted && selectedExam
    ? selectedExam.questions.filter((q, i) => answers[i] === q.correctAnswerIndex).length
    : 0;

  if (!selectedExam) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {exams.map((exam) => (
          <button
            key={exam.id}
            onClick={() => startExam(exam)}
            className="glass-card rounded-2xl p-6 text-right flex flex-col gap-3 transition-all hover:-translate-y-0.5 hover:scale-[1.01]"
            style={{ border: "1px solid rgba(249,115,22,0.15)" }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)" }}>
              <Trophy size={18} style={{ color: "#f97316" }} />
            </div>
            <h3 className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>{exam.title}</h3>
            <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{exam.description}</p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{exam.questions.length} سؤال</span>
              <span className="text-xs font-mono" style={{ color: "#f97316" }}>ابدأ ←</span>
            </div>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-bold text-xl" style={{ color: "var(--color-on-surface)" }}>{selectedExam.title}</h2>
          <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{selectedExam.questions.length} سؤال</p>
        </div>
        <button onClick={reset} className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)", border: "1px solid var(--color-outline-variant)" }}>
          <RotateCcw size={14} />العودة
        </button>
      </div>

      {!submitted ? (
        <>
          <div className="space-y-6 mb-8">
            {selectedExam.questions.map((q, qIdx) => (
              <div key={qIdx} className="glass-card rounded-2xl p-6" style={{ border: "1px solid rgba(249,115,22,0.1)" }}>
                <p className="font-medium text-sm mb-4" style={{ color: "var(--color-on-surface)" }}>
                  <span className="font-mono" style={{ color: "#f97316" }}>{qIdx + 1}. </span>{q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => setAnswers((a) => ({ ...a, [qIdx]: oIdx }))}
                      className="w-full text-right px-4 py-3 rounded-xl text-sm transition-all"
                      style={answers[qIdx] === oIdx
                        ? { background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.4)", color: "#f97316" }
                        : { background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface-variant)" }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(answers).length < selectedExam.questions.length}
            className="w-full py-4 rounded-2xl font-bold text-sm transition-all disabled:opacity-40"
            style={{ background: "linear-gradient(135deg, #f97316, #fb923c)", color: "#0c0e12" }}
          >
            تسليم الإجابات ({Object.keys(answers).length}/{selectedExam.questions.length})
          </button>
        </>
      ) : (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Score */}
            <div className="glass-card rounded-3xl p-8 text-center" style={{ border: "1px solid rgba(249,115,22,0.2)" }}>
              <div className="text-5xl font-bold font-mono mb-2" style={{ color: score >= selectedExam.questions.length * 0.8 ? "#4ade80" : score >= selectedExam.questions.length * 0.6 ? "#f59e0b" : "#f87171" }}>
                {score}/{selectedExam.questions.length}
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--color-on-surface-variant)" }}>
                {score >= selectedExam.questions.length * 0.8 ? "ممتاز! أداء رائع 🎉" : score >= selectedExam.questions.length * 0.6 ? "جيد! راجع الأسئلة الخاطئة." : "راجع الدروس وأعد المحاولة."}
              </p>
              <button onClick={reset} className="px-6 py-2.5 rounded-xl text-sm font-medium" style={{ background: "rgba(249,115,22,0.15)", color: "#f97316", border: "1px solid rgba(249,115,22,0.3)" }}>
                العودة لقائمة الاختبارات
              </button>
            </div>

            {/* Answers review */}
            <div className="space-y-4">
              {selectedExam.questions.map((q, qIdx) => {
                const isCorrect = answers[qIdx] === q.correctAnswerIndex;
                return (
                  <div key={qIdx} className="glass-card rounded-2xl p-5" style={{ border: `1px solid ${isCorrect ? "rgba(74,222,128,0.2)" : "rgba(248,113,113,0.2)"}` }}>
                    <div className="flex items-start gap-3 mb-3">
                      {isCorrect ? <CheckCircle2 size={16} style={{ color: "#4ade80" }} className="shrink-0 mt-0.5" /> : <XCircle size={16} style={{ color: "#f87171" }} className="shrink-0 mt-0.5" />}
                      <p className="text-sm font-medium" style={{ color: "var(--color-on-surface)" }}>{q.question}</p>
                    </div>
                    {!isCorrect && (
                      <p className="text-xs mb-2 mr-7" style={{ color: "#f87171" }}>
                        إجابتك: {q.options[answers[qIdx]] ?? "—"} | الصحيح: {q.options[q.correctAnswerIndex]}
                      </p>
                    )}
                    <p className="text-xs mr-7 leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{q.explanation}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
