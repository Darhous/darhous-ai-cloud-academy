"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search, BookOpen, Wrench, FolderGit2, FileText, BookMarked, X, Sparkles, Zap, Map } from "lucide-react";
import { courses } from "@/data/courses";
import { tools } from "@/data/tools";
import { projects } from "@/data/projects";
import { prompts } from "@/data/prompts";
import { blogPosts } from "@/data/blog";
import { glossaryTerms } from "@/data/glossary";

interface SearchItem {
  id: string;
  title: string;
  description: string;
  type: "course" | "tool" | "project" | "prompt" | "blog" | "glossary" | "page";
  href: string;
  icon: string;
}

const typeConfig = {
  course:   { labelAr: "دورة",        labelEn: "Course",    icon: <BookOpen size={14} />,   color: "var(--color-primary)" },
  tool:     { labelAr: "أداة",         labelEn: "Tool",      icon: <Wrench size={14} />,     color: "var(--color-tertiary)" },
  project:  { labelAr: "مشروع",        labelEn: "Project",   icon: <FolderGit2 size={14} />, color: "#4ade80" },
  prompt:   { labelAr: "مطالبة",       labelEn: "Prompt",    icon: <FileText size={14} />,   color: "var(--color-secondary)" },
  blog:     { labelAr: "مقال",         labelEn: "Article",   icon: <FileText size={14} />,   color: "#f59e0b" },
  glossary: { labelAr: "مصطلح",        labelEn: "Term",      icon: <BookMarked size={14} />, color: "var(--color-outline)" },
  page:     { labelAr: "صفحة",         labelEn: "Page",      icon: <Sparkles size={14} />,   color: "var(--color-primary)" },
};

function buildPageItems(locale: string): SearchItem[] {
  const isAr = locale === "ar";
  return [
    { id: "mentor",              type: "page" as const, title: isAr ? "✨ مرشد AI"               : "✨ AI Mentor",              description: isAr ? "مساعد AI الشخصي"            : "Personal AI assistant",         href: `/${locale}/mentor`,              icon: "✨" },
    { id: "prompt-studio",       type: "page" as const, title: isAr ? "⚡ استوديو البرومبتات"    : "⚡ Prompt Studio",           description: isAr ? "تحسين البرومبتات بـ AI"     : "Improve prompts with AI",        href: `/${locale}/prompt-studio`,       icon: "⚡" },
    { id: "claude-code-gen",     type: "page" as const, title: isAr ? "🛠️ مولّد برومبت Claude Code" : "🛠️ Claude Code Generator", description: isAr ? "إنشاء برومبتات Claude Code" : "Generate Claude Code prompts",    href: `/${locale}/claude-code-generator`, icon: "🛠️" },
    { id: "tool-recommender",    type: "page" as const, title: isAr ? "🔎 مرشّح الأدوات"         : "🔎 Tool Recommender",        description: isAr ? "اكتشف أفضل أداة لهدفك"     : "Find the best tool for your goal", href: `/${locale}/tool-recommender`,    icon: "🔎" },
    { id: "roadmap-generator",   type: "page" as const, title: isAr ? "🗺️ مولّد خطط التعلم"     : "🗺️ Roadmap Generator",       description: isAr ? "خطة تعلم مخصصة بالذكاء"    : "AI-personalized learning roadmap", href: `/${locale}/roadmap-generator`,   icon: "🗺️" },
    { id: "nano-banana",         type: "page" as const, title: isAr ? "🍌 Nano Banana Lab"       : "🍌 Nano Banana Lab",          description: isAr ? "برومبتات صور Gemini Nano Banana" : "Gemini Nano Banana image prompts", href: `/${locale}/nano-banana-prompts`, icon: "🍌" },
    { id: "dashboard",           type: "page" as const, title: isAr ? "📂 لوحة الطالب"          : "📂 Student Dashboard",        description: isAr ? "تقدمك وبرومبتاتك المحفوظة" : "Progress and saved items",          href: `/${locale}/dashboard`,           icon: "📂" },
    { id: "login",               type: "page" as const, title: isAr ? "🔐 تسجيل الدخول"         : "🔐 Sign In",                  description: isAr ? "الدخول إلى حسابك"           : "Sign in to your account",          href: `/${locale}/login`,               icon: "🔐" },
    { id: "register",            type: "page" as const, title: isAr ? "✍️ إنشاء حساب"           : "✍️ Create Account",            description: isAr ? "إنشاء حساب جديد مجانًا"    : "Create a free account",            href: `/${locale}/register`,            icon: "✍️" },
  ];
}

