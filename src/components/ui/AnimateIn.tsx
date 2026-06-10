"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}

export default function AnimateIn({ children, delay = 0, direction = "up", className }: AnimateInProps) {
  const shouldReduce = useReducedMotion();

  const initial = {
    opacity: 0,
    y: shouldReduce ? 0 : direction === "up" ? 24 : 0,
    x: shouldReduce ? 0 : direction === "left" ? -24 : direction === "right" ? 24 : 0,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: shouldReduce ? 0.12 : 0.5, delay: shouldReduce ? 0 : delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
