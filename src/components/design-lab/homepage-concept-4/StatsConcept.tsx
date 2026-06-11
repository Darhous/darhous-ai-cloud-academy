"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
  { val: "12+", labelAr: "مسار تعليمي", labelEn: "Learning Paths" },
  { val: "100+", labelAr: "درس مقترح", labelEn: "Lessons" },
  { val: "60+", labelAr: "أداة ذكاء اصطناعي", labelEn: "AI Tools" },
  { val: "30+", labelAr: "مشروع عملي", labelEn: "Real Projects" },
  { val: "4", labelAr: "مسارات كلاود", labelEn: "Cloud Tracks" },
  { val: "∞", labelAr: "منصة عربية متكاملة", labelEn: "Arabic Platform" }
];

export default function StatsConcept({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  return (
    <section className="py-12 relative z-10 w-full px-6 max-w-6xl mx-auto">
      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
        {/* Grid texture bg */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
          {stats.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-400 mb-2 group-hover:scale-110 transition-transform origin-center inline-block">
                {s.val}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/50">{isAr ? s.labelAr : s.labelEn}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
