import type { ReactNode } from "react";
import Photo from "@/components/ui/Photo";
import MoreLink from "@/components/ui/MoreLink";
import Text from "@/components/ui/Text";
import type { MainTextData } from "@/content/types";

type Props = MainTextData & { afterHero?: boolean; children?: ReactNode };

// .ed + .mt__*: titolo, collage di tre foto e testo (home e Il Palazzo)
export default function MainText({ title, text, link, big, small, tiny, afterHero, children }: Props) {
  return (
    <section id="palazzo" className={`py-section-lg ${afterHero ? "pt-[clamp(140px,19vw,270px)]" : ""}`}>
      <div className="grid grid-cols-24 gap-x-grid px-gutter items-start">
        <h2 data-words className="col-span-full mb-9 lg:col-[1/9] lg:row-1 lg:self-center lg:pl-[1%] lg:mb-0 font-display font-semibold text-h4 tracking-tight text-balance text-red">
          {title}
        </h2>
        <Photo {...big} ratio="aspect-hero" par={8} reveal sizes="(min-width: 901px) 62vw, 88vw" className="col-[4/-1] lg:col-[10/-1] lg:row-1" />
        <Photo {...small} ratio="aspect-portrait" par={-12} reveal sizes="(min-width: 901px) 21vw, 38vw" className="col-[1/10] -mt-15 lg:col-[1/6] lg:row-2 lg:-mt-[1vw]" />
        <div className="col-span-full mt-10 lg:col-[10/21] lg:row-2 lg:mt-[clamp(40px,19vw,280px)] grid gap-stack-md">
          <Text data-fade className="leading-[1.3]" text={text} />
          {link && <MoreLink href={link.href} fade>{link.label}</MoreLink>}
        </div>
        <Photo {...tiny} ratio="aspect-portrait" par={-18} reveal sizes="(min-width: 901px) 21vw, 42vw" className="col-[15/-1] mt-10 lg:col-[20/-1] lg:row-3 lg:mt-[clamp(-40px,-1vw,0px)]" />
      </div>
      {children}
    </section>
  );
}
