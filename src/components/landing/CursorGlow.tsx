"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = blobRef.current;
    if (!el) return;

    let raf = 0;
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let tx = cx;
    let ty = cy;

    function onMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
    }

    function tick() {
      // Smooth lerp so the glow lags slightly behind the cursor
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      el!.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={blobRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 will-change-transform"
      style={{ zIndex: 0 }}
    >
      {/* Outer soft halo */}
      <div
        className="rounded-full"
        style={{
          width: "600px",
          height: "600px",
          marginLeft: "-300px",
          marginTop: "-300px",
          background: "radial-gradient(circle, rgba(142,213,255,0.045) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Inner bright core */}
      <div
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{
          width: "120px",
          height: "120px",
          marginLeft: "-60px",
          marginTop: "-60px",
          background: "radial-gradient(circle, rgba(142,213,255,0.12) 0%, transparent 70%)",
          filter: "blur(16px)",
        }}
      />
    </div>
  );
}
