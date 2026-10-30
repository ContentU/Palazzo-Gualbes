import type { Metadata } from "next";
import PageTitle from "@/components/sections/PageTitle";
import JournalFilters from "@/components/sections/JournalFilters";
import FeaturedArticle from "@/components/sections/FeaturedArticle";
import { getArticles, getCategories, getJournal, seoMeta } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return seoMeta((await getJournal()).seo, "Journal");
}

export default async function Journal() {
  const [page, articles, categories] = await Promise.all([getJournal(), getArticles(), getCategories()]);
  // in evidenza: quello scelto in Studio, altrimenti nessuno (il Journal può essere vuoto)
  const featured = articles.find((a) => a.slug === page.featured);
  const cat = (slug: string) => categories.find((c) => c.slug === slug)?.title ?? slug;
  return (
    <>
      <PageTitle title={page.title} lead={page.lead} className="pb-[clamp(30px,4vw,60px)]" />
      <JournalFilters
        categories={categories}
        articles={articles.filter((a) => a !== featured)}
        featured={featured && <FeaturedArticle article={featured} category={cat(featured.category)} />}
      />
    </>
  );
}
