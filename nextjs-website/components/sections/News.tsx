"use client";

import { useState } from "react";
import Photo from "@/components/ui/Photo";
import MoreLink from "@/components/ui/MoreLink";
import type { HomePage } from "@/content/types";

// News: slider a puntini; la foto nuova entra da destra sopra la precedente
export default function News({ title, lead, posts }: HomePage["news"]) {
  const [cur, setCur] = useState(0);
  const [was, setWas] = useState(-1);
  const go = (k: number) => { if (k === cur) return; setWas(cur); setCur(k); };

  return (
    <section id="journal" className="pt-[clamp(80px,7.6vw,110px)] pb-[clamp(80px,7vw,100px)]">
      <div className="px-[clamp(20px,10vw,137px)]">
        <h2 data-words className="font-display font-semibold text-h4 leading-none tracking-tight text-balance text-red">{title}</h2>
        <p className="mt-3.5 max-w-[46em]">{lead}</p>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,.42fr)_minmax(0,.58fr)] gap-[clamp(24px,4.2vw,58px)] mt-[clamp(40px,5vw,72px)] items-start">
          <div aria-live="polite" className="relative min-h-55 mt-2.5 lg:min-h-[clamp(200px,22vw,300px)] lg:mt-[clamp(30px,10vw,140px)]">
            {posts.map((p, k) => (
              <div
                key={k}
                className={`absolute inset-x-0 top-0 grid gap-[clamp(18px,2.2vw,30px)] [transition:opacity_.45s_ease,translate_.6s_var(--ease-out),filter_.45s_ease] motion-reduce:transition-none ${
                  k === cur ? "opacity-100" : "opacity-0 translate-y-3 blur-[4px] pointer-events-none"
                }`}
              >
                <h3 className="font-display font-semibold text-h5 leading-none tracking-tight text-balance text-red">{p.title}</h3>
                <MoreLink href={p.href}>Scopri di più</MoreLink>
              </div>
            ))}
          </div>
          <div>
            <div className="relative aspect-landscape">
              {posts.map((p, k) => (
                <div
                  key={k}
                  className={`absolute inset-0 transition-[clip-path] duration-900 ease-in-out motion-reduce:transition-none ${
                    k === cur ? "[clip-path:inset(0)] z-2" : k === was ? "[clip-path:inset(0)] z-1" : "[clip-path:inset(0_0_0_100%)]"
                  }`}
                >
                  <Photo {...p.image} sizes="(min-width: 901px) 50vw, 100vw" className="absolute! inset-0" />
                </div>
              ))}
            </div>
            <p className="mt-2.5 text-caption font-semibold">{posts[cur].meta}</p>
          </div>
        </div>
        <div role="tablist" aria-label="Articoli" className="flex justify-center gap-1 mt-[clamp(36px,4vw,56px)]">
          {posts.map((_, k) => (
            <button
              key={k}
              role="tab"
              aria-label={`Articolo ${k + 1}`}
              aria-current={k === cur}
              onClick={() => go(k)}
              className="group w-11 h-7 grid place-items-center before:size-1.5 before:rounded-full before:bg-ink before:opacity-22 before:transition-[opacity,scale] before:duration-300 aria-[current=true]:before:opacity-100 aria-[current=true]:before:scale-130"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
