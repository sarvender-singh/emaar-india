import Image from "next/image";
import Link from "next/link";

import StageSection from "@/components/StageSection";
import { about } from "@/data/about";

const awardImages = {
  "Emaar Broker Awards":
    "/images/awards/awards-image1-320x415.jpg",

  "Company of the Year":
    "/images/awards/awards-image2-320x415.jpg",

  "Middle East's Leading Tourist Attraction":
    "/images/awards/awards-burj-320x415.jpeg",

  "The Best Hotel Residences in the Middle East":
    "/images/awards/5.ADDMH-Residence-Banner-1920x535_tcm113-71341-320x415.jpg",
};

export default function FeaturedAwards() {
  const awards = about.spine.sections.find(
    (section) => section.id === "awards"
  );

  if (!awards?.items?.length) return null;

  return (
    <StageSection
      id="featured-awards"
      aria-labelledby="featured-awards-title"
      data-testid="featured-awards"
      className="flex min-h-screen flex-col justify-center px-5 pb-12 pt-[calc(var(--hdr-h,68px)+20px)] supports-[height:100dvh]:min-h-dvh sm:px-10 sm:pb-16 lg:px-[5vw]"
      style={{ background: "#f6f3ec", color: "#1c1a17" }}
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="border-b border-[#1c1a17]/20 pb-5 sm:pb-6">
          <p className="m-0 font-nav text-[10px] font-semibold uppercase leading-[1.4] tracking-[0.24em] text-[#685e50]">
            {awards.nav}
          </p>

          <h2
            id="featured-awards-title"
            className="mb-0 mt-3 font-serif text-[32px] font-normal uppercase leading-[1.1] sm:text-[40px] lg:text-[48px]"
          >
            {awards.title}
          </h2>
        </div>

        <ul className="m-0 mt-5 grid list-none grid-cols-2 gap-x-3 gap-y-7 p-0 sm:gap-x-5 lg:mt-6 lg:grid-cols-4 lg:gap-x-[1.5vw]">
          {awards.items.slice(0, 4).map((award) => {
            const configuredImage =
              typeof award.image === "string" ? award.image.trim() : "";

            const imageSrc = configuredImage || awardImages[award.title.trim()];

            return (
              <li key={award.title} className="min-w-0">
                {imageSrc && (
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#e5e0d7] lg:aspect-[16/10]">
                    <Image
                      src={imageSrc}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 22vw, 46vw"
                      className="object-contain"
                    />
                  </div>
                )}

                <h3 className="mb-0 mt-3 font-serif text-[18px] font-normal leading-[1.22] text-[#1c1a17] sm:mt-4 sm:text-[22px] lg:text-[25px]">
                  {award.title}
                </h3>

                <p className="mb-0 mt-2 font-sans text-[13px] font-normal leading-[1.5] text-[#655d50] sm:text-[14px]">
                  {award.by}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex justify-center sm:mt-10">
          <Link
            href={awards.cta.href}
            className="inline-flex min-h-11 items-center justify-center gap-3 border border-[#1c1a17] px-6 py-3 font-nav text-[11.5px] font-semibold uppercase leading-none tracking-[0.16em] text-[#1c1a17] transition-colors hover:bg-[#1c1a17] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            View all awards
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </StageSection>
  );
}