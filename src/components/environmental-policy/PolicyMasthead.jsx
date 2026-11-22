import Image from "next/image";
import Link from "next/link";

export default function PolicyMasthead({ data }) {
  const { breadcrumb, back, title, lede, image } = data;

  return (
    <section className="mx-auto w-full max-w-[1320px] px-5 pb-10 pt-10 md:px-16">
      <nav aria-label="Breadcrumb" data-testid="policy-breadcrumb">
        <ol className="m-0 flex list-none flex-wrap items-center gap-x-[10px] gap-y-[10px] p-0 text-[12px] font-semibold uppercase leading-[1.5] tracking-[0.18em] text-[#6a6a6d]">
          {breadcrumb.map((b, i) => {
            const last = i === breadcrumb.length - 1;
            return (
              <li key={i} className="contents">
                {b.href && !last ? (
                  <Link
                    href={b.href}
                    className="inline-flex min-h-[44px] items-center text-[#6f6553] transition-colors duration-300 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
                  >
                    {b.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="inline-flex items-center">
                    {b.label}
                  </span>
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

      <div className="mt-4 flex flex-col gap-[18px] md:mt-16">
        {back && (
          <Link
            href={back.href}
            className="inline-flex min-h-11 w-fit items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-900"
          >
            <svg viewBox="0 0 14 12" fill="none" aria-hidden="true" className="h-3 w-3.5">
              <path d="M13 6H1m5-5L1 6l5 5" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            {back.label}
          </Link>
        )}

        <h1 className="m-0 max-w-[22em] text-balance text-[clamp(34px,5vw,60px)] font-normal leading-[1.06] tracking-[-0.012em] text-neutral-900">
          {title}
        </h1>

        {lede && (
          <p className="m-0 max-w-[900px] uppercase leading-[1.68] text-[#5c5346]">
            {lede}
          </p>
        )}
      </div>

      {image?.src && (
        <div className="relative aspect-[16/9] overflow-hidden bg-[#ece7dc] lg:aspect-[21/9]">
          <Image
            src={image.src}
            alt={image.alt || ""}
            fill
            priority
            sizes="(min-width: 1440px) 1320px, 100vw"
            className="object-cover"
          />
        </div>
      )}
    </section>
  );
}