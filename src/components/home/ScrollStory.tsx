"use client";

import dynamic from "next/dynamic";
import {
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { scrollChapters } from "@/data/site";
import { Scroll3DProvider } from "@/components/three/ScrollProgressContext";
import { Shell } from "@/components/ui/Primitives";

const ScrollPhoneCanvas = dynamic(
  () =>
    import("@/components/three/ScrollPhoneCanvas").then((m) => m.ScrollPhoneCanvas),
  { ssr: false }
);

function ChapterCard({
  chapter,
  index,
  total,
  progress,
}: {
  chapter: (typeof scrollChapters)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;

  const opacity = useTransform(progress, [start, mid - 0.015, mid + 0.04, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, mid, end], [64, 0, -48]);
  const blur = useTransform(progress, [start, mid, end], [14, 0, 12]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  const unlock = useTransform(progress, [start, start + 0.05, mid], [100, 35, 0]);
  const clipPath = useMotionTemplate`inset(0 ${unlock}% 0 0)`;
  const bar = useTransform(progress, [start, end], [0.08, 1]);

  return (
    <motion.article
      style={{ opacity, y, filter }}
      className="pointer-events-none absolute inset-x-0 top-[16%] mx-auto w-[min(540px,92%)] text-center md:top-[18%] md:left-[5%] md:right-auto md:mx-0 md:w-[min(440px,40%)] md:text-left lg:left-[7%]"
    >
      <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-red">
        Unlocked · Chapter {chapter.index} / 0{total}
      </p>
      <motion.h3
        style={{ clipPath }}
        className="soft-title text-[clamp(2.5rem,5.2vw,4.4rem)] text-text"
      >
        {chapter.title}
      </motion.h3>
      <p className="mt-4 text-lg font-medium leading-snug text-text/92 md:text-xl">
        {chapter.line}
      </p>
      <p className="readable mt-4 max-w-md md:!text-base">{chapter.body}</p>
      <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full origin-left rounded-full bg-red"
          style={{ scaleX: bar }}
        />
      </div>
    </motion.article>
  );
}

function ProgressLabel({ progress }: { progress: MotionValue<number> }) {
  const [label, setLabel] = useState("00%");
  useMotionValueEvent(progress, "change", (v) => {
    setLabel(`${String(Math.round(v * 100)).padStart(2, "0")}%`);
  });
  return <span>{label}</span>;
}

function ChapterDot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, (v) => {
    const idx = Math.min(total - 1, Math.floor(v * 0.999 * total));
    return idx === index ? 1 : 0.22;
  });
  const width = useTransform(progress, (v) => {
    const idx = Math.min(total - 1, Math.floor(v * 0.999 * total));
    return idx === index ? 42 : 18;
  });

  return (
    <motion.span
      style={{ opacity, width }}
      className="h-1.5 rounded-full bg-red"
    />
  );
}

export function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.35,
  });

  const ringScale = useTransform(progress, [0, 0.5, 1], [0.85, 1.06, 0.9]);
  const ringScaleOuter = useTransform(ringScale, (v) => v * 1.2);
  const ringOpacity = useTransform(progress, [0, 0.12, 0.88, 1], [0.15, 0.5, 0.5, 0.12]);

  return (
    <section ref={containerRef} className="relative h-[680vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_62%_42%,rgba(239,26,18,0.22),transparent_58%)]" />

        <motion.div
          style={{ scale: ringScale, opacity: ringOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[68vmin] w-[68vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red/30"
        />
        <motion.div
          style={{ scale: ringScaleOuter, opacity: ringOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[86vmin] w-[86vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
        />

        <Scroll3DProvider progress={progress}>
          <div className="absolute inset-0 z-[1]">
            <ScrollPhoneCanvas />
          </div>
        </Scroll3DProvider>

        <Shell wide className="relative z-[2] h-full">
          <div className="relative h-full">
            <div className="absolute left-0 right-0 top-8 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-soft md:top-10">
              <span>Scroll to unlock the product journey</span>
              <ProgressLabel progress={progress} />
            </div>

            {scrollChapters.map((chapter, index) => (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                index={index}
                total={scrollChapters.length}
                progress={progress}
              />
            ))}

            <div className="absolute bottom-8 left-0 right-0 md:bottom-10">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                {scrollChapters.map((c, i) => (
                  <ChapterDot
                    key={c.id}
                    index={i}
                    total={scrollChapters.length}
                    progress={progress}
                  />
                ))}
              </div>
            </div>
          </div>
        </Shell>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bg to-transparent" />
      </div>
    </section>
  );
}
