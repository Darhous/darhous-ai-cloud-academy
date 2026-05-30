import Link from "next/link";
import { Bot } from "lucide-react";
import SocialLinksBar from "./SocialLinksBar";
import CommunitySignup from "@/components/community/CommunitySignup";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const isAr = locale === "ar";

  const quickLinks = isAr
    ? [
        { href: "/courses",  label: "الدورات"            },
        { href: "/paths",    label: "المسارات"            },
        { href: "/tools",    label: "أدوات AI"            },
        { href: "/claude",   label: "إتقان Claude"        },
        { href: "/cloud",    label: "أكاديمية الكلاود"    },
        { href: "/projects", label: "المشاريع"            },
        { href: "/prompts",  label: "مكتبة البرومبتات"    },
        { href: "/blog",     label: "المدونة"             },
      ]
    : [
        { href: "/courses",  label: "Courses"         },
        { href: "/paths",    label: "Learning Paths"  },
        { href: "/tools",    label: "AI Tools"        },
        { href: "/claude",   label: "Claude Mastery"  },
        { href: "/cloud",    label: "Cloud Academy"   },
        { href: "/projects", label: "Projects"        },
        { href: "/prompts",  label: "Prompt Library"  },
        { href: "/blog",     label: "Blog"            },
      ];

  const aiStudioLinks = isAr
    ? [
        { href: "/mentor",                label: "✨ مرشد AI"               },
        { href: "/prompt-studio",         label: "⚡ استوديو البرومبتات"    },
        { href: "/prompt-score",          label: "🎯 تقييم البرومبت"        },
        { href: "/prompt-battle",         label: "⚔️ معركة البرومبتات"      },
        { href: "/claude-code-generator", label: "🛠️ مولّد Claude Code"     },
        { href: "/compare-tools",         label: "⚖️ مقارنة الأدوات"        },
        { href: "/roadmap-generator",     label: "🗺️ مولّد خطط التعلم"      },
        { href: "/project-generator",     label: "🚀 مولّد المشاريع"        },
        { href: "/nano-banana-prompts",   label: "🍌 Nano Banana Lab"        },
        { href: "/search",                label: "🔍 البحث الذكي"            },
        { href: "/challenges",            label: "🏆 التحديات"               },
        { href: "/dashboard",             label: "📂 لوحة الطالب"            },
      ]
    : [
        { href: "/mentor",                label: "✨ AI Mentor"             },
        { href: "/prompt-studio",         label: "⚡ Prompt Studio"         },
        { href: "/prompt-score",          label: "🎯 Prompt Score"          },
        { href: "/prompt-battle",         label: "⚔️ Prompt Battle"         },
        { href: "/claude-code-generator", label: "🛠️ Claude Code Generator" },
        { href: "/compare-tools",         label: "⚖️ Compare Tools"         },
        { href: "/roadmap-generator",     label: "🗺️ Roadmap Generator"     },
        { href: "/project-generator",     label: "🚀 Project Generator"     },
        { href: "/nano-banana-prompts",   label: "🍌 Nano Banana Lab"       },
        { href: "/search",                label: "🔍 Smart Search"          },
        { href: "/challenges",            label: "🏆 Challenges"            },
        { href: "/dashboard",             label: "📂 Student Dashboard"     },
      ];

  const moreLinks = isAr
    ? [
        { href: "/glossary",  label: "المسرد"             },
        { href: "/about",     label: "عن المنصة"          },
        { href: "/contact",   label: "تواصل معنا"         },
        { href: "/login",     label: "تسجيل الدخول"       },
        { href: "/register",  label: "إنشاء حساب"         },
        { href: "/privacy",   label: "سياسة الخصوصية"    },
        { href: "/terms",     label: "شروط الخدمة"        },
      ]
    : [
        { href: "/glossary",  label: "Glossary"        },
        { href: "/about",     label: "About"           },
        { href: "/contact",   label: "Contact"         },
        { href: "/login",     label: "Sign In"         },
        { href: "/register",  label: "Create Account"  },
        { href: "/privacy",   label: "Privacy Policy"  },
        { href: "/terms",     label: "Terms of Service"},
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

          {/* Brand + Community Signup */}
          <div className="md:col-span-1">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 font-display font-bold text-xl mb-4"
              style={{ color: "var(--color-primary)" }}
            >
              <Bot size={24} style={{ color: "var(--color-tertiary)" }} />
              {isAr ? "أكاديمية درهوس" : "Darhous AI"}
            </Link>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              {isAr
                ? "منصة عربية عملية لتعلم الذكاء الاصطناعي والكلاود من الصفر حتى بناء مشاريع حقيقية."
                : "A practical AI and Cloud learning platform from zero to real-world projects."}
            </p>
            <CommunitySignup locale={locale} variant="footer" source="footer" />
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

        {/* Bottom center strip */}
        <div
          className="pt-6 border-t flex flex-col items-center gap-4"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <SocialLinksBar locale={locale} variant="footer" />
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
