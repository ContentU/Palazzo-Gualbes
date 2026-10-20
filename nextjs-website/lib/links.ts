import type { Article } from "@/content/types";

export const articleHref = (a: Article) => `/journal/${a.slug}`;
