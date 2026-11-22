import { notFound } from "next/navigation";
import { getPosts, getPostBySlug } from "@/services/blogService";
import BlogArticle from "@/components/blog/BlogArticle";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Emaar India`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const all = await getPosts();
  const i = all.findIndex((p) => p.slug === post.slug);
  const older = all[i + 1] ?? null;
  const newer = i > 0 ? all[i - 1] : null;
  const more = all.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    publisher: { "@type": "Organization", name: "Emaar India" },
  };

  return (
    <main id="main-content" data-testid="blog-post-page" className="w-full bg-[#f6f3ec] pt-[var(--hdr-h)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogArticle post={post} older={older} newer={newer} more={more} />
    </main>
  );
}