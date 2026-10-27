"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { SectionLabel, Shell } from "@/components/ui/Shell";

export {
  Shell,
  MagneticButton,
  SectionLabel,
  BigTitle,
} from "@/components/ui/Shell";

const ease = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%", amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden pb-14 pt-36 md:pb-20 md:pt-44">
      <Shell className="relative text-center">
        <SectionLabel align="center">{eyebrow}</SectionLabel>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
          className="soft-title mx-auto max-w-4xl text-[clamp(2.8rem,8vw,6.2rem)]"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease }}
          className="readable mx-auto mt-7 max-w-2xl"
        >
          {description}
        </motion.p>
      </Shell>
    </section>
  );
}
