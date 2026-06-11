"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, LayoutGrid, Trophy, Rocket, X, ChevronRight, ChevronLeft } from "lucide-react";

const tourStepsAr = [
  { title: "أهلاً بك في NexaLearn", desc: "نظام تعلم ذكي يبني مسارك التعليمي والمهني من الصفر — خطوة بخطوة.", icon: <Sparkles /> },
  { title: "مرشدك الشخصي بالذكاء الاصطناعي", desc: "يفهم أهدافك ويصمم لك خطة تعلم مخصصة، ويرافقك عبر كل بوابة.", icon: <Bot /> },
  { title: "6 بوابات تعليمية متخصصة", desc: "من الذكاء الاصطناعي والأتمتة، إلى اللغة، المهن، والمعامل التطبيقية.", icon: <LayoutGrid /> },
  { title: "تتبع تقدمك واحصل على شهاداتك", desc: "كل دورة واختبار تُنهيه يُسجَّل في لوحتك — مع شهادات قابلة للتحقق.", icon: <Trophy /> },
  { title: "جاهز تبدأ رحلتك؟", desc: "اختر مسارك بنفسك، أو دع المرشد الذكي يبنيه لك — والبداية مجانية.", icon: <Rocket /> }
];

const tourStepsEn = [
  { title: "Welcome to NexaLearn", desc: "A smart learning OS that builds your educational & career path from zero — one step at a time.", icon: <Sparkles /> },
  { title: "Your personal AI Mentor", desc: "Understands your goals, designs a personalized plan, and guides you across every portal.", icon: <Bot /> },
  { title: "6 specialized learning portals", desc: "From AI & automation to language, careers, digital exams, and hands-on labs.", icon: <LayoutGrid /> },
  { title: "Track progress & earn certificates", desc: "Every course and exam you complete is tracked — with verifiable certificates.", icon: <Trophy /> },
  { title: "Ready to start your journey?", desc: "Pick your own path, or let the AI Mentor build one for you — free to start.", icon: <Rocket /> }
];

export default function SmartPlatformTourConcept({ locale, onClose }: { locale: string, onClose: () => void }) {
  const isAr = locale === "ar";
  const steps = isAr ? tourStepsAr : tourStepsEn;
  const [step, setStep] = useState(0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl" />
        
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-white/50 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div 
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 flex items-center justify-center">{steps[step].icon}</div>
              </div>
              <h3 className="text-2xl font-bold mb-4">{steps[step].title}</h3>
              <p className="text-white/60 leading-relaxed min-h-[80px]">{steps[step].desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="bg-white/5 p-4 flex items-center justify-between border-t border-white/10">
          <div className="flex gap-1.5 px-4">
            {steps.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-blue-500" : "w-1.5 bg-white/20"}`} />
            ))}
          </div>
          
          <div className="flex gap-2">
            {step < steps.length - 1 ? (
              <button 
                onClick={() => setStep(s => s + 1)}
                className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-sm font-medium"
              >
                {isAr ? "التالي" : "Next"}
                {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            ) : (
              <button 
                onClick={onClose}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-sm font-bold"
              >
                {isAr ? "ابدأ مجاناً" : "Start for free"}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
