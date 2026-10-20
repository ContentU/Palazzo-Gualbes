import Photo from "@/components/ui/Photo";
import MoreLink from "@/components/ui/MoreLink";
import type { HomePage } from "@/content/types";

// .ed + .sv__*: servizi con collage
export default function Services({ title, text, link, a, b, c }: HomePage["services"]) {
  return (
    <section id="servizi" className="py-section-lg">
      <div className="grid grid-cols-24 gap-x-grid px-gutter items-start">
        <Photo {...a} ratio="aspect-portrait-soft" par={-10} reveal sizes="(min-width: 901px) 33vw, 71vw" className="col-[8/-1] lg:col-[17/-1] lg:row-1" />
        <Photo {...b} ratio="aspect-portrait-soft" par={10} reveal sizes="(min-width: 901px) 33vw, 46vw" className="col-[1/12] -mt-10 lg:col-[1/9] lg:row-[1/3] lg:mt-[clamp(120px,28vw,390px)]" />
        <div className="col-span-full mt-10 lg:col-[10/21] lg:row-2 lg:mt-[clamp(40px,7vw,100px)] grid gap-stack-md">
          <h2 data-words className="font-display font-semibold text-h4 tracking-tight text-balance text-red">{title}</h2>
          <p data-fade className="leading-[1.3]">{text}</p>
          <MoreLink href={link.href} fade>{link.label}</MoreLink>
        </div>
        <Photo {...c} ratio="aspect-portrait" par={-16} reveal sizes="(min-width: 901px) 21vw, 46vw" className="col-[14/-1] mt-10 lg:col-[20/-1] lg:row-3 lg:mt-5" />
      </div>
    </section>
  );
}
