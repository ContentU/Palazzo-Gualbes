import type { ExperiencePage, ServicesPage, StoryPage } from "./types";
import { demo } from "./demo";

const p = (...paras: string[]) => paras.join("\n\n");

// Servizi: composizione di Il Palazzo (testi V1, sezione 08)
export const services: ServicesPage = {
  seo: {
    title: "Servizi e comfort — Palazzo Gualbes",
    description: "Scopri servizi, comfort e dotazioni degli appartamenti di Palazzo Gualbes: accoglienza, assistenza, deposito bagagli, transfer e parcheggio convenzionato.",
  },
  hero: {
    title: "Il piacere di sentirsi accolti",
    a: demo("08", true),
    b: demo("21"),
    text: "Comfort, attenzioni e servizi pensati per vivere Palermo con la libertà di una casa e la tranquillità di avere un punto di riferimento durante il soggiorno.",
  },
  text: {
    title: "Il comfort di sentirsi a casa",
    text: "A Palazzo Gualbes ogni appartamento è pensato per offrire autonomia e comodità, con dotazioni per il soggiorno quotidiano e piccole attenzioni all'arrivo. Wi-Fi, climatizzazione, TV e cassaforte si accompagnano a biancheria, linea bagno Moro, pantofole, acqua, caffè, tè, welcome kit e kit colazione.",
    link: { label: "Scopri gli appartamenti", href: "/camere" },
    big: demo("10", true),
    small: demo("14"),
    tiny: demo("02", true),
    full: demo("15"),
  },
  leaves: {
    title: "Un'accoglienza attenta, nei tuoi tempi",
    text: "L'indipendenza di un appartamento si unisce all'assistenza di Palazzo Gualbes. Durante il soggiorno puoi contare sul supporto agli ospiti, sul deposito bagagli e sul servizio di pulizia. Su richiesta sono disponibili transfer, parcheggio convenzionato e cambio biancheria, secondo le condizioni comunicate dalla struttura.",
    a: demo("11"),
    b: demo("19", true),
  },
  info: {
    title: "Hai bisogno di informazioni sui servizi?",
    text: "Contattaci per conoscere le modalità di assistenza, il transfer o le possibilità di parcheggio convenzionato prima del tuo arrivo.",
    link: { label: "Contattaci", href: "/contatti" },
    small: demo("13", true),
    big: demo("06"),
  },
};

// Experience: composizione di Il Palazzo + griglia delle attività (testi V1, sezione 09)
export const experience: ExperiencePage = {
  seo: {
    title: "Experience e attività a Palermo",
    description: "Scopri Palermo da Palazzo Gualbes: visite guidate, degustazioni, boat tour privati e attività sul mare.",
  },
  hero: {
    title: "Palermo, da vivere",
    a: demo("20", true),
    b: demo("24"),
    text: "Storia, sapori ed esperienze sul mare. Da Palazzo Gualbes puoi scoprire la città seguendo i tuoi interessi, con la libertà di scegliere ogni giorno un itinerario diverso.",
  },
  text: {
    title: "Palermo, appena fuori dalla porta",
    text: "Nel centro storico, Palazzo Gualbes è vicino ai principali monumenti e a Via Maqueda, uno dei punti di riferimento della vita gastronomica cittadina. Da qui puoi partire a piedi e lasciarti guidare dalle strade, dai luoghi e dalle tradizioni di Palermo.",
    link: { label: "Contattaci", href: "/contatti" },
    big: demo("16", true),
    small: demo("09"),
    tiny: demo("25", true),
    full: demo("22"),
  },
  leaves: {
    title: "Il tuo modo di scoprire la città",
    text: "Una visita guidata, una degustazione in bottega o una giornata sul mare: le attività suggerite da Palazzo Gualbes permettono di vivere Palermo da prospettive diverse. Puoi alternare il piacere di esplorare il centro storico a esperienze dedicate al territorio e alla costa, organizzando il soggiorno secondo i tuoi ritmi.",
    a: demo("12"),
    b: demo("18", true),
  },
  // card senza link: suggerimenti, non prodotti acquistabili
  activities: {
    coverImage: demo("23"),
    coverTitle: ["Scegli", "la tua", "esperienza"],
    cta: { label: "Chiedi informazioni", href: "/contatti" },
    asideText: p(
      "Alcune attività da considerare durante il soggiorno a Palermo.",
      "Le attività sono suggerimenti, non prenotabili direttamente tramite Palazzo Gualbes. Partner e disponibilità devono ancora essere definiti.",
    ),
    suites: [
      { title: "Visite guidate", text: "Percorsi per conoscere monumenti, architetture e storia della città.", image: demo("20") },
      { title: "Degustazioni in bottega", text: "Un'occasione per avvicinarsi ai prodotti e alle tradizioni gastronomiche del territorio.", image: demo("09", true) },
      { title: "Boat tour privati", text: "Escursioni private in barca per scoprire la costa di Palermo dal mare.", image: demo("24") },
      { title: "Parasailing", text: "Un'attività sul mare per chi desidera un'esperienza più dinamica.", image: demo("16", true) },
    ],
  },
  info: {
    title: "Vuoi saperne di più?",
    text: "Contattaci per ricevere informazioni sulle attività suggerite e organizzare il tuo soggiorno.",
    link: { label: "Contattaci", href: "/contatti" },
    small: demo("08", true),
    big: demo("01"),
  },
};

