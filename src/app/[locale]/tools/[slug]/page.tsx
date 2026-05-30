import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { tools } from "@/data/tools";
import { courses } from "@/data/courses";
import { prompts } from "@/data/prompts";
import Badge from "@/components/ui/Badge";
import { CheckCircle2, XCircle, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import AskThisPageButton from "@/components/ui/AskThisPageButton";

type Params = Promise<{ locale: string; slug: string }>;

export async function generateStaticParams() {
  const locales = ["ar", "en"];
  return locales.flatMap((locale) =>
    tools.map((t) => ({ locale, slug: t.id }))
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const tool = tools.find((t) => t.id === slug);
  if (!tool) return { title: "Tool Not Found" };
  const isAr = locale === "ar";
  return {
    title: tool.name,
    description: isAr ? tool.shortDescriptionAr : tool.shortDescriptionEn,
  };
}

const pricingLabel = {
  free: { ar: "مجاني", en: "Free" },
  freemium: { ar: "مجاني جزئيًا", en: "Freemium" },
  paid: { ar: "مدفوع", en: "Paid" },
  "open-source": { ar: "مفتوح المصدر", en: "Open Source" },
};
const pricingVariant = { free: "tertiary", freemium: "secondary", paid: "outline", "open-source": "primary" } as const;

export default async function ToolDetailPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const tool = tools.find((t) => t.id === slug);
  if (!tool) notFound();

  const isAr = locale === "ar";
  const BackChevron = isAr ? ChevronRight : ChevronLeft;

  const relatedCoursesList = (tool.relatedCourses ?? [])
    .map((cid) => courses.find((c) => c.id === cid))
    .filter(Boolean);

  const relatedPromptsList = (tool.relatedPrompts ?? [])
    .map((pid) => prompts.find((p) => p.id === pid))
    .filter(Boolean);

  const similarTools = tools
    .filter((t) => t.id !== tool.id && t.category === tool.category)
    .slice(0, 4);

  return (
    <div className="container-xl py-12 flex flex-col gap-10">
      {/* Back */}
      <Link
        href={`/${locale}/tools`}
        className="flex items-center gap-2 text-sm font-mono w-max transition-colors hover:opacity-80"
        style={{ color: "var(--color-primary)" }}
      >
        <BackChevron size={16} />
        {isAr ? "مركز الأدوات" : "AI Tools Hub"}
      </Link>

      {/* Hero */}
      <div
        className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(87,27,193,0.1) 0%, rgba(0,102,138,0.15) 100%)",
          border: "1px solid rgba(208,188,255,0.1)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-start gap-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
            style={{ background: "var(--color-surface-container-high)" }}>
            🛠️
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant={pricingVariant[tool.pricingType]}>
                {isAr ? pricingLabel[tool.pricingType].ar : pricingLabel[tool.pricingType].en}
              </Badge>
              <Badge variant={tool.level === "beginner" ? "beginner" : tool.level === "intermediate" ? "intermediate" : "advanced"}>
                {tool.level}
              </Badge>
              <span className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                {tool.category}
              </span>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl mb-3" style={{ color: "var(--color-on-surface)" }}>
              {tool.name}
            </h1>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? (tool.overviewAr || tool.shortDescriptionAr) : (tool.overviewEn || tool.shortDescriptionEn)}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {tool.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-mono"
                  style={{ background: "var(--color-surface-container)", color: "var(--color-on-surface-variant)" }}>
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {tool.website && (
                <a href={tool.website} target="_blank" rel="noopener noreferrer"
                  className="glow-button-primary text-white font-mono text-sm px-6 py-3 rounded-xl flex items-center gap-2">
                  {isAr ? "زيارة الموقع" : "Visit Site"} <ExternalLink size={14} />
                </a>
              )}
              <button
                className="font-mono text-sm px-6 py-3 rounded-xl border transition-all hover:-translate-y-0.5"
                style={{ borderColor: "var(--color-outline-variant)", color: "var(--color-on-surface)" }}>
                {isAr ? "حفظ في المفضلة" : "Save to Favorites"}
              </button>
              <AskThisPageButton
                locale={locale}
                contextTitle={tool.name}
                contextHint={isAr
                  ? `اشرح لي أداة ${tool.name} وكيف أستخدمها لأقصى استفادة`
                  : `Explain ${tool.name} and how to use it effectively`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Use Cases */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-display font-bold text-xl mb-4" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "حالات الاستخدام الرئيسية" : "Main Use Cases"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {tool.useCases.map((uc) => (
                <span key={uc} className="px-3 py-1.5 rounded-xl text-sm"
                  style={{ background: "rgba(142,213,255,0.08)", color: "var(--color-primary)", border: "1px solid rgba(142,213,255,0.2)" }}>
                  {uc}
                </span>
              ))}
            </div>
          </div>

          {/* How to Start */}
          {(isAr ? tool.howToStartAr : tool.howToStartEn) && (
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-display font-bold text-xl mb-4" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "كيف تبدأ؟" : "How to Get Started"}
              </h2>
              <ol className="space-y-3">
                {(isAr ? tool.howToStartAr! : tool.howToStartEn!).map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono flex-shrink-0"
                      style={{ background: "var(--color-primary)", color: "black" }}>
                      {i + 1}
                    </span>
                    <span className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Pros & Cons */}
          {(tool.pros || tool.limitations) && (
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-display font-bold text-xl mb-4" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "المزايا والقيود" : "Pros & Limitations"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {tool.pros && (
                  <div>
                    <p className="font-mono text-xs tracking-wider uppercase mb-3" style={{ color: "var(--color-tertiary)" }}>
                      {isAr ? "المزايا" : "Pros"}
                    </p>
                    <ul className="space-y-2">
                      {tool.pros.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                          <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-tertiary)" }} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {tool.limitations && (
                  <div>
                    <p className="font-mono text-xs tracking-wider uppercase mb-3" style={{ color: "#f87171" }}>
                      {isAr ? "القيود" : "Limitations"}
                    </p>
                    <ul className="space-y-2">
                      {tool.limitations.map((l, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                          <XCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: "#f87171" }} />
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Related Prompts */}
          {relatedPromptsList.length > 0 && (
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-display font-bold text-xl mb-4" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "مطالبات مرتبطة" : "Related Prompts"}
              </h2>
              <div className="space-y-3">
                {relatedPromptsList.map((p) => p && (
                  <Link
                    key={p.id}
                    href={`/${locale}/prompts`}
                    className="flex items-center justify-between p-3 rounded-xl group transition-all hover:-translate-y-0.5"
                    style={{ background: "var(--color-surface-container)" }}
                  >
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--color-on-surface)" }}>
                        {isAr ? p.titleAr : p.titleEn}
                      </p>
                      <p className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                        {p.category} • {p.difficulty}
                      </p>
                    </div>
                    <span className="text-xs font-mono" style={{ color: "var(--color-primary)" }}>→</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Best for */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-mono text-xs tracking-wider uppercase mb-3" style={{ color: "var(--color-tertiary)" }}>
              {isAr ? "الأفضل لـ" : "Best For"}
            </h3>
            <p className="text-base" style={{ color: "var(--color-on-surface)" }}>{tool.bestFor}</p>
          </div>

          {/* Alternatives */}
          {tool.alternatives && tool.alternatives.length > 0 && (
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold text-base mb-3" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "البدائل" : "Alternatives"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tool.alternatives.map((alt) => {
                  const altTool = tools.find((t) => t.name === alt || t.id === alt.toLowerCase().replace(/\s/g, "-"));
                  return altTool ? (
                    <Link
                      key={alt}
                      href={`/${locale}/tools/${altTool.id}`}
                      className="px-3 py-1.5 rounded-full text-xs font-mono border transition-all hover:scale-105"
                      style={{ background: "var(--color-surface-container)", borderColor: "var(--color-outline-variant)", color: "var(--color-primary)" }}
                    >
                      {alt}
                    </Link>
                  ) : (
                    <span key={alt} className="px-3 py-1.5 rounded-full text-xs font-mono border"
                      style={{ background: "var(--color-surface-container)", borderColor: "var(--color-outline-variant)", color: "var(--color-on-surface-variant)" }}>
                      {alt}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Related Courses */}
          {relatedCoursesList.length > 0 && (
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold text-base mb-3" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "دورات مرتبطة" : "Related Courses"}
              </h3>
              <div className="space-y-2">
                {relatedCoursesList.map((c) => c && (
                  <Link key={c.id} href={`/${locale}/courses/${c.id}`}
                    className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                    style={{ color: "var(--color-primary)" }}>
                    <span>{c.icon}</span>
                    {isAr ? c.titleAr : c.titleEn}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Similar tools */}
          {similarTools.length > 0 && (
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold text-base mb-3" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "أدوات مشابهة" : "Similar Tools"}
              </h3>
              <div className="space-y-2">
                {similarTools.map((t) => (
                  <Link key={t.id} href={`/${locale}/tools/${t.id}`}
                    className="flex items-center justify-between text-sm p-2 rounded-lg transition-all hover:bg-surface-container"
                    style={{ color: "var(--color-on-surface-variant)" }}>
                    <span>{t.name}</span>
                    <span className="text-xs font-mono" style={{ color: "var(--color-outline)" }}>→</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to hub */}
          <Link
            href={`/${locale}/tools`}
            className="glass-card rounded-2xl p-4 text-center text-sm font-mono transition-all hover:-translate-y-0.5"
            style={{ color: "var(--color-primary)" }}
          >
            ← {isAr ? "العودة لمركز الأدوات" : "Back to Tools Hub"}
          </Link>
        </div>
      </div>
    </div>
  );
}
