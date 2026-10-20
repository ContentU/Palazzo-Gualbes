import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleHead from "@/components/sections/ArticleHead";
import ArticleBody from "@/components/sections/ArticleBody";
import MoreArticles from "@/components/sections/MoreArticles";
import { getArticle, getArticles, getCategories } from "@/lib/content";

// gli slug noti sono statici; uno sconosciuto attende il server e finisce in notFound()
export const instant = false;

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  return { title: article?.title };
}

export default async function ArticlePage({ params }: PageProps<"/journal/[slug]">) {
  const [article, articles, categories] = await Promise.all([
    getArticle((await params).slug),
    getArticles(),
    getCategories(),
  ]);
  if (!article) notFound();
  const cat = categories.find((c) => c.slug === article.category)?.title ?? article.category;
  const related = (article.related ?? []).map((s) => articles.find((a) => a.slug === s)!).filter(Boolean);
  return (
    <>
      <article>
        <ArticleHead article={article} category={cat} />
        {article.body && <ArticleBody body={article.body} />}
      </article>
      {related.length > 0 && <MoreArticles articles={related} categories={categories} />}
    </>
  );
}
