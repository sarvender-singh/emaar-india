import { notFound } from "next/navigation";
import { getPressReleases, getPressReleaseBySlug } from "@/services/pressService";
import { formatDate } from "@/services/blogService";
import PolicyMasthead from "@/components/environmental-policy/PolicyMasthead"; // same masthead as environmental policy
import PressBody from "@/components/press/PressBody";

export async function generateStaticParams() {
  const list = await getPressReleases();
  return list.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPressReleaseBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Emaar India`,
    description: post.description,
    alternates: { canonical: `/press-release-listing/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
      publishedTime: post.date,
    },
  };
}

export default async function PressReleasePage({ params }) {
  const { slug } = await params;
  const post = await getPressReleaseBySlug(slug);
  if (!post) notFound();

  const masthead = {
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "About Emaar", href: "/about-emaar" },
      { label: "Media", href: "/media" },
      { label: "Press Release" },
    ],
    back: { label: "Back to listings", href: "/media" },
    title: post.title,
    lede: formatDate(post.date),
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: masthead.breadcrumb.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.label,
        ...(b.href ? { item: b.href } : {}),
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: post.title,
      description: post.description,
      image: post.image,
      datePublished: post.date,
      publisher: { "@type": "Organization", name: "Emaar India" },
    },
  ];

  return (
    <main id="main-content" data-testid="press-release-page" className="w-full bg-[#f6f3ec] pt-[var(--hdr-h)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PolicyMasthead data={masthead} />
      <PressBody data={post} />
    </main>
  );
}