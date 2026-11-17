// src/app/contact-us/page.js
import { notFound } from "next/navigation";
import { getPage } from "@/services/pageService";
import ContactMasthead from "@/components/contact/ContactMasthead";
import ContactSpine from "@/components/contact/ContactSpine";
import AboutContinue from "@/components/about/AboutContinue";

export async function generateMetadata() {
  const page = await getPage("contact");
  if (!page) return {};
  const { title, description, image } = page.seo;
  return {
    title,
    description,
    alternates: { canonical: "/contact-us" },
    openGraph: { title, description, images: image ? [image] : [] },
  };
}

export default async function ContactPage() {
  const page = await getPage("contact");
  if (!page) notFound();

  // Ab 15 offices hain, isliye items[0] ki jagah id se Gurgaon office dhoondh rahe hain
  const office = page.spine.sections
    .find((s) => s.type === "offices")
    ?.items?.find((o) => o.id === "gurgaon");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Emaar",
    mainEntity: {
      "@type": "RealEstateAgent",
      name: "Emaar",
      telephone: "+97143661688",
      ...(office && {
        address: {
          "@type": "PostalAddress",
          streetAddress: office.lines.slice(0, 4).join(", "),
          addressLocality: "Gurgaon",
          addressRegion: "Haryana",
          postalCode: "122002",
          addressCountry: "IN",
        },
      }),
    },
  };

  return (
    <main id="main-content" data-testid="contact-us-page" className="w-full bg-[#f6f3ec] pt-[var(--hdr-h)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContactMasthead data={page.masthead} />
      <ContactSpine data={page.spine} />
      <AboutContinue data={page.continue} />
    </main>
  );
}