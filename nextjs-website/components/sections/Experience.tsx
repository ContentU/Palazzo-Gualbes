"use client";

import Image from "next/image";
import { useRef } from "react";
import Photo from "@/components/ui/Photo";
import MoreLink from "@/components/ui/MoreLink";
import Text from "@/components/ui/Text";
import { gsap, useGSAP, reduceMotion } from "@/lib/motion";
import type { HomePage } from "@/content/types";

// Experience: scritta che scorre con lo scroll e si inclina con la velocità
export default function Experience({ marquee, image, text, link }: HomePage["experience"]) {
  const root = useRef<HTMLElement>(null);
  const mq = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduceMotion()) return;
      const skew = gsap.quickTo(mq.current, "skewX", { duration: 0.6, ease: "power3.out" });
      let t: ReturnType<typeof setTimeout>;
      gsap.fromTo(mq.current, { xPercent: 4 }, {
        xPercent: -36, ease: "none",
        scrollTrigger: {
          trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.4,
          onUpdate: (s) => { skew(gsap.utils.clamp(-10, 10, s.getVelocity() / -300)); clearTimeout(t); t = setTimeout(() => skew(0), 140); },
        },
      });
      gsap.fromTo("#expImg [data-ph-in]", { yPercent: -7, scale: 1.15 }, { yPercent: 7, scale: 1.04, ease: "none", scrollTrigger: { trigger: "#expImg", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from("#expImg", { clipPath: "inset(100% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut", scrollTrigger: { trigger: "#expImg", start: "top 85%", once: true } });
      gsap.fromTo("[data-ficus]", { yPercent: 6 }, { yPercent: -6, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      return () => clearTimeout(t);
    },
    { scope: root },
  );

  return (
    <section ref={root} id="palermo" className="relative overflow-hidden bg-night text-white min-h-[min(64vw,880px)] py-[clamp(56px,5.5vw,76px)]">
      <Image data-ficus src="/images/ficus.webp" alt="" width={900} height={1683} className="absolute -right-[7%] top-0 h-full w-auto opacity-32 pointer-events-none mix-blend-screen" />
      <div ref={mq} aria-hidden="true" className="absolute z-3 left-0 top-[clamp(56px,7vw,110px)] flex whitespace-nowrap pointer-events-none select-none will-change-transform">
        {[0, 1, 2].map((i) => (
          <span key={i} className="font-display font-black text-giant uppercase text-transparent [-webkit-text-stroke:1.5px_var(--color-red)] pr-[.3em] tracking-[-.01em]">{marquee}</span>
        ))}
      </div>
      <div className="relative grid grid-cols-24 gap-x-grid px-gutter">
        <Photo id="expImg" {...image} ratio="aspect-tall" sizes="(min-width: 901px) 33vw, 62vw" className="self-start col-[1/16] mt-17.5 lg:col-[3/11] lg:row-1 lg:mt-0" />
        <div className="col-span-full row-2 mt-10 lg:col-[11/21] lg:row-1 lg:self-end lg:mt-0 lg:pl-[clamp(12px,2.3vw,32px)] mb-[clamp(10px,3.5vw,48px)] grid gap-stack-md">
          <Text data-fade className="max-w-[25em]" text={text} />
          <MoreLink href={link.href} fade>{link.label}</MoreLink>
        </div>
      </div>
    </section>
  );
}
