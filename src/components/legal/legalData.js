import { notFound } from "next/navigation";
import { getPage } from "@/services/pageService";

export async function getLegalPage(key) {
  const page = await getPage(key);
  if (!page) notFound();
  return page;
}

export async function legalMetadata(key, path) {
  const page = await getPage(key);
  if (!page) return {};
  const { title, description, image } = page.seo;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, images: image ? [image] : [] },
  };
}