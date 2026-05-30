"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import CategoryFilter from "@/components/ui/CategoryFilter";
import ToolCard from "@/components/cards/ToolCard";
import { tools, toolCategories, toolStacks } from "@/data/tools";

export default function ToolsClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = tools.filter((t) => {
    const catMatch = activeCategory === "all" || t.category === activeCategory;
    const q = search.toLowerCase();
    const textMatch =
      !search ||
      t.name.toLowerCase().includes(q) ||
      t.shortDescriptionEn.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.includes(q));
    return catMatch && textMatch;
  });

  const featured = tools.filter((t) => t.featured).slice(0, 6);

  return (
    <div className="container-xl py-16 flex flex-col gap-12">
      <div className="text-center">
        <SectionHeader
          badge={isAr ? "مركز الأدوات" : "Tools Hub"}
          title={isAr ? "مركز أدوات الذكاء الاصطناعي" : "AI Tools Command Center"}
          subtitle={isAr
            ? "مركز القيادة النهائي لاكتشاف ومقارنة وإتقان أدوات الذكاء الاصطناعي"
            : "The ultimate command center for discovering, comparing, and mastering AI tools"}
        />
      </div>

      {/* Search */}
      <div
        className="flex items-center gap-3 px-5 py-3 rounded-2xl max-w-2xl mx-auto w-full"
        style={{ background: "var(--color-surface-container)", border: "1px solid var(--color-outline-variant)" }}
      >
        <Search size={18} style={{ color: "var(--color-on-surface-variant)" }} />
        <input
          type="text"
          placeholder={isAr ? "ابحث عن أداة..." : "Search tools..."}
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

      {/* Featured */}
      {!search && activeCategory === "all" && (
        <div>
          <h2 className="font-display font-bold text-2xl mb-6 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
            <span style={{ color: "var(--color-tertiary)" }}>⭐</span>
            {isAr ? "الأدوات المميزة" : "Featured Tools"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((tool) => (
              <ToolCard key={tool.id} tool={tool} locale={locale} />
            ))}
          </div>
        </div>
      )}

      {/* Category filter */}
      <div>
        <p className="font-mono text-xs mb-3" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "الفئة:" : "Category:"}
        </p>
        <CategoryFilter
          categories={toolCategories}
          active={activeCategory}
          onChange={setActiveCategory}
          allLabel={isAr ? "جميع الأدوات" : "All Tools"}
        />
      </div>

      <p className="font-mono text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
        {isAr ? `عرض ${filtered.length} أداة` : `Showing ${filtered.length} tools`}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((tool) => (
          <ToolCard key={tool.id} tool={tool} locale={locale} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "لا توجد أدوات مطابقة" : "No matching tools"}
          </p>
        </div>
      )}

      {/* Recommended stacks */}
      <div>
        <h2 className="font-display font-bold text-2xl mb-8 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
          <span>🎯</span>
          {isAr ? "مجموعات الأدوات الموصى بها" : "Recommended Tool Stacks"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolStacks.map((stack) => (
            <div
              key={stack.id}
              className="glass-card rounded-2xl p-6 flex flex-col gap-4 glow-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{stack.icon}</span>
                <div>
                  <h3 className="font-display font-semibold text-base" style={{ color: "var(--color-on-surface)" }}>
                    {isAr ? stack.titleAr : stack.titleEn}
                  </h3>
                  <p className="text-xs mt-1" style={{ color: "var(--color-on-surface-variant)" }}>
                    {isAr ? stack.descriptionAr : stack.descriptionEn}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {stack.tools.map((toolId) => {
                  const t = tools.find((x) => x.id === toolId);
                  return t ? (
                    <span
                      key={toolId}
                      className="px-2.5 py-1 rounded-full text-xs font-mono border"
                      style={{
                        background: "var(--color-surface-container)",
                        borderColor: "var(--color-outline-variant)",
                        color: "var(--color-primary)",
                      }}
                    >
                      {t.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
