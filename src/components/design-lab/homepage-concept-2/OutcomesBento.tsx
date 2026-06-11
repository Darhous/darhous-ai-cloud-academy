"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "@/components/aceternity/bento-grid";
import { Award, Briefcase, TrendingUp, ShieldCheck, GraduationCap } from "lucide-react";

const itemsAr = [
  {
    title: "شهادات قابلة للتحقق",
    description: "احصل على شهادات معتمدة بعد كل مسار أو اختبار رقمي تجتازه.",
    icon: <Award className="h-4 w-4 text-primary" />,
    className: "md:col-span-2",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20" />,
  },
  {
    title: "تطوير مهني مباشر",
    description: "اربط ما تتعلمه بوظيفتك القادمة عبر محلل ATS الذكي.",
    icon: <Briefcase className="h-4 w-4 text-orange-500" />,
    className: "md:col-span-1",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-orange-500/20 to-yellow-500/20" />,
  },
  {
    title: "نمو مستمر",
    description: "تتبع تقدمك في جميع البوابات من خلال لوحة تحكم موحدة.",
    icon: <TrendingUp className="h-4 w-4 text-green-500" />,
    className: "md:col-span-1",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20" />,
  },
  {
    title: "تعليم معتمد",
    description: "محتوى عربي حصري معتمد على تطبيقات ومشاريع عملية.",
    icon: <ShieldCheck className="h-4 w-4 text-purple-500" />,
    className: "md:col-span-2",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20" />,
  },
];

const itemsEn = [
  {
    title: "Verifiable Certificates",
    description: "Earn accredited certificates after every learning path or digital exam.",
    icon: <Award className="h-4 w-4 text-primary" />,
    className: "md:col-span-2",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20" />,
  },
  {
    title: "Direct Career Growth",
    description: "Connect your learning to your next job with our Smart ATS Analyzer.",
    icon: <Briefcase className="h-4 w-4 text-orange-500" />,
    className: "md:col-span-1",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-orange-500/20 to-yellow-500/20" />,
  },
  {
    title: "Continuous Progress",
    description: "Track your progress across all portals via a unified dashboard.",
    icon: <TrendingUp className="h-4 w-4 text-green-500" />,
    className: "md:col-span-1",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20" />,
  },
  {
    title: "Accredited Education",
    description: "Exclusive Arabic content based on real-world applications and projects.",
    icon: <ShieldCheck className="h-4 w-4 text-purple-500" />,
    className: "md:col-span-2",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20" />,
  },
];

export function OutcomesBento({ locale }: { locale: string }) {
  const isRtl = locale === "ar";
  const shouldReduceMotion = useReducedMotion();
  const items = isRtl ? itemsAr : itemsEn;

  const yOffset = shouldReduceMotion ? 0 : 20;

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3 text-primary">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
            {isRtl ? "نتائج حقيقية لتعلمك" : "Real Outcomes for Your Learning"}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {isRtl
              ? "نحن لا نقدم دروساً فقط، بل مساراً متكاملاً من التعلم إلى التوظيف مع شهادات توثق كل مهارة تكتسبها."
              : "We don't just offer lessons, but a complete path from learning to employment with certificates validating every skill."}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: yOffset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <BentoGrid>
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                icon={item.icon}
                className={item.className}
              />
            ))}
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  );
}
