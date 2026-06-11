"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Bot, Globe, Zap, Cpu, BookOpen, Briefcase,
  Code2, Settings2, Sparkles, Atom, Shield,
  type LucideIcon,
} from "lucide-react";

interface Badge {
  label: string;
  labelAr?: string;
  Icon: LucideIcon;
  color: string;
  category: "ai" | "dev" | "portal" | "other";
}

const BADGES: Badge[] = [
  /* ─── AI tools ─────────────────────────────── */
  { label: "ChatGPT",    Icon: Bot,       color: "#10a37f", category: "ai" },
  { label: "Claude",     Icon: Sparkles,  color: "#d0bcff", category: "ai" },
  { label: "Gemini",     Icon: Atom,      color: "#4285f4", category: "ai" },
  /* ─── Automation ───────────────────────────── */
  { label: "n8n",        Icon: Zap,       color: "#ef6820", category: "dev" },
  { label: "Zapier",     Icon: Zap,       color: "#ff6640", category: "dev" },
  { label: "Make",       Icon: Settings2, color: "#6c3aff", category: "dev" },
  /* ─── Hardware ─────────────────────────────── */
  { label: "Arduino",    Icon: Cpu,       color: "#00979d", category: "dev" },
  { label: "ESP32",      Icon: Cpu,       color: "#e74c3c", category: "dev" },
  /* ─── Languages / tools ────────────────────── */
  { label: "Python",     Icon: Code2,     color: "#3776ab", category: "dev" },
  { label: "TypeScript", Icon: Code2,     color: "#3178c6", category: "dev" },
  /* ─── Certifications / careers ─────────────── */
  { label: "IELTS",      Icon: BookOpen,  color: "#c084fc", category: "other" },
  { label: "LinkedIn",   Icon: Briefcase, color: "#0a66c2", category: "other" },
  { label: "Vercel",     Icon: Globe,     color: "#8ed5ff", category: "dev" },
  /* ─── Portals ──────────────────────────────── */
  { label: "AI Academy",     labelAr: "أكاديمية AI",      Icon: Bot,       color: "#8ed5ff", category: "portal" },
  { label: "Language Portal",labelAr: "بوابة اللغة",      Icon: Globe,     color: "#d0bcff", category: "portal" },
  { label: "Digital Exams",  labelAr: "اختبارات رقمية",   Icon: Shield,    color: "#3ce0fb", category: "portal" },
  { label: "Career",         labelAr: "المسار المهني",     Icon: Briefcase, color: "#f59e0b", category: "portal" },
  { label: "Automation Lab", labelAr: "أتمتة",            Icon: Zap,       color: "#4ade80", category: "portal" },
  { label: "IoT Lab",        labelAr: "إنترنت الأشياء",   Icon: Cpu,       color: "#f97316", category: "portal" },
];

/* ─── Single badge ─────────────────────────────────────────────────── */
function TechBadge({ badge, delay, isAr }: { badge: Badge; delay: number; isAr: boolean }) {
  const label = isAr && badge.labelAr ? badge.labelAr : badge.label;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.07, y: -3 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full cursor-default select-none transition-shadow"
      style={{
        background: `${badge.color}0e`,
        border: `1px solid ${badge.color}28`,
        boxShadow: `0 0 0 0 ${badge.color}00`,
      }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Hover glow via filter */}
      <badge.Icon
        size={13}
        style={{ color: badge.color, flexShrink: 0 }}
        aria-hidden
      />
      <span
        className="font-mono text-[12px] font-semibold whitespace-nowrap leading-none"
        style={{ color: badge.color }}
      >
        {label}
      </span>
    </motion.div>
  );
}

/* ─── Section ──────────────────────────────────────────────────────── */
export default function TechEcosystem({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="w-full py-6 border-y"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
      aria-label={isAr ? "المنظومة التقنية" : "Tech Ecosystem"}
    >
      {/* Fade masks on the sides */}
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 start-0 z-10 w-16"
          style={{
            background: "linear-gradient(to right, var(--color-background, #0c0e12) 0%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 end-0 z-10 w-16"
          style={{
            background: "linear-gradient(to left, var(--color-background, #0c0e12) 0%, transparent 100%)",
          }}
        />

        {/* Badge cloud */}
        {inView && (
          <div className="flex flex-wrap justify-center gap-2.5 px-6 py-1">
            {BADGES.map((badge, i) => (
              <TechBadge
                key={badge.label}
                badge={badge}
                delay={i * 0.04}
                isAr={isAr}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
