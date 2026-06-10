"use client";

import React, { useRef, useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  tiltMax?: number;
  spotlight?: boolean;
  spotlightColor?: string;
  disabled?: boolean;
  activeTransform?: string;
}

export default function InteractiveSurface({
  children,
  className = "",
  tiltMax = 6,
  spotlight = true,
  spotlightColor = "rgba(255,255,255,0.05)",
  disabled = false,
  activeTransform = "translateY(-4px)",
  style,
  ...props
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (shouldReduce || disabled || !ref.current) return;
    
    const handlePointerMove = (e: PointerEvent) => {
      // Only apply to fine pointers (mouse/trackpad) to avoid weird mobile behavior
      if (e.pointerType !== "mouse") return;
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ref.current.style.setProperty("--pointer-x", `${x}px`);
      ref.current.style.setProperty("--pointer-y", `${y}px`);

      if (tiltMax > 0) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Tilt intensity based on distance from center
        const tiltX = ((centerY - y) / centerY) * tiltMax;
        const tiltY = ((x - centerX) / centerX) * tiltMax;
        
        ref.current.style.setProperty("--tilt-x", `${tiltX}deg`);
        ref.current.style.setProperty("--tilt-y", `${tiltY}deg`);
      }
    };

    const handlePointerEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") setIsHovered(true);
    };

    const handlePointerLeave = () => {
      setIsHovered(false);
      if (ref.current) {
        ref.current.style.setProperty("--tilt-x", `0deg`);
        ref.current.style.setProperty("--tilt-y", `0deg`);
      }
    };

    const element = ref.current;
    element.addEventListener("pointermove", handlePointerMove);
    element.addEventListener("pointerenter", handlePointerEnter);
    element.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      element.removeEventListener("pointermove", handlePointerMove);
      element.removeEventListener("pointerenter", handlePointerEnter);
      element.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [shouldReduce, tiltMax, disabled]);

  const baseTransform = shouldReduce || disabled || !isHovered 
    ? "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)" 
    : `perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) ${activeTransform}`;

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        ...style,
        transform: baseTransform,
        transition: "transform 0.4s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.4s ease, background 0.4s ease",
      }}
      {...props}
    >
      {spotlight && !shouldReduce && !disabled && (
        <div 
          className="absolute inset-0 pointer-events-none rounded-inherit mix-blend-screen"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.4s ease",
            background: `radial-gradient(400px circle at var(--pointer-x, 50%) var(--pointer-y, 50%), ${spotlightColor}, transparent 40%)`,
            borderRadius: "inherit",
            zIndex: 1,
          }}
        />
      )}
      {children}
    </div>
  );
}
