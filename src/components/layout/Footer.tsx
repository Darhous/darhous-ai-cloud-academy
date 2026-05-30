import Link from "next/link";
import { Bot } from "lucide-react";
import SocialLinksBar from "./SocialLinksBar";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const isAr = locale === "ar";

  const quickLinks = isAr
    ? [
        { href: "/courses",  label: "الدورات" },
        { href: "/paths",    label: "المسارات" },
        { href: "/tools",    label: "أدوات AI" },
        { href: "/claude",   label: "إتقان Claude" },
        { href: "/cloud",    label: "أكاديمية الكلاود" },
        { href: "/projects", label: "المشاريع" },
        { href: "/prompts",  label: "مكتبة البرومبتات" },
        { href: "/blog",     label: "المدونة" },
      ]
    : [
        { href: "/courses",  label: "Courses" },
        { href: "/paths",    label: "Learning Paths" },
        { href: "/tools",    label: "AI Tools" },
        { href: "/claude",   label: "Claude Mastery" },
        { href: "/cloud",    label: "Cloud Academy" },
        { href: "/projects", label: "Projects" },
        { href: "/prompts",  label: "Prompt Library" },
        { href: "/blog",     label: "Blog" },
      ];

  const aiStudioLinks = isAr
    ? [
        { href: "/mentor",                label: "✨ مرشد AI" },
        { href: "/prompt-studio",         label: "⚡ استوديو البرومبتات" },
        { href: "/claude-code-generator", label: "🛠️ مولّد Claude Code" },
        { href: "/tool-recommender",      label: "🔎 مرشّح الأدوات" },
        { href: "/roadmap-generator",     label: "🗺️ مولّد خطط التعلم" },
        { href: "/dashboard",             label: "📂 محفوظاتي" },
      ]
    : [
        { href: "/mentor",                label: "✨ AI Mentor" },
        { href: "/prompt-studio",         label: "⚡ Prompt Studio" },
        { href: "/claude-code-generator", label: "🛠️ Claude Code Generator" },
        { href: "/tool-recommender",      label: "🔎 Tool Recommender" },
        { href: "/roadmap-generator",     label: "🗺️ Roadmap Generator" },
        { href: "/dashboard",             label: "📂 My Saved Items" },
      ];

  const moreLinks = isAr
    ? [
        { href: "/glossary", label: "المسرد" },
        { href: "/about",    label: "عن المنصة" },
        { href: "/contact",  label: "تواصل معنا" },
        { href: "/privacy",  label: "سياسة الخصوصية" },
        { href: "/terms",    label: "شروط الخدمة" },
      ]
    : [
        { href: "/glossary", label: "Glossary" },
        { href: "/about",    label: "About" },
        { href: "/contact",  label: "Contact" },
        { href: "/privacy",  label: "Privacy Policy" },
        { href: "/terms",    label: "Terms of Service" },
      ];

  return (
    <footer
      className="border-t mt-24"
      style={{
        background: "var(--color-surface-container-lowest)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div className="container-xl pt-14 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 font-display font-bold text-xl mb-4"
              style={{ color: "var(--color-primary)" }}
            >
              <Bot size={24} style={{ color: "var(--color-tertiary)" }} />
              {isAr ? "درهوس AI" : "Darhous AI"}
            </Link>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              {isAr
                ? "منصة عربية عملية لتعلم الذكاء الاصطناعي والكلاود من الصفر حتى بناء مشاريع حقيقية."
                : "A practical AI and Cloud learning platform from zero to real-world projects."}
            </p>
            {/* Email CTA */}
            <a
              href="mailto:ahmeddarhous@gmail.com"
              className="inline-flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-lg transition-opacity hover:opacity-80"
              style={{
                background: "rgba(142,213,255,0.07)",
                border: "1px solid rgba(142,213,255,0.15)",
                color: "var(--color-primary)",
                textDecoration: "none",
              }}
            >
              ✉️ ahmeddarhous@gmail.com
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-mono text-xs tracking-wider uppercase mb-4"
              style={{ color: "var(--color-primary)" }}
            >
              {isAr ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm transition-opacity hover:opacity-80"
                    style={{ color: "var(--color-on-surface-variant)" }}
                  >
                    {link.label}
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
              {aiStudioLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm transition-opacity hover:opacity-80"
                    style={{ color: "var(--color-on-surface-variant)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h4
              className="font-mono text-xs tracking-wider uppercase mb-4"
              style={{ color: "var(--color-secondary)" }}
            >
              {isAr ? "روابط أخرى" : "More"}
            </h4>
            <ul className="space-y-2">
              {moreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm transition-opacity hover:opacity-80"
                    style={{ color: "var(--color-on-surface-variant)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-5"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          {/* Social icons */}
          <SocialLinksBar locale={locale} variant="footer" />

          {/* Credit */}
          <p
            className="text-xs font-mono text-center"
            style={{ color: "var(--color-on-surface-variant)", opacity: 0.55 }}
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
