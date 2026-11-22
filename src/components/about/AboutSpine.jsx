import Image from "next/image";
import Link from "next/link";
import AboutIndex from "./AboutIndex";

const LABEL = "m-0 font-nav text-[10px] font-semibold uppercase tracking-[0.3em] text-[#1c1a17]/65";
const BTN =
  "inline-flex h-[46px] items-center justify-center border border-[#1c1a17]/60 px-7 font-nav text-[10px] font-bold uppercase tracking-[0.2em] text-[#1c1a17] transition-colors duration-300 hover:bg-[#111] hover:text-white";
const TAG = "font-nav text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17]/65";
const H2 = "mb-0 font-serif text-[30px] font-light leading-[1.15] text-[#111] sm:text-[38px]";
const ROW_TITLE = "m-0 font-serif text-[22px] font-light leading-[1.25] text-[#111] sm:text-[26px]";

/* ---------- shared bits ---------- */

function Heading({ children, first }) {
  return (
    <h2 data-testid="about-emaar-section-heading" className={`${H2} ${first ? "mt-0" : "mt-5"}`}>
      {children}
    </h2>
  );
}

function Arrow({ external }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1c1a17]/30 text-[#111] transition-colors duration-300 group-hover:bg-[#111] group-hover:text-white"
    >
      <svg viewBox="0 0 14 12" fill="none" className="h-3 w-3">
        {external ? (
          <path d="M4 10L10 4M10 4H5M10 4V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M1 6h11M8 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
        )}
      </svg>
    </span>
  );
}

// internal -> Link, external -> new tab <a>
function RowLink({ href, external, className, children }) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" data-testid="about-emaar-row-link" className={`group ${className}`}>
        {children}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} data-testid="about-emaar-row-link" className={`group ${className}`}>
      {children}
    </Link>
  );
}

const ROWS = "mt-10 border-t border-[#11111112]";
const ROW = "flex items-center justify-between gap-6 border-b border-[#11111112]";

/* ---------- sections ---------- */

function Founder({ s }) {
  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-[5vw]">
      <div>
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/5">
          <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width:1024px) 26rem, 100vw" quality={80} className="object-cover" />
        </div>
        <p className="mb-0 mt-4 text-[12px] text-[#1c1a17]/60">{s.image.caption}</p>
      </div>

      <div className="self-start lg:pt-0">
        <figure data-testid="about-emaar-quote" className="m-0 border-l border-[#1c1a17]/55 pl-6 sm:pl-8">
          <blockquote className="m-0 font-serif text-[26px] font-light leading-[1.3] text-[#111] sm:text-[32px]">
            “{s.quote}”
          </blockquote>
          <figcaption className="mt-8">
            <p className="m-0 text-[14px] text-[#111]">{s.name}</p>
            <p className="m-0 mt-1 text-[12px] text-[#1c1a17]/60">{s.role}</p>
          </figcaption>
        </figure>
        <p className="mb-0 mt-8 pl-6 sm:pl-8">
          <Link href={s.action.href} className={BTN}>{s.action.label}</Link>
        </p>
      </div>
    </div>
  );
}

