"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

const Chevron = ({ open }) => (
  <svg width="9" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"
    className={`flex-none transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 4.5h5.2M11.9 4.5H14M2 11.5h2.1M8.8 11.5H14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="9.6" cy="4.5" r="1.9" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="6.4" cy="11.5" r="1.9" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

const CloseIcon = ({ size = 11 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const labelOf = (f, v) => f.options.find((o) => o.value === v)?.label ?? f.options[0].label;
const initial = (filters) => Object.fromEntries(filters.map((f) => [f.key, "any"]));
// TODO: API aane par yahan real count lagana (values ke hisaab se fetch karke)
const getUnitCount = (values) => 464;

const isDesktop = () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

export default function HeroSearch({ data }) {
  const { filters, resultsPath, submitLabel, drawerKicker, drawerTitle } = data;
  const router = useRouter();
  const barRef = useRef(null);

  const [values, setValues] = useState(() => initial(filters));
  const [openKey, setOpenKey] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // mobile dock ki "Find your home" pill yahi drawer kholti hai
  useEffect(() => {
    const open = () => setDrawer(true);
    window.addEventListener("open-search", open);
    return () => window.removeEventListener("open-search", open);
  }, []);

  // bahar click / Escape -> dropdown band
  useEffect(() => {
    const onDown = (e) => {
      if (barRef.current && !barRef.current.contains(e.target)) setOpenKey(null);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenKey(null);
        setDrawer(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // desktop panel: bar/panel ke bahar click par band
  useEffect(() => {
    if (!drawer) return;
    const onDown = (e) => {
      if (!isDesktop()) return;
      if (barRef.current && !barRef.current.contains(e.target)) setDrawer(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [drawer]);

  // mobile drawer khulne par page scroll lock (desktop panel par nahi)
  useEffect(() => {
    if (!drawer || isDesktop()) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawer]);

  const set = (key, value) => setValues((v) => ({ ...v, [key]: value }));
  const reset = () => setValues(initial(filters));

  const go = (e) => {
    e?.preventDefault();
    const qs = new URLSearchParams();
    Object.entries(values).forEach(([k, v]) => v !== "any" && qs.set(k, v));
    setDrawer(false);
    setOpenKey(null);
    const query = qs.toString();
    router.push(query ? `${resultsPath}?${query}` : resultsPath);
  };

  const unitCount = getUnitCount(values);
  const unitLabel = unitCount === 1 ? "unit" : "units";

  const barFilters = filters.filter((f) => f.bar);

  // desktop panel layout: wide wale full width, baaki 2 columns me
  const wideFilters = filters.filter((f) => f.wide);
  const restFilters = filters.filter((f) => !f.wide);
  const colLeft = restFilters.filter((_, i) => i % 2 === 0);
  const colRight = restFilters.filter((_, i) => i % 2 === 1);

  // ek filter group (label + chips). prefix = desktop / mobile ids alag rakhne ke liye
  const renderGroup = (f, prefix) => (
    <div key={f.key} role="group" aria-labelledby={`${prefix}-${f.key}`} data-testid="adv-filters-group">
      <p
        id={`${prefix}-${f.key}`}
        className="m-0 mb-4 font-nav text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70"
      >
        {f.label}
      </p>
      <div className="flex flex-wrap gap-2.5">
        {f.options.map((o) => {
          const on = values[f.key] === o.value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={on}
              data-testid="adv-filters-chip"
              onClick={() => set(f.key, o.value)}
              className={`border px-4 py-2.5 text-[13px] font-medium transition-colors duration-200 ${
                on
                  ? "border-[#efe4d4] bg-[#efe4d4] text-black"
                  : "border-white/25 text-white hover:border-white/60"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP BAR: hero ke bottom me, next section ke cover ke saath upar uthta hai (--cover ScrollStage deta hai) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[5%] z-10 hidden justify-center px-6 lg:flex"
        style={{ transform: "translate3d(0, calc(var(--cover, 0) * -100svh), 0)" }}
      >
        <form
          ref={barRef}
          onSubmit={go}
          role="search"
          aria-label="Search properties"
          data-testid="home-search-form"
          className="pointer-events-auto relative flex w-full max-w-[980px] items-stretch border border-white/30 bg-[rgba(18,17,15,0.38)] text-white backdrop-blur-md"
        >
          {/* DESKTOP ADVANCED PANEL: bar ke upar, bar jitna chouda */}
          <div
            role="dialog"
            aria-label="Advanced filters"
            aria-hidden={!drawer}
            inert={!drawer}
            data-testid="adv-filters-panel"
            className={`absolute bottom-full left-[-1px] right-[-1px] z-30 mb-2 max-h-[calc(100svh-260px)] overflow-y-auto border border-white/15 bg-[rgba(16,15,13,0.97)] px-8 pb-9 pt-7 shadow-2xl transition-all duration-300 ${
              drawer ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="m-0 flex items-center gap-3 font-nav text-[11px] font-semibold uppercase tracking-[0.26em] text-white/80">
                <span className="h-px w-8 bg-white/50" aria-hidden="true" />
                Advanced filters
              </p>
              <button
                type="button"
                aria-label="Close filters"
                data-testid="adv-filters-close"
                onClick={() => setDrawer(false)}
                className="grid size-11 place-items-center rounded-full border border-white/30 transition-colors hover:bg-white/10"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-9">
              {wideFilters.map((f) => renderGroup(f, "dk"))}

              <div className="grid grid-cols-2 gap-x-14">
                <div className="flex flex-col gap-9">{colLeft.map((f) => renderGroup(f, "dk"))}</div>
                <div className="flex flex-col gap-9">{colRight.map((f) => renderGroup(f, "dk"))}</div>
              </div>
            </div>
          </div>

          {barFilters.map((f) => {
            const open = openKey === f.key;
            return (
              <div key={f.key} className="relative flex-1 border-r border-white/25">
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={open}
                  data-testid="home-search-select"
                  onClick={() => {
                    setDrawer(false);
                    setOpenKey(open ? null : f.key);
                  }}
                  className="flex h-full w-full flex-col items-start justify-center gap-1.5 px-6 py-3.5 text-left transition-colors hover:bg-white/5"
                >
                  <span className="font-nav text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    {f.label}
                  </span>
                  <span className="flex items-center gap-2 text-[14px] leading-none">
                    {labelOf(f, values[f.key])}
                    <Chevron open={open} />
                  </span>
                </button>

                <ul
                  role="listbox"
                  aria-label={f.label}
                  className={`absolute bottom-full left-0 z-20 mb-2 max-h-[22rem] w-max min-w-full overflow-y-auto bg-white py-0 text-[#1c1a17] shadow-2xl transition-all duration-200 ${
                    open ? "visible translate-y-0 opacity-100" : "invisible translate-y-1 opacity-0"
                  }`}
                >
                  {f.options.map((o) => {
                    const on = values[f.key] === o.value;
                    return (
                      <li key={o.value}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={on}
                          onClick={() => {
                            set(f.key, o.value);
                            setOpenKey(null);
                          }}
                          className={`flex w-full items-center justify-between gap-10 whitespace-nowrap px-6 py-4 text-left text-[15px] transition-colors hover:bg-[#f4efe7] ${
                            on ? "bg-[#f0ebe3]" : ""
                          }`}
                        >
                          {o.label}
                          {on && (
                            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" aria-hidden="true">
                              <path d="M1 4.5l3.2 3.2L11 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}

          <button
            type="button"
            aria-label="Advanced filters"
            aria-haspopup="dialog"
            aria-expanded={drawer}
            data-testid="home-search-filter-trigger"
            onClick={() => {
              setOpenKey(null);
              setDrawer((d) => !d);
            }}
            className={`grid w-[56px] flex-none place-items-center border-r border-white/25 transition-colors hover:bg-white/10 ${
              drawer ? "bg-white/10" : ""
            }`}
          >
            <FilterIcon />
          </button>

          <button
            type="submit"
            data-testid="home-search-submit"
            className="flex-none px-11 font-nav text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-white hover:text-black"
          >
            {submitLabel}
          </button>
        </form>
      </div>

      {/* MOBILE DRAWER (portal, sirf mobile/tablet par) */}
      {mounted &&
        createPortal(
          <>
            <div
              aria-hidden="true"
              onClick={() => setDrawer(false)}
              data-testid="search-drawer-backdrop"
              className={`fixed inset-0 z-[90] bg-black/60 transition-opacity duration-300 lg:hidden ${
                drawer ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            />
            <aside
              role="dialog"
              aria-modal="true"
              aria-label="Refine your search"
              data-testid="adv-filters-drawer"
              inert={!drawer}
              className={`fixed inset-y-0 right-0 z-[95] flex w-full max-w-[520px] flex-col bg-[#12110f] text-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] lg:hidden ${
                drawer ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 pb-7 pt-8 sm:px-8">
                <div>
                  <p className="m-0 font-nav text-[10px] font-semibold uppercase tracking-[0.3em] text-white/55">
                    {drawerKicker}
                  </p>
                  <h2 className="mb-0 mt-3 font-serif text-[30px] leading-[1.1]">{drawerTitle}</h2>
                </div>
                <button
                  type="button"
                  aria-label="Close filters"
                  onClick={() => setDrawer(false)}
                  className="grid size-11 flex-none place-items-center border border-white/20 transition-colors hover:bg-white/10"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-10 overflow-y-auto px-6 py-8 sm:px-8">
                {filters.map((f) => renderGroup(f, "mb"))}
              </div>

              <div className="border-t border-white/10 px-6 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] pt-4 sm:px-8">
                <p
                  data-testid="adv-filters-count"
                  aria-live="polite"
                  className="m-0 mb-4 text-[13px] text-white/70"
                >
                  {unitCount} {unitLabel} match your criteria.
                </p>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={reset}
                    data-testid="adv-filters-reset"
                    className="font-nav text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 underline-offset-4 hover:text-white hover:underline"
                  >
                    Reset all
                  </button>
                  <button
                    type="button"
                    onClick={go}
                    data-testid="adv-filters-apply"
                    className="ms-auto flex-1 bg-[#efe4d4] px-6 py-4 text-center font-nav text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-85"
                  >
                    Show {unitCount} {unitLabel}
                  </button>
                </div>
              </div>
            </aside>
          </>,
          document.body
        )}
    </>
  );
}