"use client";
/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";

const isExternal = (href) => /^https?:\/\//.test(href);
const linkProps = (href) =>
  isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

const Arrow = () => (
  <span
    aria-hidden="true"
    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#1c1a17]/30 text-[#111] transition-all duration-300 group-hover:translate-x-1 group-hover:border-[#1c1a17]/70"
  >
    <svg viewBox="0 0 14 12" fill="none" className="h-3 w-3">
      <path d="M1 6h11M8 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  </span>
);

const Play = () => (
  <span aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#111]/80 text-white">
      <svg viewBox="0 0 12 14" className="ml-0.5 h-4 w-4" fill="currentColor">
        <path d="M0 0l12 7-12 7z" />
      </svg>
    </span>
  </span>
);

const ListIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="3" height="3" />
    <rect x="3" y="10.5" width="3" height="3" />
    <rect x="3" y="17" width="3" height="3" />
    <path d="M9 5.5h12M9 12h12M9 18.5h12" />
  </svg>
);

const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="8" height="6" />
    <rect x="13" y="4" width="8" height="6" />
    <rect x="3" y="14" width="8" height="6" />
    <rect x="13" y="14" width="8" height="6" />
  </svg>
);

const META = "font-nav text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17]/65";

function Meta({ item, tag }) {
  return (
    <p className={`${META} m-0 flex flex-wrap gap-x-4 gap-y-1`}>
      {item.date && <span>{item.date}</span>}
      <span className="text-[#6f6553]">{tag}</span>
    </p>
  );
}