function Record({ s }) {
  const { split } = s;
  return (
    <>
      <Heading>{s.title}</Heading>

      <dl data-testid="about-emaar-ledger" className="m-0 mt-12">
        {s.items.map((it) => (
          <div
            key={it.value}
            data-testid="about-emaar-ledger-item"
            className="grid items-center gap-3 border-b border-[#11111112] py-7 sm:grid-cols-[1fr_1.15fr] sm:gap-10"
          >
            <dt className="font-serif text-[32px] font-light leading-none text-[#111] sm:text-[38px]">{it.value}</dt>
            <dd className="m-0 max-w-[330px] text-[12.5px] leading-[1.6] text-[#1c1a17]/70">
              {it.text}
              <span className="ml-1 text-[11px] text-[#1c1a17]/50">{it.source}</span>
            </dd>
          </div>
        ))}
      </dl>

      {s.note && (
        <p id="nav-note" className="mb-0 mt-6 text-[12px] text-[#1c1a17]/60">{s.note}</p>
      )}

      {split && (
        <div data-testid="about-emaar-split" className="mt-16 grid items-start gap-8 md:grid-cols-[1.1fr_1fr] md:gap-[4vw]">
          <div>
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-black/5">
              <Image src={split.image.src} alt={split.image.alt} fill sizes="(min-width:768px) 40vw, 100vw" quality={80} className="object-cover" />
            </div>
            <p className="mb-0 mt-4 text-[12px] text-[#1c1a17]/60">{split.image.caption}</p>
          </div>
          <div>
            <h3 className="m-0 font-serif text-[24px] font-light text-[#111]">{split.title}</h3>
            <p className="mb-0 mt-4 text-[15px] leading-[1.75] text-[#1c1a17]/70">
              {split.text.map((p, i) =>
                p.strong ? <strong key={i} className="font-semibold text-[#111]">{p.t}</strong> : <span key={i}>{p.t}</span>
              )}
            </p>
            <Link
              href={split.cta.href}
              className="mt-7 inline-flex items-center gap-1 border-b-2 border-[#1c1a17]/60 pb-1 font-nav text-[10px] font-bold uppercase tracking-[0.2em] text-[#111] transition-opacity hover:opacity-60"
            >
              {split.cta.label}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function Businesses({ s }) {
  return (
    <>
      <Heading first>{s.title}</Heading>
      <div data-testid="about-emaar-rows" className={ROWS}>
        {s.items.map((it) => (
          <RowLink
            key={it.href}
            href={it.href}
            className="grid items-center gap-5 border-b border-[#11111112] py-7 sm:grid-cols-[minmax(0,333px)_1fr_auto] sm:gap-[46px]"
          >
            <span className="relative block aspect-[333/208] w-full overflow-hidden bg-black/5">
              <Image src={it.image} alt="" fill sizes="(min-width:640px) 333px, 100vw" quality={80} className="object-cover" />
            </span>
            <div>
              <span className={TAG}>{it.tag}</span>
              <p className={`${ROW_TITLE} mt-2`}>{it.title}</p>
            </div>
            <Arrow />
          </RowLink>
        ))}
      </div>
    </>
  );
}

function International({ s }) {
  return (
    <>
      <Heading>{s.title}</Heading>
      <p className="mb-0 mt-5 max-w-[540px] text-[15px] leading-[1.75] text-[#1c1a17]/70">{s.text}</p>
      <div data-testid="about-emaar-rows" className={ROWS}>
        {s.items.map((it) => (
          <RowLink key={it.name} href={it.href} external className={`${ROW} py-[30px]`}>
            <p className={ROW_TITLE}>{it.name}</p>
            <span className="flex items-center gap-3">
              <span className="font-nav text-[10px] font-semibold uppercase tracking-[0.15em] text-[#1c1a17]/65">{it.domain}</span>
              <Arrow />
            </span>
          </RowLink>
        ))}
      </div>
    </>
  );
}

function Leadership({ s }) {
  return (
    <>
      <Heading>{s.title}</Heading>
      <div data-testid="about-emaar-rows" className={ROWS}>
        {s.items.map((it) => (
          <RowLink key={it.href} href={it.href} className={`${ROW} py-6`}>
            <div>
              <span className={TAG}>{it.tag}</span>
              <p className={`${ROW_TITLE} mt-2`}>{it.title}</p>
            </div>
            <Arrow />
          </RowLink>
        ))}
      </div>
    </>
  );
}

function Awards({ s }) {
  return (
    <>
      <Heading>{s.title}</Heading>
      <dl data-testid="about-emaar-ledger" className="m-0 mt-10 border-t border-[#11111112]">
        {s.items.map((it) => (
          <div
            key={it.title}
            data-testid="about-emaar-ledger-item"
            className="grid gap-2 border-b border-[#11111112] py-6 sm:grid-cols-[330px_1fr] sm:gap-10"
          >
            <dt className="font-serif text-[19px] font-light leading-[1.4] text-[#111] sm:text-[21px]">{it.title}</dt>
            <dd className="m-0 text-[12.5px] leading-[1.6] text-[#1c1a17]/70">{it.by}</dd>
          </div>
        ))}
      </dl>

      {s.cta && (
        <Link
          href={s.cta.href}
          data-testid="about-emaar-awards-cta"
          className="mt-10 inline-flex items-center gap-1 border-b-2 border-[#1c1a17]/60 pb-1 font-nav text-[10px] font-bold uppercase tracking-[0.2em] text-[#111] transition-opacity hover:opacity-60"
        >
          {s.cta.label}
          <span aria-hidden="true">→</span>
        </Link>
      )}
    </>
  );
}

function Responsibility({ s }) {
  return (
    <>
      <Heading>{s.title}</Heading>
      <div data-testid="about-emaar-routes" className="mt-10 grid gap-5 md:grid-cols-3">
        {s.items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            data-testid="about-emaar-route-link"
            className="group flex flex-col border border-[#11111112] bg-white p-[30px] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          >
            <p className={`${TAG} m-0`}>{it.k}</p>
            <p className="mb-0 mt-5 flex-1 font-serif text-[20px] font-light leading-[1.35] text-[#111]">{it.v}</p>
            <p className="mb-0 mt-8 font-nav text-[11px] uppercase tracking-[0.08em] text-[#1c1a17]/65 transition-colors group-hover:text-[#111]">
              Learn more →
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}

const RENDER = {
  founder: Founder,
  record: Record,
  businesses: Businesses,
  international: International,
  leadership: Leadership,
  awards: Awards,
  responsibility: Responsibility,
};

export default function AboutSpine({ data }) {
  const { indexLabel, sections } = data;
  // sirf wahi sections index me jinme nav hai (businesses skip)
  const items = sections.filter((s) => s.nav).map(({ id, n, nav }) => ({ id, n, nav }));

  return (
    <div data-testid="about-emaar-spine" className="px-[clamp(20px,4vw,64px)] pb-24 text-[#1c1a17] lg:px-[max(5vw,32px)]">
      <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-[5vw]">
        <AboutIndex label={indexLabel} items={items} />

        <div data-testid="about-emaar-spine-body" className="min-w-0 lg:max-w-[1050px]">
          {sections.map((s) => {
            const Body = RENDER[s.type];
            if (!Body) return null;
            return (
              <section
                key={s.id}
                id={s.id}
                data-testid="about-emaar-section"
                className="scroll-mt-[calc(var(--hdr-h)+24px)] border-t border-[#11111124] py-14 first:border-t-0 first:pt-0 sm:py-20 sm:first:pt-0"
              >
                {s.label && <p className={LABEL}>{s.label}</p>}
                <Body s={s} />
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}