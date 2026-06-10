"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue, useReducedMotion } from "framer-motion";
import { Globe } from "lucide-react";
import { portals, Portal } from "@/config/portals";
import PortalCard from "@/components/ecosystem/PortalCard";

interface StackedCardProps {
  portal: Portal;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  locale: string;
}

function StackedCard({ portal, index, total, scrollYProgress, locale }: StackedCardProps) {
  const start = index / total;
  const end = (index + 1) / total;

  const scale = useTransform(scrollYProgress, [start, end], [1, 0.90]);
  const opacity = useTransform(scrollYProgress, [start, end], [1, 0.55]);

  const isLast = index === total - 1;

  return (
    <motion.div
      style={{
        position: "sticky",
        top: 96 + index * 16,
        scale: isLast ? 1 : scale,
        opacity: isLast ? 1 : opacity,
        transformOrigin: "top center",
        zIndex: index,
        marginBottom: isLast ? 0 : "12vh",
      }}
      className="w-full max-w-4xl mx-auto"
    >
      <PortalCard portal={portal} locale={locale} size="large" />
    </motion.div>
  );
}

export default function ScrollStackSection({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const shouldReduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.15 : 0.6, ease: [0.0, 0.0, 0.2, 1] as const } },
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  return (
    <section id="portals" className="container-xl">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="text-center mb-14"
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono mb-4"
          style={{ background: "rgba(208,188,255,0.06)", borderColor: "rgba(208,188,255,0.2)", color: "var(--color-secondary)" }}
        >
          <Globe size={11} />
          {isAr ? "بوابات المنصة" : "Platform Portals"}
        </div>
        <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-gradient-premium">
          {isAr ? "بوابات درهوس الذكية" : "Darhous Smart Portals"}
        </h2>
        <p className="text-base md:text-lg" style={{ color: "var(--color-on-surface-variant)", maxWidth: "560px", margin: "0 auto" }}>
          {isAr
            ? "منظومة متكاملة مصممة لتلبية كل احتياجاتك التعليمية والمهنية عبر بوابات متخصصة"
            : "An integrated ecosystem designed to cover all your learning and career needs through specialized portals"}
        </p>
      </motion.div>

      {shouldReduce === true ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {portals.map((portal) => (
            <div key={portal.id}>
              <PortalCard portal={portal} locale={locale} />
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Mobile Fallback Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:hidden">
            {portals.map((portal) => (
              <div key={portal.id}>
                <PortalCard portal={portal} locale={locale} />
              </div>
            ))}
          </div>

          {/* Desktop Scroll Stack */}
          <div
            ref={containerRef}
            className="hidden md:block relative w-full pb-[10vh]"
          >
            {portals.map((portal, index) => (
              <StackedCard
                key={portal.id}
                portal={portal}
                index={index}
                total={portals.length}
                scrollYProgress={scrollYProgress}
                locale={locale}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
