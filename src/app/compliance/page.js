import { notFound } from "next/navigation";
import { getPage } from "@/services/pageService";
import InvestorMasthead from "@/components/investor/InvestorMasthead";
import ComplianceSpine from "@/components/compliance/ComplianceSpine";

export async function generateMetadata() {
  const page = await getPage("compliance");
  if (!page) return {};
  const { title, description, image } = page.seo;
  return {
    title,
    description,
    alternates: { canonical: "/compliance" },
    openGraph: { title, description, images: image ? [image] : [] },
  };
}

export default async function CompliancePage() {
  const page = await getPage("compliance");
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
    <main id="main-content" data-testid="compliance-page" className="w-full bg-[#f6f3ec] pt-[var(--hdr-h)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <InvestorMasthead data={masthead} />
      {spine?.groups?.length > 0 && <ComplianceSpine data={spine} />}
    </main>
  );
}