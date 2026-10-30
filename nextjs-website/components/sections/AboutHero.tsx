import Photo from "@/components/ui/Photo";
import Text from "@/components/ui/Text";
import type { HeroData } from "@/content/types";

// .ah: titolo che si sovrappone a due foto
export default function AboutHero({ title, a, b, text }: HeroData) {
  return (
    <section className="px-gutter">
      <h1 data-words className="relative z-2 font-display font-extrabold text-h2 leading-none tracking-tight text-balance text-red pl-[2%] -mb-[.12em]">{title}</h1>
      <div className="grid grid-cols-24 gap-x-grid items-start">
        <Photo {...a} ratio="aspect-tall" par={-10} reveal sizes="(min-width: 901px) 21vw, 33vw" className="col-[1/9] lg:col-[1/6]" />
        <Photo {...b} ratio="aspect-cinema" par={6} reveal sizes="(min-width: 901px) 71vw, 62vw" className="col-[10/-1] lg:col-[8/-1]" />
      </div>
      <Text data-fade className="mt-stack-md max-w-[34em] pl-[2%]" text={text} />
    </section>
  );
}
