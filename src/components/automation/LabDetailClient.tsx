"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FlaskConical, Clock, Target, Wrench, CheckCircle2, Circle,
  AlertTriangle, ChevronDown, ChevronUp, Zap, ArrowUpRight,
} from "lucide-react";
import type { AutomationLab } from "@/data/automation/types";

const DIFF_COLOR: Record<string, string> = { مبتدئ: "#4ade80", متوسط: "#f59e0b", متقدم: "#f87171" };

function completionKey(id: string) {
  return `darhous:automation:lab:${id}`;
}

function readCompletion(id: string, total: number): boolean[] {
  if (typeof window === "undefined") return Array(total).fill(false);
  try {
    const raw = localStorage.getItem(completionKey(id));
    return raw ? JSON.parse(raw) : Array(total).fill(false);
  } catch {
    return Array(total).fill(false);
  }
}

interface Props { lab: AutomationLab }

export default function LabDetailClient({ lab }: Props) {
  const color = DIFF_COLOR[lab.level] ?? "#8ed5ff";
  const [checked, setChecked] = useState<boolean[]>([]);
  const [openSection, setOpenSection] = useState<string | null>("steps");

  useEffect(() => {
    setChecked(readCompletion(lab.id, lab.completionChecklist.length));
  }, [lab.id, lab.completionChecklist.length]);

  function toggleCheck(i: number) {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      localStorage.setItem(completionKey(lab.id), JSON.stringify(next));
      return next;
    });
  }

  const toggle = (s: string) => setOpenSection((p) => (p === s ? null : s));
  const doneCount = checked.filter(Boolean).length;
  const total = lab.completionChecklist.length;

  const sections = [
    { id: "steps",    label: "خطوات المعمل",         color: "#3ce0fb",  icon: <Zap size={14} /> },
    { id: "mistakes", label: "الأخطاء الشائعة",       color: "#f87171",  icon: <AlertTriangle size={14} /> },
    { id: "challenge",label: "التحدي الإضافي",        color: "#d0bcff",  icon: <ArrowUpRight size={14} /> },
  ];

  return (
    <div className="space-y-6" dir="rtl">
      {/* Hero */}
      <div className="rounded-3xl p-6 md:p-8" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${color}18` }}>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[11px] font-mono px-3 py-1 rounded-full" style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>
            {lab.level}
          </span>
          <span className="inline-flex items-center gap-1 text-xs mr-auto" style={{ color: "var(--color-on-surface-variant)" }}>
            <Clock size={12} />{lab.duration}
          </span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}12`, border: `1px solid ${color}22` }}>
            <FlaskConical size={20} style={{ color }} />
          </div>
          <h1 className="font-display font-bold text-2xl" style={{ color: "var(--color-on-surface)" }}>{lab.title}</h1>
        </div>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-on-surface-variant)" }}>{lab.objective}</p>

        {/* Tools */}
        <div className="flex flex-wrap gap-2">
          {lab.tools.map((t, i) => (
            <span key={i} className="text-[11px] px-2.5 py-1 rounded-full font-mono" style={{ background: "rgba(142,213,255,0.08)", color: "#8ed5ff", border: "1px solid rgba(142,213,255,0.15)" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Scenario */}
      <div className="rounded-2xl p-5 flex gap-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <Target size={15} style={{ color, flexShrink: 0, marginTop: 2 }} />
        <div>
          <p className="text-xs font-semibold mb-1" style={{ color }}>السيناريو</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{lab.scenario}</p>
        </div>
      </div>

      {/* Expected output */}
      <div className="rounded-2xl p-5 flex gap-3" style={{ background: `${color}06`, border: `1px solid ${color}15` }}>
        <Wrench size={15} style={{ color, flexShrink: 0, marginTop: 2 }} />
        <div>
          <p className="text-xs font-semibold mb-1" style={{ color }}>النتيجة المتوقعة</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{lab.expectedOutput}</p>
        </div>
      </div>

      {/* Accordion sections */}
      <div className="space-y-3">
        {sections.map((sec) => {
          const isOpen = openSection === sec.id;
          let content: React.ReactNode = null;

          if (sec.id === "steps") {
            content = (
              <ol className="space-y-3">
                {lab.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                    <span className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold shrink-0" style={{ background: `${sec.color}15`, color: sec.color }}>{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            );
          } else if (sec.id === "mistakes") {
            content = (
              <ul className="space-y-2">
                {lab.commonMistakes.map((m, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                    <AlertTriangle size={13} className="shrink-0 mt-0.5" style={{ color: sec.color }} />
                    {m}
                  </li>
                ))}
              </ul>
            );
          } else if (sec.id === "challenge") {
            content = (
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{lab.challengeTask}</p>
            );
          }

          return (
            <div key={sec.id} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${isOpen ? sec.color + "20" : "rgba(255,255,255,0.07)"}` }}>
              <button className="w-full flex items-center justify-between px-5 py-4 text-right transition-all" style={{ background: isOpen ? `${sec.color}08` : "rgba(255,255,255,0.02)" }} onClick={() => toggle(sec.id)}>
                <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: isOpen ? sec.color : "var(--color-on-surface)" }}>
                  {sec.icon}{sec.label}
                </span>
                {isOpen ? <ChevronUp size={15} style={{ color: sec.color }} /> : <ChevronDown size={15} style={{ color: "var(--color-on-surface-variant)" }} />}
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-5 py-5" style={{ borderTop: `1px solid ${sec.color}12` }}>{content}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Completion checklist */}
      <div className="rounded-3xl p-6" style={{ background: `${color}05`, border: `1px solid ${color}18` }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-sm flex items-center gap-2" style={{ color }}>
            <CheckCircle2 size={15} />قائمة الإنجاز
          </h2>
          <span className="text-xs font-mono" style={{ color }}>
            {doneCount}/{total}
          </span>
        </div>
        <div className="h-1.5 rounded-full mb-4" style={{ background: "rgba(255,255,255,0.07)" }}>
          <div className="h-full rounded-full transition-all" style={{ width: total ? `${(doneCount / total) * 100}%` : "0%", background: color }} />
        </div>
        <ul className="space-y-2.5">
          {lab.completionChecklist.map((item, i) => (
            <li key={i}>
              <button
                onClick={() => toggleCheck(i)}
                className="w-full flex items-start gap-2.5 text-sm text-right transition-opacity hover:opacity-80"
                style={{ color: checked[i] ? "var(--color-on-surface-variant)" : "var(--color-on-surface)" }}
              >
                {checked[i]
                  ? <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color }} />
                  : <Circle size={16} className="shrink-0 mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }} />
                }
                <span style={{ textDecoration: checked[i] ? "line-through" : "none" }}>{item}</span>
              </button>
            </li>
          ))}
        </ul>
        {doneCount === total && total > 0 && (
          <div className="mt-5 rounded-2xl p-4 text-center" style={{ background: `${color}10`, border: `1px solid ${color}20` }}>
            <p className="font-bold text-sm" style={{ color }}>🎉 أكملت هذا المعمل!</p>
          </div>
        )}
      </div>
    </div>
  );
}
