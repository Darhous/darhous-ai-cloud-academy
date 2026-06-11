"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const featuresAr = [
  { title: "منصة عربية ذكية", desc: "محتوى متخصص باللغة العربية لتلبية احتياجات المتعلم العربي" },
  { title: "حساب واحد للجميع", desc: "سجّل مرة واحدة واستخدم كل البوابات بنفس الحساب" },
  { title: "تعليم قائم على المشاريع", desc: "تطبيق عملي حقيقي وليس مجرد محاضرات نظرية" },
  { title: "اختبارات وتقارير فورية", desc: "نتائج لحظية وتقارير تفصيلية لكل اختبار" },
  { title: "ربط التعليم بالتوظيف", desc: "مسار متكامل من التعلم حتى الحصول على الوظيفة" },
  { title: "مرشد AI شخصي", desc: "المرشد يفهم مستواك ويبني لك الخطة المناسبة" },
  { title: "لوحة تحكم موحدة", desc: "تتبع كل تقدمك وشهاداتك من مكان واحد" },
  { title: "تجربة عصرية واحترافية", desc: "تصميم premium وتجربة مستخدم مدروسة بعناية" }
];

const featuresEn = [
  { title: "Arabic-First Platform", desc: "Specialized Arabic content tailored for Arab learners" },
  { title: "One Account for All", desc: "Register once and access all portals with a single account" },
  { title: "Project-Based Learning", desc: "Real hands-on application, not just theory lectures" },
  { title: "Instant Tests & Reports", desc: "Real-time results and detailed reports for every exam" },
  { title: "Education Meets Career", desc: "A complete path from learning to landing a job" },
  { title: "Personal AI Mentor", desc: "The mentor understands your level and builds your plan" },
  { title: "Unified Dashboard", desc: "Track all your progress and certificates in one place" },
  { title: "Premium UX", desc: "Modern design and carefully crafted user experience" }
];

export default function WhyDarhousConcept({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const features = isAr ? featuresAr : featuresEn;

  return (
    <section className="py-24 relative z-10 w-full px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-blue-400 text-sm tracking-widest uppercase mb-2 block">{isAr ? "مميزات المنصة" : "Platform Features"}</span>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{isAr ? "لماذا تختار NexaLearn؟" : "Why Choose NexaLearn?"}</h2>
        <p className="text-white/50">{isAr ? "ما يميّزنا عن كل منصة تعليمية أخرى في الشرق الأوسط" : "What sets us apart from every other educational platform in the Middle East"}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] border border-white/10 hover:border-blue-500/50 rounded-2xl p-6 hover:-translate-y-1 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
              <CheckCircle className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold mb-2">{feat.title}</h3>
            <p className="text-sm text-white/50 leading-relaxed">{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
