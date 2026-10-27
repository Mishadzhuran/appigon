"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Tool = {
  name: string;
  src: string;
  x: string;
  y: string;
  size: number;
  delay: number;
  layer: "front" | "back";
  /** Only peek icons sit slightly outside the glass card. Max 5. */
  peek?: boolean;
  contain?: boolean;
};

/**
 * Max 5 peek partly past the glass edge.
 * Everything else stays randomly close around the phone.
 */
const tools: Tool[] = [
  // —— 5 peek (partially outside) ——
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
  // —— close to phone (inside stage) ——
  {
    name: "Xcode",
    src: "/icons/xcode.png",
    x: "10%",
    y: "14%",
    size: 52,
    delay: 0.1,
    layer: "back",
  },
  {
    name: "App Store",
    src: "/icons/appstore.png",
    x: "78%",
    y: "10%",
    size: 48,
    delay: 0.14,
    layer: "back",
  },
  {
    name: "React",
    src: "/icons/react.svg",
    x: "14%",
    y: "42%",
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
    size: 48,
    delay: 0.22,
    layer: "back",
    contain: true,
  },
  {
    name: "Next.js",
    src: "/icons/nextjs.svg",
    x: "72%",
    y: "68%",
    size: 46,
    delay: 0.24,
    layer: "back",
    contain: true,
  },
  {
    name: "Supabase",
    src: "/icons/supabase.svg",
    x: "28%",
    y: "86%",
    size: 44,
    delay: 0.26,
    layer: "back",
    contain: true,
  },
  {
    name: "Notion",
    src: "/icons/notion.png",
    x: "62%",
    y: "88%",
    size: 44,
    delay: 0.28,
    layer: "back",
  },
  {
    name: "Kotlin",
    src: "/icons/kotlin.svg",
    x: "18%",
    y: "58%",
    size: 42,
    delay: 0.11,
    layer: "back",
    contain: true,
  },
];

function IconChip({ t }: { t: Tool }) {
  const behind = t.layer === "back";
  return (
    <motion.div
      className="absolute"
      style={{
        left: t.x,
        top: t.y,
        width: t.size,
        height: t.size,
        zIndex: behind ? 1 : 20,
      }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, behind ? -2 : -3.5, 0],
      }}
      transition={{
        opacity: { duration: 0.55, delay: t.delay },
        scale: { duration: 0.55, delay: t.delay },
        y: {
          duration: 10 + t.delay * 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.7 + t.delay,
        },
      }}
    >
      <div
        className={`relative h-full w-full overflow-hidden rounded-[16px] bg-white ring-1 ring-black/[0.06] ${
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
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-visible">
      {tools
        .filter((t) => t.layer === "back")
        .map((t) => (
          <IconChip key={`b-${t.name}`} t={t} />
        ))}
      {tools
        .filter((t) => t.layer === "front")
        .map((t) => (
          <IconChip key={`f-${t.name}`} t={t} />
        ))}
    </div>
  );
}
