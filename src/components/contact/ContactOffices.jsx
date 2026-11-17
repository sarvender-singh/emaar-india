"use client";

import { useState } from "react";

const mapHref = (o) =>
  o.mapUrl ??
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.mapQuery ?? `${o.name}, ${o.country}`)}`;

const LINK = "border-b border-[#1c1a17]/40 pb-[2px] font-nav text-[10px] font-bold uppercase tracking-[0.12em] hover:opacity-60";

export default function ContactOffices({ data }) {
  const { items } = data;
  const regionOrder = ["UAE", "Middle East", "North Africa", "South Asia", "Türkiye", "Americas"];
  const found = [...new Set(items.map((o) => o.region))];
  const regions = [...regionOrder.filter((r) => found.includes(r)), ...found.filter((r) => !regionOrder.includes(r))];

  const [region, setRegion] = useState("all");
  const list = region === "all" ? items : items.filter((o) => o.region === region);
  const count = (r) => (r === "all" ? items.length : items.filter((o) => o.region === r).length);

  return (
    <div data-testid="contact-us-offices" className="mt-10">
      {regions.length > 1 && (
        <div role="group" aria-label="Filter offices by region" className="flex flex-wrap gap-3">
          {["all", ...regions].map((r) => {
            const on = region === r;
            return (
              <button key={r} type="button" aria-pressed={on} onClick={() => setRegion(r)}
                className={`flex items-center gap-2 border px-5 py-4 font-nav text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${
                  on ? "border-[#111] bg-[#111] text-white" : "border-[#1c1a17]/30 hover:border-[#111]"}`}>
                {r === "all" ? "All" : r}
                <span className={`text-[9px] font-normal ${on ? "text-white/70" : "text-[#1c1a17]/55"}`}>{count(r)}</span>
              </button>
            );
          })}
        </div>
      )}

      <p className="m-0 mt-8 text-[13px] text-[#1c1a17]/60" aria-live="polite">
        {list.length} {list.length === 1 ? "office" : "offices"}
      </p>

      <ul className="m-0 mt-4 list-none border-t border-[#1c1a17]/15 p-0">
        {list.map((o) => (
          <li key={o.id} data-testid="contact-us-offices-item"
            className="grid gap-4 border-b border-[#1c1a17]/10 py-9 md:grid-cols-[1fr_auto] md:gap-10">
            <div>
              <p className="m-0 font-nav text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c1a17]/60">{o.country}</p>
              <h3 className="mb-0 mt-2 font-serif text-[28px] font-light text-[#111]">{o.name}</h3>

              <address className="mt-5 max-w-[600px] text-[14px] not-italic leading-[1.85] text-[#1c1a17]/65">
                {o.lines?.map((l, i) => <span key={i} className="block">{l}</span>)}
                {o.details?.map((d, i) => (
                  <span key={i} className="block">
                    {d.label && `${d.label}: `}
                    {d.href ? <a href={d.href} className="text-[#111] hover:underline">{d.text}</a> : d.text}
                  </span>
                ))}
                {o.hours?.map((h, i) => <span key={i} className="block">{h}</span>)}
              </address>
            </div>

            <div className="flex items-start gap-5 md:justify-end md:pt-9">
              {o.phone && <a href={o.phone.href} className={LINK}>{o.phone.label}</a>}
              <a href={mapHref(o)} target="_blank" rel="noopener noreferrer"
                data-testid="contact-us-offices-map-trigger" className={`${LINK} tracking-[0.1em]`}>
                View Location
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}