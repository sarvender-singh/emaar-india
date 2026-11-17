"use client";

import { useEffect, useState } from "react";

export default function AboutIndex({ label, items }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean);
    if (!els.length) return;

    // screen ki upar-beech wali line jis section ko cross kare, wahi active
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-30% 0px -65% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav
      aria-label={label}
      data-testid="about-emaar-index"
      className="hidden lg:sticky lg:top-[calc(var(--hdr-h)+28px)] lg:block lg:self-start"
    >
      <ul className="m-0 list-none p-0">
        {items.map((i) => {
          const on = active === i.id;
          return (
            <li key={i.id} className="border-b border-[#1c1a17]/10">
              <a
                href={`#${i.id}`}
                aria-current={on ? "true" : undefined}
                data-testid="about-emaar-index-link"
                className={`flex items-center gap-3 py-[13px] text-[13px] transition-colors duration-300 ${
                  on ? "text-[#111]" : "text-[#1c1a17]/55 hover:text-[#1c1a17]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-px bg-current transition-all duration-300 ${on ? "w-[14px] opacity-100" : "w-0 opacity-0"}`}
                />
                <span className="font-nav text-[10px] tracking-[0.15em]">{i.n}</span>
                <span>{i.nav}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}