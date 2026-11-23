// FILE: src/app/latest-launches/page.js
import { getLaunches } from "@/services/launchService";
import { launchesPage } from "@/data/launches";
import LatestLaunches from "@/components/launches/LatestLaunches";

export const metadata = {
  title: "Latest Launches | Emaar India",
  description: launchesPage.lede,
  alternates: { canonical: "/latest-launches" },
};

export default async function LatestLaunchesPage() {
  const items = await getLaunches();
  return (
    <main id="main-content" data-testid="latest-launches-page" className="w-full bg-[#f6f3ec] pt-[var(--hdr-h)]">
      <LatestLaunches page={launchesPage} items={items} />
    </main>
  );
}