import type { HomePage } from "./types";
import { demo } from "./demo";

export const home: HomePage = {
  hero: {
    title: ["Palazzo Gualbes", "appartamenti e", "suite di design", "nel cuore del", "centro storico", "di Palermo"],
    image: { src: "/images/demo/02.webp", alt: "Poltrona rosa davanti al muro in pietra originale di un appartamento" },
    text: "Quattro appartamenti privati in una dimora del Trecento, a pochi passi dalla Cattedrale.",
    cta: "prenota",
    ctaUnderline: "adesso",
    ctaHref: "/camere",
  },
  mainText: {
    title: "Uno spazio privato nel cuore della città",
    text: "Palazzo Gualbes è una dimora patrizia del XIV secolo lungo l'antica Shera de Cancellarii. Oggi accoglie appartamenti di design, pensati per chi vuole vivere Palermo con calma, comfort e attenzione ai dettagli.",
    link: { label: "Scopri di più", href: "/il-palazzo" },
    big: demo("21", true),
    small: demo("12"),
    tiny: demo("18", true),
  },
  suites: {
    coverImage: demo("01"),
    coverTitle: ["Suite e", "appartamenti", "a Palermo"],
    cta: { label: "Prenota", href: "/camere" },
    asideText: "Spazi privati e luminosi, arredati con pezzi di design, tra la pietra originale del palazzo.",
    suites: [
      { title: "Family Suite", text: "Due camere e un soggiorno affacciato sulla corte, per famiglie o piccoli gruppi.", image: demo("03", true), href: "/camere/family-suite" },
      { title: "Deluxe Suite", text: "Pietra a vista, soffitti alti e un bagno in marmo. Pensata per due ospiti.", image: demo("17"), href: "/camere/family-suite" },
    ],
  },
  services: {
    title: "Servizi per un soggiorno a Palermo senza pensieri",
    text: "Accoglienza dedicata, colazione servita in appartamento e consigli su misura per scoprire la città. Ogni dettaglio del soggiorno è seguito con discrezione.",
    link: { label: "Scopri di più", href: "#servizi" },
    a: demo("08", true),
    b: demo("11"),
    c: demo("13", true),
  },
  experience: {
    marquee: "Experience Palermo",
    image: demo("24"),
    text: "Mercati storici, chiese arabo-normanne e palazzi nobiliari. Palermo si scopre a piedi, uscendo dal portone di Via del Celso, con i consigli di chi la vive ogni giorno.",
    link: { label: "Scopri di più", href: "#palermo" },
  },
  news: {
    title: "Ultime notizie dal Palazzo",
    lead: "Storie, luoghi e consigli dal centro storico di Palermo.",
    posts: [
      { title: "La Shera de Cancellarii, la via dei notai", href: "/journal/palermo-arabo-normanna-in-una-mattina", meta: "Storia | 2 novembre 2026", image: demo("20", true) },
      { title: "Palermo arabo-normanna in una mattina", href: "/journal/palermo-arabo-normanna-in-una-mattina", meta: "Itinerari | 9 novembre 2026", image: demo("16") },
      { title: "Forni e pasticcerie dell'Albergheria", href: "/journal/palermo-arabo-normanna-in-una-mattina", meta: "Sapori | 16 novembre 2026", image: demo("09", true) },
      { title: "Il restauro di Palazzo Gualbes", href: "/journal/palermo-arabo-normanna-in-una-mattina", meta: "Design | 23 novembre 2026", image: demo("22") },
    ],
  },
  recommended: { title: "Recommended by", logos: ["Logo", "Logo", "Logo", "Logo"] },
};
