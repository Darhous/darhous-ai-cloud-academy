"use client";

import { portals } from "@/config/portals";
import Stats from "@/components/sections/Stats";
import CommunitySignup from "@/components/community/CommunitySignup";
import HeroSection from "./sections/HeroSection";
import PathSelector from "./sections/PathSelector";
import EcosystemMap from "./sections/EcosystemMap";
import ScrollStackSection from "./sections/ScrollStackSection";
import HowItWorks from "./sections/HowItWorks";
import MentorShowcase from "./sections/MentorShowcase";
import WhyDarhous from "./sections/WhyDarhous";
import FinalCTA from "./sections/FinalCTA";
import SmartPlatformTour from "./SmartPlatformTour";
import CinematicIntro from "./CinematicIntro";

export default function HomepageClient({ locale }: { locale: string }) {
  const realPortals = portals.filter((p) => p.id !== "coming-soon");

  function scrollToPath() {
    document.getElementById("beginner-path")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="flex flex-col gap-16 md:gap-20 pb-16 md:pb-20 overflow-x-hidden">
      <CinematicIntro locale={locale} />
      <SmartPlatformTour locale={locale} />
      <HeroSection locale={locale} scrollToPath={scrollToPath} />
      <ScrollStackSection locale={locale} />
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
