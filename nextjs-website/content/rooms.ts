import type { RoomsPage } from "./types";
import { demo } from "./demo";
import { roomsInfo } from "./about";

const cta = { label: "Scopri la suite", href: "/camere/family-suite" };

export const rooms: RoomsPage = {
  title: "Suite e appartamenti di lusso nel centro storico di Palermo",
  lead: "Appartamenti privati in una dimora patrizia del Trecento, curati in ogni dettaglio e a pochi passi dalla Cattedrale.",
  rooms: [
    { title: "Family Suite", specs: ["90 mq · cucina completa", "terrazza · 6 ospiti"], cta, big: demo("10", true), small: demo("06") },
    { title: "Junior Suite", specs: ["40 mq · angolo cottura", "doccia a pioggia · 2 ospiti"], cta, big: demo("07"), small: demo("14", true) },
    { title: "Deluxe Suite", specs: ["55 mq · bagno in marmo", "piano nobile · 2 ospiti"], soon: "Disponibile da marzo 2027", cta, big: demo("04", true), small: demo("19") },
  ],
  info: roomsInfo,
};
