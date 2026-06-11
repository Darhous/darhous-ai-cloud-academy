"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle, ChevronDown } from "lucide-react";

export default function CommunitySignupConcept({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-24 relative z-10 w-full px-6 max-w-4xl mx-auto mb-20">
      <div className="bg-white/[0.03] border border-blue-500/20 rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">{isAr ? "مجتمع NexaLearn للذكاء الاصطناعي" : "NexaLearn AI Community"}</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {isAr 
              ? "انضم ليصلك أسبوعيًا أفضل أدوات الذكاء الاصطناعي، برومبتات Claude، تريندات Gemini Nano Banana، مشاريع عملية، ومسارات تعلم وتحديثات المنصة." 
              : "Join to receive weekly AI tools, Claude prompts, Gemini Nano Banana trends, practical projects, learning paths, and platform updates."}
          </p>
        </div>

        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-500/20 border border-green-500/50 rounded-2xl p-8 text-center"
          >
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">{isAr ? "تم تسجيلك بنجاح في مجتمع NexaLearn." : "You have joined the NexaLearn AI Community successfully."}</h3>
            <p className="text-white/70">{isAr ? "راقب بريدك للتحديثات القادمة." : "Watch your inbox for future updates."}</p>
          </motion.div>
        ) : (
          <form 
            className="flex flex-col gap-4 max-w-xl mx-auto"
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          >
            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input 
                  type="email" 
                  required 
                  placeholder={isAr ? "البريد الإلكتروني *" : "Email Address *"}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <select className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white/70 appearance-none focus:outline-none focus:border-blue-500 transition-colors">
                  <option value="">{isAr ? "مستواك" : "Your Level"}</option>
                  <option value="beginner">{isAr ? "مبتدئ" : "Beginner"}</option>
                  <option value="intermediate">{isAr ? "متوسط" : "Intermediate"}</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              </div>
              <div className="relative">
                <select className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white/70 appearance-none focus:outline-none focus:border-blue-500 transition-colors">
                  <option value="">{isAr ? "اهتمامك الرئيسي" : "Main Interest"}</option>
                  <option value="ai">AI Tools</option>
                  <option value="prompt">Prompt Engineering</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              </div>
            </div>
            <button type="submit" className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors shadow-[0_0_20px_rgba(37,99,235,0.3)] mt-2">
              {isAr ? "انضم الآن" : "Join Now"}
            </button>
            <p className="text-center text-xs text-white/40 mt-4">
              {isAr ? "لن نرسل رسائل مزعجة. نستخدم بريدك فقط لتحديثات المنصة والمحتوى التعليمي." : "No spam. Your email is used only for platform updates and educational content."}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
