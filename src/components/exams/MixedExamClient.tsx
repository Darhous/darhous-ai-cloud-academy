"use client";

import { useState } from "react";
import { examSubjects } from "@/data/digital-exam-subjects";
import DigitalExamClient from "./DigitalExamClient";
import Link from "next/link";
import { Shuffle, ChevronRight, ChevronLeft, Trophy } from "lucide-react";
import type { ExamSubject, ExamQuestion } from "@/data/digital-exam-subjects";

/** Build a synthetic "mixed" subject from all subjects */
function buildMixedSubject(questionCount: number): ExamSubject {
  const allQuestions: ExamQuestion[] = [];
  // Pick equally from each subject
  const perSubject = Math.ceil(questionCount / examSubjects.length);
  examSubjects.forEach((s) => {
    const pool = [...s.questions].sort(() => Math.random() - 0.5).slice(0, perSubject);
    allQuestions.push(...pool);
  });

  // Re-shuffle and limit
  const final = allQuestions.sort(() => Math.random() - 0.5).slice(0, questionCount);

  return {
    id: "mixed",
    label: "Mixed Comprehensive Exam",
    labelAr: "الامتحان المجمع الشامل",
    icon: "🏆",
    color: "#f59e0b",
    description: `${questionCount} questions from all ${examSubjects.length} subjects`,
    descriptionAr: `${questionCount} سؤال من كل ${examSubjects.length} مادة`,
    questions: final,
  };
}

const COUNTS = [20, 30, 50, 100] as const;
type Count = typeof COUNTS[number];

export default function MixedExamClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ChevronLeft : ChevronRight;

  const [started, setStarted] = useState(false);
  const [count, setCount] = useState<Count>(30);
  const [mixedSubject, setMixedSubject] = useState<ExamSubject | null>(null);

  function handleStart() {
    setMixedSubject(buildMixedSubject(count));
    setStarted(true);
  }

  if (started && mixedSubject) {
    return <DigitalExamClient subject={mixedSubject} locale={locale} />;
  }

  return (
    <div className="container-xl py-16 flex flex-col items-center gap-10 max-w-xl mx-auto text-center">
      <div style={{ fontSize: "64px" }}>🏆</div>
      <h1 className="font-display font-bold text-4xl" style={{ color: "var(--color-on-surface)" }}>
        {isAr ? "الامتحان المجمع الشامل" : "Mixed Comprehensive Exam"}
      </h1>
      <p className="text-lg" style={{ color: "var(--color-on-surface-variant)" }}>
        {isAr
          ? `أسئلة عشوائية من كل ${examSubjects.length} مواد — أثبت مهاراتك الكاملة في التحول الرقمي`
          : `Random questions from all ${examSubjects.length} subjects — prove your full digital transformation skills`}
      </p>

      {/* Subject coverage */}
      <div className="flex flex-wrap gap-2 justify-center">
        {examSubjects.map((s) => (
          <span
            key={s.id}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: `${s.color}12`, border: `1px solid ${s.color}25`, color: s.color }}
          >
            {s.icon} {isAr ? s.labelAr : s.label}
          </span>
        ))}
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-2 gap-4 w-full text-start">
        {[
          { icon: "🎯", arLabel: "80%+ للنجاح والشهادة", enLabel: "80%+ to pass and get certificate" },
          { icon: "⏱️", arLabel: "60 ثانية لكل سؤال", enLabel: "60 seconds per question" },
          { icon: "🔀", arLabel: "أسئلة عشوائية من كل مادة", enLabel: "Random questions from each subject" },
          { icon: "🛡️", arLabel: "مراقبة الغش مفعّلة", enLabel: "Anti-cheat monitoring active" },
        ].map((item, i) => (
          <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-3" style={{ border: "1px solid rgba(245,158,11,0.15)" }}>
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
          {COUNTS.map((c) => (
            <button
              key={c}
              onClick={() => setCount(c)}
              className="px-6 py-2.5 rounded-xl font-mono font-bold text-sm transition-all"
              style={{
                background: count === c ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.03)",
                border: `1.5px solid ${count === c ? "#f59e0b" : "rgba(255,255,255,0.1)"}`,
                color: count === c ? "#f59e0b" : "var(--color-on-surface-variant)",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleStart}
        className="glow-button-primary text-white font-bold font-mono px-12 py-4 rounded-2xl text-lg flex items-center gap-3"
        style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.7), rgba(245,158,11,0.35))" }}
      >
        <Shuffle size={18} />
        {isAr ? `ابدأ الامتحان المجمع (${count} سؤال) ←` : `Start Mixed Exam (${count} questions) →`}
      </button>

      <div className="flex gap-6">
        <Link href={`/${locale}/digital-exams`} className="text-sm flex items-center gap-1" style={{ color: "var(--color-on-surface-variant)" }}>
          <Arrow size={14} style={{ transform: isAr ? "rotate(180deg)" : "none" }} />
          {isAr ? "اختبارات المواد" : "Subject Exams"}
        </Link>
        <Link href={`/${locale}/digital-exams/history`} className="text-sm flex items-center gap-1" style={{ color: "var(--color-on-surface-variant)" }}>
          <Trophy size={14} />
          {isAr ? "سجل أدائي" : "My History"}
        </Link>
      </div>
    </div>
  );
}
