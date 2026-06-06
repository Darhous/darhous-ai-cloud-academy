"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Globe, KeyRound, HardHat, BarChart3,
  Briefcase, Bot, LayoutDashboard, Sparkles,
  type LucideIcon,
} from "lucide-react";

interface FeatureItem { Icon: LucideIcon; t: string; d: string }

export default function WhyDarhous({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const shouldReduce = useReducedMotion();

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
    <section className="container-xl">
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
        className="text-center mb-14"
      >
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "لماذا درهوس؟" : "Why Darhous?"}
        </h2>
        <p className="text-base" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr ? "ما يميّزنا عن كل منصة أخرى" : "What sets us apart from every other platform"}
        </p>
      </motion.div>

      {/* 2-column editorial list — less cluttered than the original 4-col card grid */}
      <motion.div
        variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8"
      >
        {features.map((item, i) => (
          <motion.div key={i} variants={fadeUp} className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <item.Icon size={18} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--color-on-surface)" }}>{item.t}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{item.d}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
