import type { RoomsPage } from "./types";
import { demo } from "./demo";

export const rooms: RoomsPage = {
  seo: {
    title: "Suite e appartamenti nel centro di Palermo",
    description: "Quattro appartamenti indipendenti e di design nel centro storico di Palermo, con ambienti curati, materiali naturali e comfort.",
  },
  title: "Suite e appartamenti a Palermo",
  lead: "Quattro appartamenti indipendenti in un palazzo storico, progettati per offrire ambienti curati, comfort e libertà nel cuore della città.",
  intro: {
    title: "Lo spazio giusto per il tuo soggiorno",
    text: [
      "Ogni appartamento di Palazzo Gualbes ha un carattere personale, definito dalla scelta dei materiali, dagli arredi e dalle soluzioni artigianali.",
      "Spazi pensati per accogliere coppie, famiglie e piccoli gruppi, con il comfort di ambienti indipendenti e una posizione ideale per vivere il centro storico di Palermo.",
    ].join("\n\n"),
    a: demo("18", true),
    b: demo("01"),
  },
  // card: testi sintetici della Home; Appartamento 14 e Appartamento 4 da aggiungere quando completi
  rooms: [
    {
      title: "Suite",
      specs: ["52 m², zona living e balcone su Discesa Santamarina.", "Uno spazio accogliente con cucina attrezzata e arredi personalizzati, fino a tre ospiti."],
      cta: { label: "Scopri l'appartamento", href: "/camere/suite" },
      big: demo("04", true),
      small: demo("19"),
    },
    {
      title: "Family Suite",
      specs: ["Due camere matrimoniali, ambienti da condividere e una terrazza privata di 25 m² con vista sulla cupola del Teatro Massimo.", "Fino a cinque ospiti."],
      cta: { label: "Scopri l'appartamento", href: "/camere/family-suite" },
      big: demo("10", true),
      small: demo("06"),
    },
  ],
};
