import Image from "next/image";
import Photo from "@/components/ui/Photo";
import Meta from "@/components/ui/Meta";
import type { ArticleBlock } from "@/content/types";

const col = "col-span-full lg:col-[8/19]";

function Block({ b }: { b: ArticleBlock }) {
  switch (b.type) {
    case "p":
      return <p data-fade className={`${col} text-small leading-[1.6] mb-[1.1em]`}>{b.text}</p>;
    case "h2":
      return (
        <h2 className={`${col} font-display font-semibold text-h6 tracking-tight text-balance text-red mt-[1.4em] mb-[.6em]`}>
          <small className="block font-display font-black text-micro tracking-caps text-ink mb-2.5">{b.num}</small>
          {b.text}
        </h2>
      );
    case "tip":
      return (
        <div data-fade className={`${col} bg-ivory p-[clamp(22px,2.4vw,34px)] mt-[1em] mb-[1.6em]`}>
          <Meta className="block mb-2.5 text-red">{b.label}</Meta>
          <p className="text-small">{b.text}</p>
        </div>
      );
    case "pair":
      return (
        <div className="col-span-full lg:col-[3/23] grid grid-cols-[1.15fr_.85fr] gap-[clamp(14px,2vw,28px)] items-start my-[clamp(30px,4vw,60px)]">
          <Photo {...b.images[0]} ratio="aspect-portrait" par={-6} reveal sizes="(min-width: 901px) 45vw, 55vw" />
          <Photo {...b.images[1]} ratio="aspect-portrait" par={8} reveal sizes="(min-width: 901px) 33vw, 40vw" className="mt-[clamp(40px,8vw,120px)]" />
        </div>
      );
    case "quote":
      return (
        <div data-fade className="col-span-full lg:col-[5/21] my-[clamp(30px,4vw,60px)] grid justify-items-center gap-5 text-center">
          <Image src="/images/rosone.svg" alt="" width={28} height={28} className="w-7 h-auto" />
          <p className="font-display italic font-book text-h6 leading-[1.15] max-w-[22em] text-balance">{b.text}</p>
        </div>
      );
  }
}

// .art__body: testo su colonne 8–18, citazioni e coppie di foto più larghe
export default function ArticleBody({ body }: { body: ArticleBlock[] }) {
  return (
    <div className="grid grid-cols-24 gap-x-grid px-gutter pt-[clamp(60px,7vw,110px)]">
      {body.map((b, i) => <Block key={i} b={b} />)}
      <div className={`${col} flex gap-5.5 items-center border-t border-ink/16 pt-5 mt-5`}>
        <Meta>Condividi</Meta>
        {["WhatsApp", "Facebook", "Copia link"].map((l) => <a key={l} href="#top" className="font-semibold text-caption">{l}</a>)}
      </div>
    </div>
  );
}
