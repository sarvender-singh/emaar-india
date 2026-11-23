import { pressReleases } from "@/data/pressReleases";

export async function getPressReleases({ revalidate = 60 } = {}) {
  const base = process.env.API_URL;
  if (base) {
    try {
      const res = await fetch(`${base}/press-releases`, { next: { revalidate } });
      if (res.ok) return await res.json();
    } catch (err) {
      console.error("getPressReleases failed:", err);
    }
  }
  return pressReleases;
}

export async function getPressReleaseBySlug(slug, { revalidate = 60 } = {}) {
  const base = process.env.API_URL;
  if (base) {
    try {
      const res = await fetch(`${base}/press-releases/${slug}`, { next: { revalidate } });
      if (res.ok) return await res.json();
      if (res.status === 404) return null;
    } catch (err) {
      console.error(`getPressReleaseBySlug("${slug}") failed:`, err);
    }
  }
  return pressReleases.find((p) => p.slug === slug) ?? null;
}