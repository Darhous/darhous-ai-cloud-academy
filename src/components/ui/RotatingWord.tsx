"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingWordProps {
  words: string[];
  /** ms per word */
  interval?: number;
  /** single fallback color */
  color?: string;
  /** per-word colors — cycles with words */
  colors?: string[];
  className?: string;
}

export default function RotatingWord({
  words,
  interval = 2600,
  color = "var(--color-primary)",
  colors,
  className = "",
}: RotatingWordProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  const activeColor = colors ? colors[index % colors.length] : color;

  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ minWidth: "3ch" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0,   opacity: 1 }}
          exit={{   y:  20,  opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "inline-block", color: activeColor }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
