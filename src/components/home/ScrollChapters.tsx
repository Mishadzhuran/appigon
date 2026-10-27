"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Shell } from "@/components/ui/Primitives";

const steps = [
  {
    n: "01",
    title: "We talk",
    line: "You share the idea. I ask a few simple questions.",
    detail: "15–30 min",
  },
  {
    n: "02",
    title: "We agree",
    line: "Clear plan, timeline, and price — in writing.",
    detail: "Scope locked",
  },
  {
    n: "03",
    title: "We build",
    line: "I design and develop. You see progress along the way.",
    detail: "Weekly builds",
  },
  {
    n: "04",
    title: "We launch",
    line: "Your app or website goes live. I stay for support.",
    detail: "Store-ready",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function ScrollChapters() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setActive((n) => (n + 1) % steps.length),
      4000,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="services" className="relative scroll-mt-28 overflow-x-clip py-16 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(0,113,227,0.14), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] h-[320px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0071e3]/10 blur-3xl"
      />

      <Shell className="relative">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-[clamp(1.9rem,4vw,2.7rem)] font-semibold tracking-[-0.04em] text-[#1d1d1f]">
            How we work
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-[#6e6e73]">
            Four calm steps — the same flow you see on the phone.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-4 md:gap-5">
          {steps.map((step, i) => {
            const on = i === active;
            return (
              <motion.button
                key={step.n}
                type="button"
                onClick={() => setActive(i)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: i * 0.07, ease }}
                animate={{
                  y: on ? -8 : 0,
                  scale: on ? 1.02 : 1,
                }}
                className={`rounded-[28px] p-6 text-left md:rounded-[32px] md:p-7 ${
                  on
                    ? "bg-white/90 shadow-[0_24px_60px_rgba(0,113,227,0.18)] ring-1 ring-[#0071e3]/25 backdrop-blur-xl"
                    : "bg-white/75 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.04] backdrop-blur-xl"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <motion.span
                    animate={{
                      backgroundColor: on ? "#0071e3" : "#f5f5f7",
                      color: on ? "#ffffff" : "#1d1d1f",
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-semibold"
                  >
                    {step.n}
                  </motion.span>
                  <span className="text-[13px] font-medium text-[#86868b]">
                    {step.detail}
                  </span>
                </div>
                <h3 className="mt-6 text-[22px] font-semibold tracking-[-0.03em] text-[#1d1d1f]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#6e6e73]">
                  {step.line}
                </p>
              </motion.button>
            );
          })}
        </div>
      </Shell>
    </section>
  );
}
