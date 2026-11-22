import Link from "next/link";

const BTN =
  "inline-flex h-[46px] items-center justify-center px-7 font-nav text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300";
const SOLID = `${BTN} border border-[#111] bg-[#111] text-white hover:bg-transparent hover:text-[#111]`;
const OUTLINE = `${BTN} border border-[#111] bg-transparent text-[#111] hover:bg-[#111] hover:text-white`;

export default function AboutMasthead({ data }) {
  const { breadcrumb, title, lede, text, note, actions = [] } = data;

  return (
    <section
      aria-labelledby="about-title"
      data-testid="about-emaar-masthead"
      className="px-[clamp(20px,4vw,64px)] pb-14 pt-8 text-[#1c1a17] sm:pb-20 sm:pt-10 lg:px-[max(5vw,32px)]"
    >
      <nav aria-label="Breadcrumb" data-testid="about-emaar-breadcrumb">
        <ol className="m-0 flex list-none flex-wrap items-center gap-x-[10px] gap-y-[10px] p-0 font-nav text-[10px] font-semibold uppercase leading-[1.5] tracking-[0.2em] text-[#6a6a6d]">
          {breadcrumb.map((b, i) => {
            const last = i === breadcrumb.length - 1;
            return (
              <li key={b.label} className="flex items-center gap-[10px]">
                {b.href && !last ? (
                  <Link href={b.href} className="text-[#6f6553] transition-colors hover:text-[#111]">
                    {b.label}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined}>{b.label}</span>
                )}
                {!last && (
                  <span aria-hidden="true" className="opacity-50">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <hr className="rule-draw mb-0 mt-8 h-px border-0 bg-[#111] sm:mt-12" />

      <h1
        id="about-title"
        data-testid="about-emaar-masthead-title"
        className="mb-0 mt-8 font-serif text-[36px] font-light leading-[1.05] text-[#111] sm:mt-12 sm:text-[56px] lg:text-[64px]"
      >
        {title}
      </h1>

      {/* 2 column flow: lede + text + note */}
      <div
        data-testid="about-emaar-masthead-lede"
        className="mt-6 text-[16px] leading-[1.75] text-[#5c5346] sm:mt-8 sm:text-[18px] sm:leading-[1.8] lg:columns-2 lg:gap-x-[5vw] lg:text-[20px] lg:leading-[1.6]"
      >
        <p className="m-0">{lede}</p>
        {text && <p className="m-0 mt-5">{text}</p>}
        {note && <p id="nav-note" className="m-0 mt-5 font-semibold">{note}</p>}
      </div>

      {actions.length > 0 && (
        <div data-testid="about-emaar-masthead-actions" className="mt-8 flex flex-wrap gap-3 sm:mt-10">
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