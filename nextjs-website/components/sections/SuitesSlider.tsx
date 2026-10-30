"use client";

import Image from "next/image";
import { useRef } from "react";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import MoreLink from "@/components/ui/MoreLink";
import Text from "@/components/ui/Text";
import { gsap, useGSAP, E, splitWords, reduceMotion, isDesktop } from "@/lib/motion";
import type { SuitesSliderData } from "@/content/types";

// Suites su rosso: da desktop la sezione si blocca e le slide scorrono in orizzontale.
// Eccezione del design system: qui le misure dipendono da --h (vedi _docs/design-system.md).
export default function SuitesSlider({ coverImage, coverTitle, cta, asideText, asideLink, suites }: SuitesSliderData) {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduceMotion()) return;
      gsap.from("[data-cover-line]", { yPercent: 105, duration: 1.2, ease: E, stagger: 0.07, scrollTrigger: { trigger: root.current, start: "top 60%", once: true } });
      if (!isDesktop()) return;
      const t = track.current!;
      const dist = () => Math.max(0, t.scrollWidth - innerWidth);
      const hz = gsap.to(t, {
        x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: pin.current, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true },
      });
      gsap.from("[data-line]", { scaleX: 0, ease: "none", scrollTrigger: { trigger: pin.current, start: "top 40%", end: () => "+=" + (dist() + innerHeight * 0.4), scrub: true } });
      gsap.utils.toArray<HTMLElement>("[data-px] [data-ph-in]", root.current).forEach((el) => {
        gsap.fromTo(el, { xPercent: -6 }, { xPercent: 6, ease: "none", scrollTrigger: { trigger: el.parentElement, containerAnimation: hz, start: "left right", end: "right left", scrub: true } });
      });
      gsap.utils.toArray<HTMLElement>("article", root.current).forEach((el) => {
        gsap.from(el.querySelector("[data-px]"), { clipPath: "inset(0% 0% 0% 100%)", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: el, containerAnimation: hz, start: "left 88%", once: true } });
        gsap.from(splitWords(el.querySelector("h3")!), { yPercent: 105, duration: 1.1, ease: E, stagger: 0.05, scrollTrigger: { trigger: el, containerAnimation: hz, start: "left 60%", once: true } });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="suites" className="relative overflow-hidden bg-red text-white py-20 lg:py-0">
      <div ref={pin} className="lg:h-svh lg:flex lg:items-center lg:pt-10">
        <div
          ref={track}
          className="relative flex flex-col items-center gap-14 lg:flex-row lg:gap-0 will-change-transform [--h:calc((100vw-40px)/1.3865)] lg:[--h:min(72vh,54vw)]"
        >
          <span
            data-line
            aria-hidden="true"
            className="hidden lg:block absolute z-0 left-[calc(var(--h)*.9)] right-[30vw] top-[calc(var(--h)*.628)] h-px bg-white/85 origin-left after:absolute after:-right-px after:-top-1 after:size-[9px] after:border-t after:border-r after:border-white after:rotate-45"
          />
          <div className="relative z-1 flex flex-col lg:flex-row lg:flex-[0_0_100vw] lg:w-screen lg:items-start lg:pl-[clamp(20px,2.1vw,29px)]">
            <div className="relative z-1 flex-none w-[calc(var(--h)*1.3865)] h-(--h)">
              <Photo {...coverImage} sizes="(min-width: 901px) 75vw, 100vw" className="absolute! inset-0 bg-surface" />
              <h2 className="absolute left-[calc(var(--h)*.064)] top-[calc(var(--h)*.126)] font-display font-black text-[length:calc(var(--h)*.176)] leading-none tracking-tight text-red">
                {coverTitle.map((l, i) => (
                  <span key={i} className="line-mask"><span data-cover-line className="block">{l}</span></span>
                ))}
              </h2>
              <Button href={cta.href} className="absolute right-[calc(var(--h)*.03)] bottom-[calc(var(--h)*.033)]">{cta.label}</Button>
            </div>
            <div className="relative z-1 flex flex-row items-center gap-6 lg:flex-none lg:flex-col lg:items-stretch lg:justify-between lg:gap-0 lg:w-[calc(var(--h)*.255)] lg:ml-[calc(var(--h)*.056)] lg:h-(--h) lg:pt-[calc(var(--h)*.157)]">
              <div className="grid gap-4 content-start justify-items-start">
                <Text className="font-bold text-[length:clamp(12px,calc(var(--h)*.0217),16px)] leading-[1.05]" text={asideText} />
                {asideLink && <MoreLink href={asideLink.href}>{asideLink.label}</MoreLink>}
              </div>
              <Image src="/images/fiore-panna.webp" alt="" width={600} height={600} className="w-30 lg:w-full aspect-square object-contain lg:-mb-[calc(var(--h)*.03)]" />
            </div>
          </div>
          {suites.map((s) => (
            <div key={s.title} className="relative z-1 flex lg:flex-[0_0_100vw] lg:w-screen lg:items-start lg:pl-[clamp(20px,4vw,60px)] lg:pr-[clamp(20px,5vw,72px)]">
              <article className="relative z-1 flex-none flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-0">
                <Photo {...s.image} px sizes="(min-width: 901px) 58vw, 100vw" className="flex-none w-full h-(--h) lg:w-[min(calc(var(--h)*1.3865),58vw)]" />
                <div className="flex flex-col items-start gap-4.5 lg:gap-0 lg:flex-1 lg:max-w-[36vw] lg:h-(--h) lg:pl-[calc(var(--h)*.06)] lg:pt-[calc(var(--h)*.3)] lg:pb-[calc(var(--h)*.05)]">
                  <h3 className="font-display font-extrabold text-h3 lg:text-[length:calc(var(--h)*.135)] leading-none tracking-tight text-balance text-white">{s.title}</h3>
                  <p className="max-w-[20em] text-[length:clamp(15px,calc(var(--h)*.0298),22px)] leading-[1.27] lg:mt-auto lg:mb-[calc(var(--h)*.06)]">{s.text}</p>
                  {s.href && <MoreLink href={s.href}>{s.linkLabel || "Scopri di più"}</MoreLink>}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
