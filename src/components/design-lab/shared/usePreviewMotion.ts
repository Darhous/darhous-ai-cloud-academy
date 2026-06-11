"use client";

import { useEffect, useState } from "react";

export function usePreviewMotion() {
  const [reduced, setReduced] = useState(true);
  const [mobile, setMobile] = useState(true);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const update = () => {
      setReduced(motionQuery.matches);
      setMobile(mobileQuery.matches);
    };

    update();
    motionQuery.addEventListener("change", update);
    mobileQuery.addEventListener("change", update);
    return () => {
      motionQuery.removeEventListener("change", update);
      mobileQuery.removeEventListener("change", update);
    };
  }, []);

  return {
    reduced,
    mobile,
    allowAmbientMotion: !reduced && !mobile,
  };
}

