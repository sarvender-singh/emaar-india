import { notFound } from "next/navigation";
import { getPage } from "@/services/pageService";
import AboutMasthead from "@/components/about/AboutMasthead";
import AboutSpine from "@/components/about/AboutSpine";
import AboutContinue from "@/components/about/AboutContinue";

export async function generateMetadata() {
  const page = await getPage("about");
  if (!page) return {};
  const { title, description, image } = page.seo;
  return {
    title,
    description,
    alternates: { canonical: "/about-emaar" },
    openGraph: { title, description, images: image ? [image] : [] },
  };
}

export default async function AboutPage() {
  const page = await getPage("about");
  if (!page) notFound();

  const { masthead } = page;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: masthead.breadcrumb.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.label,
      ...(b.href ? { item: b.href } : {}),
    })),
  };

  return (
    <main id="main-content" data-testid="about-emaar-page" className="w-full bg-[#f6f3ec] pt-[var(--hdr-h)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AboutMasthead data={masthead} />
      {page.spine?.sections?.length > 0 && <AboutSpine data={page.spine} />}
            {page.continue?.items?.length > 0 && <AboutContinue data={page.continue} />}
    </main>
  );
}