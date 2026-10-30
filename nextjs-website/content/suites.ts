import type { SuiteCard, Suite, SuitesSliderData } from "./types";
import { demo } from "./demo";
import { BOOKING_HREF } from "./site";

// Card brevi (testi della Home): usate in Home e nelle schede ("Altre suite")
export const suiteCard: SuiteCard = {
  title: "Suite",
  text: "52 m², zona living e balcone su Discesa Santamarina. Uno spazio accogliente con cucina attrezzata e arredi personalizzati, fino a tre ospiti.",
  image: demo("17"),
  href: "/camere/suite",
};
export const familySuiteCard: SuiteCard = {
  title: "Family Suite",
  text: "Due camere matrimoniali, ambienti da condividere e una terrazza privata di 25 m² con vista sulla cupola del Teatro Massimo. Fino a cinque ospiti.",
  image: demo("03", true),
  href: "/camere/family-suite",
};
// Appartamento 14 e Appartamento 4: schede incomplete, non pubblicare (testi V1)

const others = (text: string, cards: SuiteCard[], coverImage = demo("17")): SuitesSliderData => ({
  coverImage,
  coverTitle: ["Scopri gli", "altri", "appartamenti"],
  cta: { label: "Verifica disponibilità", href: BOOKING_HREF },
  asideText: text,
  asideLink: { label: "Scopri gli appartamenti", href: "/camere" },
  suites: cards,
});

const services = {
  label: "Servizi di Palazzo Gualbes",
  items: ["Accoglienza e assistenza agli ospiti", "Deposito bagagli", "Housekeeping durante il soggiorno", "Transfer e parcheggio convenzionato disponibili su richiesta"],
};

export const suites: Suite[] = [
  {
    slug: "family-suite",
    seo: {
      title: "Family Suite con terrazza a Palermo",
      description: "Family Suite di 88 m² a Palermo per cinque ospiti, con due camere matrimoniali e terrazza privata di 25 m².",
    },
    title: "Family Suite",
    cover: demo("05"),
    text: "Due camere matrimoniali, ambienti da condividere e una terrazza privata con vista sulla cupola del Teatro Massimo.",
    specs: "88 m² + 25 m² di terrazza · fino a 5 ospiti · 2 camere · 3 bagni · secondo piano",
    intro: {
      title: "Più spazio da vivere, insieme",
      text: [
        "La Family Suite è pensata per famiglie e piccoli gruppi che desiderano condividere il soggiorno a Palermo senza rinunciare ai propri spazi.",
        "L'appartamento dispone di due camere matrimoniali, una con letto king size e una con letto queen size, di una zona living con divano letto e di una cucina attrezzata.",
        "La terrazza privata di 25 m² si affaccia sull'atrio del Palazzo e offre una vista sulla cupola del Teatro Massimo. Gli altri affacci guardano verso Discesa Santamarina.",
        "Un ambiente in cui ritrovare la comodità di una casa, con spazi interni ed esterni da vivere secondo i propri ritmi.",
      ].join("\n\n"),
      image: demo("14", true),
    },
    gallery: [demo("01"), demo("06", true), demo("10"), demo("02", true), demo("11"), demo("24", true), demo("15"), demo("07")],
    stay: {
      features: [
        {
          label: "Dotazioni dell'appartamento",
          text: "Spazi e attrezzature pensati per offrire autonomia e comfort durante il soggiorno.",
          items: ["Due camere matrimoniali, con letti king size e queen size", "Zona living con divano letto", "Cucina attrezzata con piano a induzione, microonde e frigorifero", "Wi-Fi, climatizzazione, TV e cassaforte"],
        },
        {
          label: "Comfort in camera",
          text: "Ambienti dedicati al riposo e attenzioni pensate per rendere piacevole la permanenza.",
          items: ["Tre bagni, di cui due con doccia", "Terrazza privata di 25 m²", "Linea bagno Moro, biancheria e pantofole", "Acqua di benvenuto, caffè, tè, welcome kit e kit colazione"],
        },
        { ...services, items: ["Assistenza agli ospiti", ...services.items.slice(1)] },
      ],
    },
    others: others(
      "Ogni appartamento ha caratteristiche differenti, per scegliere la soluzione più adatta al proprio modo di viaggiare.",
      [suiteCard],
    ),
  },
  {
    slug: "suite",
    seo: {
      title: "Suite a Palermo per 3 ospiti — Palazzo Gualbes",
      description: "Suite di 52 m² per tre ospiti a Palermo, con zona living, cucina attrezzata, due bagni e balcone su Discesa Santamarina.",
    },
    title: "Suite",
    cover: demo("04"),
    text: "Un appartamento con ambienti personalizzati, zona living e balcone sul centro storico di Palermo.",
    specs: "52 m² · fino a 3 ospiti · 1 camera · 2 bagni · secondo piano",
    intro: {
      title: "Il comfort di uno spazio tutto tuo",
      text: [
        "La Suite è pensata per chi desidera vivere Palermo con l'indipendenza e la comodità di una casa.",
        "I suoi 52 m² comprendono una camera matrimoniale, una zona living con divano letto e una cucina attrezzata. Gli arredi personalizzati e le soluzioni artigianali, presenti anche nella cucina, danno carattere agli ambienti.",
        "Dal balcone affacciato su Discesa Santamarina è possibile mantenere un contatto diretto con le strade del centro storico.",
        "La presenza di due bagni con doccia e di un angolo lavanderia completa la dotazione dell'appartamento.",
      ].join("\n\n"),
      image: demo("19", true),
    },
    gallery: [demo("07"), demo("12", true), demo("16"), demo("09", true), demo("22"), demo("13", true), demo("25"), demo("18")],
    stay: {
      features: [
        {
          label: "Dotazioni dell'appartamento",
          text: "La Suite offre ambienti indipendenti e attrezzature pensate per rendere comoda la permanenza.",
          items: ["Cucina con piano a induzione, microonde, frigorifero e stoviglie", "Lavatrice e asciugatrice, con angolo lavanderia", "Zona living con divano letto", "Wi-Fi, climatizzazione, TV e cassaforte"],
        },
        {
          label: "Comfort in camera",
          text: "Materiali e arredi personalizzati incontrano piccole attenzioni dedicate al soggiorno.",
          items: ["Camera con letto matrimoniale", "Due bagni, entrambi con doccia", "Linea bagno Moro, biancheria e pantofole", "Macchina del caffè, bollitore, acqua di benvenuto e kit colazione"],
        },
        services,
      ],
    },
    others: others(
      "Ogni appartamento di Palazzo Gualbes offre spazi e caratteristiche differenti. Scopri le altre soluzioni e trova quella più adatta al tuo soggiorno.",
      [familySuiteCard],
      demo("03", true),
    ),
  },
];
