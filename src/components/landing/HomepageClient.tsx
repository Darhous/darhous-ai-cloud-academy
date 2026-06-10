"use client";

import { portals } from "@/config/portals";
import Stats from "@/components/sections/Stats";
import CommunitySignup from "@/components/community/CommunitySignup";
import MarqueeStrip from "@/components/ui/MarqueeStrip";
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
      <SmartPlatformTour locale={locale} />
      <HeroSection locale={locale} scrollToPath={scrollToPath} />
      <div className="flex flex-col gap-0">
        <MarqueeStrip items={skillItems} locale={locale} speed="normal" />
        <MarqueeStrip
          items={portalItems}
          locale={isAr ? "en" : "ar"}
          speed="slow"
        />
      </div>
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
