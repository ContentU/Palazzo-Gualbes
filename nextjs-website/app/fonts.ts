import localFont from "next/font/local";

// Evolve: titoli (pesi estratti dalla demo)
export const evolve = localFont({
  src: [
    { path: "./fonts/Evolve-450.woff", weight: "450", style: "normal" },
    { path: "./fonts/Evolve-450-italic.woff", weight: "450", style: "italic" },
    { path: "./fonts/Evolve-600.woff", weight: "600", style: "normal" },
    { path: "./fonts/Evolve-600-italic.woff", weight: "600", style: "italic" },
    { path: "./fonts/Evolve-800.woff", weight: "800", style: "normal" },
    { path: "./fonts/Evolve-900.woff", weight: "900", style: "normal" },
  ],
  variable: "--font-evolve",
  display: "swap",
});

// Bricolage Grotesque variabile: testi.
// shortcut: solo il subset latin (next/font non gestisce unicode-range per file); aggiungere latin-ext se servono lingue dell'Est.
export const bricolage = localFont({
  src: "./fonts/bricolage-grotesque-latin-opsz-normal.woff2",
  weight: "200 800",
  variable: "--font-bricolage",
  display: "swap",
});
