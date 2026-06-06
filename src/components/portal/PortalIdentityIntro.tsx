"use client";

/**
 * PortalIdentityIntro — Phase 9C
 * Cinematic "at-a-glance" block placed between the hero and first content section.
 * Two parts:
 *   1. Stats row  — animated count-up triggered by IntersectionObserver
 *   2. Journey rail — 4-step path (desktop: horizontal / mobile: vertical list)
 *
 * Style-only / wrapper-only. No routes, no APIs, no auth, no Supabase.
 */

import { useRef, useEffect, useState } from "react";
import React from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import type { PortalStat, PortalJourneyStep } from "@/data/portalIntroData";
import { portalIntroData } from "@/data/portalIntroData";

// ─── Count-up hook ────────────────────────────────────────────────────────────

function useCountUp(to: number, shouldReduce: boolean, active: boolean) {
  const [count, setCount] = useState(shouldReduce ? to : 0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    if (shouldReduce) {
      setCount(to);
      return;
    }

    setCount(0);
    const start = performance.now();
    const DURATION = 1400;

    function tick(now: number) {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out-cubic
      setCount(Math.round(eased * to));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, shouldReduce, to]);

  return count;
}

// ─── Stat pillar ──────────────────────────────────────────────────────────────

function StatPillar({
  stat,
  isAr,
  shouldReduce,
  active,
  delay,
}: {
  stat: PortalStat;
  isAr: boolean;
  shouldReduce: boolean;
  active: boolean;
  delay: number;
}) {
  const isNonNumeric = !/\d/.test(stat.value);
  const suffix = stat.value.includes("+")
    ? "+"
    : stat.value.includes("%")
    ? "%"
    : "";
  const count = useCountUp(stat.numericValue, shouldReduce, active);

  return (
    <motion.div
      className="flex flex-col items-center gap-2 flex-1 min-w-0 text-center px-3 sm:px-6"
      initial={shouldReduce ? false : { opacity: 0, y: 18 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: [0.0, 0.0, 0.2, 1] }}
    >
      <span
        className="text-2xl sm:text-4xl font-bold font-mono tabular-nums leading-none"
        style={{ color: "var(--portal-color)" }}
        aria-label={`${isNonNumeric ? stat.value : count + suffix} ${
          isAr ? stat.labelAr : stat.labelEn
        }`}
      >
        {isNonNumeric ? stat.value : `${count}${suffix}`}
      </span>
      <span
        className="text-[11px] sm:text-sm font-medium leading-snug"
        style={{ color: "var(--color-on-surface-variant)" }}
        aria-hidden="true"
      >
        {isAr ? stat.labelAr : stat.labelEn}
      </span>
    </motion.div>
  );
}

// ─── Journey step — desktop (horizontal) ─────────────────────────────────────

