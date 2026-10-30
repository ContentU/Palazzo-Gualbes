"use client";

import Image from "next/image";
import { useRef } from "react";
import MainText from "./MainText";
import Photo from "@/components/ui/Photo";
import { gsap, useGSAP, reduceMotion } from "@/lib/motion";
import type { AboutTextData } from "@/content/types";

// Il Palazzo: testo con collage, foglie di sfondo e immagine a tutta larghezza che si allarga entrando
export default function AboutText({ full, ...text }: AboutTextData) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (reduceMotion()) return;
    const el = ref.current!.querySelector("#fullImg")!;
    gsap.fromTo(el, { clipPath: "inset(0% 8% 0% 8%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top 25%", scrub: true } });
    gsap.fromTo(el.querySelector("[data-ph-in]"), { scale: 1.2 }, { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
  }, { scope: ref });

  return (
    <div ref={ref}>
      <MainText {...text}>
        <div aria-hidden="true" className="relative h-0 z-0">
          <div className="absolute -left-[30vw] w-[160vw] lg:-left-[14vw] lg:w-[min(118vw,1700px)] top-[clamp(-220px,-14vw,-120px)] opacity-42 saturate-[.55] pointer-events-none">
            <Image src="/images/ficus-2.webp" alt="" width={2007} height={2007} className="w-full h-auto" />
          </div>
        </div>
        <Photo id="fullImg" {...full} ratio="aspect-panorama" sizes="100vw" className="z-1 mt-[clamp(60px,6vw,90px)]" />
      </MainText>
    </div>
  );
}
