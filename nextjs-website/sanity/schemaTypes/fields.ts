import { defineArrayMember, defineField, defineType, type FieldDefinition } from "sanity";

// Scorciatoie per i campi: i nomi sono quelli di content/types.ts
export const str = (name: string) => defineField({ name, type: "string" });
export const txt = (name: string) =>
  defineField({ name, type: "text", rows: 5, description: "Vai a capo per iniziare un nuovo paragrafo." });
export const photo = (name: string) => defineField({ name, type: "photo" });
export const link = (name: string) => defineField({ name, type: "linkItem" });
export const lines = (name: string) => defineField({ name, type: "array", of: [{ type: "string" }] });
export const links = (name: string) =>
  defineField({ name, type: "array", of: [defineArrayMember({ type: "linkItem" })] });
export const obj = (name: string, fields: FieldDefinition[]) => defineField({ name, type: "object", fields });
/** array di oggetti: `item` diventa il _type di ogni elemento */
export const list = (name: string, item: string, fields: FieldDefinition[]) =>
  defineField({ name, type: "array", of: [defineArrayMember({ name: item, type: "object", fields })] });
/** meta title e meta description della pagina */
export const seo = () => obj("seo", [str("title"), txt("description")]);

// Gruppi di campi delle sezioni riusate in più pagine (stessi nomi di content/types.ts)
export const heroFields = () => [str("title"), photo("a"), photo("b"), txt("text")]; // AboutHero
export const mainTextFields = () => [str("title"), txt("text"), link("link"), photo("big"), photo("small"), photo("tiny")]; // MainText
export const aboutTextFields = () => [...mainTextFields(), photo("full")]; // AboutText
export const leavesFields = () => [str("title"), txt("text"), link("link"), photo("a"), photo("b")]; // Leaves
export const servicesFields = () => [str("title"), txt("text"), link("link"), photo("a"), photo("b"), photo("c")]; // Services
export const introFields = () => [
  obj("intro", [str("title"), txt("text"), photo("image")]),
  defineField({ name: "gallery", type: "array", of: [{ type: "photo" }] }),
]; // SuiteIntro

export const slug = () =>
  defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() });

export const photoType = defineType({
  name: "photo",
  title: "Foto",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({ name: "alt", title: "Testo alternativo", type: "string", validation: (r) => r.required() }),
    defineField({ name: "warm", title: "Grana calda", type: "boolean" }),
  ],
});

export const linkItemType = defineType({
  name: "linkItem",
  title: "Link",
  type: "object",
  fields: [str("label"), str("href")],
  preview: { select: { title: "label", subtitle: "href" } },
});

export const suitesSliderType = defineType({
  name: "suitesSlider",
  type: "object",
  fields: [
    photo("coverImage"),
    lines("coverTitle"),
    link("cta"),
    txt("asideText"),
    link("asideLink"),
    list("suites", "suiteCard", [str("title"), txt("text"), photo("image"), str("href"), str("linkLabel")]),
  ],
});

export const infoType = defineType({
  name: "info",
  type: "object",
  fields: [str("title"), txt("text"), str("contact"), link("link"), photo("small"), photo("big")],
});
