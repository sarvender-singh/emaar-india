"use client";

import { useEffect, useState } from "react";

const BTN =
  "inline-flex h-10 w-10 items-center justify-center border border-[#1c1a17]/30 text-[12px] font-bold text-[#111] transition-colors hover:bg-[#111] hover:text-white";

export function ShareButtons({ title }) {
  const [copied, setCopied] = useState(false);

  const open = (build) => () => {
    const url = encodeURIComponent(window.location.href);
    window.open(build(url, encodeURIComponent(title)), "_blank", "noopener,noreferrer,width=600,height=500");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div>
      <p className="m-0 font-nav text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1c1a17]/65">Share</p>
      <div className="mt-3 flex gap-2">
        <button type="button" aria-label="Share on LinkedIn" className={BTN}
          onClick={open((u) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}`)}>in</button>
        <button type="button" aria-label="Share on X" className={BTN}
          onClick={open((u, t) => `https://twitter.com/intent/tweet?url=${u}&text=${t}`)}>X</button>
        <button type="button" aria-label="Share on Facebook" className={BTN}
          onClick={open((u) => `https://www.facebook.com/sharer/sharer.php?u=${u}`)}>f</button>
        <button type="button" aria-label={copied ? "Link copied" : "Copy link"} className={BTN} onClick={copy}>
          {copied ? "✓" : (
            <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.4">
              <path d="M6.5 9.5l3-3M7 4.5l1-1a2.5 2.5 0 013.5 3.5l-1 1M9 11.5l-1 1A2.5 2.5 0 014.5 9l1-1" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default function BlogToc({ label, items, title }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <aside
      data-testid="blog-toc"
      className="hidden lg:sticky lg:top-[calc(var(--hdr-h)+28px)] lg:block lg:self-start"
    >
      <p className="m-0 border-t border-[#11111124] pt-4 font-nav text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1c1a17]/65">
        {label}
      </p>
      <ul className="m-0 mt-4 list-none border-l border-[#11111112] p-0">
        {items.map((i) => {
          const on = i.id === active;
          return (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={on ? "true" : undefined}
                className={`-ml-px block border-l py-2 pl-4 text-[12.5px] leading-[1.4] transition-colors ${
                  on ? "border-[#111] text-[#111]" : "border-transparent text-[#1c1a17]/55 hover:text-[#1c1a17]"
                }`}
              >
                {i.title}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="mt-8">
        <ShareButtons title={title} />
      </div>
    </aside>
  );
}