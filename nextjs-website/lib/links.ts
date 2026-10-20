import type { Article } from "@/content/types";

// shortcut: come nella demo, ogni card porta all'unico articolo completo; in Phase 8 (8.8) ogni card avrà il suo slug.
export const articleHref = (a: Article) =>
  `/journal/${a.body ? a.slug : "palermo-arabo-normanna-in-una-mattina"}`;
