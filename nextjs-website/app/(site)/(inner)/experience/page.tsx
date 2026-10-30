import type { Metadata } from "next";
import AboutHero from "@/components/sections/AboutHero";
import AboutText from "@/components/sections/AboutText";
import Leaves from "@/components/sections/Leaves";
import SuitesSlider from "@/components/sections/SuitesSlider";
import InfoBlock from "@/components/sections/InfoBlock";
import { getExperience, seoMeta } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return seoMeta((await getExperience()).seo, "Experience");
}

// composizione di /il-palazzo + griglia delle attività (slider delle suite, card senza link) prima della chiusura
export default async function ExperiencePage() {
  const page = await getExperience();
  return (
    <>
      <AboutHero {...page.hero} />
      <AboutText {...page.text} />
      <Leaves {...page.leaves} />
      <SuitesSlider {...page.activities} />
      <InfoBlock {...page.info} />
    </>
  );
}
