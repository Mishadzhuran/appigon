"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Tool = {
  name: string;
  src: string;
  x: string;
  y: string;
  /** Mobile-safe position (closer to phone). Falls back to x/y. */
  mx?: string;
  my?: string;
  size: number;
  delay: number;
  layer: "front" | "back";
  /** Only peek icons sit slightly outside the glass card. Max 5. */
  peek?: boolean;
  /** Hide on small screens to keep the stage clean. Default true. */
  mobile?: boolean;
  contain?: boolean;
};

/**
 * Max 5 peek partly past the glass edge (md+).
 * On mobile peek icons are hidden; inner icons use tighter positions.
 */
const tools: Tool[] = [
  {
    name: "GitHub",
    src: "/icons/github-mark.png",
    x: "-3%",
    y: "22%",
    size: 64,
    delay: 0,
    layer: "front",
    peek: true,
    contain: true,
  },
  {
    name: "TestFlight",
    src: "/icons/testflight.png",
    x: "-4%",
    y: "58%",
    size: 68,
    delay: 0.08,
    layer: "front",
    peek: true,
  },
  {
    name: "VS Code",
    src: "/icons/vscode.svg",
    x: "91%",
    y: "18%",
    size: 64,
    delay: 0.05,
    layer: "front",
    peek: true,
    contain: true,
  },
  {
    name: "Figma",
    src: "/icons/figma-app.svg",
    x: "92%",
    y: "52%",
    size: 62,
    delay: 0.12,
    layer: "front",
    peek: true,
  },
  {
    name: "Swift",
    src: "/icons/swift.png",
    x: "88%",
    y: "78%",
    size: 58,
    delay: 0.18,
    layer: "front",
    peek: true,
  },
  {
    name: "Xcode",
    src: "/icons/xcode.png",
    x: "10%",
    y: "14%",
    mx: "12%",
    my: "12%",
    size: 52,
    delay: 0.1,
    layer: "back",
  },
  {
    name: "App Store",
    src: "/icons/appstore.png",
    x: "78%",
    y: "10%",
    mx: "78%",
    my: "11%",
    size: 48,
    delay: 0.14,
    layer: "back",
  },
  {
    name: "React",
    src: "/icons/react.svg",
    x: "14%",
    y: "42%",
    mx: "11%",
    my: "40%",
    size: 50,
    delay: 0.16,
    layer: "back",
    contain: true,
  },
  {
    name: "TypeScript",
    src: "/icons/typescript.svg",
    x: "76%",
    y: "38%",
    mx: "79%",
    my: "38%",
    size: 46,
    delay: 0.2,
    layer: "back",
    contain: true,
  },
  {
    name: "Flutter",
    src: "/icons/flutter.svg",
    x: "18%",
    y: "72%",
    mx: "10%",
    my: "70%",
    size: 48,
    delay: 0.22,
    layer: "back",
    contain: true,
    mobile: false,
  },
  {
    name: "Next.js",
    src: "/icons/nextjs.svg",
    x: "72%",
    y: "68%",
    mx: "72%",
    my: "66%",
    size: 46,
    delay: 0.24,
    layer: "back",
    contain: true,
    mobile: false,
  },
  {
    name: "Supabase",
    src: "/icons/supabase.svg",
    x: "28%",
    y: "86%",
    mx: "20%",
    my: "82%",
    size: 44,
    delay: 0.26,
    layer: "back",
    contain: true,
    mobile: false,
  },
  {
    name: "Notion",
    src: "/icons/notion.png",
    x: "62%",
    y: "88%",
    mx: "66%",
    my: "82%",
    size: 44,
    delay: 0.28,
    layer: "back",
    mobile: false,
  },
  {
    name: "Kotlin",
    src: "/icons/kotlin.svg",
    x: "18%",
    y: "58%",
    mx: "12%",
    my: "62%",
    size: 42,
    delay: 0.11,
    layer: "back",
    contain: true,
  },
];

function useIsMd() {
  const [md, setMd] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 768px)");
    const sync = () => setMd(m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, []);
  return md;
}

function IconChip({ t, md }: { t: Tool; md: boolean }) {
  const behind = t.layer === "back";
  if (t.peek && !md) return null;
  if (t.mobile === false && !md) return null;

  const size = md ? t.size : Math.round(t.size * 0.62);
  const left = md ? t.x : (t.mx ?? t.x);
  const top = md ? t.y : (t.my ?? t.y);

  return (
    <motion.div
      className="absolute"
      style={{ left, top, width: size, height: size, zIndex: behind ? 1 : 20 }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{
        opacity: behind ? 0.85 : 1,
        scale: 1,
        y: [0, behind ? -2.5 : -4, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay: t.delay, ease: [0.23, 1, 0.32, 1] },
        scale: { duration: 0.5, delay: t.delay, ease: [0.23, 1, 0.32, 1] },
        y: {
          duration: 9 + t.delay * 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6 + t.delay,
        },
      }}
    >
      <div
        className={`relative h-full w-full overflow-hidden rounded-[14px] bg-white ring-1 ring-black/[0.06] md:rounded-[16px] ${
          behind
            ? "shadow-[0_8px_22px_rgba(0,0,0,0.08)]"
            : "shadow-[0_14px_32px_rgba(0,0,0,0.12)]"
        }`}
        style={{ filter: "saturate(1.15) contrast(1.05)" }}
      >
        <Image
          src={t.src}
          alt={t.name}
          fill
          className={t.contain ? "object-contain p-[16%]" : "object-cover"}
          sizes="72px"
        />
      </div>
    </motion.div>
  );
}

export function ToolIcons() {
  const md = useIsMd();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden md:overflow-visible"
    >
      {tools
        .filter((t) => t.layer === "back")
        .map((t) => (
          <IconChip key={`b-${t.name}`} t={t} md={md} />
        ))}
      {tools
        .filter((t) => t.layer === "front")
        .map((t) => (
          <IconChip key={`f-${t.name}`} t={t} md={md} />
        ))}
    </div>
  );
}
