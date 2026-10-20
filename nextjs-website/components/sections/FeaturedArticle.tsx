import Link from "next/link";
import Photo from "@/components/ui/Photo";
import Meta from "@/components/ui/Meta";
import MoreLink from "@/components/ui/MoreLink";
import { articleHref } from "@/lib/links";
import type { Article } from "@/content/types";

// .jfeat: articolo in evidenza (foto su 14 colonne, testo dalla 16)
export default function FeaturedArticle({ article, category }: { article: Article; category: string }) {
  return (
    <Link href={articleHref(article)} className="group grid grid-cols-24 gap-x-grid px-gutter items-end pt-[clamp(50px,6vw,96px)] pb-[clamp(40px,5vw,80px)]">
      <Photo {...article.cover} ratio="aspect-wide" reveal par={6} sizes="(min-width: 901px) 58vw, 100vw" className="col-span-full lg:col-[1/15]" imgClass="transition-transform duration-1100 ease-out group-hover:scale-104" />
      <div className="col-span-full mt-5.5 lg:col-[16/-1] lg:mt-0 grid gap-[clamp(16px,1.8vw,24px)] pb-[clamp(8px,2vw,30px)]">
        <Meta strong={category} fade>{article.date} · {article.readingTime} min</Meta>
        <h2 data-words className="font-display font-semibold text-h5 leading-none tracking-tight text-balance text-red">{article.title}</h2>
        <p data-fade>{article.excerpt}</p>
        <MoreLink fade>Leggi l&apos;articolo</MoreLink>
      </div>
    </Link>
  );
}
