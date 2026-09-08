"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode, useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Shell({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div className={`${wide ? "shell-wide" : "shell"} ${className}`}>{children}</div>
  );
}

export function MagneticButton({
  children,
  href,
  className = "",
  variant = "primary",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "ghost" | "outline";
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.22}px, ${y * 0.28}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 ease-out will-change-transform";

  const variants = {
    primary: "bg-red text-white hover:bg-red-bright",
    ghost: "bg-transparent text-text hover:text-red",
    outline:
      "border border-line bg-transparent text-text hover:border-red/60 hover:text-red",
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </>
  );

  const shared = {
    className: `${base} ${variants[variant]} ${className}`,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
  };

  if (href) {
    return (
      <Link
        href={href}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        {...shared}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      ref={ref as React.RefObject<HTMLButtonElement>}
      {...shared}
    >
      {content}
    </button>
  );
}

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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%", amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({
  children,
  align = "left",
}: {
  children: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`eyebrow mb-5 ${align === "center" ? "justify-center before:hidden" : ""}`}
    >
      {children}
    </div>
  );
}

export function BigTitle({
  children,
  className = "",
  align = "left",
}: {
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <h2
      className={`soft-title text-[clamp(2.4rem,6.5vw,5.4rem)] ${
        align === "center" ? "text-center" : ""
      } ${className}`}
    >
      {children}
    </h2>
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
