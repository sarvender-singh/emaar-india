import { notFound } from "next/navigation";
import { getPage } from "@/services/pageService";
import CareersMasthead from "@/components/careers/CareersMasthead";
import CareersBody from "@/components/careers/CareersBody";

export async function generateMetadata() {
  const page = await getPage("careers");
  if (!page) return {};
  const { title, description, image } = page.seo;
  return {
    title,
    description,
    alternates: { canonical: "/careers" },
    openGraph: { title, description, images: image ? [image] : [] },
  };
}

export default async function CareersPage() {
  const page = await getPage("careers");
  if (!page) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: page.masthead.breadcrumb.map((b, i) => ({
      "@type": "ListItem", position: i + 1, name: b.label, ...(b.href ? { item: b.href } : {}),
    })),
  };

  return (
    <main id="main-content" data-testid="careers-page" className="w-full bg-[#f6f3ec] pt-[var(--hdr-h)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CareersMasthead data={page.masthead} />
      <CareersBody quote={page.quote} body={page.body} form={page.form} />
    </main>
  );
}