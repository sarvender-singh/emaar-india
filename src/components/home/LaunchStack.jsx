import Image from "next/image";
import Link from "next/link";

import StageSection from "@/components/StageSection";
import LaunchVideo from "@/components/LaunchVideo";
import { EnquiryButton } from "@/components/EnquiryModal";

export default function LaunchStack({ data }) {
  const {
    kicker,
    title,
    lede,
    cue,
    nextId,
    exploreLabel = "Explore",
    registerLabel = "Register",
    items = [],
  } = data;

  const cueTarget = nextId ?? (items.length ? "launch-first" : undefined);

  return (
    <>
      {/* Intro */}
      <StageSection aria-label={title} className="h-svh">
        <div className="absolute inset-0 grid place-items-center px-6 text-center">
          <div className="max-w-[820px]">
            <p className="m-0 font-nav text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">
              {kicker}
            </p>

            <h2 className="mb-0 mt-5 font-serif text-[28px] font-light leading-[1.1] sm:text-[48px]">
              {title}
            </h2>

            <p className="mx-auto mb-0 mt-6 max-w-[560px] text-[14px] leading-[1.7] text-white/75">
              {lede}
            </p>

            {cueTarget && (
              <a
                href={`#${cueTarget}`}
                className="mt-8 inline-flex flex-col items-center gap-4 font-nav text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40 transition-colors hover:text-white"
              >
                {cue}
                <span
                  aria-hidden="true"
                  className="relative block h-10 w-px overflow-hidden bg-white/10"
                >
                  <span className="launch-cue-line absolute inset-0 bg-white/15" />
                </span>
              </a>
            )}
          </div>
        </div>
      </StageSection>

      {/* Launch panels */}
      {items.map((project, index) => (
        <StageSection
          as="article"
          key={project.slug}
          id={index === 0 ? "launch-first" : undefined}
          aria-label={project.name}
          data-testid="launch-panel"
          className="h-svh"
        >
          <div className="absolute inset-0">
            {project.video ? (
              <LaunchVideo
                src={project.video}
                poster={project.image}
                label={`${project.name} film`}
              />
            ) : (
              <Image
                src={project.image}
                alt={`${project.name}, ${project.city}`}
                fill
                sizes="100vw"
                quality={80}
                priority={index === 0}
                draggable={false}
                className="object-cover"
              />
            )}
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-black/60 lg:via-black/15 lg:to-transparent"
          />

          <div className="absolute inset-0 flex items-end px-6 pb-[calc(var(--dock-h,64px)+3.5rem)] sm:px-12 lg:items-center lg:px-[5vw] lg:pb-0">
            <div className="w-full max-w-[680px] text-white">
              <h3 className="m-0 font-serif text-[32px] font-light leading-[1.05] sm:text-[48px] lg:text-[56px]">
                {project.name}
              </h3>

              <p className="mb-0 mt-5 font-nav text-[11px] font-semibold uppercase tracking-[0.25em] text-white/90 sm:mt-6">
                {project.city}
              </p>

              <p className="mb-0 mt-3 text-[15px] font-normal leading-[1.5] text-white sm:text-[16px]">
                {project.type}
                {project.config && (
                  <>
                    <span className="mx-2 text-white/55">/</span>
                    {project.config}
                  </>
                )}
              </p>

              {/* Starting price */}
              <div className="mt-5 sm:mt-6">
                <p className="m-0 font-nav text-[10px] font-semibold uppercase tracking-[0.23em] text-white/85">
                  From
                </p>
                <p className="mb-0 mt-1.5 text-[18px] font-normal leading-tight text-white">
                  ₹ {project.priceFrom ?? "XXXX"}
                </p>
              </div>

              {/* Explore opens the project page. Register opens Get in touch. */}
              <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-7">
                <Link
                  href={project.href}
                  data-testid="launch-explore"
                  className="group inline-flex min-h-11 items-center gap-2 font-nav text-[11px] font-semibold uppercase tracking-[0.18em] text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <span className="border-b border-white/70 pb-0.5 transition-colors group-hover:border-white">
                    {exploreLabel}
                  </span>

                  <svg
                    aria-hidden="true"
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    <path
                      d="M1 5h9M6.5 1.5 10 5 6.5 8.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="sr-only"> {project.name}</span>
                </Link>

                <EnquiryButton
                  source={`launch-${project.slug}`}
                  data-testid="launch-register"
                  className="inline-flex min-h-11 items-center justify-center border border-white/80 bg-transparent px-5 font-nav text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {registerLabel}
                  <span className="sr-only"> for {project.name}</span>
                </EnquiryButton>
              </div>
            </div>
          </div>
        </StageSection>
      ))}
    </>
  );
}