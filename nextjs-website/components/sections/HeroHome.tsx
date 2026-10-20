"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, E, reduceMotion } from "@/lib/motion";
import type { HomePage } from "@/content/types";

const title =
  "m-0 text-center font-display font-black text-[length:var(--fs)] leading-none uppercase tracking-[.01em] text-balance pointer-events-none";

function Lines({ lines }: { lines: string[] }) {
  return lines.map((l, i) => (
    <span key={i} className="line-mask"><span data-line={i} className="block">{l}</span></span>
  ));
}

// Hero home (modello Wittmore): la foto sale e si ingrandisce sotto il titolo; dove passa, le lettere diventano bianche
export default function HeroHome({ hero }: { hero: HomePage["hero"] }) {
  const root = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const white = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const rev = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduceMotion()) return;
      const st = { ins: 16 };
      const syncClip = () => {
        const o = inner.current!.getBoundingClientRect(), r = img.current!.getBoundingClientRect(), w = white.current!;
        const k = r.width / img.current!.offsetWidth, d = st.ins * k;
        const top = r.top - o.top - w.offsetTop + d, left = r.left - o.left + d;
        const right = o.right - r.right + d, bottom = w.offsetHeight - (r.bottom - o.top - w.offsetTop) + d;
        w.style.clipPath = `inset(${Math.max(0, top)}px ${Math.max(0, right)}px ${Math.max(0, bottom)}px ${Math.max(0, left)}px)`;
        rev.current!.style.clipPath = `inset(${st.ins}px)`;
      };
      const tick = () => { if (scrollY < inner.current!.offsetHeight + innerHeight) syncClip(); };
      gsap.ticker.add(tick);

      gsap.timeline({ defaults: { ease: E } })
        .from("[data-line]", { yPercent: 110, duration: 1.3, stagger: (_i, el: Element) => Number(el.getAttribute("data-line")) * 0.07 }, 0.1)
        .fromTo(st, { ins: 16 }, { ins: 0, duration: 1, ease: "power2.inOut" }, 0.5)
        .fromTo(rev.current!.querySelector("img"), { scale: 1.1 }, { scale: 1, duration: 1, ease: "power2.inOut" }, 0.5)
        .from("[data-foot] > *", { y: 16, opacity: 0, duration: 1, stagger: 0.08 }, 1.1)
        .from("[data-scroll]", { opacity: 0, duration: 0.8 }, 1.3);
      gsap.to(img.current, { scale: 1.2, yPercent: -20, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to("[data-scroll]", { opacity: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "+=200", scrub: true } });
      return () => gsap.ticker.remove(tick);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="hero"
      className="[--fs:clamp(1.6rem,7.2vw,3rem)] [--top:calc(var(--spacing-header-sm)+22px)] [--iw:calc(100%-2*var(--spacing-gutter))] lg:[--fs:var(--text-h2)] lg:[--top:calc(var(--spacing-header)+clamp(14px,2.6vw,40px))] lg:[--iw:min(70.2vw,1100px)]"
    >
      <div ref={inner} className="relative pt-(--top)">
        <h1 className={`relative z-1 text-red ${title}`}><Lines lines={hero.title} /></h1>
        <div ref={img} className="relative z-2 w-(--iw) aspect-portrait lg:aspect-hero mx-auto mt-[calc(var(--fs)*-4.23)] will-change-transform">
          <div ref={rev} className="absolute inset-0 overflow-hidden">
            <Image src={hero.image.src} alt={hero.image.alt} fill priority sizes="(min-width: 901px) 70vw, 100vw" className="object-cover object-[50%_35%]" />
            <div className="absolute inset-0 bg-black/22" />
          </div>
          <div data-foot className="absolute z-3 left-[clamp(16px,1.7%,24px)] right-[clamp(16px,5%,64px)] bottom-[clamp(16px,4%,40px)] flex flex-col items-start gap-6 text-white lg:flex-row lg:justify-between lg:items-end">
            <p className="font-display font-book text-lead max-w-[15em]">{hero.text}</p>
            <Link href={hero.ctaHref} className="group inline-flex flex-col items-start lg:items-end justify-center min-h-11 font-semibold text-body leading-none text-white">
              <span className="inline-flex items-start gap-[3px]">
                {hero.cta}
                <svg viewBox="0 0 12 12" aria-hidden="true" className="size-[.6em] transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <path d="M3 9L9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </span>
              <u className="underline decoration-[1.5px] underline-offset-4">{hero.ctaUnderline}</u>
            </Link>
          </div>
        </div>
        <div ref={white} aria-hidden="true" className={`absolute inset-x-0 top-(--top) z-3 text-white [clip-path:inset(100%_0_0_0)] ${title}`}>
          <Lines lines={hero.title} />
        </div>
        <a data-scroll href="#palazzo" aria-label="Scorri alla sezione successiva" className="hidden lg:flex absolute z-3 left-[calc(50%+var(--iw)/2+14px)] top-[calc(var(--top)+var(--fs)*3.4)] flex-col items-center gap-3 text-olive font-bold text-caption">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="size-6 animate-nudge motion-reduce:animate-none">
            <circle cx="12" cy="12" r="10" /><path d="M12 7v9M8 12.5l4 4 4-4" />
          </svg>
          <span className="[writing-mode:vertical-rl]">Scroll Down</span>
        </a>
      </div>
    </section>
  );
}
