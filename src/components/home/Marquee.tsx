export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <section className="py-4">
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
