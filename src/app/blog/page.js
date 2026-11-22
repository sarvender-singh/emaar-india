import { notFound } from "next/navigation";
import { getPage } from "@/services/pageService";
import { getPosts } from "@/services/blogService";
import MediaMasthead from "@/components/media/MediaMasthead"; // same props: breadcrumb, title, lede, actions
import BlogList from "@/components/blog/BlogList";

export async function generateMetadata() {
  const page = await getPage("blog");
  if (!page) return {};
  const { title, description, image } = page.seo;
  return {
    title,
    description,
    alternates: { canonical: "/blog" },
    openGraph: { title, description, images: image ? [image] : [] },
  };
}

export default async function BlogPage({ searchParams }) {
  const { page: p } = await searchParams;
  const page = await getPage("blog");
  if (!page) notFound();
  const posts = await getPosts();

  const { masthead, list } = page;
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
    <main id="main-content" data-testid="blog-page" className="w-full bg-[#f6f3ec] pt-[var(--hdr-h)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MediaMasthead data={masthead} />
      <BlogList data={list} posts={posts} page={parseInt(p, 10) || 1} />
    </main>
  );
}