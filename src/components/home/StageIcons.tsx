"use client";

import { motion } from "framer-motion";

/** Large soft 3D-like icons for the phone stage background */
export function StageIcons() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* giant watermark */}
      <div className="absolute inset-x-0 top-[12%] flex justify-center">
        <span className="select-none text-[clamp(5rem,18vw,11rem)] font-bold tracking-[-0.06em] text-black/[0.06]">
          SHIP
        </span>
      </div>

      <IconFloat className="left-[6%] top-[18%] md:left-[10%]" delay={0}>
        <CubeIcon />
      </IconFloat>
      <IconFloat className="right-[7%] top-[22%] md:right-[11%]" delay={0.4}>
        <PinIcon />
      </IconFloat>
      <IconFloat className="bottom-[16%] left-[8%] md:left-[12%]" delay={0.8}>
        <PersonIcon />
      </IconFloat>
      <IconFloat className="bottom-[18%] right-[6%] md:right-[10%]" delay={1.1}>
        <SparkIcon />
      </IconFloat>
      <IconFloat className="left-[42%] bottom-[8%] hidden md:block" delay={1.4}>
        <RocketIcon />
      </IconFloat>
    </div>
  );
}

function IconFloat({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { duration: 0.7, delay },
        scale: { duration: 0.7, delay },
        y: {
          duration: 5.5 + delay,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
    >
      {children}
    </motion.div>
  );
}

function shell(children: React.ReactNode, from: string, to: string) {
  return (
    <div
      className="flex h-[72px] w-[72px] items-center justify-center rounded-[22px] md:h-[88px] md:w-[88px] md:rounded-[26px]"
      style={{
        background: `linear-gradient(145deg, ${from}, ${to})`,
        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,0.45),
          inset 0 -10px 18px rgba(0,0,0,0.18),
          0 18px 36px rgba(0,0,0,0.14)
        `,
      }}
    >
      {children}
    </div>
  );
}

function CubeIcon() {
  return shell(
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path
        d="M18 5L30 12V24L18 31L6 24V12L18 5Z"
        fill="rgba(255,255,255,0.92)"
      />
      <path d="M18 5V18L30 12L18 5Z" fill="rgba(255,255,255,0.55)" />
      <path d="M18 18V31L30 24V12L18 18Z" fill="rgba(0,0,0,0.12)" />
    </svg>,
    "#5ac8fa",
    "#0071e3",
  );
}

function PinIcon() {
  return shell(
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <path
        d="M17 4C11.5 4 7 8.4 7 13.8C7 21.2 17 30 17 30C17 30 27 21.2 27 13.8C27 8.4 22.5 4 17 4Z"
        fill="rgba(255,255,255,0.95)"
      />
      <circle cx="17" cy="14" r="4.2" fill="#ff453a" />
    </svg>,
    "#ff6961",
    "#d70015",
  );
}

function PersonIcon() {
  return shell(
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <circle cx="17" cy="12" r="6" fill="rgba(255,255,255,0.95)" />
      <path
        d="M6 29C6 23.5 10.5 20 17 20C23.5 20 28 23.5 28 29"
        stroke="rgba(255,255,255,0.95)"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>,
    "#64d2ff",
    "#0a84ff",
  );
}

function SparkIcon() {
  return shell(
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <path
        d="M17 3L19.8 14.2L31 17L19.8 19.8L17 31L14.2 19.8L3 17L14.2 14.2L17 3Z"
        fill="rgba(255,255,255,0.95)"
      />
    </svg>,
    "#ffd60a",
    "#ff9f0a",
  );
}

function RocketIcon() {
  return shell(
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <path
        d="M17 4C21 8 23 13 23 18L19.5 28H14.5L11 18C11 13 13 8 17 4Z"
        fill="rgba(255,255,255,0.95)"
      />
      <circle cx="17" cy="14" r="2.4" fill="#30d158" />
      <path d="M11 20L7 24" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M23 20L27 24" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>,
    "#30d158",
    "#248a3d",
  );
}
