import { notFound } from "next/navigation";
import { getPage } from "@/services/pageService";
import MediaMasthead from "@/components/media/MediaMasthead";
import MediaSpine from "@/components/media/MediaSpine";

export async function generateMetadata() {
  const page = await getPage("media");
  if (!page) return {};
  const { title, description, image } = page.seo;
  return {
    title,
    description,
    alternates: { canonical: "/media" },
    openGraph: { title, description, images: image ? [image] : [] },
  };
}

export default async function MediaPage({ searchParams }) {
  const { tab } = await searchParams;
  const page = await getPage("media");
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
    <main id="main-content" data-testid="media-page" className="w-full bg-[#f6f3ec] pt-[var(--hdr-h)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MediaMasthead data={masthead} />
      {spine?.tabs?.length > 0 && <MediaSpine data={spine} initialTab={tab} />}
    </main>
  );
}