import Link from "next/link";

export default function InvestorMasthead({ data }) {
  const { breadcrumb, title, lede } = data;

  return (
    <section
  aria-labelledby="investor-title"
  data-testid="investor-masthead"
  className="px-[clamp(20px,4vw,64px)] pb-10 pt-8 text-[#1c1a17] sm:pb-20 sm:pt-10 lg:px-[max(5vw,32px)]"
>
      <nav aria-label="Breadcrumb" data-testid="investor-breadcrumb">
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

      <hr className="rule-draw mb-0 mt-8 h-px border-0 bg-[#1c1a17]/55 sm:mt-12" />


     <h1
  id="investor-title"
  className="mb-0 mt-8 max-w-[900px] font-serif text-[34px] font-light leading-[1.08] text-[#111] sm:mt-14 sm:text-[56px] lg:text-[64px]"
>
  {title}
</h1>

{lede && (
  <p className="mb-0 mt-4 max-w-[660px] text-[16px] leading-[1.6] text-[#1c1a17]/70 sm:mt-6 sm:text-[20px]">
    {lede}
  </p>
)}
    </section>
  );
}