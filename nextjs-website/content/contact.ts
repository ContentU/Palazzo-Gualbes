import type { ContactPage } from "./types";

export const contact: ContactPage = {
  title: "Contatti",
  lead: "Scrivici per disponibilità, soggiorni lunghi o richieste particolari. Rispondiamo entro un giorno, in italiano o in inglese.",
  info: [
    { title: "Indirizzo", lines: ["Via del Celso, 36", "90134 Palermo"] },
    { title: "Telefono e WhatsApp", lines: ["+39 000 000 0000"], href: "tel:+390000000000" },
    { title: "Email", lines: ["info@palazzogualbes.it"], href: "mailto:info@palazzogualbes.it" },
    { title: "Accoglienza", lines: ["Ogni giorno, 8:00 – 22:00", "Check-in dalle 15:00 · Check-out entro le 11:00"] },
  ],
  formTitle: "Richiedi disponibilità",
  map: {
    title: "Palazzo Gualbes",
    lines: ["Via del Celso, 36 · 90134 Palermo", "A 3 minuti a piedi dalla Cattedrale"],
    link: { label: "Apri in Google Maps", href: "https://www.google.com/maps/search/?api=1&query=Via+del+Celso+36+Palermo" },
  },
  arrive: {
    title: "Come arrivare",
    text: "Il Palazzo è nel cuore del centro storico, tra la Cattedrale e il mercato di Ballarò. Ecco come raggiungerci.",
    link: { label: "Prenota un transfer", href: "mailto:info@palazzogualbes.it" },
  },
  faq: [
    {
      num: "01",
      title: "Dall'aeroporto",
      text: "L'aeroporto Falcone e Borsellino dista circa 35 km. Il modo più semplice è il nostro transfer privato, da prenotare almeno 48 ore prima: l'autista ti aspetta agli arrivi e ti lascia davanti al portone.",
      details: [
        { term: "Transfer o taxi", desc: "35–45 minuti" },
        { term: "Treno Trinacria Express", desc: "Fino alla Stazione Centrale, poi 20 minuti a piedi o 7 in taxi" },
        { term: "Autobus", desc: "Navetta per il centro, fermata Stazione Centrale" },
      ],
    },
    {
      num: "02",
      title: "Dalla stazione",
      text: "Dalla Stazione Centrale risali Via Maqueda fino ai Quattro Canti, poi gira a sinistra su Corso Vittorio Emanuele verso la Cattedrale. Via del Celso è sulla sinistra, poco prima della piazza.",
      details: [
        { term: "A piedi", desc: "Circa 1,5 km · 20 minuti" },
        { term: "In taxi", desc: "7–10 minuti" },
        { term: "Con i bagagli", desc: "Avvisaci: ti aspettiamo al portone" },
      ],
    },
    {
      num: "03",
      title: "In auto",
      text: "Il Palazzo si trova all'interno della ZTL del centro storico. Prima dell'arrivo ti inviamo il percorso consigliato e le indicazioni per il garage convenzionato, a pochi minuti a piedi.",
      details: [
        { term: "ZTL", desc: "Comunicaci la targa: ti spieghiamo come accedere per lo scarico bagagli" },
        { term: "Parcheggio", desc: "Garage convenzionato, tariffa riservata agli ospiti" },
        { term: "Navigatore", desc: "Imposta \"Via del Celso, Palermo\"" },
      ],
    },
  ],
};
