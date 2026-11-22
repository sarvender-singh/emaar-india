import { notFound } from "next/navigation";
import { getPage } from "@/services/pageService";
import PolicyMasthead from "@/components/environmental-policy/PolicyMasthead";
import PolicyBody from "@/components/environmental-policy/PolicyBody";

export async function generateMetadata() {
  const page = await getPage("environmentalPolicy");
  if (!page) return {};
  const { title, description, image } = page.seo;
  return {
    title,
    description,
    alternates: { canonical: "/about-emaar/environmental-policy" },
    openGraph: { title, description, images: image ? [image] : [] },
  };
}

export default async function EnvironmentalPolicyPage() {
  const page = await getPage("environmentalPolicy");
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
      data-testid="environmental-policy-page"
      className="w-full bg-[#f6f3ec] pt-[var(--hdr-h)]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PolicyMasthead data={masthead} />
      {body?.paragraphs?.length > 0 && <PolicyBody data={body} />}
    </main>
  );
}