// FILE: src/components/projects/listingPage.js
// Residential aur Commercial dono ke pages yahin se chalte hain (server component, "use client" nahi hai).
import { notFound } from "next/navigation";
import { getProjects } from "@/services/projectService";
import { GROUPS } from "@/data/projects";
import ProjectsListing from "@/components/projects/ProjectsListing";

export function listingMetadata(category, status) {
  const g = GROUPS[`${category}/${status}`];
  if (!g) return {};
  return {
    title: `${g.title} Properties | Emaar India`,
    description: g.lede,
    alternates: { canonical: `/properties/${category}/${status}` },
  };
}

export async function ListingPage({ category, status }) {
  const key = `${category}/${status}`;
  const group = GROUPS[key];
  if (!group) notFound();

  const items = await getProjects({ category, status });

  const tabs = Object.entries(GROUPS).map(([k, v]) => ({
    label: v.title.replace(": ", " "),
    href: `/properties/${k}`,
    active: k === key,
  }));

  return (
    <main id="main-content" data-testid="properties-listing-page" className="w-full bg-[#f6f3ec] pt-[var(--hdr-h)]">
      <ProjectsListing title={group.title} lede={group.lede} tabs={tabs} items={items} />
    </main>
  );
}