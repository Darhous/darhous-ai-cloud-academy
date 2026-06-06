"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Clock, Search, X } from "lucide-react";
import type { Lesson } from "@/data/iot/lessons";

interface Props {
  lessons: Lesson[];
  locale: string;
}

export default function IotLessonsClient({ lessons, locale }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(lessons.map((l) => l.category)))],
    [lessons]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return lessons.filter((l) => {
      const matchCat = activeCategory === "all" || l.category === activeCategory;
      const matchSearch = !q || l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [lessons, search, activeCategory]);

  const grouped = useMemo(
    () =>
      filtered.reduce<Record<string, Lesson[]>>((acc, l) => {
        if (!acc[l.category]) acc[l.category] = [];
        acc[l.category].push(l);
        return acc;
      }, {}),
    [filtered]
  );

  return (
    <div>
      {/* Search + category filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-on-surface-variant)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث في الدروس..."
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
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1.5 rounded-xl text-xs font-mono transition-all"
              style={{
                background: activeCategory === cat ? "var(--portal-color-subtle)" : "var(--color-surface-container)",
                color: activeCategory === cat ? "var(--portal-color)" : "var(--color-on-surface-variant)",
                border: activeCategory === cat ? "1px solid var(--portal-color-glow)" : "1px solid var(--color-outline-variant)",
              }}
            >
              {cat === "all" ? `الكل (${lessons.length})` : cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-center py-12" style={{ color: "var(--color-on-surface-variant)" }}>
          لا توجد نتائج مطابقة
        </p>
      ) : (
        <div className="space-y-10">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
                <span className="w-2 h-6 rounded-full" style={{ background: "var(--portal-color)" }} />
                {category}
                <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>({items.length} درس)</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/${locale}/iot-lab/lessons/${lesson.id}`}
                    className="glass-card rounded-2xl p-5 flex flex-col gap-3 transition-all hover:-translate-y-0.5"
                    style={{ border: "1px solid var(--portal-color-border)", textDecoration: "none" }}
                  >
                    <h3 className="font-semibold text-sm leading-snug" style={{ color: "var(--color-on-surface)" }}>{lesson.title}</h3>
                    <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--color-on-surface-variant)" }}>{lesson.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-[10px] font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                        <Clock size={10} />{lesson.duration}
                      </span>
                      <span className="text-[10px] font-mono" style={{ color: "var(--portal-color)" }}>→ قراءة الدرس</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
