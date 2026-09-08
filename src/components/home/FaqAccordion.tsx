"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { conversionFaqs } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function FaqAccordion() {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {conversionFaqs.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;

        return (
          <div key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-red md:py-6"
              >
                <span className="text-[15px] font-medium leading-snug tracking-[-0.01em] md:text-base">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-line text-sm text-muted transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? "rotate-45 border-red/40 text-red" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease }}
                  className="overflow-hidden"
                >
                  <p className="max-w-xl pb-5 text-[15px] leading-relaxed text-muted md:pb-6">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
