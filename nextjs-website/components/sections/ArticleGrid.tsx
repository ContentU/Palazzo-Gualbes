import ArticleCard from "./ArticleCard";
import type { Article, Category } from "@/content/types";

export const gridCls =
  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[clamp(18px,2.6vw,40px)] gap-y-stack-xl";

// .jgrid: griglia a 3/2/1 colonne
export default function ArticleGrid({ articles, categories, className = "" }: { articles: Article[]; categories: Category[]; className?: string }) {
  const cat = (slug: string) => categories.find((c) => c.slug === slug)?.title ?? slug;
  return (
    <div className={`${gridCls} ${className}`}>
      {articles.map((a) => <ArticleCard key={a.slug} article={a} category={cat(a.category)} />)}
    </div>
  );
}
