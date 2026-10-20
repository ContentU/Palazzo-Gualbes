import Photo from "@/components/ui/Photo";
import type { InfoData } from "@/content/types";

// .info: blocco avorio "Hai bisogno di altre informazioni?"
export default function InfoBlock({ title, text, contact, small, big }: InfoData) {
  return (
    <section className="bg-ivory pt-[clamp(60px,5vw,74px)] pb-[clamp(80px,7vw,100px)]">
      <div className="grid grid-cols-24 gap-x-grid px-gutter">
        <Photo {...small} ratio="aspect-square" par={-8} reveal sizes="(min-width: 901px) 21vw, 46vw" className="col-[1/12] lg:col-[2/7] row-1" />
        <div className="col-span-full lg:col-[2/10] row-2 grid gap-3 mt-[clamp(24px,3vw,40px)]">
          <h2 className="font-display font-semibold text-lead leading-[1.1] tracking-tight text-balance text-red max-w-[14em]">{title}</h2>
          <p data-fade className="text-small">{text}</p>
          <p data-fade className="mt-2.5 text-small font-semibold">{contact}</p>
        </div>
        <Photo {...big} ratio="aspect-square" par={8} reveal sizes="(min-width: 901px) 46vw, 100vw" className="col-span-full row-3 mt-7 lg:col-[12/-2] lg:row-[1/3] lg:mt-[clamp(4px,.5vw,8px)]" />
      </div>
    </section>
  );
}
