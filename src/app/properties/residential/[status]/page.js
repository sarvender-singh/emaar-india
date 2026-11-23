// FILE: src/app/properties/residential/[status]/page.js
import { STATUSES } from "@/data/projects";
import { listingMetadata, ListingPage } from "@/components/projects/listingPage";

export const dynamicParams = false; // sirf ongoing / completed, baaki 404

export function generateStaticParams() {
  return STATUSES.map((status) => ({ status }));
}

export async function generateMetadata({ params }) {
  const { status } = await params;
  return listingMetadata("residential", status);
}

export default async function Page({ params }) {
  const { status } = await params;
  return <ListingPage category="residential" status={status} />;
}