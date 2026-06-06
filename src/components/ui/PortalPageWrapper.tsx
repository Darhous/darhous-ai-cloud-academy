"use client";

/**
 * PortalPageWrapper — Phase 9B
 * Thin client-side motion wrapper for portal page entry transitions.
 * Wraps server component children; animates on mount only.
 * Reduced-motion: renders children instantly with no animation.
 */

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  /** Optional extra class names for the wrapper div */
  className?: string;
}

export default function PortalPageWrapper({ children, className }: Props) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.0, 0.0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
