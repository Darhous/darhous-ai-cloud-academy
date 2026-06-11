"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Building, MapPin, Search, Star, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import type { JobTarget } from "@/types/career";

const MOCK_JOBS: JobTarget[] = [
  {
    id: "1",
    title: "Senior Product Designer",
    company: "TechNova Solutions",
    location: "الرياض (هجين)",
    type: "دوام كامل",
    matchScore: 92,
    salary: "25,000 - 32,000 ريال",
    description: "نبحث عن مصمم منتجات مبدع بخبرة لا تقل عن 5 سنوات في واجهات الاستخدام وبناء تجارب مستخدم لمنتجات SaaS.",
    missingSkills: ["Framer", "Design Systems Architecture"],
    matchReasons: ["خبرة سابقة في مجال التقنية المالية FinTech", "إتقان Figma بدرجة احترافية"],
    cvSuggestions: ["أضف مشروع نظام التصميم الأخير إلى المقدمة", "استخدم الكلمات المفتاحية: SaaS, B2B"],
  },
  {
    id: "2",
    title: "Frontend Developer (React)",
    company: "البنك الرقمي المستقبلي",
    location: "دبي (عن بعد)",
    type: "دوام كامل",
    matchScore: 85,
    salary: "$4,500 - $6,500",
    description: "انضم لفريقنا في بناء واجهات تطبيقات بنكية حديثة باستخدام React, TypeScript و Tailwind CSS.",
    missingSkills: ["Web3.js", "Jest Testing"],
    matchReasons: ["تطابق ممتاز في تقنيات React و TypeScript", "خبرة في التطبيقات عالية الأداء"],
    cvSuggestions: ["أبرز خبرتك في بناء SPAs سريعة الاستجابة", "أضف تفاصيل عن تقليل Bundle Size"],
  },
  {
    id: "3",
    title: "UX Researcher",
    company: "Global E-Com MENA",
    location: "القاهرة (مكتبي)",
    type: "عقد",
    matchScore: 78,
    salary: "40,000 - 60,000 جنيه",
    description: "إجراء مقابلات واختبارات سهولة الاستخدام مع مستخدمين في منطقة الشرق الأوسط وشمال أفريقيا.",
    missingSkills: ["SPSS", "Quantitative Analysis"],
    matchReasons: ["خبرة عملية في أبحاث المستخدمين للسوق الخليجي"],
    cvSuggestions: ["ركز على مقاييس قابلية الاستخدام التي حسنتها"],
  },
  {
    id: "4",
    title: "AI Product Manager",
    company: "NexaLearn",
    location: "عن بعد (عالمي)",
    type: "دوام كامل",
    matchScore: 70,
    salary: "$5,000 - $8,000",
    description: "قيادة تطوير منتجات الذكاء الاصطناعي وترجمة احتياجات الأعمال إلى متطلبات تقنية واضحة.",
    missingSkills: ["SQL", "Machine Learning Fundamentals"],
    matchReasons: ["خبرة في إدارة المنتجات الرقمية"],
    cvSuggestions: ["أضف مشاريع AI أو Automation أطلقتها", "ابرز أثر منتجاتك بالأرقام"],
  },
  {
    id: "5",
    title: "Full Stack Developer",
    company: "StartupX Arabia",
    location: "الرياض (هجين)",
    type: "دوام كامل",
    matchScore: 65,
    salary: "15,000 - 22,000 ريال",
    description: "تطوير تطبيقات ويب متكاملة باستخدام Next.js وNode.js لمنتج SaaS ناشئ في مجال التعليم.",
    missingSkills: ["PostgreSQL", "Docker", "Redis"],
    matchReasons: ["خبرة في React و Node.js"],
    cvSuggestions: ["أضف مشاريع full-stack قمت ببنائها", "ابرز خبرتك في TypeScript"],
  },
];

const scoreColor = (s: number) => s >= 85 ? "#4ade80" : s >= 70 ? "#f59e0b" : "#8ed5ff";

