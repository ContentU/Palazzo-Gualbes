"use client";

import { useEffect, useRef, useState } from "react";
import Photo from "@/components/ui/Photo";
import { reduceMotion } from "@/lib/motion";
import type { Img } from "@/content/types";

// Ritmo delle foto: .g1 / .g2 / .g3
const SIZES = [
  "w-[clamp(220px,31.5vw,431px)] aspect-portrait",
  "w-[clamp(140px,18vw,247px)] aspect-portrait mt-[clamp(20px,3.3vw,45px)]",
  "w-[clamp(220px,29.9vw,408px)] aspect-square mt-[clamp(14px,2.2vw,30px)]",
];
const pad = (n: number) => String(n).padStart(2, "0");
const sqb =
  "size-12 border border-olive text-olive grid place-items-center transition-[background-color,color,transform] duration-200 active:scale-95 disabled:opacity-30 disabled:cursor-default not-disabled:hover:bg-olive not-disabled:hover:text-ivory";

// Galleria scheda suite: trascinamento con inerzia, frecce, contatore, tastiera
export default function Gallery({ images }: { images: Img[] }) {
  const gt = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ k: 0, p: 0, atStart: true, atEnd: false });
  const [drag, setDrag] = useState(false);
  const n = images.length;

  const update = () => {
    const t = gt.current!, items = [...t.children] as HTMLElement[];
    const max = t.scrollWidth - t.clientWidth, p = max > 0 ? t.scrollLeft / max : 0;
    let k = 0;
    items.forEach((it, i) => { if (it.offsetLeft - t.offsetLeft <= t.scrollLeft + 2 + 40) k = i; });
    if (p > 0.98) k = n - 1;
    setState({ k, p, atStart: t.scrollLeft < 4, atEnd: t.scrollLeft > max - 4 });
  };

  const step = (dir: number) => {
    const t = gt.current!, items = [...t.children] as HTMLElement[], x = t.scrollLeft;
    const pos = items.map((it) => it.offsetLeft - items[0].offsetLeft);
    let target = dir > 0 ? pos.find((v) => v > x + 8) : [...pos].reverse().find((v) => v < x - 8);
    if (target == null) target = dir > 0 ? t.scrollWidth : 0;
    t.scrollTo({ left: target, behavior: reduceMotion() ? "auto" : "smooth" });
  };

  useEffect(() => {
    const t = gt.current!;
    let down = false, sx = 0, sl = 0, moved = 0, vx = 0, lastX = 0, lastT = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true; moved = 0; sx = lastX = e.clientX; sl = t.scrollLeft; lastT = performance.now(); t.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - sx;
      moved = Math.max(moved, Math.abs(dx));
      if (moved > 4) setDrag(true);
      t.scrollLeft = sl - dx;
      const now = performance.now();
      vx = (e.clientX - lastX) / Math.max(1, now - lastT); lastX = e.clientX; lastT = now;
    };
    const onUp = () => {
      if (!down) return;
      down = false; setDrag(false);
      if (Math.abs(vx) > 0.3) t.scrollBy({ left: -vx * 320, behavior: "smooth" });
      vx = 0;
    };
    t.addEventListener("pointerdown", onDown);
    t.addEventListener("pointermove", onMove);
    t.addEventListener("pointerup", onUp);
    t.addEventListener("pointercancel", onUp);
    addEventListener("resize", update);
    update();
    return () => {
      t.removeEventListener("pointerdown", onDown);
      t.removeEventListener("pointermove", onMove);
      t.removeEventListener("pointerup", onUp);
      t.removeEventListener("pointercancel", onUp);
      removeEventListener("resize", update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative mt-[clamp(70px,6vw,90px)]" aria-roledescription="galleria" aria-label="Foto della suite">
      <div
        ref={gt}
        data-lenis-prevent
        tabIndex={0}
        onScroll={update}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
        }}
        className={`flex items-start gap-stack-lg overflow-x-auto overscroll-x-contain [scrollbar-width:none] px-gutter ${
          drag ? "cursor-grabbing snap-none *:pointer-events-none" : "cursor-grab snap-x snap-proximity"
        }`}
      >
        {images.map((img, i) => (
          <div key={i} role="group" aria-roledescription="foto" aria-label={`Foto ${i + 1} di ${n}`} className={`flex-none snap-start select-none ${SIZES[i % 3]}`}>
            <Photo {...img} sizes="32vw" className="size-full" />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-6 px-gutter mt-[clamp(28px,3vw,40px)] text-caption font-semibold tabular-nums">
        <span>{pad(state.k + 1)} / {pad(n)}</span>
        <div className="flex-1 h-px bg-line overflow-hidden">
          <i className="block size-full bg-ink origin-left transition-transform duration-300 ease-out" style={{ transform: `scaleX(${Math.max(0.08, state.p)})` }} />
        </div>
        <div className="flex gap-2">
          <button className={sqb} aria-label="Foto precedente" disabled={state.atStart} onClick={() => step(-1)}>
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true"><path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
          </button>
          <button className={sqb} aria-label="Foto successiva" disabled={state.atEnd} onClick={() => step(1)}>
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
