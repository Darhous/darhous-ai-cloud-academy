import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Design Lab — NexaLearn Reference Redesign",
  robots: { index: false, follow: false, nocache: true },
};

const CONCEPTS = [
  {
    id: 1,
    slug: "reference-concept-1",
    nameEn: "Reference Faithful",
    nameAr: "النسخة الأمينة للمرجع",
    descEn: "Closest structural adaptation of ahmedali.online DNA. Dark glassmorphism. Full 14-section layout. All five libraries.",
    descAr: "أقرب تكيّف هيكلي لـ DNA الموقع المرجعي. glassmorphism داكن. 14 قسماً كاملاً. المكتبات الخمس.",
    libraries: "ShimmerButton + AnimatedGridPattern + BentoGrid + BackgroundBeams",
    status: "Ready",
    highlight: false,
  },
  {
    id: 2,
    slug: "reference-concept-2",
    nameEn: "Cinematic Enhanced",
    nameAr: "السينمائية المعززة",
    descEn: "Maximum visual impact. BackgroundBeams hero, BentoGrid features, HoverEffect portals, WordRotate headline. OLED black base.",
    descAr: "أقصى تأثير بصري. BackgroundBeams في الـ hero، BentoGrid للميزات، HoverEffect للبوابات. قاعدة OLED سوداء.",
    libraries: "BackgroundBeams + BentoGrid + HoverEffect + WordRotate + AnimatedGradientText",
    status: "Ready",
    highlight: true,
  },
  {
    id: 3,
    slug: "reference-concept-3",
    nameEn: "Arabic RTL Excellence",
    nameAr: "التميّز العربي RTL",
    descEn: "Designed natively for Arabic. RTL-first layout, Arabic as primary language, warm gold accent, Arabic UX patterns.",
    descAr: "مصمّم بالعربية كلغة أولى. تخطيط RTL-first، العربية هي اللغة الأساسية، لون ذهبي دافئ.",
    libraries: "ShimmerButton + WordRotate (AR) + AnimatedGradientText + BackgroundBeams + BentoGrid",
    status: "Ready",
    highlight: false,
  },
  {
    id: 4,
    slug: "reference-concept-4",
    nameEn: "SaaS Education Platform",
    nameAr: "منصة SaaS التعليمية",
    descEn: "Product homepage approach. Pricing tiers (Free/Pro/Team), enrollment funnel, testimonials, BentoGrid features.",
    descAr: "نهج صفحة المنتج. خطط أسعار (مجاني/برو/فريق)، قمع التسجيل، شهادات، BentoGrid للميزات.",
    libraries: "BentoGrid + HoverEffect + ShimmerButton + AnimatedGradientText + Card",
    status: "Ready",
    highlight: false,
  },
  {
    id: 5,
    slug: "reference-concept-5",
    nameEn: "High Conversion",
    nameAr: "الإقناع والتحويل",
    descEn: "Every section drives enrollment. Urgency strip, FAQ accordion, 3 ShimmerButton CTAs, social proof first, friction reducers.",
    descAr: "كل قسم يدفع للتسجيل. شريط إلحاح، FAQ، 3 CTAs، الإثبات الاجتماعي أولاً، تقليل الاحتكاك.",
    libraries: "ShimmerButton (x3) + AnimatedGradientText + AnimatedGridPattern + BackgroundBeams + HoverEffect",
    status: "Ready",
    highlight: false,
  },
];

