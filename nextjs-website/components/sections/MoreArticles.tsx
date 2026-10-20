import MoreLink from "@/components/ui/MoreLink";
import ArticleGrid from "./ArticleGrid";
import type { Article, Category } from "@/content/types";

// .more-arts: "Continua a leggere"
export default function MoreArticles({ articles, categories }: { articles: Article[]; categories: Category[] }) {
  return (
    <section className="px-gutter pt-[clamp(90px,9vw,140px)] pb-[clamp(80px,8vw,120px)]">
      <div className="flex justify-between items-end gap-5 mb-[clamp(30px,4vw,56px)]">
        <h2 data-words className="font-display font-semibold text-h4 tracking-tight text-balance text-red">Continua a leggere</h2>
        <MoreLink href="/journal">Tutto il Journal</MoreLink>
      </div>
      <ArticleGrid articles={articles} categories={categories} />
    </section>
  );
}
