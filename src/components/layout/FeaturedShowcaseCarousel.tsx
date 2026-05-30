"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselItem {
  id: string;
  icon: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  categoryAr: string;
  categoryEn: string;
  href: string;
  accentColor: string;
  bgColor: string;
  borderColor: string;
}

const carouselItems: CarouselItem[] = [
  {
    id: "mentor",
    icon: "✨",
    titleAr: "مساعد درهوس الذكي",
    titleEn: "Darhous AI Mentor",
    descriptionAr: "اسأل، حسّن البرومبتات، وابنِ خطط تعلم بمساعدة الذكاء الاصطناعي.",
    descriptionEn: "Ask questions, improve prompts, and build learning plans with AI assistance.",
    categoryAr: "AI Mentor",
    categoryEn: "AI Mentor",
    href: "/mentor",
    accentColor: "#8ed5ff",
    bgColor: "rgba(56,189,248,0.07)",
    borderColor: "rgba(142,213,255,0.2)",
  },
  {
    id: "prompt-studio",
    icon: "⚡",
    titleAr: "استوديو البرومبتات",
    titleEn: "Prompt Studio",
    descriptionAr: "حوّل أفكارك إلى برومبتات احترافية جاهزة للنسخ.",
    descriptionEn: "Transform your ideas into professional prompts ready to copy.",
    categoryAr: "AI Studio",
    categoryEn: "AI Studio",
    href: "/prompt-studio",
    accentColor: "#d0bcff",
    bgColor: "rgba(208,188,255,0.07)",
    borderColor: "rgba(208,188,255,0.2)",
  },
  {
    id: "claude-code-generator",
    icon: "🛠️",
    titleAr: "مولّد برومبت Claude Code",
    titleEn: "Claude Code Generator",
    descriptionAr: "أنشئ برومبتات قوية لبناء تطبيقات ومشاريع حقيقية.",
    descriptionEn: "Generate powerful prompts to build real apps and projects.",
    categoryAr: "Claude Code",
    categoryEn: "Claude Code",
    href: "/claude-code-generator",
    accentColor: "#3ce0fb",
    bgColor: "rgba(60,224,251,0.07)",
    borderColor: "rgba(60,224,251,0.2)",
  },
  {
    id: "tool-recommender",
    icon: "🔎",
    titleAr: "مرشح أدوات الذكاء الاصطناعي",
    titleEn: "AI Tool Recommender",
    descriptionAr: "اختر هدفك واحصل على أفضل الأدوات المناسبة لك.",
    descriptionEn: "Choose your goal and get the best tools suited for you.",
    categoryAr: "أدوات AI",
    categoryEn: "AI Tools",
    href: "/tool-recommender",
    accentColor: "#86efac",
    bgColor: "rgba(74,222,128,0.07)",
    borderColor: "rgba(74,222,128,0.2)",
  },
  {
    id: "roadmap-generator",
    icon: "🗺️",
    titleAr: "مولّد خطط التعلم",
    titleEn: "AI Roadmap Generator",
    descriptionAr: "ابنِ خطة تعلم شخصية حسب مستواك وهدفك.",
    descriptionEn: "Build a personalized learning plan based on your level and goal.",
    categoryAr: "خطط التعلم",
    categoryEn: "Learning Paths",
    href: "/roadmap-generator",
    accentColor: "#fbbf24",
    bgColor: "rgba(251,191,36,0.07)",
    borderColor: "rgba(251,191,36,0.2)",
  },
  {
    id: "claude",
    icon: "🤖",
    titleAr: "إتقان Claude",
    titleEn: "Claude Mastery",
    descriptionAr: "تعلم استخدام Claude في البرمجة والبحث وبناء المنتجات.",
    descriptionEn: "Learn to use Claude for coding, research, and building products.",
    categoryAr: "Claude",
    categoryEn: "Claude",
    href: "/claude",
    accentColor: "#f472b6",
    bgColor: "rgba(244,114,182,0.07)",
    borderColor: "rgba(244,114,182,0.2)",
  },
  {
    id: "tools",
    icon: "🔧",
    titleAr: "مركز أدوات الذكاء الاصطناعي",
    titleEn: "AI Tools Hub",
    descriptionAr: "استكشف أهم أدوات AI والبرمجة والأتمتة والكلاود.",
    descriptionEn: "Explore the top AI, coding, automation, and cloud tools.",
    categoryAr: "أدوات",
    categoryEn: "Tools",
    href: "/tools",
    accentColor: "#8ed5ff",
    bgColor: "rgba(56,189,248,0.07)",
    borderColor: "rgba(142,213,255,0.18)",
  },
  {
    id: "cloud",
    icon: "☁️",
    titleAr: "أكاديمية الكلاود",
    titleEn: "Cloud Academy",
    descriptionAr: "تعلم نشر مشاريع AI على السحابة وتأمينها.",
    descriptionEn: "Learn to deploy and secure AI projects on the cloud.",
    categoryAr: "Cloud",
    categoryEn: "Cloud",
    href: "/cloud",
    accentColor: "#3ce0fb",
    bgColor: "rgba(60,224,251,0.07)",
    borderColor: "rgba(60,224,251,0.18)",
  },
  {
    id: "projects",
    icon: "🏗️",
    titleAr: "مكتبة المشاريع",
    titleEn: "Projects Library",
    descriptionAr: "مشاريع عملية لتطبيق ما تتعلمه.",
    descriptionEn: "Hands-on projects to apply what you learn.",
    categoryAr: "مشاريع",
    categoryEn: "Projects",
    href: "/projects",
    accentColor: "#d0bcff",
    bgColor: "rgba(208,188,255,0.07)",
    borderColor: "rgba(208,188,255,0.18)",
  },
  {
    id: "prompts",
    icon: "📋",
    titleAr: "مكتبة البرومبتات",
    titleEn: "Prompt Library",
    descriptionAr: "قوالب جاهزة للنسخ والاستخدام.",
    descriptionEn: "Ready-to-copy templates for immediate use.",
    categoryAr: "برومبتات",
    categoryEn: "Prompts",
    href: "/prompts",
    accentColor: "#86efac",
    bgColor: "rgba(74,222,128,0.07)",
    borderColor: "rgba(74,222,128,0.18)",
  },
];

