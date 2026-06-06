"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, Loader2, CheckCircle2, TrendingUp, Star } from "lucide-react";
import type { InterviewEvaluation } from "@/types/career";

const QUESTIONS = [
  {
    category: "أسئلة سلوكية (Behavioral)",
    color: "#d0bcff",
    items: [
      { q: "حدثني عن وقت واجهت فيه مشكلة تقنية معقدة وكيف قمت بحلها؟", hint: "استخدم أسلوب STAR. ركز على دورك الفعلي في الحل والنتائج القابلة للقياس." },
      { q: "كيف تتعامل مع اختلاف الآراء التقنية مع زملائك؟", hint: "يبحثون عن احترافيتك وتواصلك الفعال واستخدام البيانات بدلاً من العواطف." },
      { q: "صف موقفاً أكملت فيه مشروعاً في ظروف صعبة أو ضيق وقت.", hint: "ابرز قدرتك على ترتيب الأولويات وإدارة الضغط وتحقيق النتائج." },
    ],
  },
  {
    category: "أسئلة تقنية (Frontend - React/TypeScript)",
    color: "#8ed5ff",
    items: [
      { q: "ما الفرق بين Virtual DOM و Real DOM؟ وكيف تحسّن React الأداء؟", hint: "اذكر عملية الـ Reconciliation وخوارزمية Diffing وBatching." },
      { q: "متى تستخدم useCallback و useMemo؟ وما الفرق بينهما؟", hint: "وضّح مشكلة re-rendering الزائد وكيف يحلها كل hook، مع أمثلة." },
      { q: "ما الفرق بين Server Components و Client Components في Next.js؟", hint: "ناقش التقسيم في الشبكة، إمكانية الوصول للـ filesystem والـ DB، والبيانات الحساسة." },
    ],
  },
  {
    category: "أسئلة الذكاء الاصطناعي والأتمتة",
    color: "#4ade80",
    items: [
      { q: "كيف ستدمج نموذج LLM في منتج B2B مع ضمان الجودة والأمان؟", hint: "تناول: prompt engineering، التحقق من المخرجات، RAG، وحدود الاستخدام." },
      { q: "ما الفرق بين Fine-tuning و RAG؟ ومتى تختار كلاً منهما؟", hint: "Fine-tuning لتخصيص السلوك، RAG للمعرفة المتجددة - مع مقارنة التكلفة والوقت." },
    ],
  },
];

