import Link from "next/link";

export default function CareersMasthead({ data }) {
  const { breadcrumb, railLabel, title, lede, text } = data;

  return (
    <section
      aria-labelledby="careers-title"
      data-testid="careers-masthead"
      className="bg-[#f7f5f0] px-5 pb-16 pt-8 text-[#151515] sm:px-10 sm:pb-20 sm:pt-10 lg:px-[5.8vw] lg:pb-[6vw] lg:pt-[3.9vw]"
    >
      <nav aria-label="Breadcrumb">
        <ol className="m-0 flex list-none flex-wrap items-center gap-x-3 gap-y-2 p-0 font-nav text-[10px] font-semibold uppercase leading-[1.4] tracking-[0.19em] text-[#746b5d] sm:text-[11px]">
          {breadcrumb.map((item, index) => {
            const isLast = index === breadcrumb.length - 1;

            return (
              <li key={item.label} className="flex items-center gap-3">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-[#111] focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className="text-[#68676b]"
                  >
                    {item.label}
                  </span>
                )}

                {!isLast && (
                  <span aria-hidden="true" className="text-[#b6b2aa]">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <hr className="rule-draw mb-0 mt-9 h-px border-0 bg-[#181818] sm:mt-12 lg:mt-[4.3vw]" />

      <div className="mt-7 grid items-start gap-y-4 sm:mt-9 lg:mt-[2.65vw] lg:grid-cols-[23.75%_minmax(0,1fr)]">
        <p className="m-0 font-nav text-[10px] font-semibold uppercase leading-[1.5] tracking-[0.26em] text-[#57565a] sm:text-[11px] lg:pt-1">
          {railLabel}
        </p>

        <div className="min-w-0">
          <h1
            id="careers-title"
            className="m-0 font-serif text-[44px] font-normal leading-[1.05] text-[#111] sm:text-[52px] lg:text-[clamp(54px,4.2vw,76px)]"
          >
            {title}
          </h1>

          <p className="mb-0 mt-5 max-w-[38em] font-sans text-[18px] font-normal leading-[1.5] text-[#5c5346] sm:mt-6 lg:mt-[1.8vw] lg:text-[clamp(18px,1.36vw,24px)]">
            {lede}
          </p>

          <p className="mb-0 mt-10 max-w-[35em] font-sans text-[16px] font-normal leading-[1.75] text-[#5c5346] sm:mt-14 lg:mt-[5.8vw] lg:text-[clamp(16px,1.16vw,22px)]">
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}