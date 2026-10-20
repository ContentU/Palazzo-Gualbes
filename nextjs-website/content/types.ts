// Tipi dei contenuti: solo i campi che la demo mostra. In Phase 8 gli schemi Sanity li rispecchiano uno a uno.

/** hotspot: punto focale scelto in Studio (0–1) */
export type Img = { src: string; alt: string; warm?: boolean; hotspot?: { x: number; y: number } };
export type LinkItem = { label: string; href: string };

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

export type SuiteCard = { title: string; text: string; image: Img; href: string };

export type SuitesSliderData = {
  coverImage: Img;
  coverTitle: string[];
  cta: LinkItem;
  asideText: string;
  suites: SuiteCard[];
};

export type InfoData = { title: string; text: string; contact: string; small: Img; big: Img };

export type HomePage = {
  hero: { title: string[]; image: Img; text: string; cta: string; ctaUnderline: string; ctaHref: string };
  mainText: { title: string; text: string; link: LinkItem; big: Img; small: Img; tiny: Img };
  suites: SuitesSliderData;
  services: { title: string; text: string; link: LinkItem; a: Img; b: Img; c: Img };
  experience: { marquee: string; image: Img; text: string; link: LinkItem };
  news: { title: string; lead: string; posts: { title: string; href: string; meta: string; image: Img }[] };
  recommended: { title: string; logos: string[] };
};

export type AboutPage = {
  hero: { title: string; a: Img; b: Img; text: string };
  text: { title: string; text: string; link: LinkItem; big: Img; small: Img; tiny: Img; full: Img };
  leaves: { title: string; text: string; a: Img; b: Img };
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

export type RoomsPage = { title: string; lead: string; rooms: Room[]; info: InfoData };

export type Suite = {
  slug: string;
  title: string;
  subtitle: string;
  cover: Img;
  text: string;
  specs: string;
  intro: { title: string; text: string; image: Img };
  gallery: Img[];
  stay: { title: string; features: { label: string; text: string; items: string[] }[] };
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

export type JournalPage = {
  title: string;
  lead: string;
  featured: string;
  newsletter: { title: string; text: string; label: string; placeholder: string; button: string; done: string };
};

export type ContactPage = {
  title: string;
  lead: string;
  info: { title: string; lines: string[]; href?: string }[];
  formTitle: string;
  map: { title: string; lines: string[]; link: LinkItem };
  arrive: { title: string; text: string; link: LinkItem };
  faq: { num: string; title: string; text: string; details: { term: string; desc: string }[] }[];
};