export default function JobsClient() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<JobTarget | null>(null);

  const filtered = MOCK_JOBS.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--color-on-surface-variant)" }} />
        <input
          type="text"
          placeholder="ابحث عن مسمى وظيفي أو شركة..."
          className="w-full rounded-2xl pr-12 pl-4 py-3 text-sm focus:outline-none"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Job list */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-center py-12 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>لا توجد نتائج مطابقة</p>
          ) : (
            filtered.map((job) => (
              <motion.div
                key={job.id}
                layout
                onClick={() => setSelected(selected?.id === job.id ? null : job)}
                className="glass-card rounded-2xl p-5 cursor-pointer transition-all"
                style={{ border: selected?.id === job.id ? `1px solid var(--portal-color-glow)` : "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--color-on-surface)" }}>{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                      <span className="flex items-center gap-1"><Building size={12} />{job.company}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                      {job.salary && <span className="flex items-center gap-1"><TrendingUp size={12} />{job.salary}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <div className="text-xl font-bold font-mono" style={{ color: scoreColor(job.matchScore) }}>{job.matchScore}%</div>
                    <div className="text-[9px] font-mono" style={{ color: "var(--color-on-surface-variant)" }}>تطابق</div>
                  </div>
                </div>

                <AnimatePresence>
                  {selected?.id === job.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 space-y-4" style={{ borderTop: "1px solid var(--color-outline-variant)" }}>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{job.description}</p>

                        {job.matchReasons && job.matchReasons.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold mb-2 flex items-center gap-1" style={{ color: "#4ade80" }}>
                              <Star size={11} /> أسباب التطابق
                            </p>
                            {job.matchReasons.map((r, i) => (
                              <p key={i} className="text-xs mb-1 flex gap-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
                                <span style={{ color: "#4ade80" }}>✓</span>{r}
                              </p>
                            ))}
                          </div>
                        )}

                        {job.missingSkills && job.missingSkills.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold mb-2" style={{ color: "#f87171" }}>المهارات الناقصة</p>
                            <div className="flex flex-wrap gap-1.5">
                              {job.missingSkills.map((sk, i) => (
                                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(248,113,113,0.1)", color: "#f87171", border: "1px solid rgba(248,113,113,0.2)" }}>{sk}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {job.cvSuggestions && job.cvSuggestions.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold mb-2 flex items-center gap-1" style={{ color: "var(--portal-color)" }}>
                              <Briefcase size={11} /> اقتراحات لتحسين سيرتك
                            </p>
                            {job.cvSuggestions.map((s, i) => (
                              <p key={i} className="text-xs mb-1 flex gap-1.5" style={{ color: "var(--color-on-surface-variant)" }}>
                                <span style={{ color: "var(--portal-color)" }}>•</span>{s}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-3 flex justify-end">
                  {selected?.id === job.id
                    ? <ChevronUp size={14} style={{ color: "var(--color-on-surface-variant)" }} />
                    : <ChevronDown size={14} style={{ color: "var(--color-on-surface-variant)" }} />}
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Summary panel */}
        <div className="hidden lg:block">
          <div className="glass-card rounded-2xl p-6 sticky top-24" style={{ border: "1px solid var(--portal-color-border)" }}>
            <h3 className="font-semibold text-sm mb-4" style={{ color: "var(--color-on-surface)" }}>
              {selected ? selected.title : "اختر وظيفة لعرض التفاصيل"}
            </h3>
            {selected ? (
              <div className="space-y-4">
                <div className="text-center py-4">
                  <div className="text-4xl font-bold font-mono" style={{ color: scoreColor(selected.matchScore) }}>{selected.matchScore}%</div>
                  <div className="text-xs mt-1" style={{ color: "var(--color-on-surface-variant)" }}>نسبة التطابق مع ملفك</div>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--color-outline-variant)" }}>
                  <div className="h-full rounded-full" style={{ width: `${selected.matchScore}%`, background: scoreColor(selected.matchScore) }} />
                </div>
                {selected.salary && (
                  <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                    <span className="font-mono font-semibold" style={{ color: "var(--portal-color)" }}>الراتب: </span>{selected.salary}
                  </p>
                )}
                <button
                  disabled
                  className="w-full py-3 rounded-xl text-sm font-semibold cursor-not-allowed opacity-40"
                  style={{ background: "var(--portal-color-subtle)", color: "var(--portal-color)", border: "1px solid var(--portal-color-glow)" }}
                  title="ميزة التقديم المباشر قادمة قريبًا"
                >
                  التقديم على الوظيفة (قريباً)
                </button>
              </div>
            ) : (
              <div className="text-center py-12 opacity-40">
                <Briefcase size={32} className="mx-auto mb-3" style={{ color: "var(--color-on-surface-variant)" }} />
                <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>انقر على وظيفة لعرض تفاصيلها ونسبة تطابقها مع سيرتك</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
