"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, site } from "@/data/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6 md:pt-5">
        <div
          className={`shell-wide flex items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 md:px-5 ${
            scrolled || open
              ? "border-line bg-bg/85 backdrop-blur-xl"
              : "border-white/10 bg-bg/40 backdrop-blur-md"
          }`}
        >
          <Link href="/" className="group flex items-center gap-3">
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-red">
              <span className="relative z-10 font-display text-lg leading-none text-white">
                A
              </span>
            </span>
            <span className="soft-title text-xl tracking-[0.02em]">{site.name}</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3.5 py-2 text-[12px] font-medium tracking-[0.04em] transition-colors ${
                    active
                      ? "bg-red/15 text-red"
                      : "text-muted hover:bg-white/5 hover:text-text"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden rounded-full bg-red px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-red-bright md:inline-flex"
            >
              Start project
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 lg:hidden"
            >
              <span
                className={`h-px w-4 bg-text transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span className={`h-px w-4 bg-text transition ${open ? "opacity-0" : ""}`} />
              <span
                className={`h-px w-4 bg-text transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg/96 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex h-full flex-col justify-between px-6 pb-10 pt-28">
              <div className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={link.href}
                      className={`block rounded-2xl px-3 py-3 soft-title text-4xl ${
                        pathname === link.href ? "text-red" : "text-text"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <p className="text-base text-muted">{site.email}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
