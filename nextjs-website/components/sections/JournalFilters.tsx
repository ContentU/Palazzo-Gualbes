"use client";

import { useRef, useState } from "react";
import ArticleCard from "./ArticleCard";
import { gridCls } from "./ArticleGrid";
import { gsap, ScrollTrigger, reduceMotion } from "@/lib/motion";
import type { Article, Category } from "@/content/types";

const btn =
  "font-display font-black text-micro tracking-[.06em] uppercase text-ink/45 py-2 bg-underline bg-[length:0_1px] transition-[color,background-size] duration-450 ease-out hover:text-ink aria-pressed:text-ink aria-pressed:bg-[length:100%_1px]";

// Journal: filtri per categoria (aria-pressed) sopra l'articolo in evidenza e la griglia
export default function JournalFilters({ categories, articles, featured }: { categories: Category[]; articles: Article[]; featured: React.ReactNode }) {
  const [f, setF] = useState("all");
  const grid = useRef<HTMLElement>(null);
  const cat = (slug: string) => categories.find((c) => c.slug === slug)?.title ?? slug;

  const choose = (v: string) => {
    setF(v);
    // dopo il render: entrata delle card rimaste, poi ricalcolo degli scroll trigger
    requestAnimationFrame(() => {
      const cards = grid.current!.querySelectorAll("[data-card]:not(.hidden)");
      if (!reduceMotion()) gsap.fromTo(cards, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out", clearProps: "all" });
      ScrollTrigger.refresh();
    });
  };

  return (
    <>
      <div role="group" aria-label="Filtra per categoria" className="flex flex-wrap gap-[clamp(18px,2.6vw,40px)] mx-gutter pb-4.5 border-b border-ink/16">
        {[{ slug: "all", title: "Tutti" }, ...categories].map((c) => (
          <button key={c.slug} type="button" aria-pressed={f === c.slug} onClick={() => choose(c.slug)} className={btn}>{c.title}</button>
        ))}
      </div>
      {featured}
      <section ref={grid} className={`${gridCls} px-gutter pb-[clamp(90px,9vw,140px)]`}>
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} category={cat(a.category)} hidden={f !== "all" && a.category !== f} filtered={f !== "all"} />
        ))}
      </section>
    </>
  );
}
