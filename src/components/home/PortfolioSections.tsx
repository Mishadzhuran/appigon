"use client";

import { site } from "@/data/site";
import { Shell } from "@/components/ui/Primitives";

export { WorkSection } from "@/components/home/WorkRail";
export { ScrollChapters } from "@/components/home/ScrollChapters";
export { ConvinceRail } from "@/components/home/ConvinceRail";

export function FinalCTA() {
  return (
    <section className="pb-24 pt-6 md:pb-32">
      <Shell>
        <div className="rounded-[32px] bg-white px-8 py-14 text-center shadow-[0_12px_40px_rgba(0,0,0,0.06)] md:px-16 md:py-20">
          <p className="text-[12px] font-semibold tracking-[0.16em] text-[#86868b] uppercase">
            Contact
          </p>
          <h2 className="mx-auto mt-4 max-w-xl text-[clamp(2rem,4.5vw,3.2rem)] font-semibold tracking-[-0.04em] text-[#1d1d1f]">
            Have a product in mind?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-[#6e6e73]">
            Tell me what you’re building. I’ll help make it clear, polished, and
            ready for people — reply within {site.responseTime}.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/contact"
              className="inline-flex rounded-full bg-[#0071e3] px-7 py-3.5 text-[14px] font-semibold !text-white transition hover:bg-[#0077ed]"
            >
              Start a conversation
            </a>
            <a
              href={`mailto:${site.email}`}
              className="px-4 py-3 text-[14px] font-medium text-[#6e6e73] hover:text-[#1d1d1f]"
            >
              {site.email}
            </a>
          </div>
        </div>
      </Shell>
    </section>
  );
}
