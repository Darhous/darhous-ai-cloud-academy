"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Clock, Search, X } from "lucide-react";
import type { Project } from "@/data/iot/projects";

const DIFF_COLOR: Record<string, string> = { سهل: "#4ade80", متوسط: "#f59e0b", صعب: "#f87171", تخرج: "#d0bcff" };
const ORDER = ["سهل", "متوسط", "صعب", "تخرج"];

interface Props {
  projects: Project[];
  locale: string;
}

export default function IotProjectsClient({ projects, locale }: Props) {
  const [search, setSearch] = useState("");
  const [activeDiff, setActiveDiff] = useState<string>("all");

  const difficulties = useMemo(
    () => ["all", ...Array.from(new Set(projects.map((p) => p.difficulty))).sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b))],
    [projects]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return projects.filter((p) => {
      const matchDiff = activeDiff === "all" || p.difficulty === activeDiff;
      const matchSearch = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return matchDiff && matchSearch;
    });
  }, [projects, search, activeDiff]);

  const grouped = useMemo(
    () =>
      filtered.reduce<Record<string, Project[]>>((acc, p) => {
        if (!acc[p.difficulty]) acc[p.difficulty] = [];
        acc[p.difficulty].push(p);
        return acc;
      }, {}),
    [filtered]
  );

  const sortedEntries = Object.entries(grouped).sort(([a], [b]) => ORDER.indexOf(a) - ORDER.indexOf(b));

  return (
    <div>
      {/* Search + difficulty filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-on-surface-variant)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث في المشاريع..."
            className="w-full pr-9 pl-9 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface)" }}
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-on-surface-variant)" }}>
              <X size={13} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {difficulties.map((diff) => {
            const color = DIFF_COLOR[diff] ?? "#f97316";
            return (
              <button
                key={diff}
                onClick={() => setActiveDiff(diff)}
                className="px-3 py-1.5 rounded-xl text-xs font-mono transition-all"
                style={{
                  background: activeDiff === diff ? `${color}15` : "var(--color-surface-container)",
                  color: activeDiff === diff ? color : "var(--color-on-surface-variant)",
                  border: activeDiff === diff ? `1px solid ${color}30` : "1px solid var(--color-outline-variant)",
                }}
              >
                {diff === "all" ? `الكل (${projects.length})` : diff}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-center py-12" style={{ color: "var(--color-on-surface-variant)" }}>
          لا توجد نتائج مطابقة
        </p>
      ) : (
        <div className="space-y-10">
          {sortedEntries.map(([difficulty, items]) => {
            const color = DIFF_COLOR[difficulty] ?? "#f97316";
            return (
              <div key={difficulty}>
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
                  <span className="w-2 h-6 rounded-full" style={{ background: color }} />
                  مستوى {difficulty}
                  <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>({items.length} مشروع)</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((proj) => (
                    <Link
                      key={proj.id}
                      href={`/${locale}/iot-lab/projects/${proj.id}`}
                      className="glass-card rounded-2xl p-5 flex flex-col gap-3 transition-all hover:-translate-y-0.5"
                      style={{ border: `1px solid ${color}15`, textDecoration: "none" }}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: `${color}12`, color, border: `1px solid ${color}20` }}>{proj.category}</span>
                        <span className="flex items-center gap-1 text-[10px]" style={{ color: "var(--color-on-surface-variant)" }}><Clock size={9} />{proj.duration}</span>
                      </div>
                      <h3 className="font-semibold text-sm" style={{ color: "var(--color-on-surface)" }}>{proj.title}</h3>
                      <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--color-on-surface-variant)" }}>{proj.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {proj.components.slice(0, 3).map((c, i) => (
                          <span key={i} className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-on-surface-variant)" }}>{c}</span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
