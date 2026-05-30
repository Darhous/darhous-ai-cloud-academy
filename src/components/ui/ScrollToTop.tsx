"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed z-40 transition-all duration-300 hover:scale-110 active:scale-95"
      style={{
        bottom: "96px",
        insetInlineEnd: "24px",
        width: "40px",
        height: "40px",
        borderRadius: "12px",
        background: "var(--color-surface-container)",
        border: "1px solid rgba(142,213,255,0.18)",
        color: "var(--color-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        backdropFilter: "blur(12px)",
        cursor: "pointer",
      }}
    >
      <ChevronUp size={18} />
    </button>
  );
}
