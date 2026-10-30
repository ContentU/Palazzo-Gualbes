import type { AboutPage } from "./types";
import { demo } from "./demo";

const p = (...paras: string[]) => paras.join("\n\n");

// Il Palazzo: pagina master editoriale (testi V1, sezione 01)
export const about: AboutPage = {
  seo: {
    title: "Il Palazzo — Storia e design nel centro di Palermo",
    description: "Scopri Palazzo Gualbes, tra storia, materiali naturali, arredi personalizzati e una nuova idea di ospitalità nel centro storico di Palermo.",
  },
  hero: {
    title: "Palazzo Gualbes. Una storia da abitare.",
    a: demo("23"),
    b: demo("12", true),
    text: "Nel centro storico di Palermo, una dimora antica accoglie appartamenti di design, dove materiali naturali, dettagli artigianali e comfort contemporaneo si incontrano.",
  },
  text: {
    title: "Una casa nel cuore della città",
    text: p(
      "Palazzo Gualbes nasce dal desiderio di offrire un modo diverso di soggiornare a Palermo: sentirsi parte della città, conservando il piacere e la tranquillità di una casa.",
      "In un edificio storico di Via del Celso, appartamenti indipendenti interpretano questa idea attraverso ambienti curati, arredi personalizzati e attenzioni pensate per accompagnare ogni momento del soggiorno.",
      "Un luogo da cui partire alla scoperta di Palermo e in cui ritrovare, al ritorno, un'atmosfera accogliente e familiare.",
    ),
    link: { label: "Scopri gli appartamenti", href: "/camere" },
    big: demo("25", true),
    small: demo("18"),
    tiny: demo("20", true),
    full: demo("24"),
  },
  leaves: {
    title: "Il carattere della storia, la cura del presente",
    text: p(
      "Palazzo Gualbes conserva il legame con la propria storia attraverso elementi architettonici che testimoniano il passato dell'edificio, tra cui gli inserti originali in tufo.",
      "Il progetto di recupero, che ha previsto interventi di consolidamento su un immobile sottoposto a tutela, accompagna questa identità storica con una nuova destinazione dedicata all'ospitalità.",
      "Negli appartamenti, il legno, il marmo e le soluzioni artigianali realizzate su misura esprimono una precisa attenzione alla scelta dei materiali e alla qualità degli ambienti. Ogni dettaglio contribuisce a creare spazi dal carattere personale, in cui design e funzionalità convivono naturalmente.",
    ),
    link: { label: "Approfondisci la storia del Palazzo", href: "/la-storia" },
    a: demo("22"),
    b: demo("13", true),
  },
  welcome: {
    title: "Il piacere di sentirsi accolti",
    text: p(
      "A Palazzo Gualbes l'ospitalità parte da un'idea semplice: offrire agli ospiti la libertà di vivere Palermo secondo i propri ritmi, con il comfort e le attenzioni di una casa.",
      "La posizione nel centro storico permette di raggiungere a piedi monumenti, botteghe e luoghi della tradizione gastronomica. Gli appartamenti offrono ambienti tranquilli e indipendenti, dove ritrovare il proprio spazio dopo una giornata in città.",
      "Un equilibrio tra scoperta, autonomia e accoglienza personale.",
    ),
    a: demo("06", true),
    b: demo("15"),
    c: demo("09", true),
  },
  info: {
    title: "Organizziamo il tuo soggiorno?",
    text: "Hai bisogno di informazioni sugli appartamenti o di assistenza per organizzare il tuo arrivo a Palermo? Siamo a disposizione per aiutarti.",
    link: { label: "Contattaci", href: "/contatti" },
    small: demo("11", true),
    big: demo("16"),
  },
};
