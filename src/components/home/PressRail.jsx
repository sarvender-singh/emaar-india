"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import StageSection from "@/components/StageSection";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

function Arrow({ dir }) {
  return (
    <svg
      viewBox="0 0 26 10"
      width="26"
      height="10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={dir === "next" ? "M1 5h24M20 1l5 4-5 4" : "M25 5H1M6 1L1 5l5 4"}
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
}

const arrowButton =
  "grid size-11 shrink-0 place-items-center border border-[#1c1a17]/25 text-[#1c1a17] transition-colors enabled:hover:bg-[#1c1a17] enabled:hover:text-white disabled:cursor-default disabled:opacity-25 focus-visible:outline-2 focus-visible:outline-offset-2";

export default function PressRail({ data }) {
  const {
    id = "press",
    eyebrow,
    title,
    lede,
    allLabel,
    allHref,
    items = [],
  } = data;

  const trackRef = useRef(null);
  const barRef = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const track = trackRef.current;
    const bar = barRef.current;

    if (!track || !bar) return;

    const update = () => {
      const totalWidth = track.scrollWidth;
      const visibleWidth = track.clientWidth;
      const maxScroll = Math.max(0, totalWidth - visibleWidth);
      const scrollLeft = Math.min(maxScroll, Math.max(0, track.scrollLeft));

      bar.style.width = `${totalWidth ? (visibleWidth / totalWidth) * 100 : 100}%`;
      bar.style.left = `${totalWidth ? (scrollLeft / totalWidth) * 100 : 0}%`;

      const start = scrollLeft <= 2;
      const end = scrollLeft >= maxScroll - 2;

      setEdge((previous) =>
        previous.start === start && previous.end === end
          ? previous
          : { start, end }
      );
    };

    update();

    track.addEventListener("scroll", update, { passive: true });

    const observer = new ResizeObserver(update);
    observer.observe(track);

    return () => {
      track.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [items.length]);

  function go(direction) {
    const track = trackRef.current;
    const firstCard = track?.children[0];

    if (!firstCard) return;

    const secondCard = track.children[1];
    const step = secondCard
      ? secondCard.offsetLeft - firstCard.offsetLeft
      : firstCard.offsetWidth;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    track.scrollBy({
      left: direction * step,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <StageSection
      id={id}
      aria-labelledby={`${id}-title`}
      data-testid="press-rail"
      className="flex min-h-svh flex-col justify-center pb-8 pt-[calc(var(--hdr-h,68px)+16px)] font-sans [--press-inset:24px] sm:[--press-inset:40px] lg:[--press-inset:5vw]"
      style={{ background: "#eeebe6", color: "#1c1916" }}
    >
      {/* Section heading */}
      <div
        className="mx-[var(--press-inset)]"
        style={{
          transform: "translate3d(0, calc((1 - var(--enter, 1)) * 50px), 0)",
          opacity: "min(1, calc(var(--enter, 1) * 2.2))",
        }}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-[4vw]">
          <div className="min-w-0 flex-1">
            {eyebrow && (
              <p className="m-0 font-nav text-[10px] font-semibold uppercase leading-[1.4] tracking-[0.22em] text-[#625c55]">
                {eyebrow}
              </p>
            )}

            <h2
              id={`${id}-title`}
              className="mb-0 mt-3 font-serif text-[34px] font-normal leading-[1.06] sm:text-[46px] lg:text-[clamp(48px,4vw,64px)]"
            >
              {title}
            </h2>

            {lede && (
              <p className="mb-0 mt-4 text-[15px] font-normal leading-[1.6] text-[#625949] lg:mt-5 lg:text-[16px]">
                {lede}
              </p>
            )}
          </div>

          {allHref && allLabel && (
            <Link
              href={allHref}
              className="inline-flex shrink-0 items-center gap-2 self-start font-nav text-[11px] font-semibold uppercase leading-[1.4] tracking-[0.2em] text-[#504d4d] transition-colors hover:text-black lg:mb-3 lg:self-end"
            >
              {allLabel}
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>

        <div
          aria-hidden="true"
          className="mt-4 h-px w-full bg-[#1c1916]/30 lg:w-[83%]"
        />
      </div>

      {/* Press cards */}
      <div
        className="mt-4 min-w-0"
        style={{
          transform: "translate3d(0, calc((1 - var(--enter, 1)) * 90px), 0)",
          opacity: "min(1, calc((var(--enter, 1) - 0.15) * 2.2))",
        }}
      >
        <ul
          ref={trackRef}
          tabIndex={0}
          aria-label={title}
          data-testid="press-track"
          className="relative m-0 ml-[var(--press-inset)] flex list-none snap-x snap-mandatory gap-[var(--press-gap)] overflow-x-auto p-0 [--press-gap:16px] [scrollbar-width:none] sm:[--press-gap:20px] lg:[--press-gap:1.5vw] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <li
              key={item.slug}
              data-testid="press-card"
              className="min-w-0 shrink-0 basis-[84%] snap-start sm:basis-[45%] lg:basis-[calc((100%_-_3_*_var(--press-gap))_/_3.5)]"
            >
              <Link
                href={item.href}
                draggable={false}
                className="group block text-current no-underline focus-visible:outline-2 focus-visible:-outline-offset-2"
              >
                <figure className="relative m-0 aspect-[7/4] overflow-hidden bg-black/5">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 84vw"
                    quality={75}
                    draggable={false}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
                  />
                </figure>

                <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1 font-nav text-[10.5px] font-semibold uppercase leading-[1.4] tracking-[0.2em] text-[#575457] lg:mt-5">
                  <time dateTime={item.date}>
                    {dateFormatter.format(new Date(item.date))}
                  </time>

                  {item.category && (
                    <>
                      <span aria-hidden="true" className="text-[#aaa49c]">
                        /
                      </span>
                      <span>{item.category}</span>
                    </>
                  )}
                </div>

                <h3 className="mb-0 mt-2.5 line-clamp-2 font-serif text-[19px] font-normal leading-[1.25] text-[#211d19] transition-colors group-hover:text-[#625949] lg:text-[clamp(19px,1.35vw,24px)]">
                  {item.title}
                </h3>
              </Link>
            </li>
          ))}
        </ul>

        {/* Progress and arrows */}
        <div className="mx-[var(--press-inset)] mt-7 flex items-center gap-5 lg:mt-8 lg:gap-10">
          <div className="relative h-px flex-1 bg-[#1c1916]/15" aria-hidden="true">
            <span
              ref={barRef}
              className="absolute left-0 top-0 h-px bg-[#1c1916]"
            />
          </div>

          <div className="flex gap-2.5">
            <button
              type="button"
              aria-label="Previous press releases"
              disabled={edge.start}
              onClick={() => go(-1)}
              className={arrowButton}
            >
              <Arrow dir="prev" />
            </button>

            <button
              type="button"
              aria-label="Next press releases"
              disabled={edge.end}
              onClick={() => go(1)}
              className={arrowButton}
            >
              <Arrow dir="next" />
            </button>
          </div>
        </div>
      </div>
    </StageSection>
  );
}