import type { Metadata } from "next";
import PageTitle from "@/components/sections/PageTitle";
import JournalFilters from "@/components/sections/JournalFilters";
import FeaturedArticle from "@/components/sections/FeaturedArticle";
import Newsletter from "@/components/sections/Newsletter";
import { getArticles, getCategories, getJournal } from "@/lib/content";

export const metadata: Metadata = { title: "Journal" };

export default async function Journal() {
  const [page, articles, categories] = await Promise.all([getJournal(), getArticles(), getCategories()]);
  const featured = articles.find((a) => a.slug === page.featured)!;
  const cat = (slug: string) => categories.find((c) => c.slug === slug)?.title ?? slug;
  return (
    <>
      <PageTitle title={page.title} lead={page.lead} className="pb-[clamp(30px,4vw,60px)]" />
      <JournalFilters
        categories={categories}
        articles={articles.filter((a) => a !== featured)}
        featured={<FeaturedArticle article={featured} category={cat(featured.category)} />}
      />
      <Newsletter {...page.newsletter} />
    </>
  );
}