function JourneyStepDesktop({
  step,
  isAr,
  active,
  delay,
  shouldReduce,
}: {
  step: PortalJourneyStep;
  isAr: boolean;
  active: boolean;
  delay: number;
  shouldReduce: boolean;
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2.5 flex-1 min-w-0"
      initial={shouldReduce ? false : { opacity: 0, y: 14 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay, ease: [0.0, 0.0, 0.2, 1] }}
    >
      {/* Step circle */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0"
        style={
          step.isOutcome
            ? {
                background: "var(--portal-color)",
                color: "#0c0e12",
                boxShadow: "0 0 20px var(--portal-color-glow)",
              }
            : {
                background: "var(--portal-color-subtle)",
                color: "var(--portal-color)",
                border: "2px solid var(--portal-color-glow)",
              }
        }
      >
        {step.num}
      </div>

      {/* Label */}
      <span
        className="text-xs text-center leading-snug max-w-[90px]"
        style={{
          color: step.isOutcome
            ? "var(--portal-color)"
            : "var(--color-on-surface-variant)",
          fontWeight: step.isOutcome ? 600 : 400,
        }}
      >
        {isAr ? step.titleAr : step.titleEn}
      </span>
    </motion.div>
  );
}

// ─── Journey step — mobile (vertical) ────────────────────────────────────────

function JourneyStepMobile({
  step,
  isAr,
  isLast,
  active,
  delay,
  shouldReduce,
}: {
  step: PortalJourneyStep;
  isAr: boolean;
  isLast: boolean;
  active: boolean;
  delay: number;
  shouldReduce: boolean;
}) {
  return (
    <motion.div
      className="flex gap-3 items-start"
      initial={shouldReduce ? false : { opacity: 0, x: isAr ? 10 : -10 }}
      animate={active ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.35, delay, ease: [0.0, 0.0, 0.2, 1] }}
    >
      {/* Circle + vertical connector */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold"
          style={
            step.isOutcome
              ? {
                  background: "var(--portal-color)",
                  color: "#0c0e12",
                  boxShadow: "0 0 14px var(--portal-color-glow)",
                }
              : {
                  background: "var(--portal-color-subtle)",
                  color: "var(--portal-color)",
                  border: "1.5px solid var(--portal-color-glow)",
                }
          }
        >
          {step.num}
        </div>
        {!isLast && (
          <div
            className="w-px flex-1 mt-1 min-h-[20px]"
            style={{ background: "var(--portal-color-border)" }}
          />
        )}
      </div>

      {/* Label */}
      <div className="pb-4 pt-1.5">
        <span
          className="text-sm leading-snug"
          style={{
            color: step.isOutcome
              ? "var(--portal-color)"
              : "var(--color-on-surface-variant)",
            fontWeight: step.isOutcome ? 600 : 400,
          }}
        >
          {isAr ? step.titleAr : step.titleEn}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

interface Props {
  portalKey: string;
  locale: string;
  /**
   * className for the outer <section>.
   * Defaults to "container-xl" for gap-based page layouts.
   * Pass "" or "mb-12" etc. when already inside a container-xl.
   */
  sectionClass?: string;
}

export default function PortalIdentityIntro({ portalKey, locale, sectionClass }: Props) {
  const isAr = locale === "ar";
  const shouldReduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const data = portalIntroData[portalKey];
  if (!data) return null;

  return (
    <section
      ref={ref}
      className={sectionClass !== undefined ? sectionClass : "container-xl"}
      aria-label={isAr ? "نظرة سريعة على البوابة" : "Portal at a glance"}
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "var(--portal-color-faint)",
          border: "1px solid var(--portal-color-border)",
        }}
      >

        {/* ── Stats row ─────────────────────────────────────────────────── */}
        <div className="flex items-stretch py-8 px-4">
          {data.stats.map((stat, i) => (
            <React.Fragment key={i}>
              <StatPillar
                stat={stat}
                isAr={isAr}
                shouldReduce={shouldReduce}
                active={inView}
                delay={shouldReduce ? 0 : i * 0.12}
              />
              {i < data.stats.length - 1 && (
                <div
                  className="w-px self-stretch flex-shrink-0"
                  style={{ background: "var(--portal-color-border)" }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── Stats / Journey divider ───────────────────────────────────── */}
        <motion.div
          style={{ height: 1, background: "var(--portal-color-border)" }}
          initial={shouldReduce ? false : { scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 0.25, ease: [0.0, 0.0, 0.2, 1] }}
        />

        {/* ── Journey rail — desktop ────────────────────────────────────── */}
        <div className="hidden sm:block px-8 py-8" dir={isAr ? "rtl" : "ltr"}>
          <p className="text-[10px] font-mono uppercase tracking-widest mb-6 opacity-50 text-center" style={{ color: "var(--portal-color)" }}>
            {isAr ? "رحلتك التعليمية" : "Your Learning Journey"}
          </p>
          <div className="flex items-start">
            {data.journey.map((step, i) => (
              <React.Fragment key={step.num}>
                <JourneyStepDesktop
                  step={step}
                  isAr={isAr}
                  active={inView}
                  delay={shouldReduce ? 0 : 0.4 + i * 0.1}
                  shouldReduce={shouldReduce}
                />
                {i < data.journey.length - 1 && (
                  <motion.div
                    className="flex-shrink"
                    style={{
                      flex: "1 1 0%",
                      height: 1,
                      marginTop: 18,
                      background:
                        "linear-gradient(90deg, var(--portal-color-glow), var(--portal-color-border))",
                      transformOrigin: isAr ? "100% 0" : "0 0",
                      minWidth: 12,
                    }}
                    initial={shouldReduce ? false : { scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{
                      duration: shouldReduce ? 0 : 0.3,
                      delay: shouldReduce ? 0 : 0.45 + i * 0.1,
                      ease: [0.0, 0.0, 0.2, 1],
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── Journey rail — mobile ─────────────────────────────────────── */}
        <div className="sm:hidden px-5 py-6" dir={isAr ? "rtl" : "ltr"}>
          <p className="text-[10px] font-mono uppercase tracking-widest mb-5 opacity-50" style={{ color: "var(--portal-color)" }}>
            {isAr ? "رحلتك التعليمية" : "Your Learning Journey"}
          </p>
          {data.journey.map((step, i) => (
            <JourneyStepMobile
              key={step.num}
              step={step}
              isAr={isAr}
              isLast={i === data.journey.length - 1}
              active={inView}
              delay={shouldReduce ? 0 : 0.3 + i * 0.1}
              shouldReduce={shouldReduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
