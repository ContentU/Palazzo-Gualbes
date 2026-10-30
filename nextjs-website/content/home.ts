import type { HomePage } from "./types";
import { demo } from "./demo";
import { BOOKING_HREF } from "./site";
import { familySuiteCard, suiteCard } from "./suites";

const p = (...paras: string[]) => paras.join("\n\n");

export const home: HomePage = {
  seo: {
    title: "Palazzo Gualbes — Appartamenti di design a Palermo",
    description: "Scopri Palazzo Gualbes: quattro appartamenti di design in un edificio storico nel centro di Palermo. Comfort, dettagli artigianali e ospitalità.",
  },
  hero: {
    title: ["La tua casa", "nel cuore", "di Palermo."],
    image: { src: "/images/demo/02.webp", alt: "Poltrona rosa davanti al muro in pietra originale di un appartamento" },
    text: "Quattro appartamenti di design in un palazzo storico, tra dettagli artigianali, comfort contemporaneo e il piacere di vivere la città.",
    cta: "Prenota",
    ctaUnderline: "il tuo soggiorno",
    ctaHref: BOOKING_HREF,
  },
  mainText: {
    title: "Una storia da abitare",
    text: p(
      "Nel centro storico di Palermo, Palazzo Gualbes unisce il carattere di una dimora antica a un'idea di ospitalità contemporanea.",
      "Quattro appartamenti progettati con cura, dove materiali naturali, arredi personalizzati e dettagli artigianali creano ambienti accoglienti, da vivere con la libertà e il comfort di una casa.",
    ),
    link: { label: "Scopri il Palazzo", href: "/il-palazzo" },
    big: demo("21", true),
    small: demo("12"),
    tiny: demo("18", true),
  },
  suites: {
    coverImage: demo("01"),
    coverTitle: ["Quattro modi", "di sentirsi", "a casa"],
    cta: { label: "Scopri gli appartamenti", href: "/camere" },
    asideText: "Ogni appartamento ha una propria identità. Spazi, materiali e soluzioni su misura danno forma ad ambienti pensati per soggiornare a Palermo in coppia, in famiglia o con gli amici.",
    // Appartamento 14 e Appartamento 4: card da aggiungere quando le schede saranno complete
    suites: [suiteCard, familySuiteCard],
  },
  services: {
    title: "Attenzioni che fanno sentire a casa",
    text: p(
      "Dalle dotazioni degli appartamenti all'assistenza durante il soggiorno, Palazzo Gualbes offre comfort e servizi pensati per rendere la permanenza a Palermo semplice e piacevole.",
      "Un'accoglienza attenta, che lascia spazio alla libertà di organizzare ogni giornata secondo i propri ritmi.",
    ),
    link: { label: "Scopri i servizi", href: "/servizi" },
    a: demo("08", true),
    b: demo("11"),
    c: demo("13", true),
  },
  experience: {
    marquee: "Palermo, appena fuori dalla porta.",
    image: demo("24"),
    text: p(
      "Dal centro storico ai luoghi della tradizione gastronomica, Palermo offre tante occasioni per lasciarsi sorprendere.",
      "A Palazzo Gualbes sei vicino ai principali monumenti e a Via Maqueda, tra le strade e i sapori della città. Puoi esplorarla liberamente oppure scegliere tra visite guidate, degustazioni ed esperienze sul mare.",
    ),
    link: { label: "Scopri le experience", href: "/experience" },
  },
  news: {
    title: "Storie e luoghi da scoprire",
    lead: "Uno spazio dedicato a Palermo, alla sua storia e ai tanti modi di vivere la città, tra cultura, tradizioni ed esperienze.",
    link: { label: "Leggi il Journal", href: "/journal" },
    // articoli demo: da sostituire con gli articoli reali (testi V1: da redigere separatamente)
    posts: [
      { title: "La Shera de Cancellarii, la via dei notai", href: "/journal/la-shera-de-cancellarii-la-via-dei-notai", meta: "Storia | 2 novembre 2026", image: demo("20", true) },
      { title: "Palermo arabo-normanna in una mattina", href: "/journal/palermo-arabo-normanna-in-una-mattina", meta: "Itinerari | 9 novembre 2026", image: demo("16") },
      { title: "Forni e pasticcerie dell'Albergheria", href: "/journal/forni-e-pasticcerie-dell-albergheria", meta: "Sapori | 16 novembre 2026", image: demo("09", true) },
      { title: "Il restauro di Palazzo Gualbes", href: "/journal/il-restauro-di-palazzo-gualbes", meta: "Design | 23 novembre 2026", image: demo("22") },
    ],
  },
  // nessun riconoscimento documentato: senza loghi la sezione non compare
  recommended: { title: "Recommended by", logos: [] },
};
