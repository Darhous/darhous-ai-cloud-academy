"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Bot, Send, Sparkles, Terminal } from "lucide-react";
import InteractiveSurface from "@/components/ui/InteractiveSurface";

function useTypewriter(text: string, speed = 35, delay = 1800): [string, boolean] {
  const [displayed, setDisplayed] = useState("");
  const [done,      setDone]      = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    const t = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [text, speed, delay]);
  return [displayed, done];
}

export default function MentorShowcase({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const shouldReduce = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 28 },
    show:   { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.15 : 0.6, ease: [0.0, 0.0, 0.2, 1] as const } },
  };

  const mentorText = isAr
    ? "ابدأ بمسار الذكاء الاصطناعي للمبتدئين (3 أسابيع)، ثم اختبر مستواك في اللغة، وبعدها جرّب أول مشروع تطبيقي في IoT أو الأتمتة. كل خطوة بنيتها على الخطوة اللي قبلها — وأنا معاك في كل مرحلة."
    : "Start with the AI for Beginners path (3 weeks), then test your language level, then try your first hands-on IoT or Automation project. Every step is built on the previous one — and I'm with you at every stage.";

  const [mentorTyped, mentorDone] = useTypewriter(
    mentorText,
    shouldReduce ? 0 : 28,
    shouldReduce ? 0 : 2000,
  );

  const effectiveMentorTyped = shouldReduce ? mentorText : mentorTyped;
  const effectiveMentorDone  = shouldReduce ? true : mentorDone;

  return (
    <section id="mentor-showcase" className="container-xl relative z-10">
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
        className="text-center mb-14"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono mb-5"
          style={{ background: "rgba(142,213,255,0.06)", borderColor: "rgba(142,213,255,0.2)", color: "var(--color-primary)" }}
        >
          <Bot size={12} />
          {isAr ? "المرشد الذكي" : "AI Mentor"}
        </div>
        <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-gradient-premium">
          {isAr ? "شوف المرشد بيشتغل" : "See the Mentor in Action"}
        </h2>
        <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "المرشد الذكي يفهم مستواك ويبني لك خطة تعلم مخصصة لحظة بلحظة"
            : "The AI Mentor understands your level and builds a custom learning plan, moment by moment"}
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        >
          <InteractiveSurface
            className="glass-panel-promax rounded-[2rem] overflow-hidden"
            style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }}
            tiltMax={2}
            spotlightColor="rgba(142,213,255,0.06)"
          >
          {/* Chat header - Command Center Style */}
          <div className="flex items-center justify-between px-6 py-4" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(142,213,255,0.1)", border: "1px solid rgba(142,213,255,0.2)" }}>
                <Bot size={20} style={{ color: "var(--color-primary)" }} />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? "مرشد NexaLearn الذكي" : "NexaLearn AI Mentor"}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                    {isAr ? "متصل ومستعد" : "Online and ready"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
            </div>
          </div>

          {/* Chat body */}
          <div className="p-6 flex flex-col gap-6 min-h-64" style={{ background: "rgba(0,0,0,0.2)" }}>
            {/* User message */}
            <motion.div
              initial={{ opacity: 0, x: shouldReduce ? 0 : (isAr ? -20 : 20) }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: shouldReduce ? 0 : 0.3 }}
              className={`flex ${isAr ? "justify-start" : "justify-end"}`}
            >
              <div
                className="max-w-md px-5 py-3.5 rounded-2xl text-sm leading-relaxed"
                style={{
                  background: "rgba(208,188,255,0.12)",
                  border: "1px solid rgba(208,188,255,0.2)",
                  color: "var(--color-on-surface)",
                  borderRadius: isAr ? "4px 20px 20px 20px" : "20px 4px 20px 20px",
                }}
              >
                {isAr
                  ? "أنا مبتدئ وعايز أتعلم الذكاء الاصطناعي بس مش عارف أبدأ منين، ممكن تساعدني؟"
                  : "I'm a beginner who wants to learn AI but I don't know where to start, can you help?"}
              </div>
            </motion.div>

            {/* Mentor response */}
            <motion.div
              initial={{ opacity: 0, x: shouldReduce ? 0 : (isAr ? 20 : -20) }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: shouldReduce ? 0 : 0.9 }}
              className={`flex items-start gap-4 ${isAr ? "flex-row-reverse" : ""}`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                style={{ background: "rgba(142,213,255,0.1)", border: "1px solid rgba(142,213,255,0.2)" }}
              >
                <Sparkles size={18} style={{ color: "var(--color-primary)" }} />
              </div>
              <div
                className="max-w-lg px-5 py-4 rounded-2xl text-sm leading-relaxed"
                style={{
                  background: "rgba(142,213,255,0.06)",
                  border: "1px solid rgba(142,213,255,0.15)",
                  color: "var(--color-on-surface)",
                  borderRadius: isAr ? "20px 4px 20px 20px" : "4px 20px 20px 20px",
                  minHeight: "72px",
                }}
              >
                {effectiveMentorTyped || (
                  <span className="flex gap-1.5 items-center pt-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2.5 h-2.5 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2.5 h-2.5 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                )}
                {!effectiveMentorDone && effectiveMentorTyped && <span className="animate-pulse inline-block w-1.5 h-4 ml-1 bg-primary/60 align-middle" />}
              </div>
            </motion.div>
          </div>

          {/* Input area */}
          <div className="px-6 py-5" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-3">
              <div
                className="flex-1 rounded-xl px-5 py-3.5 text-sm font-mono opacity-50 flex items-center gap-3"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--color-on-surface-variant)" }}
              >
                <Terminal size={16} />
                {isAr ? "اكتب سؤالك للمرشد هنا…" : "Type your question here…"}
              </div>
              <Link
                href={`/${locale}/mentor`}
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-105"
                style={{ background: "rgba(142,213,255,0.12)", border: "1px solid rgba(142,213,255,0.2)", color: "var(--color-primary)" }}
              >
                <Send size={18} />
              </Link>
            </div>
            <p className="text-center text-xs font-mono mt-4 opacity-60" style={{ color: "var(--color-on-surface-variant)" }}>
              <Link href={`/${locale}/mentor`} className="hover:text-primary transition-colors" style={{ color: "var(--color-primary)", textDecoration: "none" }}>
                {isAr ? "افتح المرشد الكامل ←" : "Open Full Mentor →"}
              </Link>
            </p>
          </div>
          </InteractiveSurface>
        </motion.div>
      </div>
    </section>
  );
}
