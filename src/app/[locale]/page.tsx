import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Sparkles, Check, ChevronRight } from "lucide-react";
import PortalCard from "@/components/ecosystem/PortalCard";
import Stats from "@/components/sections/Stats";
import CommunitySignup from "@/components/community/CommunitySignup";
import { portals, availablePortals, comingSoonPortals } from "@/config/portals";
import { FaInstagram, FaLinkedinIn, FaFacebook, FaWhatsapp } from "react-icons/fa";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "منصة درهوس التعليمية الذكية — منصة واحدة لكل مهارات المستقبل"
      : "Darhous Smart Learning Ecosystem — One Platform for All Future Skills",
    description: isAr
      ? "تعلم الذكاء الاصطناعي، اختبر مستواك، طوّر مهاراتك الرقمية، وابنِ مستقبلك المهني من مكان واحد"
      : "Learn AI, test your level, build digital skills, and shape your career from one unified platform",
    keywords: isAr
      ? ["منصة تعليمية", "ذكاء اصطناعي", "اختبارات لغة", "تحول رقمي", "درهوس", "تعلم"]
      : ["learning platform", "AI academy", "language portal", "digital exams", "Darhous"],
  };
}

const whyPoints = {
  ar: [
    { icon: "🌍", title: "منصة عربية ذكية", desc: "محتوى متخصص باللغة العربية لتلبية احتياجات المتعلم العربي" },
    { icon: "🔑", title: "حساب واحد للجميع", desc: "سجّل مرة واحدة واستخدم كل البوابات بنفس الحساب" },
    { icon: "🏗️", title: "تعليم قائم على المشاريع", desc: "تطبيق عملي حقيقي وليس مجرد محاضرات نظرية" },
    { icon: "📊", title: "اختبارات وتقارير فورية", desc: "نتائج لحظية وتقارير تفصيلية لكل اختبار ومهمة" },
    { icon: "💼", title: "ربط التعليم بالتوظيف", desc: "مسار متكامل من التعلم حتى الحصول على الوظيفة" },
    { icon: "🚀", title: "بوابات قابلة للتوسع", desc: "نضيف بوابات جديدة باستمرار لتلبية متطلبات السوق" },
    { icon: "📋", title: "لوحة تحكم موحدة", desc: "تتبع كل تقدمك وشهاداتك من مكان واحد" },
    { icon: "✨", title: "تجربة عصرية واحترافية", desc: "تصميم premium وتجربة مستخدم مدروسة بعناية" },
  ],
  en: [
    { icon: "🌍", title: "Arabic-First Platform", desc: "Specialized Arabic content tailored for Arab learners" },
    { icon: "🔑", title: "One Account for All", desc: "Register once and access all portals with a single account" },
    { icon: "🏗️", title: "Project-Based Learning", desc: "Real hands-on application, not just theory lectures" },
    { icon: "📊", title: "Instant Tests & Reports", desc: "Real-time results and detailed reports for every exam" },
    { icon: "💼", title: "Education Meets Career", desc: "A complete path from learning to landing a job" },
    { icon: "🚀", title: "Scalable Portal System", desc: "We continuously add new portals to meet market demand" },
    { icon: "📋", title: "Unified Dashboard", desc: "Track all your progress and certificates in one place" },
    { icon: "✨", title: "Premium UX", desc: "Modern design and carefully crafted user experience" },
  ],
};

const journeySteps = {
  ar: [
    "أنشئ حسابك مرة واحدة",
    "اختر البوابة المناسبة",
    "اختبر مستواك الحالي",
    "تعلم من مسارات عملية",
    "طبّق على مشاريع حقيقية",
    "ابنِ سيرتك الذاتية",
    "استعد لسوق العمل",
    "تابع تقدمك من لوحة واحدة",
  ],
  en: [
    "Create your account once",
    "Choose the right portal",
    "Test your current level",
    "Learn from practical paths",
    "Apply on real projects",
    "Build your CV & portfolio",
    "Prepare for the job market",
    "Track everything from one dashboard",
  ],
};

