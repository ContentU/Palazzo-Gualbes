import type { Metadata } from "next";
import AboutHero from "@/components/sections/AboutHero";
import AboutText from "@/components/sections/AboutText";
import Leaves from "@/components/sections/Leaves";
import Services from "@/components/sections/Services";
import InfoBlock from "@/components/sections/InfoBlock";
import { getAbout, seoMeta } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return seoMeta((await getAbout()).seo, "Il Palazzo");
}

// pagina master: Servizi ed Experience ne riprendono la composizione
export default async function IlPalazzo() {
  const about = await getAbout();
  return (
    <>
      <AboutHero {...about.hero} />
      <AboutText {...about.text} />
      <Leaves {...about.leaves} />
      <Services {...about.welcome} />
      <InfoBlock {...about.info} />
    </>
  );
}
