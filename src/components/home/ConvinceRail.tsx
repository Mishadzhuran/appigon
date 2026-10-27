"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    title: "One person. Full loop.",
    line: "Design, build, and launch — without handing your product between five freelancers.",
  },
  {
    title: "Written plan first.",
    line: "Scope, timeline, and price before any work starts. You always know the deal.",
  },
  {
    title: "You see progress.",
    line: "Regular updates you can open and check — no black boxes.",
  },
  {
    title: "Launch without panic.",
    line: "TestFlight, store release, and the quiet work that makes go-live calm.",
  },
  {
    title: "Still here after.",
    line: "Fixes, polish, and care after day one — so users keep coming back.",
  },
  {
    title: "Built for people.",
    line: "Interfaces that feel clear and soft — so your product is easy to trust.",
  },
];

function Rail({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex gap-4 overflow-x-auto px-5 pb-3 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-5 md:px-8 [&::-webkit-scrollbar]:hidden"
      style={{ scrollSnapType: "x mandatory" }}
    >
      {children}
    </div>
  );
}

export function ConvinceRail() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-xl px-5 text-center md:px-8">
        <h2 className="text-[clamp(1.7rem,3.5vw,2.4rem)] font-semibold tracking-[-0.04em] text-[#1d1d1f]">
          Why people work with me
        </h2>
        <p className="mt-2 text-[15px] text-[#6e6e73]">
          Swipe the cards — everything that keeps the project safe and clear.
        </p>
      </div>

      <div className="mt-8 md:mt-10">
        <Rail>
          {reasons.map((r, i) => (
            <motion.article
              key={r.title}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: Math.min(i, 3) * 0.04 }}
              className="w-[min(78vw,300px)] shrink-0 rounded-[28px] bg-white/80 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.04] backdrop-blur-xl md:w-[320px] md:rounded-[32px] md:p-7"
              style={{ scrollSnapAlign: "start" }}
            >
              <span className="text-[12px] font-semibold text-[#0071e3]">
                0{i + 1}
              </span>
              <h3 className="mt-3 text-[19px] font-semibold tracking-[-0.03em] text-[#1d1d1f]">
                {r.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#6e6e73]">
                {r.line}
              </p>
            </motion.article>
          ))}
        </Rail>
      </div>
    </section>
  );
}
