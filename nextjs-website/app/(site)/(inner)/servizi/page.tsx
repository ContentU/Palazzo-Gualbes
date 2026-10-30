import type { Metadata } from "next";
import AboutHero from "@/components/sections/AboutHero";
import AboutText from "@/components/sections/AboutText";
import Leaves from "@/components/sections/Leaves";
import InfoBlock from "@/components/sections/InfoBlock";
import { getServices, seoMeta } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return seoMeta((await getServices()).seo, "Servizi");
}

// stessa composizione di /il-palazzo: hero, blocco con CTA, gallery e testo, chiusura contatti
export default async function Servizi() {
  const page = await getServices();
  return (
    <>
      <AboutHero {...page.hero} />
      <AboutText {...page.text} />
      <Leaves {...page.leaves} />
      <InfoBlock {...page.info} />
    </>
  );
}
