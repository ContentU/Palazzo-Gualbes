import type { Metadata } from "next";
import AboutHero from "@/components/sections/AboutHero";
import AboutText from "@/components/sections/AboutText";
import Leaves from "@/components/sections/Leaves";
import InfoBlock from "@/components/sections/InfoBlock";
import { getAbout } from "@/lib/content";

export const metadata: Metadata = { title: "Chi siamo" };

export default async function IlPalazzo() {
  const about = await getAbout();
  return (
    <>
      <AboutHero {...about.hero} />
      <AboutText {...about.text} />
      <Leaves {...about.leaves} />
      <InfoBlock {...about.info} />
    </>
  );
}
