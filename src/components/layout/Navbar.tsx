"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Search, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

interface NavbarProps {
  locale: string;
}

const navItems = {
  ar: [
    { href: "",          label: "الرئيسية" },
    { href: "/courses",  label: "الدورات"  },
    { href: "/paths",    label: "المسارات" },
    { href: "/tools",    label: "الأدوات"  },
    { href: "/claude",   label: "Claude"   },
    { href: "/cloud",    label: "الكلاود"  },
    { href: "/projects", label: "المشاريع" },
    { href: "/blog",     label: "المدونة"  },
    { href: "/mentor",   label: "✨ المرشد" },
  ],
  en: [
    { href: "",          label: "Home"      },
    { href: "/courses",  label: "Courses"   },
    { href: "/paths",    label: "Paths"     },
    { href: "/tools",    label: "Tools"     },
    { href: "/claude",   label: "Claude"    },
    { href: "/cloud",    label: "Cloud"     },
    { href: "/projects", label: "Projects"  },
    { href: "/blog",     label: "Blog"      },
    { href: "/mentor",   label: "✨ Mentor"  },
  ],
};

export default function Navbar({ locale }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const items = navItems[locale as "ar" | "en"] ?? navItems.en;
  const isAr = locale === "ar";

  function isActive(href: string) {
    const full = `/${locale}${href}`;
    if (href === "") return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(full);
  }

  return (
    <nav
      className="fixed top-0 w-full z-50"
      style={{
        background: "rgba(17,19,24,0.78)",
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
        >
          <Bot size={22} style={{ color: "var(--color-tertiary)" }} />
          <span className="hidden sm:block tracking-tight">
            {isAr ? "أكاديمية درهوس" : "Darhous AI"}
          </span>
          <span className="sm:hidden tracking-tight">
            {isAr ? "درهوس" : "Darhous"}
          </span>
        </Link>

        {/* Desktop Nav — centered */}
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
                {/* Active underline */}
                {active && (
                  <span
                    className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full"
                    style={{ background: "var(--color-primary)" }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Search hint (desktop) — triggers command palette */}
          <button
            onClick={() => {
              const e = new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true });
              window.dispatchEvent(e);
            }}
            className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono cursor-pointer transition-all hover:opacity-80 hover:scale-105"
            style={{
              background: "var(--color-surface-container)",
              border: "1px solid var(--color-outline-variant)",
              color: "var(--color-on-surface-variant)",
            }}
            aria-label="Open search"
          >
            <Search size={13} />
            <span className="opacity-60">{isAr ? "ابحث..." : "Search..."}</span>
            <span
              className="px-1.5 py-0.5 rounded text-[10px]"
              style={{ background: "var(--color-surface-container-high)" }}
            >
              ⌘K
            </span>
          </button>

          <ThemeToggle />
          <LanguageToggle locale={locale} />

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
            <span
              className="px-1.5 py-0.5 rounded text-[9px] font-bold"
              style={{ background: "rgba(208,188,255,0.15)", color: "var(--color-secondary)" }}
            >
              {isAr ? "قريبًا" : "Soon"}
            </span>
          </Link>

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
            background: "rgba(17,19,24,0.96)",
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
                    borderLeft: active && !isAr ? "2px solid var(--color-primary)" : undefined,
                    borderRight: active && isAr ? "2px solid var(--color-primary)" : undefined,
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div
              className="pt-3 mt-2 border-t"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <Link
                href={`/${locale}/dashboard`}
                className="flex items-center justify-center gap-2 text-sm font-mono px-4 py-2.5 rounded-lg border transition-all hover:opacity-80"
                style={{
                  background: "rgba(142,213,255,0.06)",
                  borderColor: "rgba(142,213,255,0.2)",
                  color: "var(--color-primary)",
                }}
                onClick={() => setMobileOpen(false)}
              >
                🔮 {isAr ? "لوحة الطالب" : "Dashboard"}
                <span
                  className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                  style={{ background: "rgba(208,188,255,0.15)", color: "var(--color-secondary)" }}
                >
                  {isAr ? "قريبًا" : "Soon"}
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
