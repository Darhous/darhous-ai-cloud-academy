"use client";

import Link from "next/link";
import { Database, ExternalLink } from "lucide-react";
import { examSubjects } from "@/data/digital-exam-subjects";

interface Props {
  isAr: boolean;
  locale: string;
}

export function AdminDigitalExamsPanel({ isAr, locale }: Props) {
  const totalQ = examSubjects.reduce((s, sub) => s + sub.questions.length, 0);
  const tfCount = examSubjects.reduce((s, sub) => s + sub.questions.filter((q) => q.type === "truefalse").length, 0);
  const mcqCount = totalQ - tfCount;

  const PORTAL_LINKS = [
    { href: `/${locale}/digital-exams`, label: isAr ? "بوابة الاختبارات" : "Exams Portal", color: "#3ce0fb" },
    { href: `/${locale}/digital-exams/mixed`, label: isAr ? "الامتحان المجمع" : "Mixed Exam", color: "#f59e0b" },
    { href: `/${locale}/digital-exams/library`, label: isAr ? "المكتبة الرقمية" : "Digital Library", color: "#4ade80" },
    { href: `/${locale}/digital-exams/history`, label: isAr ? "سجل الأداء" : "Performance History", color: "#8ed5ff" },
  ];

  const FEATURES = [
    isAr ? "✅ أسئلة عشوائية من بنك 902+ سؤال" : "✅ Random questions from 902+ bank",
    isAr ? "✅ دعم أسئلة صح/خطأ واختيار متعدد" : "✅ True/False + MCQ support",
    isAr ? "✅ Anti-cheat: 3 تحذيرات → إنهاء تلقائي" : "✅ Anti-cheat: 3 warnings → auto-terminate",
    isAr ? "✅ شهادة PDF عند 80%+" : "✅ PDF Certificate at 80%+",
    isAr ? "✅ شرح الإجابات بالذكاء الاصطناعي" : "✅ AI-powered answer explanations",
    isAr ? "✅ امتحان مجمع من كل المواد" : "✅ Mixed exam from all subjects",
    isAr ? "✅ سجل أداء مع رسوم بيانية" : "✅ Performance history with charts",
    isAr ? "✅ مكتبة رقمية للكتب والمذكرات" : "✅ Digital library for books & notes",
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: isAr ? "المواد" : "Subjects", value: examSubjects.length, color: "#3ce0fb" },
          { label: isAr ? "إجمالي الأسئلة" : "Total Questions", value: totalQ, color: "#4ade80" },
          { label: isAr ? "اختيار من متعدد" : "MCQ", value: mcqCount, color: "#f59e0b" },
          { label: isAr ? "صح / خطأ" : "True / False", value: tfCount, color: "#8ed5ff" },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-2xl p-5 flex flex-col gap-1" style={{ border: `1px solid ${s.color}20` }}>
            <p className="font-mono font-bold text-2xl" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Per-subject breakdown */}
      <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(60,224,251,0.1)" }}>
        <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "#3ce0fb" }}>
          <Database size={14} />{isAr ? "بنك الأسئلة حسب المادة" : "Question Bank by Subject"}
        </h3>
        <div className="flex flex-col gap-2">
          {examSubjects.map((s) => {
            const tf = s.questions.filter((q) => q.type === "truefalse").length;
            const mcq = s.questions.length - tf;
            const pct = (s.questions.length / totalQ) * 100;
            return (
              <div key={s.id} className="flex items-center gap-3 text-sm">
                <span className="flex-shrink-0" style={{ fontSize: "16px" }}>{s.icon}</span>
                <span className="w-36 flex-shrink-0 text-xs font-mono truncate" style={{ color: s.color }}>
                  {isAr ? s.labelAr : s.label}
                </span>
                <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: s.color }} />
                </div>
                <span className="font-mono text-xs w-8 text-end flex-shrink-0" style={{ color: "var(--color-on-surface)" }}>{s.questions.length}</span>
                <span className="text-[10px] flex-shrink-0" style={{ color: "var(--color-on-surface-variant)" }}>
                  ({mcq} MCQ / {tf} T/F)
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features */}
      <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(74,222,128,0.1)" }}>
        <h3 className="font-bold text-sm mb-3" style={{ color: "#4ade80" }}>
          {isAr ? "ميزات الاختبارات الرقمية" : "Digital Exams Features"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {FEATURES.map((f, i) => (
            <p key={i} className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{f}</p>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-3">
        {PORTAL_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ background: `${l.color}10`, color: l.color, border: `1px solid ${l.color}25` }}
          >
            <ExternalLink size={13} />{l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
