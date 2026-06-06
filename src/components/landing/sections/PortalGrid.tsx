"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Globe } from "lucide-react";
import { portals } from "@/config/portals";
import PortalCard from "@/components/ecosystem/PortalCard";

export default function PortalGrid({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const shouldReduce = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 28 },
    show:   { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.15 : 0.6, ease: [0.0, 0.0, 0.2, 1] as const } },
  };

  const gridContainer = {
    hidden: {},
    show: { transition: { staggerChildren: shouldReduce ? 0 : 0.06 } },
  };

  const gridItem = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
    show:   { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.15 : 0.4, ease: [0.0, 0.0, 0.2, 1] as const } },
  };

  return (
    <section id="portals" className="container-xl">
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
        className="text-center mb-12"
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono mb-4"
          style={{ background: "rgba(208,188,255,0.06)", borderColor: "rgba(208,188,255,0.2)", color: "var(--color-secondary)" }}
        >
          <Globe size={11} />
          {isAr ? "بوابات المنصة" : "Platform Portals"}
        </div>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: "var(--color-on-surface)" }}>
          {isAr ? "بوابات درهوس الذكية" : "Darhous Smart Portals"}
        </h2>
        <p className="text-base" style={{ color: "var(--color-on-surface-variant)", maxWidth: "560px", margin: "0 auto" }}>
          {isAr
            ? "منظومة متكاملة مصممة لتلبية كل احتياجاتك التعليمية والمهنية عبر بوابات متخصصة"
            : "An integrated ecosystem designed to cover all your learning and career needs through specialized portals"}
        </p>
      </motion.div>
      {/* Staggered portal card grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        variants={gridContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {portals.map((portal) => (
          <motion.div key={portal.id} variants={gridItem}>
            <PortalCard portal={portal} locale={locale} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
