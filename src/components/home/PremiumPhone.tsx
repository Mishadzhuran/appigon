"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const FLOW = [
  { id: "talk", label: "Talk", title: "Talk" },
  { id: "agree", label: "Agree", title: "Agree" },
  { id: "build", label: "Build", title: "Build" },
  { id: "launch", label: "Launch", title: "Launch" },
] as const;

function Glass({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`liquid-glass rounded-[16px] ${className}`}>{children}</div>
  );
}

function ScreenTalk() {
  return (
    <div className="flex h-full flex-col gap-2">
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.05, duration: 0.4, ease }}
        className="ml-auto max-w-[84%] rounded-[16px] rounded-br-[4px] bg-[#0071e3] px-3 py-2 shadow-[0_8px_18px_rgba(0,113,227,0.28)]"
      >
        <p className="text-[12px] leading-snug !text-white">
          I want to build an app.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.18, duration: 0.4, ease }}
      >
        <Glass className="max-w-[86%] rounded-bl-[4px] px-3 py-2">
          <p className="text-[12px] leading-snug text-[#1d1d1f]">
            What’s the first win?
          </p>
        </Glass>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4, ease }}
        className="ml-auto max-w-[84%] rounded-[16px] rounded-br-[4px] bg-[#0071e3] px-3 py-2 shadow-[0_8px_18px_rgba(0,113,227,0.28)]"
      >
        <p className="text-[12px] leading-snug !text-white">MVP in 6 weeks.</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42, duration: 0.4, ease }}
        className="mt-auto"
      >
        <Glass className="flex items-center justify-between px-3 py-2.5">
          <span className="text-[12px] font-semibold text-[#1d1d1f]">
            Intro call
          </span>
          <span className="rounded-full bg-[#0071e3]/12 px-2 py-0.5 text-[10px] font-semibold text-[#0071e3]">
            20 min
          </span>
        </Glass>
      </motion.div>
    </div>
  );
}

function ScreenAgree() {
  const rows = [
    { k: "Scope", v: "MVP" },
    { k: "Time", v: "6 weeks" },
    { k: "Price", v: "Fixed" },
  ];
  return (
    <div className="flex flex-col gap-2">
      <Glass className="overflow-hidden">
        {rows.map((row, i) => (
          <motion.div
            key={row.k}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.06 + i * 0.07, duration: 0.35, ease }}
            className={`flex items-center justify-between px-3 py-2.5 ${
              i < rows.length - 1 ? "border-b border-black/[0.05]" : ""
            }`}
          >
            <span className="text-[12px] text-[#6e6e73]">{row.k}</span>
            <span className="text-[13px] font-semibold text-[#1d1d1f]">
              {row.v}
            </span>
          </motion.div>
        ))}
      </Glass>
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.32, type: "spring", stiffness: 280, damping: 18 }}
      >
        <Glass className="flex items-center gap-2 px-3 py-2.5">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.45,
              type: "spring",
              stiffness: 420,
              damping: 15,
            }}
            className="flex h-5 w-5 items-center justify-center rounded-full bg-[#34c759] text-[10px] font-bold !text-white"
          >
            ✓
          </motion.span>
          <p className="text-[12px] font-semibold text-[#1d1d1f]">Confirmed</p>
        </Glass>
      </motion.div>
    </div>
  );
}

function ScreenBuild() {
  const items = [
    { t: "Design", s: "Done", c: "text-[#34c759]" },
    { t: "iOS & web", s: "Live", c: "text-[#0071e3]" },
    { t: "TestFlight", s: "Next", c: "text-[#86868b]" },
    { t: "Store", s: "Queued", c: "text-[#86868b]" },
  ];
  return (
    <div className="flex h-full flex-col gap-2">
      <Glass className="px-3 py-3">
        <div className="flex items-end justify-between">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[28px] font-semibold tracking-[-0.05em] text-[#1d1d1f]"
          >
            72%
          </motion.p>
          <p className="pb-0.5 text-[11px] font-semibold text-[#0071e3]">
            Week 4
          </p>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
          <motion.div
            className="h-full rounded-full bg-[#0071e3]"
            initial={{ width: 0 }}
            animate={{ width: "72%" }}
            transition={{ duration: 0.9, ease }}
          />
        </div>
      </Glass>
      <Glass className="overflow-hidden">
        {items.map((item, i) => (
          <motion.div
            key={item.t}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.32, ease }}
            className={`flex items-center justify-between px-3 py-2.5 ${
              i < items.length - 1 ? "border-b border-black/[0.05]" : ""
            }`}
          >
            <span className="text-[12px] text-[#1d1d1f]">{item.t}</span>
            <span className={`text-[11px] font-semibold ${item.c}`}>
              {item.s}
            </span>
          </motion.div>
        ))}
      </Glass>
    </div>
  );
}

