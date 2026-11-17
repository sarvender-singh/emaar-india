"use client";

import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import SectionEyebrow from "./SectionEyebrow";

const MAP_ICON =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z"/><path d="M9 4v14M15 6v14"/></svg>';
const CAR_ICON =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11a2 2 0 0 1 2 2v4h-2v1.5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V17H8v1.5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V17H3v-4a2 2 0 0 1 2-2Zm2.2 0h9.6l-1-3H8.2l-1 3ZM6.5 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm11 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/></svg>';

const OVERPASS_URLS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
];
const MAX_PER_CATEGORY = 40;
const GEO_PREFIX = "geo:";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const formatDistance = (m) => (m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km`);
const formatDuration = (s) => {
  const t = Math.max(1, Math.round(s / 60));
  return t >= 60 ? `${Math.floor(t / 60)} hr ${t % 60} min` : `${t} min`;
};

function row(icon, text, cls = "") {
  const el = document.createElement("div");
  el.className = `mlp-row ${cls}`;
  const i = document.createElement("span");
  i.innerHTML = icon; // static icon only
  const t = document.createElement("span");
  t.textContent = text;
  el.append(i, t);
  return el;
}

function distKm([lng1, lat1], [lng2, lat2]) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// '["amenity"="school"]' -> { key: "amenity", value: "school" }
function parseOsm(osm) {
  const m = /\["([^"]+)"="([^"]+)"\]/.exec(osm || "");
  return m ? { key: m[1], value: m[2] } : null;
}

// Style load hone ka wait (max 4s), taaki source/layer add na fail ho
function waitForStyle(map) {
  if (map.isStyleLoaded()) return Promise.resolve();
  return new Promise((resolve) => {
    const t = setTimeout(resolve, 4000);
    map.once("idle", () => {
      clearTimeout(t);
      resolve();
    });
  });
}

// Naam se coordinates (Nominatim / OpenStreetMap, free)
// FIX: bounded=1 hata diya, viewbox sirf preference hai (restriction nahi)
async function geocode(query, origin, signal) {
  const [lng, lat] = origin;
  const d = 0.25; // origin ke aas-paas ~25 km box
  const url =
    `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1` +
    `&viewbox=${lng - d},${lat + d},${lng + d},${lat - d}&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Nominatim ${res.status}`);
  const json = await res.json();
  if (!json[0]) return null;
  return [parseFloat(json[0].lon), parseFloat(json[0].lat)];
}

// coords wale places jaise hain, `query` wale places ko geocode + localStorage cache
async function resolvePlaces(list, origin, signal) {
  const out = [];
  for (const p of list) {
    if (p.coords) {
      out.push(p);
      continue;
    }
    if (!p.query) continue;

    let coords = null;
    try {
      const cached = localStorage.getItem(GEO_PREFIX + p.query);
      if (cached) coords = JSON.parse(cached);
    } catch {}

    if (!coords) {
      try {
        await sleep(1100); // Nominatim limit: 1 request/sec
        coords = await geocode(p.query, origin, signal);
        if (coords) {
          console.log(`[geo] ${p.name}: [${coords[0]}, ${coords[1]}]`); // permanent paste ke liye
          try {
            localStorage.setItem(GEO_PREFIX + p.query, JSON.stringify(coords));
          } catch {}
        } else {
          console.warn(`[geo] NOT FOUND: ${p.name} (${p.query})`);
        }
      } catch (err) {
        if (err.name === "AbortError") throw err;
        console.error(err);
      }
    }
    if (coords) out.push({ name: p.name, coords });
  }
  return out;
}

// Saari OSM categories ek hi Overpass query mein
async function fetchAllPOIs(origin, categories, signal) {
  const [lng, lat] = origin;
  const osmCats = categories.filter((c) => c.osm);
  if (!osmCats.length) return {};

  const body = osmCats
    .map((c) => `nwr${c.osm}["name"](around:${c.radius || 5000},${lat},${lng});`)
    .join("");
  const query = `[out:json][timeout:30];(${body});out center 500;`;

  let lastErr;
  for (const url of OVERPASS_URLS) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: "data=" + encodeURIComponent(query),
        signal,
      });
      if (!res.ok) throw new Error(`Overpass ${res.status}`);
      const json = await res.json();

      const out = {};
      osmCats.forEach((cat) => {
        const rule = parseOsm(cat.osm);
        const seen = new Set();
        out[cat.name] = (json.elements || [])
          .filter((e) => rule && e.tags?.[rule.key] === rule.value && e.tags?.name)
          .map((e) => ({
            name: e.tags.name,
            coords: [e.lon ?? e.center?.lon, e.lat ?? e.center?.lat],
          }))
          .filter((p) => {
            if (!p.coords[0] || !p.coords[1]) return false;
            const k = `${p.name}|${p.coords[0].toFixed(4)}|${p.coords[1].toFixed(4)}`;
            if (seen.has(k)) return false;
            seen.add(k);
            return true;
          })
          .sort((a, b) => distKm(origin, a.coords) - distKm(origin, b.coords))
          .slice(0, MAX_PER_CATEGORY);
      });
      return out;
    } catch (err) {
      if (err.name === "AbortError") throw err;
      lastErr = err;
    }
  }
  throw lastErr;
}

const FullIcon = ({ full }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {full ? (
      <path d="M9 3v6H3M15 3v6h6M9 21v-6H3M15 21v-6h6" />
    ) : (
      <path d="M3 9V3h6M21 9V3h-6M3 15v6h6M21 15v6h-6" />
    )}
  </svg>
);

export default function PropertyLocation({ data }) {
  const { eyebrow, mapTitle, openUrl, openLabel, note, origin, categories = [] } = data;

  const wrapRef = useRef(null);
  const mapElRef = useRef(null);
  const mapRef = useRef(null);
  const libRef = useRef(null);
  const destPopupRef = useRef(null);
  const poiMarkersRef = useRef([]);
  const lastCatRef = useRef(undefined);

  const [ready, setReady] = useState(false);
  // Sirf coords wale points se shuru: ye turant dikhte hain
  const [poi, setPoi] = useState(() =>
    Object.fromEntries(
      categories.filter((c) => c.places).map((c) => [c.name, c.places.filter((p) => p.coords)])
    )
  );
  const [status, setStatus] = useState("idle"); // idle | loading | error | done
  const [retryKey, setRetryKey] = useState(0);
  const [activeCat, setActiveCat] = useState(null); // null = sabhi
  const [selected, setSelected] = useState(null); // { name, coords }
  const [full, setFull] = useState(false);

  // 1) Map init (sirf ek baar)
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const mod = await import("maplibre-gl");
      const maplibregl = mod.default ?? mod;
      if (cancelled || !mapElRef.current) return;
      libRef.current = maplibregl;

      const map = new maplibregl.Map({
        container: mapElRef.current,
        style: "https://tiles.openfreemap.org/styles/positron",
        center: origin.coords,
        zoom: 12,
        cooperativeGestures: true,
        attributionControl: { compact: true },
      });
      mapRef.current = map;

      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");

      // Project marker + label
      const dot = document.createElement("div");
      dot.style.cssText =
        "width:18px;height:18px;border-radius:50%;background:#111;border:3px solid #fff;box-shadow:0 1px 6px rgba(0,0,0,.5)";
      new maplibregl.Marker({ element: dot }).setLngLat(origin.coords).addTo(map);

      const originBox = document.createElement("div");
      originBox.append(row(MAP_ICON, origin.name, "mlp-title"));
      new maplibregl.Popup({ closeOnClick: false, closeButton: false, offset: 16 })
        .setLngLat(origin.coords)
        .setDOMContent(originBox)
        .addTo(map);

      map.on("error", (e) => console.error("Map error:", e?.error || e));
      setReady(true); // DOM markers ko style load ka wait nahi chahiye
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [origin.coords, origin.name]);

  // 2) Fullscreen toggle
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    if (full) document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setFull(false);
    if (full) document.addEventListener("keydown", onKey);

    const id = requestAnimationFrame(() => mapRef.current?.resize());
    const id2 = setTimeout(() => mapRef.current?.resize(), 250);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      cancelAnimationFrame(id);
      clearTimeout(id2);
    };
  }, [full]);

  // 3) Live Overpass + curated geocoding, dono PARALLEL
  useEffect(() => {
    if (!ready) return;
    const controller = new AbortController();
    const curated = {};
    let live = null;
    let failed = false;

    const merge = () => {
      const merged = {};
      categories.forEach((c) => {
        const base = curated[c.name] || (c.places || []).filter((p) => p.coords);
        const names = new Set(base.map((p) => p.name.toLowerCase()));
        const extra = (live?.[c.name] || []).filter((p) => !names.has(p.name.toLowerCase()));
        merged[c.name] = [...base, ...extra];
      });
      setPoi(merged);
    };

    setStatus("loading");

    // a) Live Overpass: turant start, geocoding ka wait nahi
    const livePromise = fetchAllPOIs(origin.coords, categories, controller.signal)
      .then((res) => {
        live = res;
        merge();
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.error(err);
        failed = true;
      });

    // b) Curated geocoding: background mein, har category ke baad merge
    const curatedPromise = (async () => {
      for (const c of categories) {
        curated[c.name] = await resolvePlaces(c.places || [], origin.coords, controller.signal);
        merge();
      }
    })().catch((err) => {
      if (err.name !== "AbortError") console.error(err);
    });

    Promise.allSettled([livePromise, curatedPromise]).then(() => {
      if (!controller.signal.aborted) setStatus(failed ? "error" : "done");
    });

    return () => controller.abort();
  }, [ready, categories, origin.coords, retryKey]);

  // 4) Markers: activeCat null = sabhi, warna sirf wo category
  useEffect(() => {
    const map = mapRef.current;
    const maplibregl = libRef.current;
    if (!ready || !map || !maplibregl) return;

    poiMarkersRef.current.forEach((m) => m.remove());
    poiMarkersRef.current = [];

    // Selection sirf category badalne par reset ho, data load hone par nahi
    const catChanged = lastCatRef.current !== activeCat;
    lastCatRef.current = activeCat;
    if (catChanged) setSelected(null);

    const visible = categories.filter((_, i) => activeCat === null || i === activeCat);
    const bounds = new maplibregl.LngLatBounds(origin.coords, origin.coords);
    let count = 0;

    visible.forEach((cat) => {
      (poi[cat.name] || []).forEach((p) => {
        const el = document.createElement("button");
        el.type = "button";
        el.title = p.name;
        el.setAttribute("aria-label", p.name);
        el.style.cssText = `width:16px;height:16px;border-radius:50%;background:${cat.color || "#111"};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.45);cursor:pointer;padding:0`;
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          setSelected(p);
        });
        const m = new maplibregl.Marker({ element: el }).setLngLat(p.coords).addTo(map);
        poiMarkersRef.current.push(m);
        bounds.extend(p.coords);
        count++;
      });
    });

    // Agar user ne koi marker select kar rakha hai to map ko zoom-out mat karo
    if (!catChanged && destPopupRef.current) return;

    if (count) {
      const small = map.getContainer().clientWidth < 640;
      map.fitBounds(bounds, {
        padding: small
          ? { top: 90, bottom: 40, left: 30, right: 30 }
          : { top: 90, bottom: 50, left: 60, right: 60 },
        maxZoom: 15,
        duration: 800,
      });
    } else {
      map.flyTo({ center: origin.coords, zoom: 12, duration: 800 });
    }
  }, [ready, poi, activeCat, categories, origin.coords]);

  // 5) Marker select -> project se us point tak route + detail popup
  useEffect(() => {
    const map = mapRef.current;
    const maplibregl = libRef.current;
    if (!ready || !map || !maplibregl) return;

    const clearRoute = () => {
      destPopupRef.current?.remove();
      destPopupRef.current = null;
      if (map.getLayer("route-line")) map.removeLayer("route-line");
      if (map.getSource("route")) map.removeSource("route");
    };

    if (selected === null) {
      clearRoute();
      return;
    }

    const dest = selected;
    const controller = new AbortController();

    (async () => {
      try {
        const url =
          `https://router.project-osrm.org/route/v1/driving/` +
          `${origin.coords.join(",")};${dest.coords.join(",")}` +
          `?overview=full&geometries=geojson`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error("OSRM request failed");
        const json = await res.json();
        if (json.code !== "Ok") throw new Error("Route not found");

        const route = json.routes[0];
        const line = { type: "Feature", geometry: route.geometry };

        await waitForStyle(map);
        if (controller.signal.aborted) return;

        if (map.getSource("route")) {
          map.getSource("route").setData(line);
        } else {
          map.addSource("route", { type: "geojson", data: line });
          map.addLayer({
            id: "route-line",
            type: "line",
            source: "route",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: { "line-color": "#111", "line-width": 4 },
          });
        }

        destPopupRef.current?.remove();

        const box = document.createElement("div");
        box.append(
          row(MAP_ICON, dest.name, "mlp-title"),
          row(CAR_ICON, `${formatDistance(route.distance)} · ${formatDuration(route.duration)}`, "mlp-meta")
        );
        const link = document.createElement("a");
        link.className = "mlp-link";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.href =
          `https://www.google.com/maps/dir/?api=1&origin=${origin.coords[1]},${origin.coords[0]}` +
          `&destination=${dest.coords[1]},${dest.coords[0]}&travelmode=driving`;
        link.textContent = "Get directions →";
        box.append(link);

        destPopupRef.current = new maplibregl.Popup({
          closeOnClick: false,
          offset: 12,
          maxWidth: "240px",
        })
          .setLngLat(dest.coords)
          .setDOMContent(box)
          .addTo(map);

        const bounds = new maplibregl.LngLatBounds();
        route.geometry.coordinates.forEach((c) => bounds.extend(c));

        map.resize();
        const small = map.getContainer().clientWidth < 640;
        map.fitBounds(bounds, {
          padding: small ? { top: 90, bottom: 50, left: 40, right: 40 } : 100,
          maxZoom: 16,
          duration: 800,
        });
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      }
    })();

    return () => controller.abort();
  }, [selected, ready, origin.coords]);

  const onPick = (i) => {
    setActiveCat(activeCat === i ? null : i); // dobara dabane par wapas "All"
    if (!full && typeof window !== "undefined" && window.innerWidth < 768) {
      wrapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const chipBase =
    "flex flex-none items-center gap-2 whitespace-nowrap border border-[#111] px-3 py-2 font-nav text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors md:px-4 md:py-2.5 md:text-[11px] md:tracking-[0.12em]";

  return (
    <section
      id="location"
      aria-label={eyebrow}
      data-testid="property-location"
      className="bg-[#f6f3ec] px-4 pb-6 pt-6 text-[#F6F2EA] sm:px-[clamp(20px,4vw,64px)] md:pb-16 md:pt-8"
    >
      <SectionEyebrow>{eyebrow}</SectionEyebrow>

      <div
        ref={wrapRef}
        className={
          full
            ? "fixed inset-0 z-[100] h-full w-full overflow-hidden bg-[#e9e6df]"
            : "relative mt-5 aspect-square w-full overflow-hidden bg-black/5 sm:aspect-[16/8] md:mt-8 lg:aspect-[16/6.4]"
        }
      >
        {/* Category chips */}
        <div
          role="group"
          aria-label={mapTitle}
          className="absolute left-3 right-[60px] top-3 z-10 flex flex-nowrap gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible"
        >
          <button
            type="button"
            aria-pressed={activeCat === null}
            onClick={() => setActiveCat(null)}
            className={`${chipBase} ${activeCat === null ? "bg-[#111] text-white" : "bg-white text-[#111]"}`}
          >
            All
          </button>
          {categories.map((c, i) => (
            <button
              key={c.name}
              type="button"
              aria-pressed={activeCat === i}
              onClick={() => onPick(i)}
              className={`${chipBase} ${activeCat === i ? "bg-[#111] text-white" : "bg-white text-[#111]"}`}
            >
              <span
                aria-hidden="true"
                className="inline-block size-2.5 rounded-full border border-white"
                style={{ background: c.color || "#111" }}
              />
              {c.name}
            </button>
          ))}
        </div>

        {/* Status */}
        {status === "loading" && (
          <div className="absolute bottom-3 left-3 z-10 bg-white px-3 py-2 text-[12px] text-[#111] shadow-md">
            Loading nearby places…
          </div>
        )}
        {status === "error" && (
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-3 bg-white px-3 py-2 text-[12px] text-[#111] shadow-md">
            <span>Could not load all nearby places.</span>
            <button
              type="button"
              onClick={() => setRetryKey((k) => k + 1)}
              className="border border-[#111] px-2 py-1 font-semibold uppercase tracking-[0.1em]"
            >
              Retry
            </button>
          </div>
        )}

        {/* Fullscreen button */}
        <button
          type="button"
          onClick={() => setFull((v) => !v)}
          aria-label={full ? "Exit fullscreen" : "View map fullscreen"}
          aria-pressed={full}
          className="absolute right-3 top-3 z-20 grid size-10 place-items-center bg-white text-[#111] shadow-md"
        >
          <FullIcon full={full} />
        </button>

        <div className="absolute inset-0">
          <div ref={mapElRef} data-testid="property-map" style={{ width: "100%", height: "100%" }} />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 md:mt-5 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
        <p data-testid="property-map-note" className="m-0 max-w-[1000px] text-[12px] leading-[1.7] text-[#1c1a17]/65">
          {note}
        </p>
        {openUrl && (
          <a
            href={openUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 border border-[#111] px-4 py-2.5 font-nav text-[11px] font-semibold uppercase tracking-[0.12em] text-[#111] transition-colors hover:bg-[#111] hover:text-white"
          >
            {openLabel || "Open in Google Maps"}
          </a>
        )}
      </div>
    </section>
  );
}