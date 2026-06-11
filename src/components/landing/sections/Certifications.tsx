"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Bot, Globe, Zap, Briefcase, ShieldCheck, type LucideIcon } from "lucide-react";
import Link from "next/link";

/* ─── Data ──────────────────────────────────────────────────────── */
interface CertDef {
  Icon: LucideIcon;
  nameAr: string;
  nameEn: string;
  portalAr: string;
  portalEn: string;
  href: string;
  color: string;
}

const CERTS: CertDef[] = [
  {
    Icon: Bot,
    nameAr: "شهادة مهندس الذكاء الاصطناعي",
    nameEn: "AI Engineer Certificate",
    portalAr: "أكاديمية الذكاء الاصطناعي",
    portalEn: "AI Academy",
    href: "/ai-academy",
    color: "#8ed5ff",
  },
  {
    Icon: Globe,
    nameAr: "شهادة كفاءة اللغة الإنجليزية",
    nameEn: "English Proficiency Certificate",
    portalAr: "بوابة اللغة",
    portalEn: "Language Portal",
    href: "/language",
    color: "#d0bcff",
  },
  {
    Icon: Zap,
    nameAr: "شهادة الأتمتة الاحترافية",
    nameEn: "Professional Automation Certificate",
    portalAr: "أكاديمية الأتمتة",
    portalEn: "Automation Academy",
    href: "/automation",
    color: "#4ade80",
  },
  {
    Icon: Briefcase,
    nameAr: "شهادة الجاهزية المهنية",
    nameEn: "Career Readiness Certificate",
    portalAr: "مركز المهن",
    portalEn: "Career Hub",
    href: "/career",
    color: "#fbbf24",
  },
];

/* ─── Section ────────────────────────────────────────────────────── */
export default function Certifications({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const shouldReduce = !!useReducedMotion();
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="container-xl relative">
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={shouldReduce ? false : { opacity: 0, y: 24 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] as const }}
        className="text-center mb-12"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono mb-5"
          style={{ background: "rgba(74,222,128,0.06)", borderColor: "rgba(74,222,128,0.2)", color: "#4ade80" }}
        >
          <ShieldCheck size={12} />
          {isAr ? "الشهادات المعتمدة" : "Verified Certificates"}
        </div>
        <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-gradient-premium">
          {isAr ? "شهادات تُفتح بها الأبواب" : "Certificates That Open Doors"}
        </h2>
        <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: "var(--color-on-surface-variant)" }}>
          {isAr
            ? "شهادات رقمية موثقة ومعترف بها — دليل حقيقي على مهاراتك في سوق العمل"
            : "Verified digital certificates — real proof of your skills for the job market"}
        </p>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {CERTS.map((cert, i) => (
          <CertCard key={cert.nameEn} cert={cert} index={i} isAr={isAr} shouldReduce={shouldReduce} />
        ))}
      </div>
    </section>
  );
}

/* ─── Single cert card ───────────────────────────────────────────── */
function CertCard({ cert, index, isAr, shouldReduce }: {
  cert: CertDef;
  index: number;
  isAr: boolean;
  shouldReduce: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0, 0, 0.2, 1] as const }}
    >
      <Link
        href={cert.href}
        className="group relative flex flex-col h-full p-6 rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{ boxShadow: `inset 0 0 0 1px ${cert.color}40`, background: `radial-gradient(ellipse at 50% 0%, ${cert.color}0d 0%, transparent 70%)` }}
        />

        {/* Icon gradient bg */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${cert.color}25, ${cert.color}10)`,
            border: `1px solid ${cert.color}30`,
          }}
        >
          <cert.Icon size={24} style={{ color: cert.color }} />
        </div>

        {/* Verified badge */}
        <div className="flex items-center gap-1.5 mb-3">
          <ShieldCheck size={12} style={{ color: "#4ade80" }} />
          <span className="font-mono text-[10px] tracking-wide" style={{ color: "#4ade80" }}>
            {isAr ? "موثقة" : "Verified"}
          </span>
        </div>

        {/* Name */}
        <h3
          className="font-bold text-base leading-snug mb-2 transition-colors duration-200 group-hover:text-white"
          style={{ color: "var(--color-on-surface)" }}
        >
          {isAr ? cert.nameAr : cert.nameEn}
        </h3>

        {/* Portal */}
        <p className="text-xs mt-auto pt-3 border-t"
          style={{ color: cert.color, borderColor: `${cert.color}25` }}>
          {isAr ? cert.portalAr : cert.portalEn}
        </p>
      </Link>
    </motion.div>
  );
}
