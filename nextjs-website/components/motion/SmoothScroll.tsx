"use client";

import { useEffect, useSyncExternalStore } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/motion";

const REDUCE = "(prefers-reduced-motion: reduce)";
const noop = () => () => {};

// Lenis globale (stessi parametri della demo), collegato al ticker di GSAP; spento con riduzione del movimento
export default function SmoothScroll() {
  const reduce = useSyncExternalStore(noop, () => matchMedia(REDUCE).matches, () => true);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Ancore interne (#servizi, #top…): scorrimento morbido come nella demo
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.('a[href^="#"]');
      const t = a && document.querySelector(a.getAttribute("href")!);
      if (!t) return;
      e.preventDefault();
      lenis.scrollTo(t as HTMLElement, { duration: 1.6 });
    };
    document.addEventListener("click", onClick);
    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
      document.removeEventListener("click", onClick);
    };
  }, [lenis]);

  if (reduce) return null;
  return (
    <ReactLenis
      root
      options={{ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), autoRaf: false }}
    />
  );
}
