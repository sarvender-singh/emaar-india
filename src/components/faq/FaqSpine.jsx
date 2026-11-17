"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import AboutIndex from "@/components/about/AboutIndex";

const stripHtml = (h) => h.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ");

const LABEL = "mb-3 block font-nav text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17]/65";
const OUTLINE_BTN =
  "inline-flex h-[46px] items-center border border-[#1c1a17]/60 px-7 font-nav text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:bg-[#111] hover:text-white";
const SOLID_BTN =
  "inline-flex h-[46px] items-center border border-[#111] bg-[#111] px-7 font-nav text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-transparent hover:text-[#111]";

const Arrow = () => (
  <svg viewBox="0 0 14 12" width="13" height="12" fill="none" aria-hidden="true">
    <path d="M1 6h11M8 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

function FaqList({ items, open }) {
  return (
    <div data-testid="faq-list" className="mt-10 border-t border-[#1c1a17]/15">
      {items.map((it) => (
        <details key={it.q} data-testid="faq-item" open={open ? true : undefined} className="group border-b border-[#1c1a17]/10">
          <summary data-testid="faq-item-toggle"
            className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-serif text-[20px] font-light leading-[1.3] text-[#111] sm:text-[22px] [&::-webkit-details-marker]:hidden">
            <span>{it.q}</span>
            <span aria-hidden="true"
              className="grid size-[34px] flex-none place-items-center rounded-full border border-[#1c1a17]/30 transition-transform duration-300 group-open:rotate-45">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <div
            className="pb-8 pr-12 text-[15px] leading-[1.75] text-[#1c1a17]/70 [&_a]:border-b [&_a]:border-current [&_a]:text-[#111] [&_li]:mt-1 [&_strong]:font-semibold [&_strong]:text-[#111] [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5"
            dangerouslySetInnerHTML={{ __html: it.a }}
          />
        </details>
      ))}
    </div>
  );
}

function FileList({ items }) {
  return (
    <ul data-testid="faq-files-list" className="m-0 mt-10 list-none border-t border-[#1c1a17]/15 p-0">
      {items.map((f) => (
        <li key={f.href} className="border-b border-[#1c1a17]/10">
          <a href={f.href} target="_blank" rel="noopener noreferrer" data-testid="faq-files-item"
            className="group flex items-center justify-between gap-6 py-6">
            <span className="font-serif text-[22px] font-light text-[#111]">{f.title}</span>
            <span className="flex items-center gap-4 font-nav text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17]/60">
              PDF<span className="sr-only"> (opens in a new tab)</span>
              <span aria-hidden="true"
                className="grid size-9 place-items-center rounded-full border border-[#1c1a17]/30 text-[#111] transition-[transform,border-color] duration-300 group-hover:translate-x-1 group-hover:border-[#1c1a17]/70">
                <Arrow />
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function FaqSpine({ data }) {
  const { indexLabel, search, empty, sections } = data;
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();

  // search ke hisaab se FAQ items filter (question + answer text me dhoondhta hai)
  const view = useMemo(
    () =>
      sections
        .map((s) =>
          s.type === "faq" && term
            ? { ...s, items: s.items.filter((it) => `${it.q} ${stripHtml(it.a)}`.toLowerCase().includes(term)) }
            : s
        )
        .filter((s) => (s.type === "faq" ? s.items.length > 0 : !term)), // search me fact sheet chhup jata hai
    [sections, term]
  );

  const indexItems = view.map(({ id, n, nav }) => ({ id, n, nav }));

  const count = view.filter((s) => s.type === "faq").reduce((n, s) => n + s.items.length, 0);

  return (
    <div data-testid="faq-spine" className="px-[clamp(20px,4vw,64px)] pb-24 text-[#1c1a17] lg:px-[max(5vw,32px)]">
      <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-[5vw]">
        <AboutIndex label={indexLabel} items={indexItems} />

        <div data-testid="faq-body" className="min-w-0 lg:max-w-[1050px]">
          <div id="search" data-testid="faq-search" className="scroll-mt-[calc(var(--hdr-h)+24px)] pb-8 sm:pb-10">
            <label htmlFor="faq-q" className={LABEL}>{search.label}</label>
            <input id="faq-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} autoComplete="off"
              placeholder={search.placeholder} aria-describedby="faq-count" data-testid="faq-search-input"
              className="w-full border border-[#1c1a17]/20 bg-white px-4 py-4 text-[15px] text-[#111] placeholder:text-[#1c1a17]/45 focus:border-[#111] focus:outline-none [&::-webkit-search-cancel-button]:appearance-none" />
            <p id="faq-count" aria-live="polite" data-testid="faq-search-count" className="m-0 mt-4 text-[13px] text-[#1c1a17]/60">
              {count} {count === 1 ? "answer" : "answers"}
            </p>
            {q && (
              <button type="button" onClick={() => setQ("")} data-testid="faq-search-clear" className={`${OUTLINE_BTN} mt-4`}>
                {search.clear}
              </button>
            )}
          </div>

          {view.map((s) => (
            <section key={s.id} id={s.id} data-testid={s.type === "files" ? "faq-files" : "faq-section"}
              className="scroll-mt-[calc(var(--hdr-h)+24px)] border-t border-[#1c1a17]/10 py-14 sm:py-20">
              <p className="m-0 font-nav text-[10px] font-semibold uppercase tracking-[0.3em] text-[#1c1a17]/65">{s.label}</p>
              <h2 className="mb-0 mt-5 font-serif text-[34px] font-light leading-[1.15] text-[#111] sm:text-[44px]">{s.title}</h2>
              {s.type === "files" ? <FileList items={s.items} /> : <FaqList items={s.items} open={Boolean(term)} />}
            </section>
          ))}

          {count === 0 && term && (
            <div data-testid="faq-empty" className="border-t border-[#1c1a17]/10 py-14">
              <p className="m-0 font-serif text-[26px] font-light text-[#111]">{empty.title}</p>
              <p className="mb-0 mt-4 max-w-[560px] text-[15px] leading-[1.7] text-[#1c1a17]/70">{empty.text}</p>
              <p className="mb-0 mt-6">
                <Link href={empty.action.href} data-testid="faq-empty-contact-link" className={SOLID_BTN}>{empty.action.label}</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}