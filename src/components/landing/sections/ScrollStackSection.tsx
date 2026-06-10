"use client";

import { useRef } from "react";
import {
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Globe } from "lucide-react";
import { Portal, portals } from "@/config/portals";
import PortalCard from "@/components/ecosystem/PortalCard";

interface StackedCardProps {
  portal: Portal;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  locale: string;
}

function StackedCard({ portal, index, total, scrollYProgress, locale }: StackedCardProps) {
  const isLast = index === total - 1;
  const intervalCount = total - 1;
  const recedeStart = (index + 0.35) / intervalCount;
  const recedeEnd = (index + 1) / intervalCount;
  const scale = useTransform(
    scrollYProgress,
    [recedeStart, recedeEnd, 1],
    [1, 0.82, 0.82],
  );
  const opacity = useTransform(
    scrollYProgress,
    [recedeStart, recedeEnd, 1],
    [1, 0.35, 0.35],
  );
  const overlayOpacity = useTransform(
    scrollYProgress,
    [recedeStart, recedeEnd, 1],
    [0, 0.5, 0.5],
  );

  return (
    <motion.div
      style={{
        position: "sticky",
        top: 90 + index * 28,
        scale: isLast ? 1 : scale,
        opacity: isLast ? 1 : opacity,
        transformOrigin: "top center",
        zIndex: index + 1,
        marginBlockStart: index === 0 ? 0 : "calc(-22rem + 15vh)",
      }}
      className="relative mx-auto min-h-[22rem] w-full max-w-3xl overflow-hidden rounded-2xl shadow-[0_28px_80px_rgba(0,0,0,0.48)]"
    >
      <PortalCard portal={portal} locale={locale} size="large" />
      {!isLast && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </motion.div>
  );
}

export default function ScrollStackSection({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const shouldReduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduce ? 0.15 : 0.6,
        ease: [0.0, 0.0, 0.2, 1] as const,
      },
    },
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const progressLabel = useTransform(scrollYProgress, (latest) => {
    const current = Math.min(portals.length, Math.floor(latest * portals.length) + 1);
    return `${String(current).padStart(2, "0")} / ${String(portals.length).padStart(2, "0")}`;
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
          style={{
            background: "rgba(208,188,255,0.06)",
            borderColor: "rgba(208,188,255,0.2)",
            color: "var(--color-secondary)",
          }}
        >
          <Globe size={11} />
          {isAr ? "بوابات المنصة" : "Platform Portals"}
        </div>
        <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-gradient-premium">
          {isAr ? "بوابات درهوس الذكية" : "Darhous Smart Portals"}
        </h2>
        <p
          className="text-base md:text-lg"
          style={{
            color: "var(--color-on-surface-variant)",
            maxWidth: "560px",
            margin: "0 auto",
          }}
        >
          {isAr
            ? "منظومة متكاملة مصممة لتلبية كل احتياجاتك التعليمية والمهنية عبر بوابات متخصصة"
            : "An integrated ecosystem designed to cover all your learning and career needs through specialized portals"}
        </p>
      </motion.div>

      {shouldReduce === true ? (
        <div className="mx-auto w-full max-w-3xl pb-8 pt-4">
          {portals.map((portal, index) => (
            <div
              key={portal.id}
              className={`relative w-full ${index === 0 ? "" : "-mt-4 md:-mt-8"}`}
              style={{
                zIndex: index + 1,
                filter: "drop-shadow(0 24px 32px rgba(0,0,0,0.28))",
              }}
            >
              <PortalCard portal={portal} locale={locale} size="large" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="flex w-full flex-col gap-8 md:hidden">
            {portals.map((portal) => (
              <div key={portal.id} className="w-full">
                <PortalCard portal={portal} locale={locale} size="large" />
              </div>
            ))}
          </div>

          <div
            ref={containerRef}
            className="relative hidden min-h-[175vh] w-full pb-[18vh] md:block"
          >
            <div className="pointer-events-none sticky top-24 z-50 flex h-0 w-full">
              <div
                className="ms-auto rounded-full border px-3 py-1.5 font-mono text-xs backdrop-blur-xl"
                style={{
                  background: "rgba(12,14,18,0.72)",
                  borderColor: "rgba(208,188,255,0.24)",
                  color: "var(--color-secondary)",
                }}
              >
                <motion.span>{progressLabel}</motion.span>
              </div>
            </div>

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
