"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Trophy, Star, Search, X } from "lucide-react";
import type { Challenge } from "@/data/iot/challenges";

const LEVEL_COLOR: Record<string, string> = { مبتدئ: "#4ade80", متوسط: "#f59e0b", صعب: "#f87171" };
const LEVELS = ["مبتدئ", "متوسط", "صعب"] as const;

interface Props {
  challenges: Challenge[];
  locale: string;
}

export default function IotChallengesClient({ challenges, locale }: Props) {
  const [search, setSearch] = useState("");
  const [activeLevel, setActiveLevel] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return challenges.filter((c) => {
      const matchLevel = activeLevel === "all" || c.level === activeLevel;
      const matchSearch = !q || c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
      return matchLevel && matchSearch;
    });
  }, [challenges, search, activeLevel]);

  const grouped = useMemo(
    () =>
      filtered.reduce<Record<string, Challenge[]>>((acc, c) => {
        if (!acc[c.level]) acc[c.level] = [];
        acc[c.level].push(c);
        return acc;
      }, {}),
    [filtered]
  );

  return (
    <div>
      {/* Search + level filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-on-surface-variant)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث في التحديات..."
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
          <button
            onClick={() => setActiveLevel("all")}
            className="px-3 py-1.5 rounded-xl text-xs font-mono transition-all"
            style={{
              background: activeLevel === "all" ? "rgba(142,213,255,0.15)" : "var(--color-surface-container)",
              color: activeLevel === "all" ? "#8ed5ff" : "var(--color-on-surface-variant)",
              border: activeLevel === "all" ? "1px solid rgba(142,213,255,0.3)" : "1px solid var(--color-outline-variant)",
            }}
          >
            الكل ({challenges.length})
          </button>
          {LEVELS.map((level) => {
            const color = LEVEL_COLOR[level];
            return (
              <button
                key={level}
                onClick={() => setActiveLevel(level)}
                className="px-3 py-1.5 rounded-xl text-xs font-mono transition-all"
                style={{
                  background: activeLevel === level ? `${color}15` : "var(--color-surface-container)",
                  color: activeLevel === level ? color : "var(--color-on-surface-variant)",
                  border: activeLevel === level ? `1px solid ${color}30` : "1px solid var(--color-outline-variant)",
                }}
              >
                {level}
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
          {LEVELS.filter((l) => grouped[l]?.length).map((level) => {
            const items = grouped[level] ?? [];
            const color = LEVEL_COLOR[level];
            return (
              <div key={level}>
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
                  <span className="w-2 h-6 rounded-full" style={{ background: color }} />
                  مستوى {level}
                  <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>({items.length} تحدي)</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((ch) => (
                    <Link
                      key={ch.id}
                      href={`/${locale}/iot-lab/challenges/${ch.id}`}
                      className="glass-card rounded-2xl p-5 flex flex-col gap-3 transition-all hover:-translate-y-0.5"
                      style={{ border: `1px solid ${color}15`, textDecoration: "none" }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: `${color}12`, color, border: `1px solid ${color}20` }}>{ch.level}</span>
                        <span className="flex items-center gap-1 text-xs font-mono font-bold" style={{ color }}>
                          <Star size={11} />{ch.xpReward} XP
                        </span>
                      </div>
                      <h3 className="font-semibold text-sm" style={{ color: "var(--color-on-surface)" }}>{ch.title}</h3>
                      <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--color-on-surface-variant)" }}>{ch.description}</p>
                      {ch.badgeId && (
                        <div className="flex items-center gap-1.5 text-[10px] font-mono" style={{ color: "#fbbf24" }}>
                          <Trophy size={10} /> شارة: {ch.badgeId}
                        </div>
                      )}
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
