"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Globe, KeyRound, HardHat, BarChart3,
  Briefcase, Bot, LayoutDashboard, Sparkles,
  type LucideIcon,
} from "lucide-react";

interface FeatureItem { Icon: LucideIcon; t: string; d: string }

export default function WhyDarhous({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const shouldReduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "start 0.35"],
  });
  const headingOpacity = useTransform(scrollYProgress, [0, 1], shouldReduce ? [1, 1] : [0.25, 1]);
  const headingY = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [10, 0]);

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
    show:   { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.15 : 0.5, ease: [0.0, 0.0, 0.2, 1] as const } },
  };
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: shouldReduce ? 0 : 0.07 } },
  };

  const features: FeatureItem[] = isAr
    ? [
        { Icon: Globe,           t: "منصة عربية ذكية",        d: "محتوى متخصص باللغة العربية لتلبية احتياجات المتعلم العربي" },
        { Icon: KeyRound,        t: "حساب واحد للجميع",        d: "سجّل مرة واحدة واستخدم كل البوابات بنفس الحساب" },
        { Icon: HardHat,         t: "تعليم قائم على المشاريع", d: "تطبيق عملي حقيقي وليس مجرد محاضرات نظرية" },
        { Icon: BarChart3,       t: "اختبارات وتقارير فورية",  d: "نتائج لحظية وتقارير تفصيلية لكل اختبار" },
        { Icon: Briefcase,       t: "ربط التعليم بالتوظيف",   d: "مسار متكامل من التعلم حتى الحصول على الوظيفة" },
        { Icon: Bot,             t: "مرشد AI شخصي",           d: "المرشد يفهم مستواك ويبني لك الخطة المناسبة" },
        { Icon: LayoutDashboard, t: "لوحة تحكم موحدة",        d: "تتبع كل تقدمك وشهاداتك من مكان واحد" },
        { Icon: Sparkles,        t: "تجربة عصرية واحترافية",  d: "تصميم premium وتجربة مستخدم مدروسة بعناية" },
      ]
    : [
        { Icon: Globe,           t: "Arabic-First Platform",   d: "Specialized Arabic content tailored for Arab learners" },
        { Icon: KeyRound,        t: "One Account for All",     d: "Register once and access all portals with a single account" },
        { Icon: HardHat,         t: "Project-Based Learning",  d: "Real hands-on application, not just theory lectures" },
        { Icon: BarChart3,       t: "Instant Tests & Reports", d: "Real-time results and detailed reports for every exam" },
        { Icon: Briefcase,       t: "Education Meets Career",  d: "A complete path from learning to landing a job" },
        { Icon: Bot,             t: "Personal AI Mentor",      d: "The mentor understands your level and builds your plan" },
        { Icon: LayoutDashboard, t: "Unified Dashboard",       d: "Track all your progress and certificates in one place" },
        { Icon: Sparkles,        t: "Premium UX",              d: "Modern design and carefully crafted user experience" },
      ];

  return (
    <section ref={sectionRef} className="container-xl relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-[0.15]"
           style={{ background: "radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <motion.div
        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
        className="text-center mb-16 relative z-10"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono mb-5"
          style={{ background: "rgba(208,188,255,0.06)", borderColor: "rgba(208,188,255,0.2)", color: "var(--color-secondary)" }}
        >
          <Sparkles size={12} />
          {isAr ? "مميزات المنصة" : "Platform Features"}
        </div>
        <motion.h2
          style={{ opacity: headingOpacity, y: headingY }}
          className="font-display font-bold text-3xl md:text-5xl mb-4 text-gradient-premium"
        >
          {isAr ? "لماذا تختار NexaLearn؟" : "Why Choose NexaLearn?"}
        </motion.h2>
        <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "ما يميّزنا عن كل منصة تعليمية أخرى في الشرق الأوسط" : "What sets us apart from every other educational platform in the Middle East"}
        </p>
      </motion.div>

      <motion.div
        variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
      >
        {features.map((item, i) => (
          <motion.div key={i} variants={fadeUp} className="glass-panel-promax rounded-2xl p-6 transition-transform hover:-translate-y-1 duration-300">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <item.Icon size={20} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2" style={{ color: "var(--color-on-surface)" }}>{item.t}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{item.d}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
