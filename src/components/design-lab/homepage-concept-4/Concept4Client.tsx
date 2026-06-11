"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Bot, Sparkles, LayoutGrid, Trophy, Rocket, X, ChevronRight, ChevronLeft, ArrowRight, ArrowLeft, Globe, Send, Terminal, CheckCircle, Mail, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
import type { Portal } from "@/config/portals";

// Components
import CinematicIntro from "./CinematicIntro";
import HeroConstellation from "./HeroConstellation";
import MarqueeStripConcept from "./MarqueeStripConcept";
import SpatialPortalStack from "./SpatialPortalStack";
import Premium3DShowcaseConcept from "./Premium3DShowcaseConcept";
import PathSelectorConcept from "./PathSelectorConcept";
import EcosystemOrbitalMap from "./EcosystemOrbitalMap";
import MentorShowcaseConcept from "./MentorShowcaseConcept";
import HowItWorksConcept from "./HowItWorksConcept";
import WhyDarhousConcept from "./WhyDarhousConcept";
import StatsConcept from "./StatsConcept";
import FinalCTAConcept from "./FinalCTAConcept";
import CommunitySignupConcept from "./CommunitySignupConcept";
import SmartPlatformTourConcept from "./SmartPlatformTourConcept";

interface Concept4ClientProps {
  locale: string;
  portals: Portal[];
}

export default function Concept4Client({ locale, portals }: Concept4ClientProps) {
  const [introDone, setIntroDone] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  useEffect(() => {
    // Quick fallback if reduced motion
    if (shouldReduceMotion) {
      setIntroDone(true);
      return;
    }
    const t = setTimeout(() => setIntroDone(true), 4000);
    return () => clearTimeout(t);
  }, [shouldReduceMotion]);

  return (
    <div className="relative w-full">
      {/* 1. Cinematic Intro */}
      <AnimatePresence>
        {!introDone && <CinematicIntro onComplete={() => setIntroDone(true)} locale={locale} />}
      </AnimatePresence>

      <AnimatePresence>
        {showTour && <SmartPlatformTourConcept locale={locale} onClose={() => setShowTour(false)} />}
      </AnimatePresence>

      <main className={cn("transition-opacity duration-1000", introDone ? "opacity-100" : "opacity-0")}>
        {/* 2. Scroll Indicator (omitted for brevity, or basic implementation) */}
        <div className="fixed top-0 left-0 w-full h-1 bg-white/5 z-50">
          <motion.div className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" style={{ scaleX: 0 }} />
        </div>

        {/* 4. Hero Section with Constellation Map */}
        <HeroConstellation locale={locale} portals={portals} onOpenTour={() => setShowTour(true)} />

        {/* 5. Marquee Strip */}
        <MarqueeStripConcept locale={locale} portals={portals} />

        {/* 6. Scroll Stack Section (Spatial Portal Worlds) */}
        <SpatialPortalStack locale={locale} portals={portals} />

        {/* 7. Premium 3D Showcase Carousel */}
        <Premium3DShowcaseConcept locale={locale} />

        {/* 8. Path Selector */}
        <PathSelectorConcept locale={locale} />

        {/* 9. Ecosystem Map (Orbital Map) */}
        <EcosystemOrbitalMap locale={locale} portals={portals} />

        {/* 10. Mentor Showcase */}
        <MentorShowcaseConcept locale={locale} />

        {/* 11. How It Works */}
        <HowItWorksConcept locale={locale} />

        {/* 12. Why Darhous */}
        <WhyDarhousConcept locale={locale} />

        {/* 13. Stats */}
        <StatsConcept locale={locale} />

        {/* 14. Final CTA */}
        <FinalCTAConcept locale={locale} />

        {/* 15. Community Signup */}
        <CommunitySignupConcept locale={locale} />
      </main>
    </div>
  );
}
