"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { portals } from "@/config/portals";

import GoalGatewayHero from "./GoalGatewayHero";

import Stats from "@/components/sections/Stats";
import CommunitySignup from "@/components/community/CommunitySignup";
import MarqueeStrip from "@/components/ui/MarqueeStrip";
import PathSelector from "@/components/landing/sections/PathSelector";
import EcosystemMap from "@/components/landing/sections/EcosystemMap";
import ScrollStackSection from "@/components/landing/sections/ScrollStackSection";
import HowItWorks from "@/components/landing/sections/HowItWorks";
import WhyDarhous from "@/components/landing/sections/WhyDarhous";
import FinalCTA from "@/components/landing/sections/FinalCTA";

// Lazy-loaded components
const CinematicIntro = dynamic(() => import("@/components/landing/CinematicIntro"), { ssr: false });
const SmartPlatformTour = dynamic(() => import("@/components/landing/SmartPlatformTour"), { ssr: false });
const ScrollIndicator = dynamic(() => import("@/components/landing/ScrollIndicator"), { ssr: false });
const Premium3DShowcaseCarousel = dynamic(() => import("@/components/layout/Premium3DShowcaseCarousel"), { ssr: false });
const MentorShowcase = dynamic(() => import("@/components/landing/sections/MentorShowcase"), { ssr: false });

const skillsByLocale = {
  ar: [
    "نماذج الذكاء الاصطناعي",
    "Next.js 16",
    "React 19",
    "Supabase",
    "Tailwind CSS",
    "Vercel",
    "TypeScript",
    "Framer Motion",
    "Python",
    "الأتمتة",
    "إنترنت الأشياء",
    "الحوسبة السحابية",
  ],
  en: [
    "Claude AI",
    "Next.js 16",
    "React 19",
    "Supabase",
    "Tailwind CSS",
    "Vercel",
    "TypeScript",
    "Framer Motion",
    "Python",
    "Automation",
    "IoT",
    "Cloud Computing",
  ],
} as const;

export default function Concept5Client({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [tourOpen, setTourOpen] = useState(false);
  const realPortals = portals.filter((p) => p.id !== "coming-soon");
  
  const skillItems = [...skillsByLocale[isAr ? "ar" : "en"]];
  const portalItems = portals.map((portal) =>
    isAr ? portal.titleAr : portal.titleEn,
  );

  function scrollToPath() {
    document.getElementById("concept-5-start")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <CinematicIntro locale={locale} />
      <ScrollIndicator locale={locale} />
      <SmartPlatformTour locale={locale} isOpen={tourOpen} onClose={() => setTourOpen(false)} />
      
      {/* CONCEPT 5: NEW HERO GATEWAY */}
      <GoalGatewayHero locale={locale} scrollToPath={scrollToPath} />

      <div className="flex flex-col gap-0" id="concept-5-start">
        <MarqueeStrip items={skillItems} locale={locale} speed="normal" />
        <MarqueeStrip
          items={portalItems}
          locale={isAr ? "en" : "ar"}
          speed="slow"
          accent="#d0bcff"
        />
      </div>
      
      <ScrollStackSection locale={locale} />
      <Premium3DShowcaseCarousel locale={locale} />
      <PathSelector locale={locale} />
      <EcosystemMap locale={locale} portals={realPortals} />
      <MentorShowcase locale={locale} />
      <HowItWorks locale={locale} />
      
      <div className="flex flex-col gap-16 md:gap-20 relative">
        <WhyDarhous locale={locale} />
        <div className="container-xl">
          <Stats locale={locale} />
        </div>
      </div>
      
      <FinalCTA locale={locale} />
      
      <div className="container-xl">
        <CommunitySignup locale={locale} variant="hero" source="ecosystem-home" />
      </div>
    </>
  );
}
