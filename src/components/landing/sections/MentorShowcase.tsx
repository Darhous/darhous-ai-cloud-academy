"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Bot, Send } from "lucide-react";

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
    <section id="mentor-showcase" className="container-xl">
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
        className="text-center mb-10"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono mb-5"
          style={{ background: "rgba(142,213,255,0.06)", borderColor: "rgba(142,213,255,0.2)", color: "var(--color-primary)" }}
        >
          <Bot size={12} />
          {isAr ? "المرشد الذكي" : "AI Mentor"}
        </div>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "شوف المرشد بيشتغل" : "See the Mentor in Action"}
        </h2>
        <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "المرشد الذكي يفهم مستواك ويبني لك خطة تعلم مخصصة — جربه دلوقتي"
            : "The AI Mentor understands your level and builds a custom learning plan — try it now"}
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="glass-card rounded-3xl overflow-hidden"
          style={{ border: "1px solid rgba(142,213,255,0.12)", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
        >
          {/* Chat header */}
          <div className="flex items-center gap-3 px-5 py-4" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(142,213,255,0.12)", border: "1px solid rgba(142,213,255,0.2)" }}>
              <Bot size={18} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "مرشد درهوس الذكي" : "Darhous AI Mentor"}
              </p>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-xs font-mono" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? "متصل الآن" : "Online now"}
                </p>
              </div>
            </div>
          </div>

          {/* Chat body */}
          <div className="p-5 flex flex-col gap-4 min-h-48">
            {/* User message */}
            <motion.div
              initial={{ opacity: 0, x: shouldReduce ? 0 : (isAr ? -20 : 20) }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: shouldReduce ? 0 : 0.3 }}
              className={`flex ${isAr ? "justify-start" : "justify-end"}`}
            >
              <div
                className="max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed"
                style={{
                  background: "rgba(208,188,255,0.12)",
                  border: "1px solid rgba(208,188,255,0.2)",
                  color: "var(--color-on-surface)",
                  borderRadius: isAr ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                }}
              >
                {isAr
                  ? "أنا مبتدئ وعايز أتعلم AI بس مش عارف أبدأ منين 😅"
                  : "I'm a beginner who wants to learn AI but I don't know where to start 😅"}
              </div>
            </motion.div>

            {/* Mentor response */}
            <motion.div
              initial={{ opacity: 0, x: shouldReduce ? 0 : (isAr ? 20 : -20) }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: shouldReduce ? 0 : 0.9 }}
              className={`flex items-start gap-3 ${isAr ? "flex-row-reverse" : ""}`}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                style={{ background: "rgba(142,213,255,0.12)", border: "1px solid rgba(142,213,255,0.15)" }}
              >
                <Bot size={15} style={{ color: "var(--color-primary)" }} />
              </div>
              <div
                className="max-w-sm px-4 py-3 rounded-2xl text-sm leading-relaxed"
                style={{
                  background: "rgba(142,213,255,0.07)",
                  border: "1px solid rgba(142,213,255,0.15)",
                  color: "var(--color-on-surface)",
                  borderRadius: isAr ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                  minHeight: "60px",
                }}
              >
                {effectiveMentorTyped || (
                  <span className="flex gap-1 items-center pt-1">
                    <span className="w-2 h-2 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                )}
                {!effectiveMentorDone && effectiveMentorTyped && <span className="animate-pulse">|</span>}
              </div>
            </motion.div>
          </div>

          {/* Input area */}
          <div className="px-5 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-3">
              <div
                className="flex-1 rounded-xl px-4 py-2.5 text-sm font-mono opacity-40"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--color-on-surface-variant)" }}
              >
                {isAr ? "اكتب سؤالك هنا…" : "Type your question here…"}
              </div>
              <Link
                href={`/${locale}/mentor`}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105"
                style={{ background: "rgba(142,213,255,0.12)", border: "1px solid rgba(142,213,255,0.2)", color: "var(--color-primary)" }}
              >
                <Send size={16} />
              </Link>
            </div>
            <p className="text-center text-xs font-mono mt-3 opacity-50" style={{ color: "var(--color-on-surface-variant)" }}>
              <Link href={`/${locale}/mentor`} style={{ color: "var(--color-primary)", textDecoration: "none" }}>
                {isAr ? "افتح المرشد الكامل ←" : "Open Full Mentor →"}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
