"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ShowcaseItem {
  id: string;
  icon: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  categoryAr: string;
  categoryEn: string;
  statusAr: string;
  statusEn: string;
  href: string;
  accent: string;
  gradFrom: string;
  gradTo: string;
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: "mentor",
    icon: "✨",
    titleAr: "مساعد درهوس الذكي",
    titleEn: "Darhous AI Mentor",
    descriptionAr: "اسأل، حسّن البرومبتات، وابنِ خطط تعلم ومشاريع بمساعدة الذكاء الاصطناعي.",
    descriptionEn: "Ask, optimize prompts, build learning paths, and create AI project plans.",
    categoryAr: "AI Mentor",
    categoryEn: "AI Mentor",
    statusAr: "مباشر",
    statusEn: "Live",
    href: "/mentor",
    accent: "#8ed5ff",
    gradFrom: "rgba(56,189,248,0.15)",
    gradTo: "rgba(56,189,248,0.04)",
  },
  {
    id: "prompt-studio",
    icon: "⚡",
    titleAr: "استوديو البرومبتات",
    titleEn: "Prompt Studio",
    descriptionAr: "حوّل أفكارك إلى برومبتات احترافية جاهزة للنسخ في ثوانٍ.",
    descriptionEn: "Turn rough ideas into polished, copy-ready prompts instantly.",
    categoryAr: "AI Studio",
    categoryEn: "AI Studio",
    statusAr: "مباشر",
    statusEn: "Live",
    href: "/prompt-studio",
    accent: "#d0bcff",
    gradFrom: "rgba(208,188,255,0.15)",
    gradTo: "rgba(208,188,255,0.04)",
  },
  {
    id: "claude-code",
    icon: "🛠️",
    titleAr: "مولّد برومبت Claude Code",
    titleEn: "Claude Code Generator",
    descriptionAr: "أنشئ برومبتات قوية لبناء تطبيقات ومشاريع حقيقية.",
    descriptionEn: "Generate production-grade prompts for Claude Code.",
    categoryAr: "Claude Code",
    categoryEn: "Claude Code",
    statusAr: "مباشر",
    statusEn: "Live",
    href: "/claude-code-generator",
    accent: "#3ce0fb",
    gradFrom: "rgba(60,224,251,0.15)",
    gradTo: "rgba(60,224,251,0.04)",
  },
  {
    id: "tool-recommender",
    icon: "🔎",
    titleAr: "مرشح أدوات الذكاء الاصطناعي",
    titleEn: "AI Tool Recommender",
    descriptionAr: "اختر هدفك واحصل على أفضل الأدوات المناسبة لك على الفور.",
    descriptionEn: "Find the right AI tools for your goals instantly.",
    categoryAr: "أدوات AI",
    categoryEn: "AI Tools",
    statusAr: "مباشر",
    statusEn: "Live",
    href: "/tool-recommender",
    accent: "#86efac",
    gradFrom: "rgba(74,222,128,0.15)",
    gradTo: "rgba(74,222,128,0.04)",
  },
  {
    id: "roadmap",
    icon: "🗺️",
    titleAr: "مولّد خطط التعلم",
    titleEn: "AI Roadmap Generator",
    descriptionAr: "ابنِ خطة تعلم شخصية حسب مستواك وهدفك ووقتك المتاح.",
    descriptionEn: "Generate a personalized learning roadmap for your goals.",
    categoryAr: "خطط التعلم",
    categoryEn: "Learning",
    statusAr: "مباشر",
    statusEn: "Live",
    href: "/roadmap-generator",
    accent: "#fbbf24",
    gradFrom: "rgba(251,191,36,0.15)",
    gradTo: "rgba(251,191,36,0.04)",
  },
  {
    id: "claude",
    icon: "🤖",
    titleAr: "إتقان Claude",
    titleEn: "Claude Mastery",
    descriptionAr: "تعلم استخدام Claude في البرمجة والبحث وبناء المنتجات من الصفر.",
    descriptionEn: "Master Claude for coding, research, and product building.",
    categoryAr: "Claude",
    categoryEn: "Claude",
    statusAr: "متاح",
    statusEn: "Available",
    href: "/claude",
    accent: "#f472b6",
    gradFrom: "rgba(244,114,182,0.15)",
    gradTo: "rgba(244,114,182,0.04)",
  },
  {
    id: "tools",
    icon: "🔧",
    titleAr: "مركز أدوات الذكاء الاصطناعي",
    titleEn: "AI Tools Hub",
    descriptionAr: "استكشف أهم أدوات الذكاء الاصطناعي والبرمجة والأتمتة والكلاود.",
    descriptionEn: "Explore the best tools for AI, coding, automation, and cloud.",
    categoryAr: "أدوات",
    categoryEn: "Tools",
    statusAr: "40+ أداة",
    statusEn: "40+ Tools",
    href: "/tools",
    accent: "#8ed5ff",
    gradFrom: "rgba(56,189,248,0.12)",
    gradTo: "rgba(56,189,248,0.03)",
  },
  {
    id: "cloud",
    icon: "☁️",
    titleAr: "أكاديمية الكلاود",
    titleEn: "Cloud Academy",
    descriptionAr: "تعلم نشر وتأمين مشاريع الذكاء الاصطناعي على السحابة.",
    descriptionEn: "Learn cloud deployment and security for AI projects.",
    categoryAr: "Cloud",
    categoryEn: "Cloud",
    statusAr: "متاح",
    statusEn: "Available",
    href: "/cloud",
    accent: "#3ce0fb",
    gradFrom: "rgba(60,224,251,0.12)",
    gradTo: "rgba(60,224,251,0.03)",
  },
  {
    id: "projects",
    icon: "🏗️",
    titleAr: "مكتبة المشاريع",
    titleEn: "Projects Library",
    descriptionAr: "مشاريع عملية لتطبيق ما تتعلمه خطوة بخطوة مع أدلة كاملة.",
    descriptionEn: "Build practical projects from learning to deployment.",
    categoryAr: "مشاريع",
    categoryEn: "Projects",
    statusAr: "14 مشروع",
    statusEn: "14 Projects",
    href: "/projects",
    accent: "#d0bcff",
    gradFrom: "rgba(208,188,255,0.12)",
    gradTo: "rgba(208,188,255,0.03)",
  },
  {
    id: "prompts",
    icon: "📋",
    titleAr: "مكتبة البرومبتات",
    titleEn: "Prompt Library",
    descriptionAr: "قوالب جاهزة للنسخ والاستخدام في مجالات مختلفة.",
    descriptionEn: "Copy-ready prompt templates for multiple use cases.",
    categoryAr: "برومبتات",
    categoryEn: "Prompts",
    statusAr: "25+ قالب",
    statusEn: "25+ Templates",
    href: "/prompts",
    accent: "#86efac",
    gradFrom: "rgba(74,222,128,0.12)",
    gradTo: "rgba(74,222,128,0.03)",
  },
  {
    id: "paths",
    icon: "🎯",
    titleAr: "مسارات التعلم",
    titleEn: "Learning Paths",
    descriptionAr: "ابدأ من مستواك الحالي واتبع مسارًا واضحًا حتى الاحتراف.",
    descriptionEn: "Follow structured paths from beginner to advanced.",
    categoryAr: "مسارات",
    categoryEn: "Paths",
    statusAr: "6 مسارات",
    statusEn: "6 Paths",
    href: "/paths",
    accent: "#fbbf24",
    gradFrom: "rgba(251,191,36,0.12)",
    gradTo: "rgba(251,191,36,0.03)",
  },
  {
    id: "dashboard",
    icon: "📂",
    titleAr: "لوحة الطالب قريبًا",
    titleEn: "Student Dashboard Soon",
    descriptionAr: "تابع تقدمك ومحفوظاتك ونتائجك في لوحة واحدة.",
    descriptionEn: "Track your progress, saved prompts, and results in one place.",
    categoryAr: "Dashboard",
    categoryEn: "Dashboard",
    statusAr: "قريبًا",
    statusEn: "Coming Soon",
    href: "/dashboard",
    accent: "#f472b6",
    gradFrom: "rgba(244,114,182,0.12)",
    gradTo: "rgba(244,114,182,0.03)",
  },
];

