"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Bot, Globe, ChevronRight } from "lucide-react";
import type { Portal } from "@/config/portals";
import InteractiveSurface from "@/components/ui/InteractiveSurface";

interface Props {
  locale: string;
  portals: Portal[];
}

export default function EcosystemMap({ locale, portals }: Props) {
  const isAr = locale === "ar";
  const shouldReduce = useReducedMotion();
  const [linkColor, setLinkColor] = useState<string | null>(null);

  const hoverProps = (color: string) =>
    shouldReduce
      ? {}
      : {
          onMouseEnter: () => setLinkColor(color),
          onMouseLeave: () => setLinkColor(null),
          onFocus: () => setLinkColor(color),
          onBlur: () => setLinkColor(null),
        };

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 28 },
    show:   { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.15 : 0.6, ease: [0.0, 0.0, 0.2, 1] as const } },
  };

  return (
    <section id="ecosystem" className="container-xl relative">
      {/* Background radial glow to sell the "Ecosystem" feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20"
           style={{ background: "radial-gradient(circle, var(--color-primary) 0%, transparent 60%)", filter: "blur(80px)" }} />

      <motion.div
        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
        className="text-center mb-14 relative z-10"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono mb-5"
          style={{ background: "rgba(142,213,255,0.06)", borderColor: "rgba(142,213,255,0.2)", color: "var(--color-primary)" }}
        >
          <Globe size={12} />
          {isAr ? "منظومة درهوس الذكية" : "Darhous Smart Ecosystem"}
        </div>
        <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-gradient-premium">
          {isAr ? "خريطة المنظومة التعليمية" : "Learning Ecosystem Map"}
        </h2>
        <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "مرشد AI في المركز، محاط بـ 6 بوابات تعليمية متخصصة مترابطة لبناء رحلتك"
            : "AI Mentor at the center, surrounded by 6 specialized interconnected learning portals to build your journey"}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
        {/* Row 1: Portals 0–2 */}
        {portals.slice(0, 3).map((portal) => (
          <motion.div key={portal.id} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} {...hoverProps(portal.color)} className="h-full">
            <InteractiveSurface className="h-full rounded-2xl" tiltMax={2} spotlightColor={`${portal.color}15`} activeTransform="translateY(-8px)">
              <Link
                href={`/${locale}${portal.href}`}
                className="glass-panel-promax rounded-2xl p-6 flex flex-col gap-4 h-full group block"
                style={{ border: `1px solid ${portal.color}25`, textDecoration: "none" }}
              >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110" style={{ background: `${portal.color}15`, color: portal.color }}>
                  {portal.icon}
                </div>
                {portal.status === "available" && (
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full" style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)" }}>
                    {isAr ? "متاح" : "Live"}
                  </span>
                )}
              </div>
              <div>
                <p className="font-bold text-lg leading-tight mb-2" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? portal.titleAr : portal.titleEn}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? portal.descriptionAr : portal.descriptionEn}
                </p>
              </div>
            </Link>
            </InteractiveSurface>
          </motion.div>
        ))}

        {/* Row 2: Portal 3, AI Mentor center, Portal 4 */}
        {portals[3] && (
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} {...hoverProps(portals[3].color)} className="h-full">
            <InteractiveSurface className="h-full rounded-2xl" tiltMax={2} spotlightColor={`${portals[3].color}15`} activeTransform="translateY(-8px)">
            <Link
              href={`/${locale}${portals[3].href}`}
              className="glass-panel-promax rounded-2xl p-6 flex flex-col gap-4 h-full group block"
              style={{ border: `1px solid ${portals[3].color}25`, textDecoration: "none" }}
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110" style={{ background: `${portals[3].color}15`, color: portals[3].color }}>
                  {portals[3].icon}
                </div>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full" style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)" }}>
                  {isAr ? "متاح" : "Live"}
                </span>
              </div>
              <div>
                <p className="font-bold text-lg leading-tight mb-2" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? portals[3].titleAr : portals[3].titleEn}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? portals[3].descriptionAr : portals[3].descriptionEn}
                </p>
              </div>
            </Link>
            </InteractiveSurface>
          </motion.div>
        )}

        {/* AI Mentor — center card */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="h-full">
          <InteractiveSurface className="h-full rounded-[2rem]" tiltMax={2} activeTransform="scale(1.02)">
          <Link
            href={`/${locale}/mentor`}
            className="relative overflow-hidden rounded-[2rem] p-8 flex flex-col items-center justify-center gap-5 text-center h-full block"
            style={{
              background: linkColor
                ? `linear-gradient(135deg, ${linkColor}1f 0%, rgba(87,27,193,0.15) 50%, ${linkColor}14 100%)`
                : "linear-gradient(135deg, rgba(142,213,255,0.12) 0%, rgba(87,27,193,0.15) 50%, rgba(60,224,251,0.08) 100%)",
              border: `1px solid ${linkColor ? `${linkColor}40` : "rgba(142,213,255,0.3)"}`,
              boxShadow: linkColor
                ? `0 0 60px ${linkColor}33, inset 0 0 30px ${linkColor}1a`
                : "0 0 50px rgba(142,213,255,0.1), inset 0 0 20px rgba(142,213,255,0.05)",
              textDecoration: "none",
              transition: "background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease",
            }}
          >
            {/* Ambient radar pulse rings */}
            {!shouldReduce && (
              <>
                <span className="ecosystem-radar-ring" aria-hidden="true" />
                <span className="ecosystem-radar-ring" style={{ animationDelay: "1.5s" }} aria-hidden="true" />
              </>
            )}
            <div
              className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center transition-colors duration-500"
              style={{
                background: linkColor ? `${linkColor}1f` : "rgba(142,213,255,0.12)",
                border: `1px solid ${linkColor ? `${linkColor}33` : "rgba(142,213,255,0.3)"}`,
                boxShadow: linkColor ? `0 0 30px ${linkColor}40` : "0 0 20px rgba(142,213,255,0.2)",
              }}
            >
              <Bot size={40} style={{ color: linkColor || "var(--color-primary)", transition: "color 500ms ease" }} />
            </div>
            <div className="relative z-10">
              <p className="text-xs font-mono mb-2 tracking-widest transition-colors duration-500" style={{ color: linkColor || "var(--color-primary)" }}>AI MENTOR</p>
              <h3 className="font-bold text-xl mb-1" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "المرشد الذكي" : "Darhous AI Mentor"}
              </h3>
              <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? "العقل المدبر لرحلتك التعليمية" : "The mastermind of your learning journey"}
              </p>
            </div>
            <div
              className="relative z-10 text-xs font-mono px-5 py-2.5 rounded-xl transition-colors duration-500 flex items-center gap-2"
              style={{
                background: linkColor ? `${linkColor}1a` : "rgba(142,213,255,0.1)",
                color: linkColor || "var(--color-primary)",
                border: `1px solid ${linkColor ? `${linkColor}33` : "rgba(142,213,255,0.2)"}`,
              }}
            >
              {isAr ? "المركز الرئيسي" : "Central Hub"} <ChevronRight size={14} />
            </div>
          </Link>
          </InteractiveSurface>
        </motion.div>

        {portals[4] && (
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} {...hoverProps(portals[4].color)} className="h-full">
            <InteractiveSurface className="h-full rounded-2xl" tiltMax={2} spotlightColor={`${portals[4].color}15`} activeTransform="translateY(-8px)">
            <Link
              href={`/${locale}${portals[4].href}`}
              className="glass-panel-promax rounded-2xl p-6 flex flex-col gap-4 h-full group block"
              style={{ border: `1px solid ${portals[4].color}25`, textDecoration: "none" }}
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110" style={{ background: `${portals[4].color}15`, color: portals[4].color }}>
                  {portals[4].icon}
                </div>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full" style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)" }}>
                  {isAr ? "متاح" : "Live"}
                </span>
              </div>
              <div>
                <p className="font-bold text-lg leading-tight mb-2" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? portals[4].titleAr : portals[4].titleEn}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? portals[4].descriptionAr : portals[4].descriptionEn}
                </p>
              </div>
            </Link>
            </InteractiveSurface>
          </motion.div>
        )}

        {/* Row 3: center-aligned last portal */}
        <div className="hidden sm:block" />
        {portals[5] && (
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} {...hoverProps(portals[5].color)} className="h-full">
            <InteractiveSurface className="h-full rounded-2xl" tiltMax={2} spotlightColor={`${portals[5].color}15`} activeTransform="translateY(-8px)">
            <Link
              href={`/${locale}${portals[5].href}`}
              className="glass-panel-promax rounded-2xl p-6 flex flex-col gap-4 h-full group block"
              style={{ border: `1px solid ${portals[5].color}25`, textDecoration: "none" }}
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110" style={{ background: `${portals[5].color}15`, color: portals[5].color }}>
                  {portals[5].icon}
                </div>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full" style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)" }}>
                  {isAr ? "متاح" : "Live"}
                </span>
              </div>
              <div>
                <p className="font-bold text-lg leading-tight mb-2" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? portals[5].titleAr : portals[5].titleEn}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? portals[5].descriptionAr : portals[5].descriptionEn}
                </p>
              </div>
            </Link>
            </InteractiveSurface>
          </motion.div>
        )}
        <div className="hidden sm:block" />
      </div>
    </section>
  );
}
