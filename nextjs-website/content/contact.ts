import type { ContactPage } from "./types";

export const contact: ContactPage = {
  seo: {
    title: "Contatti e informazioni — Palazzo Gualbes",
    description: "Contatta Palazzo Gualbes per informazioni su appartamenti, servizi e soggiorni nel centro storico di Palermo.",
  },
  title: "Contattaci",
  lead: "Hai bisogno di informazioni sugli appartamenti, sui servizi o sull'organizzazione del tuo soggiorno? Siamo a disposizione per aiutarti.",
  info: [
    { title: "Indirizzo", lines: ["Palazzo Gualbes", "Via del Celso 31, Palermo"] },
    { title: "Telefono e WhatsApp", lines: ["+39 393 476 7937"], href: "tel:+393934767937" },
    { title: "Email", lines: ["info@palazzogualbes.it"], href: "mailto:info@palazzogualbes.it" },
    { title: "Assistenza", lines: ["07:00–22:00"] },
    { title: "Check-in e check-out", lines: ["Check-in: dalle 14:00", "Check-out: entro le 11:00"] },
  ],
  formTitle: "Richiedi informazioni",
  formText: "Compila il modulo per ricevere informazioni sugli appartamenti, sulla disponibilità o sui servizi di Palazzo Gualbes.",
  arrive: {
    title: "Nel cuore del centro storico",
    text: "Palazzo Gualbes si trova in Via del Celso, nel centro storico di Palermo, vicino ai principali monumenti e a Via Maqueda.",
    link: { label: "Contattaci prima dell'arrivo", href: "#richiesta" },
  },
  faq: [
    {
      num: "01",
      title: "Dall'aeroporto",
      text: "È disponibile su richiesta un servizio di transfer da e per l'aeroporto. Per informazioni e organizzazione del servizio, contatta la struttura prima del tuo arrivo.",
    },
    {
      num: "02",
      title: "Dalla stazione",
      text: "È possibile richiedere informazioni per organizzare il trasferimento dalla stazione alla struttura.",
    },
    {
      num: "03",
      title: "In auto",
      text: "L'accesso al centro storico può essere difficoltoso per chi arriva in auto, a causa delle limitazioni della ZTL. Palazzo Gualbes dispone di una soluzione di parcheggio convenzionato e può fornire informazioni sulle modalità di accesso.",
    },
    {
      num: "04",
      title: "Accessibilità",
      text: "L'edificio non dispone di ascensore e presenta rampe di scale. Gli appartamenti non sono accessibili a persone con mobilità ridotta.",
    },
  ],
};
