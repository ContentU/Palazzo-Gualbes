import type { Metadata } from "next";
import AboutHero from "@/components/sections/AboutHero";
import AboutText from "@/components/sections/AboutText";
import Leaves from "@/components/sections/Leaves";
import Services from "@/components/sections/Services";
import SuiteIntro from "@/components/sections/SuiteIntro";
import InfoBlock from "@/components/sections/InfoBlock";
import { getStory, seoMeta } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return seoMeta((await getStory()).seo, "La Storia");
}

// pagina storico-editoriale (link nel footer, non nel menu): sezioni editoriali già usate nelle altre pagine
export default async function LaStoria() {
  const page = await getStory();
  return (
    <>
      <AboutHero {...page.hero} />
      <AboutText {...page.origins} />
      <Leaves {...page.transformations} />
      <Services {...page.printing} />
      <SuiteIntro {...page.recovery} />
      <InfoBlock {...page.info} />
    </>
  );
}
