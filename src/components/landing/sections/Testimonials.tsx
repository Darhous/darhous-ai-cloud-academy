"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────── */
interface TestimonialDef {
  initial: string;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  locationAr: string;
  locationEn: string;
  quoteAr: string;
  quoteEn: string;
  gradient: string;
  rating: number;
  featured?: boolean;
}

const TESTIMONIALS: TestimonialDef[] = [
  {
    initial: "س",
    nameAr: "سلمى ح.",
    nameEn: "Salma H.",
    roleAr: "محللة بيانات",
    roleEn: "Data Analyst",
    locationAr: "مصر ← دبي",
    locationEn: "Egypt → Dubai",
    quoteAr: "بعد 3 أسابيع في أكاديمية الذكاء الاصطناعي، حصلت على وظيفة محللة بيانات في شركة ناشئة في دبي. المرشد الذكي أبقاني على المسار الصحيح في كل خطوة.",
    quoteEn: "After 3 weeks in the AI Academy, I landed a data analyst job at a Dubai startup. The AI mentor kept me on track every step of the way.",
    gradient: "linear-gradient(135deg, #8ed5ff, #3ce0fb)",
    rating: 5,
  },
  {
    initial: "ع",
    nameAr: "عمر ر.",
    nameEn: "Omar R.",
    roleAr: "طالب دراسات عليا",
    roleEn: "Graduate Student",
    locationAr: "المملكة العربية السعودية",
    locationEn: "Saudi Arabia",
    quoteAr: "ساعدتني بوابة اللغات في اجتياز الآيلتس بدرجة 7.0 في 4 أسابيع فقط. جلسات التدريب بالذكاء الاصطناعي تشعرك بوجود مدرب طوال اليوم.",
    quoteEn: "The Language Portal helped me pass IELTS with 7.0 in just 4 weeks. The AI coaching sessions feel like having a tutor available 24/7.",
    gradient: "linear-gradient(135deg, #d0bcff, #c084fc)",
    rating: 5,
    featured: true,
  },
  {
    initial: "ن",
    nameAr: "نور م.",
    nameEn: "Nour M.",
    roleAr: "مديرة عمليات",
    roleEn: "Operations Manager",
    locationAr: "الأردن",
    locationEn: "Jordan",
    quoteAr: "أتمتت خط أنابيب تقارير فريقي باستخدام n8n بفضل أكاديمية الأتمتة. وفرنا 20 ساعة أسبوعياً. أفضل استثمار قمت به.",
    quoteEn: "I automated my team's entire reporting pipeline using n8n thanks to the Automation Academy. We save 20 hours weekly. Best investment I've made.",
    gradient: "linear-gradient(135deg, #4ade80, #3ce0fb)",
    rating: 5,
  },
];

/* ─── Section ────────────────────────────────────────────────────── */
export default function Testimonials({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const shouldReduce = !!useReducedMotion();
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="container-xl relative">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(208,188,255,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={shouldReduce ? false : { opacity: 0, y: 24 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] as const }}
        className="text-center mb-12 relative z-10"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono mb-5"
          style={{ background: "rgba(208,188,255,0.06)", borderColor: "rgba(208,188,255,0.2)", color: "var(--color-secondary)" }}
        >
          <Star size={11} />
          {isAr ? "قصص النجاح" : "Success Stories"}
        </div>
        <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-gradient-premium">
          {isAr ? "متعلمون حقيقيون. نتائج حقيقية." : "Real Learners. Real Results."}
        </h2>
        <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "قصص من متعلمين عرب حوّلوا مسيرتهم المهنية مع NexaLearn"
            : "Stories from Arab learners who transformed their careers with NexaLearn"}
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard key={t.nameEn} testimonial={t} index={i} isAr={isAr} shouldReduce={shouldReduce} />
        ))}
      </div>
    </section>
  );
}

/* ─── Single card ────────────────────────────────────────────────── */
function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} fill={i < rating ? "#f59e0b" : "none"} style={{ color: "#f59e0b" }} />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, index, isAr, shouldReduce }: {
  testimonial: TestimonialDef;
  index: number;
  isAr: boolean;
  shouldReduce: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0, 0, 0.2, 1] as const }}
      className={`relative flex flex-col p-6 rounded-2xl border overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${
        testimonial.featured ? "md:scale-[1.02]" : ""
      }`}
      style={{
        background: testimonial.featured
          ? "linear-gradient(135deg, rgba(208,188,255,0.06), rgba(255,255,255,0.02))"
          : "rgba(255,255,255,0.02)",
        borderColor: testimonial.featured
          ? "rgba(208,188,255,0.25)"
          : "rgba(255,255,255,0.07)",
        boxShadow: testimonial.featured ? "0 0 40px rgba(208,188,255,0.08)" : undefined,
      }}
    >
      {/* Featured badge */}
      {testimonial.featured && (
        <div
          className="absolute top-4 end-4 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold"
          style={{ background: "rgba(208,188,255,0.15)", color: "var(--color-secondary)", border: "1px solid rgba(208,188,255,0.3)" }}
        >
          {isAr ? "قصة مميزة" : "Featured"}
        </div>
      )}

      {/* Quote mark (decorative) */}
      <div
        className="absolute top-4 start-5 font-serif select-none pointer-events-none opacity-[0.07]"
        style={{ fontSize: "5rem", lineHeight: 1, color: "var(--color-secondary)" }}
        aria-hidden
      >
        &ldquo;
      </div>

      {/* Stars */}
      <div className="mb-4 relative z-10">
        <StarRow rating={testimonial.rating} />
      </div>

      {/* Quote */}
      <blockquote
        className="text-sm leading-relaxed flex-1 relative z-10 mb-5"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        &ldquo;{isAr ? testimonial.quoteAr : testimonial.quoteEn}&rdquo;
      </blockquote>

      {/* Author row */}
      <div className="flex items-center gap-3 border-t pt-4 relative z-10"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 text-white"
          style={{ background: testimonial.gradient }}
        >
          {testimonial.initial}
        </div>
        <div>
          <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
            {isAr ? testimonial.nameAr : testimonial.nameEn}
          </p>
          <p className="text-[11px]" style={{ color: "var(--color-on-surface-variant)", opacity: 0.7 }}>
            {isAr ? testimonial.roleAr : testimonial.roleEn} &middot;{" "}
            {isAr ? testimonial.locationAr : testimonial.locationEn}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
