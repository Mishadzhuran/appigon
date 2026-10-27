"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

export function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("misha-loaded-v2")) {
        setDone(true);
        return;
      }
    } catch {
      /* private mode */
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bot =
      typeof navigator !== "undefined" &&
      (/bot|crawl|spider/i.test(navigator.userAgent) ||
        (navigator as Navigator & { webdriver?: boolean }).webdriver);

    if (reduce || bot) {
      setDone(true);
      try {
        sessionStorage.setItem("misha-loaded-v2", "1");
      } catch {
        /* ignore */
      }
      return;
    }

    let value = 0;
    let timer = 0;
    const tick = () => {
      value += Math.random() * 24 + 16;
      if (value >= 100) {
        setProgress(100);
        setHiding(true);
        timer = window.setTimeout(() => {
          setDone(true);
          try {
            sessionStorage.setItem("misha-loaded-v2", "1");
          } catch {
            /* ignore */
          }
        }, 280);
        return;
      }
      setProgress(Math.min(100, Math.floor(value)));
      timer = window.setTimeout(tick, 36 + Math.random() * 40);
    };
    tick();
    return () => window.clearTimeout(timer);
  }, []);

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f5f5f7] transition-all duration-500 ease-out ${
        hiding ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={hiding}
    >
      <p className="font-display text-3xl font-bold tracking-[-0.04em] text-text">
        {site.shortName}
      </p>
      <div className="mt-8 h-1 w-40 overflow-hidden rounded-full bg-black/10">
        <div
          className="h-full rounded-full bg-[#1d1d1f] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
