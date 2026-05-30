import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import HeroDashboardPreview from "@/components/visual/HeroDashboardPreview";

interface HeroProps {
  locale: string;
}

export default function Hero({ locale }: HeroProps) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-[calc(100vh-130px)] flex items-center pt-8">
      {/* Background orbs */}
      <div className="env-orb env-orb-blue" style={{ top: "-200px", left: "-100px" }} />
      <div className="env-orb env-orb-violet" style={{ top: "20%", right: "-100px" }} />
      <div className="env-orb env-orb-cyan" style={{ bottom: "-50px", right: "30%" }} />

      <div className="container-xl w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Content */}
          <div className="lg:w-1/2 flex flex-col gap-6 z-10 animate-fade-in-up">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border w-max animate-pulse-glow"
              style={{
                background: "rgba(142,213,255,0.06)",
                borderColor: "rgba(142,213,255,0.2)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "var(--color-tertiary)" }}
              />
              <span className="font-mono text-xs tracking-wider" style={{ color: "var(--color-primary)" }}>
                {isAr ? "الإصدار 2.0 متاح الآن" : "Version 2.0 Available Now"}
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-display font-bold leading-tight"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "var(--color-on-surface)",
              }}
            >
              {isAr ? (
                <>
                  تعلم الذكاء الاصطناعي والكلاود من الصفر حتى{" "}
                  <span className="gradient-text">الاحتراف</span>
                </>
              ) : (
                <>
                  Master AI, Claude, Cloud, and Build{" "}
                  <span className="gradient-text">Real-World Projects</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg leading-relaxed max-w-xl delay-100 animate-fade-in-up"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              {isAr
                ? "منصة عربية عملية لتعلم الذكاء الاصطناعي والكلاود من الصفر حتى بناء مشاريع حقيقية. انضم إلى مجتمع من المطورين والباحثين لبناء المستقبل."
                : "A practical AI and Cloud learning platform from zero to real-world projects. Join a community of developers and researchers building the future."}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mt-2 delay-200 animate-fade-in-up">
              <Link
                href={`/${locale}/courses`}
                className="glow-button-primary text-white font-mono text-sm px-7 py-3.5 rounded-xl flex items-center gap-2"
              >
                {isAr ? "ابدأ التعلم الآن" : "Start Learning Now"}
                <Arrow size={16} />
              </Link>
              <Link
                href={`/${locale}/tools`}
                className="glass-panel font-mono text-sm px-6 py-3.5 rounded-xl flex items-center gap-2 transition-all hover:-translate-y-0.5"
                style={{ color: "var(--color-on-surface)" }}
              >
                {isAr ? "استكشف الأدوات" : "Explore Tools"}
                <ChevronRight size={16} />
              </Link>
            </div>

            {/* Social proof */}
            <div
              className="flex items-center gap-6 pt-4 border-t delay-300 animate-fade-in-up"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              {[
                { value: "5K+", label: isAr ? "متعلم" : "Learners" },
                { value: "50+", label: isAr ? "أداة" : "Tools" },
                { value: "30+", label: isAr ? "مشروع" : "Projects" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display font-bold text-xl" style={{ color: "var(--color-primary)" }}>
                    {s.value}
                  </div>
                  <div className="font-mono text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="lg:w-1/2 w-full delay-200 animate-fade-in-up">
            <HeroDashboardPreview locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
