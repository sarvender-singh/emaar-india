import AboutIndex from "@/components/about/AboutIndex";

const LABEL = "m-0 font-nav text-[10px] font-semibold uppercase tracking-[0.3em] text-[#1c1a17]/65";

function Blocks({ blocks }) {
  return blocks.map((b, i) => {
    if (b.list) {
      return (
        <ul key={i} className="m-0 mt-5 list-none space-y-3 p-0">
          {b.list.map((li) => (
            <li key={li.k} className="flex gap-4">
              <span className="w-6 shrink-0 font-nav text-[11px] tracking-[0.1em] text-[#1c1a17]/55">{li.k}</span>
              <span>{li.t}</span>
            </li>
          ))}
        </ul>
      );
    }
    if (b.address) {
      return (
        <address key={i} className="mt-5 not-italic">
          {b.address.map((line) => (
            <span key={line} className="block">{line}</span>
          ))}
          {b.email && (
            <span className="block">
              Email:{" "}
              <a href={`mailto:${b.email}`} className="text-[#111] underline underline-offset-4 hover:opacity-60">
                {b.email}
              </a>
            </span>
          )}
        </address>
      );
    }
    return (
      <p key={i} className="m-0 mt-5 first:mt-0">
        {b.p}
      </p>
    );
  });
}

export default function LegalSpine({ data }) {  const { indexLabel, sections } = data;
  const total = String(sections.length).padStart(2, "0");
  const items = sections.map(({ id, n, nav }) => ({ id, n, nav }));

  return (
    <div
      data-testid="policy-spine"
      className="px-[clamp(20px,4vw,64px)] pb-16 text-[#1c1a17] sm:pb-24 lg:px-[max(5vw,32px)]"
    >
      <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-[5vw]">
        <AboutIndex label={indexLabel} items={items} />

        <div data-testid="policy-spine-body" className="min-w-0">
          {sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              data-testid="policy-section"
              className="scroll-mt-[calc(var(--hdr-h)+24px)] border-t border-[#11111124] py-12 first:border-t-0 first:pt-0 sm:py-16 sm:first:pt-0"
            >
              <p className={LABEL}>
                Section {s.n} of {total}
              </p>
              <h2 className="mb-0 mt-5 font-serif text-[28px] font-light leading-[1.15] text-[#111] sm:text-[40px]">
                {Number(s.n)}. {s.title}
              </h2>
              <div className="mt-6 max-w-[780px] text-[16px] leading-[1.9] text-[#1c1a17]/70 sm:mt-8 sm:text-[18px]">
                <Blocks blocks={s.blocks} />
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}