import { notFound } from "next/navigation";
import { getPage } from "@/services/pageService";
import FoundationMasthead from "@/components/foundation/FoundationMasthead";
import FoundationBody from "@/components/foundation/FoundationBody";

export async function generateMetadata() {
  const page = await getPage("foundation");
  if (!page) return {};
  const { title, description, image } = page.seo;
  return {
    title,
    description,
    alternates: { canonical: "/about-emaar/emaar-foundation" },
    openGraph: { title, description, images: image ? [image] : [] },
  };
}

export default async function EmaarFoundationPage() {
  const page = await getPage("foundation");
  if (!page) notFound();

  const { masthead, body } = page;
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
      data-testid="emaar-foundation-page"
      className="w-full bg-[#f6f3ec] pt-[var(--hdr-h)]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FoundationMasthead data={masthead} />
      {body?.paragraphs?.length > 0 && <FoundationBody data={body} />}
    </main>
  );
}