import Link from "next/link";

const BTN =
  "inline-flex h-[46px] items-center justify-center px-7 font-nav text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300";
const SOLID = `${BTN} border border-[#111] bg-[#111] text-white hover:bg-transparent hover:text-[#111]`;
const OUTLINE = `${BTN} border border-[#1c1a17]/60 bg-transparent text-[#1c1a17] hover:bg-[#111] hover:text-white`;

export default function AboutMasthead({ data }) {
  const { breadcrumb, title, lede, ledeSup, ledeEnd, text, note, actions = [] } = data;

  return (
    <section
      aria-labelledby="about-title"
      data-testid="about-emaar-masthead"
      className="px-[clamp(20px,4vw,64px)] pb-16 pt-10 text-[#1c1a17] sm:pb-24 lg:px-[max(5vw,32px)]"
    >
      <nav aria-label="Breadcrumb" data-testid="about-emaar-breadcrumb">
        <ol className="m-0 flex list-none flex-wrap items-center gap-2.5 p-0 font-nav text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17]/65">
          {breadcrumb.map((b, i) => {
            const last = i === breadcrumb.length - 1;
            return (
              <li key={b.label} className="flex items-center gap-2.5">
                {b.href && !last ? (
                  <Link href={b.href} className="transition-colors hover:text-[#1c1a17]">
                    {b.label}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined}>{b.label}</span>
                )}
                {!last && <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>

<hr className="rule-draw mb-0 mt-10 h-px border-0 bg-[#1c1a17]/55 sm:mt-12" />
      <h1
        id="about-title"
        data-testid="about-emaar-masthead-title"
        className="mb-0 mt-12 font-serif text-[38px] font-light leading-[1.05] text-[#111] sm:mt-14 sm:text-[56px] lg:text-[64px]"
      >
        {title}
      </h1>

      <p
        data-testid="about-emaar-masthead-lede"
        className="mb-0 mt-6 max-w-[660px] text-[18px] leading-[1.6] text-[#1c1a17]/70 sm:text-[20px]"
      >
        {lede}       
      </p>

      <p className="mb-0 mt-6 max-w-[600px] text-[15px] leading-[1.9] text-[#1c1a17]/65">{text}</p>

      {note && (
        <p id="nav-note" className="sr-only">
          {note}
        </p>
      )}

      {actions.length > 0 && (
        <div data-testid="about-emaar-masthead-actions" className="mt-12 flex flex-wrap gap-3">
          {actions.map((a) => (
            <Link key={a.label} href={a.href} className={a.variant === "solid" ? SOLID : OUTLINE}>
              {a.label}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}