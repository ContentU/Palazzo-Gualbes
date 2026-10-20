import type { Img } from "./types";

// Foto demo: stesso alt della demo; in Phase 8 arrivano da Sanity
export const demo = (n: string, warm = false): Img => ({
  src: `/images/demo/${n}.webp`,
  alt: "Interni del Palazzo, foto demo",
  warm,
});
