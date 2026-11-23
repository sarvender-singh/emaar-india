import { header } from "@/data/header";
import { footer } from "@/data/footer";
import { home } from "@/data/home";
import { about } from "@/data/about";
import { contact } from "@/data/contact";
import { faq } from "@/data/faq";
import { foundation } from "@/data/foundation";
import { awards } from "@/data/awards";
import { environmentalPolicy } from "@/data/environmentalPolicy";
import { investor } from "@/data/investor";
import { media } from "@/data/media";
import { compliance } from "@/data/compliance";
import { blog } from "@/data/blog";
import { careers } from "@/data/careers";
import { privacyPolicy } from "@/data/privacyPolicy";
import { terms } from "@/data/terms";


const mock = {
  header, footer, home, about, contact, faq,
  foundation, awards, environmentalPolicy, investor, media, compliance, blog, careers, privacyPolicy,terms,
};

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