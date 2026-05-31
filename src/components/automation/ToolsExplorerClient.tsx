"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ChevronUp, CheckCircle2, XCircle } from "lucide-react";
import type { AutomationTool } from "@/data/automation/types";

const DIFF_COLOR: Record<string, string> = { مبتدئ: "#4ade80", متوسط: "#f59e0b", متقدم: "#f87171" };
const PRICE_COLOR: Record<string, string> = { "مجاني": "#4ade80", "مجاني / مدفوع": "#f59e0b", "مدفوع": "#f87171", "مفاهيمي": "#8ed5ff" };

interface Props { tools: AutomationTool[] }

export default function ToolsExplorerClient({ tools }: Props) {
  const [search, setSearch] = useState("");
  const [diff, setDiff] = useState("الكل");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = tools.filter((t) => {
    const q = search.toLowerCase();
    const matchQ = !q || t.name.toLowerCase().includes(q) || t.whatItIs.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
    const matchD = diff === "الكل" || t.difficulty === diff;
    return matchQ && matchD;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--color-on-surface-variant)" }} />
          <input type="text" placeholder="ابحث عن أداة..." className="w-full rounded-2xl pr-11 pl-4 py-2.5 text-sm focus:outline-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }} value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="rounded-2xl px-4 py-2.5 text-sm focus:outline-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }} value={diff} onChange={(e) => setDiff(e.target.value)}>
          {["الكل", "مبتدئ", "متوسط", "متقدم"].map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <p className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{filtered.length} أداة</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((tool) => {
          const open = expanded === tool.id;
          return (
            <motion.div key={tool.id} layout className="glass-card rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(142,213,255,0.1)" }}>
              <button className="w-full text-right p-5 flex flex-col gap-2" onClick={() => setExpanded(open ? null : tool.id)}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>{tool.name}</h3>
                    <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>{tool.category}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: `${DIFF_COLOR[tool.difficulty] ?? "#8ed5ff"}15`, color: DIFF_COLOR[tool.difficulty] ?? "#8ed5ff", border: `1px solid ${DIFF_COLOR[tool.difficulty] ?? "#8ed5ff"}25` }}>{tool.difficulty}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: `${PRICE_COLOR[tool.pricingCategory] ?? "#8ed5ff"}15`, color: PRICE_COLOR[tool.pricingCategory] ?? "#8ed5ff", border: `1px solid ${PRICE_COLOR[tool.pricingCategory] ?? "#8ed5ff"}25` }}>{tool.pricingCategory}</span>
                  </div>
                </div>
                <p className="text-xs text-start leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{tool.whatItIs}</p>
                <div className="flex justify-end">{open ? <ChevronUp size={14} style={{ color: "var(--color-on-surface-variant)" }} /> : <ChevronDown size={14} style={{ color: "var(--color-on-surface-variant)" }} />}</div>
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-5 pb-5 space-y-4" style={{ borderTop: "1px solid var(--color-outline-variant)" }}>
                      <div className="grid grid-cols-2 gap-3 pt-4">
                        <div>
                          <p className="text-xs font-semibold mb-2 flex items-center gap-1" style={{ color: "#4ade80" }}><CheckCircle2 size={11} /> المزايا</p>
                          {tool.pros.map((p, i) => <p key={i} className="text-[10px] mb-1" style={{ color: "var(--color-on-surface-variant)" }}>• {p}</p>)}
                        </div>
                        <div>
                          <p className="text-xs font-semibold mb-2 flex items-center gap-1" style={{ color: "#f87171" }}><XCircle size={11} /> العيوب</p>
                          {tool.cons.map((c, i) => <p key={i} className="text-[10px] mb-1" style={{ color: "var(--color-on-surface-variant)" }}>• {c}</p>)}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold mb-2" style={{ color: "#8ed5ff" }}>أفضل حالات الاستخدام</p>
                        <div className="flex flex-wrap gap-1.5">
                          {tool.bestUseCases.map((u, i) => <span key={i} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(142,213,255,0.08)", color: "#8ed5ff", border: "1px solid rgba(142,213,255,0.15)" }}>{u}</span>)}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold mb-2" style={{ color: "var(--color-on-surface)" }}>متى تستخدمها</p>
                        {tool.whenToUse.map((w, i) => <p key={i} className="text-[10px] mb-1 flex gap-1.5" style={{ color: "var(--color-on-surface-variant)" }}><span style={{ color: "#4ade80" }}>✓</span>{w}</p>)}
                      </div>

                      <div className="text-xs rounded-xl p-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-outline-variant)" }}>
                        <span className="font-semibold" style={{ color: "#f59e0b" }}>دعم العربية: </span>
                        <span style={{ color: "var(--color-on-surface-variant)" }}>{tool.arabicSupport}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      {filtered.length === 0 && <div className="text-center py-16 opacity-50"><p style={{ color: "var(--color-on-surface-variant)" }}>لا توجد نتائج مطابقة</p></div>}
    </div>
  );
}