function getRelPos(idx: number, active: number, total: number): number {
  let pos = idx - active;
  if (pos > total / 2) pos -= total;
  if (pos < -total / 2) pos += total;
  return pos;
}

export default function Premium3DShowcaseCarousel({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const total = showcaseItems.length;

  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);
  const prev = useCallback(() => setActive((a) => (a - 1 + total) % total), [total]);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [isPaused, next]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 45) {
      const goNext = isAr ? delta > 0 : delta < 0;
      goNext ? next() : prev();
    }
    touchStartX.current = null;
  };

  function getCardStyle(pos: number): React.CSSProperties {
    const absPos = Math.abs(pos);
    const dir = isAr ? -1 : 1;

    if (absPos === 0) {
      return {
        transform: "translateX(-50%) scale(1) rotateY(0deg) translateZ(0px)",
        opacity: 1,
        zIndex: 20,
        pointerEvents: "auto",
        filter: "none",
      };
    }
    if (absPos === 1) {
      const xVw = pos * 42 * dir;
      const ry = -pos * 20 * dir;
      return {
        transform: `translateX(calc(-50% + ${xVw}vw)) scale(0.76) rotateY(${ry}deg) translateZ(-60px)`,
        opacity: 0.55,
        zIndex: 10,
        pointerEvents: "none",
        filter: "blur(0.5px)",
      };
    }
    if (absPos === 2) {
      const xVw = pos * 65 * dir;
      const ry = -pos * 38 * dir;
      return {
        transform: `translateX(calc(-50% + ${xVw}vw)) scale(0.55) rotateY(${ry}deg) translateZ(-120px)`,
        opacity: 0.2,
        zIndex: 5,
        pointerEvents: "none",
        filter: "blur(1px)",
      };
    }
    return {
      transform: "translateX(-50%) scale(0.4) rotateY(45deg)",
      opacity: 0,
      zIndex: 0,
      pointerEvents: "none",
    };
  }

  const activeItem = showcaseItems[active];

  return (
    <section
      className="py-14 relative overflow-hidden"
      style={{ background: "transparent" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Section header */}
      <div className="container-xl mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-3"
              style={{
                background: "rgba(142,213,255,0.08)",
                border: "1px solid rgba(142,213,255,0.18)",
                color: "var(--color-primary)",
              }}
            >
              ✦ {isAr ? "AI Studio — أدوات المنصة" : "AI Studio — Platform Tools"}
            </div>
            <h2 className="font-display font-bold text-2xl md:text-3xl" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "استكشف أدوات الذكاء الاصطناعي" : "Explore AI Tools"}
            </h2>
          </div>
          {/* Arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={isAr ? next : prev}
              aria-label={isAr ? "السابق" : "Previous"}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105"
              style={{
                background: "var(--color-surface-container)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "var(--color-on-surface-variant)",
              }}
            >
              {isAr ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
            <button
              onClick={isAr ? prev : next}
              aria-label={isAr ? "التالي" : "Next"}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105"
              style={{
                background: "var(--color-surface-container)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "var(--color-on-surface-variant)",
              }}
            >
              {isAr ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* 3D Stage */}
      <div
        className="relative mx-auto"
        style={{
          height: "340px",
          perspective: "1100px",
          perspectiveOrigin: "50% 50%",
          overflowX: "hidden",
          overflowY: "visible",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Active card glow */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "400px",
            height: "400px",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${activeItem.accent}20 0%, transparent 70%)`,
            filter: "blur(40px)",
            transition: "background 0.7s ease",
            zIndex: 0,
          }}
        />

        {showcaseItems.map((item, idx) => {
          const pos = getRelPos(idx, active, total);
          const cardStyle = getCardStyle(pos);
          const isActiveCard = pos === 0;

          return (
            <div
              key={item.id}
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                width: "min(380px, 88vw)",
                transition: "all 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                ...cardStyle,
              }}
            >
              <Link
                href={`/${locale}${item.href}`}
                className="block h-full"
                style={{ textDecoration: "none", cursor: isActiveCard ? "pointer" : "default" }}
                tabIndex={isActiveCard ? 0 : -1}
              >
                <div
                  className="rounded-3xl overflow-hidden h-full flex flex-col"
                  style={{
                    background: `linear-gradient(145deg, ${item.gradFrom}, ${item.gradTo})`,
                    border: isActiveCard
                      ? `1.5px solid ${item.accent}55`
                      : "1px solid rgba(255,255,255,0.06)",
                    boxShadow: isActiveCard
                      ? `0 20px 60px ${item.accent}20, 0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)`
                      : "0 4px 20px rgba(0,0,0,0.2)",
                    backdropFilter: "blur(20px)",
                    padding: "28px",
                    minHeight: "290px",
                    transition: "border 0.65s ease, box-shadow 0.65s ease",
                  }}
                >
                  {/* Top: icon + status */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                      style={{
                        background: `${item.accent}15`,
                        border: `1px solid ${item.accent}30`,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: item.statusEn === "Coming Soon" ? "#fbbf24" : item.accent,
                          boxShadow: `0 0 6px ${item.accent}80`,
                        }}
                      />
                      <span
                        className="text-[10px] font-mono tracking-wider"
                        style={{ color: item.accent, opacity: 0.85 }}
                      >
                        {isAr ? item.statusAr : item.statusEn}
                      </span>
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="mb-3">
                    <span
                      className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full"
                      style={{
                        background: `${item.accent}12`,
                        border: `1px solid ${item.accent}25`,
                        color: item.accent,
                      }}
                    >
                      {isAr ? item.categoryAr : item.categoryEn}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-display font-bold text-xl mb-2 leading-snug"
                    style={{ color: "var(--color-on-surface)" }}
                  >
                    {isAr ? item.titleAr : item.titleEn}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ color: "var(--color-on-surface-variant)" }}
                  >
                    {isAr ? item.descriptionAr : item.descriptionEn}
                  </p>

                  {/* CTA */}
                  <div
                    className="flex items-center gap-1.5 mt-4 text-sm font-semibold"
                    style={{ color: item.accent }}
                  >
                    {isAr ? "← استكشف" : "Explore →"}
                  </div>

                  {/* Active card shine line */}
                  {isActiveCard && (
                    <div
                      className="absolute top-0 left-6 right-6 h-px rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${item.accent}60, transparent)`,
                      }}
                    />
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Dots + mobile arrows */}
      <div className="container-xl mt-6 flex items-center justify-center gap-4">
        {/* Mobile prev */}
        <button
          onClick={isAr ? next : prev}
          className="sm:hidden w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}
          aria-label={isAr ? "السابق" : "Previous"}
        >
          {isAr ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {showcaseItems.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === active ? "24px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === active ? activeItem.accent : "rgba(255,255,255,0.15)",
                transition: "all 0.35s ease",
              }}
            />
          ))}
        </div>

        {/* Mobile next */}
        <button
          onClick={isAr ? prev : next}
          className="sm:hidden w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}
          aria-label={isAr ? "التالي" : "Next"}
        >
          {isAr ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>
    </section>
  );
}
