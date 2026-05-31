"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Search, Menu, X, ChevronDown, LogIn, UserCircle, ShieldCheck } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useAuth } from "@/hooks/useAuth";

interface NavbarProps {
  locale: string;
}

const navItems = {
  ar: [
    { href: "",          label: "الرئيسية" },
    { href: "/paths",    label: "المسارات" },
    { href: "/tools",    label: "الأدوات"  },
    { href: "/claude",   label: "Claude"   },
    { href: "/projects", label: "المشاريع" },
    { href: "/blog",     label: "المدونة"  },
  ],
  en: [
    { href: "",          label: "Home"     },
    { href: "/paths",    label: "Paths"    },
    { href: "/tools",    label: "Tools"    },
    { href: "/claude",   label: "Claude"   },
    { href: "/projects", label: "Projects" },
    { href: "/blog",     label: "Blog"     },
  ],
};

const aiStudioItems = {
  ar: [
    { href: "/mentor",                icon: "✨", label: "مساعد درهوس الذكي" },
    { href: "/prompt-studio",         icon: "⚡", label: "استوديو البرومبتات" },
    { href: "/prompt-score",          icon: "🎯", label: "تقييم البرومبت"    },
    { href: "/prompt-battle",         icon: "⚔️", label: "معركة البرومبتات"  },
    { href: "/claude-code-generator", icon: "🛠️", label: "مولّد Claude Code" },
    { href: "/tool-recommender",      icon: "🔎", label: "مرشّح الأدوات"    },
    { href: "/compare-tools",         icon: "⚖️", label: "مقارنة الأدوات"   },
    { href: "/roadmap-generator",     icon: "🗺️", label: "مولّد خطط التعلم" },
    { href: "/project-generator",     icon: "🚀", label: "مولّد المشاريع"   },
    { href: "/nano-banana-prompts",   icon: "🍌", label: "Nano Banana Lab"   },
    { href: "/challenges",            icon: "🏆", label: "التحديات"          },
    { href: "/leaderboard",           icon: "🥇", label: "المتصدرون"         },
  ],
  en: [
    { href: "/mentor",                icon: "✨", label: "AI Mentor"             },
    { href: "/prompt-studio",         icon: "⚡", label: "Prompt Studio"         },
    { href: "/prompt-score",          icon: "🎯", label: "Prompt Score"          },
    { href: "/prompt-battle",         icon: "⚔️", label: "Prompt Battle"         },
    { href: "/claude-code-generator", icon: "🛠️", label: "Claude Code Generator" },
    { href: "/tool-recommender",      icon: "🔎", label: "Tool Recommender"      },
    { href: "/compare-tools",         icon: "⚖️", label: "Compare Tools"         },
    { href: "/roadmap-generator",     icon: "🗺️", label: "Roadmap Generator"     },
    { href: "/project-generator",     icon: "🚀", label: "Project Generator"     },
    { href: "/nano-banana-prompts",   icon: "🍌", label: "Nano Banana Lab"       },
    { href: "/challenges",            icon: "🏆", label: "Challenges"            },
    { href: "/leaderboard",           icon: "🥇", label: "Leaderboard"           },
  ],
};

const AI_STUDIO_PATHS = [
  "/mentor", "/prompt-studio", "/claude-code-generator",
  "/tool-recommender", "/roadmap-generator", "/nano-banana-prompts",
  "/prompt-score", "/prompt-battle", "/compare-tools", "/project-generator",
  "/challenges", "/leaderboard",
];

