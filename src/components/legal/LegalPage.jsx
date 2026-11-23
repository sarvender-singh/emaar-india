import MediaMasthead from "@/components/media/MediaMasthead";
import AboutContinue from "@/components/about/AboutContinue";
import LegalSpine from "./LegalSpine";

export default function LegalPage({ page, testId = "legal-page" }) {
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
    <main id="main-content" data-testid={testId} className="w-full bg-[#f6f3ec] pt-[var(--hdr-h)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MediaMasthead data={masthead} />
      {spine?.sections?.length > 0 && <LegalSpine data={spine} />}
      {page.continue?.items?.length > 0 && <AboutContinue data={page.continue} />}
    </main>
  );
}