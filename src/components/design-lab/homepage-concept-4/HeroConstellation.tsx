"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Portal } from "@/config/portals";
import { Bot, Sparkles } from "lucide-react";

export default function HeroConstellation({ locale, portals, onOpenTour }: { locale: string, portals: Portal[], onOpenTour: () => void }) {
  const isAr = locale === "ar";

  // Data for rendering the constellation map
  const portalNodes = portals.slice(0, 5).map((p, i) => ({
    ...p,
    angle: (i * (360 / 5)) * (Math.PI / 180),
    radius: 180 + (i % 2 === 0 ? 40 : 0)
  }));

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Deep space background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#05050A] to-[#05050A]" />
      
      {/* Constellation Canvas */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40">
        <svg className="w-[800px] h-[800px] absolute" viewBox="-400 -400 800 800">
          <motion.circle 
            r="180" className="stroke-white/5 fill-none stroke-[1]" strokeDasharray="4 4"
            animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle 
            r="240" className="stroke-white/5 fill-none stroke-[1]" strokeDasharray="2 6"
            animate={{ rotate: -360 }} transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
          />
          {/* Constellation lines */}
          {portalNodes.map((node, i) => {
            const nextNode = portalNodes[(i + 1) % portalNodes.length];
            const x1 = Math.cos(node.angle) * node.radius;
            const y1 = Math.sin(node.angle) * node.radius;
            const x2 = Math.cos(nextNode.angle) * nextNode.radius;
            const y2 = Math.sin(nextNode.angle) * nextNode.radius;
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-blue-500/20 stroke-[1]" />
            );
          })}
        </svg>

        {/* Constellation Nodes */}
        {portalNodes.map((node, i) => {
          const x = Math.cos(node.angle) * node.radius;
          const y = Math.sin(node.angle) * node.radius;
          return (
            <motion.div
              key={node.id}
              className="absolute w-12 h-12 rounded-full border border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              style={{ x, y }}
              animate={{ y: y + 10, x: x - 5 }}
              transition={{ duration: 3 + i, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            >
              <span className="text-xl">{node.icon}</span>
              <div className="absolute inset-0 rounded-full bg-current opacity-20 blur-md" style={{ color: node.color }} />
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-blue-300 mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4" />
          {isAr ? "NexaLearn by Ahmed Darhous — الجيل القادم للتعلم" : "NexaLearn by Ahmed Darhous — Next Gen Learning"}
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6"
        >
          {isAr ? (
            <>تعلّم <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">بذكاء</span>. ابنِ مستقبلك مع NexaLearn.</>
          ) : (
            <>Learn <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Intelligently</span>. Build your future.</>
          )}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          {isAr 
            ? "أول نظام بيئي تعليمي عربي مدعوم بالذكاء الاصطناعي. مسارات مخصصة، معامل تفاعلية، وتوجيه مهني مستمر للوصول إلى أهدافك أسرع." 
            : "The first AI-powered Arabic learning ecosystem. Personalized paths, interactive labs, and continuous career mentorship to reach your goals faster."}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors shadow-[0_0_30px_rgba(37,99,235,0.4)]">
            {isAr ? "ابدأ رحلتك الآن" : "Start Your Journey"}
          </button>
          <button onClick={onOpenTour} className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-colors backdrop-blur-md">
            {isAr ? "جولة سريعة" : "Quick Tour"}
          </button>
        </motion.div>

        {/* Proof Chips */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mt-16 text-sm text-white/40"
        >
          {["AI-Powered Paths", "Interactive Applied Labs", "Continuous Mentorship"].map((chip, i) => (
            <div key={i} className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-blue-400" />
              <span>{isAr ? (i===0?"مسارات مدعومة بالذكاء الاصطناعي":i===1?"معامل تطبيقية وتفاعلية":"توجيه مهني مستمر") : chip}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
