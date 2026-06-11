"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Send } from "lucide-react";

export default function MentorShowcaseConcept({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [displayedText, setDisplayedText] = useState("");
  const fullText = isAr 
    ? "ابدأ بمسار الذكاء الاصطناعي للمبتدئين (3 أسابيع)، ثم اختبر مستواك في اللغة، وبعدها جرّب أول مشروع تطبيقي في IoT أو الأتمتة. كل خطوة بنيتها على الخطوة اللي قبلها — وأنا معاك في كل مرحلة."
    : "Start with the AI for Beginners path (3 weeks), then test your language level, then try your first hands-on IoT or Automation project. Every step is built on the previous one — and I'm with you at every stage.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <section className="py-24 relative z-10 w-full px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="text-center mb-12">
          <span className="text-blue-400 text-sm tracking-widest uppercase mb-2 block">{isAr ? "المرشد الذكي" : "AI Mentor"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{isAr ? "شوف المرشد بيشتغل" : "See the Mentor in Action"}</h2>
          <p className="text-white/50">{isAr ? "المرشد الذكي يفهم مستواك ويبني لك خطة تعلم مخصصة لحظة بلحظة" : "The AI Mentor understands your level and builds a custom learning plan, moment by moment"}</p>
        </div>

        <div className="w-full max-w-3xl rounded-[2rem] bg-black/40 border border-white/10 p-2 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {/* Ambient glow inside chat */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />

          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10 bg-white/5 rounded-t-[1.5rem]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Bot className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-sm font-semibold">{isAr ? "مرشد NexaLearn الذكي" : "NexaLearn AI Mentor"}</div>
                <div className="text-xs text-green-400">{isAr ? "متصل ومستعد" : "Online and ready"}</div>
              </div>
            </div>
          </div>

          {/* Chat Body */}
          <div className="p-6 md:p-8 flex flex-col gap-6 min-h-[300px]">
            {/* User message */}
            <motion.div 
              initial={{ opacity: 0, x: isAr ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="self-end max-w-[80%] bg-purple-500/10 border border-purple-500/20 text-white p-4 rounded-2xl rounded-tr-none"
            >
              {isAr ? "أنا مبتدئ وعايز أتعلم الذكاء الاصطناعي بس مش عارف أبدأ منين، ممكن تساعدني؟" : "I'm a beginner who wants to learn AI but I don't know where to start, can you help?"}
            </motion.div>

            {/* Mentor message */}
            <motion.div 
              initial={{ opacity: 0, x: isAr ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="self-start max-w-[85%] bg-blue-500/10 border border-blue-500/20 text-white p-4 rounded-2xl rounded-tl-none leading-relaxed flex items-start gap-3"
            >
              <Bot className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                {displayedText}
                <span className="inline-block w-2 h-4 bg-blue-400 ml-1 animate-pulse" />
              </div>
            </motion.div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-black/60 rounded-b-[1.5rem] flex gap-2">
            <input 
              type="text" 
              disabled 
              placeholder={isAr ? "اكتب سؤالك للمرشد هنا…" : "Type your question here…"} 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-white/50 cursor-not-allowed"
            />
            <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        <a href={`/${locale}/mentor`} className="mt-8 text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center gap-2">
          {isAr ? "افتح المرشد الكامل ←" : "Open Full Mentor →"}
        </a>
      </div>
    </section>
  );
}
