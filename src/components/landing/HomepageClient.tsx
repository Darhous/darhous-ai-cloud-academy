"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Bot, Globe, Zap, Cpu, BookOpen, Briefcase,
  Code2, Settings2, Sparkles, Atom,
} from "lucide-react";
import { portals } from "@/config/portals";
import CommunitySignup from "@/components/community/CommunitySignup";
import MarqueeStrip, { type RichItem } from "@/components/ui/MarqueeStrip";
import HeroSection from "./sections/HeroSection";
import PathSelector from "./sections/PathSelector";
import EcosystemMap from "./sections/EcosystemMap";
import ScrollStackSection from "./sections/ScrollStackSection";
import HowItWorks from "./sections/HowItWorks";
import WhyDarhous from "./sections/WhyDarhous";
import FinalCTA from "./sections/FinalCTA";
import ImpactNumbers from "./sections/ImpactNumbers";
import StudentJourney from "./sections/StudentJourney";
import Certifications from "./sections/Certifications";
import Testimonials from "./sections/Testimonials";
import UrgencyStrip from "./sections/UrgencyStrip";

// Lazy-loaded: dialog (never visible on initial load), uses browser APIs
const CursorGlow    = dynamic(() => import("./CursorGlow"),    { ssr: false });
const CinematicIntro = dynamic(() => import("./CinematicIntro"), { ssr: false });
const SmartPlatformTour = dynamic(() => import("./SmartPlatformTour"), { ssr: false });
const ScrollIndicator = dynamic(() => import("./ScrollIndicator"), { ssr: false });
const Premium3DShowcaseCarousel = dynamic(() => import("@/components/layout/Premium3DShowcaseCarousel"), { ssr: false });
const MentorShowcase = dynamic(() => import("./sections/MentorShowcase"), { ssr: false });

/* ─── Rich marquee row 1: tech tools ─────────────────────────────── */
const TOOL_RICH_ITEMS: RichItem[] = [
  { label: "ChatGPT",    Icon: Bot,       color: "#10a37f" },
  { label: "Claude",     Icon: Sparkles,  color: "#d0bcff" },
  { label: "Gemini",     Icon: Atom,      color: "#4285f4" },
  { label: "n8n",        Icon: Zap,       color: "#ef6820" },
  { label: "Zapier",     Icon: Zap,       color: "#ff6640" },
  { label: "Make",       Icon: Settings2, color: "#6c3aff" },
  { label: "Arduino",    Icon: Cpu,       color: "#00979d" },
  { label: "ESP32",      Icon: Cpu,       color: "#e74c3c" },
  { label: "Python",     Icon: Code2,     color: "#3776ab" },
  { label: "IELTS",      Icon: BookOpen,  color: "#c084fc" },
  { label: "TypeScript", Icon: Code2,     color: "#3178c6" },
  { label: "Vercel",     Icon: Globe,     color: "#8ed5ff" },
  { label: "LinkedIn",   Icon: Briefcase, color: "#0a66c2" },
];

/* ─── Rich marquee row 2: portals (uses portal colors) ───────────── */
function buildPortalRichItems(isAr: boolean): RichItem[] {
  const PORTAL_ICONS: Record<string, RichItem["Icon"]> = {
    "ai-academy":    Bot,
    "language":      Globe,
    "digital-exams": BookOpen,
    "career":        Briefcase,
    "automation":    Zap,
    "iot-lab":       Cpu,
  };
  return portals
    .filter((p) => p.id !== "coming-soon" && p.id !== "nano-banana")
    .map((p) => ({
      label: isAr ? p.titleAr : p.titleEn,
      Icon: PORTAL_ICONS[p.id] ?? Sparkles,
      color: p.color,
    }));
}

/* ─── Component ─────────────────────────────────────────────────── */
export default function HomepageClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [tourOpen, setTourOpen] = useState(false);
  const realPortals = portals.filter((p) => p.id !== "coming-soon");
  const portalRichItems = buildPortalRichItems(isAr);

  function scrollToPath() {
    document.getElementById("beginner-path")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="flex flex-col gap-16 md:gap-20 pb-16 md:pb-20" style={{ overflowX: "clip" }}>

      {/* ── Global cursor glow ── */}
      <CursorGlow />

      {/* ── Preserved: Intro + tour + scroll indicator ── */}
      <CinematicIntro locale={locale} />
      <ScrollIndicator locale={locale} />
      <SmartPlatformTour locale={locale} isOpen={tourOpen} onClose={() => setTourOpen(false)} />

      {/* ── Hero ── */}
      <HeroSection locale={locale} scrollToPath={scrollToPath} onStartTour={() => setTourOpen(true)} />

      {/* ── Marquee ×2 — upgraded with colored icons ── */}
      <div className="flex flex-col gap-0">
        <MarqueeStrip
          richItems={TOOL_RICH_ITEMS}
          locale={locale}
          speed="normal"
        />
        <MarqueeStrip
          richItems={portalRichItems}
          locale={isAr ? "en" : "ar"}
          speed="slow"
        />
      </div>

      {/* ── Preserved: ScrollStack + Carousel + PathSelector + EcosystemMap + MentorShowcase ── */}
      <ScrollStackSection locale={locale} />
      <Premium3DShowcaseCarousel locale={locale} />
      <PathSelector locale={locale} />
      <EcosystemMap locale={locale} portals={realPortals} />
      <MentorShowcase locale={locale} />

      {/* ── Preserved: How It Works ── */}
      <HowItWorks locale={locale} />

      {/* ── NEW: Student Journey (6 stages) ── */}
      <StudentJourney locale={locale} />

      {/* ── UPGRADED: Impact Numbers (replaces static Stats) ── */}
      <ImpactNumbers locale={locale} />

      {/* ── NEW: Certifications ── */}
      <Certifications locale={locale} />

      {/* ── NEW: Testimonials ── */}
      <Testimonials locale={locale} />

      {/* ── Preserved: Why NexaLearn features grid ── */}
      <WhyDarhous locale={locale} />

      {/* ── NEW: Urgency strip (before final CTA) ── */}
      <UrgencyStrip locale={locale} />

      {/* ── Preserved: Final CTA + Community signup ── */}
      <FinalCTA locale={locale} />
      <div className="container-xl">
        <CommunitySignup locale={locale} variant="hero" source="ecosystem-home" />
      </div>
    </div>
  );
}
