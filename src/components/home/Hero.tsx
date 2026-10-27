"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { site } from "@/data/site";
import { PremiumPhone } from "./PremiumPhone";
import { ToolIcons } from "./ToolIcons";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-x-clip pb-14 pt-28 md:pb-20 md:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(10,132,255,0.12), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1100px] px-5 md:px-8">
        <motion.div
          className="mx-auto max-w-xl text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
        >
          <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-[#1d1d1f]">
            I help people build
            <br />
            products that feel easy.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-[#6e6e73]">
            Apps and websites — from idea to launch.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-[#0071e3] px-7 py-3.5 text-[15px] font-semibold !text-white transition hover:bg-[#0077ed]"
            >
              Start a project
            </Link>
            <Link
              href="/#work"
              className="rounded-full bg-black/[0.05] px-7 py-3.5 text-[15px] font-semibold text-[#1d1d1f] transition hover:bg-black/[0.08]"
            >
              See work
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="relative mt-16 overflow-visible md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease }}
        >
          <div className="relative mx-4 md:mx-8">
            <div className="relative overflow-visible rounded-[36px] bg-white/75 shadow-[0_24px_70px_rgba(0,0,0,0.07)] ring-1 ring-black/[0.04] backdrop-blur-xl md:rounded-[40px]">
              <ToolIcons />
              <div className="relative z-10 flex justify-center px-8 py-16 md:px-16 md:py-20">
                <div className="relative">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-2 left-1/2 h-10 w-[70%] -translate-x-1/2 rounded-full bg-black/15 blur-2xl"
                  />
                  <PremiumPhone />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <p className="mt-10 text-center text-[13px] text-[#86868b]">
          {site.name} · {site.locations[0]}
        </p>
      </div>
    </section>
  );
}
