"use client";

import { useRef } from "react";
import {
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Globe } from "lucide-react";
import { portals, Portal } from "@/config/portals";

const STACK_PORTALS = portals.filter((p) => p.id !== "coming-soon");

/* ─── Single bold card ────────────────────────────────────────── */
interface CardProps {
  portal: Portal;
  index: number;
  total: number;
  locale: string;
  scrollYProgress: MotionValue<number>;
  reduced: boolean;
  sticky: boolean;
}

function BigPortalCard({
  portal, index, total, locale,
  scrollYProgress, reduced, sticky,
}: CardProps) {
  const isAr    = locale === "ar";
  const isLast  = index === total - 1;
  const num     = String(index + 1).padStart(2, "0");
  const Arrow   = isAr ? ArrowLeft : ArrowRight;
  const features = isAr
    ? portal.features
    : (portal.featuresEn ?? portal.features);

  /* scroll-driven recede for previous cards */
  const seg0 = (index + 0.25) / Math.max(total - 1, 1);
  const seg1 = (index + 0.85) / Math.max(total - 1, 1);
  const scale        = useTransform(scrollYProgress, [seg0, seg1], [1, 0.9]);
  const overlayAlpha = useTransform(scrollYProgress, [seg0, seg1], [0, 0.55]);

  const stickyStyle: React.CSSProperties = sticky
    ? {
        position: "sticky",
        top: 80 + index * 22,
        zIndex: index + 1,
        marginTop: index === 0 ? 0 : "-110px",
        transformOrigin: "top center",
      }
    : { marginBottom: "1.25rem" };

  return (
    <motion.div
      style={{
        ...stickyStyle,
        scale: sticky && !isLast && !reduced ? scale : 1,
      }}
      className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-3xl
                 shadow-[0_40px_100px_rgba(0,0,0,0.65)]"
    >
      {/* ── Backgrounds ──────────────────────── */}
      <div className="absolute inset-0" style={{ background: "#090b0f" }} />
      <div
        className="absolute inset-0"
        style={{ background: portal.gradient, opacity: 0.55 }}
      />

      {/* Side glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "60%", height: "80%",
          top: "-15%",
          [isAr ? "left" : "right"]: "-5%",
          background: `radial-gradient(ellipse, ${portal.color}22 0%, transparent 70%)`,
          filter: "blur(50px)",
        }}
      />

      {/* Watermark number */}
      <div
        className="absolute select-none pointer-events-none font-black leading-none"
        aria-hidden
        style={{
          fontSize: "clamp(9rem, 22vw, 20rem)",
          color: portal.color,
          opacity: 0.055,
          bottom: "-8%",
          [isAr ? "left" : "right"]: "-1%",
          fontFamily: "var(--font-display, ui-sans-serif)",
          letterSpacing: "-0.06em",
        }}
      >
        {num}
      </div>

      {/* ── Content ──────────────────────────── */}
      <div
        className="relative z-10 flex flex-col md:flex-row items-start gap-6 md:gap-10 p-8 md:p-12"
        style={{ minHeight: "clamp(320px, 58vh, 510px)" }}
      >
        {/* Icon column */}
        <div className={`flex flex-col items-center gap-3 flex-shrink-0 ${isAr ? "" : ""}`}>
          <div
            className="flex items-center justify-center rounded-2xl flex-shrink-0"
            style={{
              width: "clamp(68px, 7vw, 88px)",
              height: "clamp(68px, 7vw, 88px)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              background: `${portal.color}12`,
              border: `1.5px solid ${portal.color}2a`,
              boxShadow: `0 0 36px ${portal.color}1a`,
            }}
          >
            {portal.icon}
          </div>

          <span
            className="font-mono text-[11px] tracking-widest"
            style={{ color: portal.color, opacity: 0.55 }}
          >
            {num}&thinsp;/&thinsp;{String(total).padStart(2, "0")}
          </span>

          {(portal.badgeAr ?? portal.badgeEn) && (
            <span
              className="text-[10px] font-mono px-2.5 py-1 rounded-full tracking-wider"
              style={{
                background: `${portal.color}14`,
                border: `1px solid ${portal.color}28`,
                color: portal.color,
              }}
            >
              {isAr ? portal.badgeAr : portal.badgeEn}
            </span>
          )}
        </div>

        {/* Text column */}
        <div className="flex-1 flex flex-col gap-4 justify-center">
          <h3
            className="font-display font-black leading-tight"
            style={{
              fontSize: "clamp(1.7rem, 3.8vw, 3rem)",
              color: "var(--color-on-surface)",
              letterSpacing: "-0.025em",
            }}
          >
            {isAr ? portal.titleAr : portal.titleEn}
          </h3>

          <p
            className="text-base md:text-lg leading-relaxed"
            style={{
              color: "var(--color-on-surface-variant)",
              maxWidth: "38rem",
            }}
          >
            {isAr ? portal.descriptionAr : portal.descriptionEn}
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2">
            {features.slice(0, 5).map((f, fi) => (
              <span
                key={fi}
                className="text-xs font-mono px-3 py-1.5 rounded-full"
                style={{
                  background: `${portal.color}0e`,
                  border: `1px solid ${portal.color}20`,
                  color: portal.color,
                }}
              >
                {f}
              </span>
            ))}
          </div>

          {/* CTA */}
          <Link
            href={`/${locale}${portal.href}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                       font-mono font-semibold text-sm w-fit mt-2
                       transition-transform hover:scale-[1.04] active:scale-[0.97]"
            style={{
              background: `${portal.color}14`,
              border: `1.5px solid ${portal.color}32`,
              color: portal.color,
              boxShadow: `0 0 22px ${portal.color}16`,
            }}
          >
            {isAr ? portal.ctaAr : portal.ctaEn}
            <Arrow size={15} />
          </Link>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${portal.color}55 50%, transparent 100%)`,
        }}
      />

      {/* Recede overlay (desktop sticky path only) */}
      {sticky && !isLast && !reduced && (
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{ background: "#000", opacity: overlayAlpha }}
        />
      )}
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────────── */
export default function ScrollStackSection({ locale }: { locale: string }) {
  const isAr   = locale === "ar";
  const reduced = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLDivElement>(null);

  const fadeUp = {
    hidden: { opacity: 0, y: reduced ? 0 : 28 },
    show:   { opacity: 1, y: 0, transition: { duration: reduced ? 0.15 : 0.6, ease: [0.0, 0.0, 0.2, 1] as const } },
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const total = STACK_PORTALS.length;

  return (
    <section id="portals" className="container-xl">
      {/* ── Header ────────────────────── */}
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="text-center mb-16"
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
          {isAr ? "بوابات NexaLearn الذكية" : "NexaLearn Smart Portals"}
        </h2>
        <p
          className="text-base md:text-lg mx-auto"
          style={{ color: "var(--color-on-surface-variant)", maxWidth: "560px" }}
        >
          {isAr
            ? "منظومة متكاملة مصممة لتلبية كل احتياجاتك التعليمية والمهنية عبر بوابات متخصصة"
            : "An integrated ecosystem designed to cover all your learning and career needs through specialized portals"}
        </p>
      </motion.div>

      {/* ── Mobile: flat stack ────────── */}
      <div className="flex flex-col gap-4 md:hidden">
        {STACK_PORTALS.map((portal, i) => (
          <BigPortalCard
            key={portal.id}
            portal={portal} index={i} total={total} locale={locale}
            scrollYProgress={scrollYProgress} reduced={true} sticky={false}
          />
        ))}
      </div>

      {/* ── Desktop: CSS sticky stack ─── */}
      <div
        ref={containerRef}
        className="relative hidden md:block"
        style={{
          minHeight: `${total * 240 + 520}px`,
          paddingBottom: "12vh",
        }}
      >
        {STACK_PORTALS.map((portal, i) => (
          <BigPortalCard
            key={portal.id}
            portal={portal} index={i} total={total} locale={locale}
            scrollYProgress={scrollYProgress} reduced={reduced} sticky={true}
          />
        ))}
      </div>
    </section>
  );
}
