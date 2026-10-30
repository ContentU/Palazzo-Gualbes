"use client";

import { useRef } from "react";
import Photo from "@/components/ui/Photo";
import { gsap, useGSAP, E, reduceMotion } from "@/lib/motion";
import type { Suite } from "@/content/types";

// Hero scheda suite: ingresso orchestrato, poi la foto si ingrandisce con lo scroll
export default function SuiteHero({ title, subtitle, cover, text, specs }: Pick<Suite, "title" | "subtitle" | "cover" | "text" | "specs">) {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduceMotion()) return;
      const img = frame.current!.querySelector("[data-ph-in]");
      gsap.timeline({ defaults: { ease: E } })
        .from("[data-line]", { yPercent: 105, duration: 1.3, stagger: 0.06 }, 0.1)
        .from(frame.current, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" }, 0)
        .from(img, { scale: 1.25, duration: 2.2 }, 0.1)
        .from("[data-foot] > *", { y: 16, opacity: 0, duration: 1, stagger: 0.08 }, 1.1);
      gsap.timeline({ scrollTrigger: { trigger: frame.current, start: "top 30%", end: "bottom top", scrub: 0.5 } })
        .to(frame.current, { scale: 1.16, ease: "none" }, 0)
        .to(img, { scale: 1.12, ease: "none" }, 0);
    },
    { scope: root },
  );

  return (
    <section ref={root} id="hero">
      <div className="relative mx-gutter lg:mx-[8.1vw] [--fs:clamp(2.6rem,7.3vw,6.4rem)] pt-[calc(var(--fs)*1.2)]">
        <h1 className="absolute z-2 top-0 left-[2.4%] font-display font-extrabold text-[length:var(--fs)] leading-none tracking-tight text-balance pointer-events-none">
          <span className="block text-red line-mask"><span data-line className="block">{title}</span></span>
          {subtitle && <span className="block text-white line-mask"><span data-line className="block">{subtitle}</span></span>}
        </h1>
        <div ref={frame} className="relative aspect-cinema overflow-hidden origin-top will-change-transform after:absolute after:inset-0 after:bg-linear-to-b after:from-black/12 after:via-black/0 after:via-40% after:to-black/28">
          <Photo {...cover} priority sizes="(min-width: 901px) 84vw, 100vw" className="absolute! inset-0" imgClass="object-[50%_30%] origin-[50%_40%]" />
          <div data-foot className="absolute z-2 inset-x-[clamp(14px,2.4%,32px)] bottom-[clamp(16px,3vw,41px)] flex flex-col items-start gap-5 text-white lg:flex-row lg:justify-between lg:items-end">
            <p className="font-display font-book text-lead max-w-[16em]">{text}</p>
            <span className="font-bold text-micro lg:whitespace-nowrap">{specs}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
