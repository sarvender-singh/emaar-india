"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import StageSection from "@/components/StageSection";
import { EnquiryButton } from "@/components/EnquiryModal";

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

const ctaText =
  "font-nav text-[11px] font-semibold uppercase leading-none tracking-[0.16em]";

const arrowButton =
  "grid size-10 place-items-center border border-white/30 text-white transition-colors enabled:hover:bg-white enabled:hover:text-black disabled:cursor-default disabled:opacity-30 sm:size-11";

export default function DevelopmentsRail({ data }) {
  const {
    id = "developments",
    kicker,
    title,
    lede,
    allLabel,
    allHref,
    exploreLabel = "Explore",
    registerLabel = "Register",
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
      const total = track.scrollWidth;
      const viewport = track.clientWidth;
      const maxScroll = Math.max(0, total - viewport);
      const scrollLeft = Math.min(maxScroll, Math.max(0, track.scrollLeft));

      bar.style.width = `${total ? (viewport / total) * 100 : 100}%`;
      bar.style.left = `${total ? (scrollLeft / total) * 100 : 0}%`;

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
    const first = track?.children[0];

    if (!first) return;

    const second = track.children[1];
    const step = second
      ? second.offsetLeft - first.offsetLeft
      : first.offsetWidth;

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
      data-testid="developments-rail"
      className="flex min-h-svh flex-col bg-black pb-10 pt-[calc(var(--hdr-h,68px)+12px)] text-[#f4f1ec] [--rail-inset:24px] sm:[--rail-inset:40px] lg:[--rail-inset:5vw]"
    >
      {/* Section heading */}
      <div
        className="mx-[var(--rail-inset)] border-b border-white/20 pb-5"
        style={{
          transform: "translate3d(0, calc((1 - var(--enter, 1)) * 50px), 0)",
          opacity: "min(1, calc(var(--enter, 1) * 2.2))",
        }}
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[610px]">
            <p className="m-0 font-nav text-[10.5px] font-semibold uppercase leading-[1.4] tracking-[0.25em] text-white/65">
              {kicker}
            </p>

            <h2
              id={`${id}-title`}
              className="mb-0 mt-3 font-serif text-[32px] font-normal leading-[1.08] sm:text-[42px] lg:text-[46px]"
            >
              {title}
            </h2>

            {lede && (
              <p className="mb-0 mt-4 font-sans text-[15px] font-normal leading-[1.7] text-[#b9b3aa] sm:text-[17px]">
                {lede}
              </p>
            )}
          </div>

          {allHref && allLabel && (
            <Link
              href={allHref}
              className={`${ctaText} inline-flex shrink-0 items-center gap-2 self-start text-white/70 transition-colors hover:text-white lg:mb-1 lg:self-end`}
            >
              {allLabel}
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>

      {/* Horizontal project rail */}
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
          data-testid="developments-track"
          className="relative m-0 ml-[var(--rail-inset)] flex list-none snap-x snap-mandatory gap-[var(--rail-gap)] overflow-x-auto p-0 [--rail-gap:16px] [scrollbar-width:none] sm:[--rail-gap:20px] lg:[--rail-gap:clamp(18px,1.5vw,30px)] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((project) => (
            <li
              key={project.slug}
              data-testid="developments-card"
              className="flex min-w-0 shrink-0 basis-[82%] snap-start flex-col sm:basis-[43%] lg:basis-[calc((100%_-_4_*_var(--rail-gap))_/_4.5)]"
            >
              <figure className="group relative m-0 aspect-[16/10] overflow-hidden bg-white/5">
                <Image
                  src={project.image}
                  alt={[project.name, project.city].filter(Boolean).join(", ")}
                  fill
                  sizes="(min-width: 1024px) 21vw, (min-width: 640px) 43vw, 82vw"
                  quality={75}
                  draggable={false}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
                />
              </figure>

              <div className="flex flex-1 flex-col pt-4">
                <p className="m-0 font-nav text-[10px] font-semibold uppercase leading-[1.4] tracking-[0.2em] text-white/65">
                  {project.city}
                </p>

                <h3 className="mb-0 mt-2 font-serif text-[23px] font-normal leading-[1.15] lg:text-[25px]">
                  {project.name}
                </h3>

                <p className="mb-0 mt-2 font-sans text-[15px] font-normal leading-[1.45] text-[#f0ede8]">
                  {project.type}
                  {project.config && (
                    <>
                      <span className="mx-2 text-white/40">/</span>
                      {project.config}
                    </>
                  )}
                </p>

                <p className="mb-0 mt-1 font-sans text-[14px] font-normal leading-[1.5] text-[#b9b3aa]">
  From ₹ {project.priceFrom ?? "XXXX"}
</p>

                {/* Optional details can wrap while the card buttons stay aligned */}
               <div className="mt-auto flex w-full flex-col items-start gap-4 pt-7">
  <Link
    href={project.href}
    draggable={false}
    aria-label={`${exploreLabel} ${project.name}`}
    className={`${ctaText} group inline-flex min-h-7 items-center gap-2 text-[#f4f1ec] focus-visible:outline-2 focus-visible:outline-offset-4`}
  >
    <span className="border-b border-current pb-1">
      {exploreLabel}
    </span>

    <span
      aria-hidden="true"
      className="pb-1 transition-transform group-hover:translate-x-0.5"
    >
      →
    </span>
  </Link>

  <EnquiryButton
    source={`${id}-${project.slug}`}
    aria-label={`${registerLabel} for ${project.name}`}
    className={`${ctaText} flex h-11 w-full items-center justify-center rounded-none border border-[#e6e2dc] bg-transparent px-4 text-[#f4f1ec] transition-colors hover:bg-[#f4f1ec] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2`}
  >
    {registerLabel}
  </EnquiryButton>
</div>
              </div>
            </li>
          ))}
        </ul>

        {/* Scroll progress and arrows */}
        <div className="mx-[var(--rail-inset)] mt-6 flex items-center gap-5">
          <div className="relative h-px flex-1 bg-white/20" aria-hidden="true">
            <span ref={barRef} className="absolute top-0 h-px bg-white/85" />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label={`Previous projects in ${title}`}
              disabled={edge.start}
              onClick={() => go(-1)}
              className={arrowButton}
            >
              <Arrow dir="prev" />
            </button>

            <button
              type="button"
              aria-label={`Next projects in ${title}`}
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