import { defineArrayMember, defineField, defineType, type FieldDefinition } from "sanity";

// Scorciatoie per i campi: i nomi sono quelli di content/types.ts
export const str = (name: string) => defineField({ name, type: "string" });
export const txt = (name: string) => defineField({ name, type: "text", rows: 3 });
export const photo = (name: string) => defineField({ name, type: "photo" });
export const link = (name: string) => defineField({ name, type: "linkItem" });
export const lines = (name: string) => defineField({ name, type: "array", of: [{ type: "string" }] });
export const links = (name: string) =>
  defineField({ name, type: "array", of: [defineArrayMember({ type: "linkItem" })] });
export const obj = (name: string, fields: FieldDefinition[]) => defineField({ name, type: "object", fields });
/** array di oggetti: `item` diventa il _type di ogni elemento */
export const list = (name: string, item: string, fields: FieldDefinition[]) =>
  defineField({ name, type: "array", of: [defineArrayMember({ name: item, type: "object", fields })] });
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
    list("suites", "suiteCard", [str("title"), txt("text"), photo("image"), str("href")]),
  ],
});

export const infoType = defineType({
  name: "info",
  type: "object",
  fields: [str("title"), txt("text"), str("contact"), photo("small"), photo("big")],
});
