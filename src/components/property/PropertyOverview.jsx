import SectionEyebrow from "./SectionEyebrow";

const LABEL_CLASS =
  "m-0 font-nav text-[11px] font-semibold uppercase leading-[1.4] " +
  "tracking-[0.17em] text-[#756b59]";

const ICONS = {
  diamond: <path d="M12 3 20.4 12 12 21 3.6 12z" />,
  building: (
    <>
      <path d="M4 21V5.6A1.6 1.6 0 0 1 5.6 4h8.8A1.6 1.6 0 0 1 16 5.6V21" />
      <path d="M16 10.5h3.9A1.6 1.6 0 0 1 21.5 12v9" />
      <path d="M2.5 21h19" />
      <path d="M7 8h2M11 8h2M7 12h2M11 12h2M7 16h2M11 16h2" />
    </>
  ),
};

function FactIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 text-[#595854]"
    >
      {ICONS[name] ?? ICONS.diamond}
    </svg>
  );
}

export default function PropertyOverview({ data }) {
  const {
    eyebrow,
    title,
    lede,
    summary,
    keyFactsLabel,
    keyFacts = [],
  } = data;

  const priceFrom = summary?.priceFrom;
  const details = [
    { label: "Category", value: summary?.category },
    { label: "Type", value: summary?.type },
  ].filter((detail) => detail.value);

  const hasSummary = Boolean(priceFrom || details.length);

  return (
    <section
      id="overview"
      aria-labelledby="overview-title"
      data-testid="property-overview"
      className="bg-[#F6F2EA] px-[clamp(20px,4vw,80px)] pb-10 pt-4 text-[#151515] md:pb-16"
    >
      <SectionEyebrow>{eyebrow}</SectionEyebrow>

      <div
        className={[
          "mt-6 grid items-start gap-y-8",
          hasSummary &&
            "lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-x-[4vw]",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="min-w-0">
          <h2
            id="overview-title"
            className="m-0 max-w-[1100px] font-serif text-[30px] font-normal leading-[1.1] text-[#111112] sm:text-[38px] lg:text-[clamp(40px,3.1vw,52px)]"
          >
            {title}
          </h2>

          <p className="mb-0 mt-5 max-w-[770px] font-sans text-[16px] font-normal leading-[1.72] text-[#5c5346] sm:mt-6 lg:text-[clamp(16px,1.12vw,19px)]">
            {lede}
          </p>
        </div>

        {hasSummary && (
          <div
            data-testid="property-summary"
            className={[
              "min-w-0 rounded-[2px] border border-[#dfddd7] bg-[#fdfcfb]",
              "p-6 sm:p-8 lg:p-[clamp(30px,2.6vw,50px)]",
              "lg:sticky lg:top-[calc(var(--hdr-h,80px)_+_20px)] lg:self-start",
              "lg:col-start-2 lg:row-start-1",
              keyFacts.length > 0 && "lg:row-span-2",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {priceFrom && (
              <dl className="m-0">
                <dt className={LABEL_CLASS}>Prices from</dt>
                <dd className="mb-0 ms-0 mt-3 break-words font-serif text-[36px] font-normal leading-[1.1] text-[#111112] sm:text-[42px] lg:text-[clamp(42px,3.1vw,56px)]">
                  {priceFrom}
                </dd>
              </dl>
            )}

            {details.length > 0 && (
              <dl
                className={[
                  "m-0 grid gap-x-5 gap-y-4",
                  details.length > 1 && "grid-cols-2",
                  priceFrom && "mt-6 border-t border-[#dedbd5] pt-6",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {details.map(({ label, value }) => (
                  <div key={label} className="min-w-0">
                    <dt className={LABEL_CLASS}>{label}</dt>
                    <dd className="mb-0 ms-0 mt-2 break-words font-serif text-[21px] font-normal leading-[1.24] text-[#171717] sm:text-[24px] lg:text-[clamp(23px,1.65vw,30px)]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        )}

        {keyFacts.length > 0 && (
          <div className="w-full min-w-0 max-w-[770px] lg:col-start-1">
            <p className={`${LABEL_CLASS} mb-3`}>{keyFactsLabel}</p>

            <ul
              data-testid="property-key-facts"
              className="m-0 list-none border-t border-[#d5d2cb] p-0"
            >
              {keyFacts.map((fact) => (
                <li
                  key={fact.text}
                  className="flex items-center gap-4 border-b border-[#d5d2cb] py-4 font-serif text-[17px] font-normal leading-[1.35] text-[#181818] sm:gap-5 sm:text-[19px]"
                >
                  <FactIcon name={fact.icon} />
                  <span>{fact.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}