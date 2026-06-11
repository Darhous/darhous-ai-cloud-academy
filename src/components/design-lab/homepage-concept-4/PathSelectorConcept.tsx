"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const questions = [
  {
    id: "level",
    qAr: "ما مستواك الحالي؟",
    qEn: "What's your current level?",
    optsAr: ["مبتدئ تمامًا", "لدي أساسيات", "متقدم"],
    optsEn: ["Complete Beginner", "Some Basics", "Advanced"]
  },
  {
    id: "goal",
    qAr: "ما هدفك الرئيسي؟",
    qEn: "What's your main goal?",
    optsAr: ["مهارة جديدة", "تطوير مهني", "مشروع محدد"],
    optsEn: ["New Skill", "Career Growth", "Specific Project"]
  },
  {
    id: "time",
    qAr: "كم وقت متاح يوميًا؟",
    qEn: "How much time daily?",
    optsAr: ["٣٠ دقيقة", "ساعة واحدة", "ساعتان أو أكثر"],
    optsEn: ["30 min", "1 hour", "2+ hours"]
  },
  {
    id: "interest",
    qAr: "ما مجال اهتمامك؟",
    qEn: "What's your interest area?",
    optsAr: ["ذكاء اصطناعي", "مهنة & توظيف", "لغة إنجليزية", "IoT & أردوينو", "أتمتة", "اختبارات رقمية"],
    optsEn: ["AI", "Career", "Language", "IoT & Arduino", "Automation", "Digital Exams"]
  }
];

export default function PathSelectorConcept({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const isComplete = Object.keys(answers).length === questions.length;

  return (
    <section className="py-32 relative z-10 w-full px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-blue-400 text-sm tracking-widest uppercase mb-2 block">{isAr ? "خطتك الشخصية" : "Your Personal Plan"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{isAr ? "مش عارف تبدأ منين؟" : "Not Sure Where to Start?"}</h2>
          <p className="text-white/50">{isAr ? "اختار إجاباتك وهنعمل لك خطة أسبوعية مخصصة — مجانًا وفورًا" : "Answer these questions and we'll build a custom weekly plan for you — free and instant"}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {questions.map((q, i) => (
            <motion.div 
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
            >
              <h3 className="text-lg font-semibold mb-4 text-white/90">{isAr ? q.qAr : q.qEn}</h3>
              <div className="flex flex-wrap gap-2">
                {(isAr ? q.optsAr : q.optsEn).map(opt => {
                  const isSelected = answers[q.id] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                      className={cn(
                        "px-4 py-2 rounded-xl border text-sm transition-all",
                        isSelected 
                          ? "bg-blue-500/20 border-blue-500 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
                          : "bg-black/20 border-white/10 text-white/60 hover:bg-white/10"
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-3xl p-8 backdrop-blur-xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <CheckCircle className="text-green-400" />
                  {isAr ? "خطتك المقترحة" : "Suggested Plan"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {[1, 2, 3].map(w => (
                    <div key={w} className="bg-black/40 rounded-xl p-5 border border-white/5">
                      <div className="text-blue-400 text-sm font-mono mb-2">Week {w}</div>
                      <div className="font-medium text-white/80">{isAr ? `مسار الأسبوع ${w}` : `Week ${w} Path`}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 font-medium transition-colors">
                    {isAr ? "ابدأ خطتي الآن" : "Start My Plan Now"}
                  </button>
                  <button className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                    {isAr ? "اسأل المرشد الذكي بدلًا من ذلك" : "Ask the AI Mentor instead"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
