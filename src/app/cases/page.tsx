import type { Metadata } from "next";
import { cases } from "@/data/site";
import {
  MagneticButton,
  PageHero,
  Reveal,
  Shell,
} from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work by Misha Dzhuran — fintech, social, health, logistics, and B2B products shipped end to end.",
};

export default function CasesPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Proof over promises"
        description="Real products. Real metrics. From first frame to growth loops that actually compound."
      />

      <section className="pb-24 md:pb-32">
        <Shell>
          <div className="space-y-4">
            {cases.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.05}>
                <article
                  id={c.slug}
                  className="panel scroll-mt-28 overflow-hidden"
                >
                  <div
                    className="h-1.5 w-full rounded-t-[28px]"
                    style={{ background: c.color }}
                  />
                  <div className="grid gap-8 p-8 md:grid-cols-[1.25fr_0.75fr] md:p-10">
                    <div>
                      <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted-soft">
                        {c.category} · {c.year}
                      </p>
                      <h2 className="soft-title mt-3 text-4xl md:text-5xl">{c.title}</h2>
                      <p className="readable mt-5 max-w-2xl !text-[1.05rem]">
                        {c.summary}
                      </p>
                      <p className="mt-5 text-[15px] text-text/85">{c.result}</p>
                    </div>
                    <div className="flex flex-col justify-between rounded-[22px] border border-line bg-bg/60 p-7 text-center md:text-left">
                      <div>
                        <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted-soft">
                          Impact
                        </p>
                        <p className="soft-title mt-4 text-4xl text-red md:text-5xl">
                          {c.metric}
                        </p>
                      </div>
                      <p className="mt-8 text-[12px] uppercase tracking-[0.16em] text-muted-soft">
                        Idea → growth delivery
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="panel mt-10 flex flex-col items-center gap-5 px-8 py-10 text-center md:flex-row md:justify-between md:text-left">
            <p className="readable max-w-md !text-base">
              Want your product on this wall? We take a limited number of builds per
              quarter.
            </p>
            <MagneticButton href="/contact">Pitch your idea</MagneticButton>
          </div>
        </Shell>
      </section>
    </>
  );
}