function buildIndex(locale: string): SearchItem[] {
  const isAr = locale === "ar";
  const items: SearchItem[] = [
    ...buildPageItems(locale),
    ...courses.map((c) => ({
      id: c.id, type: "course" as const,
      title: isAr ? c.titleAr : c.titleEn,
      description: isAr ? c.descriptionAr : c.descriptionEn,
      href: `/${locale}/courses/${c.id}`,
      icon: c.icon,
    })),
    ...tools.map((t) => ({
      id: t.id, type: "tool" as const,
      title: t.name,
      description: isAr ? t.shortDescriptionAr : t.shortDescriptionEn,
      href: `/${locale}/tools/${t.id}`,
      icon: "🛠️",
    })),
    ...projects.map((p) => ({
      id: p.id, type: "project" as const,
      title: isAr ? p.titleAr : p.titleEn,
      description: isAr ? p.descriptionAr : p.descriptionEn,
      href: `/${locale}/projects/${p.id}`,
      icon: p.icon,
    })),
    ...prompts.map((p) => ({
      id: p.id, type: "prompt" as const,
      title: isAr ? p.titleAr : p.titleEn,
      description: isAr ? p.useCaseAr : p.useCaseEn,
      href: `/${locale}/prompts`,
      icon: "📝",
    })),
    ...blogPosts.map((b) => ({
      id: b.id, type: "blog" as const,
      title: isAr ? b.titleAr : b.titleEn,
      description: isAr ? b.excerptAr : b.excerptEn,
      href: `/${locale}/blog/${b.id}`,
      icon: b.icon,
    })),
    ...glossaryTerms.map((g) => ({
      id: g.id, type: "glossary" as const,
      title: g.term,
      description: isAr ? g.definitionAr : g.definitionEn,
      href: `/${locale}/glossary`,
      icon: "📖",
    })),
  ];
  return items;
}

interface CommandPaletteProps {
  locale: string;
}

export default function CommandPalette({ locale }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const isAr = locale === "ar";

  const allItems = useRef<SearchItem[]>([]);
  const fuse = useRef<Fuse<SearchItem> | null>(null);

  useEffect(() => {
    allItems.current = buildIndex(locale);
    fuse.current = new Fuse(allItems.current, {
      keys: ["title", "description"],
      threshold: 0.35,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }, [locale]);

  const openPalette = useCallback(() => {
    setOpen(true);
    setQuery("");
    setResults(allItems.current.slice(0, 8));
    setActiveIndex(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        open ? closePalette() : openPalette();
      }
      if (e.key === "Escape") closePalette();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, openPalette, closePalette]);

  function handleSearch(q: string) {
    setQuery(q);
    setActiveIndex(0);
    if (!q.trim()) {
      setResults(allItems.current.slice(0, 8));
      return;
    }
    const found = fuse.current?.search(q).slice(0, 12).map((r) => r.item) ?? [];
    setResults(found);
  }

  function navigate(item: SearchItem) {
    router.push(item.href);
    closePalette();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, results.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && results[activeIndex]) navigate(results[activeIndex]);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && closePalette()}
    >
      <div
        className="w-full max-w-2xl rounded-2xl overflow-hidden"
        style={{
          background: "rgba(17,19,24,0.97)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(142,213,255,0.15)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(142,213,255,0.05)",
        }}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <Search size={18} style={{ color: "var(--color-on-surface-variant)", flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={isAr ? "ابحث في الدورات والأدوات والمشاريع..." : "Search courses, tools, projects..."}
            className="flex-1 bg-transparent outline-none text-base"
            style={{ color: "var(--color-on-surface)", direction: isAr ? "rtl" : "ltr" }}
          />
          <button onClick={closePalette} className="p-1 rounded hover:opacity-70 flex-shrink-0"
            style={{ color: "var(--color-on-surface-variant)" }}>
            <X size={16} />
          </button>
          <kbd className="hidden sm:flex items-center px-2 py-0.5 rounded text-xs font-mono flex-shrink-0"
            style={{ background: "var(--color-surface-container-high)", color: "var(--color-on-surface-variant)", border: "1px solid var(--color-outline-variant)" }}>
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto">
          {results.length === 0 ? (
            <div className="py-12 text-center" style={{ color: "var(--color-on-surface-variant)" }}>
              <p className="text-3xl mb-2">🔍</p>
              <p className="text-sm font-mono">{isAr ? "لا نتائج لـ" : "No results for"} &quot;{query}&quot;</p>
            </div>
          ) : (
            <ul>
              {results.map((item, i) => {
                const cfg = typeConfig[item.type];
                const isActive = i === activeIndex;
                return (
                  <li key={`${item.type}-${item.id}`}>
                    <button
                      onClick={() => navigate(item)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className="w-full text-start px-5 py-3.5 flex items-center gap-4 transition-colors"
                      style={{
                        background: isActive ? "rgba(142,213,255,0.06)" : "transparent",
                        borderLeft: isActive && !isAr ? `2px solid var(--color-primary)` : "2px solid transparent",
                        borderRight: isActive && isAr ? `2px solid var(--color-primary)` : "2px solid transparent",
                      }}
                    >
                      {/* Icon */}
                      <span className="text-xl flex-shrink-0 w-7 text-center">{item.icon}</span>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate" style={{ color: isActive ? "var(--color-primary)" : "var(--color-on-surface)" }}>
                          {item.title}
                        </p>
                        <p className="text-xs truncate mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
                          {item.description}
                        </p>
                      </div>
                      {/* Type badge */}
                      <span
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono flex-shrink-0"
                        style={{ background: "var(--color-surface-container-high)", color: cfg.color }}
                      >
                        {cfg.icon}
                        {isAr ? cfg.labelAr : cfg.labelEn}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div
          className="px-5 py-3 flex items-center justify-between text-xs font-mono border-t"
          style={{ borderColor: "rgba(255,255,255,0.05)", color: "var(--color-on-surface-variant)" }}
        >
          <div className="flex items-center gap-4">
            <span>↑↓ {isAr ? "تنقل" : "navigate"}</span>
            <span>↵ {isAr ? "اختيار" : "select"}</span>
          </div>
          <span>{results.length} {isAr ? "نتيجة" : "results"}</span>
        </div>
      </div>
    </div>
  );
}
