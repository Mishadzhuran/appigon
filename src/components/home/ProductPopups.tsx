"use client";

import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import { cases, site } from "@/data/site";
import { Shell } from "@/components/ui/Primitives";

const ease = [0.22, 1, 0.36, 1] as const;

function CardShell({
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay, ease }}
      whileHover={{ y: -3 }}
      className={`rounded-[28px] bg-white/90 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.07)] ring-1 ring-black/[0.05] backdrop-blur-xl md:rounded-[32px] md:p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function PulseCard() {
  const rows = [
    { label: "Discovery call", meta: "Booked", tone: "text-[#0071e3] bg-[#eef3ff]" },
    { label: "Written scope", meta: "Signed", tone: "text-[#248a3d] bg-[#e8f8ef]" },
    { label: "First TestFlight", meta: "Week 2–3", tone: "text-[#1d1d1f] bg-[#f5f5f7]" },
  ];
  return (
    <CardShell delay={0.05}>
      <p className="text-[20px] font-semibold tracking-[-0.03em] text-[#1d1d1f]">
        Week one
      </p>
      <ul className="mt-4 space-y-2">
        {rows.map((r, i) => (
          <motion.li
            key={r.label}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 + i * 0.07, duration: 0.35, ease }}
            className="flex items-center justify-between gap-3 rounded-[14px] bg-[#f5f5f7] px-3.5 py-3"
          >
            <p className="text-[14px] font-semibold text-[#1d1d1f]">{r.label}</p>
            <span
              className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${r.tone}`}
            >
              {r.meta}
            </span>
          </motion.li>
        ))}
      </ul>
    </CardShell>
  );
}

function UsersCard() {
  const count = useMotionValue(5000);
  const spring = useSpring(count, { stiffness: 55, damping: 18 });
  const display = useTransform(spring, (v) =>
    `${Math.round(v).toLocaleString("en-US")}+`,
  );

  useEffect(() => {
    count.set(0);
    const controls = animate(count, 5000, {
      duration: 1.7,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.2,
    });
    return controls.stop;
  }, [count]);

  const bars = [30, 38, 34, 50, 46, 60, 54, 72, 66, 84, 78, 96];

  return (
    <CardShell delay={0.08} className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[#34c759]/25 blur-3xl"
      />
      <div className="relative flex items-center gap-3">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f8ef]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 11.5L6.2 8.1l2.3 2.2L13 5"
              stroke="#34c759"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 5h3v3"
              stroke="#34c759"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        <div>
          <p className="text-[13px] font-medium text-[#6e6e73]">Live users</p>
          <motion.p className="text-[28px] font-semibold tracking-[-0.04em] text-[#1d1d1f]">
            {display}
          </motion.p>
        </div>
      </div>
      <div className="relative mt-5 flex h-12 items-end gap-1">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className="origin-bottom flex-1 rounded-sm bg-gradient-to-t from-[#34c759]/50 to-[#34c759]"
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 + i * 0.04, duration: 0.45, ease }}
          />
        ))}
      </div>
      <p className="relative mt-3 text-[13px] font-semibold text-[#34c759]">
        Growing every launch
      </p>
    </CardShell>
  );
}

