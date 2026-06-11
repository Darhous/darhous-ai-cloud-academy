"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@heroui/react";
import { WordRotate } from "@/components/shadcn/ui/word-rotate";
import { Bot, ArrowRight, Sparkles } from "lucide-react";

export function ConceptHero({ locale }: { locale: string }) {
  const isRtl = locale === "ar";
  const shouldReduceMotion = useReducedMotion();

  const wordsAr = ["بذكاء", "بمهارة", "بثقة", "بسرعة"];
  const wordsEn = ["Intelligently", "Skillfully", "Confidently", "Rapidly"];

  const words = isRtl ? wordsAr : wordsEn;

  const yOffset = shouldReduceMotion ? 0 : 20;

  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-secondary/10 blur-[80px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: yOffset }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            <span>{isRtl ? "NexaLearn by Ahmed Darhous — الجيل القادم للتعلم" : "NexaLearn by Ahmed Darhous — Next Gen Learning"}</span>
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
            {isRtl ? (
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <span>تعلّم</span>
                <WordRotate words={words} className="text-primary" />
                <span>ابنِ مستقبلك</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <span>Learn</span>
                <WordRotate words={words} className="text-primary" />
                <span>Build your future</span>
              </div>
            )}
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {isRtl
              ? "أول نظام بيئي تعليمي عربي مدعوم بالذكاء الاصطناعي. مسارات مخصصة، معامل تفاعلية، وتوجيه مهني مستمر للوصول إلى أهدافك أسرع."
              : "The first AI-powered Arabic learning ecosystem. Personalized paths, interactive labs, and continuous career mentorship to reach your goals faster."}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              color="primary"
              size="lg"
              className="w-full sm:w-auto"
              endContent={isRtl ? <ArrowRight className="h-5 w-5 rotate-180" /> : <ArrowRight className="h-5 w-5" />}
            >
              {isRtl ? "ابدأ رحلتك الآن" : "Start Your Journey"}
            </Button>
            <Button
              color="default"
              variant="flat"
              size="lg"
              className="w-full sm:w-auto"
              startContent={<Bot className="h-5 w-5" />}
            >
              {isRtl ? "دليلك الذكي" : "Your AI Guide"}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
