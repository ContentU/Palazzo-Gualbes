// Unico punto di accesso ai contenuti: query Sanity in cache, invalidate per tipo dal webhook (app/api/revalidate).
import { cacheLife, cacheTag } from "next/cache";
import type { QueryParams } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Metadata } from "next";
import type {
  AboutPage, Article, Category, ContactPage, ExperiencePage, HomePage, JournalPage, RoomsPage, Seo, ServicesPage, SiteSettings, StoryPage, Suite,
} from "@/content/types";

// Foto Sanity → Img dei componenti; via i campi di sistema (_key, _type…) che finirebbero come attributi HTML
function clean(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(clean);
  if (!v || typeof v !== "object") return v;
  const o = v as Record<string, unknown>;
  if (o._type === "photo")
    return { src: urlFor(o as Parameters<typeof urlFor>[0]).url(), alt: o.alt, warm: o.warm, hotspot: o.hotspot };
  return Object.fromEntries(Object.entries(o).filter(([k]) => !k.startsWith("_")).map(([k, x]) => [k, clean(x)]));
}

async function query<T>(groq: string, tags: string[], params: QueryParams = {}): Promise<T> {
  "use cache";
  cacheLife("max");
  cacheTag(...tags);
  return clean(await client.fetch(groq, params)) as T;
}

const page = <T>(type: string) => query<T>(`*[_id == $type][0]`, [type], { type });

const ARTICLE = `{
  ...,
  "slug": slug.current,
  "category": category->slug.current,
  "related": related[]->slug.current,
  body[]{..., "type": select(_type == "block" => "p", _type), _type == "block" => {"text": pt::text(@)}}
}`;
// "2026-10-12" → "12 ottobre 2026"
const withDate = (a: Article): Article => ({
  ...a,
  date: new Date(a.date).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
});

export const getSite = () => page<SiteSettings>("siteSettings");
export const getHome = () => page<HomePage>("homePage");
export const getAbout = () => page<AboutPage>("aboutPage");
export const getRooms = () => page<RoomsPage>("roomsPage");
export const getServices = () => page<ServicesPage>("servicesPage");
export const getExperience = () => page<ExperiencePage>("experiencePage");
export const getStory = () => page<StoryPage>("storyPage");
export const getContact = () => page<ContactPage>("contactPage");
export const getJournal = () =>
  query<JournalPage>(`*[_id == "journalPage"][0]{..., "featured": featured->slug.current}`, ["journalPage", "article"]);

// shortcut: suite e categorie in ordine di creazione; un campo "ordine" se l'editor deve poterle riordinare
export const getSuites = () => query<Suite[]>(`*[_type == "suite"] | order(_createdAt asc){..., "slug": slug.current}`, ["suite"]);
export const getSuite = async (slug: string) => (await getSuites()).find((s) => s.slug === slug);
export const getCategories = () =>
  query<Category[]>(`*[_type == "category"] | order(_createdAt asc){title, "slug": slug.current}`, ["category"]);

export const getArticles = async () =>
  (await query<Article[]>(`*[_type == "article"] | order(date desc)${ARTICLE}`, ["article", "category"])).map(withDate);
export const getArticle = async (slug: string) => {
  const a = await query<Article | null>(`*[_type == "article" && slug.current == $slug][0]${ARTICLE}`, ["article", "category"], { slug });
  return a ? withDate(a) : undefined;
};

// Meta della pagina dal campo SEO di Sanity; senza titolo SEO resta "<fallback> · Palazzo Gualbes"
export const seoMeta = (seo: Seo | undefined, fallback?: string): Metadata => ({
  title: seo?.title ? { absolute: seo.title } : fallback,
  description: seo?.description,
});
