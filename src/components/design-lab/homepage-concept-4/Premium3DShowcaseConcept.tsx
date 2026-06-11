"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const toolsAr = [
  "مساعد NexaLearn الذكي", "استوديو البرومبتات", "مولّد برومبت Claude Code", "مرشح أدوات الذكاء الاصطناعي", "مولّد خطط التعلم",
  "إتقان Claude", "مركز أدوات الذكاء الاصطناعي", "أكاديمية الكلاود", "مكتبة المشاريع", "مكتبة البرومبتات", "مسارات التعلم", "لوحة الطالب", "مختبر Nano Banana"
];

const toolsEn = [
  "NexaLearn AI Mentor", "Prompt Studio", "Claude Code Generator", "AI Tool Recommender", "AI Roadmap Generator",
  "Claude Mastery", "AI Tools Hub", "Cloud Academy", "Projects Library", "Prompt Library", "Learning Paths", "Student Dashboard", "Nano Banana Lab"
];

export default function Premium3DShowcaseConcept({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const items = isAr ? toolsAr : toolsEn;
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(t);
  }, [items.length]);

  const handleNext = () => setActiveIdx(prev => (prev + 1) % items.length);
  const handlePrev = () => setActiveIdx(prev => (prev - 1 + items.length) % items.length);

  return (
    <section className="py-24 relative z-10 w-full overflow-hidden">
      <div className="text-center mb-16 px-6">
        <span className="text-purple-400 text-sm tracking-widest uppercase mb-2 block">{isAr ? "منصة NexaLearn الذكية" : "The NexaLearn Experience"}</span>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{isAr ? "استكشف منصة NexaLearn الذكية" : "Explore the NexaLearn Experience"}</h2>
        <p className="text-white/50 max-w-2xl mx-auto">{isAr ? "كل أدوات التعلم، البرومبتات، Claude، الكلاود، والمشاريع في تجربة واحدة." : "All learning tools, prompts, Claude, cloud, and projects in one intelligent experience."}</p>
      </div>

      <div className="relative h-[400px] w-full flex items-center justify-center perspective-[1200px]">
        {items.map((item, i) => {
          let offset = i - activeIdx;
          if (offset < -Math.floor(items.length / 2)) offset += items.length;
          if (offset > Math.floor(items.length / 2)) offset -= items.length;

          const isActive = offset === 0;
          const absOffset = Math.abs(offset);
          if (absOffset > 3) return null; // Only show close items

          return (
            <motion.div
              key={i}
              className={cn(
                "absolute w-[280px] h-[320px] rounded-2xl bg-black/80 border backdrop-blur-xl flex items-center justify-center text-center p-6 cursor-pointer",
                isActive ? "border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.4)] z-30" : "border-white/10 z-10"
              )}
              initial={false}
              animate={{
                x: `${offset * 120}px`,
                scale: 1 - absOffset * 0.15,
                z: -absOffset * 100,
                rotateY: offset * -15,
                opacity: 1 - absOffset * 0.2,
              }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={() => setActiveIdx(i)}
            >
              {isActive && (
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50" />
              )}
              <h3 className={cn("font-bold", isActive ? "text-2xl text-white" : "text-lg text-white/50")}>
                {item}
              </h3>
            </motion.div>
          );
        })}

        <div className="absolute bottom-0 inset-x-0 flex justify-center gap-4 z-40">
          <button onClick={handlePrev} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={handleNext} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
