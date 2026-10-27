"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/** Premium floating phone with a live mini website UI on screen */
export function FloatingPhone({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), {
    stiffness: 120,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), {
    stiffness: 120,
    damping: 18,
  });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 60, rotateY: -18, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
      transition={{ duration: 1.25, delay: 0.35, ease }}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      className={`relative ${className}`}
    >
      <div className="animate-float-drift will-change-transform" style={{ transformStyle: "preserve-3d" }}>
        {/* Glow under phone */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-8 left-1/2 h-20 w-[80%] -translate-x-1/2 rounded-full bg-white/20 blur-3xl"
        />

        {/* Device shell */}
        <div
          className="relative mx-auto aspect-[9/19.5] w-full overflow-hidden rounded-[2.4rem] border border-white/25 bg-[#0a0a0b] shadow-[0_40px_100px_rgba(0,0,0,0.65),inset_0_0_0_1px_rgba(255,255,255,0.06)]"
          style={{ transform: "translateZ(40px)" }}
        >
          {/* Side highlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-6 left-0 w-px bg-gradient-to-b from-transparent via-white/35 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-6 right-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent"
          />

          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-3 z-20 h-6 w-[28%] -translate-x-1/2 rounded-full bg-black" />

          {/* Screen */}
          <div className="absolute inset-[7px] overflow-hidden rounded-[2rem] bg-[#f7f7f8]">
            <div className="phone-screen-scroll h-full w-full">
              <PhoneScreenUI />
            </div>
            {/* Glass sheen */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/5"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PhoneScreenUI() {
  return (
    <div className="min-h-[200%] bg-[#f4f4f5] px-3 pb-8 pt-10 text-[#0a0a0a]">
      {/* Status bar spacer */}
      <div className="mb-3 flex items-center justify-between px-1 text-[7px] font-medium tracking-wide text-black/40">
        <span>9:41</span>
        <span>●●● 5G</span>
      </div>

      {/* Mini nav */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-[-0.04em]">Misha</span>
        <span className="rounded-full bg-black px-2 py-1 text-[6px] font-medium uppercase tracking-[0.14em] text-white">
          Work
        </span>
      </div>

      {/* Hero block */}
      <div className="mb-3 overflow-hidden rounded-2xl bg-black p-3 text-white">
        <p className="text-[6px] uppercase tracking-[0.18em] text-white/45">Portfolio</p>
        <p className="mt-1 text-[15px] font-bold leading-none tracking-[-0.04em]">
          Build.
          <br />
          <span className="italic opacity-70">Ship.</span>
        </p>
        <p className="mt-2 text-[7px] leading-relaxed text-white/55">
          Apps · landings · market release
        </p>
        <div className="mt-3 h-1.5 w-16 rounded-full bg-white/90" />
      </div>

      {/* White cards */}
      <div className="space-y-2">
        {[
          { t: "Volt Finance", m: "+214% MAU", c: "Fintech" },
          { t: "Nightline", m: "3.4M installs", c: "Social" },
          { t: "Forge Health", m: "Series A", c: "Health" },
        ].map((card) => (
          <div
            key={card.t}
            className="rounded-xl border border-black/5 bg-white p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[9px] font-semibold tracking-[-0.03em]">{card.t}</p>
                <p className="mt-0.5 text-[6px] text-black/40">{card.c}</p>
              </div>
              <p className="text-[8px] font-semibold tracking-[-0.02em]">{card.m}</p>
            </div>
            <div className="mt-2 h-8 overflow-hidden rounded-lg bg-gradient-to-br from-[#ececec] via-[#f8f8f8] to-[#e4e4e4]">
              <div className="m-1.5 space-y-1">
                <div className="h-1 w-2/3 rounded-full bg-black/10" />
                <div className="h-1 w-1/2 rounded-full bg-black/8" />
                <div className="h-1 w-3/4 rounded-full bg-black/6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
        <p className="text-[8px] font-semibold tracking-[-0.02em]">Let’s ship something sharp</p>
        <div className="mt-2 flex gap-1.5">
          <div className="h-5 flex-1 rounded-full bg-black" />
          <div className="h-5 w-5 rounded-full border border-black/15" />
        </div>
      </div>
    </div>
  );
}