export default async function DesignLabIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return (
    <div
      className="min-h-screen bg-[#0c0e12] text-[#e2e2e8] font-sans"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Warning banner */}
      <div className="bg-amber-500/10 border-b border-amber-500/30 px-6 py-3 text-center">
        <span className="text-amber-400 text-sm font-mono">
          ⚠ Internal Design Lab — Not linked from production — Not indexed by search engines
        </span>
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-4">
          <span className="px-3 py-1 bg-[#8ed5ff]/10 border border-[#8ed5ff]/30 rounded-full text-[#8ed5ff] text-xs font-mono">
            Reference Redesign · ahmedali.online → NexaLearn
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {isAr ? "مختبر التصميم — النسخ المرجعية" : "Design Lab — Reference Concepts"}
        </h1>
        <p className="text-[#e2e2e8]/60 text-lg max-w-2xl mb-6">
          {isAr
            ? "خمس نسخ مستوحاة من تحليل عميق لـ ahmedali.online، محوّلة لهوية NexaLearn. المفاهيم القديمة الخمسة تم رفضها واستبدالها بالكامل."
            : "Five concepts built from a deep analysis of ahmedali.online, adapted to NexaLearn's identity. The previous five concepts were rejected and fully replaced."}
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400">
            ✕ Old Concepts Removed
          </span>
          <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-400">
            ✓ Production Homepage Untouched
          </span>
          <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-400">
            ✓ Navbar/Footer Untouched
          </span>
          <span className="px-3 py-1 bg-[#8ed5ff]/10 border border-[#8ed5ff]/30 rounded-full text-[#8ed5ff]">
            ✓ 5 Libraries Used in Each
          </span>
        </div>
      </div>

      {/* Concepts grid */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONCEPTS.map((concept) => (
            <div
              key={concept.id}
              className={`relative rounded-2xl border p-6 flex flex-col gap-4 transition-all duration-300 hover:border-[#8ed5ff]/40 hover:bg-white/5 ${
                concept.highlight
                  ? "bg-[#8ed5ff]/5 border-[#8ed5ff]/30 ring-1 ring-[#8ed5ff]/20"
                  : "bg-white/[0.03] border-white/10"
              }`}
            >
              {concept.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-[#8ed5ff] text-[#0c0e12] text-xs font-bold rounded-full">
                    Recommended First
                  </span>
                </div>
              )}

              {/* Number badge */}
              <div className="flex items-center justify-between">
                <span className="text-4xl font-black text-white/10 font-mono leading-none">
                  0{concept.id}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-mono ${
                    concept.status === "Ready"
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}
                >
                  {concept.status}
                </span>
              </div>

              {/* Name */}
              <div>
                <h2 className="text-xl font-bold text-white mb-1">{concept.nameEn}</h2>
                <p className="text-sm text-[#8ed5ff]/70">{concept.nameAr}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-[#e2e2e8]/60 leading-relaxed flex-1">
                {isAr ? concept.descAr : concept.descEn}
              </p>

              {/* Libraries used */}
              <div>
                <p className="text-xs text-white/30 mb-1 font-mono uppercase tracking-wider">Libraries</p>
                <p className="text-xs text-[#d0bcff]/60 font-mono">{concept.libraries}</p>
              </div>

              {/* Open button */}
              <Link
                href={`/${locale}/design-lab/${concept.slug}`}
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#8ed5ff]/40 rounded-xl text-sm font-medium text-white transition-all duration-200"
              >
                {isAr ? "فتح التصميم ←" : "Open Concept →"}
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">
            {isAr ? "مقارنة بين المفاهيم" : "Concept Comparison"}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/40 font-mono font-normal">Aspect</th>
                  <th className="text-left py-3 px-4 text-[#8ed5ff]/80 font-mono font-normal">C1 Faithful</th>
                  <th className="text-left py-3 px-4 text-[#d0bcff]/80 font-mono font-normal">C2 Cinematic</th>
                  <th className="text-left py-3 px-4 text-[#f59e0b]/80 font-mono font-normal">C3 Arabic</th>
                  <th className="text-left py-3 px-4 text-[#3ce0fb]/80 font-mono font-normal">C4 SaaS</th>
                  <th className="text-left py-3 px-4 text-[#a855f7]/80 font-mono font-normal">C5 Convert</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { aspect: "Background", c1: "Dark glass", c2: "OLED + Beams", c3: "Dark + Gold", c4: "Dark gradient", c5: "Dark + Strip" },
                  { aspect: "Hero style", c1: "Typography", c2: "Beams+Rotate", c3: "Arabic-first", c4: "Product mock", c5: "Social proof" },
                  { aspect: "Portal section", c1: "Glass cards", c2: "HoverEffect", c3: "RTL glass", c4: "HoverEffect", c5: "BentoGrid" },
                  { aspect: "Unique section", c1: "—", c2: "BentoGrid about", c3: "Warm gold", c4: "Pricing tiers", c5: "FAQ + CTA strip" },
                  { aspect: "CTA density", c1: "Medium", c2: "Medium", c3: "Medium", c4: "High", c5: "Very High" },
                  { aspect: "Primary library", c1: "Balanced", c2: "Aceternity", c3: "Motion/AR", c4: "shadcn", c5: "ShimmerButton" },
                ].map((row) => (
                  <tr key={row.aspect} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 text-white/40 font-mono">{row.aspect}</td>
                    <td className="py-3 px-4 text-white/70">{row.c1}</td>
                    <td className="py-3 px-4 text-white/70">{row.c2}</td>
                    <td className="py-3 px-4 text-white/70">{row.c3}</td>
                    <td className="py-3 px-4 text-white/70">{row.c4}</td>
                    <td className="py-3 px-4 text-white/70">{row.c5}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report links */}
        <div className="mt-12 p-6 bg-white/[0.02] border border-white/10 rounded-2xl">
          <h3 className="text-sm font-mono text-white/40 uppercase tracking-wider mb-4">Reports</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "README.md",
              "reference-analysis.md",
              "library-usage-matrix.md",
              "reference-feature-checklist.md",
              "production-safety.md",
            ].map((file) => (
              <span
                key={file}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/50"
              >
                docs/reports/2026-06-11-ahmedali-reference-redesign/{file}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
