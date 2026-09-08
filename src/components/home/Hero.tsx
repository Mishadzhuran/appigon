"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MagneticButton, Shell } from "@/components/ui/Primitives";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(239,26,18,0.22),transparent_58%)]" />

      <div className="pointer-events-none absolute inset-x-0 top-[8%] mx-auto h-[48vh] max-w-5xl opacity-70 md:h-[54vh]">
        <HeroScene />
      </div>

      <Shell className="relative z-10 flex min-h-[100svh] flex-col items-center justify-end pb-16 pt-40 text-center md:pb-20 md:pt-44">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ease }}
          className="eyebrow mb-6 justify-center before:hidden"
        >
          App development · Store release · Ongoing support
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 42, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease }}
          className="soft-title max-w-5xl text-[clamp(3.2rem,10vw,7.4rem)]"
        >
          <span className="block text-red">Appigon</span>
          <span className="block text-text">ships apps</span>
          <span className="block text-text/55">to market</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.75, ease }}
          className="readable mx-auto mt-8 max-w-2xl"
        >
          We develop mobile apps, build conversion landing pages, handle App Store &
          Google Play release, and keep supporting the product after launch.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.7, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton href="/contact">Start a project</MagneticButton>
          <MagneticButton href="/cases" variant="outline">
            View cases
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-14 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.18em] text-muted-soft"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-red/60" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-red" />
          </span>
          Scroll — unlock the full journey
        </motion.div>
      </Shell>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg via-bg/80 to-transparent" />
    </section>
  );
}
