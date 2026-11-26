import CareersForm from "./CareersForm";

const SECTION_PADDING = "px-5 sm:px-10 lg:px-[5.8vw]";

export default function CareersBody({ quote, body, form }) {
  const formId = form.id || "apply";

  return (
    <>
      <section
        aria-label={`Quote from ${quote.name}`}
        data-testid="careers-quote"
        className={`${SECTION_PADDING} bg-[#f7f5f0] py-12 sm:py-16 lg:py-[4.5vw]`}
      >
        <figure className="m-0 border-l border-[#55524d] pl-5 sm:pl-8 lg:pl-[2.9vw]">
          <blockquote className="m-0 max-w-[21em] font-serif text-[25px] font-normal leading-[1.26] text-[#151515] sm:text-[30px] lg:text-[clamp(30px,2.32vw,44px)]">
            “{quote.text}”
          </blockquote>

          <figcaption className="mt-6 font-sans sm:mt-7 lg:mt-[2vw]">
            <p className="m-0 text-[15px] font-normal leading-[1.5] text-[#191919]">
              {quote.name}
            </p>

            <p className="mb-0 mt-1 text-[13px] font-normal leading-[1.5] text-[#69686b]">
              {quote.role}
            </p>
          </figcaption>
        </figure>
      </section>

      <section
        aria-label="Career opportunities"
        data-testid="careers-body"
        className={`${SECTION_PADDING} bg-[#f7f5f0] pb-16 pt-4 sm:pb-20 lg:pb-[7vw] lg:pt-[2vw]`}
      >
        <p className="m-0 max-w-[44em] font-sans text-[16px] font-normal leading-[1.75] text-[#5c5346] lg:text-[clamp(16px,1.16vw,22px)]">
          {body}
        </p>

        <a
          href={`#${formId}`}
          className="mt-8 inline-flex min-h-[46px] items-center justify-center rounded-[2px] bg-[#111] px-6 py-3 font-nav text-[11.5px] font-semibold uppercase leading-[1.3] tracking-[0.13em] text-white transition-colors hover:bg-[#34312e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111] lg:mt-[2.6vw]"
        >
          Explore opportunities
        </a>
      </section>

      <section
        id={formId}
        aria-labelledby="apply-title"
        data-testid="careers-apply"
        className={`${SECTION_PADDING} scroll-mt-[calc(var(--hdr-h,72px)+20px)] border-t border-[#1c1a17]/15 bg-[#f7f5f0] pb-20 pt-12 sm:pb-24 sm:pt-14 lg:pb-[6vw] lg:pt-[4vw]`}
      >
        <h2
          id="apply-title"
          className="m-0 font-serif text-[32px] font-normal leading-[1.12] text-[#151515] sm:text-[38px] lg:text-[clamp(38px,2.8vw,48px)]"
        >
          {form.title}
        </h2>

        <p className="mb-0 mt-4 max-w-[40em] font-sans text-[16px] font-normal leading-[1.7] text-[#5c5346]">
          {form.text}
        </p>

        <CareersForm data={form} />
      </section>
    </>
  );
}