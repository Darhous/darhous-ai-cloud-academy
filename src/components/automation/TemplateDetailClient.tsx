"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Layers,
  ArrowUpRight,
  Tag,
  Target,
  Users,
  KeyRound,
} from "lucide-react";
import type { AutomationTemplate, WorkflowDetail } from "@/data/automation/types";
import SafetyBadge from "./SafetyBadge";
import WorkflowMapClient from "./WorkflowMapClient";
import JsonViewer from "./JsonViewer";
import SaveRecipeButton from "./SaveRecipeButton";
import TestingChecklist from "./TestingChecklist";

const ACCESS_COLORS: Record<string, string> = {
  Free: "#4ade80",
  Pro: "#d0bcff",
  "Service-ready": "#f59e0b",
};

const DIFF_COLORS: Record<string, string> = {
  مبتدئ: "#4ade80",
  متوسط: "#f59e0b",
  متقدم: "#f87171",
};

interface Props {
  template: AutomationTemplate;
  detail: WorkflowDetail;
  jsonUrl: string;
}

export default function TemplateDetailClient({ template, detail, jsonUrl }: Props) {
  const [openSection, setOpenSection] = useState<string | null>("setup");

  const toggle = (section: string) => setOpenSection((prev) => (prev === section ? null : section));

  const accessColor = ACCESS_COLORS[template.access] ?? "#8ed5ff";
  const diffColor = DIFF_COLORS[template.difficulty] ?? "#8ed5ff";

  const sections: { id: string; label: string; color: string; icon: React.ReactNode }[] = [
    { id: "setup", label: "خطوات الإعداد", color: "#8ed5ff", icon: <Sparkles size={14} /> },
    { id: "io", label: "المدخلات والمخرجات", color: "#f59e0b", icon: <Layers size={14} /> },
    { id: "testing", label: "قائمة الاختبار", color: "#3ce0fb", icon: <CheckCircle2 size={14} /> },
    { id: "risks", label: "المخاطر والأخطاء الشائعة", color: "#f87171", icon: <AlertTriangle size={14} /> },
    { id: "upgrades", label: "أفكار التطوير", color: "#d0bcff", icon: <ArrowUpRight size={14} /> },
  ];

  return (
    <div className="space-y-6" dir="rtl">
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="rounded-3xl p-6 md:p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(74,222,128,0.12)" }}>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[11px] font-mono px-3 py-1 rounded-full" style={{ background: `${accessColor}15`, color: accessColor, border: `1px solid ${accessColor}25` }}>
            {template.access}
          </span>
          <span className="text-[11px] font-mono px-3 py-1 rounded-full" style={{ background: `${diffColor}15`, color: diffColor, border: `1px solid ${diffColor}25` }}>
            {template.difficulty}
          </span>
          <span className="text-[11px] font-mono px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {template.category}
          </span>
          {template.safetyStatus && <SafetyBadge status={template.safetyStatus} />}
          <span className="inline-flex items-center gap-1 text-xs mr-auto" style={{ color: "var(--color-on-surface-variant)" }}>
            <Clock size={12} />
            {template.estimatedSetupTime}
            {template.nodeCount ? <span className="mx-1">· {template.nodeCount} خطوات</span> : null}
          </span>
        </div>

        <h1 className="font-display font-bold text-2xl md:text-3xl mb-3" style={{ color: "var(--color-on-surface)" }}>
          {template.title}
        </h1>
        <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-on-surface-variant)" }}>
          {template.shortDescription ?? template.businessProblem}
        </p>

        {/* Tools */}
        <div className="flex flex-wrap gap-2 mb-4">
          {template.requiredTools.map((tool, i) => (
            <span key={i} className="text-[11px] px-2.5 py-1 rounded-full font-mono" style={{ background: "rgba(142,213,255,0.08)", color: "#8ed5ff", border: "1px solid rgba(142,213,255,0.15)" }}>
              {tool}
            </span>
          ))}
        </div>

        {/* Tags */}
        {template.tags && template.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {template.tags.map((tag, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-mono" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <Tag size={9} />{tag}
              </span>
            ))}
          </div>
        )}

        {/* Save button */}
        <div className="mt-4 flex justify-start">
          <SaveRecipeButton id={template.id} />
        </div>
      </div>

      {/* ── Business value cards ─────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-2xl p-5" style={{ background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.12)" }}>
          <div className="flex items-center gap-2 mb-2" style={{ color: "#4ade80" }}>
            <Target size={14} />
            <span className="text-xs font-semibold">حالة الاستخدام</span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
            {detail.businessUseCase}
          </p>
        </div>
        <div className="rounded-2xl p-5" style={{ background: "rgba(208,188,255,0.04)", border: "1px solid rgba(208,188,255,0.12)" }}>
          <div className="flex items-center gap-2 mb-2" style={{ color: "#d0bcff" }}>
            <Users size={14} />
            <span className="text-xs font-semibold">من يحتاجها</span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
            {detail.whoNeedsIt}
          </p>
          {template.businessValue && (
            <p className="text-[11px] leading-relaxed mt-3 pt-3" style={{ color: "#d0bcff", borderTop: "1px solid rgba(208,188,255,0.12)" }}>
              💡 {template.businessValue}
            </p>
          )}
        </div>
      </div>

      {/* ── Workflow Map ─────────────────────────────────── */}
      {detail.workflowMapNodes.length > 0 && (
        <div className="rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(249,115,22,0.12)" }}>
          <div className="flex items-center justify-between px-6 py-4" style={{ background: "rgba(249,115,22,0.05)", borderBottom: "1px solid rgba(249,115,22,0.08)" }}>
            <h2 className="font-bold text-sm flex items-center gap-2" style={{ color: "#f97316" }}>
              <Zap size={15} /> خارطة الـ Workflow
            </h2>
            <span className="text-[10px] font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
              {detail.workflowMapNodes.length} عقدة · للعرض فقط
            </span>
          </div>
          <div className="p-5 md:p-6">
            <WorkflowMapClient nodes={detail.workflowMapNodes} />
          </div>
        </div>
      )}

      {/* ── Trigger + summary ────────────────────────────── */}
      <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-on-surface-variant)" }}>
          {template.workflowSummary}
        </p>
        <span className="text-[11px] font-mono" style={{ color: "var(--color-on-surface-variant)" }}>Trigger: </span>
        <span className="text-[11px] font-mono" style={{ color: "#4ade80" }}>{template.trigger}</span>
      </div>

      {/* ── Cleaned JSON ─────────────────────────────────── */}
      <div>
        <h2 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: "#4ade80" }}>
          <Layers size={15} /> ملف n8n JSON التعليمي
        </h2>
        <JsonViewer jsonUrl={jsonUrl} fileName={detail.jsonFileName} title={template.title} />
      </div>

      {/* ── Credentials guide ────────────────────────────── */}
      {template.credentialsGuide && (
        <div className="rounded-2xl p-5 flex gap-3" style={{ background: "rgba(142,213,255,0.04)", border: "1px solid rgba(142,213,255,0.12)" }}>
          <KeyRound size={15} style={{ color: "#8ed5ff", flexShrink: 0, marginTop: 2 }} />
          <div>
            <p className="text-xs font-semibold mb-1" style={{ color: "#8ed5ff" }}>دليل الاعتمادات (Credentials)</p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{template.credentialsGuide}</p>
            {template.requiredAccounts && template.requiredAccounts.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {template.requiredAccounts.map((acc, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(142,213,255,0.08)", color: "#8ed5ff", border: "1px solid rgba(142,213,255,0.15)" }}>
                    {acc}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Accordion sections ───────────────────────────── */}
      <div className="space-y-3">
        {sections.map((sec) => {
          const isOpen = openSection === sec.id;
          let content: React.ReactNode = null;

          if (sec.id === "setup") {
            content = (
              <ol className="space-y-3">
                {template.setupSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                    <span className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold shrink-0" style={{ background: `${sec.color}15`, color: sec.color }}>
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            );
          } else if (sec.id === "io") {
            content = (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold mb-3" style={{ color: "#f59e0b" }}>المدخلات</p>
                  <ul className="space-y-1.5">
                    {template.inputFields.map((f, i) => (
                      <li key={i} className="text-xs flex items-center gap-2" style={{ color: "var(--color-on-surface-variant)" }}>
                        <span style={{ color: "#f59e0b" }}>◎</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold mb-3" style={{ color: "#3ce0fb" }}>المخرجات</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{template.output}</p>
                </div>
              </div>
            );
          } else if (sec.id === "testing") {
            content = (
              <TestingChecklist id={template.id} items={template.testingChecklist} />
            );
          } else if (sec.id === "risks") {
            content = (
              <div className="flex flex-wrap gap-2">
                {template.risks.map((r, i) => (
                  <span key={i} className="text-xs px-3 py-1.5 rounded-xl" style={{ background: "rgba(248,113,113,0.08)", color: "#f87171", border: "1px solid rgba(248,113,113,0.15)" }}>
                    ⚠ {r}
                  </span>
                ))}
                {template.commonMistakes && template.commonMistakes.length > 0 && (
                  <div className="w-full mt-4 pt-4" style={{ borderTop: "1px solid rgba(248,113,113,0.1)" }}>
                    <p className="text-xs font-semibold mb-2" style={{ color: "#f87171" }}>الأخطاء الشائعة:</p>
                    <ul className="space-y-1">
                      {template.commonMistakes.map((m, i) => (
                        <li key={i} className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>• {m}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          } else if (sec.id === "upgrades") {
            content = (
              <ul className="space-y-2">
                {template.upgradeIdeas.map((idea, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                    <ArrowUpRight size={13} className="shrink-0 mt-0.5" style={{ color: sec.color }} />
                    {idea}
                  </li>
                ))}
              </ul>
            );
          }

          return (
            <div key={sec.id} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${isOpen ? sec.color + "20" : "rgba(255,255,255,0.07)"}` }}>
              <button className="w-full flex items-center justify-between px-5 py-4 text-right transition-all" style={{ background: isOpen ? `${sec.color}08` : "rgba(255,255,255,0.02)" }} onClick={() => toggle(sec.id)}>
                <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: isOpen ? sec.color : "var(--color-on-surface)" }}>
                  {sec.icon}
                  {sec.label}
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
    </div>
  );
}
