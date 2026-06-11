'use client';

import React, { use } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Concept2Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const isRTL = locale === 'ar';
  const shouldReduceMotion = useReducedMotion();

  const journeySteps = [
    {
      week: 1,
      title: isRTL ? 'الأساسيات وبناء الثقة' : 'Basics & Confidence Building',
      portal: isRTL ? 'أكاديمية الذكاء الاصطناعي' : 'AI Academy',
      outcome: isRTL ? 'ستفهم كيف يعمل AI وستكتب أول أمر احترافي' : 'You will understand AI & write your first pro prompt.',
      active: true,
    },
    {
      week: 3,
      title: isRTL ? 'التطبيق العملي الأول' : 'First Hands-On Application',
      portal: isRTL ? 'مختبر إنترنت الأشياء' : 'IoT Lab',
      outcome: isRTL ? 'ستقوم بتشغيل وبرمجة أول جهاز ذكي' : 'You will program & run your first smart device.',
      active: false,
    },
    {
      week: 6,
      title: isRTL ? 'الشهادة والجاهزية المهنية' : 'Certification & Career Readiness',
      portal: isRTL ? 'مركز المهن' : 'Career Hub',
      outcome: isRTL ? 'ستحصل على شهادتك الأولى وتحدث سيرتك الذاتية' : 'Earn your first certificate and update your resume.',
      active: false,
    }
  ];

  return (
    <div className="min-h-screen bg-[#08090c] text-white font-sans overflow-x-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Hero Section: Single Question Focus */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center relative pt-24 pb-12">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto space-y-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            {isRTL ? 'ماذا تريد أن تتعلم اليوم؟' : 'What do you want to learn today?'}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: '🤖', title: isRTL ? 'مهارة ذكاء اصطناعي' : 'AI Skill', color: 'from-blue-500/20 to-cyan-500/5' },
              { icon: '🚀', title: isRTL ? 'بناء مسار مهني' : 'Career Path', color: 'from-purple-500/20 to-pink-500/5' },
              { icon: '🏆', title: isRTL ? 'اجتياز اختبار' : 'Pass Exam', color: 'from-orange-500/20 to-yellow-500/5' }
            ].map((item, i) => (
              <motion.button
                key={i}
                whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.02 }}
                className={`p-8 rounded-3xl bg-gradient-to-b ${item.color} border border-white/10 hover:border-white/30 transition-all flex flex-col items-center gap-4 group`}
              >
                <span className="text-4xl group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className="font-medium text-lg">{item.title}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* The Journey Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto relative">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-4">{isRTL ? 'رحلتك المقترحة' : 'Your Recommended Journey'}</h2>
          <p className="text-gray-400">{isRTL ? 'من الصفر إلى الاحتراف - خطوة بخطوة' : 'From zero to mastery - step by step'}</p>
        </div>

        <div className="relative border-l-2 border-white/10 ml-8 md:ml-0 md:border-l-0">
          {/* Timeline center line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 opacity-20 -translate-x-1/2" />
          
          <div className="space-y-24">
            {journeySteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={shouldReduceMotion ? { opacity: 1 } : { y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                className={`relative flex flex-col md:flex-row gap-8 items-center ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              >
                {/* Center Node */}
                <div className="absolute left-[-33px] md:left-1/2 md:-translate-x-1/2 w-16 h-16 rounded-full bg-[#08090c] border-4 border-[#08090c] z-10 flex items-center justify-center">
                  <div className={`w-full h-full rounded-full flex items-center justify-center text-sm font-bold ${step.active ? 'bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'bg-white/10 text-gray-400'}`}>
                    W{step.week}
                  </div>
                </div>

                {/* Content Card */}
                <div className="w-full md:w-1/2 pl-8 md:pl-0 md:pr-12 group">
                  <div className={`p-8 rounded-3xl border ${step.active ? 'bg-white/5 border-blue-500/30' : 'bg-white/[0.02] border-white/10'} transition-colors`}>
                    <span className="text-sm font-mono text-blue-400 mb-2 block">{step.portal}</span>
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{step.outcome}</p>
                    
                    {step.active && (
                      <button className="mt-6 px-6 py-2 bg-blue-500/20 text-blue-400 rounded-full font-medium text-sm hover:bg-blue-500/30 transition-colors">
                        {isRTL ? 'ابدأ الأسبوع الأول' : 'Start Week 1'}
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Empty space for alternating layout */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Concept Label */}
      <div className="fixed bottom-4 right-4 px-3 py-1 bg-black/80 text-white text-xs rounded-full border border-white/20 backdrop-blur-md z-50">
        Preview: Concept 2
      </div>
    </div>
  );
}
