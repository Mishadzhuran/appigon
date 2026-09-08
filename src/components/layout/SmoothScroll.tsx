"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    ScrollTrigger.refresh();
    gsap.ticker.lagSmoothing(0);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.1,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.1,
      }}
    >
      {children}
    </ReactLenis>
  );
}
