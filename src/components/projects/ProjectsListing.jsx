// FILE: src/components/projects/ProjectsListing.jsx
"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import Link from "next/link";
import { projectHref } from "@/data/projects";

const EYEBROW = "font-nav text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1c1a17]/65";
const BTN =
  "inline-flex h-[60px] min-w-[244px] items-center justify-center gap-3 border border-[#2b2b2e] bg-[#2b2b2e] px-8 font-nav text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#111]";

function Pic({ item, className = "" }) {
  const [failed, setFailed] = useState(false); // image file na mile to naam dikhao
  return (
    <div className={`relative aspect-[3/2] w-full overflow-hidden bg-[#e9e3d6] ${className}`}>
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
      {item.soldOut && (
        <span className="absolute left-3 top-3 bg-[#111] px-3 py-1.5 font-nav text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
          Sold out
        </span>
      )}
    </div>
  );
}

function Showcase({ item, flip }) {
  // Image ~1.9 hissa, text ~1 hissa (reference jaisa). Flip hone par columns bhi ulte.
  const cols = flip
    ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)]"
    : "lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)]";
  return (
    <li data-testid="project-item" className={`grid items-center gap-8 py-10 lg:gap-[6vw] lg:py-14 ${cols}`}>
      <Pic item={item} className={flip ? "lg:order-2" : ""} />
      <div className={`min-w-0 ${flip ? "lg:order-1" : ""}`}>
        <p className={`${EYEBROW} m-0 flex items-center gap-4`}>
          <span>{item.soldOut ? "Sold out" : "Available"}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-[#11111124]" />
        </p>
        <h2 className="m-0 mt-5 font-serif text-[34px] font-light leading-[1.15] text-[#111] sm:text-[clamp(36px,3.1vw,58px)]">
          {item.name}
        </h2>
        <span aria-hidden="true" className="mt-8 block h-px w-[100px] bg-[#11111124]" />
        {item.tagline && <p className="m-0 mt-8 text-[22px] leading-[1.4] text-[#5c5346]">{item.tagline}</p>}
        {item.type && <p className={`${EYEBROW} m-0 mt-6 text-[#1c1a17]/75`}>{item.type}</p>}
        <Link href={projectHref(item.slug)} className={`${BTN} mt-9`}>
          Explore <span aria-hidden="true">→</span>
          <span className="sr-only"> {item.name}</span>
        </Link>
      </div>
    </li>
  );
}

function Card({ item }) {
  return (
    <li data-testid="project-item">
      <Link
        href={projectHref(item.slug)}
        className="group flex h-full flex-col border border-[#11111112] bg-white transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
      >
        <Pic item={item} />
        <span className="flex flex-1 flex-col p-5">
          {item.type && <span className={EYEBROW}>{item.type}</span>}
          <span className="mt-3 block font-serif text-[24px] font-light leading-[1.25] text-[#111]">{item.name}</span>
          {item.tagline && <span className="mt-2 block text-[14px] leading-[1.6] text-[#6b675f]">{item.tagline}</span>}
          <span className="mt-auto pt-5 font-nav text-[11px] font-bold uppercase tracking-[0.2em] text-[#111]">
            Explore <span aria-hidden="true">→</span>
          </span>
        </span>
      </Link>
    </li>
  );
}

const ShowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden="true">
    <rect x="3" y="4" width="18" height="12" /><path d="M8 20h8M12 16v4" />
  </svg>
);
const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden="true">
    <rect x="3" y="4" width="8" height="6" /><rect x="13" y="4" width="8" height="6" />
    <rect x="3" y="14" width="8" height="6" /><rect x="13" y="14" width="8" height="6" />
  </svg>
);

export default function ProjectsListing({ title, lede, tabs = [], items = [] }) {
  const [view, setView] = useState("showcase");

  return (
    <div className="px-[clamp(20px,4vw,64px)] pb-32 text-[#1c1a17] sm:pb-24">
      {/* Masthead */}
      <nav aria-label="Breadcrumb" className={`${EYEBROW} pt-10 sm:pt-14`}>
        <Link href="/" className="hover:text-[#111]">Home</Link>
        <span aria-hidden="true" className="mx-3 opacity-50">/</span>
        <span className="text-[#6f6553]">Properties</span>
      </nav>

      <div className="max-w-[900px] pt-14 pb-10 sm:pt-20">
        <h1 className="m-0 font-serif text-[40px] font-light leading-[1.1] text-[#111] sm:text-[64px]">{title}</h1>
        <p className="m-0 mt-6 text-[16px] leading-[1.8] text-[#6b675f] sm:text-[18px]">{lede}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#11111124] pt-6">
        {/* 4 pages ke beech switch */}
        <ul className="m-0 flex list-none flex-wrap gap-x-7 gap-y-2 p-0">
          {tabs.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                aria-current={t.active ? "page" : undefined}
                className={`inline-block border-b-2 py-2 text-[13px] transition-colors ${
                  t.active ? "border-[#111] text-[#111]" : "border-transparent text-[#1c1a17]/55 hover:text-[#1c1a17]"
                }`}
              >
                {t.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Showcase / Grid toggle */}
        <div role="group" aria-label="View" className="flex h-[52px] border border-[#11111124] bg-white">
          {[["showcase", "Showcase", ShowIcon], ["grid", "Grid", GridIcon]].map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              aria-pressed={view === id}
              onClick={() => setView(id)}
              className={`flex items-center gap-2 px-5 font-nav text-[11px] font-bold uppercase tracking-[0.18em] transition-colors ${
                view === id ? "bg-[#111] text-white" : "text-[#111]/60 hover:text-[#111]"
              }`}
            >
              <Icon /> {label}
            </button>
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <p className="mt-10 text-[15px] text-[#1c1a17]/70">No properties found.</p>
      ) : view === "showcase" ? (
        <ul className="m-0 mt-4 list-none p-0">
          {items.map((it, i) => (
            <Showcase key={it.slug} item={it} flip={i % 2 === 1} />
          ))}
        </ul>
      ) : (
        <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((it) => (
            <Card key={it.slug} item={it} />
          ))}
        </ul>
      )}
    </div>
  );
}