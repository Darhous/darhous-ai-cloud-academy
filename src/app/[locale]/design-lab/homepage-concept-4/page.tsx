'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export default function Concept4Page({ params: { locale } }: { params: { locale: string } }) {
  const isRTL = locale === 'ar';
  const shouldReduceMotion = useReducedMotion();
  const [activePortal, setActivePortal] = useState<number | null>(null);

  const portals = [
    { id: 'ai-academy', name: isRTL ? 'أكاديمية الذكاء الاصطناعي' : 'AI Academy', color: 'from-blue-600 to-indigo-900', cx: '50%', cy: '30%', features: [isRTL ? '18 دورة' : '18 Courses', isRTL ? '62 أداة' : '62 Tools', isRTL ? 'مرشد ذكي' : 'AI Mentor'] },
    { id: 'language', name: isRTL ? 'بوابة اللغة' : 'Language Portal', color: 'from-emerald-500 to-teal-900', cx: '25%', cy: '45%', features: [isRTL ? 'اختبار المستوى' : 'Level Test', isRTL ? 'تقييم فوري' : 'Instant Grading'] },
    { id: 'digital-exams', name: isRTL ? 'الاختبارات الرقمية' : 'Digital Exams', color: 'from-orange-500 to-red-900', cx: '75%', cy: '45%', features: [isRTL ? '9 مواد' : '9 Subjects', isRTL ? '902 سؤال' : '902 Questions'] },
    { id: 'career-hub', name: isRTL ? 'مركز المهن' : 'Career Hub', color: 'from-purple-500 to-fuchsia-900', cx: '35%', cy: '70%', features: [isRTL ? 'محلل ATS' : 'ATS Analyzer', isRTL ? 'مطابقة الوظائف' : 'Job Matching'] },
    { id: 'automation', name: isRTL ? 'أكاديمية الأتمتة' : 'Automation Academy', color: 'from-pink-500 to-rose-900', cx: '65%', cy: '70%', features: [isRTL ? '30 وصفة أتمتة' : '30 Automation Recipes', isRTL ? '15 معمل تطبيقي' : '15 Applied Labs'] },
  ];

  return (
    <div className="min-h-screen bg-[#020205] text-white font-sans overflow-hidden relative" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Dynamic Background */}
      <AnimatePresence>
        {activePortal !== null && (
          <motion.div
            key="active-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0 bg-gradient-to-br ${portals[activePortal].color} opacity-20 pointer-events-none`}
          />
        )}
      </AnimatePresence>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none mix-blend-screen" />

      {/* Main Constellation View */}
      <div className={`relative h-screen w-full transition-all duration-1000 ${activePortal !== null ? 'scale-[1.15] blur-md opacity-20 pointer-events-none' : 'scale-100 opacity-100'}`}>
        
        {/* Title */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center z-10 w-full px-6">
          <motion.h1 
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-widest uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white/50"
          >
            NexaLearn
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-blue-200/60 tracking-widest text-sm md:text-base font-mono"
          >
            {isRTL ? 'اكتشف عالمًا من البوابات الذكية' : 'Discover a universe of smart portals'}
          </motion.p>
        </div>

        {/* Orbs */}
        {portals.map((p, idx) => (
          <motion.button
            key={p.id}
            initial={shouldReduceMotion ? { opacity: 1 } : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + (idx * 0.1), type: 'spring' }}
            whileHover={shouldReduceMotion ? {} : { scale: 1.2 }}
            onClick={() => setActivePortal(idx)}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 group"
            style={{ left: p.cx, top: p.cy }}
          >
            <div className={`w-full h-full rounded-full bg-gradient-to-br ${p.color} blur-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-500`} />
            <div className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-white shadow-[0_0_20px_white]" />
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 text-sm md:text-lg font-bold whitespace-nowrap transition-all duration-300 ${activePortal === idx ? 'opacity-100 text-white' : 'opacity-60 text-white/60 group-hover:opacity-100 group-hover:text-white'}`}>
              {p.name}
            </div>
          </motion.button>
        ))}

        {/* Constellation Lines (Simulated with simple SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 stroke-white/50" strokeWidth="1">
           <line x1="50%" y1="30%" x2="25%" y2="45%" strokeDasharray="4 4" />
           <line x1="50%" y1="30%" x2="75%" y2="45%" strokeDasharray="4 4" />
           <line x1="25%" y1="45%" x2="35%" y2="70%" strokeDasharray="4 4" />
           <line x1="75%" y1="45%" x2="65%" y2="70%" strokeDasharray="4 4" />
           <line x1="35%" y1="70%" x2="65%" y2="70%" strokeDasharray="4 4" />
        </svg>

        {/* Scroll Hint */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-xs uppercase tracking-widest">{isRTL ? 'اختر بوابة' : 'Select a portal'}</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </div>

      {/* Portal Detail Overlay */}
      <AnimatePresence>
        {activePortal !== null && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
          >
            <div className={`relative w-full max-w-2xl aspect-[16/9] rounded-[2rem] overflow-hidden bg-gradient-to-br ${portals[activePortal].color} border border-white/20 shadow-[0_0_100px_rgba(0,0,0,0.5)] p-12 flex flex-col justify-between`}>
              
              <button 
                onClick={() => setActivePortal(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
              >
                ✕
              </button>

              <div>
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
                >
                  {portals[activePortal].name}
                </motion.h2>
                <div className="flex gap-3 flex-wrap">
                  {portals[activePortal].features.map((f, i) => (
                    <motion.span 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="px-4 py-1.5 bg-black/20 backdrop-blur-md border border-white/10 rounded-full text-sm"
                    >
                      {f}
                    </motion.span>
                  ))}
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <button className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-3">
                  {isRTL ? 'دخول البوابة' : 'Enter Portal'} →
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Internal Concept Label */}
      <div className="fixed bottom-4 right-4 px-3 py-1 bg-white/10 text-white text-xs rounded-full border border-white/20 backdrop-blur-md z-[60]">
        Preview: Concept 4
      </div>
    </div>
  );
}
