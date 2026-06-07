"use client";

import { useState, useMemo } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import CategoryFilter from "@/components/ui/CategoryFilter";
import PromptCard from "@/components/cards/PromptCard";
import { prompts, promptCategories, type Prompt } from "@/data/prompts";

interface Props {
  locale: string;
  dbPrompts: Prompt[];
}

export default function PromptsClient({ locale, dbPrompts }: Props) {
  const isAr = locale === "ar";
  const [activeCategory, setActiveCategory] = useState("all");

  // Merge: DB prompts first, then static — deduplicate by id
  const allPrompts = useMemo(() => {
    const seen = new Set<string>();
    const merged: Prompt[] = [];
    for (const p of [...dbPrompts, ...prompts]) {
      if (!seen.has(p.id)) {
        seen.add(p.id);
        merged.push(p);
      }
    }
    return merged;
  }, [dbPrompts]);

  const categories = useMemo(
    () => [...new Set([...promptCategories, ...dbPrompts.map((p) => p.category)])],
    [dbPrompts],
  );

  const filtered = allPrompts.filter((p) =>
    activeCategory === "all" || p.category === activeCategory
  );

  return (
    <div className="container-xl py-16 flex flex-col gap-12">
      <div className="text-center">
        <SectionHeader
          badge={isAr ? "مكتبة المطالبات" : "Prompt Library"}
          title={isAr ? "مخزن المطالبات المتميزة" : "Premium Prompt Vault"}
          subtitle={isAr
            ? "قوالب مطالبات احترافية لـ Claude وGPT وGemini وكل سير عمل"
            : "Professional prompt templates for Claude, GPT, Gemini, and every workflow"}
        />
      </div>

      <CategoryFilter
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
        allLabel={isAr ? "جميع الفئات" : "All Categories"}
      />

      <p className="font-mono text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
        {isAr ? `عرض ${filtered.length} مطالبة` : `Showing ${filtered.length} prompts`}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} locale={locale} />
        ))}
      </div>
    </div>
  );
}
