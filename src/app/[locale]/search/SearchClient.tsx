"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { Search, BookOpen, Wrench, Code, FileText, Zap, Banana, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import type { SearchResult } from "@/app/api/search/route";

const typeIcons: Record<string, React.ReactNode> = {
  course: <BookOpen size={14} />,
  tool: <Wrench size={14} />,
  project: <Code size={14} />,
  blog: <FileText size={14} />,
  prompt: <Zap size={14} />,
  nano_banana: <Banana size={14} />,
};

const typeColors: Record<string, string> = {
  course: "#8ed5ff",
  tool: "#a78bfa",
  project: "#4ade80",
  blog: "#fb923c",
  prompt: "#fbbf24",
  nano_banana: "#f9a8d4",
};

const typeLabels: Record<string, { ar: string; en: string }> = {
  course: { ar: "دورة", en: "Course" },
  tool: { ar: "أداة", en: "Tool" },
  project: { ar: "مشروع", en: "Project" },
  blog: { ar: "مقالة", en: "Blog" },
  prompt: { ar: "برومبت", en: "Prompt" },
  nano_banana: { ar: "Nano Banana", en: "Nano Banana" },
};

export default function SearchClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [activeType, setActiveType] = useState("all");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const doSearch = useCallback(async (q: string, type: string) => {
    if (!q.trim() || q.trim().length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&locale=${locale}&type=${type}&limit=30`);
      const data = await res.json();
      setResults(data.results ?? []);
      setTotal(data.total ?? 0);
      setSearched(true);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [locale]);

  function handleInput(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(value, activeType), 350);
  }

  function handleTypeChange(type: string) {
    setActiveType(type);
    doSearch(query, type);
  }

  const types = ["all", "course", "tool", "project", "blog", "prompt", "nano_banana"];
  const typeLabelsMap: Record<string, { ar: string; en: string }> = {
    all: { ar: "الكل", en: "All" },
    ...typeLabels,
  };

  return (
    <div className="container-xl py-12 flex flex-col gap-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(142,213,255,0.1)", border: "1px solid rgba(142,213,255,0.2)", color: "var(--color-primary)" }}>
          <Search size={12} /> {isAr ? "البحث الذكي" : "Smart Search"}
        </div>
        <h1 className="font-display font-bold text-4xl md:text-5xl mb-3" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "ابحث في المنصة" : "Search the Platform"}
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "دورات، أدوات، مشاريع، مدونة، برومبتات، وNano Banana في مكان واحد" : "Courses, tools, projects, blog, prompts, and Nano Banana in one place"}
        </p>
      </div>

      {/* Search input */}
      <div className="max-w-2xl mx-auto w-full">
        <div className="relative">
          <Search size={20} className="absolute top-1/2 -translate-y-1/2 start-4" style={{ color: "var(--color-on-surface-variant)" }} />
          <input
            type="text"
            value={query}
            onChange={(e) => handleInput(e.target.value)}
            placeholder={isAr ? "ابحث عن أي شيء..." : "Search for anything..."}
            className="w-full rounded-2xl px-12 py-4 text-base outline-none transition-all"
            style={{
              background: "var(--color-surface-container)",
              border: "1px solid var(--color-outline-variant)",
              color: "var(--color-on-surface)",
            }}
            dir={isAr ? "rtl" : "ltr"}
            autoFocus
          />
          {loading && <Loader2 size={18} className="absolute top-1/2 -translate-y-1/2 end-4 animate-spin" style={{ color: "var(--color-primary)" }} />}
        </div>

        {/* Type filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => handleTypeChange(t)}
              className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full transition-all"
              style={{
                background: activeType === t ? "var(--color-primary)" : "var(--color-surface-container)",
                color: activeType === t ? "#fff" : "var(--color-on-surface-variant)",
                border: `1px solid ${activeType === t ? "transparent" : "var(--color-outline-variant)"}`,
              }}
            >
              {t !== "all" && typeIcons[t]}
              {isAr ? typeLabelsMap[t].ar : typeLabelsMap[t].en}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {searched && (
        <div className="max-w-3xl mx-auto w-full">
          <p className="text-xs font-mono mb-4" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? `${total} نتيجة` : `${total} results`}
          </p>

          {results.length === 0 ? (
            <div className="glass-card rounded-2xl p-10 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <p className="font-semibold" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "لا توجد نتائج" : "No results found"}
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? "جرّب كلمات مختلفة أو تصفّح التصنيفات" : "Try different words or browse categories"}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {results.map((r) => (
                <Link
                  key={`${r.type}-${r.id}`}
                  href={r.href}
                  className="glass-card rounded-2xl p-4 flex items-start gap-4 hover:scale-[1.01] transition-transform"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${typeColors[r.type]}15`, color: typeColors[r.type] }}
                  >
                    {typeIcons[r.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: `${typeColors[r.type]}15`, color: typeColors[r.type] }}>
                        {isAr ? typeLabelsMap[r.type]?.ar : typeLabelsMap[r.type]?.en}
                      </span>
                    </div>
                    <p className="font-semibold text-sm truncate" style={{ color: "var(--color-on-surface)" }}>
                      {isAr ? r.titleAr : r.titleEn}
                    </p>
                    <p className="text-xs truncate mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
                      {isAr ? r.descriptionAr : r.descriptionEn}
                    </p>
                  </div>
                  <Arrow size={14} className="flex-shrink-0 mt-1" style={{ color: "var(--color-on-surface-variant)" }} />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Default state */}
      {!searched && (
        <div className="max-w-2xl mx-auto w-full grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { href: `/${locale}/courses`, icon: "📚", labelAr: "الدورات", labelEn: "Courses" },
            { href: `/${locale}/tools`, icon: "🛠️", labelAr: "الأدوات", labelEn: "Tools" },
            { href: `/${locale}/projects`, icon: "🚀", labelAr: "المشاريع", labelEn: "Projects" },
            { href: `/${locale}/blog`, icon: "📰", labelAr: "المدونة", labelEn: "Blog" },
            { href: `/${locale}/prompts`, icon: "⚡", labelAr: "البرومبتات", labelEn: "Prompts" },
            { href: `/${locale}/nano-banana-prompts`, icon: "🍌", labelAr: "Nano Banana", labelEn: "Nano Banana" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="glass-card rounded-2xl p-5 text-center hover:scale-105 transition-transform">
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-sm font-medium" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? item.labelAr : item.labelEn}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
