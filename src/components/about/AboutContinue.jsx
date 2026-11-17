import Link from "next/link";

export default function AboutContinue({ data }) {
  const { label, items } = data;

  return (
    <section
      data-testid="editorial-continue-band"
      aria-labelledby="editorial-continue"
      className="border-t border-[#1c1a17]/10 bg-[#e4dfd7] pb-[clamp(75px,10.6vw,150px)] pt-[clamp(64px,9vw,128px)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-[clamp(20px,4vw,64px)]">
        <p
          id="editorial-continue"
          className="m-0 font-nav text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1c1a17]/65"
        >
          {label}
        </p>

        <div
          data-testid="editorial-continue-list"
          className="mt-[clamp(26px,3vw,38px)] grid grid-cols-1 border-t border-[#1c1a17]/15 min-[860px]:grid-cols-2 min-[860px]:gap-x-[clamp(34px,4vw,70px)]"
        >
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              data-testid="editorial-continue-link"
              className="group grid grid-cols-[1fr_auto] items-center gap-5 border-b border-[#1c1a17]/15 py-[clamp(20px,2.2vw,26px)] text-[#111] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]"
            >
              <span className="min-w-0">
                <span className="block font-serif text-[clamp(20px,2vw,27px)] font-light leading-[1.2]">
                  {it.title}
                </span>
                <span className="mt-[7px] block max-w-[34em] text-[13.5px] leading-[1.5] text-[#1c1a17]/65">
                  {it.text}
                </span>
              </span>

              {/* hover pe ye circle right me slide hota hai */}
              <span
                aria-hidden="true"
                className="grid size-9 flex-none place-items-center rounded-full border border-[#1c1a17]/30 text-[#111] transition-[transform,border-color] duration-300 ease-out group-hover:translate-x-1 group-hover:border-[#1c1a17]/70 group-focus-visible:translate-x-1 group-focus-visible:border-[#1c1a17]/70"
              >
                <svg viewBox="0 0 14 12" fill="none" aria-hidden="true" focusable="false" className="block size-[13px]">
                  <path d="M1 6h11M8 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}