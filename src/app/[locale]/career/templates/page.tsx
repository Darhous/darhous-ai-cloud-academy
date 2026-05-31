import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, Eye, CheckCircle2 } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "قوالب السيرة الذاتية | درهوس" : "CV Templates | Darhous",
    description: isAr
      ? "3 قوالب سيرة ذاتية احترافية جاهزة للتحميل — مصممة خصيصاً لسوق العمل العربي."
      : "3 professional CV templates ready to download — designed for the Arab job market.",
  };
}

const TEMPLATES = [
  {
    id: "modern-ats",
    titleAr: "Modern ATS",
    descAr: "تصميم نظيف ومرتب يمر بسهولة عبر أنظمة التتبع الآلي ATS، مناسب لأدوار التقنية وإدارة المنتجات.",
    color: "#f59e0b",
    badge: "الأكثر توصية",
    features: ["توافق ATS عالي", "قسم المهارات بارز", "تنسيق عمودي نظيف"],
  },
  {
    id: "classic-professional",
    titleAr: "Classic Professional",
    descAr: "تصميم كلاسيكي أنيق يتناسب مع بيئات العمل المؤسسية التقليدية والقطاع الحكومي والمالي.",
    color: "#8ed5ff",
    badge: "الأكثر استخداماً",
    features: ["مظهر مؤسسي رصين", "سهل القراءة", "يدعم اللغة العربية والإنجليزية"],
  },
  {
    id: "creative-modern",
    titleAr: "Creative Modern",
    descAr: "تصميم إبداعي مع لمسات بصرية مميزة، مناسب للمصممين وصانعي المحتوى والمجالات الإبداعية.",
    color: "#d0bcff",
    badge: "للمبدعين",
    features: ["شريط جانبي ملون", "أيقونات مهنية", "مناسب للأدوار الإبداعية"],
  },
];

export default async function TemplatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="container-xl py-12" dir="rtl">
      <div className="mb-8">
        <Link
          href={`/${locale}/career`}
          className="inline-flex items-center gap-2 text-sm font-mono mb-6 transition-opacity hover:opacity-70"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          <ArrowRight size={14} />
          العودة لبوابة التوظيف
        </Link>
        <h1 className="font-display font-bold text-3xl mb-2" style={{ color: "var(--color-on-surface)" }}>
          قوالب السيرة الذاتية
        </h1>
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          ثلاثة قوالب احترافية مصممة خصيصاً لسوق العمل العربي — مجانية ومتوافقة مع ATS.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {TEMPLATES.map((tmpl) => (
          <div
            key={tmpl.id}
            className="glass-card rounded-2xl overflow-hidden flex flex-col"
            style={{ border: `1px solid ${tmpl.color}18` }}
          >
            {/* Preview area */}
            <div
              className="h-48 flex items-center justify-center relative"
              style={{ background: `${tmpl.color}06`, borderBottom: `1px solid ${tmpl.color}12` }}
            >
              <div className="w-24 h-32 rounded-lg shadow-lg flex flex-col overflow-hidden" style={{ background: "#fff" }}>
                <div className="h-8 flex items-center justify-center" style={{ background: tmpl.color }}>
                  <span className="text-white text-[8px] font-bold">RESUME</span>
                </div>
                <div className="flex-1 p-1.5 space-y-1">
                  <div className="h-1 rounded" style={{ background: "#e5e7eb", width: "80%" }} />
                  <div className="h-1 rounded" style={{ background: "#e5e7eb", width: "60%" }} />
                  <div className="h-1 rounded mt-2" style={{ background: "#f3f4f6", width: "100%" }} />
                  <div className="h-1 rounded" style={{ background: "#f3f4f6", width: "90%" }} />
                  <div className="h-1 rounded" style={{ background: "#f3f4f6", width: "75%" }} />
                </div>
              </div>
              <span
                className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded-full"
                style={{ background: `${tmpl.color}15`, color: tmpl.color, border: `1px solid ${tmpl.color}25` }}
              >
                {tmpl.badge}
              </span>
            </div>

            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-bold text-base mb-2" style={{ color: "var(--color-on-surface)" }}>{tmpl.titleAr}</h3>
              <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--color-on-surface-variant)" }}>{tmpl.descAr}</p>

              <ul className="space-y-1.5 mb-5">
                {tmpl.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                    <CheckCircle2 size={12} style={{ color: "#4ade80" }} />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex gap-2">
                <button
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium"
                  style={{ background: `${tmpl.color}10`, color: tmpl.color, border: `1px solid ${tmpl.color}25` }}
                >
                  <Eye size={14} />
                  معاينة
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium"
                  style={{ background: `${tmpl.color}18`, color: tmpl.color, border: `1px solid ${tmpl.color}30` }}
                >
                  <Download size={14} />
                  تحميل مجاناً
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div
        className="rounded-2xl p-6 text-center"
        style={{ background: "rgba(245,158,11,0.04)", border: "1px solid rgba(245,158,11,0.1)" }}
      >
        <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          القوالب قيد التطوير النهائي. استخدم{" "}
          <Link href={`/${locale}/career/builder`} style={{ color: "#f59e0b" }} className="font-medium hover:underline">
            صانع السيرة الذاتية التفاعلي
          </Link>{" "}
          للبناء المباشر الآن.
        </p>
      </div>
    </div>
  );
}
