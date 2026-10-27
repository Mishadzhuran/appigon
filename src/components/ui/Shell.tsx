"use client";

import Link from "next/link";
import { ReactNode, useRef } from "react";

export function Shell({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div className={`${wide ? "shell-wide" : "shell"} ${className}`}>
      {children}
    </div>
  );
}

export function MagneticButton({
  children,
  href,
  className = "",
  variant = "primary",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "ghost" | "outline";
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.14}px, ${y * 0.18}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-[13px] font-medium tracking-[-0.01em] transition-transform duration-300 ease-out will-change-transform";

  const variants = {
    primary: "bg-[#1d1d1f] text-white hover:bg-black",
    ghost: "bg-transparent text-text hover:text-accent",
    outline:
      "border border-line bg-white text-text hover:border-black/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]",
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-0.5"
      >
        →
      </span>
    </>
  );

  const shared = {
    className: `${base} ${variants[variant]} ${className}`,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
  };

  if (href) {
    return (
      <Link
        href={href}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        {...shared}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      ref={ref as React.RefObject<HTMLButtonElement>}
      {...shared}
    >
      {content}
    </button>
  );
}

export function SectionLabel({
  children,
  align = "left",
}: {
  children: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`eyebrow mb-4 ${align === "center" ? "justify-center before:hidden" : ""}`}
    >
      {children}
    </div>
  );
}

export function BigTitle({
  children,
  className = "",
  align = "left",
}: {
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <h2
      className={`soft-title text-[clamp(2.2rem,5.5vw,4.2rem)] ${
        align === "center" ? "text-center" : ""
      } ${className}`}
    >
      {children}
    </h2>
  );
}
