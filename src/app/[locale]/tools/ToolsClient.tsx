"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import CategoryFilter from "@/components/ui/CategoryFilter";
import ToolCard from "@/components/cards/ToolCard";
import { tools, toolCategories, toolStacks, type Tool } from "@/data/tools";

interface Props {
  locale: string;
  dbTools: Tool[];
}

export default function ToolsClient({ locale, dbTools }: Props) {
  const isAr = locale === "ar";
  const shouldReduce = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  // Merge: DB tools first, then static — deduplicate by id
  const allTools = useMemo(() => {
    const seen = new Set<string>();
    const merged: Tool[] = [];
    for (const t of [...dbTools, ...tools]) {
      if (!seen.has(t.id)) {
        seen.add(t.id);
        merged.push(t);
      }
    }
    return merged;
  }, [dbTools]);

  const categories = useMemo(
    () => [...new Set([...toolCategories, ...dbTools.map((t) => t.category)])],
    [dbTools],
  );

  // Phase 11: AI Tools Hub — scroll-reveal & focus polish (style/wrapper-only;
  // mirrors the fadeUp/stagger convention already used across landing sections, e.g. PortalGrid)
  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 24 },
    show:   { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.15 : 0.55, ease: [0.0, 0.0, 0.2, 1] as const } },
  };
  const gridContainer = {
    hidden: {},
    show: { transition: { staggerChildren: shouldReduce ? 0 : 0.05 } },
  };
  const gridItem = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 18 },
    show:   { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.15 : 0.4, ease: [0.0, 0.0, 0.2, 1] as const } },
  };

  const filtered = allTools.filter((t) => {
    const catMatch = activeCategory === "all" || t.category === activeCategory;
    const q = search.toLowerCase();
    const textMatch =
      !search ||
      t.name.toLowerCase().includes(q) ||
      t.shortDescriptionEn.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.includes(q));
    return catMatch && textMatch;
  });

  const featured = allTools.filter((t) => t.featured).slice(0, 6);

  return (
    <div className="container-xl py-16 flex flex-col gap-12">
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
        className="text-center"
      >
        <SectionHeader
          badge={isAr ? "مركز الأدوات" : "Tools Hub"}
          title={isAr ? "مركز أدوات الذكاء الاصطناعي" : "AI Tools Command Center"}
          subtitle={isAr
            ? "مركز القيادة النهائي لاكتشاف ومقارنة وإتقان أدوات الذكاء الاصطناعي"
            : "The ultimate command center for discovering, comparing, and mastering AI tools"}
        />
      </motion.div>

      {/* Search — Phase 11: animated focus glow (style-only; same input/handlers/logic) */}
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="flex items-center gap-3 px-5 py-3 rounded-2xl max-w-2xl mx-auto w-full transition-all duration-300"
        style={{
          background: "var(--color-surface-container)",
          border: `1px solid ${searchFocused ? "var(--color-primary)" : "var(--color-outline-variant)"}`,
          boxShadow: searchFocused
            ? "0 0 0 4px rgba(142,213,255,0.1), 0 8px 28px rgba(142,213,255,0.1)"
            : "0 0 0 0px rgba(142,213,255,0)",
        }}
      >
        <Search
          size={18}
          style={{ color: searchFocused ? "var(--color-primary)" : "var(--color-on-surface-variant)", transition: "color 200ms ease" }}
        />
        <input
          type="text"
          placeholder={isAr ? "ابحث عن أداة..." : "Search tools..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="flex-1 bg-transparent outline-none text-sm font-mono"
          style={{ color: "var(--color-on-surface)" }}
        />
        {search && (
          <button onClick={() => setSearch("")} className="text-xs font-mono" style={{ color: "var(--color-outline)" }}>
            ✕
          </button>
        )}
      </motion.div>

      {/* Featured */}
      {!search && activeCategory === "all" && (
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}>
          <h2 className="font-display font-bold text-2xl mb-6 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
            <span style={{ color: "var(--color-tertiary)" }}>⭐</span>
            {isAr ? "الأدوات المميزة" : "Featured Tools"}
          </h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={gridContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
          >
            {featured.map((tool) => (
              <motion.div key={tool.id} variants={gridItem}>
                <ToolCard tool={tool} locale={locale} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Category filter */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <p className="font-mono text-xs mb-3" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "الفئة:" : "Category:"}
        </p>
        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
          allLabel={isAr ? "جميع الأدوات" : "All Tools"}
        />
      </motion.div>

      {/* Live result count — Phase 11: gentle crossfade when the count changes (same text/content) */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={filtered.length}
          initial={shouldReduce ? false : { opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 5 }}
          transition={{ duration: shouldReduce ? 0.1 : 0.22, ease: [0.0, 0.0, 0.2, 1] }}
          className="font-mono text-sm"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          {isAr ? `عرض ${filtered.length} أداة` : `Showing ${filtered.length} tools`}
        </motion.p>
      </AnimatePresence>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        variants={gridContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
      >
        {filtered.map((tool) => (
          <motion.div key={tool.id} variants={gridItem}>
            <ToolCard tool={tool} locale={locale} />
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <motion.div
          initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0.1 : 0.35, ease: [0.0, 0.0, 0.2, 1] }}
          className="text-center py-20"
        >
          <p className="text-4xl mb-4">🔍</p>
          <p style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "لا توجد أدوات مطابقة" : "No matching tools"}
          </p>
        </motion.div>
      )}

      {/* Recommended stacks */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}>
        <h2 className="font-display font-bold text-2xl mb-8 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
          <span>🎯</span>
          {isAr ? "مجموعات الأدوات الموصى بها" : "Recommended Tool Stacks"}
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={gridContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
        >
          {toolStacks.map((stack) => (
            <motion.div
              key={stack.id}
              variants={gridItem}
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
                  const t = allTools.find((x) => x.id === toolId);
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
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
