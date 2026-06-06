"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, GraduationCap, Code, FileText, Check, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import type { CVData } from "@/types/career";

const STEPS = [
  { id: "personal", labelAr: "المعلومات الشخصية", icon: User },
  { id: "experience", labelAr: "الخبرات العملية", icon: Briefcase },
  { id: "education", labelAr: "التعليم", icon: GraduationCap },
  { id: "skills", labelAr: "المهارات", icon: Code },
  { id: "summary", labelAr: "الملخص المهني", icon: FileText },
];

const INITIAL_DATA: CVData = {
  fullName: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
  experience: [{ company: "", role: "", period: "", desc: "" }],
  education: [{ degree: "", school: "", period: "" }],
  skills: [],
};

function inputCls() {
  return "w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all";
}
const inputStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid var(--color-outline-variant)",
  color: "var(--color-on-surface)",
};
const focusRingStyle = { "--tw-ring-color": "var(--portal-color)" } as React.CSSProperties;

export default function CVBuilderClient() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<CVData>(INITIAL_DATA);
  const [skillInput, setSkillInput] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const addExp = () =>
    setData((d) => ({ ...d, experience: [...d.experience, { company: "", role: "", period: "", desc: "" }] }));
  const removeExp = (i: number) =>
    setData((d) => ({ ...d, experience: d.experience.filter((_, idx) => idx !== i) }));
  const updateExp = (i: number, field: string, val: string) =>
    setData((d) => {
      const exp = [...d.experience];
      exp[i] = { ...exp[i], [field]: val };
      return { ...d, experience: exp };
    });

  const addEdu = () =>
    setData((d) => ({ ...d, education: [...d.education, { degree: "", school: "", period: "" }] }));
  const removeEdu = (i: number) =>
    setData((d) => ({ ...d, education: d.education.filter((_, idx) => idx !== i) }));
  const updateEdu = (i: number, field: string, val: string) =>
    setData((d) => {
      const edu = [...d.education];
      edu[i] = { ...edu[i], [field]: val };
      return { ...d, education: edu };
    });

  const addSkill = () => {
    if (!skillInput.trim()) return;
    setData((d) => ({ ...d, skills: [...d.skills, skillInput.trim()] }));
    setSkillInput("");
  };
  const removeSkill = (i: number) =>
    setData((d) => ({ ...d, skills: d.skills.filter((_, idx) => idx !== i) }));

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">
      {/* Form Panel */}
      <div className="flex-1 flex flex-col glass-card rounded-3xl overflow-hidden" style={{ border: "1px solid var(--portal-color-border)" }}>
        {/* Step tabs */}
        <div className="flex overflow-x-auto gap-1 p-3" style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid var(--color-outline-variant)" }}>
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            const isActive = idx === step;
            const isPast = idx < step;
            return (
              <button
                key={s.id}
                onClick={() => setStep(idx)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium shrink-0 transition-all"
                style={isActive
                  ? { background: "var(--portal-color-subtle)", color: "var(--portal-color)", border: "1px solid var(--portal-color-glow)" }
                  : { color: "var(--color-on-surface-variant)", border: "1px solid transparent" }}
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]" style={{ background: isActive ? "var(--portal-color)" : isPast ? "rgba(74,222,128,0.2)" : "rgba(255,255,255,0.05)", color: isActive ? "#0c0e12" : isPast ? "#4ade80" : "inherit" }}>
                  {isPast ? <Check size={10} /> : idx + 1}
                </div>
                <span className="hidden sm:inline">{s.labelAr}</span>
              </button>
            );
          })}
        </div>

        {/* Form content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {step === 0 && (
                <>
                  <h2 className="text-lg font-bold mb-4" style={{ color: "var(--color-on-surface)" }}>المعلومات الشخصية</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { field: "fullName" as const, label: "الاسم الكامل", type: "text" },
                      { field: "title" as const, label: "المسمى المهني", type: "text" },
                      { field: "email" as const, label: "البريد الإلكتروني", type: "email" },
                      { field: "phone" as const, label: "رقم الهاتف", type: "tel" },
                    ].map(({ field, label, type }) => (
                      <div key={field}>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>{label}</label>
                        <input
                          type={type}
                          className={inputCls()}
                          style={{ ...inputStyle, ...focusRingStyle }}
                          value={data[field] ?? ""}
                          onChange={(e) => setData((d) => ({ ...d, [field]: e.target.value }))}
                        />
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-on-surface-variant)" }}>الموقع / المدينة</label>
                      <input
                        type="text"
                        className={inputCls()}
                        style={{ ...inputStyle, ...focusRingStyle }}
                        value={data.location}
                        onChange={(e) => setData((d) => ({ ...d, location: e.target.value }))}
                      />
                    </div>
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <h2 className="text-lg font-bold mb-4" style={{ color: "var(--color-on-surface)" }}>الخبرات العملية</h2>
                  {data.experience.map((exp, i) => (
                    <div key={i} className="rounded-2xl p-4 mb-3 relative" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-outline-variant)" }}>
                      <button onClick={() => removeExp(i)} className="absolute top-3 left-3 text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(248,113,113,0.1)", color: "#f87171" }}>✕</button>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        {[
                          { field: "role", label: "المسمى الوظيفي" },
                          { field: "company", label: "جهة العمل" },
                          { field: "period", label: "الفترة (مثال: 2021 - الآن)" },
                        ].map(({ field, label }) => (
                          <div key={field}>
                            <label className="block text-xs mb-1" style={{ color: "var(--color-on-surface-variant)" }}>{label}</label>
                            <input type="text" className={inputCls()} style={inputStyle} value={(exp as Record<string, string>)[field]} onChange={(e) => updateExp(i, field, e.target.value)} />
                          </div>
                        ))}
                      </div>
                      <div>
                        <label className="block text-xs mb-1" style={{ color: "var(--color-on-surface-variant)" }}>الوصف والإنجازات</label>
                        <textarea className="w-full rounded-xl p-3 text-sm resize-none focus:outline-none h-20" style={inputStyle} value={exp.desc} onChange={(e) => updateExp(i, "desc", e.target.value)} />
                      </div>
                    </div>
                  ))}
                  <button onClick={addExp} className="w-full py-4 rounded-2xl text-sm font-medium transition-all" style={{ border: "2px dashed var(--color-outline-variant)", color: "var(--color-on-surface-variant)" }}>
                    + إضافة خبرة جديدة
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-lg font-bold mb-4" style={{ color: "var(--color-on-surface)" }}>التعليم</h2>
                  {data.education.map((edu, i) => (
                    <div key={i} className="rounded-2xl p-4 mb-3 relative" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-outline-variant)" }}>
                      <button onClick={() => removeEdu(i)} className="absolute top-3 left-3 text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(248,113,113,0.1)", color: "#f87171" }}>✕</button>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { field: "degree", label: "الدرجة العلمية والتخصص" },
                          { field: "school", label: "المؤسسة / الجامعة" },
                          { field: "period", label: "الفترة" },
                        ].map(({ field, label }) => (
                          <div key={field}>
                            <label className="block text-xs mb-1" style={{ color: "var(--color-on-surface-variant)" }}>{label}</label>
                            <input type="text" className={inputCls()} style={inputStyle} value={(edu as Record<string, string>)[field]} onChange={(e) => updateEdu(i, field, e.target.value)} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button onClick={addEdu} className="w-full py-4 rounded-2xl text-sm font-medium transition-all" style={{ border: "2px dashed var(--color-outline-variant)", color: "var(--color-on-surface-variant)" }}>
                    + إضافة تعليم جديد
                  </button>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="text-lg font-bold mb-4" style={{ color: "var(--color-on-surface)" }}>المهارات التقنية والشخصية</h2>
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      className="flex-1 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                      style={inputStyle}
                      placeholder="مهارة (مثال: React، إدارة المشاريع...)"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addSkill()}
                    />
                    <button onClick={addSkill} className="px-4 py-2.5 rounded-xl text-sm font-medium" style={{ background: "var(--portal-color-subtle)", color: "var(--portal-color)", border: "1px solid var(--portal-color-glow)" }}>إضافة</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((sk, i) => (
                      <span key={i} className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full" style={{ background: "var(--portal-color-subtle)", border: "1px solid var(--portal-color-glow)", color: "var(--portal-color)" }}>
                        {sk}
                        <button onClick={() => removeSkill(i)} className="hover:opacity-70">✕</button>
                      </span>
                    ))}
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <h2 className="text-lg font-bold mb-4" style={{ color: "var(--color-on-surface)" }}>الملخص المهني</h2>
                  <div className="rounded-2xl p-4 relative" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-outline-variant)" }}>
                    <textarea
                      className="w-full rounded-xl p-4 text-sm resize-none focus:outline-none"
                      style={{ ...inputStyle, minHeight: 160 }}
                      placeholder="اكتب ملخصاً موجزاً يبرز أهم خبراتك ونقاط قوتك المهنية..."
                      value={data.summary}
                      onChange={(e) => setData((d) => ({ ...d, summary: e.target.value }))}
                    />
                    <div className="flex justify-end mt-3">
                      <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg opacity-50" style={{ background: "rgba(208,188,255,0.1)", color: "#d0bcff", border: "1px solid rgba(208,188,255,0.2)" }}>
                        <Sparkles size={12} /> صياغة بـ AI (قريباً)
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav footer */}
        <div className="p-4 flex justify-between items-center" style={{ borderTop: "1px solid var(--color-outline-variant)" }}>
          <button onClick={prev} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm ${step === 0 ? "invisible" : ""}`} style={{ background: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)" }}>
            <ChevronRight size={16} /> السابق
          </button>
          <button onClick={next} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${step === STEPS.length - 1 ? "invisible" : ""}`} style={{ background: "var(--portal-color-subtle)", color: "var(--portal-color)", border: "1px solid var(--portal-color-glow)" }}>
            التالي <ChevronLeft size={16} />
          </button>
        </div>
      </div>

      {/* Live Preview (desktop) */}
      <div className="hidden lg:flex flex-col w-96 glass-card rounded-3xl overflow-hidden" style={{ border: "1px solid var(--portal-color-border)" }}>
        <div className="p-3 flex items-center justify-between" style={{ borderBottom: "1px solid var(--color-outline-variant)", background: "var(--portal-color-faint)" }}>
          <span className="text-xs font-mono" style={{ color: "var(--portal-color)" }}>معاينة حية</span>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px]" style={{ color: "var(--color-on-surface-variant)" }}>Live</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-white text-black text-xs font-sans">
          {data.fullName && (
            <div className="text-center border-b pb-3 mb-3" style={{ borderColor: "#e5e7eb" }}>
              <h1 className="text-base font-bold uppercase tracking-wider text-slate-900">{data.fullName}</h1>
              {data.title && <p className="text-amber-600 text-xs">{data.title}</p>}
              <div className="flex flex-wrap justify-center gap-3 mt-1 text-[10px] text-slate-500">
                {data.email && <span>{data.email}</span>}
                {data.phone && <span>{data.phone}</span>}
                {data.location && <span>{data.location}</span>}
              </div>
            </div>
          )}
          {data.summary && (
            <div className="mb-3">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-700 border-b mb-1.5" style={{ borderColor: "#e5e7eb" }}>Summary</h2>
              <p className="text-[10px] text-slate-600 leading-relaxed">{data.summary}</p>
            </div>
          )}
          {data.experience.some((e) => e.role) && (
            <div className="mb-3">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-700 border-b mb-1.5" style={{ borderColor: "#e5e7eb" }}>Experience</h2>
              {data.experience.filter((e) => e.role).map((e, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-900">{e.role}</span>
                    <span className="text-slate-500 text-[9px]">{e.period}</span>
                  </div>
                  <div className="text-amber-600 text-[9px]">{e.company}</div>
                  {e.desc && <p className="text-[10px] text-slate-600 mt-0.5">{e.desc}</p>}
                </div>
              ))}
            </div>
          )}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-700 border-b mb-1.5" style={{ borderColor: "#e5e7eb" }}>Skills</h2>
              <div className="flex flex-wrap gap-1">
                {data.skills.map((sk, i) => (
                  <span key={i} className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: "#fef3c7", color: "#92400e" }}>{sk}</span>
                ))}
              </div>
            </div>
          )}
          {!data.fullName && (
            <div className="h-full flex items-center justify-center opacity-30">
              <p className="text-center text-xs text-slate-400">أدخل بياناتك لمشاهدة<br />المعاينة الحية هنا</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
