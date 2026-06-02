"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Clock,
  ChevronDown,
  ChevronUp,
  Zap,
  Shield,
  Sparkles,
  ArrowLeft,
  Filter,
} from "lucide-react";
import type { AutomationTemplate } from "@/data/automation/types";
import SafetyBadge from "./SafetyBadge";

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
  templates: AutomationTemplate[];
  locale?: string;
}

export default function TemplatesClient({ templates, locale = "ar" }: Props) {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("الكل");
  const [diff, setDiff] = useState("الكل");
  const [safetyFilter, setSafetyFilter] = useState("الكل");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Derived filter options
  const depts = ["الكل", ...Array.from(new Set(templates.map((t) => t.category ?? t.department))).sort()];
  const diffs = ["الكل", "مبتدئ", "متوسط", "متقدم"];
  const safetyOptions = ["الكل", "آمن", "يحتاج مراجعة", "متقدم"];

  const filtered = templates.filter((t) => {
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      t.title.toLowerCase().includes(q) ||
      t.businessProblem.toLowerCase().includes(q) ||
      (t.shortDescription ?? "").toLowerCase().includes(q) ||
      (t.category ?? "").toLowerCase().includes(q) ||
      t.requiredTools.some((tool) => tool.toLowerCase().includes(q)) ||
      (t.tags ?? []).some((tag) => tag.toLowerCase().includes(q)) ||
      (t.industry ?? "").toLowerCase().includes(q);
    const matchDept = dept === "الكل" || t.category === dept || t.department === dept;
    const matchDiff = diff === "الكل" || t.difficulty === diff;
    const matchSafety = safetyFilter === "الكل" || t.safetyStatus === safetyFilter;
    return matchQ && matchDept && matchDiff && matchSafety;
  });

  return (
    <div className="space-y-5">
      {/* Search row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--color-on-surface-variant)" }}
          />
          <input
            type="text"
            placeholder="ابحث عن وصفة أتمتة..."
            className="w-full rounded-2xl pr-11 pl-4 py-2.5 text-sm focus:outline-none"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--color-outline-variant)",
              color: "var(--color-on-surface)",
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm transition-all"
          style={{
            background: showFilters ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${showFilters ? "rgba(74,222,128,0.3)" : "var(--color-outline-variant)"}`,
            color: showFilters ? "#4ade80" : "var(--color-on-surface-variant)",
          }}
        >
          <Filter size={14} />
          فلترة
        </button>
      </div>

      {/* Filter dropdowns */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-3 pt-1 pb-2">
              <select
                className="rounded-2xl px-4 py-2.5 text-sm focus:outline-none"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--color-outline-variant)",
                  color: "var(--color-on-surface)",
                }}
                value={dept}
                onChange={(e) => setDept(e.target.value)}
              >
                {depts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <select
                className="rounded-2xl px-4 py-2.5 text-sm focus:outline-none"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--color-outline-variant)",
                  color: "var(--color-on-surface)",
                }}
                value={diff}
                onChange={(e) => setDiff(e.target.value)}
              >
                {diffs.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <select
                className="rounded-2xl px-4 py-2.5 text-sm focus:outline-none"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--color-outline-variant)",
                  color: "var(--color-on-surface)",
                }}
                value={safetyFilter}
                onChange={(e) => setSafetyFilter(e.target.value)}
              >
                {safetyOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
        {filtered.length} وصفة
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((tmpl) => {
          const open = expanded === tmpl.id;
          const accessColor = ACCESS_COLORS[tmpl.access] ?? "#8ed5ff";
          const diffColor = DIFF_COLORS[tmpl.difficulty] ?? "#8ed5ff";
          return (
            <motion.div
              key={tmpl.id}
              layout
              className="glass-card rounded-2xl overflow-hidden flex flex-col"
              style={{ border: "1px solid rgba(74,222,128,0.1)" }}
            >
              {/* Card header — always visible */}
              <button
                className="w-full text-right p-5 flex flex-col gap-3"
                onClick={() => setExpanded(open ? null : tmpl.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3
                    className="font-semibold text-sm text-start"
                    style={{ color: "var(--color-on-surface)" }}
                  >
                    {tmpl.title}
                  </h3>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                      style={{
                        background: `${accessColor}15`,
                        color: accessColor,
                        border: `1px solid ${accessColor}25`,
                      }}
                    >
                      {tmpl.access}
                    </span>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                      style={{
                        background: `${diffColor}15`,
                        color: diffColor,
                        border: `1px solid ${diffColor}25`,
                      }}
                    >
                      {tmpl.difficulty}
                    </span>
                  </div>
                </div>

                <p
                  className="text-xs text-start leading-relaxed"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  {tmpl.shortDescription ?? tmpl.businessProblem}
                </p>

                {/* Safety badge + meta row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    {tmpl.safetyStatus && <SafetyBadge status={tmpl.safetyStatus} size="sm" />}
                    {tmpl.nodeCount && (
                      <span
                        className="text-[10px] font-mono"
                        style={{ color: "var(--color-on-surface-variant)" }}
                      >
                        {tmpl.nodeCount} خطوات
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="flex items-center gap-1 text-[10px]"
                      style={{ color: "var(--color-on-surface-variant)" }}
                    >
                      <Clock size={10} />
                      {tmpl.estimatedSetupTime}
                    </span>
                    {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </div>
              </button>

              {/* Expandable details */}
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="px-5 pb-5 space-y-4"
                      style={{ borderTop: "1px solid var(--color-outline-variant)" }}
                    >
                      <div className="pt-4">
                        <p
                          className="text-xs font-semibold mb-2 flex items-center gap-1"
                          style={{ color: "#4ade80" }}
                        >
                          <Zap size={11} /> ملخص الـ Workflow
                        </p>
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: "var(--color-on-surface-variant)" }}
                        >
                          {tmpl.workflowSummary}
                        </p>
                      </div>

                      <div>
                        <p
                          className="text-xs font-semibold mb-2 flex items-center gap-1"
                          style={{ color: "#8ed5ff" }}
                        >
                          <Sparkles size={11} /> الأدوات المطلوبة
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {tmpl.requiredTools.map((tool, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2 py-0.5 rounded-full"
                              style={{
                                background: "rgba(142,213,255,0.08)",
                                color: "#8ed5ff",
                                border: "1px solid rgba(142,213,255,0.15)",
                              }}
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      {tmpl.risks && tmpl.risks.length > 0 && (
                        <div>
                          <p
                            className="text-xs font-semibold mb-1.5 flex items-center gap-1"
                            style={{ color: "#f87171" }}
                          >
                            <Shield size={11} /> المخاطر المحتملة
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {tmpl.risks.map((r, i) => (
                              <span
                                key={i}
                                className="text-[10px] px-2 py-0.5 rounded-full"
                                style={{
                                  background: "rgba(248,113,113,0.08)",
                                  color: "#f87171",
                                  border: "1px solid rgba(248,113,113,0.15)",
                                }}
                              >
                                {r}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      {tmpl.tags && tmpl.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {tmpl.tags.slice(0, 4).map((tag, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                              style={{
                                background: "rgba(255,255,255,0.04)",
                                color: "var(--color-on-surface-variant)",
                                border: "1px solid rgba(255,255,255,0.07)",
                              }}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CTA — always at bottom */}
              <div className="px-5 pb-4 mt-auto pt-2">
                <Link
                  href={`/${locale}/automation/templates/${tmpl.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all hover:opacity-90"
                  style={{
                    background: "rgba(74,222,128,0.1)",
                    color: "#4ade80",
                    border: "1px solid rgba(74,222,128,0.2)",
                  }}
                >
                  <ArrowLeft size={12} />
                  عرض التفاصيل
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 opacity-50">
          <p style={{ color: "var(--color-on-surface-variant)" }}>لا توجد نتائج مطابقة</p>
        </div>
      )}
    </div>
  );
}