function ScreenLaunch() {
  const checks = [
    { t: "Privacy labels", d: 0.18 },
    { t: "Screenshots", d: 0.28 },
    { t: "Review notes", d: 0.38 },
    { t: "Soft launch", d: 0.48 },
  ];
  return (
    <div className="flex h-full flex-col gap-2">
      <Glass className="px-3 py-3.5 text-center">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className="relative mx-auto w-fit"
        >
          <motion.span
            aria-hidden
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[-8px] rounded-[18px] bg-[#0071e3]/30"
          />
          <div className="relative flex h-11 w-11 items-center justify-center rounded-[13px] bg-[#0071e3] shadow-[0_10px_24px_rgba(0,113,227,0.4)]">
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                d="M12 3l1.8 5.5H19l-4.4 3.2 1.7 5.3L12 13.8 7.7 17l1.7-5.3L5 8.5h5.2L12 3z"
                fill="white"
              />
            </motion.svg>
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.35, ease }}
          className="mt-2.5 text-[14px] font-semibold tracking-[-0.02em] text-[#1d1d1f]"
        >
          App Store ready
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.35 }}
          className="mt-0.5 text-[10px] font-medium text-[#0071e3]"
        >
          Submitted for review
        </motion.p>
      </Glass>
      <div className="space-y-1.5">
        {checks.map((c) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: c.d, duration: 0.35, ease }}
          >
            <Glass className="flex items-center justify-between px-3 py-2">
              <span className="text-[11px] text-[#1d1d1f]">{c.t}</span>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: c.d + 0.12,
                  type: "spring",
                  stiffness: 400,
                  damping: 14,
                }}
                className="flex h-4 w-4 items-center justify-center rounded-full bg-[#34c759] text-[8px] font-bold !text-white"
              >
                ✓
              </motion.span>
            </Glass>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const BODIES = [ScreenTalk, ScreenAgree, ScreenBuild, ScreenLaunch];

const TAB_ICONS = [
  <path
    key="t"
    d="M4 6.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v7A2.5 2.5 0 0117.5 16H9l-4 3v-3.5A2.5 2.5 0 014 13.5v-7z"
    fill="currentColor"
  />,
  <path
    key="a"
    d="M9.2 16.4L5.5 12.7l1.4-1.4 2.3 2.3 6-6 1.4 1.4-7.4 7.4z"
    fill="currentColor"
  />,
  <path
    key="b"
    d="M7 18h10v-2H7v2zm0-4h10v-2H7v2zm0-4h10V8H7v2zm0-4h10V4H7v2z"
    fill="currentColor"
  />,
  <path
    key="l"
    d="M12 3l1.6 4.9H19l-4 2.9 1.5 4.7L12 12.8 7.5 15.5 9 10.8 5 7.9h5.4L12 3z"
    fill="currentColor"
  />,
];

export function PremiumPhone({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const Body = BODIES[i];
  const step = FLOW[i];

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(
      () => setI((n) => (n + 1) % FLOW.length),
      4200,
    );
    return () => window.clearInterval(id);
  }, [paused]);

  const go = (idx: number) => {
    setPaused(true);
    setI(idx);
  };

  return (
    <div className={`relative mx-auto ${className}`}>
      <div
        className="relative mx-auto"
        style={{
          width: 270,
          aspectRatio: "391 / 800",
          filter:
            "drop-shadow(0 28px 50px rgba(0,0,0,0.18)) drop-shadow(0 8px 16px rgba(0,0,0,0.08))",
        }}
      >
        {/* Screen sits in pre-cut transparent hole of iphone-device.png */}
        <div
          className="absolute z-0 overflow-hidden"
          style={{
            left: "4.4%",
            right: "4.2%",
            top: "1.6%",
            bottom: "1.6%",
            borderRadius: "44px",
            background:
              "linear-gradient(165deg, #e8eef8 0%, #f5f5f7 40%, #eef2f8 100%)",
          }}
        >
          <div className="absolute inset-0 flex flex-col">
            <div className="flex min-h-0 flex-1 flex-col px-3 pt-10 pb-[4.5rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.32, ease }}
                  className="flex min-h-0 flex-1 flex-col"
                >
                  <h3 className="text-[20px] font-semibold tracking-[-0.045em] text-[#1d1d1f]">
                    {step.title}
                  </h3>
                  <div className="mt-2.5 min-h-0 flex-1">
                    <Body />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-2 pb-1">
              <div className="liquid-glass pointer-events-auto relative flex items-center justify-between overflow-hidden rounded-full px-0.5 py-1">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-90"
                />
                {FLOW.map((f, idx) => {
                  const on = idx === i;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => go(idx)}
                      className="relative flex flex-1 flex-col items-center gap-0.5 rounded-full px-0.5 py-1"
                    >
                      {on && (
                        <motion.span
                          layoutId="phone-tab-glow"
                          className="absolute inset-0 rounded-full bg-white/75 shadow-[0_3px_12px_rgba(0,0,0,0.06)]"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 32,
                          }}
                        />
                      )}
                      <span
                        className={`relative z-10 ${
                          on ? "text-[#0071e3]" : "text-[#8e8e93]"
                        }`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24">
                          {TAB_ICONS[idx]}
                        </svg>
                      </span>
                      <span
                        className={`relative z-10 text-[8px] font-semibold ${
                          on ? "text-[#0071e3]" : "text-[#8e8e93]"
                        }`}
                      >
                        {f.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-1 flex justify-center">
                <span className="h-[3px] w-[32%] rounded-full bg-[#1d1d1f]/9" />
              </div>
            </div>
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/devices/iphone-device.png?v=wmf1"
          alt=""
          className="pointer-events-none absolute inset-0 z-30 h-full w-full select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}
