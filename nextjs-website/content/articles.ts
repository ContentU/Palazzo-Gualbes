import type { Article, Category, JournalPage } from "./types";
import { demo } from "./demo";

export const categories: Category[] = [
  { slug: "storia", title: "Storia" },
  { slug: "itinerari", title: "Itinerari" },
  { slug: "gusto", title: "Gusto" },
  { slug: "palazzo", title: "Il Palazzo" },
];

export const journal: JournalPage = {
  seo: {
    title: "Journal — Palazzo Gualbes",
    description: "Storie, cultura e tradizioni di Palermo nel Journal di Palazzo Gualbes.",
  },
  title: "Journal",
  lead: [
    "Storie, luoghi e prospettive per conoscere Palermo e il mondo di Palazzo Gualbes.",
    "Un diario dedicato alla città e alla sua identità, tra storia, cultura, tradizioni ed esperienze.",
    "Uno spazio per condividere approfondimenti e suggerimenti che accompagnano il viaggio, anche prima di arrivare a Palermo.",
  ].join("\n\n"),
  // articoli demo: i testi V1 prevedono articoli da redigere separatamente
  featured: "palermo-arabo-normanna-in-una-mattina",
};

// In ordine di pubblicazione (il primo è l'articolo in evidenza)
export const articles: Article[] = [
  {
    slug: "palermo-arabo-normanna-in-una-mattina",
    title: "Palermo arabo-normanna in una mattina",
    category: "itinerari",
    date: "12 ottobre 2026",
    readingTime: 6,
    excerpt: "Quattro tappe a piedi dal portone del Palazzo: mosaici d'oro, cupole rosse e giardini di chiostro, prima che la città si svegli davvero.",
    cover: demo("21"),
    lead: "Quattro tappe a piedi dal portone del Palazzo: mosaici d'oro, cupole rosse e giardini di chiostro, da vedere con calma prima che la città si svegli davvero.",
    caption: "Foto demo · Gli scatti definitivi saranno inseriti in fase di produzione.",
    body: [
      { type: "p", text: "Nel 2015 l'UNESCO ha riconosciuto l'itinerario \"Palermo arabo-normanna e le cattedrali di Cefalù e Monreale\" come Patrimonio dell'Umanità. Gran parte di quei monumenti si trova a pochi minuti dal Palazzo: basta uscire presto, quando le strade sono ancora fresche e i turisti pochi, e seguire il Cassaro verso ovest." },
      { type: "p", text: "Abbiamo costruito questo percorso per chi soggiorna da noi e ha a disposizione una mattina. Si cammina in tutto poco più di due chilometri." },
      { type: "h2", num: "01", text: "Palazzo dei Normanni e Cappella Palatina" },
      { type: "p", text: "Si comincia dall'edificio più alto della città antica, oggi sede dell'Assemblea Regionale Siciliana. All'interno, la Cappella Palatina voluta da Ruggero II nel XII secolo raccoglie mosaici bizantini, un soffitto ligneo di fattura islamica e un pavimento in marmi intarsiati: tre culture nella stessa stanza." },
      { type: "tip", label: "Il nostro consiglio", text: "Arriva all'apertura e acquista il biglietto online la sera prima: la coda si forma già a metà mattina." },
      { type: "pair", images: [demo("22"), demo("23")] },
      { type: "h2", num: "02", text: "San Giovanni degli Eremiti" },
      { type: "p", text: "A cinque minuti a piedi, le cinque cupole rosse sono l'immagine più fotografata della Palermo normanna. Il vero motivo per entrare però è il chiostro: un giardino di agrumi e palme dove il rumore della città scompare." },
      { type: "quote", text: "Palermo si scopre a piedi, uscendo presto, con il tempo di fermarsi." },
      { type: "h2", num: "03", text: "La Cattedrale" },
      { type: "p", text: "Tornando verso il Cassaro si incontra la Cattedrale, un libro di storia in pietra: arabo-normanna nel perimetro, gotica nel portico, neoclassica nella cupola. All'interno si trovano le tombe reali; dai tetti, nelle giornate limpide, si vede tutta la Conca d'Oro." },
      { type: "h2", num: "04", text: "La Martorana e San Cataldo" },
      { type: "p", text: "Ultima tappa in Piazza Bellini, superati i Quattro Canti. Le due chiese stanno una accanto all'altra: la Martorana con i suoi mosaici dorati, San Cataldo con le cupole rosse e l'interno spoglio. Da qui il Palazzo è a dieci minuti, giusto in tempo per il pranzo." },
      { type: "tip", label: "Abbigliamento", text: "Nelle chiese sono richieste spalle e ginocchia coperte: in estate porta con te una sciarpa leggera." },
    ],
    related: ["la-shera-de-cancellarii-la-via-dei-notai", "ballaro-all-alba-guida-al-mercato", "il-restauro-di-palazzo-gualbes"],
  },
  { slug: "la-shera-de-cancellarii-la-via-dei-notai", title: "La Shera de Cancellarii, la via dei notai", category: "storia", date: "2 ottobre 2026", excerpt: "Un vicolo stretto tra il Cassaro e Ballarò, dove per secoli si sono redatti contratti, doti e testamenti della città.", cover: demo("18") },
  { slug: "forni-e-pasticcerie-dell-albergheria", title: "Forni e pasticcerie dell'Albergheria", category: "gusto", date: "28 settembre 2026", excerpt: "Sfincione, cannoli e pane con la milza: una mappa dei banconi di quartiere che i palermitani non cambiano mai.", cover: demo("13") },
  { slug: "il-restauro-di-palazzo-gualbes", title: "Il restauro di Palazzo Gualbes", category: "palazzo", date: "21 settembre 2026", excerpt: "Pietra originale, soffitti alti e archi riportati alla luce: com'è nato il progetto degli appartamenti.", cover: demo("15") },
  { slug: "ballaro-all-alba-guida-al-mercato", title: "Ballarò all'alba: guida al mercato", category: "gusto", date: "14 settembre 2026", excerpt: "Quando arrivare, cosa assaggiare e come muoversi tra le \"abbanniate\" del mercato più antico di Palermo.", cover: demo("08") },
  { slug: "cinque-terrazze-per-l-ora-del-tramonto", title: "Cinque terrazze per l'ora del tramonto", category: "itinerari", date: "7 settembre 2026", excerpt: "Dai tetti della Cattedrale ai rooftop del centro: dove guardare la città cambiare colore.", cover: demo("12") },
  { slug: "pezzi-d-autore-e-pietra-antica", title: "Pezzi d'autore e pietra antica", category: "palazzo", date: "31 agosto 2026", excerpt: "Il racconto degli arredi: design italiano, artigianato siciliano e opere scelte per ogni stanza.", cover: demo("11") },
  { slug: "mondello-fuori-stagione", title: "Mondello fuori stagione", category: "itinerari", date: "24 agosto 2026", excerpt: "Una mezza giornata al mare quando la spiaggia torna dei palermitani: come arrivare e dove fermarsi.", cover: demo("20") },
  { slug: "le-mura-puniche-sotto-il-centro-storico", title: "Le mura puniche sotto il centro storico", category: "storia", date: "17 agosto 2026", excerpt: "Cosa resta della città antica e dove si può ancora vedere, a pochi passi dal portone di Via del Celso.", cover: demo("25") },
  { slug: "colazione-siciliana-brioche-e-granita", title: "Colazione siciliana: brioche e granita", category: "gusto", date: "10 agosto 2026", excerpt: "Il rito estivo spiegato bene, con gli indirizzi giusti per provarlo vicino al Palazzo.", cover: demo("19") },
];
