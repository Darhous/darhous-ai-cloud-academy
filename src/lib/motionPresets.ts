/**
 * Shared Framer Motion variant presets.
 * All presets accept shouldReduce (from useReducedMotion()) to disable
 * transforms for users who prefer reduced motion while keeping fade.
 */

export function fadeUpVariants(shouldReduce?: boolean | null) {
  return {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduce ? 0.15 : 0.55, ease: [0.0, 0.0, 0.2, 1] as const },
    },
  };
}

export function fadeInVariants(shouldReduce?: boolean | null) {
  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: shouldReduce ? 0.1 : 0.4, ease: [0.0, 0.0, 0.2, 1] as const },
    },
  };
}

export function slideInVariants(
  direction: "left" | "right" | "up" | "down" = "up",
  shouldReduce?: boolean | null,
) {
  const offset = shouldReduce ? 0 : 28;
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const sign = direction === "right" || direction === "down" ? 1 : -1;
  return {
    hidden: { opacity: 0, [axis]: sign * offset },
    show: {
      opacity: 1,
      [axis]: 0,
      transition: { duration: shouldReduce ? 0.12 : 0.48, ease: [0.0, 0.0, 0.2, 1] as const },
    },
  };
}

export function staggerContainerVariants(shouldReduce?: boolean | null) {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: shouldReduce ? 0 : 0.07 },
    },
  };
}
