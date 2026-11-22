"use client";

import { useState } from "react";

const DownloadIcon = () => (
  <span
    aria-hidden="true"
    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1c1a17]/30 text-[#111] transition-colors duration-300 group-hover:bg-[#111] group-hover:text-white"
  >
    <svg viewBox="0 0 14 14" fill="none" className="h-3 w-3">
      <path d="M7 1v9m0 0L3 6m4 4 4-4M1 13h12" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  </span>
);

const pagerBtn =
  "border border-[#1c1a17]/60 px-4 py-3 transition-colors hover:bg-[#111] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit sm:px-5";

export default function InvestorSpine({ data }) {
  const { indexLabel, groups, pageSize = 6 } = data;
  const [groupId, setGroupId] = useState(groups[0].id);
  const [tabId, setTabId] = useState(groups[0].tabs[0].id);
  const [page, setPage] = useState(1);

  const group = groups.find((g) => g.id === groupId);
  const tab = group.tabs.find((t) => t.id === tabId) ?? group.tabs[0];

  const selectGroup = (g) => {
    setGroupId(g.id);
    setTabId(g.tabs[0].id);
    setPage(1);
  };

  const selectTab = (t) => {
    setTabId(t.id);
    setPage(1);
  };

  const rows = tab.type === "table" ? tab.rows : [];
  const hasYear = tab.type === "table" && tab.columns.length === 4;
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const visible = rows.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div
      data-testid="investor-spine"
      className="px-[clamp(20px,4vw,64px)] pb-40 text-[#1c1a17] sm:pb-24 lg:px-[max(5vw,32px)]"
    >
      {/* minmax(0,1fr) = column content ki wajah se phailega nahi */}
      <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-[5vw]">
        {/* Left: sections */}
        <nav
          aria-label={indexLabel}
          data-testid="investor-index"
          className="min-w-0 lg:sticky lg:top-[calc(var(--hdr-h)+28px)] lg:self-start"
        >
          <ul className="m-0 flex list-none gap-6 overflow-x-auto border-b border-[#11111124] p-0 [scrollbar-width:none] lg:block lg:gap-0 lg:overflow-visible lg:border-b-0 [&::-webkit-scrollbar]:hidden">
            {groups.map((g) => {
              const isActive = g.id === groupId;
              return (
                <li key={g.id} className="shrink-0 lg:shrink lg:border-b lg:border-[#11111112]">
                  <button
                    type="button"
                    onClick={() => selectGroup(g)}
                    aria-current={isActive ? "true" : undefined}
                    data-testid="investor-index-link"
                    className={`flex w-full items-center gap-3 whitespace-nowrap border-b-2 py-3 text-left text-[13px] transition-colors duration-300 lg:whitespace-normal lg:border-b-0 lg:py-[13px] ${
                      isActive
                        ? "border-[#111] text-[#111]"
                        : "border-transparent text-[#1c1a17]/55 hover:text-[#1c1a17]"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`hidden h-px bg-current transition-all duration-300 lg:block ${
                        isActive ? "w-[14px] opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                    <span>{g.nav}</span>
                  </button>

                  {/* Desktop sub-tabs */}
                  {isActive && g.tabs.length > 1 && (
                    <ul className="m-0 hidden list-none pb-3 pl-[26px] lg:block">
                      {g.tabs.map((t) =>
                        t.type === "link" ? (
                          <li key={t.id}>
                            <a
                              href={t.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block py-2 text-[12.5px] text-[#1c1a17]/55 transition-colors hover:text-[#1c1a17]"
                            >
                              {t.label}
                            </a>
                          </li>
                        ) : (
                          <li key={t.id}>
                            <button
                              type="button"
                              onClick={() => selectTab(t)}
                              className={`block py-2 text-left text-[12.5px] transition-colors ${
                                t.id === tab.id ? "text-[#111]" : "text-[#1c1a17]/55 hover:text-[#1c1a17]"
                              }`}
                            >
                              {t.label}
                            </button>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Mobile / tablet sub-tabs */}
          {group.tabs.length > 1 && (
            <div className="mt-4 flex flex-wrap gap-2 lg:hidden">
              {group.tabs.map((t) =>
                t.type === "link" ? (
                  <a
                    key={t.id}
                    href={t.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#1c1a17]/30 px-3 py-2 font-nav text-[10px] font-bold uppercase tracking-[0.12em]"
                  >
                    {t.label}
                  </a>
                ) : (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => selectTab(t)}
                    className={`border px-3 py-2 font-nav text-[10px] font-bold uppercase tracking-[0.12em] ${
                      t.id === tab.id
                        ? "border-[#111] bg-[#111] text-white"
                        : "border-[#1c1a17]/30 text-[#1c1a17]"
                    }`}
                  >
                    {t.label}
                  </button>
                )
              )}
            </div>
          )}
        </nav>

        {/* Right: content */}
        <div data-testid="investor-spine-body" className="min-w-0 lg:max-w-[1050px]">
          <h2 className="mb-0 font-serif text-[26px] font-light leading-[1.15] text-[#111] sm:text-[38px]">
            {group.title}
          </h2>

          {group.text && (
            <p className="mb-0 mt-4 max-w-[600px] text-[14px] leading-[1.75] text-[#1c1a17]/70 sm:mt-5 sm:text-[15px]">
              {group.text}
            </p>
          )}

          {tab.type === "table" && (
            <>
              {group.tabs.length > 1 && (
                <p className="m-0 mt-6 font-nav text-[10px] font-semibold uppercase tracking-[0.3em] text-[#1c1a17]/65 sm:mt-8">
                  {tab.label}
                </p>
              )}

              {/* Mobile: cards */}
              <ul className="m-0 mt-6 list-none border-t border-[#11111124] p-0 sm:mt-8 md:hidden">
                {visible.map((r, i) => (
                  <li key={i} className="border-b border-[#11111112]">
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Download ${r.doc}`}
                      className="group flex items-center justify-between gap-4 py-4"
                    >
                      <span className="min-w-0">
                        {(r.year || r.period) && (
                          <span className="block font-nav text-[10px] font-semibold uppercase tracking-[0.15em] text-[#1c1a17]/55">
                            {[hasYear ? r.year : null, r.period]
                              .filter((v) => v && v !== "-")
                              .join(" · ") || "\u00A0"}
                          </span>
                        )}
                        <span className="mt-1 block break-words text-[14px] leading-[1.45] text-[#111]">
                          {r.doc}
                        </span>
                      </span>
                      <DownloadIcon />
                    </a>
                  </li>
                ))}
              </ul>

              {/* Tablet / desktop: table */}
              <div className="mt-8 hidden border-t border-[#11111124] md:block">
                <table className="w-full table-fixed border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#11111112]">
                      {tab.columns.map((c, i) => {
                        const last = i === tab.columns.length - 1;
                        return (
                          <th
                            key={c}
                            className={`py-4 font-nav text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17]/65 ${
                              last ? "w-[80px] text-right" : "pr-4"
                            } ${c === "Document" ? "w-[40%]" : ""}`}
                          >
                            {c}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {visible.map((r, i) => (
                      <tr key={i} className="border-b border-[#11111112] align-middle">
                        {hasYear && (
                          <td className="py-5 pr-4 text-[14px] text-[#1c1a17]/70">{r.year}</td>
                        )}
                        <td className="py-5 pr-4 text-[14px] uppercase text-[#1c1a17]/70">{r.period}</td>
                        <td className="break-words py-5 pr-4 text-[15px] leading-[1.5] text-[#111]">
                          {r.doc}
                        </td>
                        <td className="py-3 text-right">
                          <a
                            href={r.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Download ${r.doc}`}
                            className="group inline-flex"
                          >
                            <DownloadIcon />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between gap-3 font-nav text-[10px] font-bold uppercase tracking-[0.2em] sm:mt-8 sm:justify-start sm:gap-4">
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className={pagerBtn}
                  >
                    Prev
                  </button>
                  <span className="text-[#1c1a17]/65">
                    {page} of {totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className={pagerBtn}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}

          {tab.type === "link" && (
            <div className="mt-8 border-t border-[#11111124] sm:mt-10">
              <a
                href={tab.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 border-b border-[#11111112] py-5"
              >
                <p className="m-0 font-serif text-[20px] font-light leading-[1.25] text-[#111] sm:text-[26px]">
                  {tab.label}
                </p>
                <DownloadIcon />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}