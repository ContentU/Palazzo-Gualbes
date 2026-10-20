import { defineArrayMember, defineField, defineType } from "sanity";
import { lines, list, obj, photo, slug, str, txt } from "./fields";

export const categoryType = defineType({
  name: "category",
  title: "Categoria",
  type: "document",
  fields: [str("title"), slug()],
});

export const suiteType = defineType({
  name: "suite",
  title: "Suite",
  type: "document",
  fields: [
    str("title"),
    slug(),
    str("subtitle"),
    photo("cover"),
    txt("text"),
    str("specs"),
    obj("intro", [str("title"), txt("text"), photo("image")]),
    defineField({ name: "gallery", type: "array", of: [{ type: "photo" }] }),
    obj("stay", [str("title"), list("features", "feature", [str("label"), txt("text"), lines("items")])]),
    defineField({ name: "others", type: "suitesSlider" }),
  ],
});

export const articleType = defineType({
  name: "article",
  title: "Articolo",
  type: "document",
  orderings: [{ title: "Data", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  fields: [
    str("title"),
    slug(),
    defineField({ name: "category", type: "reference", to: [{ type: "category" }] }),
    defineField({ name: "date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "readingTime", title: "Minuti di lettura", type: "number" }),
    txt("excerpt"),
    photo("cover"),
    txt("lead"),
    str("caption"),
    defineField({
      name: "body",
      type: "array",
      of: [
        // solo paragrafi semplici: il sito li mostra come testo, senza grassetti né link
        defineArrayMember({ type: "block", styles: [{ title: "Normale", value: "normal" }], lists: [], marks: { decorators: [], annotations: [] } }),
        defineArrayMember({ name: "h2", title: "Titolo numerato", type: "object", fields: [str("num"), str("text")], preview: { select: { title: "text", subtitle: "num" } } }),
        defineArrayMember({ name: "tip", title: "Consiglio", type: "object", fields: [str("label"), txt("text")], preview: { select: { title: "label", subtitle: "text" } } }),
        defineArrayMember({
          name: "pair",
          title: "Coppia di foto",
          type: "object",
          fields: [defineField({ name: "images", type: "array", of: [{ type: "photo" }], validation: (r) => r.length(2) })],
          preview: { select: { media: "images.0" }, prepare: ({ media }) => ({ title: "Coppia di foto", media }) },
        }),
        defineArrayMember({ name: "quote", title: "Citazione", type: "object", fields: [txt("text")], preview: { select: { title: "text" } } }),
      ],
    }),
    defineField({ name: "related", type: "array", of: [{ type: "reference", to: [{ type: "article" }] }] }),
  ],
  preview: { select: { title: "title", subtitle: "date", media: "cover" } },
});