export default function Navbar({ locale }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [studioOpen, setStudioOpen] = useState(false);
  const [mobileStudioOpen, setMobileStudioOpen] = useState(false);
  const studioRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const items = navItems[locale as "ar" | "en"] ?? navItems.en;
  const studioItems = aiStudioItems[locale as "ar" | "en"] ?? aiStudioItems.en;
  const isAr = locale === "ar";
  const { user, isAdmin, loading, supabaseConfigured } = useAuth();

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (studioRef.current && !studioRef.current.contains(e.target as Node)) {
        setStudioOpen(false);
      }
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setStudioOpen(false);
    setMobileStudioOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    const full = `/${locale}${href}`;
    if (href === "") return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(full);
  }

  const isStudioActive = AI_STUDIO_PATHS.some((p) =>
    pathname.startsWith(`/${locale}${p}`)
  );

  // Auth action button content
  function AuthButton() {
    if (!supabaseConfigured) {
      return (
        <Link
          href={`/${locale}/dashboard`}
          className="hidden md:flex items-center gap-1.5 text-xs font-mono px-3 py-2 rounded-lg border transition-all hover:opacity-80"
          style={{
            background: "rgba(142,213,255,0.06)",
            borderColor: "rgba(142,213,255,0.2)",
            color: "var(--color-primary)",
          }}
        >
          <span className="text-[10px]">🔮</span>
          {isAr ? "لوحة الطالب" : "Dashboard"}
          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ background: "rgba(208,188,255,0.15)", color: "var(--color-secondary)" }}>
            {isAr ? "قريبًا" : "Soon"}
          </span>
        </Link>
      );
    }
    if (loading) return null;
    if (!user) {
      return (
        <Link
          href={`/${locale}/login`}
          className="hidden md:flex items-center gap-1.5 text-xs font-mono px-3 py-2 rounded-lg border transition-all hover:opacity-80"
          style={{
            background: "rgba(142,213,255,0.06)",
            borderColor: "rgba(142,213,255,0.2)",
            color: "var(--color-primary)",
          }}
        >
          <LogIn size={13} />
          {isAr ? "تسجيل الدخول" : "Sign In"}
        </Link>
      );
    }
    if (isAdmin) {
      return (
        <div className="hidden md:flex items-center gap-1.5">
          <Link
            href={`/${locale}/admin`}
            className="flex items-center gap-1.5 text-xs font-mono px-3 py-2 rounded-lg border transition-all hover:opacity-80"
            style={{
              background: "rgba(239,68,68,0.06)",
              borderColor: "rgba(239,68,68,0.2)",
              color: "#ef4444",
            }}
          >
            <ShieldCheck size={13} />
            {isAr ? "الإدارة" : "Admin"}
          </Link>
          <Link
            href={`/${locale}/dashboard`}
            className="flex items-center gap-1.5 text-xs font-mono px-3 py-2 rounded-lg border transition-all hover:opacity-80"
            style={{
              background: "rgba(142,213,255,0.06)",
              borderColor: "rgba(142,213,255,0.2)",
              color: "var(--color-primary)",
            }}
          >
            <UserCircle size={13} />
            {isAr ? "لوحتي" : "Dashboard"}
          </Link>
          <Link
            href={`/${locale}/profile`}
            className="flex items-center gap-1.5 text-xs font-mono px-3 py-2 rounded-lg border transition-all hover:opacity-80"
            style={{
              background: "rgba(208,188,255,0.06)",
              borderColor: "rgba(208,188,255,0.2)",
              color: "var(--color-secondary)",
            }}
          >
            <UserCircle size={13} />
            {isAr ? "حسابي" : "Profile"}
          </Link>
        </div>
      );
    }
    return (
      <Link
        href={`/${locale}/dashboard`}
        className="hidden md:flex items-center gap-1.5 text-xs font-mono px-3 py-2 rounded-lg border transition-all hover:opacity-80"
        style={{
          background: "rgba(142,213,255,0.06)",
          borderColor: "rgba(142,213,255,0.2)",
          color: "var(--color-primary)",
        }}
      >
        <UserCircle size={13} />
        {isAr ? "لوحتي" : "Dashboard"}
      </Link>
    );
  }

  return (
    <nav
      className="fixed top-0 w-full z-50"
      style={{
        background: "rgba(17,19,24,0.82)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 1px 24px rgba(0,0,0,0.3)",
      }}
    >
      <div className="container-xl flex items-center justify-between h-16">

        {/* Brand */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 font-display font-bold text-lg flex-shrink-0"
          style={{ color: "var(--color-primary)" }}
          aria-label={isAr ? "أكاديمية درهوس للذكاء الاصطناعي" : "Darhous AI Academy"}
        >
          <Bot size={22} style={{ color: "var(--color-tertiary)" }} aria-hidden="true" />
          <span className="hidden sm:block tracking-tight" aria-hidden="true">
            {isAr ? "أكاديمية درهوس" : "Darhous AI"}
          </span>
          <span className="sm:hidden tracking-tight" aria-hidden="true">
            {isAr ? "درهوس" : "Darhous"}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  color: active ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                  background: active ? "rgba(142,213,255,0.06)" : "transparent",
                  fontWeight: active ? 600 : 400,
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = "rgba(142,213,255,0.05)";
                    (e.currentTarget as HTMLElement).style.color = "var(--color-primary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "var(--color-on-surface-variant)";
                  }
                }}
              >
                {item.label}
                {active && (
                  <span
                    className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full"
                    style={{ background: "var(--color-primary)" }}
                  />
                )}
              </Link>
            );
          })}

          {/* AI Studio Dropdown */}
          <div ref={studioRef} className="relative">
            <button
              onClick={() => setStudioOpen((v) => !v)}
              onMouseEnter={() => setStudioOpen(true)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                color: isStudioActive ? "var(--color-tertiary)" : "var(--color-on-surface-variant)",
                background: isStudioActive ? "rgba(60,224,251,0.06)" : "transparent",
                fontWeight: isStudioActive ? 600 : 400,
              }}
            >
              AI Studio
              <ChevronDown
                size={13}
                style={{
                  transition: "transform 0.2s",
                  transform: studioOpen ? "rotate(180deg)" : "rotate(0deg)",
                  color: "var(--color-tertiary)",
                }}
              />
              {isStudioActive && (
                <span
                  className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full"
                  style={{ background: "var(--color-tertiary)" }}
                />
              )}
            </button>

            {studioOpen && (
              <div
                className="absolute top-full mt-1.5 rounded-2xl overflow-hidden"
                style={{
                  [isAr ? "right" : "left"]: 0,
                  width: "230px",
                  background: "rgba(17,19,24,0.97)",
                  border: "1px solid rgba(60,224,251,0.15)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(60,224,251,0.1)",
                  backdropFilter: "blur(20px)",
                }}
                onMouseLeave={() => setStudioOpen(false)}
              >
                <div className="p-1.5">
                  <div
                    className="px-3 py-2 text-[10px] font-mono tracking-widest uppercase"
                    style={{ color: "var(--color-tertiary)", opacity: 0.7 }}
                  >
                    AI Studio
                  </div>
                  {studioItems.map((item) => {
                    const active = pathname.startsWith(`/${locale}${item.href}`);
                    const isNano = item.href === "/nano-banana-prompts";
                    return (
                      <Link
                        key={item.href}
                        href={`/${locale}${item.href}`}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all duration-150"
                        style={{
                          color: active ? "var(--color-tertiary)" : "var(--color-on-surface-variant)",
                          background: active ? "rgba(60,224,251,0.08)" : isNano ? "rgba(245,158,11,0.04)" : "transparent",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => {
                          if (!active) {
                            (e.currentTarget as HTMLElement).style.background = isNano ? "rgba(245,158,11,0.08)" : "rgba(60,224,251,0.06)";
                            (e.currentTarget as HTMLElement).style.color = isNano ? "#f59e0b" : "var(--color-on-surface)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!active) {
                            (e.currentTarget as HTMLElement).style.background = isNano ? "rgba(245,158,11,0.04)" : "transparent";
                            (e.currentTarget as HTMLElement).style.color = "var(--color-on-surface-variant)";
                          }
                        }}
                      >
                        <span className="text-base leading-none w-5 text-center">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                        {isNano && (
                          <span className="ms-auto text-[9px] font-mono px-1.5 py-0.5 rounded-full" style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>
                            NEW
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Search link */}
          <Link
            href={`/${locale}/search`}
            className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono cursor-pointer transition-all hover:opacity-80 hover:scale-105"
            style={{
              background: "var(--color-surface-container)",
              border: "1px solid var(--color-outline-variant)",
              color: "var(--color-on-surface-variant)",
            }}
            aria-label="Search"
          >
            <Search size={13} />
            <span className="opacity-60">{isAr ? "ابحث..." : "Search..."}</span>
          </Link>

          <ThemeToggle />
          <LanguageToggle locale={locale} />

          <AuthButton />

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg transition-colors"
            style={{ color: "var(--color-primary)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t"
          style={{
            background: "rgba(17,19,24,0.98)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          <div className="container-xl py-4 flex flex-col gap-1">
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    color: active ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                    background: active ? "rgba(142,213,255,0.08)" : "transparent",
                    borderInlineStart: active ? "2px solid var(--color-primary)" : "2px solid transparent",
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Mobile AI Studio accordion */}
            <div>
              <button
                onClick={() => setMobileStudioOpen((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  color: isStudioActive ? "var(--color-tertiary)" : "var(--color-on-surface-variant)",
                  background: isStudioActive ? "rgba(60,224,251,0.08)" : "transparent",
                  borderInlineStart: isStudioActive ? "2px solid var(--color-tertiary)" : "2px solid transparent",
                }}
              >
                AI Studio
                <ChevronDown
                  size={14}
                  style={{
                    transition: "transform 0.2s",
                    transform: mobileStudioOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
              {mobileStudioOpen && (
                <div className="mt-1 ms-4 flex flex-col gap-0.5">
                  {studioItems.map((item) => {
                    const active = pathname.startsWith(`/${locale}${item.href}`);
                    return (
                      <Link
                        key={item.href}
                        href={`/${locale}${item.href}`}
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm transition-all"
                        style={{
                          color: active ? "var(--color-tertiary)" : "var(--color-on-surface-variant)",
                          background: active ? "rgba(60,224,251,0.06)" : "transparent",
                          textDecoration: "none",
                        }}
                        onClick={() => setMobileOpen(false)}
                      >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-3 mt-2 border-t flex flex-col gap-2" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              {!supabaseConfigured ? (
                <Link
                  href={`/${locale}/dashboard`}
                  className="flex items-center justify-center gap-2 text-sm font-mono px-4 py-2.5 rounded-lg border transition-all hover:opacity-80"
                  style={{ background: "rgba(142,213,255,0.06)", borderColor: "rgba(142,213,255,0.2)", color: "var(--color-primary)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  🔮 {isAr ? "لوحة الطالب" : "Dashboard"}
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold" style={{ background: "rgba(208,188,255,0.15)", color: "var(--color-secondary)" }}>
                    {isAr ? "قريبًا" : "Soon"}
                  </span>
                </Link>
              ) : !loading && !user ? (
                <>
                  <Link
                    href={`/${locale}/login`}
                    className="flex items-center justify-center gap-2 text-sm font-mono px-4 py-2.5 rounded-lg border transition-all hover:opacity-80"
                    style={{ background: "rgba(142,213,255,0.06)", borderColor: "rgba(142,213,255,0.2)", color: "var(--color-primary)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <LogIn size={14} /> {isAr ? "تسجيل الدخول" : "Sign In"}
                  </Link>
                  <Link
                    href={`/${locale}/register`}
                    className="flex items-center justify-center gap-2 text-sm font-mono px-4 py-2.5 rounded-lg border"
                    style={{ border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface-variant)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {isAr ? "إنشاء حساب" : "Create Account"}
                  </Link>
                </>
              ) : !loading && user ? (
                <>
                  {isAdmin && (
                    <Link
                      href={`/${locale}/admin`}
                      className="flex items-center justify-center gap-2 text-sm font-mono px-4 py-2.5 rounded-lg border"
                      style={{ background: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.2)", color: "#ef4444" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      <ShieldCheck size={14} /> {isAr ? "الإدارة" : "Admin"}
                    </Link>
                  )}
                  <Link
                    href={`/${locale}/dashboard`}
                    className="flex items-center justify-center gap-2 text-sm font-mono px-4 py-2.5 rounded-lg border"
                    style={{ background: "rgba(142,213,255,0.06)", borderColor: "rgba(142,213,255,0.2)", color: "var(--color-primary)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <UserCircle size={14} /> {isAr ? "لوحتي" : "Dashboard"}
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
