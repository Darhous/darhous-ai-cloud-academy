"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselItem {
  id: string;
  icon: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  href: string;
  accent: string;
  bg: string;
}

const items: CarouselItem[] = [
  { id: "mentor",       icon: "✨", titleAr: "مرشد NexaLearn الذكي",         titleEn: "NexaLearn AI Mentor",      categoryAr: "AI Mentor",  categoryEn: "AI Mentor",  href: "/mentor",                accent: "#8ed5ff", bg: "rgba(56,189,248,0.08)" },
  { id: "studio",       icon: "⚡", titleAr: "استوديو البرومبتات",         titleEn: "Prompt Studio",          categoryAr: "AI Studio",  categoryEn: "AI Studio",  href: "/prompt-studio",         accent: "#d0bcff", bg: "rgba(208,188,255,0.08)" },
  { id: "claude-code",  icon: "🛠️", titleAr: "مولّد Claude Code",          titleEn: "Claude Code Generator",  categoryAr: "Claude Code", categoryEn: "Claude Code", href: "/claude-code-generator", accent: "#3ce0fb", bg: "rgba(60,224,251,0.08)" },
  { id: "tools-ai",     icon: "🔎", titleAr: "مرشّح الأدوات",               titleEn: "AI Tool Recommender",    categoryAr: "أدوات AI",   categoryEn: "AI Tools",   href: "/tool-recommender",      accent: "#86efac", bg: "rgba(74,222,128,0.08)" },
  { id: "roadmap",      icon: "🗺️", titleAr: "مولّد خطط التعلم",           titleEn: "Roadmap Generator",      categoryAr: "تعلم",       categoryEn: "Learning",   href: "/roadmap-generator",     accent: "#fbbf24", bg: "rgba(251,191,36,0.08)" },
  { id: "claude",       icon: "🤖", titleAr: "إتقان Claude",                titleEn: "Claude Mastery",         categoryAr: "Claude",     categoryEn: "Claude",     href: "/claude",                accent: "#f472b6", bg: "rgba(244,114,182,0.08)" },
  { id: "tools-hub",    icon: "🔧", titleAr: "مركز أدوات AI",               titleEn: "AI Tools Hub",           categoryAr: "أدوات",      categoryEn: "Tools",      href: "/tools",                 accent: "#8ed5ff", bg: "rgba(56,189,248,0.06)" },
  { id: "cloud",        icon: "☁️", titleAr: "أكاديمية الكلاود",            titleEn: "Cloud Academy",          categoryAr: "Cloud",      categoryEn: "Cloud",      href: "/cloud",                 accent: "#3ce0fb", bg: "rgba(60,224,251,0.06)" },
  { id: "projects",     icon: "🏗️", titleAr: "مكتبة المشاريع",             titleEn: "Projects Library",       categoryAr: "مشاريع",     categoryEn: "Projects",   href: "/projects",              accent: "#d0bcff", bg: "rgba(208,188,255,0.06)" },
  { id: "prompts",      icon: "📋", titleAr: "مكتبة البرومبتات",            titleEn: "Prompt Library",         categoryAr: "برومبتات",   categoryEn: "Prompts",    href: "/prompts",               accent: "#86efac", bg: "rgba(74,222,128,0.06)" },
  { id: "paths",        icon: "🎯", titleAr: "مسارات التعلم",               titleEn: "Learning Paths",         categoryAr: "مسارات",     categoryEn: "Paths",      href: "/paths",                 accent: "#fbbf24", bg: "rgba(251,191,36,0.06)" },
  { id: "dashboard",    icon: "📂", titleAr: "لوحة الطالب",                titleEn: "Student Dashboard",      categoryAr: "Dashboard",  categoryEn: "Dashboard",  href: "/dashboard",             accent: "#f472b6", bg: "rgba(244,114,182,0.06)" },
];

const VISIBLE = 4;
const AUTO_INTERVAL = 6000;

export default function FeaturedShowcaseCarousel({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(VISIBLE);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchX = useRef<number | null>(null);
  const total = items.length;

  useEffect(() => {
    const upd = () => {
      if (window.innerWidth < 480) setVisibleCount(1);
      else if (window.innerWidth < 768) setVisibleCount(2);
      else if (window.innerWidth < 1024) setVisibleCount(3);
      else setVisibleCount(VISIBLE);
    };
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  const maxIdx = total - visibleCount;
  const next = useCallback(() => setCurrent((c) => (c >= maxIdx ? 0 : c + 1)), [maxIdx]);
  const prev = useCallback(() => setCurrent((c) => (c <= 0 ? maxIdx : c - 1)), [maxIdx]);

  useEffect(() => {
    if (paused) { if (timerRef.current) clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(next, AUTO_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, next]);

  const cardW = 100 / visibleCount;
  const translatePct = isAr ? current * cardW : -(current * cardW);

  return (
    <div
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(12,14,18,0.6)", backdropFilter: "blur(8px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(delta) > 40) { (isAr ? delta > 0 : delta < 0) ? next() : prev(); }
        touchX.current = null;
      }}
    >
      <div className="container-xl py-3">
        <div className="relative">
          {/* Prev */}
          <button
            onClick={isAr ? next : prev}
            aria-label={isAr ? "السابق" : "Previous"}
            className="absolute start-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full flex items-center justify-center -translate-x-1"
            style={{ background: "var(--color-surface-container-high)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {isAr ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>

          <div className="overflow-hidden mx-6">
            <div
              className="flex"
              style={{ transform: `translateX(${translatePct}%)`, direction: "ltr", transition: "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)" }}
            >
              {items.map((item) => (
                <div key={item.id} style={{ width: `${cardW}%`, flexShrink: 0, padding: "0 5px" }}>
                  <Link
                    href={`/${locale}${item.href}`}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    style={{ background: item.bg, border: `1px solid ${item.accent}20`, textDecoration: "none" }}
                    dir={isAr ? "rtl" : "ltr"}
                  >
                    <span
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: `${item.accent}15`, border: `1px solid ${item.accent}25` }}
                    >
                      {item.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate leading-tight" style={{ color: "var(--color-on-surface)" }}>
                        {isAr ? item.titleAr : item.titleEn}
                      </p>
                      <p className="text-[10px] font-mono mt-0.5" style={{ color: item.accent, opacity: 0.8 }}>
                        {isAr ? item.categoryAr : item.categoryEn}
                      </p>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 ms-auto" style={{ background: item.accent }} />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Next */}
          <button
            onClick={isAr ? prev : next}
            aria-label={isAr ? "التالي" : "Next"}
            className="absolute end-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full flex items-center justify-center translate-x-1"
            style={{ background: "var(--color-surface-container-high)", color: "var(--color-on-surface-variant)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {isAr ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>
        </div>

        {/* Slim dots */}
        <div className="flex justify-center gap-1 mt-2">
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === current ? "16px" : "4px",
                height: "4px",
                borderRadius: "2px",
                background: i === current ? "var(--color-primary)" : "rgba(255,255,255,0.12)",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
