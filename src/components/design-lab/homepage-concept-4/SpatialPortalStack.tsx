"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Portal } from "@/config/portals";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SpatialPortalStack({ locale, portals }: { locale: string, portals: Portal[] }) {
  const isAr = locale === "ar";
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative z-10 w-full" style={{ height: `${portals.length * 100 + 100}vh` }}>
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent">
        
        <div className="absolute top-20 text-center z-50">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {isAr ? "بوابات NexaLearn الذكية" : "NexaLearn Smart Portals"}
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            {isAr ? "منظومة متكاملة مصممة لتلبية كل احتياجاتك التعليمية والمهنية عبر بوابات متخصصة" : "An integrated ecosystem designed to cover all your learning and career needs through specialized portals"}
          </p>
        </div>

        <div className="relative w-full max-w-5xl h-[60vh] mt-20 perspective-[2000px] flex items-center justify-center">
          {portals.map((portal, i) => {
            const startRange = i / portals.length;
            const centerRange = (i + 0.5) / portals.length;
            const endRange = (i + 1) / portals.length;

            const zTransform = useTransform(scrollYProgress, [startRange, centerRange, endRange], [-1000, 0, 1000]);
            const opacityTransform = useTransform(scrollYProgress, [startRange, centerRange, endRange], [0, 1, 0]);
            const rotateXTransform = useTransform(scrollYProgress, [startRange, centerRange, endRange], [20, 0, -20]);

            return (
              <motion.div
                key={portal.id}
                className="absolute w-full h-full p-8 md:p-12 rounded-[2.5rem] flex flex-col justify-between border border-white/10 backdrop-blur-2xl overflow-hidden shadow-2xl"
                style={{
                  background: `linear-gradient(to bottom right, rgba(10,10,15,0.9), rgba(5,5,10,0.9)), ${portal.gradient}`,
                  z: zTransform,
                  opacity: opacityTransform,
                  rotateX: rotateXTransform,
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Background ambient glow inside card */}
                <div 
                  className="absolute inset-0 opacity-20 blur-3xl pointer-events-none"
                  style={{ background: portal.color }}
                />

                <div className="relative z-10 flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl border border-white/10">
                      {portal.icon}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold">{isAr ? portal.titleAr : portal.titleEn}</h3>
                      {(portal.badgeAr || portal.badgeEn) && (
                        <span className="inline-block mt-2 px-3 py-1 rounded-full bg-white/10 text-xs font-medium">
                          {isAr ? portal.badgeAr : portal.badgeEn}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-8xl font-black text-white/5 pointer-events-none">
                    {(i + 1).toString().padStart(2, "0")}
                  </div>
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 mt-auto">
                  <div>
                    <p className="text-lg text-white/70 mb-6 leading-relaxed">
                      {isAr ? portal.descriptionAr : portal.descriptionEn}
                    </p>
                    <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors">
                      {isAr ? portal.ctaAr : portal.ctaEn}
                      {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 content-end">
                    {((isAr ? portal.features : portal.featuresEn) || portal.features).map((feat, idx) => (
                      <span key={idx} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white/80">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
