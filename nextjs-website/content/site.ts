import type { SiteSettings } from "./types";

export const site: SiteSettings = {
  street: "Via del Celso, 36",
  city: "90134 Palermo",
  phone: { label: "+39 000 000 0000", href: "tel:+390000000000" },
  email: "info@palazzogualbes.it",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
  ],
  menu: [
    { label: "Home", href: "/" },
    { label: "Il Palazzo", href: "/il-palazzo" },
    { label: "Suite e appartamenti", href: "/camere" },
    { label: "Family Suite", href: "/camere/family-suite" },
    { label: "Experience", href: "/#palermo" },
    { label: "Journal", href: "/journal" },
    { label: "Contatti", href: "/contatti" },
  ],
  bookHref: "/camere",
  footerLinks: [
    { label: "Journal", href: "/journal" },
    { label: "Termini e condizioni", href: "#top" },
    { label: "Newsletter", href: "#top" },
    { label: "FAQ", href: "#top" },
    { label: "Press", href: "#top" },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "#top" },
    { label: "Cookie Policy", href: "#top" },
    { label: "Imprint", href: "#top" },
  ],
  copyright: "© 2026 Palazzo Gualbes. Tutti i diritti riservati.",
  credits: "Website by ContentU",
};
