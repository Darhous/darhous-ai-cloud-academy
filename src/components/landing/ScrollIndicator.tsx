"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "portals",        ar: "البوابات",  en: "Portals"  },
  { id: "beginner-path",  ar: "مساري",     en: "My Path"  },
  { id: "mentor-showcase",ar: "المرشد",    en: "Mentor"   },
  { id: "journey",        ar: "الرحلة",    en: "Journey"  },
  { id: "ecosystem",      ar: "المنصة",    en: "Ecosystem"},
];

export default function ScrollIndicator({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [progress, setProgress]     = useState(0);
  const [active, setActive]          = useState("");
  const [visible, setVisible]        = useState(false);

  // Progress bar + visibility (only show after first scroll)
  useEffect(() => {
    const onScroll = () => {
      const scrollY   = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0);
      setVisible(scrollY > 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section scroll-spy
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.25, rootMargin: "-15% 0px -55% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* ── Top scroll progress bar ─────────────────── */}
      <div
        className="fixed top-0 left-0 z-[300] h-[2px] transition-[width] duration-150"
        style={{
          width: `${progress}%`,
          background: "var(--color-primary)",
          boxShadow: "0 0 10px var(--color-primary), 0 0 3px var(--color-primary)",
        }}
      />

      {/* ── Section dot navigation ───────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: isAr ? -8 : 8 }}
        animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : (isAr ? -8 : 8) }}
        transition={{ duration: 0.3 }}
        className={`fixed top-1/2 -translate-y-1/2 z-[150] hidden lg:flex flex-col gap-3 ${isAr ? "left-4" : "right-4"}`}
      >
        {SECTIONS.map(({ id, ar, en }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`group flex items-center gap-2 ${isAr ? "flex-row-reverse" : "flex-row"}`}
              title={isAr ? ar : en}
            >
              {/* Label — shows on hover or active */}
              <span
                className="text-[10px] font-mono whitespace-nowrap transition-all duration-200 opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                  color: "var(--color-primary)",
                  opacity: isActive ? 1 : undefined,
                }}
              >
                {isAr ? ar : en}
              </span>

              {/* Dot */}
              <motion.div
                animate={{
                  width:  isActive ? 10 : 6,
                  height: isActive ? 10 : 6,
                  opacity: isActive ? 1 : 0.35,
                }}
                transition={{ duration: 0.2 }}
                className="rounded-full flex-shrink-0"
                style={{
                  background:  isActive ? "var(--color-primary)" : "rgba(255,255,255,0.5)",
                  boxShadow:   isActive ? "0 0 8px var(--color-primary)" : "none",
                }}
              />
            </button>
          );
        })}
      </motion.div>
    </>
  );
}
