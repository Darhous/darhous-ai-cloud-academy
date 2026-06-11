"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import type { Portal } from "@/config/portals";
import { Bot, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EcosystemOrbitalMap({ locale, portals }: { locale: string, portals: Portal[] }) {
  const isAr = locale === "ar";
  const livePortals = portals.filter(p => p.status === "available").slice(0, 6);
  const [hoveredPortal, setHoveredPortal] = useState<string | null>(null);

  return (
    <section className="py-32 relative z-10 w-full px-6 overflow-hidden min-h-screen flex flex-col items-center">
      <div className="text-center mb-16 max-w-2xl relative z-20">
        <span className="text-purple-400 text-sm tracking-widest uppercase mb-2 block">{isAr ? "منظومة NexaLearn الذكية" : "NexaLearn Smart Ecosystem"}</span>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{isAr ? "خريطة المنظومة التعليمية" : "Learning Ecosystem Map"}</h2>
        <p className="text-white/50">{isAr ? "مرشد AI في المركز، محاط بـ 6 بوابات تعليمية متخصصة مترابطة لبناء رحلتك" : "AI Mentor at the center, surrounded by 6 specialized interconnected learning portals to build your journey"}</p>
      </div>

      <div className="relative w-full max-w-[800px] aspect-square flex items-center justify-center">
        {/* Orbital rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            className="w-[60%] h-[60%] rounded-full border border-white/5"
            animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute w-[90%] h-[90%] rounded-full border border-white/5 border-dashed"
            animate={{ rotate: -360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Central Hub: AI Mentor */}
        <div className="relative z-20 flex flex-col items-center justify-center w-48 h-48 rounded-full bg-black border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all duration-500"
          style={{
            boxShadow: hoveredPortal 
              ? `0 0 80px ${livePortals.find(p => p.id === hoveredPortal)?.color}40` 
              : "0 0 50px rgba(255,255,255,0.1)"
          }}
        >
          {/* Radar Pulse Rings */}
          <div className="absolute inset-0 rounded-full border border-blue-500/30 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-[-20%] rounded-full border border-purple-500/20 animate-ping opacity-10" style={{ animationDuration: '4s', animationDelay: '1s' }} />
          
          <Bot className="w-12 h-12 mb-2 text-white/90" />
          <span className="font-bold text-center leading-tight">
            {isAr ? "المرشد الذكي" : "NexaLearn AI Mentor"}
          </span>
          <span className="text-[10px] text-white/50 uppercase tracking-widest mt-1">
            {isAr ? "المركز الرئيسي" : "Central Hub"}
          </span>
        </div>

        {/* Orbiting Portals */}
        {livePortals.map((portal, i) => {
          const angle = (i * (360 / livePortals.length)) * (Math.PI / 180);
          const radius = 320; // Distance from center
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={portal.id}
              className="absolute w-64 p-4 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-xl cursor-pointer hover:scale-105 transition-transform origin-center"
              style={{ x, y }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, type: "spring" }}
              onMouseEnter={() => setHoveredPortal(portal.id)}
              onMouseLeave={() => setHoveredPortal(null)}
            >
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full text-[10px]">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                {isAr ? "متاح" : "Live"}
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl mb-3" style={{ color: portal.color }}>
                {portal.icon}
              </div>
              <h3 className="font-bold text-sm mb-1">{isAr ? portal.titleAr : portal.titleEn}</h3>
              <p className="text-xs text-white/50 line-clamp-2">{isAr ? portal.descriptionAr : portal.descriptionEn}</p>
              
              {/* Connection line to center (SVG hack via absolute positioned div) */}
              {hoveredPortal === portal.id && (
                <motion.div 
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{ boxShadow: `0 0 30px ${portal.color}30` }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