export default async function EcosystemHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const why = isAr ? whyPoints.ar : whyPoints.en;
  const journey = isAr ? journeySteps.ar : journeySteps.en;

  return (
    <div className="flex flex-col gap-28 pb-28">

      {/* ── 1. HERO ───────────────────────────────────────── */}
      <section className="container-xl pt-12 md:pt-20 relative">
        {/* ambient orbs */}
        <div className="absolute top-0 end-0 pointer-events-none" style={{ width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(142,213,255,0.07) 0%, transparent 65%)", filter: "blur(100px)" }} />
        <div className="absolute bottom-0 start-0 pointer-events-none" style={{ width: "40vw", height: "40vw", background: "radial-gradient(circle, rgba(87,27,193,0.08) 0%, transparent 65%)", filter: "blur(80px)" }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-mono"
            style={{ background: "rgba(142,213,255,0.06)", borderColor: "rgba(142,213,255,0.2)", color: "var(--color-primary)" }}
          >
            <Sparkles size={13} />
            {isAr ? "الجيل الجديد من التعلم الذكي" : "The Next Generation of Smart Learning"}
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-4xl md:text-6xl leading-tight" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? (
              <>منصة واحدة لكل <span className="gradient-text">مهارات المستقبل</span></>
            ) : (
              <>One Platform for All <span className="gradient-text">Future Skills</span></>
            )}
          </h1>

          {/* Sub */}
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr
              ? "تعلم الذكاء الاصطناعي، اختبر مستواك، طوّر مهاراتك الرقمية، وابنِ مستقبلك المهني من مكان واحد يجمع كل أدوات النجاح."
              : "Learn AI, test your level, build digital skills, and shape your career from one place that brings all success tools together."}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <Link
              href={`/${locale}/register`}
              className="glow-button-primary text-white font-mono px-7 py-3.5 rounded-xl inline-flex items-center gap-2 text-sm font-semibold"
            >
              <Sparkles size={15} />
              {isAr ? "ابدأ الآن" : "Start Now"}
              <Arrow size={15} />
            </Link>
            <Link
              href={`#portals`}
              className="glow-button-secondary font-mono px-7 py-3.5 rounded-xl inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "var(--color-secondary)" }}
            >
              {isAr ? "استكشف البوابات" : "Explore Portals"}
            </Link>
            <Link
              href={`/${locale}/login`}
              className="font-mono px-7 py-3.5 rounded-xl inline-flex items-center gap-2 text-sm transition-all hover:opacity-80 hover:border-outline-variant"
              style={{
                color: "var(--color-on-surface-variant)",
                border: "1px solid transparent",
              }}
            >
              {isAr ? "تسجيل الدخول" : "Sign In"}
            </Link>
          </div>

          {/* Dashboard mockup */}
          <div
            className="glass-card rounded-2xl overflow-hidden w-full max-w-3xl mt-4"
            style={{ border: "1px solid rgba(142,213,255,0.1)", boxShadow: "0 20px 80px rgba(0,0,0,0.4)" }}
          >
            {/* titlebar */}
            <div className="flex items-center gap-2 px-4 py-3" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ms-3 text-xs font-mono opacity-40" style={{ color: "var(--color-on-surface-variant)" }}>Darhous Smart Learning Ecosystem</span>
            </div>
            {/* body */}
            <div className="p-5 grid grid-cols-3 gap-3">
              {[
                { label: isAr ? "بوابة AI" : "AI Portal", color: "#8ed5ff", progress: 68 },
                { label: isAr ? "اختبار اللغة" : "Language Test", color: "#d0bcff", progress: 100 },
                { label: isAr ? "اختبار رقمي" : "Digital Exam", color: "#3ce0fb", progress: 45 },
              ].map((item) => (
                <div key={item.label} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <p className="text-xs font-mono mb-2" style={{ color: item.color }}>{item.label}</p>
                  <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full" style={{ width: `${item.progress}%`, background: item.color, boxShadow: `0 0 8px ${item.color}60` }} />
                  </div>
                  <p className="text-xs mt-1 text-end font-mono opacity-60" style={{ color: "var(--color-on-surface-variant)" }}>{item.progress}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS ─────────────────────────────────────── */}
      <div className="container-xl">
        <Stats locale={locale} />
      </div>

      {/* ── 3. PORTAL GRID ──────────────────────────────── */}
      <section id="portals" className="container-xl">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono mb-4"
            style={{ background: "rgba(208,188,255,0.06)", borderColor: "rgba(208,188,255,0.2)", color: "var(--color-secondary)" }}
          >
            🌐 {isAr ? "بوابات المنصة" : "Platform Portals"}
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "بوابات درهوس الذكية" : "Darhous Smart Portals"}
          </h2>
          <p className="text-base" style={{ color: "var(--color-on-surface-variant)", maxWidth: "560px", margin: "0 auto" }}>
            {isAr
              ? "منظومة متكاملة مصممة لتلبية كل احتياجاتك التعليمية والمهنية عبر بوابات متخصصة."
              : "An integrated ecosystem designed to cover all your learning and career needs through specialized portals."}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {portals.map((portal) => (
            <PortalCard key={portal.id} portal={portal} locale={locale} />
          ))}
        </div>
      </section>

      {/* ── 4. UNIFIED ACCOUNT ──────────────────────────── */}
      <section className="container-xl">
        <div
          className="rounded-3xl p-8 md:p-14 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(142,213,255,0.06) 0%, rgba(87,27,193,0.08) 50%, rgba(60,224,251,0.05) 100%)",
            border: "1px solid rgba(142,213,255,0.1)",
          }}
        >
          <div className="env-orb env-orb-blue absolute -top-20 -end-20 opacity-30" />
          <div className="env-orb env-orb-violet absolute -bottom-20 -start-20 opacity-20" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono mb-5"
                style={{ background: "rgba(142,213,255,0.08)", borderColor: "rgba(142,213,255,0.2)", color: "var(--color-primary)" }}
              >
                🔑 {isAr ? "حساب واحد — كل البوابات" : "One Account — All Portals"}
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-5" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "سجّل مرة واحدة فقط" : "Register Just Once"}
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--color-on-surface-variant)", maxWidth: "480px" }}>
                {isAr
                  ? "نفس الحساب يفتح لك كل بوابات درهوس. بياناتك، تقدمك، وشهاداتك — كلها في مكان واحد."
                  : "One account unlocks all Darhous portals. Your data, progress, and certificates — all in one place."}
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {(isAr
                  ? ["تسجيل دخول واحد", "لوحة تحكم موحدة", "نتائج محفوظة", "تقدم تعليمي واحد", "ملف مستخدم واحد", "شهادات وتقارير في مكان واحد"]
                  : ["Single sign-on", "Unified dashboard", "Saved results", "Unified learning progress", "One user profile", "Certificates & reports in one place"]
                ).map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(74,222,128,0.15)", color: "#4ade80" }}>
                      <Check size={11} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <Link href={`/${locale}/register`} className="glow-button-primary text-white font-mono px-6 py-3 rounded-xl inline-flex items-center gap-2 text-sm">
                {isAr ? "أنشئ حسابك المجاني" : "Create Free Account"} <Arrow size={15} />
              </Link>
            </div>

            {/* Visual - unified account card */}
            <div className="flex-shrink-0 w-full max-w-sm">
              <div className="glass-card rounded-2xl p-5" style={{ border: "1px solid rgba(142,213,255,0.12)" }}>
                <div className="flex items-center gap-3 mb-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="w-10 h-10 rounded-full" style={{ background: "linear-gradient(135deg, #8ed5ff, #d0bcff)" }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--color-on-surface)" }}>Ahmed Darhous</p>
                    <p className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>ahmeddarhous@gmail.com</p>
                  </div>
                  <span className="ms-auto text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.25)" }}>
                    {isAr ? "نشط" : "Active"}
                  </span>
                </div>
                <p className="text-xs font-mono mb-3 opacity-60" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? "البوابات المفعّلة" : "Active Portals"}
                </p>
                {[
                  { icon: "🤖", label: isAr ? "AI Academy" : "AI Academy", color: "#8ed5ff", active: true },
                  { icon: "🌐", label: isAr ? "بوابة اللغة" : "Language Portal", color: "#d0bcff", active: true },
                  { icon: "💻", label: isAr ? "اختبارات رقمية" : "Digital Exams", color: "#3ce0fb", active: true },
                  { icon: "💼", label: isAr ? "Career (قريبًا)" : "Career (Soon)", color: "#f59e0b", active: false },
                ].map((p) => (
                  <div key={p.label} className="flex items-center gap-3 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style={{ background: `${p.color}10` }}>
                      {p.icon}
                    </span>
                    <span className="text-sm flex-1" style={{ color: p.active ? "var(--color-on-surface)" : "var(--color-on-surface-variant)", opacity: p.active ? 1 : 0.5 }}>
                      {p.label}
                    </span>
                    <span className={`w-2 h-2 rounded-full`} style={{ background: p.active ? p.color : "rgba(255,255,255,0.15)" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. USER JOURNEY ─────────────────────────────── */}
      <section className="container-xl">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "رحلتك مع درهوس" : "Your Journey with Darhous"}
          </h2>
          <p className="text-base" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "8 خطوات من الصفر إلى سوق العمل" : "8 steps from zero to the job market"}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {journey.map((step, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-5 text-center flex flex-col items-center gap-3"
              style={{ border: "1px solid rgba(142,213,255,0.08)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold font-mono flex-shrink-0"
                style={{
                  background: `rgba(142,213,255,0.1)`,
                  color: "var(--color-primary)",
                  border: "1px solid rgba(142,213,255,0.2)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="text-sm leading-snug font-medium" style={{ color: "var(--color-on-surface-variant)" }}>
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. AVAILABLE NOW ────────────────────────────── */}
      <section id="available" className="container-xl">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono mb-3"
              style={{ background: "rgba(74,222,128,0.08)", borderColor: "rgba(74,222,128,0.2)", color: "#4ade80" }}
            >
              ✅ {isAr ? "متاح الآن" : "Available Now"}
            </div>
            <h2 className="font-display font-bold text-2xl md:text-3xl" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "ابدأ الآن بهذه البوابات" : "Start Now With These Portals"}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availablePortals.map((portal) => (
            <PortalCard key={portal.id} portal={portal} locale={locale} size="large" />
          ))}
        </div>
      </section>

      {/* ── 7. COMING SOON ──────────────────────────────── */}
      <section id="soon" className="container-xl">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono mb-3"
              style={{ background: "rgba(208,188,255,0.06)", borderColor: "rgba(208,188,255,0.2)", color: "var(--color-secondary)" }}
            >
              🚀 {isAr ? "قادم قريبًا" : "Coming Soon"}
            </div>
            <h2 className="font-display font-bold text-2xl md:text-3xl" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "بوابات قيد التطوير" : "Portals Under Development"}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {comingSoonPortals.map((portal) => (
            <PortalCard key={portal.id} portal={portal} locale={locale} />
          ))}
        </div>
      </section>

      {/* ── 8. WHY DARHOUS ──────────────────────────────── */}
      <section className="container-xl">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "لماذا درهوس؟" : "Why Darhous?"}
          </h2>
          <p className="text-base" style={{ color: "var(--color-on-surface-variant)" }}>
            {isAr ? "ما يميّزنا عن كل منصة أخرى" : "What sets us apart from every other platform"}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {why.map((item, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-5 flex flex-col gap-3"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="font-bold text-base" style={{ color: "var(--color-on-surface)" }}>{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. DASHBOARD PREVIEW ────────────────────────── */}
      <section id="dashboard" className="container-xl">
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono mb-4"
            style={{ background: "rgba(60,224,251,0.06)", borderColor: "rgba(60,224,251,0.2)", color: "var(--color-tertiary)" }}
          >
            📊 {isAr ? "لوحة التحكم الموحدة" : "Unified Dashboard"}
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? "كل تقدمك في مكان واحد" : "All Your Progress in One Place"}
          </h2>
          <p className="text-base" style={{ color: "var(--color-on-surface-variant)", maxWidth: "560px", margin: "0 auto" }}>
            {isAr
              ? "تابع تقدمك في كل بوابة، شهاداتك، ونتائجك من لوحة تحكم موحدة ذكية."
              : "Track your progress across all portals, certificates, and results from a smart unified dashboard."}
          </p>
        </div>

        {/* Mock dashboard */}
        <div
          className="glass-card rounded-3xl overflow-hidden"
          style={{ border: "1px solid rgba(60,224,251,0.1)", boxShadow: "0 20px 80px rgba(0,0,0,0.3)" }}
        >
          {/* Header bar */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="text-xs font-mono opacity-40" style={{ color: "var(--color-on-surface-variant)" }}>
              {isAr ? "لوحة درهوس الموحدة" : "Darhous Unified Dashboard"}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80" }}>
              {isAr ? "مسجل دخول" : "Logged In"}
            </span>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* User info */}
            <div className="md:col-span-1 flex flex-col gap-3">
              <div className="rounded-xl p-4 flex items-center gap-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-12 h-12 rounded-full flex-shrink-0" style={{ background: "linear-gradient(135deg, #8ed5ff, #d0bcff)" }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--color-on-surface)" }}>
                    {isAr ? "أحمد درهوس" : "Ahmed Darhous"}
                  </p>
                  <p className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)", opacity: 0.6 }}>
                    {isAr ? "عضو Pro" : "Pro Member"}
                  </p>
                </div>
              </div>
              {/* Quick stats */}
              {[
                { label: isAr ? "شهادات" : "Certificates", val: "3", color: "#f59e0b" },
                { label: isAr ? "أيام متتالية" : "Day Streak", val: "12", color: "#f97316" },
                { label: isAr ? "نقاط" : "Points", val: "840", color: "#8ed5ff" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl p-3 flex items-center justify-between" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{s.label}</span>
                  <span className="text-sm font-bold font-mono" style={{ color: s.color }}>{s.val}</span>
                </div>
              ))}
            </div>

            {/* Portal progress */}
            <div className="md:col-span-2 flex flex-col gap-3">
              <p className="text-xs font-mono opacity-60" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? "تقدمي في البوابات" : "My Portal Progress"}
              </p>
              {[
                { icon: "🤖", label: isAr ? "أكاديمية الذكاء الاصطناعي" : "AI Academy", color: "#8ed5ff", progress: 68, detail: isAr ? "12/18 دورة" : "12/18 Courses" },
                { icon: "🌐", label: isAr ? "بوابة اللغة" : "Language Portal", color: "#d0bcff", progress: 100, detail: isAr ? "B2 مستوى" : "Level B2" },
                { icon: "💻", label: isAr ? "اختبارات التحول الرقمي" : "Digital Exams", color: "#3ce0fb", progress: 45, detail: isAr ? "5/11 اختبار" : "5/11 Exams" },
                { icon: "💼", label: isAr ? "بوابة التوظيف" : "Career Portal", color: "#f59e0b", progress: 0, detail: isAr ? "قريبًا" : "Coming Soon" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl p-4 flex items-center gap-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium truncate" style={{ color: "var(--color-on-surface)" }}>{item.label}</span>
                      <span className="text-xs font-mono ms-2 flex-shrink-0" style={{ color: item.color }}>{item.detail}</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${item.progress}%`, background: item.progress === 0 ? "rgba(255,255,255,0.08)" : item.color, boxShadow: item.progress > 0 ? `0 0 8px ${item.color}50` : "none" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 pb-5 flex justify-center">
            <Link
              href={`/${locale}/dashboard`}
              className="inline-flex items-center gap-2 text-sm font-mono transition-opacity hover:opacity-80"
              style={{ color: "var(--color-primary)" }}
            >
              {isAr ? "فتح لوحة التحكم الكاملة" : "Open Full Dashboard"} <Arrow size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 10. FINAL CTA ───────────────────────────────── */}
      <section className="container-xl">
        <div
          className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(0,102,138,0.2) 0%, rgba(87,27,193,0.15) 50%, rgba(0,102,138,0.1) 100%)",
            border: "1px solid rgba(142,213,255,0.12)",
          }}
        >
          <div className="env-orb env-orb-blue absolute top-[-100px] start-[-100px] opacity-30" />
          <div className="env-orb env-orb-violet absolute bottom-[-100px] end-[-100px] opacity-20" />
          <div className="relative z-10">
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-5" style={{ color: "var(--color-on-surface)" }}>
              {isAr ? "ابدأ رحلتك مع منصة درهوس الآن" : "Start Your Journey with Darhous Now"}
            </h2>
            <p className="text-lg mb-8" style={{ color: "var(--color-on-surface-variant)", maxWidth: "560px", margin: "0 auto 2rem" }}>
              {isAr
                ? "انضم إلى آلاف المتعلمين الذين يشكلون مستقبلهم عبر منظومة تعليمية ذكية ومتكاملة."
                : "Join thousands of learners shaping their future through a smart integrated learning ecosystem."}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={`/${locale}/register`} className="glow-button-primary text-white font-mono px-8 py-3.5 rounded-xl inline-flex items-center gap-2 text-sm font-semibold">
                <Sparkles size={15} />
                {isAr ? "إنشاء حساب مجاني" : "Create Free Account"} <Arrow size={15} />
              </Link>
              <Link href={`/${locale}/contact`} className="glow-button-secondary font-mono px-8 py-3.5 rounded-xl inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--color-secondary)" }}>
                {isAr ? "تواصل معنا" : "Contact Us"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. COMMUNITY SIGNUP ────────────────────────── */}
      <div className="container-xl">
        <CommunitySignup locale={locale} variant="hero" source="ecosystem-home" />
      </div>

    </div>
  );
}
