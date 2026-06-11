"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { portals } from "@/config/portals";
import Stats from "@/components/sections/Stats";
import CommunitySignup from "@/components/community/CommunitySignup";
import MarqueeStrip from "@/components/ui/MarqueeStrip";
import HeroSection from "./sections/HeroSection";
import PathSelector from "./sections/PathSelector";
import EcosystemMap from "./sections/EcosystemMap";
import ScrollStackSection from "./sections/ScrollStackSection";
import HowItWorks from "./sections/HowItWorks";
import WhyDarhous from "./sections/WhyDarhous";
import FinalCTA from "./sections/FinalCTA";

// Lazy-loaded: dialog (never visible on initial load), uses browser APIs
const CinematicIntro = dynamic(() => import("./CinematicIntro"), { ssr: false });
const SmartPlatformTour = dynamic(() => import("./SmartPlatformTour"), { ssr: false });
const ScrollIndicator = dynamic(() => import("./ScrollIndicator"), { ssr: false });
// Lazy-loaded: below-fold, uses window in render path
const Premium3DShowcaseCarousel = dynamic(() => import("@/components/layout/Premium3DShowcaseCarousel"), { ssr: false });
const MentorShowcase = dynamic(() => import("./sections/MentorShowcase"), { ssr: false });

const skillsByLocale = {
  ar: [
    "كلود AI",
    "نكست.جي إس",
    "رياكت",
    "سوبابيس",
    "تيلويند",
    "فيرسيل",
    "تايب سكريبت",
    "فريمر موشن",
    "بايثون",
    "أتمتة",
    "إنترنت الأشياء",
    "كلاود",
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

export default function HomepageClient({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [tourOpen, setTourOpen] = useState(false);
  const realPortals = portals.filter((p) => p.id !== "coming-soon");
  const skillItems = [...skillsByLocale[isAr ? "ar" : "en"]];
  const portalItems = portals.map((portal) =>
    isAr ? portal.titleAr : portal.titleEn,
  );

  function scrollToPath() {
    document.getElementById("beginner-path")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="flex flex-col gap-16 md:gap-20 pb-16 md:pb-20 overflow-x-hidden">
      <CinematicIntro locale={locale} />
      <ScrollIndicator locale={locale} />
      <SmartPlatformTour locale={locale} isOpen={tourOpen} onClose={() => setTourOpen(false)} />
      <HeroSection locale={locale} scrollToPath={scrollToPath} onStartTour={() => setTourOpen(true)} />
      <div className="flex flex-col gap-0">
        <MarqueeStrip items={skillItems} locale={locale} speed="normal" />
        <MarqueeStrip
          items={portalItems}
          locale={isAr ? "en" : "ar"}
          speed="slow"
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
    </div>
  );
}
