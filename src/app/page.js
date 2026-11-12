import { notFound } from "next/navigation";
import ScrollStage from "@/components/ScrollStage";
import Hero from "@/components/home/Hero";
import HeroSearch from "@/components/home/HeroSearch";
import LaunchStack from "@/components/home/LaunchStack";
import DevelopmentsRail from "@/components/home/DevelopmentsRail";
import { getPage } from "@/services/pageService";
import CommunitiesCollage from "@/components/home/CommunitiesCollage";
import ShowcaseMosaic from "@/components/home/ShowcaseMosaic";
import LegacyStats from "@/components/home/LegacyStats";
import PressRail from "@/components/home/PressRail";
import ConverseCta from "@/components/home/ConverseCta";


// generateMetadata jaisa tha waisa

export default async function Home() {
  const page = await getPage("home");
  if (!page) notFound();

  return (
    <ScrollStage>
      <Hero data={page.hero}>
        <HeroSearch data={page.search} />
      </Hero>
      <LaunchStack data={page.launches} />
      <DevelopmentsRail data={page.developments} />
      <DevelopmentsRail data={page.underDevelopment} />
      <LaunchStack data={page.communitiesIntro} />
      <CommunitiesCollage data={page.communities} />
      <LaunchStack data={page.propertiesIntro} />
      <ShowcaseMosaic data={page.showcase} />
      <LegacyStats data={page.legacy} />
      <PressRail data={page.press} />
      <ConverseCta data={page.converse} />
    </ScrollStage>
  );
}