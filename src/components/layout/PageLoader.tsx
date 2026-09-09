"use client";

import { useEffect, useState } from "react";

/** CSS-only boot screen — no Framer on the critical path */
export function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("appigon-loaded")) {
        setDone(true);
        return;
      }
    } catch {
      /* private mode */
    }

    // Skip theatrical loader for automated audits / reduced motion
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bot =
      typeof navigator !== "undefined" &&
      (/bot|crawl|spider/i.test(navigator.userAgent) ||
        (navigator as Navigator & { webdriver?: boolean }).webdriver);

    if (reduce || bot) {
      setDone(true);
      try {
        sessionStorage.setItem("appigon-loaded", "1");
      } catch {
        /* ignore */
      }
      return;
    }

    let value = 0;
    let timer = 0;
    const tick = () => {
      value += Math.random() * 22 + 14;
      if (value >= 100) {
        setProgress(100);
        setHiding(true);
        timer = window.setTimeout(() => {
          setDone(true);
          try {
            sessionStorage.setItem("appigon-loaded", "1");
          } catch {
            /* ignore */
          }
        }, 280);
        return;
      }
      setProgress(Math.min(100, Math.floor(value)));
      timer = window.setTimeout(tick, 40 + Math.random() * 50);
    };
    tick();
    return () => window.clearTimeout(timer);
  }, []);

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-between bg-bg px-6 py-8 transition-all duration-500 ease-out md:px-10 ${
        hiding ? "pointer-events-none scale-[1.02] opacity-0 blur-md" : "opacity-100"
      }`}
      aria-hidden={hiding}
    >
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between text-[12px] uppercase tracking-[0.2em] text-muted">
        <span>Appigon // 2026</span>
        <span>Booting systems</span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="soft-title text-[clamp(3.5rem,14vw,10rem)] text-red">
          APPIGON
        </p>
        <p className="mt-5 text-[15px] text-muted">Apps. Built to dominate.</p>
      </div>

      <div className="mx-auto w-full max-w-5xl space-y-4">
        <div className="flex items-end justify-between">
          <span className="text-[12px] uppercase tracking-[0.18em] text-muted">
            Loading experience
          </span>
          <span className="soft-title text-5xl leading-none text-text md:text-6xl">
            {progress}%
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-red transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
