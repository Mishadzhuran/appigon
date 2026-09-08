"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("appigon-loaded");
    if (seen) {
      setDone(true);
      return;
    }

    let value = 0;
    const tick = () => {
      value += Math.random() * 12 + 5;
      if (value >= 100) {
        setProgress(100);
        setTimeout(() => {
          setDone(true);
          sessionStorage.setItem("appigon-loaded", "1");
        }, 450);
        return;
      }
      setProgress(Math.floor(value));
      window.setTimeout(tick, 80 + Math.random() * 110);
    };
    tick();
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg px-6 py-8 md:px-10"
          exit={{
            opacity: 0,
            filter: "blur(12px)",
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between text-[12px] uppercase tracking-[0.2em] text-muted">
            <span>Appigon // 2026</span>
            <span>Booting systems</span>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <motion.p
              initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="soft-title text-[clamp(3.5rem,14vw,10rem)] text-red"
            >
              APPIGON
            </motion.p>
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
              <motion.div
                className="h-full rounded-full bg-red"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
