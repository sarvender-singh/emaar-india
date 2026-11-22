import { notFound } from "next/navigation";
import { getPage } from "@/services/pageService";
import InvestorMasthead from "@/components/investor/InvestorMasthead";
import InvestorSpine from "@/components/investor/InvestorSpine";

export async function generateMetadata() {
  const page = await getPage("investor");
  if (!page) return {};
  const { title, description, image } = page.seo;
  return {
    title,
    description,
    alternates: { canonical: "/investor-relations" },
    openGraph: { title, description, images: image ? [image] : [] },
  };
}

export default async function InvestorRelationsPage() {
  const page = await getPage("investor");
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
      data-testid="investor-page"
      className="w-full bg-[#f6f3ec] pt-[var(--hdr-h)]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InvestorMasthead data={masthead} />
      {spine?.groups?.length > 0 && <InvestorSpine data={spine} />}
    </main>
  );
}