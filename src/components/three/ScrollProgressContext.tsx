"use client";

import { createContext, useContext } from "react";
import { MotionValue, useMotionValue } from "framer-motion";

type Scroll3DContextValue = {
  progress: MotionValue<number>;
};

const Scroll3DContext = createContext<Scroll3DContextValue | null>(null);

export function Scroll3DProvider({
  children,
  progress,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
}) {
  return (
    <Scroll3DContext.Provider value={{ progress }}>
      {children}
    </Scroll3DContext.Provider>
  );
}

export function useScroll3DProgress() {
  const ctx = useContext(Scroll3DContext);
  if (!ctx) {
    throw new Error("useScroll3DProgress must be used within Scroll3DProvider");
  }
  return ctx.progress;
}

export function useOptionalScrollProgress() {
  const ctx = useContext(Scroll3DContext);
  return ctx?.progress ?? null;
}

/** Fallback motion value for scenes outside the scroll story */
export function useIdleProgress() {
  return useMotionValue(0);
}