const VISIBLE_DESKTOP = 3;
const VISIBLE_TABLET = 2;
const VISIBLE_MOBILE = 1;
const AUTO_PLAY_INTERVAL = 5000;

export default function FeaturedShowcaseCarousel({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(VISIBLE_DESKTOP);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const total = carouselItems.length;

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) setVisibleCount(VISIBLE_MOBILE);
      else if (window.innerWidth < 1024) setVisibleCount(VISIBLE_TABLET);
      else setVisibleCount(VISIBLE_DESKTOP);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = total - visibleCount;

  const next = useCallback(() => {
    setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrent((c) => (c <= 0 ? maxIndex : c - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (isPaused) {
      if (autoTimer.current) clearInterval(autoTimer.current);
      return;
    }
    autoTimer.current = setInterval(next, AUTO_PLAY_INTERVAL);
    return () => {
      if (autoTimer.current) clearInterval(autoTimer.current);
    };
  }, [isPaused, next]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (isAr ? delta > 0 : delta < 0) next();
      else prev();
    }
    touchStartX.current = null;
  }

  const cardWidthPct = 100 / visibleCount;
  const translatePct = isAr
    ? current * cardWidthPct
    : -(current * cardWidthPct);

  return (
    <div
      className="w-full py-4"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container-xl">
        <div className="relative">
          {/* Prev button */}
          <button
            onClick={isAr ? next : prev}
            aria-label={isAr ? "الكرت السابق" : "Previous card"}
            className="absolute start-0 top-1/2 -translate-y-1/2 z-20 -translate-x-3 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: "var(--color-surface-container)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--color-on-surface-variant)",
            }}
          >
            {isAr ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>

          {/* Overflow window */}
          <div className="overflow-hidden mx-5">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(${translatePct}%)`,
                direction: "ltr",
              }}
            >
              {carouselItems.map((item) => (
                <div
                  key={item.id}
                  style={{ width: `${cardWidthPct}%`, flexShrink: 0, padding: "0 6px" }}
                >
                  <Link
                    href={`/${locale}${item.href}`}
                    className="group flex flex-col gap-3 p-4 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{
                      background: item.bgColor,
                      border: `1px solid ${item.borderColor}`,
                      textDecoration: "none",
                    }}
                    dir={isAr ? "rtl" : "ltr"}
                  >
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                          style={{ background: "rgba(255,255,255,0.06)" }}
                        >
                          {item.icon}
                        </span>
                        <div>
                          <p
                            className="font-semibold text-sm leading-tight"
                            style={{ color: "var(--color-on-surface)" }}
                          >
                            {isAr ? item.titleAr : item.titleEn}
                          </p>
                          <p
                            className="text-xs font-mono mt-0.5"
                            style={{ color: item.accentColor, opacity: 0.8 }}
                          >
                            {isAr ? item.categoryAr : item.categoryEn}
                          </p>
                        </div>
                      </div>
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                        style={{ background: item.accentColor }}
                      />
                    </div>

                    {/* Description */}
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "var(--color-on-surface-variant)" }}
                    >
                      {isAr ? item.descriptionAr : item.descriptionEn}
                    </p>

                    {/* CTA */}
                    <div
                      className="flex items-center gap-1 text-xs font-mono mt-auto"
                      style={{ color: item.accentColor }}
                    >
                      {isAr ? "استكشف ←" : "Explore →"}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={isAr ? prev : next}
            aria-label={isAr ? "الكرت التالي" : "Next card"}
            className="absolute end-0 top-1/2 -translate-y-1/2 z-20 translate-x-3 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: "var(--color-surface-container)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--color-on-surface-variant)",
            }}
          >
            {isAr ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: i === current ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === current
                  ? "var(--color-primary)"
                  : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
