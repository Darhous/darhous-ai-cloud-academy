"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Bot, Globe } from "lucide-react";
import type { Portal } from "@/config/portals";

interface Props {
  locale: string;
  portals: Portal[];
}

export default function EcosystemMap({ locale, portals }: Props) {
  const isAr = locale === "ar";
  const shouldReduce = useReducedMotion();
  // Phase 10: Ecosystem Map 2.0 — hovering a portal "wakes up" the AI Mentor hub
  // with a synchronized glow in that portal's color, visually expressing the
  // hub-and-spoke connection. Purely decorative, no logic/route changes.
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
    <section id="ecosystem" className="container-xl">
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
        className="text-center mb-12"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono mb-5"
          style={{ background: "rgba(142,213,255,0.06)", borderColor: "rgba(142,213,255,0.2)", color: "var(--color-primary)" }}
        >
          <Globe size={12} />
          {isAr ? "منظومة درهوس الذكية" : "Darhous Smart Ecosystem"}
        </div>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "خريطة المنظومة التعليمية" : "Learning Ecosystem Map"}
        </h2>
        <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "مرشد AI في المركز، محاط بـ 6 بوابات تعليمية متخصصة مترابطة"
            : "AI Mentor at the center, surrounded by 6 specialized interconnected learning portals"}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Row 1: Portals 0–2 */}
        {portals.slice(0, 3).map((portal) => (
          <motion.div key={portal.id} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} {...hoverProps(portal.color)}>
            <Link
              href={`/${locale}${portal.href}`}
              className="glass-card rounded-2xl p-5 flex flex-col gap-3 h-full transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1 block"
              style={{ border: `1px solid ${portal.color}15`, textDecoration: "none" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{portal.icon}</span>
                {portal.status === "available" && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80" }}>
                    {isAr ? "متاح" : "Live"}
                  </span>
                )}
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? portal.titleAr : portal.titleEn}
                </p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? portal.descriptionAr : portal.descriptionEn}
                </p>
              </div>
              <div className="flex flex-wrap gap-1 mt-auto">
                {portal.features.slice(0, 2).map((f) => (
                  <span key={f} className="text-[10px] px-2 py-0.5 rounded-full font-mono" style={{ background: `${portal.color}12`, color: portal.color }}>
                    {f}
                  </span>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}

        {/* Row 2: Portal 3, AI Mentor center, Portal 4 */}
        {portals[3] && (
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} {...hoverProps(portals[3].color)}>
            <Link
              href={`/${locale}${portals[3].href}`}
              className="glass-card rounded-2xl p-5 flex flex-col gap-3 h-full transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1 block"
              style={{ border: `1px solid ${portals[3].color}15`, textDecoration: "none" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{portals[3].icon}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80" }}>
                  {isAr ? "متاح" : "Live"}
                </span>
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? portals[3].titleAr : portals[3].titleEn}
                </p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? portals[3].descriptionAr : portals[3].descriptionEn}
                </p>
              </div>
              <div className="flex flex-wrap gap-1 mt-auto">
                {portals[3].features.slice(0, 2).map((f) => (
                  <span key={f} className="text-[10px] px-2 py-0.5 rounded-full font-mono" style={{ background: `${portals[3].color}12`, color: portals[3].color }}>
                    {f}
                  </span>
                ))}
              </div>
            </Link>
          </motion.div>
        )}

        {/* AI Mentor — center card (Phase 10: glows in sync with hovered portal) */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Link
            href={`/${locale}/mentor`}
            className="relative overflow-hidden rounded-3xl p-6 flex flex-col items-center justify-center gap-4 text-center h-full transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 block"
            style={{
              background: linkColor
                ? `linear-gradient(135deg, ${linkColor}1f 0%, rgba(87,27,193,0.15) 50%, ${linkColor}14 100%)`
                : "linear-gradient(135deg, rgba(142,213,255,0.12) 0%, rgba(87,27,193,0.15) 50%, rgba(60,224,251,0.08) 100%)",
              border: `1px solid ${linkColor ? `${linkColor}40` : "rgba(142,213,255,0.25)"}`,
              boxShadow: linkColor
                ? `0 0 56px ${linkColor}33, inset 0 0 24px ${linkColor}1a`
                : "0 0 40px rgba(142,213,255,0.06), inset 0 0 20px rgba(142,213,255,0.03)",
              textDecoration: "none",
            }}
          >
            {/* Ambient radar pulse rings — always-on "hub" energy signature */}
            {!shouldReduce && (
              <>
                <span className="ecosystem-radar-ring" aria-hidden="true" />
                <span className="ecosystem-radar-ring" style={{ animationDelay: "1.5s" }} aria-hidden="true" />
              </>
            )}
            <div
              className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-300"
              style={{
                background: linkColor ? `${linkColor}1f` : "rgba(142,213,255,0.12)",
                border: `1px solid ${linkColor ? `${linkColor}33` : "rgba(142,213,255,0.2)"}`,
              }}
            >
              <Bot size={32} style={{ color: linkColor || "var(--color-primary)", transition: "color 300ms ease" }} />
            </div>
            <div className="relative z-10">
              <p className="text-xs font-mono mb-1 transition-colors duration-300" style={{ color: linkColor || "var(--color-primary)" }}>AI MENTOR</p>
              <h3 className="font-bold text-base" style={{ color: "var(--color-on-surface)" }}>
                {isAr ? "المرشد الذكي" : "Darhous AI Mentor"}
              </h3>
              <p className="text-xs mt-1" style={{ color: "var(--color-on-surface-variant)" }}>
                {isAr ? "يبني خطتك ويرشدك عبر كل البوابات" : "Builds your plan & guides you across all portals"}
              </p>
            </div>
            <div
              className="relative z-10 text-xs font-mono px-4 py-2 rounded-xl transition-colors duration-300"
              style={{
                background: linkColor ? `${linkColor}1a` : "rgba(142,213,255,0.1)",
                color: linkColor || "var(--color-primary)",
                border: `1px solid ${linkColor ? `${linkColor}33` : "rgba(142,213,255,0.2)"}`,
              }}
            >
              {isAr ? "← المركز → " : "Hub"}
            </div>
          </Link>
        </motion.div>

        {portals[4] && (
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} {...hoverProps(portals[4].color)}>
            <Link
              href={`/${locale}${portals[4].href}`}
              className="glass-card rounded-2xl p-5 flex flex-col gap-3 h-full transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1 block"
              style={{ border: `1px solid ${portals[4].color}15`, textDecoration: "none" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{portals[4].icon}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80" }}>
                  {isAr ? "متاح" : "Live"}
                </span>
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? portals[4].titleAr : portals[4].titleEn}
                </p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? portals[4].descriptionAr : portals[4].descriptionEn}
                </p>
              </div>
              <div className="flex flex-wrap gap-1 mt-auto">
                {portals[4].features.slice(0, 2).map((f) => (
                  <span key={f} className="text-[10px] px-2 py-0.5 rounded-full font-mono" style={{ background: `${portals[4].color}12`, color: portals[4].color }}>
                    {f}
                  </span>
                ))}
              </div>
            </Link>
          </motion.div>
        )}

        {/* Row 3: center-aligned last portal */}
        <div className="hidden sm:block" />
        {portals[5] && (
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} {...hoverProps(portals[5].color)}>
            <Link
              href={`/${locale}${portals[5].href}`}
              className="glass-card rounded-2xl p-5 flex flex-col gap-3 h-full transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1 block"
              style={{ border: `1px solid ${portals[5].color}15`, textDecoration: "none" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{portals[5].icon}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80" }}>
                  {isAr ? "متاح" : "Live"}
                </span>
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
                  {isAr ? portals[5].titleAr : portals[5].titleEn}
                </p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  {isAr ? portals[5].descriptionAr : portals[5].descriptionEn}
                </p>
              </div>
              <div className="flex flex-wrap gap-1 mt-auto">
                {portals[5].features.slice(0, 2).map((f) => (
                  <span key={f} className="text-[10px] px-2 py-0.5 rounded-full font-mono" style={{ background: `${portals[5].color}12`, color: portals[5].color }}>
                    {f}
                  </span>
                ))}
              </div>
            </Link>
          </motion.div>
        )}
        <div className="hidden sm:block" />
      </div>
    </section>
  );
}
