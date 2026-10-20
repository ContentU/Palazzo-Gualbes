"use client";

// Foto Sanity ridimensionate dal CDN di Sanity (con il ritaglio già nell'URL).
// shortcut: i pochi file locali (decori, svg) escono senza ottimizzazione; spostali in Sanity se diventano pesanti.
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith("https://cdn.sanity.io/")) return `${src}?w=${width}`;
  return `${src}${src.includes("?") ? "&" : "?"}w=${width}&q=${quality ?? 75}&auto=format`;
}
