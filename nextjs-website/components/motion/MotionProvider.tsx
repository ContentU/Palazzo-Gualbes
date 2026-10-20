"use client";

import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP, E, splitWords, reduceMotion, isDesktop } from "@/lib/motion";

// Animazioni a scroll attivate dagli attributi data-* (blocchi "Titoli e testi", "Collage", "Illustrazioni" della demo)
export default function MotionProvider() {
  const pathname = usePathname();

  useGSAP(
    () => {
      if (reduceMotion()) return;
      const desktop = isDesktop();
      const q = gsap.utils.toArray<HTMLElement>;

      /* Titoli e testi */
      q("[data-words]").forEach((h) => {
        gsap.from(splitWords(h), { yPercent: 105, duration: 1.2, ease: E, stagger: 0.035, scrollTrigger: { trigger: h, start: "top 86%", once: true } });
      });
      q("[data-fade]").forEach((el) => {
        gsap.from(el, { y: 16, opacity: 0, duration: 1.1, ease: E, delay: 0.1, scrollTrigger: { trigger: el, start: "top 92%", once: true } });
      });

      /* Collage: apertura e parallax a velocità diverse */
      q("[data-par]").forEach((el) => {
        const v = parseFloat(el.dataset.par!);
        gsap.fromTo(el.querySelector("[data-ph-in]"), { yPercent: -v / 2 }, { yPercent: v / 2, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
        if (desktop) gsap.fromTo(el, { y: v * 4 }, { y: -v * 4, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
      q("[data-reveal]").forEach((el) => {
        gsap.from(el, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });

      /* Illustrazioni: rotazione lenta legata allo scroll */
      q("[data-rot]").forEach((el) => {
        gsap.fromTo(el, { rotate: -14 }, { rotate: 14, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
      q("[data-drift]").forEach((el) => {
        const v = parseFloat(el.dataset.drift!);
        gsap.fromTo(el, { yPercent: v }, { yPercent: -v, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // le foto hanno proporzioni fisse, ma loghi e illustrazioni no: ricalcola a caricamento finito
      if (document.readyState === "complete") ScrollTrigger.refresh();
      else addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
