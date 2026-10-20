import HeroHome from "@/components/sections/HeroHome";
import MainText from "@/components/sections/MainText";
import SuitesSlider from "@/components/sections/SuitesSlider";
import Services from "@/components/sections/Services";
import Experience from "@/components/sections/Experience";
import News from "@/components/sections/News";
import Recommended from "@/components/sections/Recommended";
import { getHome } from "@/lib/content";

export default async function Home() {
  const home = await getHome();
  return (
    <>
      <HeroHome hero={home.hero} />
      <MainText {...home.mainText} afterHero />
      <SuitesSlider {...home.suites} />
      <Services {...home.services} />
      <Experience {...home.experience} />
      <News {...home.news} />
      <Recommended {...home.recommended} />
    </>
  );
}
