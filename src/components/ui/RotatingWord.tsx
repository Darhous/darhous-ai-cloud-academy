"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingWordProps {
  words: string[];
  /** ms per word */
  interval?: number;
  color?: string;
  className?: string;
}

export default function RotatingWord({
  words,
  interval = 2600,
  color = "var(--color-primary)",
  className = "",
}: RotatingWordProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ minWidth: "3ch" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0,   opacity: 1 }}
          exit={{   rotateX:  90,  opacity: 0 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "inline-block",
            color,
            textShadow: `0 0 32px ${color}88`,
            perspective: "800px",
            perspectiveOrigin: "50% 50%",
            transformStyle: "preserve-3d",
            originY: "50%",
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
