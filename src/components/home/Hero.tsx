"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { site } from "@/data/site";
import { PremiumPhone } from "./PremiumPhone";
import { ToolIcons } from "./ToolIcons";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-x-clip pb-10 pt-24 md:pb-20 md:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(10,132,255,0.12), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1100px] px-4 md:px-8">
        <motion.div
          className="mx-auto max-w-xl text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
        >
          <h1 className="text-[clamp(1.85rem,7.2vw,3.6rem)] font-semibold leading-[1.1] tracking-[-0.045em] text-[#1d1d1f]">
            I help people build
            <br />
            products that feel easy.
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[#6e6e73] md:mt-4 md:text-[16px]">
            Apps and websites — from idea to launch.
          </p>
          <div className="mt-6 flex flex-col items-stretch justify-center gap-2.5 px-2 sm:mt-7 sm:flex-row sm:items-center sm:gap-3 sm:px-0">
            <Link
              href="/contact"
              className="rounded-full bg-[#0071e3] px-7 py-3.5 text-center text-[15px] font-semibold !text-white transition hover:bg-[#0077ed]"
            >
              Start a project
            </Link>
            <Link
              href="/#work"
              className="rounded-full bg-black/[0.05] px-7 py-3.5 text-center text-[15px] font-semibold text-[#1d1d1f] transition hover:bg-black/[0.08]"
            >
              See work
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="relative mt-10 overflow-x-clip md:mt-20 md:overflow-visible"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease }}
        >
          <div className="relative mx-0 md:mx-8">
            <div className="relative overflow-hidden rounded-[28px] bg-white/75 shadow-[0_24px_70px_rgba(0,0,0,0.07)] ring-1 ring-black/[0.04] backdrop-blur-xl md:overflow-visible md:rounded-[40px]">
              <ToolIcons />
              <div className="relative z-10 flex justify-center px-4 py-12 sm:px-8 sm:py-14 md:px-16 md:py-20">
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

        <p className="mt-8 text-center text-[13px] text-[#86868b] md:mt-10">
          {site.name} · {site.locations[0]}
        </p>
      </div>
    </section>
  );
}
