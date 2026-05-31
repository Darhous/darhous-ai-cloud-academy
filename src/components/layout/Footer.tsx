import Link from "next/link";
import { Bot } from "lucide-react";
import SocialLinksBar from "./SocialLinksBar";
import CommunitySignup from "@/components/community/CommunitySignup";
import { portals } from "@/config/portals";

interface FooterProps {
  locale: string;
}

const aiStudioLinks = (isAr: boolean, locale: string) =>
  [
    { href: `/${locale}/mentor`,                label: isAr ? "✨ مرشد AI"               : "✨ AI Mentor"             },
    { href: `/${locale}/prompt-studio`,         label: isAr ? "⚡ استوديو البرومبتات"    : "⚡ Prompt Studio"         },
    { href: `/${locale}/prompt-score`,          label: isAr ? "🎯 تقييم البرومبت"        : "🎯 Prompt Score"          },
    { href: `/${locale}/prompt-battle`,         label: isAr ? "⚔️ معركة البرومبتات"      : "⚔️ Prompt Battle"         },
    { href: `/${locale}/claude-code-generator`, label: isAr ? "🛠️ مولّد Claude Code"     : "🛠️ Claude Code Generator" },
    { href: `/${locale}/compare-tools`,         label: isAr ? "⚖️ مقارنة الأدوات"        : "⚖️ Compare Tools"         },
    { href: `/${locale}/project-generator`,     label: isAr ? "🚀 مولّد المشاريع"        : "🚀 Project Generator"     },
    { href: `/${locale}/challenges`,            label: isAr ? "🏆 التحديات"               : "🏆 Challenges"            },
    { href: `/${locale}/leaderboard`,           label: isAr ? "🥇 المتصدرون"              : "🥇 Leaderboard"           },
  ];

const moreLinks = (isAr: boolean, locale: string) =>
  [
    { href: `/${locale}/courses`,   label: isAr ? "الدورات"             : "Courses"         },
    { href: `/${locale}/tools`,     label: isAr ? "أدوات AI"            : "AI Tools"        },
    { href: `/${locale}/blog`,      label: isAr ? "المدونة"             : "Blog"            },
    { href: `/${locale}/glossary`,  label: isAr ? "المسرد"              : "Glossary"        },
    { href: `/${locale}/about`,     label: isAr ? "عن المنصة"           : "About"           },
    { href: `/${locale}/contact`,   label: isAr ? "تواصل معنا"          : "Contact"         },
    { href: `/${locale}/privacy`,   label: isAr ? "سياسة الخصوصية"     : "Privacy Policy"  },
    { href: `/${locale}/terms`,     label: isAr ? "شروط الخدمة"         : "Terms"           },
  ];

export default function Footer({ locale }: FooterProps) {
  const isAr = locale === "ar";
  const studio = aiStudioLinks(isAr, locale);
  const more = moreLinks(isAr, locale);

  return (
    <footer
      className="border-t mt-24"
      style={{
        background: "var(--color-surface-container-lowest)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div className="container-xl pt-14 pb-8">

        {/* Main grid — 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand + Community Signup */}
          <div className="md:col-span-1">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 font-display font-bold text-xl mb-3"
              style={{ color: "var(--color-primary)" }}
            >
              <Bot size={24} style={{ color: "var(--color-tertiary)" }} />
              {isAr ? "منصة درهوس" : "Darhous"}
            </Link>
            <p
              className="text-xs leading-relaxed mb-1 font-mono"
              style={{ color: "var(--color-secondary)", opacity: 0.8 }}
            >
              {isAr ? "المنصة التعليمية الذكية" : "Smart Learning Ecosystem"}
            </p>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              {isAr
                ? "منصة عربية ذكية تجمع كل أدوات التعلم والتقييم والتوظيف في مكان واحد."
                : "A smart Arabic platform uniting learning, assessment, and career tools in one place."}
            </p>
            <CommunitySignup locale={locale} variant="footer" source="footer" />
          </div>

          {/* Portals column */}
          <div>
            <h4
              className="font-mono text-xs tracking-wider uppercase mb-4"
              style={{ color: "var(--color-secondary)" }}
            >
              {isAr ? "البوابات" : "Portals"}
            </h4>
            <ul className="space-y-2">
              {portals.map((portal) => (
                <li key={portal.id}>
                  <Link
                    href={`/${locale}${portal.href}`}
                    className="text-sm transition-opacity hover:opacity-80 flex items-center gap-1.5"
                    style={{ color: "var(--color-on-surface-variant)", textDecoration: "none" }}
                  >
                    <span className="text-xs leading-none">{portal.icon}</span>
                    {isAr ? portal.titleAr : portal.titleEn}
                    {portal.status !== "available" && (
                      <span
                        className="text-[9px] px-1 py-0.5 rounded font-mono"
                        style={{ background: "rgba(148,163,184,0.1)", color: "#94a3b8" }}
                      >
                        {isAr ? "قريبًا" : "Soon"}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Studio */}
          <div>
            <h4
              className="font-mono text-xs tracking-wider uppercase mb-4"
              style={{ color: "var(--color-tertiary)" }}
            >
              AI Studio
            </h4>
            <ul className="space-y-2">
              {studio.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-opacity hover:opacity-80"
                    style={{ color: "var(--color-on-surface-variant)", textDecoration: "none" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More links */}
          <div>
            <h4
              className="font-mono text-xs tracking-wider uppercase mb-4"
              style={{ color: "var(--color-primary)" }}
            >
              {isAr ? "روابط" : "Links"}
            </h4>
            <ul className="space-y-2">
              {more.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-opacity hover:opacity-80"
                    style={{ color: "var(--color-on-surface-variant)", textDecoration: "none" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom center strip */}
        <div
          className="pt-6 border-t flex flex-col items-center gap-4"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <SocialLinksBar locale={locale} variant="footer" />

          {/* Signature */}
          <p
            className="text-xs font-mono text-center"
            style={{ color: "var(--color-on-surface-variant)", opacity: 0.5 }}
          >
            designed by{" "}
            <a
              href="mailto:ahmeddarhous@gmail.com"
              className="transition-opacity hover:opacity-100"
              style={{ color: "var(--color-primary)", textDecoration: "none", opacity: 0.85 }}
            >
              Ahmed Darhous
            </a>{" "}
            ©
          </p>
        </div>
      </div>
    </footer>
  );
}
