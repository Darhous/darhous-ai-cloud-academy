"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import CategoryFilter from "@/components/ui/CategoryFilter";
import PromptCard from "@/components/cards/PromptCard";
import { prompts, promptCategories } from "@/data/prompts";

export default function PromptsClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = prompts.filter((p) =>
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
        categories={promptCategories}
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
