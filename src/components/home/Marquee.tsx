export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <section className="relative z-10 bg-[#050508] pb-8 pt-10 md:pb-12 md:pt-16">
      {/* Soft handoff from the journey landing into the ticker */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-gradient-to-b from-transparent to-[#050508] md:-top-24 md:h-24"
        aria-hidden
      />
      <div className="shell-wide overflow-hidden rounded-full border border-red/30 bg-red shadow-[0_12px_40px_rgba(239,26,18,0.25)]">
        <div className="marquee-track py-3.5">
          {row.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="mx-5 inline-flex items-center gap-5 soft-title text-xl text-white md:mx-7 md:text-2xl"
            >
              {item}
              <span className="text-white/35">●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
