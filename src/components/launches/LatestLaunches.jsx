// FILE: src/components/launches/LatestLaunches.jsx
"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import Link from "next/link";
import { projectHref } from "@/data/projects";

const PAD = "px-[clamp(20px,4vw,64px)]";
const EYEBROW = "font-nav text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1c1a17]/65";
const BTN =
  "inline-flex h-[60px] items-center justify-center border px-6 text-center font-nav text-[11px] font-bold uppercase tracking-[0.2em] transition-colors";
const BTN_DARK = `${BTN} border-[#111] bg-[#111] text-white hover:bg-[#2b2b2e]`;
const BTN_LINE = `${BTN} border-[#111]/40 bg-transparent text-[#111] hover:border-[#111]`;

function Card({ item }) {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const long = (item.description || "").length > 110;
  const label = item.category === "commercial" ? "Commercial" : "Residential";

  return (
    <li data-testid="launch-item" className="h-full">
      <article className="flex h-full flex-col border border-[#11111112] bg-[#fcfbf9]">
        <div className="relative aspect-[8/5] w-full overflow-hidden bg-[#e9e3d6]">
          {item.image && !failed ? (
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              onError={() => setFailed(true)}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <span className="absolute inset-0 grid place-items-center font-serif text-[22px] font-light text-[#1c1a17]/35">
              {item.name}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col px-6 pb-7 pt-7 sm:px-9">
          <p className={`${EYEBROW} m-0`}>{label}</p>
          <h2 className="m-0 mt-3 font-serif text-[28px] font-light leading-[1.2] text-[#111]">{item.name}</h2>
          {item.description && (
            <p className={`m-0 mt-4 text-[15px] leading-[1.8] text-[#6b675f] ${open ? "" : "line-clamp-3"}`}>
              {item.description}
            </p>
          )}
          {long && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className={`${EYEBROW} mt-4 self-start border-b border-[#1c1a17]/40 pb-1 text-left`}
            >
              {open ? "See less" : "See more"}
            </button>
          )}

          <div className="mt-auto grid grid-cols-2 gap-3 pt-8">
            <Link href="/contact-us" className={BTN_DARK}>
              Register interest
            </Link>
            <Link href={projectHref(item.slug)} className={BTN_LINE}>
              Explore<span className="sr-only"> {item.name}</span>
            </Link>
          </div>
        </div>
      </article>
    </li>
  );
}

export default function LatestLaunches({ page, items = [] }) {
  const [tab, setTab] = useState("all");

  const fresh = items.filter((i) => i.tag === "new");
  const available = items.filter((i) => !i.soldOut);

  const tabs = [
    { id: "all", label: "All launches", list: items },
    { id: "new", label: "Newly launched", list: fresh },
    { id: "available", label: "Now available", list: available },
  ];
  const current = tabs.find((t) => t.id === tab) ?? tabs[0];

  const stats = [
    [fresh.length, "Newly launched"],
    [available.length, "Now available"],
    [items.length, "Total launches"],
  ];

  const { cta } = page;

  return (
    <>
      <div className={`${PAD} pb-20 text-[#1c1a17] sm:pb-24`}>
        <nav aria-label="Breadcrumb" className={`${EYEBROW} pt-10 sm:pt-14`}>
          <Link href="/" className="hover:text-[#111]">
            <span aria-hidden="true" className="mr-3">←</span>Home
          </Link>
          <span aria-hidden="true" className="mx-3 opacity-50">/</span>
          <span className="text-[#6f6553]">Latest launches</span>
        </nav>

        <p className={`${EYEBROW} m-0 mt-16 flex items-center gap-5 sm:mt-20`}>
          <span>{page.eyebrow}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-[#11111124]" />
        </p>
        <h1 className="m-0 mt-6 font-serif text-[40px] font-light leading-[1.1] text-[#111] sm:text-[clamp(44px,4.6vw,76px)]">
          {page.title}
        </h1>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-[7vw]">
          <p className="m-0 max-w-[820px] text-[16px] leading-[1.9] text-[#6b675f] sm:text-[18px]">{page.lede}</p>
          <dl className="m-0 grid grid-cols-2 gap-x-10 gap-y-8 border-t border-[#11111124] pt-8">
            {stats.map(([n, l]) => (
              <div key={l}>
                <dd className="m-0 font-serif text-[44px] font-light leading-none text-[#111] sm:text-[52px]">{n}</dd>
                <dt className={`${EYEBROW} mt-4`}>{l}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div role="tablist" aria-label="Launch filter" className="mt-12 flex w-full flex-wrap border border-[#11111124] bg-white sm:w-fit">
          {tabs.map((t) => {
            const on = t.id === tab;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setTab(t.id)}
                className={`flex h-[64px] flex-1 items-center justify-center gap-3 whitespace-nowrap px-6 font-nav text-[11px] font-bold uppercase tracking-[0.18em] transition-colors sm:flex-none sm:px-9 ${
                  on ? "bg-[#111] text-white" : "text-[#111]/60 hover:text-[#111]"
                }`}
              >
                {t.label}
                <span className="text-[10px] opacity-60">{t.list.length}</span>
              </button>
            );
          })}
        </div>

        {current.list.length === 0 ? (
          <p className="mt-10 text-[15px] text-[#1c1a17]/70">No launches in this list yet.</p>
        ) : (
          <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 xl:grid-cols-3">
            {current.list.map((it) => (
              <Card key={it.slug} item={it} />
            ))}
          </ul>
        )}
      </div>

      {/* Register band */}
      <section className={`${PAD} bg-[#e5e0d8] py-20 text-[#1c1a17] sm:py-28`}>
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-[6vw]">
          <div className="max-w-[900px]">
            <p className={`${EYEBROW} m-0 flex items-center gap-5`}>
              <span>{cta.eyebrow}</span>
              <span aria-hidden="true" className="h-px flex-1 bg-[#11111124]" />
            </p>
            <h2 className="m-0 mt-6 font-serif text-[36px] font-light leading-[1.1] text-[#111] sm:text-[clamp(40px,4.4vw,72px)]">
              {cta.title}
            </h2>
            <p className="m-0 mt-6 max-w-[820px] text-[16px] leading-[1.9] text-[#6b675f]">{cta.text}</p>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Link href={cta.primary.href} className={`${BTN_DARK} px-8`}>
              {cta.primary.label}
            </Link>
            <Link href={cta.secondary.href} className={`${BTN_LINE} px-8`}>
              {cta.secondary.label}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}