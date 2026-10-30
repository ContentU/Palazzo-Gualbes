import Photo from "@/components/ui/Photo";
import MoreLink from "@/components/ui/MoreLink";
import Text from "@/components/ui/Text";
import type { LeavesData } from "@/content/types";

// .leaves: due foto e testo (Il Palazzo, Camere, Servizi, Experience, La Storia); link facoltativo
export default function Leaves({ title, text, link, a, b }: LeavesData) {
  return (
    <section className="relative pb-section-sm">
      <div className="relative z-1 grid grid-cols-24 gap-x-grid">
        <Photo {...a} ratio="aspect-hero" par={-10} reveal sizes="(min-width: 901px) 25vw, 46vw" className="col-[1/12] lg:col-[1/7] row-1 mt-[clamp(14px,1.8vw,26px)]" />
        <Photo {...b} ratio="aspect-hero" par={-16} reveal sizes="(min-width: 901px) 29vw, 50vw" className="col-[13/-1] lg:col-[18/-1] row-1 mt-[clamp(30px,4vw,60px)]" />
        <div className="col-[2/-2] lg:col-[8/19] row-2 grid gap-[clamp(20px,2.4vw,34px)] mt-[clamp(40px,6vw,90px)]">
          <h2 data-words className="font-display font-semibold text-h4 tracking-tight text-balance text-red">{title}</h2>
          <Text data-fade text={text} />
          {link && <MoreLink href={link.href} fade>{link.label}</MoreLink>}
        </div>
      </div>
    </section>
  );
}