function ReleaseCard() {
  const items = ["Privacy labels", "Screenshots", "Review notes"];
  return (
    <CardShell delay={0.1}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-[20px] font-semibold tracking-[-0.03em] text-[#1d1d1f]">
          Store-ready
        </p>
        <span className="rounded-full bg-[#0071e3] px-3 py-1.5 text-[12px] font-semibold !text-white">
          Live
        </span>
      </div>
      <div className="mt-4 space-y-2.5">
        {items.map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 + i * 0.06, duration: 0.3, ease }}
            className="flex items-center justify-between"
          >
            <p className="text-[14px] text-[#1d1d1f]">{t}</p>
            <p className="text-[12px] font-semibold text-[#34c759]">Done</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-[16px] bg-[#f5f5f7] p-3">
        <div className="relative h-9 w-9 overflow-hidden rounded-full">
          <Image
            src="/me/portrait.jpg"
            alt=""
            fill
            className="object-cover object-[center_18%]"
            sizes="36px"
          />
        </div>
        <p className="text-[13px] font-semibold text-[#1d1d1f]">
          Reply in {site.responseTime}
        </p>
      </div>
    </CardShell>
  );
}

function NumbersCard() {
  const items = [
    { value: "120+", label: "Shipped" },
    { value: "38", label: "Markets" },
    { value: "4.9", label: "Score" },
    { value: "1 day", label: "Reply" },
  ];
  return (
    <CardShell delay={0.08}>
      <p className="text-[20px] font-semibold tracking-[-0.03em] text-[#1d1d1f]">
        Track record
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {items.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 + i * 0.05, duration: 0.35, ease }}
            className="rounded-[14px] bg-[#f5f5f7] px-3 py-3"
          >
            <p className="text-[22px] font-semibold tracking-[-0.04em] text-[#1d1d1f]">
              {s.value}
            </p>
            <p className="mt-0.5 text-[12px] text-[#6e6e73]">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </CardShell>
  );
}

function WorkCard() {
  return (
    <CardShell delay={0.1}>
      <p className="text-[20px] font-semibold tracking-[-0.03em] text-[#1d1d1f]">
        Recent ships
      </p>
      <ul className="mt-4 space-y-2">
        {cases.slice(0, 4).map((c, i) => (
          <motion.li
            key={c.slug}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 + i * 0.05, duration: 0.35, ease }}
            className="flex items-center gap-3 rounded-[14px] bg-[#f5f5f7] px-3 py-2.5"
          >
            <span
              className="h-8 w-8 shrink-0 rounded-[10px]"
              style={{ backgroundColor: c.color }}
            />
            <p className="min-w-0 flex-1 truncate text-[14px] font-semibold text-[#1d1d1f]">
              {c.title}
            </p>
            <span className="shrink-0 text-[11px] text-[#86868b]">{c.year}</span>
          </motion.li>
        ))}
      </ul>
    </CardShell>
  );
}

function ClientsCard() {
  const points = [
    { k: "You approve", v: "Every milestone" },
    { k: "Updates", v: "Always open" },
    { k: "Scope", v: "Written first" },
    { k: "After", v: "Still here" },
  ];
  return (
    <CardShell
      delay={0.12}
      className="relative overflow-hidden bg-gradient-to-br from-white via-white to-[#f0f4ff]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-8 h-36 w-36 rounded-full bg-[#0071e3]/10 blur-3xl"
      />
      <p className="relative text-[20px] font-semibold tracking-[-0.03em] text-[#1d1d1f]">
        Working together
      </p>
      <div className="relative mt-4 grid grid-cols-2 gap-2">
        {points.map((s, i) => (
          <motion.div
            key={s.k}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 + i * 0.05, duration: 0.3, ease }}
            className="rounded-[14px] bg-white/90 px-3 py-2.5 ring-1 ring-black/[0.04]"
          >
            <p className="text-[11px] font-semibold text-[#86868b]">{s.k}</p>
            <p className="mt-0.5 text-[13px] font-semibold text-[#1d1d1f]">
              {s.v}
            </p>
          </motion.div>
        ))}
      </div>
      <Link
        href="/contact"
        className="relative mt-4 flex items-center justify-between rounded-[16px] bg-[#1d1d1f] px-4 py-3 transition hover:bg-black"
      >
        <span className="text-[14px] font-semibold !text-white">
          Start a conversation
        </span>
        <span className="text-[13px] !text-white/70">→</span>
      </Link>
    </CardShell>
  );
}

export function ProductPopups() {
  return (
    <section className="relative overflow-x-clip py-12 md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 mx-auto h-[280px] max-w-3xl rounded-full bg-[#34c759]/08 blur-3xl"
      />
      <Shell className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(1.9rem,4vw,2.7rem)] font-semibold tracking-[-0.04em] text-[#1d1d1f]">
            What you get
          </h2>
        </div>

        <div className="relative mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3 md:gap-5">
          <PulseCard />
          <UsersCard />
          <ReleaseCard />
          <NumbersCard />
          <WorkCard />
          <ClientsCard />
        </div>
      </Shell>
    </section>
  );
}
