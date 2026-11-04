import type { SiteSettings } from "./types";

// Booking engine Beddy (usato da "Prenota", "Prenota il tuo soggiorno", "Verifica disponibilità"): BookingDialog lo apre in una finestra sul sito.
// Su Sanity i link sono in siteSettings.bookHref, homePage.hero.ctaHref e nelle CTA delle suite.
export const BOOKING_HREF = "https://paazzgualbes.beddy.io/?lang=it";
export const BEDDY_WIDGET = "9a7c037215d1d";

export const site: SiteSettings = {
  street: "Via del Celso 31",
  city: "90134 Palermo",
  phone: { label: "+39 393 476 7937", href: "tel:+393934767937" },
  email: "info@palazzogualbes.it",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
  ],
  menu: [
    { label: "Il Palazzo", href: "/il-palazzo" },
    { label: "Suite e appartamenti", href: "/camere" },
    { label: "Servizi", href: "/servizi" },
    { label: "Experience", href: "/experience" },
    { label: "Journal", href: "/journal" },
    { label: "Contatti", href: "/contatti" },
  ],
  bookHref: BOOKING_HREF,
  footerLinks: [
    { label: "Il Palazzo", href: "/il-palazzo" },
    { label: "La Storia", href: "/la-storia" },
    { label: "Journal", href: "/journal" },
    { label: "Contatti", href: "/contatti" },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "#top" },
    { label: "Cookie Policy", href: "#top" },
  ],
  copyright: "© 2026 Palazzo Gualbes. Tutti i diritti riservati.",
  credits: "Website by ContentU",
};
