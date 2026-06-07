"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import CategoryFilter from "@/components/ui/CategoryFilter";
import GlossaryCard from "@/components/cards/GlossaryCard";
import { glossaryTerms, glossaryCategories, type GlossaryTerm } from "@/data/glossary";

interface Props {
  locale: string;
  dbTerms: GlossaryTerm[];
}

export default function GlossaryClient({ locale, dbTerms }: Props) {
  const isAr = locale === "ar";
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Merge: DB terms first, then static — deduplicate by id
  const allTerms = useMemo(() => {
    const seen = new Set<string>();
    const merged: GlossaryTerm[] = [];
    for (const t of [...dbTerms, ...glossaryTerms]) {
      if (!seen.has(t.id)) {
        seen.add(t.id);
        merged.push(t);
      }
    }
    return merged;
  }, [dbTerms]);

  const categories = useMemo(
    () => [...new Set([...glossaryCategories, ...dbTerms.map((t) => t.category)])],
    [dbTerms],
  );

  const filtered = allTerms.filter((t) => {
    const q = search.toLowerCase();
    const textMatch =
      !search ||
      t.term.toLowerCase().includes(q) ||
      t.definitionEn.toLowerCase().includes(q) ||
      t.definitionAr.includes(search);
    const catMatch = activeCategory === "all" || t.category === activeCategory;
    return textMatch && catMatch;
  });

  return (
    <div className="container-xl py-16 flex flex-col gap-12">
      <div className="text-center">
        <SectionHeader
          badge={isAr ? "المسرد" : "Glossary"}
          title={isAr ? "مسرد الذكاء الاصطناعي والكلاود" : "AI & Cloud Glossary"}
          subtitle={isAr
            ? "تعريفات واضحة وعملية لكل مصطلح في منظومة الذكاء الاصطناعي والكلاود"
            : "Clear, practical definitions for every AI and Cloud term"}
        />
      </div>

      <div
        className="flex items-center gap-3 px-5 py-3 rounded-2xl max-w-xl mx-auto w-full"
        style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)" }}
      >
        <Search size={18} style={{ color: "var(--color-on-surface-variant)" }} />
        <input
          type="text"
          placeholder={isAr ? "ابحث عن مصطلح..." : "Search terms..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm font-mono"
          style={{ color: "var(--color-on-surface)" }}
        />
        {search && (
          <button onClick={() => setSearch("")} className="text-xs font-mono" style={{ color: "var(--color-outline)" }}>
            ✕
          </button>
        )}
      </div>

      <CategoryFilter
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
        allLabel={isAr ? "جميع الفئات" : "All Categories"}
      />

      <p className="font-mono text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
        {isAr ? `عرض ${filtered.length} مصطلح` : `Showing ${filtered.length} terms`}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((term) => (
          <GlossaryCard key={term.id} term={term} locale={locale} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">📖</p>
          <p style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "لا توجد مصطلحات مطابقة" : "No matching terms"}
          </p>
        </div>
      )}
    </div>
  );
}
