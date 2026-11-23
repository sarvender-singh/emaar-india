import Link from "next/link";

export default function CareersMasthead({ data }) {
  const { breadcrumb, railLabel, title, lede, text } = data;

  return (
    <section aria-labelledby="careers-title" data-testid="careers-masthead"
      className="px-[clamp(20px,4vw,64px)] pt-10 text-[#1c1a17] lg:px-[max(5vw,32px)]">
      <nav aria-label="Breadcrumb">
        <ol className="m-0 flex list-none flex-wrap items-center gap-2.5 p-0 font-nav text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17]/65">
          {breadcrumb.map((b, i) => {
            const last = i === breadcrumb.length - 1;
            return (
              <li key={b.label} className="flex items-center gap-2.5">
                {b.href && !last ? <Link href={b.href} className="hover:text-[#1c1a17]">{b.label}</Link>
                  : <span aria-current={last ? "page" : undefined}>{b.label}</span>}
                {!last && <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>

      <hr className="rule-draw mb-0 mt-12 h-px border-0 bg-[#111] sm:mt-16" />

      <div className="mt-12 grid gap-8 pb-16 lg:grid-cols-[calc(20%+60px)_1fr] lg:gap-[2vw] lg:pb-24">
        <p className="m-0 font-nav text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1c1a17]/70 lg:pt-5">{railLabel}</p>
        <div>
          <h1 id="careers-title" className="m-0 font-serif text-[48px] font-light leading-[1.05] text-[#111] sm:text-[64px] lg:text-[76px]">{title}</h1>
          <p className="mb-0 mt-7 max-w-[700px] text-[20px] leading-[1.5] text-[#1c1a17]/75 sm:text-[22px]">{lede}</p>
          <p className="mb-0 mt-20 max-w-[740px] text-[17px] leading-[1.75] text-[#1c1a17]/70 sm:mt-28">{text}</p>
        </div>
      </div>
    </section>
  );
}