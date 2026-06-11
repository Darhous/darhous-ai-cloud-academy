'use client';

import React, { use } from 'react';
import { motion } from 'framer-motion';

export default function Concept3Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const isRTL = locale === 'ar';

  const portals = [
    { id: 'ai-academy', name: isRTL ? 'أكاديمية الذكاء الاصطناعي' : 'AI Academy', desc: isRTL ? 'إتقان الذكاء الاصطناعي والأدوات الحديثة' : 'Master AI and modern tools', status: 'Live' },
    { id: 'language', name: isRTL ? 'بوابة اللغة' : 'Language Portal', desc: isRTL ? 'تطوير مهاراتك اللغوية بذكاء' : 'Develop your language skills smartly', status: 'Live' },
    { id: 'digital-exams', name: isRTL ? 'الاختبارات الرقمية' : 'Digital Exams', desc: isRTL ? 'شهادات معتمدة وتقييم فوري' : 'Certified exams and instant grading', status: 'Live' },
    { id: 'career-hub', name: isRTL ? 'مركز المهن' : 'Career Hub', desc: isRTL ? 'جهز نفسك لسوق العمل' : 'Prepare yourself for the job market', status: 'Live' },
    { id: 'automation', name: isRTL ? 'أكاديمية الأتمتة' : 'Automation Academy', desc: isRTL ? 'أتمتة المهام اليومية بفاعلية' : 'Automate daily tasks effectively', status: 'New' },
    { id: 'iot', name: isRTL ? 'مختبر إنترنت الأشياء' : 'IoT Lab', desc: isRTL ? 'تطبيقات عملية على الدوائر الذكية' : 'Practical applications on smart circuits', status: 'New' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Minimal Hero */}
      <header className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-slate-100">
        <div className="max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1] mb-8 text-slate-900"
          >
            {isRTL ? 'تعلّم بذكاء.' : 'Learn.'} <br className="hidden md:block"/>
            <span className="text-slate-400">{isRTL ? 'ابنِ مستقبلك.' : 'Build.'}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-2xl"
          >
            {isRTL 
              ? 'أول نظام بيئي تعليمي عربي مدعوم بالذكاء الاصطناعي. مسارات مخصصة، ومعامل تفاعلية للوصول إلى أهدافك أسرع.' 
              : 'The first AI-powered Arabic learning ecosystem. Personalized paths and interactive labs to reach your goals faster.'}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-16"
          >
            <button className="bg-slate-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-slate-800 transition-colors">
              {isRTL ? 'ابدأ رحلتك الآن' : 'Start Your Journey'}
            </button>
            <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-lg font-medium hover:bg-slate-50 transition-colors">
              {isRTL ? 'استكشف المنصة' : 'Explore Platform'}
            </button>
          </motion.div>

          {/* Trust Triad */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-12 pt-8 border-t border-slate-100"
          >
            <div>
              <div className="text-3xl font-bold text-slate-900">12+</div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{isRTL ? 'مسار تعليمي' : 'Learning Paths'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">60+</div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{isRTL ? 'أداة ذكاء اصطناعي' : 'AI Tools'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">30+</div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{isRTL ? 'مشروع عملي' : 'Real Projects'}</div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Portal Grid */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{isRTL ? 'بوابات التعلم' : 'Learning Portals'}</h2>
          <p className="text-slate-500 text-lg">{isRTL ? 'منظومة متكاملة تلبي كافة احتياجاتك' : 'An integrated ecosystem for all your needs'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portals.map((p) => (
            <div 
              key={p.id}
              className="group p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 border border-slate-100 relative overflow-hidden"
            >
              {/* Hover line indicator */}
              <div className={`absolute top-0 bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-1 bg-slate-900 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300`} />
              
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-lg bg-slate-200/50 flex items-center justify-center">
                  <div className="w-6 h-6 bg-slate-400 rounded-sm" />
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-white border border-slate-200 rounded-full text-slate-600">
                  {p.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{p.name}</h3>
              <p className="text-slate-500 mb-6">{p.desc}</p>
              
              <div className="text-sm font-medium text-slate-900 flex items-center gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                {isRTL ? 'استكشف البوابة ←' : 'Explore Portal →'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mentor Section */}
      <section className="py-24 px-6 md:px-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">{isRTL ? 'شوف المرشد بيشتغل' : 'See the Mentor in Action'}</h2>
            <p className="text-xl text-slate-600 mb-8">
              {isRTL 
                ? 'المرشد الذكي يفهم مستواك ويبني لك خطة تعلم مخصصة لحظة بلحظة.' 
                : 'The AI Mentor understands your level and builds a custom learning plan, moment by moment.'}
            </p>
            <ul className="space-y-4 mb-8">
              {[
                isRTL ? 'يحلل أهدافك ووقتك المتاح' : 'Analyzes your goals and available time',
                isRTL ? 'يقترح مسار دراسي مخصص' : 'Suggests a custom study path',
                isRTL ? 'يرافقك عبر كل خطوة' : 'Guides you through every step'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex-shrink-0" />
                <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-sm text-slate-700 w-full">
                  {isRTL 
                    ? "أنا مبتدئ وعايز أتعلم الذكاء الاصطناعي بس مش عارف أبدأ منين، ممكن تساعدني؟" 
                    : "I'm a beginner who wants to learn AI but I don't know where to start, can you help?"}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex-shrink-0 flex items-center justify-center text-white text-xs">AI</div>
                <div className="bg-slate-900 p-4 rounded-2xl rounded-tr-sm text-white w-full">
                  {isRTL 
                    ? "ابدأ بمسار الذكاء الاصطناعي للمبتدئين (3 أسابيع)، ثم اختبر مستواك في اللغة. كل خطوة بنيتها على الخطوة اللي قبلها — وأنا معاك في كل مرحلة." 
                    : "Start with the AI for Beginners path (3 weeks), then test your language level. Every step is built on the previous one — and I'm with you at every stage."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Concept Label */}
      <div className="fixed bottom-4 right-4 px-3 py-1 bg-white text-slate-900 text-xs rounded-full border border-slate-200 shadow-sm z-50">
        Preview: Concept 3
      </div>
    </div>
  );
}
