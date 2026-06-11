"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { availablePortals, comingSoonPortals, portals } from "@/config/portals";
import { Button } from "@heroui/react";
import { ShimmerButton } from "@/components/shadcn/ui/shimmer-button";
import { BentoGrid, BentoGridItem } from "@/components/aceternity/bento-grid";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { 
  Bot, Sparkles, Trophy, BookOpen, Layers, Zap, Rocket, Terminal, Brain, ArrowRight,
  Globe, LayoutGrid, X, ChevronRight, ChevronLeft, Mail, CheckCircle, ChevronDown, 
  Send
} from "lucide-react";
import Link from "next/link";

export default function HomePageConcept({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const shouldReduceMotion = useReducedMotion();
  const [tourStep, setTourStep] = useState(0);
  const [introVisible, setIntroVisible] = useState(true);

  // Dismiss intro after a delay
  useEffect(() => {
    const timer = setTimeout(() => setIntroVisible(false), shouldReduceMotion ? 1200 : 4400);
    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const tourContentAr = [
    { title: "أهلاً بك في NexaLearn", desc: "نظام تعلم ذكي يبني مسارك التعليمي والمهني من الصفر — خطوة بخطوة." },
    { title: "مرشدك الشخصي بالذكاء الاصطناعي", desc: "يفهم أهدافك ويصمم لك خطة تعلم مخصصة، ويرافقك عبر كل بوابة." },
    { title: "6 بوابات تعليمية متخصصة", desc: "من الذكاء الاصطناعي والأتمتة، إلى اللغة، المهن، والمعامل التطبيقية." },
    { title: "تتبع تقدمك واحصل على شهاداتك", desc: "كل دورة واختبار تُنهيه يُسجَّل في لوحتك — مع شهادات قابلة للتحقق." },
    { title: "جاهز تبدأ رحلتك؟", desc: "اختر مسارك بنفسك، أو دع المرشد الذكي يبنيه لك — والبداية مجانية." }
  ];

  const tourContentEn = [
    { title: "Welcome to NexaLearn", desc: "A smart learning OS that builds your educational & career path from zero — one step at a time." },
    { title: "Your personal AI Mentor", desc: "Understands your goals, designs a personalized plan, and guides you across every portal." },
    { title: "6 specialized learning portals", desc: "From AI & automation to language, careers, digital exams, and hands-on labs." },
    { title: "Track progress & earn certificates", desc: "Every course and exam you complete is tracked — with verifiable certificates." },
    { title: "Ready to start your journey?", desc: "Pick your own path, or let the AI Mentor build one for you — free to start." }
  ];

  const tourContent = isAr ? tourContentAr : tourContentEn;

  return (
    <div className={`relative min-h-screen bg-[#08090c] text-white overflow-x-hidden ${isAr ? 'rtl' : 'ltr'}`} dir={isAr ? "rtl" : "ltr"}>
      <BackgroundBeams />

      {/* S1: Cinematic Intro (Overlay) */}
      {introVisible && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          className="fixed inset-0 z-[9999] bg-[#08090c] flex flex-col items-center justify-center"
        >
          <div className="absolute inset-0 bg-[rgba(142,213,255,0.06)] blur-[50px] rounded-full scale-150"></div>
          <motion.h1 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-4 z-10"
          >
            NexaLearn
          </motion.h1>
          <motion.p 
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="font-mono text-gray-400 z-10"
          >
            by Ahmed Darhous
          </motion.p>
          <div className="w-[220px] h-1 bg-white/10 mt-8 rounded-full overflow-hidden z-10">
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 3.6, ease: "easeInOut" }}
              className="h-full bg-blue-500 origin-left"
            />
          </div>
          <button onClick={() => setIntroVisible(false)} className="absolute bottom-10 text-gray-500 hover:text-white transition-colors z-10 text-sm">
            {isAr ? "تخطي" : "Skip"}
          </button>
        </motion.div>
      )}

      {/* S2: Scroll Indicator Chrome */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-50 bg-white/10">
        <div className="h-full bg-blue-500 shadow-[0_0_10px_var(--color-primary)] w-[10%]" />
      </div>
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {[0,1,2,3,4].map(i => (
          <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-blue-500 scale-125 shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'bg-white/20'}`} />
        ))}
      </div>

      <nav className="absolute top-0 w-full z-40 flex items-center justify-between p-6 bg-transparent">
        <div className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          NexaLearn
        </div>
      </nav>

      {/* S4: Hero Section & S13: Stats */}
      <section className="relative z-10 pt-32 pb-10 flex flex-col items-center justify-center px-4 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm mb-6 backdrop-blur-md">
            <Sparkles size={16} />
            <span>{isAr ? "NexaLearn by Ahmed Darhous — الجيل القادم للتعلم" : "NexaLearn by Ahmed Darhous — Next Gen Learning"}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            {isAr ? "تعلّم بثقة." : "Learn. Build. Grow."} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
              {isAr ? "ابنِ مستقبلك مع NexaLearn" : "Intelligently with NexaLearn."}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl">
            {isAr 
              ? "أول نظام بيئي تعليمي عربي مدعوم بالذكاء الاصطناعي. مسارات مخصصة، معامل تفاعلية، وتوجيه مهني مستمر للوصول إلى أهدافك أسرع."
              : "The first AI-powered Arabic learning ecosystem. Personalized paths, interactive labs, and continuous career mentorship to reach your goals faster."}
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["AI-Powered Paths", "Interactive Applied Labs", "Continuous Mentorship"].map((chip, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-gray-300">
                <CheckCircle size={14} className="text-green-400" />
                {isAr ? ["مسارات مدعومة بالذكاء الاصطناعي", "معامل تطبيقية وتفاعلية", "توجيه مهني مستمر"][i] : chip}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {/* CTA 1 */}
            <ShimmerButton shimmerColor="#38bdf8" background="#0f172a" className="font-semibold px-8 py-4">
              {isAr ? "ابدأ رحلتك الآن" : "Start Your Journey"}
            </ShimmerButton>
            {/* CTA 2 */}
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 h-[56px]">
              {isAr ? "تصفح المسارات" : "Explore Paths"}
            </Button>
            {/* CTA 3 */}
            <Button size="lg" variant="ghost" className="bg-white/5 border-white/10 text-white hover:bg-white/10 px-8 h-[56px]">
              {isAr ? "جولة سريعة" : "Quick Tour"}
            </Button>
          </div>
        </motion.div>

        {/* AI Command Center Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-16 w-full max-w-5xl rounded-2xl border border-white/10 bg-[#0c1015]/80 backdrop-blur-xl shadow-[0_0_80px_rgba(56,189,248,0.15)] overflow-hidden"
        >
          <div className="flex items-center px-4 py-3 border-b border-white/10 bg-white/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="mx-auto flex items-center gap-2 text-xs text-gray-400 font-mono bg-black/40 px-3 py-1 rounded-md border border-white/5">
              <Bot size={14} className="text-blue-400" />
              {isAr ? "الموجه الذكي" : "AI Mentor"} | {isAr ? "متصل بالنظام البيئي" : "Ecosystem Online"}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 h-[300px]">
            <div className="border-r border-white/10 p-5 hidden md:block">
              <h3 className="text-sm font-semibold text-gray-300 mb-4">{isAr ? "نظرة عامة على التعلم" : "Learning Overview"}</h3>
              <div className="space-y-4">
                {[
                  { name: isAr ? "أكاديمية الذكاء الاصطناعي" : "AI Academy", pct: 68, color: "bg-blue-500" },
                  { name: isAr ? "بوابة اللغة" : "Language Portal", pct: 100, color: "bg-purple-500" },
                  { name: isAr ? "اختبارات التحول الرقمي" : "Digital Exam", pct: 45, color: "bg-cyan-500" },
                  { name: isAr ? "بوابة المهنية" : "Career Hub", pct: 20, color: "bg-amber-500" },
                  { name: isAr ? "أكاديمية الأتمتة" : "Automation", pct: 10, color: "bg-green-500" },
                  { name: isAr ? "مختبر إنترنت الأشياء" : "IoT Lab", pct: 5, color: "bg-orange-500" }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] mb-1.5 text-gray-400">
                      <span>{item.name}</span>
                      <span>{item.pct}%</span>
                    </div>
                    <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.pct}%` }}
                        transition={{ delay: 0.8 + i * 0.1, duration: 1 }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 p-6 flex flex-col justify-end bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#0c1015] to-[#0c1015]">
              <div className="flex flex-col gap-4">
                <div className="self-start max-w-[80%] bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-sm text-sm text-gray-300 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot size={16} className="text-blue-400" />
                    <span className="font-semibold text-white">{isAr ? "المرشد الذكي" : "AI Mentor"}</span>
                  </div>
                  <p className="leading-relaxed">
                    {isAr ? "لقد قمت بتحليل أهدافك. أفضل بداية لك هي التركيز على مسار هندسة الأوامر بجانب أساسيات الشبكات." : "I've analyzed your goals. Your best starting point is focusing on Prompt Engineering alongside Network Basics."}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center bg-black/50 border border-white/10 rounded-xl p-2">
                <div className="px-3 text-gray-500"><Terminal size={18} /></div>
                <input type="text" disabled placeholder={isAr ? "يحلل مهاراتك..." : "Analyzing skills..."} className="bg-transparent border-none outline-none w-full text-sm text-white disabled:opacity-50" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* S13: Stats */}
      <section className="relative z-10 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 border border-white/10 bg-white/[0.02] p-6 rounded-3xl backdrop-blur-xl">
             {[
               { label: isAr ? "مسار تعليمي" : "Learning Paths", val: "12+" },
               { label: isAr ? "درس مقترح" : "Lessons", val: "100+" },
               { label: isAr ? "أداة ذكاء اصطناعي" : "AI Tools", val: "60+" },
               { label: isAr ? "مشروع عملي" : "Real Projects", val: "30+" },
               { label: isAr ? "مسارات كلاود" : "Cloud Tracks", val: "4" },
               { label: isAr ? "منصة عربية" : "Arabic Platform", val: "∞" },
             ].map((stat, idx) => (
                <div key={idx} className="text-center group p-2 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="text-2xl font-bold text-white mb-1">{stat.val}</div>
                  <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{stat.label}</div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* S5: Marquee Strip */}
      <div className="relative z-10 w-full overflow-hidden bg-black/50 py-4 border-y border-white/5 whitespace-nowrap">
         <div className="animate-pulse flex gap-8 text-sm font-mono text-gray-400 tracking-widest px-4">
            {Array(5).fill(isAr ? "كلود AI • نكست.جي إس • رياكت • سوبابيس • تيلويند • فيرسيل • تايب سكريبت • بايثون" : "Claude AI • Next.js 16 • React 19 • Supabase • Tailwind CSS • Vercel • TypeScript").join(" • ")}
         </div>
      </div>

      {/* S11: How It Works */}
      <section className="relative z-10 py-24 px-4 bg-[#08090c]">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            {isAr ? "رحلتك في 4 خطوات" : "Your Journey in 4 Steps"}
          </h2>
          <p className="text-gray-400">
            {isAr ? "من الصفر إلى الاحتراف — خطوة بخطوة مع مرشدك الذكي الذي يرافقك في كل مرحلة" : "From zero to mastery — step by step with your AI mentor guiding you at every stage"}
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { id: "01", t: isAr ? "اختر هدفك" : "Choose Your Goal", d: isAr ? "حدد مستواك واهتمامك والوقت المتاح لك يوميًا." : "Set your level, interest, and daily time." },
            { id: "02", t: isAr ? "المرشد يبني لك خطة" : "Mentor Builds Plan", d: isAr ? "الذكاء الاصطناعي يصمم مسارًا مخصصًا بالكامل لك." : "AI designs a fully custom weekly roadmap." },
            { id: "03", t: isAr ? "اتعلم وطبّق" : "Learn & Apply", d: isAr ? "ادخل البوابات، اتعلم المحتوى، واعمل مشاريع حقيقية." : "Enter portals, absorb content, build real projects." },
            { id: "04", t: isAr ? "احصل على شهادة" : "Get Certified", d: isAr ? "شهادات معتمدة وتوصيات ذكية للخطوة القادمة." : "Verified certificates and smart next-step recommendations." }
          ].map((step, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
              <div className="text-5xl font-black text-white/5 absolute -top-2 -right-2">{step.id}</div>
              <h3 className="text-lg font-bold text-white mb-2 relative z-10">{step.t}</h3>
              <p className="text-sm text-gray-400 relative z-10">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* S6: Scroll Stack Section (Portals) S9: Ecosystem Map */}
      <section className="relative z-10 py-24 px-4 bg-black/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
              {isAr ? "بوابات NexaLearn الذكية" : "NexaLearn Smart Portals"}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {isAr ? "منظومة متكاملة مصممة لتلبية كل احتياجاتك التعليمية والمهنية عبر بوابات متخصصة" : "An integrated ecosystem designed to cover all your learning and career needs through specialized portals"}
            </p>
          </div>

          <BentoGrid className="mx-auto">
            {availablePortals.slice(0, 7).map((portal, i) => (
              <BentoGridItem
                key={portal.id}
                title={isAr ? portal.titleAr : portal.titleEn}
                description={isAr ? portal.descriptionAr : portal.descriptionEn}
                header={
                  <div 
                    className="flex flex-col w-full h-full min-h-[8rem] rounded-xl relative overflow-hidden group"
                    style={{ background: portal.gradient }}
                  >
                     <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300" />
                     <div className="p-4 z-10 relative flex-1">
                        <div className="text-4xl mb-2">{portal.icon}</div>
                        <div className="flex flex-wrap gap-1 mt-2">
                           {(isAr ? portal.features : (portal.featuresEn || portal.features)).slice(0,3).map((f, j) => (
                             <span key={j} className="text-[10px] bg-black/40 px-2 py-1 rounded border border-white/10">{f}</span>
                           ))}
                        </div>
                     </div>
                     <div className="absolute bottom-4 right-4 z-10">
                        {/* CTA 4-10 */}
                        <Button size="sm" className="bg-white text-black font-semibold shadow-xl">
                          {isAr ? portal.ctaAr : portal.ctaEn}
                        </Button>
                     </div>
                  </div>
                }
                className={i === 0 ? "md:col-span-2 md:row-span-2" : i === 3 ? "md:col-span-2" : ""}
              />
            ))}
            
            {/* S9 Central Node AI Mentor inserted into Grid */}
            <BentoGridItem 
               title={isAr ? "المرشد الذكي" : "NexaLearn AI Mentor"}
               description={isAr ? "العقل المدبر لرحلتك التعليمية. المركز الرئيسي" : "The mastermind of your learning journey. Central Hub"}
               className="md:col-span-2 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.2)] bg-blue-900/10"
               header={
                 <div className="flex items-center justify-center h-full min-h-[8rem] relative">
                    <div className="absolute w-full h-full border border-blue-500/20 rounded-xl animate-pulse"></div>
                    <Bot size={48} className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                 </div>
               }
            />
          </BentoGrid>
        </div>
      </section>

      {/* S8: Path Selector (Interactive Quiz Simulation) */}
      <section className="relative z-10 py-24 px-4 bg-[#08090c]">
         <div className="max-w-4xl mx-auto glass-panel-promax bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 md:p-12">
            <div className="text-center mb-8">
              <span className="text-blue-400 text-sm font-bold uppercase tracking-widest">{isAr ? "خطتك الشخصية" : "Your Personal Plan"}</span>
              <h2 className="text-3xl font-bold mt-2">{isAr ? "مش عارف تبدأ منين؟" : "Not Sure Where to Start?"}</h2>
              <p className="text-gray-400 mt-2">{isAr ? "اختار إجاباتك وهنعمل لك خطة أسبوعية مخصصة — مجانًا وفورًا" : "Answer these questions and we'll build a custom weekly plan for you — free and instant"}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/50 p-6 rounded-2xl border border-white/5">
                 <h4 className="font-semibold text-gray-300 mb-3">{isAr ? "ما مستواك الحالي؟" : "What's your current level?"}</h4>
                 <div className="flex flex-col gap-2">
                    <button className="text-left px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500 hover:text-blue-400 transition-colors">{isAr ? "مبتدئ تمامًا" : "Complete Beginner"}</button>
                    <button className="text-left px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500 text-blue-400">{isAr ? "لدي أساسيات" : "Some Basics"}</button>
                 </div>
              </div>
              <div className="bg-black/50 p-6 rounded-2xl border border-white/5">
                 <h4 className="font-semibold text-gray-300 mb-3">{isAr ? "ما هدفك الرئيسي؟" : "What's your main goal?"}</h4>
                 <div className="flex flex-col gap-2">
                    <button className="text-left px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500 hover:text-blue-400 transition-colors">{isAr ? "مهارة جديدة" : "New Skill"}</button>
                    <button className="text-left px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500 text-blue-400">{isAr ? "تطوير مهني" : "Career Growth"}</button>
                 </div>
              </div>
            </div>
            <div className="mt-8 flex justify-center gap-4">
               {/* CTA 11 */}
               <Button className="bg-blue-600 text-white px-8">{isAr ? "ابدأ خطتي الآن" : "Start My Plan Now"}</Button>
               {/* CTA 12 */}
               <Button variant="ghost" className="bg-white/5 text-gray-300">{isAr ? "اسأل المرشد الذكي بدلًا من ذلك" : "Ask the AI Mentor instead"}</Button>
            </div>
         </div>
      </section>

      {/* S7: Premium 3D Showcase (Dashboard View) */}
      <section className="relative z-10 py-24 px-4 border-y border-white/5 bg-black/40">
         <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{isAr ? "استكشف منصة NexaLearn الذكية" : "Explore the NexaLearn Experience"}</h2>
            <p className="text-gray-400 mb-12">{isAr ? "كل أدوات التعلم، البرومبتات، Claude، الكلاود، والمشاريع في تجربة واحدة." : "All learning tools, prompts, Claude, cloud, and projects in one intelligent experience."}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[
                 { t: isAr ? "استوديو البرومبتات" : "Prompt Studio", i: <Terminal /> },
                 { t: isAr ? "مرشح أدوات الذكاء الاصطناعي" : "AI Tool Recommender", i: <Bot /> },
                 { t: isAr ? "لوحة الطالب" : "Student Dashboard", i: <LayoutGrid /> },
                 { t: isAr ? "مكتبة المشاريع" : "Projects Library", i: <Layers /> }
               ].map((tool, i) => (
                 <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer flex flex-col items-center justify-center gap-3">
                   <div className="text-blue-400">{tool.i}</div>
                   <div className="font-semibold text-sm">{tool.t}</div>
                   {/* CTAs 13-16 implicit */}
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* S10: Mentor Showcase */}
      <section className="relative z-10 py-24 px-4 bg-[#08090c]">
         <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold mb-4">{isAr ? "شوف المرشد بيشتغل" : "See the Mentor in Action"}</h2>
               <p className="text-gray-400">{isAr ? "المرشد الذكي يفهم مستواك ويبني لك خطة تعلم مخصصة لحظة بلحظة" : "The AI Mentor understands your level and builds a custom learning plan, moment by moment"}</p>
            </div>
            
            <div className="bg-black/60 border border-white/10 rounded-[2rem] p-6 shadow-2xl">
               <div className="flex gap-4 items-start mb-6">
                 <div className="bg-white/10 p-3 rounded-2xl rounded-tr-sm ml-auto max-w-[80%] text-sm">
                   {isAr ? "أنا مبتدئ وعايز أتعلم الذكاء الاصطناعي بس مش عارف أبدأ منين، ممكن تساعدني؟" : "I'm a beginner who wants to learn AI but I don't know where to start, can you help?"}
                 </div>
               </div>
               <div className="flex gap-4 items-start mb-6">
                 <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                   <Bot size={20} className="text-blue-400" />
                 </div>
                 <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded-2xl rounded-tl-sm max-w-[80%] text-sm text-gray-300">
                   {isAr ? "ابدأ بمسار الذكاء الاصطناعي للمبتدئين (3 أسابيع)، ثم اختبر مستواك في اللغة، وبعدها جرّب أول مشروع تطبيقي في IoT أو الأتمتة. كل خطوة بنيتها على الخطوة اللي قبلها — وأنا معاك في كل مرحلة." : "Start with the AI for Beginners path (3 weeks), then test your language level, then try your first hands-on IoT or Automation project. Every step is built on the previous one — and I'm with you at every stage."}
                 </div>
               </div>
               
               <div className="mt-8 flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-2 px-4">
                  <input type="text" disabled placeholder={isAr ? "اكتب سؤالك للمرشد هنا…" : "Type your question here…"} className="bg-transparent border-none outline-none w-full text-sm disabled:opacity-50" />
                  {/* CTA 17 */}
                  <button className="p-2 bg-blue-600 rounded-lg text-white"><Send size={16} /></button>
               </div>
               {/* CTA 18 */}
               <div className="mt-4 text-center">
                 <Link href="#" className="text-sm text-blue-400 hover:text-blue-300 font-semibold">{isAr ? "افتح المرشد الكامل ←" : "Open Full Mentor →"}</Link>
               </div>
            </div>
         </div>
      </section>

      {/* S12: Why Darhous */}
      <section className="relative z-10 py-24 px-4 bg-black/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
              {isAr ? "لماذا تختار NexaLearn؟" : "Why Choose NexaLearn?"}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {isAr ? "ما يميّزنا عن كل منصة تعليمية أخرى في الشرق الأوسط" : "What sets us apart from every other educational platform in the Middle East"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             {[
               { t: isAr ? "منصة عربية ذكية" : "Arabic-First Platform", d: isAr ? "محتوى متخصص باللغة العربية" : "Specialized Arabic content tailored for Arab learners" },
               { t: isAr ? "حساب واحد للجميع" : "One Account for All", d: isAr ? "سجّل مرة واحدة واستخدم كل البوابات" : "Register once and access all portals" },
               { t: isAr ? "تعليم قائم على المشاريع" : "Project-Based Learning", d: isAr ? "تطبيق عملي حقيقي" : "Real hands-on application" },
               { t: isAr ? "اختبارات وتقارير" : "Instant Tests & Reports", d: isAr ? "نتائج لحظية وتقارير تفصيلية" : "Real-time results and detailed reports" },
               { t: isAr ? "ربط التعليم بالتوظيف" : "Education Meets Career", d: isAr ? "مسار متكامل من التعلم حتى الوظيفة" : "A complete path from learning to job" },
               { t: isAr ? "مرشد AI شخصي" : "Personal AI Mentor", d: isAr ? "المرشد يبني لك الخطة المناسبة" : "The mentor builds your plan" },
               { t: isAr ? "لوحة تحكم موحدة" : "Unified Dashboard", d: isAr ? "تتبع تقدمك من مكان واحد" : "Track all your progress in one place" },
               { t: isAr ? "تجربة احترافية" : "Premium UX", d: isAr ? "تصميم premium وتجربة مستخدم مدروسة" : "Modern design and crafted user experience" }
             ].map((f, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:bg-white/5 transition-colors">
                   <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 text-blue-400 border border-blue-500/20">
                     <Globe size={24} />
                   </div>
                   <h3 className="text-lg font-bold mb-2">{f.t}</h3>
                   <p className="text-sm text-gray-400">{f.d}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* S14: Final CTA */}
      <section className="relative z-10 py-24 px-4 bg-[#08090c]">
         <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black border border-white/10 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/20 blur-[120px]"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 blur-[100px]"></div>
            
            <div className="relative z-10">
               <h2 className="text-4xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                 {isAr ? "ابدأ الآن…\nحتى لو لا تعرف من أين تبدأ" : "Start Now…\nEven If You Don't Know Where to Begin"}
               </h2>
               <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                 {isAr ? "المرشد الذكي يبني لك الطريق، خطوة بخطوة، من الصفر حتى الاحتراف — كل ما عليك فعله هو البدء." : "The AI Mentor builds your path, step by step, from zero to mastery — all you need to do is start."}
               </p>
               <div className="flex flex-wrap justify-center gap-4">
                  {/* CTA 19 */}
                  <ShimmerButton shimmerColor="#38bdf8" background="#2563eb" className="font-semibold px-10 py-5 text-lg shadow-[0_0_40px_rgba(37,99,235,0.4)]">
                    {isAr ? "ابدأ مجانًا الآن" : "Start Free Now"}
                  </ShimmerButton>
                  {/* CTA 20 */}
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 h-[64px] px-8 text-lg">
                    {isAr ? "جرب المرشد الذكي" : "Try AI Mentor"}
                  </Button>
               </div>
            </div>
         </div>
      </section>

      {/* S15: Community Signup */}
      <section className="relative z-10 py-16 px-4 bg-black pb-32">
         <div className="max-w-4xl mx-auto bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden">
            <div className="flex flex-col md:flex-row gap-8 items-center">
               <div className="flex-1">
                 <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                   <Mail className="text-blue-400" />
                   {isAr ? "مجتمع NexaLearn للذكاء الاصطناعي" : "NexaLearn AI Community"}
                 </h2>
                 <p className="text-gray-400 text-sm leading-relaxed">
                   {isAr ? "انضم ليصلك أسبوعيًا أفضل أدوات الذكاء الاصطناعي، برومبتات Claude، تريندات Gemini Nano Banana، مشاريع عملية، ومسارات تعلم وتحديثات المنصة." : "Join to receive weekly AI tools, Claude prompts, Gemini Nano Banana trends, practical projects, learning paths, and platform updates."}
                 </p>
               </div>
               <div className="w-full md:w-[400px]">
                 <div className="flex flex-col gap-3">
                   <input type="email" placeholder={isAr ? "البريد الإلكتروني *" : "Email Address *"} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none" />
                   <div className="grid grid-cols-2 gap-3">
                     <div className="relative">
                       <select className="w-full appearance-none bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-400 focus:border-blue-500 outline-none">
                         <option>{isAr ? "مستواك" : "Your Level"}</option>
                       </select>
                       <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                     </div>
                     <div className="relative">
                       <select className="w-full appearance-none bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-400 focus:border-blue-500 outline-none">
                         <option>{isAr ? "اهتمامك الرئيسي" : "Main Interest"}</option>
                       </select>
                       <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                     </div>
                   </div>
                   {/* CTA 21 */}
                   <Button className="w-full bg-blue-600 text-white mt-2">{isAr ? "انضم الآن" : "Join Now"}</Button>
                   <p className="text-[10px] text-gray-500 text-center mt-2">
                     {isAr ? "لن نرسل رسائل مزعجة. نستخدم بريدك فقط لتحديثات المنصة والمحتوى التعليمي." : "No spam. Your email is used only for platform updates and educational content."}
                   </p>
                 </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
