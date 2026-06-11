"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FinalCTAConcept({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  return (
    <section className="py-24 relative z-10 w-full px-6 max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-[2.5rem] p-10 md:p-20 text-center overflow-hidden border border-white/10"
        style={{
          background: "linear-gradient(135deg, rgba(142,213,255,0.08), rgba(87,27,193,0.12), rgba(60,224,251,0.05))"
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative z-10">
          <span className="text-blue-400 text-sm tracking-widest uppercase mb-4 block">{isAr ? "الآن أو لا تندم لاحقًا" : "Now or Never"}</span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 whitespace-pre-line leading-tight">
            {isAr ? "ابدأ الآن…\nحتى لو لا تعرف من أين تبدأ" : "Start Now…\nEven If You Don't Know Where to Begin"}
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            {isAr ? "المرشد الذكي يبني لك الطريق، خطوة بخطوة، من الصفر حتى الاحتراف — كل ما عليك فعله هو البدء." : "The AI Mentor builds your path, step by step, from zero to mastery — all you need to do is start."}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="relative px-8 py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors shadow-[0_0_40px_rgba(37,99,235,0.4)] overflow-hidden group">
              <span className="relative z-10">{isAr ? "ابدأ مجانًا الآن" : "Start Free Now"}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-colors">
              {isAr ? "جرب المرشد الذكي" : "Try AI Mentor"}
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
