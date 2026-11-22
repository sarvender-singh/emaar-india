import { posts } from "@/data/blog";

const sortNewest = (list) => [...list].sort((a, b) => b.date.localeCompare(a.date));

export async function getPosts({ revalidate = 60 } = {}) {
  const base = process.env.API_URL;
  if (base) {
    try {
      const res = await fetch(`${base}/blog`, { next: { revalidate } });
      if (res.ok) return sortNewest(await res.json());
    } catch (err) {
      console.error("getPosts failed:", err);
    }
  }
  return sortNewest(posts);
}

export async function getPostBySlug(slug, { revalidate = 60 } = {}) {
  const base = process.env.API_URL;
  if (base) {
    try {
      const res = await fetch(`${base}/blog/${slug}`, { next: { revalidate } });
      if (res.ok) return await res.json();
      if (res.status === 404) return null;
    } catch (err) {
      console.error(`getPostBySlug("${slug}") failed:`, err);
    }
  }
  return posts.find((p) => p.slug === slug) ?? null;
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}