export default function InterviewPrepClient() {
  const [tab, setTab] = useState<"questions" | "star">("questions");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [star, setStar] = useState({ situation: "", task: "", action: "", result: "" });
  const [isEval, setIsEval] = useState(false);
  const [evalResult, setEvalResult] = useState<InterviewEvaluation | null>(null);

  const handleEvaluate = async () => {
    if (!star.situation || !star.task || !star.action || !star.result) {
      alert("الرجاء تعبئة جميع حقول STAR.");
      return;
    }
    setIsEval(true);
    setEvalResult(null);
    try {
      const res = await fetch("/api/career/evaluate-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(star),
      });
      const data = await res.json();
      if (res.ok) setEvalResult(data);
      else alert("حدث خطأ: " + (data.error || ""));
    } catch {
      alert("خطأ في الاتصال بالخادم.");
    } finally {
      setIsEval(false);
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid var(--color-outline-variant)",
    color: "var(--color-on-surface)",
    borderRadius: "0.75rem",
    padding: "0.75rem 1rem",
    width: "100%",
    fontSize: "0.875rem",
    resize: "none" as const,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Tabs */}
      <div className="flex gap-2 p-1 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-outline-variant)", width: "fit-content" }}>
        {(["questions", "star"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-5 py-2 rounded-xl text-sm font-medium transition-all"
            style={tab === t
              ? { background: "var(--portal-color-subtle)", color: "var(--portal-color)", border: "1px solid var(--portal-color-glow)" }
              : { color: "var(--color-on-surface-variant)", border: "1px solid transparent" }}
          >
            {t === "questions" ? "بنك الأسئلة" : "مقيّم STAR الذكي"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === "questions" && (
          <motion.div key="q" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            {QUESTIONS.map((cat) => (
              <div key={cat.category} className="glass-card rounded-2xl overflow-hidden" style={{ border: `1px solid ${cat.color}15` }}>
                <div className="p-4 font-semibold text-sm" style={{ background: `${cat.color}08`, borderBottom: "1px solid var(--color-outline-variant)", color: cat.color }}>
                  {cat.category}
                </div>
                {cat.items.map((item, i) => {
                  const key = `${cat.category}-${i}`;
                  const open = expanded === key;
                  return (
                    <div key={i} style={{ borderBottom: i < cat.items.length - 1 ? "1px solid var(--color-outline-variant)" : undefined }}>
                      <button
                        className="w-full text-right flex items-start justify-between gap-4 p-4 hover:opacity-80 transition-opacity"
                        onClick={() => setExpanded(open ? null : key)}
                      >
                        <span className="text-sm font-medium text-start flex-1" style={{ color: "var(--color-on-surface)" }}>{item.q}</span>
                        <ChevronDown size={16} className={`shrink-0 mt-0.5 transition-transform ${open ? "rotate-180" : ""}`} style={{ color: "var(--color-on-surface-variant)" }} />
                      </button>
                      <AnimatePresence>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4">
                              <div className="rounded-xl p-4 text-sm" style={{ background: `${cat.color}08`, border: `1px solid ${cat.color}15` }}>
                                <span className="font-semibold block mb-1 text-xs" style={{ color: cat.color }}>💡 نصيحة:</span>
                                <p style={{ color: "var(--color-on-surface-variant)" }}>{item.hint}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            ))}
          </motion.div>
        )}

        {tab === "star" && (
          <motion.div key="star" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid var(--portal-color-border)" }}>
              <h3 className="font-semibold mb-2" style={{ color: "var(--color-on-surface)" }}>أسلوب STAR للإجابات السلوكية</h3>
              <p className="text-sm mb-6" style={{ color: "var(--color-on-surface-variant)" }}>
                اكتب إجابتك على إحدى الأسئلة السلوكية باستخدام هيكل STAR، وسيقيّم الذكاء الاصطناعي جودتها ويقترح نسخة محسّنة.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                {[
                  { key: "situation", labelAr: "الموقف (Situation)", placeholder: "اشرح السياق والظروف..." },
                  { key: "task", labelAr: "المهمة (Task)", placeholder: "ما كانت مسؤوليتك..." },
                  { key: "action", labelAr: "الإجراء (Action)", placeholder: "ما الخطوات التي اتخذتها..." },
                  { key: "result", labelAr: "النتيجة (Result)", placeholder: "ما النتائج المحققة..." },
                ].map(({ key, labelAr, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold mb-2" style={{ color: "var(--color-on-surface-variant)" }}>{labelAr}</label>
                    <textarea
                      rows={4}
                      style={inputStyle}
                      placeholder={placeholder}
                      value={star[key as keyof typeof star]}
                      onChange={(e) => setStar((s) => ({ ...s, [key]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={handleEvaluate}
                disabled={isEval}
                className="flex items-center gap-3 px-8 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-40"
                style={{ background: "var(--portal-color-subtle)", color: "var(--portal-color)", border: "1px solid var(--portal-color-glow)" }}
              >
                {isEval ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                {isEval ? "جاري التقييم..." : "قيّم إجابتي بالذكاء الاصطناعي"}
              </button>
            </div>

            <AnimatePresence>
              {evalResult && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  {/* Score */}
                  <div className="glass-card rounded-2xl p-6 text-center" style={{ border: "1px solid var(--portal-color-border)" }}>
                    <div className="text-4xl font-bold font-mono mb-2" style={{ color: evalResult.score >= 80 ? "#4ade80" : evalResult.score >= 60 ? "#f59e0b" : "#f87171" }}>
                      {evalResult.score}/100
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{evalResult.feedback}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(74,222,128,0.15)" }}>
                      <h4 className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: "#4ade80" }}>
                        <CheckCircle2 size={15} /> نقاط القوة
                      </h4>
                      <ul className="space-y-2">
                        {evalResult.strengths.map((s, i) => (
                          <li key={i} className="text-xs flex gap-2" style={{ color: "var(--color-on-surface-variant)" }}>
                            <Star size={11} className="shrink-0 mt-0.5" style={{ color: "#4ade80" }} />{s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(248,113,113,0.15)" }}>
                      <h4 className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: "#f87171" }}>
                        <TrendingUp size={15} /> نقاط للتحسين
                      </h4>
                      <ul className="space-y-2">
                        {evalResult.improvements.map((s, i) => (
                          <li key={i} className="text-xs flex gap-2" style={{ color: "var(--color-on-surface-variant)" }}>
                            <span style={{ color: "#f87171" }}>→</span>{s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {evalResult.improved_answer && (
                    <div className="glass-card rounded-2xl p-6" style={{ border: "1px solid rgba(208,188,255,0.2)" }}>
                      <h4 className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: "#d0bcff" }}>
                        <Sparkles size={15} /> الإجابة المحسّنة بالذكاء الاصطناعي
                      </h4>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{evalResult.improved_answer}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
