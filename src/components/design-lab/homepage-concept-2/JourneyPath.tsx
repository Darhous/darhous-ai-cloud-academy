"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/shadcn/ui/card";
import { Bot, Code, Globe, LayoutGrid, Award, Briefcase, Zap } from "lucide-react";

const milestonesAr = [
  {
    id: "language",
    title: "بوابة اللغة",
    desc: "اختبارات تحديد مستوى اللغة الإنجليزية، وتقييم المهارات لبدء رحلتك.",
    icon: Globe,
    color: "bg-purple-500/10 text-purple-500",
    badge: "المرحلة 1: التقييم",
  },
  {
    id: "ai-academy",
    title: "أكاديمية الذكاء الاصطناعي",
    desc: "تعلم أدوات الذكاء الاصطناعي، البرومبتات، والمشاريع العملية خطوة بخطوة.",
    icon: Bot,
    color: "bg-blue-500/10 text-blue-500",
    badge: "المرحلة 2: التأسيس",
  },
  {
    id: "automation",
    title: "أكاديمية الأتمتة",
    desc: "تعلم الأتمتة التجارية، واستكشف وصفات ذكية لبناء workflows مخصصة.",
    icon: Zap,
    color: "bg-green-500/10 text-green-500",
    badge: "المرحلة 3: التطبيق",
  },
  {
    id: "iot-lab",
    title: "مختبر إنترنت الأشياء",
    desc: "دروس ومشاريع أردوينو، تحديات برمجية ومكتبة شاملة للمكونات الإلكترونية.",
    icon: Code,
    color: "bg-orange-500/10 text-orange-500",
    badge: "المرحلة 4: البناء",
  },
  {
    id: "digital-exams",
    title: "اختبارات التحول الرقمي",
    desc: "اختبر مهاراتك واحصل على نتائج معتمدة وشهادات قابلة للتحقق.",
    icon: Award,
    color: "bg-cyan-500/10 text-cyan-500",
    badge: "المرحلة 5: الاعتماد",
  },
  {
    id: "career",
    title: "البوابة المهنية",
    desc: "حلل سيرتك الذاتية، اكتشف الفجوات، واحصل على وظيفتك القادمة بثقة.",
    icon: Briefcase,
    color: "bg-yellow-500/10 text-yellow-500",
    badge: "المرحلة 6: الانطلاق",
  },
];

const milestonesEn = [
  {
    id: "language",
    title: "Language Portal",
    desc: "English level assessment and skill evaluation to start your journey.",
    icon: Globe,
    color: "bg-purple-500/10 text-purple-500",
    badge: "Stage 1: Assessment",
  },
  {
    id: "ai-academy",
    title: "AI Academy",
    desc: "Learn AI tools, prompts, and hands-on projects step by step.",
    icon: Bot,
    color: "bg-blue-500/10 text-blue-500",
    badge: "Stage 2: Foundation",
  },
  {
    id: "automation",
    title: "Automation Academy",
    desc: "Learn business automation and explore smart recipes to build custom workflows.",
    icon: Zap,
    color: "bg-green-500/10 text-green-500",
    badge: "Stage 3: Application",
  },
  {
    id: "iot-lab",
    title: "IoT Lab",
    desc: "Arduino lessons, projects, code challenges, and component library.",
    icon: Code,
    color: "bg-orange-500/10 text-orange-500",
    badge: "Stage 4: Building",
  },
  {
    id: "digital-exams",
    title: "Digital Exams",
    desc: "Test your skills and get verified results and trackable certificates.",
    icon: Award,
    color: "bg-cyan-500/10 text-cyan-500",
    badge: "Stage 5: Certification",
  },
  {
    id: "career",
    title: "Career Hub",
    desc: "Analyze your CV, discover gaps, and confidently land your next job.",
    icon: Briefcase,
    color: "bg-yellow-500/10 text-yellow-500",
    badge: "Stage 6: Launch",
  },
];

export function JourneyPath({ locale }: { locale: string }) {
  const isRtl = locale === "ar";
  const shouldReduceMotion = useReducedMotion();
  const milestones = isRtl ? milestonesAr : milestonesEn;

  const yOffset = shouldReduceMotion ? 0 : 30;

  return (
    <section className="relative py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
            {isRtl ? "رحلتك التعليمية خطوة بخطوة" : "Your Learning Journey Step by Step"}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {isRtl
              ? "المرشد الذكي يبني لك الخطة المناسبة عبر 6 بوابات متخصصة، من التقييم الأولي وحتى الحصول على الوظيفة."
              : "The AI Mentor builds your custom plan across 6 specialized portals, from initial assessment to landing a job."}
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Vertical timeline line */}
          <div className="absolute top-0 bottom-0 left-8 w-px bg-border md:left-1/2 md:-ml-px" />

          <div className="space-y-12">
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: yOffset }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-primary md:left-1/2">
                    <div className="h-2 w-2 rounded-full bg-background" />
                  </div>

                  <div className="w-full pl-16 md:w-1/2 md:pl-0 md:px-12">
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="pb-4">
                        <div className="mb-2 inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                          {m.badge}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${m.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <CardTitle>{m.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">{m.desc}</CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
