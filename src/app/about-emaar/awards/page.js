import { notFound } from "next/navigation";
import { getPage } from "@/services/pageService";
import AwardsMasthead from "@/components/awards/AwardsMasthead";
import AwardsSpine from "@/components/awards/AwardsSpine";

export async function generateMetadata() {
  const page = await getPage("awards");
  if (!page) return {};
  const { title, description, image } = page.seo;
  return {
    title,
    description,
    alternates: { canonical: "/about-emaar/awards" },
    openGraph: { title, description, images: image ? [image] : [] },
  };
}

export default async function AwardsPage() {
  const page = await getPage("awards");
  if (!page) notFound();

  const { masthead, spine } = page;
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
    <main
      id="main-content"
      data-testid="awards-page"
      className="w-full bg-[#f6f3ec] pt-[var(--hdr-h)]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AwardsMasthead data={masthead} />
      {spine?.years?.length > 0 && <AwardsSpine data={spine} />}
    </main>
  );
}