import { defineField, defineType } from "sanity";
import { lines, link, links, list, obj, photo, str, txt } from "./fields";

const info = (name: string) => defineField({ name, type: "info" });
// intestazione fissa: senza un campo "title" Sanity mostrerebbe i primi campi del documento
const named = (title: string) => ({ prepare: () => ({ title }) });

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Impostazioni sito",
  type: "document",
  preview: named("Impostazioni sito"),
  fields: [
    str("street"),
    str("city"),
    link("phone"),
    str("email"),
    links("social"),
    links("menu"),
    str("bookHref"),
    links("footerLinks"),
    links("legalLinks"),
    str("copyright"),
    str("credits"),
  ],
});

export const homePageType = defineType({
  name: "homePage",
  title: "Home",
  type: "document",
  preview: named("Home"),
  fields: [
    obj("hero", [lines("title"), photo("image"), txt("text"), str("cta"), str("ctaUnderline"), str("ctaHref")]),
    obj("mainText", [str("title"), txt("text"), link("link"), photo("big"), photo("small"), photo("tiny")]),
    defineField({ name: "suites", type: "suitesSlider" }),
    obj("services", [str("title"), txt("text"), link("link"), photo("a"), photo("b"), photo("c")]),
    obj("experience", [str("marquee"), photo("image"), txt("text"), link("link")]),
    obj("news", [str("title"), txt("lead"), list("posts", "post", [str("title"), str("href"), str("meta"), photo("image")])]),
    obj("recommended", [str("title"), lines("logos")]),
  ],
});

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "Il Palazzo",
  type: "document",
  preview: named("Il Palazzo"),
  fields: [
    obj("hero", [str("title"), photo("a"), photo("b"), txt("text")]),
    obj("text", [str("title"), txt("text"), link("link"), photo("big"), photo("small"), photo("tiny"), photo("full")]),
    obj("leaves", [str("title"), txt("text"), photo("a"), photo("b")]),
    info("info"),
  ],
});

export const roomsPageType = defineType({
  name: "roomsPage",
  title: "Camere",
  type: "document",
  preview: named("Camere"),
  fields: [
    str("title"),
    txt("lead"),
    list("rooms", "room", [str("title"), lines("specs"), str("soon"), link("cta"), photo("big"), photo("small")]),
    info("info"),
  ],
});

export const journalPageType = defineType({
  name: "journalPage",
  title: "Journal",
  type: "document",
  preview: named("Journal"),
  fields: [
    str("title"),
    txt("lead"),
    defineField({ name: "featured", title: "Articolo in evidenza", type: "reference", to: [{ type: "article" }] }),
    obj("newsletter", [str("title"), txt("text"), str("label"), str("placeholder"), str("button"), str("done")]),
  ],
});

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contatti",
  type: "document",
  preview: named("Contatti"),
  fields: [
    str("title"),
    txt("lead"),
    list("info", "infoItem", [str("title"), lines("lines"), str("href")]),
    str("formTitle"),
    obj("map", [str("title"), lines("lines"), link("link")]),
    obj("arrive", [str("title"), txt("text"), link("link")]),
    list("faq", "faqItem", [str("num"), str("title"), txt("text"), list("details", "detail", [str("term"), txt("desc")])]),
  ],
});
