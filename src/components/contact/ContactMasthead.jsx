import Link from "next/link";

const BTN =
  "inline-flex h-[60px] items-center justify-center px-7 font-nav text-[12px] font-bold uppercase tracking-[0.2em] transition-colors duration-300";
const SOLID = `${BTN} border border-[#111] bg-[#111] text-white hover:bg-transparent hover:text-[#111]`;
const OUTLINE = `${BTN} border border-[#1c1a17]/60 text-[#1c1a17] hover:bg-[#111] hover:text-white`;

export default function ContactMasthead({ data }) {
  const { breadcrumb, railLabel, facts = [], title, lede, actions = [] } = data;

  return (
    <section aria-labelledby="contact-title" data-testid="help-masthead"
      className="px-[clamp(20px,4vw,64px)] pb-16 pt-10 text-[#1c1a17] sm:pb-20 lg:px-[max(5vw,32px)]">
      <nav aria-label="Breadcrumb">
        <ol className="m-0 flex list-none flex-wrap items-center gap-2.5 p-0 font-nav text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17]/65">
          {breadcrumb.map((b, i) => {
            const last = i === breadcrumb.length - 1;
            return (
              <li key={b.label} className="flex items-center gap-2.5">
                {b.href && !last ? <Link href={b.href} className="hover:text-[#1c1a17]">{b.label}</Link>
                  : <span aria-current={last ? "page" : undefined}>{b.label}</span>}
                {!last && <span aria-hidden="true" className="opacity-50">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>

      <hr className="rule-draw mb-0 mt-16 h-px border-0 bg-[#111] sm:mt-20" />

      <div className="mt-14 grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-[5vw]">
        <div>
          <p className="m-0 font-nav text-[12px] font-semibold uppercase tracking-[0.3em] text-[#1c1a17]/65">{railLabel}</p>
          <dl data-testid="help-masthead-facts" className="m-0 mt-8 flex flex-col">
            {facts.map((f) => (
              <div key={f.label} className="border-b border-[#1c1a17]/10 py-4 first:pt-0">
                <dt className="font-nav text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17]/60">{f.label}</dt>
                <dd className="m-0 mt-2 text-[15px]">
                  <a href={f.href} className="border-b border-[#1c1a17]/30 pb-[1px] transition-colors hover:border-[#1c1a17]">{f.text}</a>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h1 id="contact-title" data-testid="help-masthead-title"
            className="m-0 font-serif text-[44px] font-light leading-[1.05] text-[#111] sm:text-[64px] lg:text-[76px]">
            {title}
          </h1>
          <p className="mb-0 mt-8 max-w-[780px] text-[18px] leading-[1.6] text-[#1c1a17]/70 sm:text-[22px]">{lede}</p>
          <div className="mt-14 flex flex-wrap gap-4">
            {actions.map((a) => (
              <a key={a.label} href={a.href} className={a.variant === "solid" ? SOLID : OUTLINE}>{a.label}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}