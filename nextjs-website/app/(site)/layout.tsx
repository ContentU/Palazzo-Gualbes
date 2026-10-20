import IconSprite from "@/components/site/IconSprite";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import MotionProvider from "@/components/motion/MotionProvider";
import { getSite } from "@/lib/content";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const site = await getSite();
  return (
    <>
      <IconSprite />
      <Header site={site} />
      <main id="top" className="overflow-x-clip">{children}</main>
      <Footer site={site} />
      <SmoothScroll />
      <MotionProvider />
    </>
  );
}
