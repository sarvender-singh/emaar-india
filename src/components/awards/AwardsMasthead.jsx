import Link from "next/link";

export default function AwardsMasthead({ data }) {
  const { breadcrumb, title, lede } = data;

  return (
    <section
      aria-labelledby="awards-title"
      data-testid="awards-masthead"
      className="px-[clamp(20px,4vw,64px)] pb-16 pt-10 text-[#1c1a17] sm:pb-24 lg:px-[max(5vw,32px)]"
    >
      <nav aria-label="Breadcrumb" data-testid="awards-breadcrumb">
        <ol className="m-0 flex list-none flex-wrap items-center gap-2.5 p-0 font-nav text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17]/65">
          {breadcrumb.map((b, i) => {
            const last = i === breadcrumb.length - 1;
            return (
              <li key={i} className="flex items-center gap-2.5">
                {b.href && !last ? (
                  <Link href={b.href} className="transition-colors hover:text-[#1c1a17]">
                    {b.label}
                  </Link>
                ) : (
                  <span aria-current="page">{b.label}</span>
                )}
                {!last && <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>

      <hr className="rule-draw mb-0 mt-10 h-px border-0 bg-[#1c1a17]/55 sm:mt-12" />

      <h1
        id="awards-title"
        className="mb-0 mt-12 max-w-[900px] font-serif text-[38px] font-light leading-[1.05] text-[#111] sm:mt-14 sm:text-[56px] lg:text-[64px]"
      >
        {title}
      </h1>

      {lede && (
        <p className="mb-0 mt-6 max-w-[660px] text-[18px] leading-[1.6] text-[#1c1a17]/70 sm:text-[20px]">
          {lede}
        </p>
      )}
    </section>
  );
}