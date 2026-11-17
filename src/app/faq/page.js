// src/app/faq/page.js
import { notFound } from "next/navigation";
import { getPage } from "@/services/pageService";
import FaqMasthead from "@/components/faq/FaqMasthead";
import FaqSpine from "@/components/faq/FaqSpine";
import AboutContinue from "@/components/about/AboutContinue";

export async function generateMetadata() {
  const page = await getPage("faq");
  if (!page) return {};
  const { title, description, image } = page.seo;
  return {
    title,
    description,
    alternates: { canonical: "/faq" },
    openGraph: { title, description, images: image ? [image] : [] },
  };
}

export default async function FaqPage() {
  const page = await getPage("faq");
  if (!page) notFound();

  // Google FAQ rich results ke liye saare questions se JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.spine.sections
      .filter((s) => s.type === "faq")
      .flatMap((s) => s.items)
      .map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
  };

  return (
    <main id="main-content" data-testid="faq-page" className="w-full bg-[#f6f3ec] pt-[var(--hdr-h)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
<FaqMasthead data={page.masthead} />      <FaqSpine data={page.spine} />
      <AboutContinue data={page.continue} />
    </main>
  );
}