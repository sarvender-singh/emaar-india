"use client";

import { usePathname } from "next/navigation";
import { footerHomeFaqs, footerKeywordsByPath } from "@/data/footer";

export default function FooterPageDetails() {
  const pathname = usePathname();

  if (!pathname) return null;

  const path = pathname.replace(/\/+$/, "") || "/";
  const keywords = footerKeywordsByPath[path] ?? [];
  const faqs = path === "/" ? footerHomeFaqs : [];

  if (!keywords.length && !faqs.length) return null;

  const sections = [];
  if (keywords.length) sections.push("Popular searches");
  if (faqs.length) sections.push("Frequently asked questions");

  return (
    <details
      key={path}
      className="group w-full border-t border-white/10 font-sans text-[#eeeae3]"
    >
      <summary
        className="mx-auto flex w-fit cursor-pointer list-none items-center justify-center p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [&::-webkit-details-marker]:hidden"
      >
        <span className="sr-only">{sections.join(" and ")}</span>

        <span className="grid size-11 place-items-center rounded-full border border-white/35 bg-[#f2efe9] text-[#141310] transition-colors hover:bg-white">
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            className="transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
          >
            <path
              d="m4 7 6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </summary>

      <div className="border-t border-white/10 py-7 lg:px-[clamp(22px,5vw,88px)] lg:py-10">
        {keywords.length > 0 && (
          <section aria-label="Popular searches">
            <h2 className="m-0 font-serif text-[24px] font-normal leading-tight">
              Popular searches
            </h2>

            <ul className="m-0 mt-4 grid list-none gap-x-8 gap-y-2 p-0 text-[15px] leading-relaxed text-[#c4c0b9] sm:grid-cols-2 lg:grid-cols-3">
              {keywords.map((keyword) => (
                <li key={keyword}>{keyword}</li>
              ))}
            </ul>
          </section>
        )}

        {faqs.length > 0 && (
          <section
            aria-label="Frequently asked questions"
            className={keywords.length ? "mt-8 border-t border-white/10 pt-7" : ""}
          >
            <h2 className="m-0 font-serif text-[24px] font-normal leading-tight">
              Frequently asked questions
            </h2>

            <dl className="m-0 mt-5 grid gap-x-10 gap-y-5 lg:grid-cols-2">
              {faqs.map(({ question, answer }) => (
                <div key={question}>
                  <dt className="font-sans text-[16px] font-semibold leading-snug text-[#eeeae3]">
                    {question}
                  </dt>
                  <dd className="m-0 mt-2 max-w-[62ch] text-[15px] leading-relaxed text-[#bdb9b2]">
                    {answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </div>
    </details>
  );
}