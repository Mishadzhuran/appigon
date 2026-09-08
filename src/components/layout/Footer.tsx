"use client";

import Link from "next/link";
import { footerNav, navLinks, site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pb-8 pt-4">
      <div className="shell-wide">
        <div className="border border-line bg-bg-soft/80 px-7 py-12 md:px-12 md:py-14">
          <div className="grid gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <Link href="/" className="soft-title text-3xl transition-colors hover:text-red">
                {site.name}
              </Link>
              <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted">
                {site.tagline} Product studio for mobile & web — idea to growth.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-6 inline-block text-[15px] text-text transition-colors hover:text-red"
              >
                {site.email}
              </a>
              {site.phone ? (
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="mt-2 block text-[15px] text-muted transition-colors hover:text-red"
                >
                  {site.phone}
                </a>
              ) : (
                <p className="mt-2 text-[14px] text-muted-soft">Phone — adding soon</p>
              )}
              <p className="mt-2 text-[14px] text-muted-soft">
                {site.locations.join(" · ")}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-8 md:grid-cols-3">
              <FooterCol title="Navigate" links={navLinks} />
              <FooterCol title="Studio" links={footerNav.studio} />
              <FooterCol title="Legal" links={footerNav.legal} />
            </div>
          </div>

          {site.socials.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2 border-t border-line pt-8">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-red/50 hover:text-red"
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}

          <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-[11px] uppercase tracking-[0.14em] text-muted-soft md:flex-row md:items-center md:justify-between">
            <span>
              © {year} {site.name}™. All rights reserved.
            </span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link href="/privacy" className="hover:text-red">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-red">
                Terms
              </Link>
              <Link href="/cookies" className="hover:text-red">
                Cookies
              </Link>
              <button
                type="button"
                onClick={scrollTop}
                className="text-left uppercase tracking-[0.14em] transition-colors hover:text-red"
              >
                Back to top ↑
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-soft">
        {title}
      </p>
      <ul className="space-y-2.5 text-[15px]">
        {links.map((l) => (
          <li key={`${title}-${l.href}-${l.label}`}>
            <Link
              href={l.href}
              className="text-text/85 transition-colors duration-200 hover:text-red"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
