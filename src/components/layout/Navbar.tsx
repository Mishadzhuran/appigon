"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href;
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-5">
        <div className="flex w-full max-w-[720px] items-center justify-between gap-2 rounded-full border border-black/8 bg-white/75 px-2 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-2xl md:px-2.5">
          <Link
            href="/"
            className="rounded-full px-4 py-2 font-display text-[15px] font-bold tracking-[-0.04em] text-text"
          >
            {site.shortName}
          </Link>

          <nav className="hidden items-center gap-0.5 sm:flex">
            {[{ href: "/", label: "Home" }, ...navLinks].map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3.5 py-2 text-[13px] font-medium tracking-[-0.01em] transition-colors ${
                    active
                      ? "bg-black/[0.06] text-text"
                      : "text-muted hover:text-text"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <Link
              href="/contact"
              className="rounded-full bg-[#1d1d1f] px-3.5 py-2 text-[13px] font-medium !text-white transition hover:bg-black sm:px-4"
            >
              Contact
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full sm:hidden"
            >
              <span
                className={`h-px w-4 bg-text transition duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-4 bg-text transition duration-300 ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-px w-4 bg-text transition duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-40 animate-[fadeIn_0.3s_ease] bg-[#f5f5f7]/95 backdrop-blur-xl sm:hidden">
          <div className="flex h-full flex-col justify-between px-6 pb-10 pt-28">
            <div className="space-y-1">
              {[{ href: "/", label: "Home" }, ...navLinks].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-3 font-display text-4xl font-bold tracking-[-0.04em] ${
                    isActive(link.href) ? "text-text" : "text-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="space-y-4">
              <Link
                href="/contact"
                className="flex w-full items-center justify-center rounded-full bg-[#1d1d1f] px-6 py-3.5 text-[15px] font-semibold !text-white"
              >
                Contact
              </Link>
              <p className="text-center text-base text-muted">{site.email}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
