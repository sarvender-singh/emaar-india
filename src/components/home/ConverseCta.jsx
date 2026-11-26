import Link from "next/link";

import StageSection from "@/components/StageSection";
import { EnquiryButton } from "@/components/EnquiryModal";
import { WhatsappIcon } from "@/components/ui/icons";

const buttonClass =
  "inline-flex min-h-12 w-full items-center justify-center gap-2.5 border border-white/80 bg-transparent px-6 py-3 font-nav text-[11.5px] font-semibold uppercase leading-none tracking-[0.18em] text-white transition-colors duration-300 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto sm:min-w-[164px]";

export default function ConverseCta({ data }) {
  const {
    id = "converse",
    title,
    lede,
    video,
    cta,
    speakLabel = "Speak with us",
  } = data;

  return (
    <StageSection
      id={id}
      aria-labelledby="converse-title"
      data-testid="converse"
      className="flex min-h-svh items-center justify-center bg-black"
    >
      {/* Existing background video */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: "scale(calc(1.12 - var(--enter, 1) * 0.12))",
        }}
      >
        <video
          src={video.src}
          poster={video.poster}
          aria-label={video.label}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="block size-full object-cover"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/45 to-black/60"
      />

      {/* Heading, description and both CTAs */}
      <div
        className="relative z-10 mx-auto w-full max-w-[760px] px-6 py-24 text-center text-white sm:px-8"
        style={{
          transform: "translate3d(0, calc((1 - var(--enter, 1)) * 60px), 0)",
          opacity: "min(1, calc((var(--enter, 1) - 0.1) * 2))",
        }}
      >
        <h2
          id="converse-title"
          className="mx-auto my-0 max-w-[18ch] text-balance font-serif text-[36px] font-normal leading-[1.08] sm:text-[48px] lg:text-[54px]"
        >
          {title}
        </h2>

        <p className="mx-auto mb-0 mt-6 max-w-[620px] text-pretty font-sans text-[15px] font-normal leading-[1.7] text-white/95 sm:text-[17px] lg:mt-7">
          {lede}
        </p>

        <div className="mx-auto mt-8 flex w-full max-w-[240px] flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row lg:mt-9">
          <EnquiryButton
            source="home-converse"
            data-testid="converse-speak-cta"
            className={buttonClass}
          >
            {speakLabel}
          </EnquiryButton>

          <Link
            href={cta.href}
            target={cta.external ? "_blank" : undefined}
            rel={cta.external ? "noopener noreferrer" : undefined}
            data-testid="converse-cta"
            className={buttonClass}
          >
            {cta.icon === "whatsapp" && <WhatsappIcon size={15} />}
            {cta.label}
          </Link>
        </div>
      </div>
    </StageSection>
  );
}