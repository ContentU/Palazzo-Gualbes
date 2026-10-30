import { defineField, defineType } from "sanity";
import {
  aboutTextFields, heroFields, introFields, leavesFields, lines, link, links, list, mainTextFields, obj, photo, seo, servicesFields, str, txt,
} from "./fields";

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
    seo(),
    obj("hero", [lines("title"), photo("image"), txt("text"), str("cta"), str("ctaUnderline"), str("ctaHref")]),
    obj("mainText", mainTextFields()),
    defineField({ name: "suites", type: "suitesSlider" }),
    obj("services", servicesFields()),
    obj("experience", [str("marquee"), photo("image"), txt("text"), link("link")]),
    obj("news", [str("title"), txt("lead"), link("link"), list("posts", "post", [str("title"), str("href"), str("meta"), photo("image")])]),
    obj("recommended", [str("title"), defineField({ name: "logos", type: "array", of: [{ type: "string" }], description: "Solo riconoscimenti documentati: senza loghi la sezione non compare." })]),
  ],
});

// Il Palazzo: pagina master (Servizi ed Experience ne riprendono la composizione)
export const aboutPageType = defineType({
  name: "aboutPage",
  title: "Il Palazzo",
  type: "document",
  preview: named("Il Palazzo"),
  fields: [
    seo(),
    obj("hero", heroFields()),
    obj("text", aboutTextFields()),
    obj("leaves", leavesFields()),
    obj("welcome", servicesFields()),
    info("info"),
  ],
});

export const servicesPageType = defineType({
  name: "servicesPage",
  title: "Servizi",
  type: "document",
  preview: named("Servizi"),
  fields: [seo(), obj("hero", heroFields()), obj("text", aboutTextFields()), obj("leaves", leavesFields()), info("info")],
});

export const experiencePageType = defineType({
  name: "experiencePage",
  title: "Experience",
  type: "document",
  preview: named("Experience"),
  fields: [
    seo(),
    obj("hero", heroFields()),
    obj("text", aboutTextFields()),
    obj("leaves", leavesFields()),
    defineField({ name: "activities", title: "Griglia delle esperienze", type: "suitesSlider" }),
    info("info"),
  ],
});

export const storyPageType = defineType({
  name: "storyPage",
  title: "La Storia",
  type: "document",
  preview: named("La Storia"),
  fields: [
    seo(),
    obj("hero", heroFields()),
    obj("origins", aboutTextFields()),
    obj("transformations", leavesFields()),
    obj("printing", servicesFields()),
    obj("recovery", introFields()),
    info("info"),
  ],
});

export const roomsPageType = defineType({
  name: "roomsPage",
  title: "Camere",
  type: "document",
  preview: named("Camere"),
  fields: [
    seo(),
    str("title"),
    txt("lead"),
    obj("intro", leavesFields()),
    list("rooms", "room", [str("title"), lines("specs"), str("soon"), link("cta"), photo("big"), photo("small")]),
  ],
});

export const journalPageType = defineType({
  name: "journalPage",
  title: "Journal",
  type: "document",
  preview: named("Journal"),
  fields: [
    seo(),
    str("title"),
    txt("lead"),
    defineField({ name: "featured", title: "Articolo in evidenza", type: "reference", to: [{ type: "article" }] }),
  ],
});

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contatti",
  type: "document",
  preview: named("Contatti"),
  fields: [
    seo(),
    str("title"),
    txt("lead"),
    list("info", "infoItem", [str("title"), lines("lines"), str("href")]),
    str("formTitle"),
    txt("formText"),
    obj("arrive", [str("title"), txt("text"), link("link")]),
    list("faq", "faqItem", [str("num"), str("title"), txt("text"), list("details", "detail", [str("term"), txt("desc")])]),
  ],
});
