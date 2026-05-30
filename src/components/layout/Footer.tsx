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
        { href: "/courses", label: "الدورات" },
        { href: "/paths", label: "المسارات" },
        { href: "/tools", label: "أدوات AI" },
        { href: "/claude", label: "إتقان Claude" },
        { href: "/cloud", label: "أكاديمية الكلاود" },
        { href: "/projects", label: "المشاريع" },
      ]
    : [
        { href: "/courses", label: "Courses" },
        { href: "/paths", label: "Learning Paths" },
        { href: "/tools", label: "AI Tools" },
        { href: "/claude", label: "Claude Mastery" },
        { href: "/cloud", label: "Cloud Academy" },
        { href: "/projects", label: "Projects" },
      ];

  const resourceLinks = isAr
    ? [
        { href: "/prompts", label: "مكتبة المطالبات" },
        { href: "/blog", label: "المدونة" },
        { href: "/glossary", label: "المسرد" },
        { href: "/about", label: "عن المنصة" },
        { href: "/contact", label: "تواصل معنا" },
      ]
    : [
        { href: "/prompts", label: "Prompt Library" },
        { href: "/blog", label: "Blog" },
        { href: "/glossary", label: "Glossary" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
      ];

  const aiStudioLinks = isAr
    ? [
        { href: "/mentor",                label: "✨ مرشد AI" },
        { href: "/prompt-studio",         label: "⚡ استوديو البرومبتات" },
        { href: "/claude-code-generator", label: "🛠️ مولّد برومبت Claude Code" },
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

  return (
    <footer
      className="border-t mt-24"
      style={{
        background: "var(--color-surface-container-lowest)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div className="container-xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">

          {/* Brand + Social */}
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
              className="text-sm leading-relaxed mb-5"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              {isAr
                ? "منصة عربية عملية لتعلم الذكاء الاصطناعي والكلاود من الصفر حتى بناء مشاريع حقيقية."
                : "A practical AI and Cloud learning platform from zero to real-world projects."}
            </p>
            {/* Social links — icon row */}
            <SocialLinksBar locale={locale} variant="footer" />
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
                    className="text-sm transition-colors hover:text-primary"
                    style={{ color: "var(--color-on-surface-variant)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4
              className="font-mono text-xs tracking-wider uppercase mb-4"
              style={{ color: "var(--color-tertiary)" }}
            >
              {isAr ? "الموارد" : "Resources"}
            </h4>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm transition-colors hover:text-primary"
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
              style={{ color: "var(--color-primary)" }}
            >
              AI Studio
            </h4>
            <ul className="space-y-2">
              {aiStudioLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm transition-colors hover:text-primary"
                    style={{ color: "var(--color-on-surface-variant)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community + Connect */}
          <div>
            <h4
              className="font-mono text-xs tracking-wider uppercase mb-4"
              style={{ color: "var(--color-secondary)" }}
            >
              {isAr ? "المجتمع" : "Community"}
            </h4>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              {isAr
                ? "انضم إلى مجتمع متعلمي AI العرب"
                : "Join the Arabic AI learners community"}
            </p>
            <div className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder={isAr ? "بريدك الإلكتروني" : "Your email"}
                className="flex-1 px-3 py-2 rounded-lg text-sm font-mono outline-none"
                style={{
                  background: "var(--color-surface-container)",
                  border: "1px solid var(--color-outline-variant)",
                  color: "var(--color-on-surface)",
                }}
              />
              <button className="glow-button-primary text-white text-xs font-mono px-3 py-2 rounded-lg whitespace-nowrap">
                {isAr ? "انضم" : "Join"}
              </button>
            </div>

            {/* Social links — connect label in Community column */}
            <p
              className="font-mono text-[10px] tracking-wider uppercase mb-2"
              style={{ color: "var(--color-on-surface-variant)", opacity: 0.6 }}
            >
              {isAr ? "تواصل معنا" : "Connect with us"}
            </p>
            <SocialLinksBar locale={locale} variant="footer" />
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <p
            className="text-xs font-mono"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            {isAr
              ? "© 2025 أكاديمية درهوس للذكاء الاصطناعي والكلاود. جميع الحقوق محفوظة."
              : "© 2025 Darhous AI Cloud Academy. All rights reserved."}
          </p>
          <div className="flex gap-6">
            {[
              { href: "/privacy", label: isAr ? "سياسة الخصوصية" : "Privacy Policy" },
              { href: "/terms",   label: isAr ? "شروط الخدمة"     : "Terms of Service" },
            ].map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className="text-xs font-mono transition-colors hover:text-primary"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
