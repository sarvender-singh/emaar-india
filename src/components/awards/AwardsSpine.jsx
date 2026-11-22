"use client";

import { useEffect, useState } from "react";

export default function AwardsSpine({ data }) {
  const { indexLabel, years } = data;
  const [active, setActive] = useState(years[0]?.year);

  useEffect(() => {
    const els = years
      .map((y) => document.getElementById(`year-${y.year}`))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id.replace("year-", ""));
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [years]);

  return (
    <div
      data-testid="awards-spine"
      className="px-[clamp(20px,4vw,64px)] pb-24 text-[#1c1a17] lg:px-[max(5vw,32px)]"
    >
      <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-[5vw]">
        {/* Left: years index */}
        <nav
          aria-label={indexLabel}
          data-testid="awards-index"
          className="hidden lg:sticky lg:top-[calc(var(--hdr-h)+28px)] lg:block lg:max-h-[calc(100vh-var(--hdr-h)-56px)] lg:self-start lg:overflow-y-auto"
        >
          <ul className="m-0 list-none p-0">
            {years.map((y) => {
              const isActive = active === y.year;
              return (
                <li key={y.year} className="border-b border-[#1c1a17]/10">
                  <a
                    href={`#year-${y.year}`}
                    aria-current={isActive ? "true" : undefined}
                    data-testid="awards-index-link"
                    className={`flex items-center gap-3 py-[13px] text-[13px] transition-colors duration-300 ${
                      isActive ? "text-[#111]" : "text-[#1c1a17]/55 hover:text-[#1c1a17]"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-px bg-current transition-all duration-300 ${
                        isActive ? "w-[14px] opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                    <span>{y.year}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: year-wise awards */}
<div data-testid="awards-spine-body" className="min-w-0 lg:max-w-[1050px]">
  {years.map((y) => (
    <section
      key={y.year}
      id={`year-${y.year}`}
      data-testid="awards-year-section"
      className="scroll-mt-[calc(var(--hdr-h)+24px)] border-t border-[#11111124] py-14 first:border-t-0 first:pt-0 sm:py-20 sm:first:pt-0"
    >
      <h2 className="mb-0 font-serif text-[30px] font-light leading-[1.15] text-[#111] sm:text-[38px]">
        {y.year}
      </h2>

      <ul className="m-0 mt-10 list-none border-t border-[#11111112] p-0">
        {y.items.map((text, i) => (
          <li
            key={i}
            className="border-b border-[#11111112] py-5 text-[15px] leading-[1.75] text-[#1c1a17]/70"
          >
            {text}
          </li>
        ))}
      </ul>
    </section>
  ))}
</div>
      </div>
    </div>
  );
}