// La Storia: pagina storico-editoriale, link solo dal footer (testi V1, sezione 15)
export const story: StoryPage = {
  seo: {
    title: "La storia di Palazzo Gualbes | Palermo",
    description: "Scopri la storia di Palazzo Gualbes a Palermo: dalle origini medievali alla tipografia ottocentesca, fino al recupero architettonico.",
  },
  hero: {
    title: "Palazzo Gualbes. Una storia attraverso i secoli.",
    a: demo("25"),
    b: demo("22", true),
    text: "Dalle origini medievali alle trasformazioni che ne hanno segnato l'architettura, Palazzo Gualbes custodisce una parte della storia di Palermo. Una dimora che nel tempo ha cambiato forme e funzioni, conservando le tracce di un passato ancora riconoscibile.",
  },
  origins: {
    title: "Una dimora nella Palermo medievale",
    text: p(
      "La storia di Palazzo Gualbes affonda le proprie radici nel XIV secolo, quando l'edificio sorse lungo l'antico percorso della Shera de Cancellarii, nell'area della Neapolis punica, a ridosso delle antiche mura della città.",
      "Il Palazzo deve il proprio nome alla famiglia Gualbes, casata di origine spagnola conosciuta anche con i nomi di Ingalbes o Galbes, legata alla vita politica ed economica della Palermo del tempo.",
      "L'edificio si trovava in un luogo particolarmente significativo della città medievale, in prossimità dell'antico corso del torrente Papireto.",
      "La sua architettura raccontava il carattere delle dimore patrizie dell'epoca, con eleganti bifore in marmo e un prospetto che sarebbe stato profondamente trasformato nei secoli successivi.",
    ),
    big: demo("23", true),
    small: demo("13"),
    tiny: demo("18", true),
    full: demo("12"),
  },
  transformations: {
    title: "Le tracce di epoche diverse",
    text: p(
      "Come molti edifici storici di Palermo, Palazzo Gualbes ha attraversato secoli di trasformazioni.",
      "Nel tardo Cinquecento le originarie finestre medievali furono rimaneggiate con l'inserimento di cornici rinascimentali, modificando l'aspetto della facciata.",
      "Nel corso del tempo, nuove costruzioni si addossarono alle strutture più antiche, mentre gli ambienti interni furono adattati a esigenze differenti.",
      "All'inizio del XVIII secolo il Palazzo passò ai principi di San Lorenzo, segnando un'altra tappa della sua lunga storia.",
      "Di quella stagione medievale rimane una testimonianza particolarmente significativa: una bifora con decorazioni riconducibili al linguaggio architettonico dell'epoca, documentata anche attraverso disegni e rilievi storici.",
    ),
    a: demo("20"),
    b: demo("11", true),
  },
  printing: {
    title: "Quando il Palazzo divenne una tipografia",
    text: p(
      "Nel XIX secolo Palazzo Gualbes assunse una nuova funzione, entrando nella storia della stampa palermitana.",
      "Dal 1848 ospitò la Stamperia della Riforma, successivamente conosciuta come Tipografia Benedetto Lima Lao.",
      "Intorno al 1860 il Palazzo e l'attività tipografica passarono a Francesco Lao, figura legata al mondo dell'editoria e della stampa cittadina.",
      "Di questo periodo rimane una traccia singolare: l'antica insegna Stabilimento Tipografico, documentata sul prospetto principale, all'angolo con Discesa Santamarina.",
      "La trasformazione in stabilimento tipografico comportò importanti modifiche agli spazi, tra cui la suddivisione del piano nobile.",
      "Una nuova pagina nella storia dell'edificio, che da residenza patrizia divenne anche luogo di lavoro e attività culturale.",
    ),
    a: demo("15", true),
    b: demo("07"),
    c: demo("19", true),
  },
  recovery: {
    intro: {
      title: "Conservare la memoria, restituire valore",
      text: p(
        "Nel corso del Novecento, le trasformazioni e i diversi utilizzi avevano progressivamente modificato la configurazione originaria del Palazzo.",
        "Alla fine degli anni Duemila prese avvio un percorso di recupero architettonico, documentato già nel 2009 e nel 2010, nell'ambito del più ampio processo di riqualificazione del centro storico di Palermo.",
        "Il restauro di un edificio così stratificato rappresenta un intervento complesso, nel quale la conservazione delle testimonianze del passato deve confrontarsi con le esigenze del presente.",
        "Palazzo Gualbes è un immobile sottoposto a tutela. Gli interventi di consolidamento e recupero hanno accompagnato una nuova fase della sua storia, nel rispetto del carattere architettonico dell'edificio.",
        "Oggi questo percorso continua attraverso una nuova destinazione dedicata all'ospitalità, che permette di tornare a vivere gli spazi del Palazzo.",
      ),
      image: demo("21", true),
    },
    gallery: [demo("22"), demo("25", true), demo("02"), demo("13", true), demo("05"), demo("23", true)],
  },
  info: {
    title: "Una storia che continua",
    text: p(
      "La storia di Palazzo Gualbes non appartiene soltanto al passato.",
      "Vive negli elementi architettonici conservati, nelle tracce delle trasformazioni e negli spazi che oggi accolgono una nuova idea di ospitalità.",
      "Un luogo in cui il carattere di una dimora storica incontra il design contemporaneo, mantenendo vivo il proprio legame con Palermo.",
    ),
    link: { label: "Scopri Palazzo Gualbes", href: "/il-palazzo" },
    small: demo("18", true),
    big: demo("24"),
  },
};
