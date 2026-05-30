"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const CommandPalette = dynamic(() => import("./CommandPalette"), { ssr: false });

export default function CommandPaletteProvider({ locale }: { locale: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <CommandPalette locale={locale} />;
}
