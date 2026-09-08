import type { Metadata } from "next";
import { team, stats, site } from "@/data/site";
import {
  BigTitle,
  MagneticButton,
  PageHero,
  Reveal,
  SectionLabel,
  Shell,
} from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "About",
  description:
    "Appigon builds apps, landing pages, and store releases — then supports products for long-term market success.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A studio that ships"
        description="Appigon is built for founders who need real product delivery: develop the app, launch pages, store release, and support after go-live."
      />

      <section className="pb-16 md:pb-24">
        <Shell>
          <div className="panel grid gap-10 p-8 md:grid-cols-2 md:gap-14 md:p-12">
            <Reveal>
              <SectionLabel>Who we are</SectionLabel>
              <BigTitle>
                Product people.
                <br />
                Release people.
              </BigTitle>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-5 readable !text-[1.08rem]">
                <p>
                  We don&apos;t stop at design files. Appigon develops mobile apps, builds
                  the landings that convert, and takes products through App Store and
                  Google Play into the market.
                </p>
                <p>
                  After launch we stay close — updates, store optimization, fixes, and
                  growth work so the product keeps winning.
                </p>
                <p>
                  Based across {site.locations.join(", ")}. Obsessed with launches that
                  feel inevitable.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.06}
                className="panel px-5 py-7 text-center"
              >
                <p className="soft-title text-4xl text-red md:text-5xl">{s.value}</p>
                <p className="mt-3 text-[13px] font-medium text-muted">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      <section className="pb-24 md:pb-32">
        <Shell>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <SectionLabel align="center">Core team</SectionLabel>
            <BigTitle align="center">The unit</BigTitle>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.08}>
                <article className="panel panel-hover h-full p-6">
                  <div className="mb-6 flex h-40 items-end rounded-[20px] bg-[linear-gradient(160deg,#2a0808,#0a0a0c)] p-5">
                    <span className="soft-title text-5xl text-red/45">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="soft-title text-2xl">{member.name}</h3>
                  <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-red">
                    {member.role}
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">
                    {member.focus}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <MagneticButton href="/contact">Work with us</MagneticButton>
          </div>
        </Shell>
      </section>
    </>
  );
}
