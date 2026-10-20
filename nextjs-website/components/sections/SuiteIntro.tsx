import Photo from "@/components/ui/Photo";
import Gallery from "./Gallery";
import type { Suite } from "@/content/types";

// .ed#intro: foto, testo e galleria a scorrimento
export default function SuiteIntro({ intro, gallery }: Pick<Suite, "intro" | "gallery">) {
  return (
    <section id="intro" className="py-section-lg">
      <div className="grid grid-cols-24 gap-x-grid px-gutter items-start">
        <Photo {...intro.image} ratio="aspect-square" par={8} reveal sizes="(min-width: 901px) 54vw, 100vw" className="col-span-full lg:col-[1/14]" />
        <div className="col-span-full mt-8 lg:col-[17/-1] lg:mt-0 self-end grid gap-stack-md pb-[2vw]">
          <h2 data-words className="font-display font-semibold text-h4 tracking-tight text-balance text-red">{intro.title}</h2>
          <p data-fade className="leading-[1.3]">{intro.text}</p>
        </div>
      </div>
      <Gallery images={gallery} />
    </section>
  );
}
