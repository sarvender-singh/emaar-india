import { header } from "@/data/header";
import { footer } from "@/data/footer";
import { home } from "@/data/home";

// Naya page add karna ho to yahan ek line (jab tak API ready nahi)
const mock = { header, footer, home };

export async function getPage(slug, { revalidate = 60 } = {}) {
  const base = process.env.API_URL;

  // API_URL set hai to real API, warna dummy data
  if (base) {
    try {
      const res = await fetch(`${base}/pages/${slug}`, { next: { revalidate } });
      if (res.ok) return await res.json();
    } catch (err) {
      console.error(`getPage("${slug}") failed:`, err);
    }
  }
  return mock[slug] ?? null;
}