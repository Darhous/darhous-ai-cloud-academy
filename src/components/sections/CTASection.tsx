import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CTASectionProps {
  locale: string;
}

export default function CTASection({ locale }: CTASectionProps) {
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden rounded-3xl py-20 px-8 text-center">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(0,102,138,0.3) 0%, rgba(87,27,193,0.2) 50%, rgba(0,54,62,0.3) 100%)",
          border: "1px solid rgba(142,213,255,0.1)",
          borderRadius: "24px",
        }}
      />
      {/* Orbs */}
      <div className="env-orb env-orb-blue absolute -top-20 left-1/4 opacity-50" style={{ width: "400px", height: "400px" }} />
      <div className="env-orb env-orb-violet absolute -bottom-20 right-1/4 opacity-40" style={{ width: "350px", height: "350px" }} />

      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? (
            <>هل أنت مستعد لإتقان <span className="gradient-text">الذكاء الاصطناعي؟</span></>
          ) : (
            <>Ready to Master <span className="gradient-text">AI?</span></>
          )}
        </h2>
        <p className="text-lg mb-8" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "انضم إلى آلاف المتعلمين الذين يبنون مشاريع ذكاء اصطناعي حقيقية. ابدأ رحلتك اليوم — مجانًا تمامًا."
            : "Join thousands of learners building real AI projects. Start your journey today — completely free."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`/${locale}/courses`}
            className="glow-button-primary text-white font-mono px-8 py-4 rounded-xl flex items-center gap-2 text-base"
          >
            {isAr ? "ابدأ التعلم الآن" : "Start Learning Now"}
            <Arrow size={18} />
          </Link>
          <Link
            href={`/${locale}/paths`}
            className="glass-panel font-mono px-7 py-4 rounded-xl text-base transition-all hover:-translate-y-0.5"
            style={{ color: "var(--color-on-surface)" }}
          >
            {isAr ? "عرض المسارات" : "View Paths"}
          </Link>
        </div>
      </div>
    </section>
  );
}
