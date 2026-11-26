import { getProjects } from "@/services/projectService";
import { CATEGORIES, STATUSES, projectHref } from "@/data/projects";
import { properties } from "@/data/properties";

function normalizeCity(city) {
  const value = String(city ?? "").trim().toLowerCase();

  if (
    ["delhi ncr", "delhi/ncr", "delhi-ncr", "gurugram", "gurgaon"].includes(value)
  ) {
    return "delhi-ncr";
  }

  return value.replace(/\s+/g, "-");
}

export async function GET() {
  try {
    const localDetailSlugs = new Set(
      properties.map((property) => property.slug)
    );

    const groups = await Promise.all(
      CATEGORIES.flatMap((category) =>
        STATUSES.map(async (status) => {
          const items = await getProjects({ category, status });

          return items.map((item) => {
            const hasDetail =
              item.hasDetail ??
              (Boolean(process.env.API_URL) || localDetailSlugs.has(item.slug));

            return {
              name: item.name,
              slug: item.slug,
              category,
              status,
              type: item.type || "",
              community: item.community || "",
              city: item.city || "",
              citySlug: normalizeCity(item.citySlug) || normalizeCity(item.city),
              availability: item.availability || "",
              priceBand: item.priceBand || "",
              href: hasDetail
                ? projectHref(item.slug)
                : `/contact-us?project=${encodeURIComponent(item.name)}`,
              enquiry: !hasDetail,
            };
          });
        })
      )
    );

    return Response.json(groups.flat());
  } catch {
    return Response.json(
      { error: "Project search is temporarily unavailable." },
      { status: 503 }
    );
  }
}