import type { AboutPage, InfoData } from "./types";
import { demo } from "./demo";

const infoBase = {
  title: "Hai bisogno di altre informazioni?",
  text: "Scrivici per disponibilità, soggiorni lunghi o richieste particolari. Rispondiamo entro un giorno, in italiano o in inglese, e ti aiutiamo a scegliere l'appartamento più adatto.",
  contact: "info@palazzogualbes.it · +39 000 000 0000",
};

export const aboutInfo: InfoData = { ...infoBase, small: demo("11", true), big: demo("16") };
export const roomsInfo: InfoData = { ...infoBase, small: demo("18", true), big: demo("01") };

export const about: AboutPage = {
  hero: {
    title: "Chi siamo",
    a: demo("23"),
    b: demo("12", true),
    text: "Palazzo Gualbes è una dimora patrizia costruita da Giantommaso Gualbes nel XIV secolo, lungo la Shera de Cancellarii, sulle mura puniche della Neapolis.",
  },
  text: {
    title: "Uno spazio privato nel cuore della città",
    text: "Il restauro ha conservato la pietra, gli archi e i soffitti originali. Gli appartamenti uniscono questi elementi a pezzi di design contemporaneo, per un soggiorno che ha il calore di una casa e il comfort di un hotel.",
    link: { label: "Scopri le suite", href: "/camere" },
    big: demo("25", true),
    small: demo("18"),
    tiny: demo("20", true),
    full: demo("24"),
  },
  leaves: {
    title: "Una casa costruita sulle mura della città antica",
    text: "Il palazzo sorge lungo il tracciato delle mura puniche, in una delle strade più antiche di Palermo. Abbiamo voluto che chi soggiorna qui ne sentisse la storia, senza rinunciare a nulla.",
    a: demo("22"),
    b: demo("13", true),
  },
  info: aboutInfo,
};
