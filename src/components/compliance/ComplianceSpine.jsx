"use client";

import { useMemo, useState } from "react";

const typeOf = (href) => {
  const ext = href.split("?")[0].split(".").pop().toLowerCase();
  if (ext === "pdf") return "PDF";
  if (["jpg", "jpeg", "png"].includes(ext)) return "Image";
  if (["doc", "docx"].includes(ext)) return "Doc";
  return "File";
};

const Arrow = () => (
  <span
    aria-hidden="true"
    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1c1a17]/30 text-[#111] transition-colors duration-300 group-hover:bg-[#111] group-hover:text-white"
  >
    <svg viewBox="0 0 14 12" fill="none" className="h-3 w-3">
      <path d="M4 10L10 4M10 4H5M10 4V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

function DocList({ items }) {
  return (
    <ul className="m-0 list-none border-t border-[#11111124] p-0">
      {items.map((it, i) => (
        <li key={`${it.href}-${i}`} className="border-b border-[#11111112]">
          <a
            href={it.href}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="compliance-item"
            className="group flex items-center justify-between gap-4 py-5"
          >
            <span className="min-w-0">
              <span className="block font-nav text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17]/55">
                {typeOf(it.href)}
              </span>
              <span className="mt-1 block break-words text-[14px] leading-[1.5] text-[#111] sm:text-[15px]">
                {it.title}
              </span>
            </span>
            <Arrow />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function ComplianceSpine({ data }) {
  const { indexLabel, groups } = data;
  const [groupId, setGroupId] = useState(groups[0].id);
  const [query, setQuery] = useState("");

  const group = groups.find((g) => g.id === groupId);

  const { items, sections } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const match = (it) => it.title.toLowerCase().includes(q);
    if (group.items) return { items: q ? group.items.filter(match) : group.items };
    const secs = group.sections
      .map((s) => ({ ...s, items: q ? s.items.filter(match) : s.items }))
      .filter((s) => s.items.length > 0);
    return { sections: secs };
  }, [group, query]);

  const count = items ? items.length : sections.reduce((n, s) => n + s.items.length, 0);

  const selectGroup = (g) => {
    setGroupId(g.id);
    setQuery("");
  };

  return (
    <div
      data-testid="compliance-spine"
      className="px-[clamp(20px,4vw,64px)] pb-40 text-[#1c1a17] sm:pb-24 lg:px-[max(5vw,32px)]"
    >
      <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-[5vw]">
        {/* Left */}
        <nav
          aria-label={indexLabel}
          data-testid="compliance-index"
          className="min-w-0 lg:sticky lg:top-[calc(var(--hdr-h)+28px)] lg:max-h-[calc(100vh-var(--hdr-h)-56px)] lg:self-start lg:overflow-y-auto"
        >
          <ul className="m-0 flex list-none gap-6 overflow-x-auto border-b border-[#11111124] p-0 [scrollbar-width:none] lg:block lg:gap-0 lg:overflow-visible lg:border-b-0 [&::-webkit-scrollbar]:hidden">
            {groups.map((g) => {
              const on = g.id === groupId;
              return (
                <li key={g.id} className="shrink-0 lg:shrink lg:border-b lg:border-[#11111112]">
                  <button
                    type="button"
                    onClick={() => selectGroup(g)}
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
                    <span>{g.nav}</span>
                  </button>

                  {/* Desktop: project links */}
                  {on && g.sections && (
                    <ul className="m-0 hidden list-none pb-3 pl-[26px] lg:block">
                      {g.sections.map((s) => (
                        <li key={s.id}>
                          <a
                            href={`#${s.id}`}
                            className="block py-1.5 text-[12.5px] text-[#1c1a17]/55 transition-colors hover:text-[#1c1a17]"
                          >
                            {s.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right */}
        <div data-testid="compliance-spine-body" className="min-w-0 lg:max-w-[1050px]">
          <h2 className="mb-0 font-serif text-[26px] font-light leading-[1.15] text-[#111] sm:text-[38px]">
            {group.title}
          </h2>

          <label
            htmlFor="compliance-search"
            className="mt-6 block font-nav text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17]/65 sm:mt-8"
          >
            Search {group.nav}
          </label>
          <input
            id="compliance-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search keywords"
            className="mt-3 h-[52px] w-full border border-[#11111124] bg-white px-4 text-[16px] text-[#111] outline-none placeholder:text-[#1c1a17]/45 focus:border-[#111] sm:max-w-[520px]"
          />
          <p className="m-0 mt-4 text-[13px] text-[#1c1a17]/60" aria-live="polite">
            {count} {count === 1 ? "document" : "documents"}
          </p>

          {count === 0 ? (
            <p className="mt-8 border-t border-[#11111124] pt-8 text-[15px] text-[#1c1a17]/70">
              No documents found. Try a different keyword.
            </p>
          ) : items ? (
            <div className="mt-6">
              <DocList items={items} />
            </div>
          ) : (
            sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                className="mt-10 scroll-mt-[calc(var(--hdr-h)+24px)] first:mt-6"
              >
                <h3 className="m-0 mb-4 font-serif text-[22px] font-light leading-[1.25] text-[#111] sm:text-[26px]">
                  {s.title}
                </h3>
                <DocList items={s.items} />
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  );
}