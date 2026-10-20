import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SuiteHero from "@/components/sections/SuiteHero";
import SuiteIntro from "@/components/sections/SuiteIntro";
import Stay from "@/components/sections/Stay";
import SuitesSlider from "@/components/sections/SuitesSlider";
import { getSuite, getSuites } from "@/lib/content";

// gli slug noti sono statici; uno sconosciuto attende il server e finisce in notFound()
export const instant = false;

export async function generateStaticParams() {
  return (await getSuites()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/camere/[slug]">): Promise<Metadata> {
  const suite = await getSuite((await params).slug);
  return { title: suite?.title };
}

export default async function SuitePage({ params }: PageProps<"/camere/[slug]">) {
  const suite = await getSuite((await params).slug);
  if (!suite) notFound();
  return (
    <>
      <SuiteHero {...suite} />
      <SuiteIntro intro={suite.intro} gallery={suite.gallery} />
      <Stay {...suite.stay} />
      <SuitesSlider {...suite.others} />
    </>
  );
}
