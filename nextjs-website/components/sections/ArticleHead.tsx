import Photo from "@/components/ui/Photo";
import Meta from "@/components/ui/Meta";
import MoreLink from "@/components/ui/MoreLink";
import type { Article } from "@/content/types";

// .art__head + foto di apertura e didascalia
export default function ArticleHead({ article, category }: { article: Article; category: string }) {
  return (
    <>
      <header className="grid grid-cols-24 gap-x-grid gap-y-stack-md px-gutter">
        <MoreLink href="/journal" fade className="col-span-full">Journal</MoreLink>
        <Meta strong={category} fade className="col-span-full">{article.date}{article.readingTime && ` · ${article.readingTime} min di lettura`}</Meta>
        <h1 data-words className="col-span-full lg:col-[1/19] font-display font-extrabold text-h2 leading-none tracking-tight text-balance text-red">{article.title}</h1>
        <p data-fade className="col-span-full lg:col-[1/13] font-display font-book text-h6 leading-[1.35]">{article.lead ?? article.excerpt}</p>
      </header>
      <Photo {...article.cover} ratio="aspect-landscape lg:aspect-panorama" reveal par={8} sizes="100vw" className="mx-gutter mt-[clamp(40px,5vw,80px)]" />
      {article.caption && <p className="px-gutter mt-2.5 text-caption text-ink/60">{article.caption}</p>}
    </>
  );
}