function ListRow({ item, tag }) {
  return (
    <li className="border-b border-[#11111112]">
      <a
        href={item.href}
        {...linkProps(item.href)}
        data-testid="media-item"
        className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-5 gap-y-4 py-6 sm:grid-cols-[minmax(0,255px)_minmax(0,1fr)_auto] sm:gap-x-[40px] sm:py-8"
      >
        <span className="relative col-span-2 block aspect-[3/2] w-full overflow-hidden bg-black/5 sm:col-span-1">
          <img src={item.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
          {item.video && <Play />}
        </span>

        <div className="min-w-0">
          <Meta item={item} tag={tag} />
          <p className="m-0 mt-3 font-serif text-[20px] font-light leading-[1.3] text-[#111] sm:text-[26px]">
            {item.title}
          </p>
        </div>

        <Arrow />
        {isExternal(item.href) && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    </li>
  );
}

function GridCard({ item, tag }) {
  return (
    <li>
      <a
        href={item.href}
        {...linkProps(item.href)}
        data-testid="media-item"
        className="group flex h-full flex-col border border-[#11111112] bg-white transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
      >
        <span className="relative block aspect-[3/2] w-full overflow-hidden bg-black/5">
          <img src={item.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
          {item.video && <Play />}
        </span>
        <span className="flex flex-1 flex-col p-5">
          <Meta item={item} tag={tag} />
          <span className="mt-3 block font-serif text-[19px] font-light leading-[1.35] text-[#111]">{item.title}</span>
        </span>
        {isExternal(item.href) && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    </li>
  );
}

export default function MediaSpine({ data, initialTab }) {
  const { indexLabel, tabs, pageSize = 6 } = data;
  const [tabId, setTabId] = useState(tabs.find((t) => t.id === initialTab)?.id ?? tabs[0].id);
  const [query, setQuery] = useState("");
  const [view, setView] = useState("list");
  const [shown, setShown] = useState(pageSize);

  const tab = tabs.find((t) => t.id === tabId) ?? tabs[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? tab.items.filter((i) => i.title.toLowerCase().includes(q)) : tab.items;
  }, [tab, query]);

  const visible = filtered.slice(0, shown);

  const selectTab = (id) => {
    setTabId(id);
    setQuery("");
    setShown(pageSize);
  };

  return (
    <div
      data-testid="media-spine"
      className="px-[clamp(20px,4vw,64px)] pb-40 text-[#1c1a17] sm:pb-24 lg:px-[max(5vw,32px)]"
    >
      <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-[5vw]">
        {/* Left: tabs */}
        <nav
          aria-label={indexLabel}
          data-testid="media-index"
          className="min-w-0 lg:sticky lg:top-[calc(var(--hdr-h)+28px)] lg:self-start"
        >
          <ul className="m-0 flex list-none gap-6 overflow-x-auto border-b border-[#11111124] p-0 [scrollbar-width:none] lg:block lg:gap-0 lg:overflow-visible lg:border-b-0 [&::-webkit-scrollbar]:hidden">
            {tabs.map((t) => {
              const on = t.id === tab.id;
              return (
                <li key={t.id} className="shrink-0 lg:shrink lg:border-b lg:border-[#11111112]">
                  <button
                    type="button"
                    onClick={() => selectTab(t.id)}
                    aria-current={on ? "true" : undefined}
                    className={`flex w-full items-center gap-3 whitespace-nowrap border-b-2 py-3 text-left text-[13px] transition-colors duration-300 lg:border-b-0 lg:py-[13px] ${
                      on ? "border-[#111] text-[#111]" : "border-transparent text-[#1c1a17]/55 hover:text-[#1c1a17]"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`hidden h-px bg-current transition-all duration-300 lg:block ${
                        on ? "w-[14px] opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                    <span>{t.nav}</span>
                    <span className="font-nav text-[10px] tracking-[0.15em] opacity-60">{t.items.length}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: search + list */}
        <div data-testid="media-spine-body" className="min-w-0 lg:max-w-[1050px]">
          <label htmlFor="media-search" className={`${META} block`}>
            Search {tab.nav}
          </label>

          <div className="mt-3 flex items-stretch gap-3">
            <input
              id="media-search"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShown(pageSize);
              }}
              placeholder="Search keywords"
              className="h-[52px] min-w-0 flex-1 border border-[#11111124] bg-white px-4 text-[16px] text-[#111] outline-none placeholder:text-[#1c1a17]/45 focus:border-[#111] sm:max-w-[520px]"
            />

            <div className="ml-auto flex h-[52px] border border-[#11111124] bg-white" role="group" aria-label="View">
              {[
                ["list", "List view", ListIcon],
                ["grid", "Grid view", GridIcon],
              ].map(([id, label, Icon]) => (
                <button
                  key={id}
                  type="button"
                  aria-label={label}
                  aria-pressed={view === id}
                  onClick={() => setView(id)}
                  className={`flex w-[52px] items-center justify-center transition-colors sm:w-[60px] ${
                    view === id ? "bg-[#111] text-white" : "text-[#111] hover:bg-[#11111108]"
                  }`}
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          <p className="m-0 mt-4 text-[13px] text-[#1c1a17]/60" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
          </p>

          {filtered.length === 0 ? (
            <p className="mt-10 border-t border-[#11111124] pt-8 text-[15px] text-[#1c1a17]/70">
              No results found. Try a different keyword.
            </p>
          ) : view === "list" ? (
            <ul className="m-0 mt-6 list-none border-t border-[#11111124] p-0">
              {visible.map((it, i) => (
                <ListRow key={`${it.href}-${i}`} item={it} tag={tab.tag} />
              ))}
            </ul>
          ) : (
            <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-5 border-t border-[#11111124] p-0 pt-6 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((it, i) => (
                <GridCard key={`${it.href}-${i}`} item={it} tag={tab.tag} />
              ))}
            </ul>
          )}

          {filtered.length > pageSize && (
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10">
              {shown < filtered.length && (
                <button
                  type="button"
                  onClick={() => setShown((n) => n + pageSize)}
                  className="inline-flex h-[46px] items-center justify-center border border-[#111] px-7 font-nav text-[10px] font-bold uppercase tracking-[0.2em] text-[#111] transition-colors duration-300 hover:bg-[#111] hover:text-white"
                >
                  Load more
                </button>
              )}
              <span className="text-[13px] text-[#1c1a17]/60">
                {Math.min(shown, filtered.length)} of {filtered.length} shown
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}