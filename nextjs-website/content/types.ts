// Tipi dei contenuti: gli schemi Sanity (sanity/schemaTypes) li rispecchiano uno a uno.
// I testi lunghi (campi "text", "lead"…) vanno a capo per separare i paragrafi.

/** hotspot: punto focale scelto in Studio (0–1) */
export type Img = { src: string; alt: string; warm?: boolean; hotspot?: { x: number; y: number } };
export type LinkItem = { label: string; href: string };
/** meta title e meta description della pagina */
export type Seo = { title?: string; description?: string };

export type SiteSettings = {
  street: string;
  city: string;
  phone: LinkItem;
  email: string;
  social: LinkItem[];
  menu: LinkItem[];
  bookHref: string;
  footerLinks: LinkItem[];
  legalLinks: LinkItem[];
  copyright: string;
  credits: string;
};

/** href facoltativo: senza, la card non è cliccabile (es. attività di Experience); linkLabel: testo del link, se vuoto "Scopri di più" */
export type SuiteCard = { title: string; text: string; image: Img; href?: string; linkLabel?: string };

export type SuitesSliderData = {
  coverImage: Img;
  coverTitle: string[];
  cta: LinkItem;
  asideText: string;
  asideLink?: LinkItem;
  suites: SuiteCard[];
};

// Sezioni riusate in più pagine
export type HeroData = { title: string; a: Img; b: Img; text: string }; // AboutHero
export type MainTextData = { title: string; text: string; link?: LinkItem; big: Img; small: Img; tiny: Img }; // MainText
export type AboutTextData = MainTextData & { full: Img }; // AboutText
export type LeavesData = { title: string; text: string; link?: LinkItem; a: Img; b: Img }; // Leaves
export type ServicesData = { title: string; text: string; link?: LinkItem; a: Img; b: Img; c: Img }; // Services
export type IntroData = { intro: { title: string; text: string; image: Img }; gallery: Img[] }; // SuiteIntro
export type InfoData = { title: string; text: string; contact?: string; link?: LinkItem; small: Img; big: Img }; // InfoBlock

export type HomePage = {
  seo?: Seo;
  hero: { title: string[]; image: Img; text: string; cta: string; ctaUnderline: string; ctaHref: string };
  mainText: MainTextData;
  suites: SuitesSliderData;
  services: ServicesData;
  experience: { marquee: string; image: Img; text: string; link: LinkItem };
  news: { title: string; lead: string; link?: LinkItem; posts?: { title: string; href: string; meta: string; image: Img }[] };
  recommended: { title: string; logos?: string[] };
};

export type AboutPage = {
  seo?: Seo;
  hero: HeroData;
  text: AboutTextData;
  leaves: LeavesData;
  welcome: ServicesData;
  info: InfoData;
};

export type ServicesPage = { seo?: Seo; hero: HeroData; text: AboutTextData; leaves: LeavesData; info: InfoData };
export type ExperiencePage = ServicesPage & { activities: SuitesSliderData };

export type StoryPage = {
  seo?: Seo;
  hero: HeroData;
  origins: AboutTextData;
  transformations: LeavesData;
  printing: ServicesData;
  recovery: IntroData;
  info: InfoData;
};

export type Room = {
  title: string;
  specs: string[];
  soon?: string;
  cta: LinkItem;
  big: Img;
  small: Img;
};

export type RoomsPage = { seo?: Seo; title: string; lead: string; intro: LeavesData; rooms: Room[] };

export type Suite = {
  seo?: Seo;
  slug: string;
  title: string;
  subtitle?: string;
  cover: Img;
  text: string;
  specs: string;
  intro: IntroData["intro"];
  gallery: Img[];
  stay: { title?: string; features: { label: string; text?: string; items: string[] }[] };
  others: SuitesSliderData;
};

export type Category = { slug: string; title: string };

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; num: string; text: string }
  | { type: "tip"; label: string; text: string }
  | { type: "pair"; images: [Img, Img] }
  | { type: "quote"; text: string };

export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readingTime?: number;
  excerpt: string;
  cover: Img;
  lead?: string;
  caption?: string;
  body?: ArticleBlock[];
  related?: string[];
};

export type JournalPage = { seo?: Seo; title: string; lead: string; featured?: string };

export type ContactPage = {
  seo?: Seo;
  title: string;
  lead: string;
  info: { title: string; lines: string[]; href?: string }[];
  formTitle: string;
  formText?: string;
  arrive: { title: string; text: string; link: LinkItem };
  faq: { num: string; title: string; text: string; details?: { term: string; desc: string }[] }[];
};

// Componenti non più usati nelle pagine (testi V1), tenuti per un eventuale riuso
export type MapData = { title: string; lines: string[]; link: LinkItem };
export type NewsletterData = { title: string; text: string; label: string; placeholder: string; button: string; done: string };
