import type { Suite } from "./types";
import { demo } from "./demo";

export const suites: Suite[] = [
  {
    slug: "family-suite",
    title: "Family Suite",
    subtitle: "Apartment",
    cover: demo("05"),
    text: "Due camere e un soggiorno luminoso affacciato sulla corte, al primo piano del palazzo.",
    specs: "6 ospiti · 2 camere · 3 bagni · terrazza",
    intro: {
      title: "Spazio per tutta la famiglia",
      text: "Soffitti alti, pietra originale e arredi di design. Due camere separate permettono a genitori e figli di avere i propri spazi, mentre il soggiorno riunisce tutti attorno alla corte.",
      image: demo("14", true),
    },
    gallery: [demo("01"), demo("06", true), demo("10"), demo("02", true), demo("11"), demo("24", true), demo("15"), demo("07")],
    stay: {
      title: "Il tuo soggiorno a Palazzo Gualbes",
      features: [
        {
          label: "Dotazioni dell'appartamento",
          text: "Ogni appartamento è pensato per soggiorni brevi e lunghi, con tutto quello che serve per sentirsi a casa.",
          items: ["Cucina completamente attrezzata", "Aria condizionata e riscaldamento", "Wi-Fi in fibra e smart TV", "Lavatrice e asciugatrice"],
        },
        {
          label: "Comfort in camera",
          text: "Biancheria in lino, materassi di qualità e prodotti da bagno di produzione siciliana.",
          items: ["Letti king size con lenzuola in lino", "Set cortesia di produzione siciliana", "Accappatoi e pantofole", "Tende oscuranti"],
        },
        {
          label: "Servizi di Palazzo Gualbes",
          text: "Un concierge dedicato segue il soggiorno dalla prenotazione alla partenza, con discrezione.",
          items: ["Accoglienza di persona o self check-in", "Colazione servita in appartamento", "Transfer da e per l'aeroporto", "Pulizia giornaliera su richiesta"],
        },
      ],
    },
    others: {
      coverImage: demo("17"),
      coverTitle: ["Scopri", "le altre", "suite"],
      cta: { label: "Prenota", href: "/camere" },
      asideText: "Ogni appartamento ha un carattere proprio. Trova quello giusto per il tuo soggiorno.",
      suites: [
        { title: "Junior Suite", text: "Un open space raccolto con bagno in marmo e doccia a pioggia, per due ospiti.", image: demo("04"), href: "/camere" },
        { title: "Deluxe Suite", text: "Pietra a vista, soffitti alti e un bagno in marmo. Pensata per due ospiti.", image: demo("09", true), href: "/camere" },
      ],
    },
  },
];
