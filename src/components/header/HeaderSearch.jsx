// FILE: src/components/header/HeaderSearch.jsx

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { home } from "@/data/home";
export function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="7" />
      <path d="m15.5 15.5 6 6" strokeLinecap="round" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M1 6h8m4 0h6M1 14h3m4 0h11" />
      <circle cx="11" cy="6" r="2" />
      <circle cx="6" cy="14" r="2" />
    </svg>
  );
}

const explorePages = [
  { label: "New Launches", href: "/latest-launches" },
  { label: "Emaar Residential", href: "/properties/residential" },
  { label: "Emaar Business", href: "/properties/commercial" },
  { label: "About Emaar", href: "/about-emaar" },
  {
    label: "Explore all of Emaar",
    href: "/html-sitemap",
    sub: "Every section of the site, in one directory",
  },
];

const searchablePages = [
  ...explorePages,
  { label: "Investor Relations", href: "/investor-relations" },
  { label: "News and Media", href: "/media" },
  { label: "Sustainability", href: "/about-emaar/environmental-policy" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Careers", href: "/careers" },
  { label: "Frequently Asked Questions", href: "/faq" },
  { label: "Blog", href: "/blog" },
];

const filterFields = home.search.filters;

const priceLabels = {
  "under-1": "Under ₹1 Cr",
  "1-2": "₹1–2 Cr",
  "2-5": "₹2–5 Cr",
  "5-plus": "₹5 Cr+",
};

function getValues(project, key) {
  if (key === "bedrooms") {
    const configurations =
      project.type.match(
        /\d+(?:\s*(?:&|and|,)\s*\d+)*\s*(?:BHK|bedrooms?)/gi
      ) || [];

    return [
      ...new Set(
        configurations.flatMap((text) => text.match(/\d+/g) || [])
      ),
    ];
  }

  return project[key] ? [String(project[key])] : [];
}

function optionLabel(key, value) {
  if (value === "") return "Any";
  if (key === "priceBand") return priceLabels[value] || value;
  if (key === "bedrooms") {
    return `${value} ${value === "1" ? "bedroom" : "bedrooms"}`;
  }
  return value;
}

function projectLink(project) {
  return {
    id: project.slug,
    label: project.name,
    href: project.href,
    sub: project.enquiry ? "Enquire about this project" : "View project",
  };
}

export default function HeaderSearch({ logo, initialView, onClose }) {
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const headingRef = useRef(null);

  const [view, setView] = useState(initialView);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState({});
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;

    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (view === "search") {
      inputRef.current?.focus();
    } else {
      headingRef.current?.focus();
    }
  }, [view]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
      try {
        const response = await fetch("/api/header-search", {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Project search unavailable");

        const rows = await response.json();
        if (!Array.isArray(rows)) throw new Error("Invalid project list");

        setItems(rows);
        setStatus("ready");
      } catch {
        if (!controller.signal.aborted) setStatus("error");
      }
    }

    loadProjects();

    return () => controller.abort();
  }, [attempt]);

  function retry() {
    setStatus("loading");
    setAttempt((previous) => previous + 1);
  }

  const text = query.trim().toLowerCase();
const matches = items.filter((project) =>
  filterFields.every(({ key }) => {
    const selectedValue = selected[key] || "any";

    if (selectedValue === "any") return true;

    if (key === "type") return project.category === selectedValue;
    if (key === "city") return project.citySlug === selectedValue;
    if (key === "price") return project.priceBand === selectedValue;
    if (key === "status") return project.availability === selectedValue;

    return false;
  })
);

  let links = explorePages;

  if (view === "results") {
    links = matches.map(projectLink);
  } else if (text) {
    const matchingPages = searchablePages.filter((page) =>
      page.label.toLowerCase().includes(text)
    );

    const matchingProjects = items.filter((project) =>
      [
        project.name,
        project.community,
        project.city,
        project.type,
        project.category,
        project.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(text)
    );

    links = [...matchingPages, ...matchingProjects.map(projectLink)];
  }

  const closeButton = (
    <button
      type="button"
      className="eh-close"
      onClick={onClose}
      aria-label="Close search"
    >
      ×
    </button>
  );

  return (
    <dialog
      ref={dialogRef}
      className="eh-dialog"
      data-view={view}
      aria-label={view === "filters" ? "Property filters" : "Search Emaar"}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current && view === "filters") {
          onClose();
        }
      }}
    >
      {view === "filters" ? (
        <section className="eh-drawer">
          <header className="eh-drawer-head">
            <div>
              <small>Property search</small>
              <h2 ref={headingRef} tabIndex={-1}>
                Refine your search.
              </h2>
            </div>

            {closeButton}
          </header>

          <div className="eh-options">
  {filterFields.map((field) => (
    <fieldset key={field.key}>
      <legend>{field.label}</legend>

      <div className="eh-chips">
        {field.options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={(selected[field.key] || "any") === option.value}
            onClick={() =>
              setSelected((previous) => ({
                ...previous,
                [field.key]: option.value,
              }))
            }
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  ))}
</div>

          <footer className="eh-drawer-foot">
            <p aria-live="polite">
              {status === "loading" && "Loading projects…"}
              {status === "error" && "Projects could not be loaded."}
              {status === "ready" &&
                `${matches.length} ${
                  matches.length === 1 ? "project matches" : "projects match"
                } your criteria.`}
            </p>

            <div>
              <button type="button" onClick={() => setSelected({})}>
                Reset all
              </button>

              {status === "error" ? (
                <button type="button" onClick={retry}>
                  Retry
                </button>
              ) : (
                <button
                  type="button"
                  disabled={status !== "ready"}
                  onClick={() => {
                    setQuery("");
                    setView("results");
                  }}
                >
                  Show {matches.length} {matches.length === 1 ? "project" : "projects"}
                </button>
              )}
            </div>
          </footer>
        </section>
      ) : (
        <section className="eh-search-page">
          <Image
            className="eh-overlay-logo"
            src={logo.src}
            alt={logo.alt}
            width={120}
            height={48}
          />

          <div className="eh-search-grid">
            <div className="eh-tools">
              <label htmlFor="eh-query">
                <SearchIcon />
                Search Emaar
              </label>

              <button
                type="button"
                className="eh-find"
                onClick={() => setView("filters")}
              >
                <FilterIcon />
                Find your home
              </button>
            </div>

            <div className="eh-input">
              <SearchIcon />

              <input
                id="eh-query"
                ref={inputRef}
                type="search"
                autoComplete="off"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setView("search");
                }}
              />

              {closeButton}
            </div>

            <p
              className="eh-description"
              ref={headingRef}
              tabIndex={-1}
            >
              {view === "results"
                ? `${matches.length} matching projects`
                : text
                  ? `Search results for “${query}”`
                  : "Discover projects, investor relations, news, sustainability and help."}
            </p>

            <small className="eh-explore-label">
              {view === "results" || text ? "Results" : "Explore"}
            </small>

            <div className="eh-links">
              {links.map((link) => (
                <Link
                  href={link.href}
                  key={link.id || link.href}
                  onClick={onClose}
                >
                  <span>
                    {link.label}
                    {link.sub && <small>{link.sub}</small>}
                  </span>

                  <i aria-hidden="true">→</i>
                </Link>
              ))}

              {!links.length && status === "ready" && (
                <p>No matches. Try another search or adjust your filters.</p>
              )}

              {text && status === "loading" && <p>Loading projects…</p>}

              {text && status === "error" && (
                <button type="button" onClick={retry}>
                  Retry project search
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </dialog>
  );
}