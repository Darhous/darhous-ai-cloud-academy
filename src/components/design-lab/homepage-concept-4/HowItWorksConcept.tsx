"use client";

import React from "react";
import { motion } from "framer-motion";

const stepsAr = [
  { title: "اختر هدفك", desc: "حدد مستواك واهتمامك والوقت المتاح لك يوميًا — بيبنيلك المرشد خطة بناءً عليها." },
  { title: "المرشد يبني لك خطة", desc: "الذكاء الاصطناعي يصمم مسارًا أسبوعيًا مخصصًا بالكامل لك ولظروفك." },
  { title: "اتعلم وطبّق", desc: "ادخل البوابات، اتعلم المحتوى، واعمل مشاريع حقيقية خطوة بخطوة." },
  { title: "احصل على شهادة وطوّر مسارك", desc: "شهادات معتمدة وتوصيات ذكية للخطوة القادمة بناءً على أداءك." }
];

const stepsEn = [
  { title: "Choose Your Goal", desc: "Set your level, interest, and daily time — the mentor builds on top of that." },
  { title: "Mentor Builds Your Plan", desc: "AI designs a fully custom weekly roadmap tailored to your situation." },
  { title: "Learn & Apply", desc: "Enter the portals, absorb content, and build real projects step by step." },
  { title: "Get Certified & Level Up", desc: "Verified certificates and smart next-step recommendations based on your performance." }
];

export default function HowItWorksConcept({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const steps = isAr ? stepsAr : stepsEn;

  return (
    <section className="py-24 relative z-10 w-full px-6 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{isAr ? "رحلتك في 4 خطوات" : "Your Journey in 4 Steps"}</h2>
        <p className="text-white/50">{isAr ? "من الصفر إلى الاحتراف — خطوة بخطوة مع مرشدك الذكي الذي يرافقك في كل مرحلة" : "From zero to mastery — step by step with your AI mentor guiding you at every stage"}</p>
      </div>

      <div className="relative border-l-2 border-white/10 ml-4 md:ml-8 pl-8 md:pl-12 py-4">
        <motion.div 
          className="absolute top-0 left-[-2px] w-[2px] h-full bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          viewport={{ once: true, margin: "-100px" }}
        />

        {steps.map((step, i) => (
          <motion.div 
            key={i}
            className="mb-12 relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="absolute -left-[45px] md:-left-[61px] top-1 w-6 h-6 rounded-full bg-black border-2 border-blue-500 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
            </div>
            <div className="text-blue-400 font-mono text-sm tracking-widest mb-1">STEP 0{i + 1}</div>
            <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
            <p className="text-white/60 leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
