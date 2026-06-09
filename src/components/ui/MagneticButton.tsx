"use client";

import React, { useRef, useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  movement?: number;
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  className = "",
  movement = 6,
  disabled = false,
  ...props
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (shouldReduce || disabled || !ref.current) return;

    const handlePointerMove = (e: PointerEvent) => {
      // Only apply to fine pointers
      if (e.pointerType !== "mouse") return;
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = ((e.clientX - centerX) / (rect.width / 2)) * movement;
      const y = ((e.clientY - centerY) / (rect.height / 2)) * movement;
      
      setPosition({ x, y });
    };

    const handlePointerEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") setIsHovered(true);
    };

    const handlePointerLeave = () => {
      setIsHovered(false);
      setPosition({ x: 0, y: 0 });
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
  }, [shouldReduce, movement, disabled]);

  return (
    <div
      ref={ref}
      className={`relative inline-flex ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isHovered ? "transform 0.1s cubic-bezier(0.2, 0, 0, 1)" : "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      {...props}
    >
      {children}
    </div>
  );
}
