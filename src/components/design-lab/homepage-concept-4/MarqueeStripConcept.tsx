"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Portal } from "@/config/portals";

export default function MarqueeStripConcept({ locale, portals }: { locale: string, portals: Portal[] }) {
  const isAr = locale === "ar";
  
  const tech = isAr 
    ? ["كلود AI", "نكست.جي إس", "رياكت", "سوبابيس", "تيلويند", "فيرسيل", "تايب سكريبت", "فريمر موشن", "بايثون", "أتمتة", "إنترنت الأشياء", "كلاود"]
    : ["Claude AI", "Next.js 16", "React 19", "Supabase", "Tailwind CSS", "Vercel", "TypeScript", "Framer Motion", "Python", "Automation", "IoT", "Cloud Computing"];

  const portalNames = portals.map(p => isAr ? p.titleEn : p.titleAr); // Opposite locale

  return (
    <div className="w-full py-10 overflow-hidden bg-black/40 border-y border-white/5 backdrop-blur-sm relative z-10">
      <div className="flex gap-4 overflow-hidden whitespace-nowrap mb-6">
        <motion.div 
          className="flex gap-12 items-center"
          animate={{ x: isAr ? ["0%", "50%"] : ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {[...tech, ...tech, ...tech].map((t, i) => (
            <span key={i} className="text-white/30 font-mono text-sm tracking-wider uppercase">{t}</span>
          ))}
        </motion.div>
      </div>
      <div className="flex gap-4 overflow-hidden whitespace-nowrap">
        <motion.div 
          className="flex gap-16 items-center"
          animate={{ x: isAr ? ["-50%", "0%"] : ["-50%", "0%"] }}
          transition={{ duration: 50, ease: "linear", repeat: Infinity }}
        >
          {[...portalNames, ...portalNames, ...portalNames].map((t, i) => (
            <span key={i} className="text-blue-300/40 font-display text-lg tracking-wide">{t}</span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
