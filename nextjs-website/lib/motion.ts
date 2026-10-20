"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

export const E = "expo.out";

// Come nella demo: niente GSAP con riduzione del movimento; parallax e pin solo da desktop
export const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
export const isDesktop = () => matchMedia("(min-width: 901px)").matches;

// Divide un titolo in parole mascherate (copiata dalla demo)
export function splitWords(el: Element) {
  el.innerHTML = (el.textContent ?? "")
    .trim()
    .split(/\s+/)
    .map(
      (w) =>
        '<span style="display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.08em;margin-bottom:-.08em"><span class="w" style="display:inline-block">' +
        w +
        "</span></span>",
    )
    .join(" ");
  return el.querySelectorAll(".w");
}
