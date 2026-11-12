import { properties } from "@/data/properties";

export async function getPropertyBySlug(slug, { revalidate = 60 } = {}) {
  const base = process.env.API_URL;

  if (base) {
    try {
      const res = await fetch(`${base}/properties/${slug}`, { next: { revalidate } });
      if (res.ok) return await res.json();
      if (res.status === 404) return null;
    } catch (err) {
      console.error(`getPropertyBySlug("${slug}") failed:`, err);
    }
  }
  return properties.find((p) => p.slug === slug) ?? null;
}