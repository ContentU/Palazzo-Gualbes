import Link from "next/link";
import Photo from "@/components/ui/Photo";
import Meta from "@/components/ui/Meta";
import MoreLink from "@/components/ui/MoreLink";
import { articleHref } from "@/lib/links";
import type { Article } from "@/content/types";

// .card del Journal; offset della colonna centrale tolto quando i filtri sono attivi
export default function ArticleCard({ article, category, hidden, filtered }: { article: Article; category: string; hidden?: boolean; filtered?: boolean }) {
  return (
    <Link
      href={articleHref(article)}
      data-card
      className={`group grid gap-3.5 content-start ${hidden ? "hidden" : ""} ${filtered ? "" : "sm:max-lg:even:mt-[50px] lg:nth-[3n+2]:mt-[clamp(0px,6vw,90px)]"}`}
    >
      <Photo {...article.cover} ratio="aspect-portrait" reveal sizes="(min-width: 901px) 33vw, (min-width: 561px) 50vw, 100vw" className="mb-1.5" imgClass="transition-transform duration-1100 ease-out group-hover:scale-104" />
      <Meta strong={category}>{article.date}</Meta>
      <h3 className="font-display font-semibold text-h6 tracking-tight text-balance text-red">{article.title}</h3>
      <p className="text-caption max-w-[34em]">{article.excerpt}</p>
      <MoreLink>Leggi</MoreLink>
    </Link>
  );
}
