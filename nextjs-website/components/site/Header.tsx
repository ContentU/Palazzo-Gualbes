"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import Button from "@/components/ui/Button";
import Menu from "./Menu";
import type { SiteSettings } from "@/content/types";

export default function Header({ site }: { site: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  // Menu: Lenis fermo e focus sul pulsante giusto (blocco "Menu" della demo)
  const setMenu = (o: boolean) => {
    setOpen(o);
    if (o) lenis?.stop();
    else lenis?.start();
    (o ? close : burger).current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenu(false); };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  });

  // Header: si nasconde scendendo oltre 240px, torna risalendo
  useEffect(() => {
    let lastY = scrollY;
    const onScroll = () => {
      const y = scrollY;
      if (Math.abs(y - lastY) < 4) return;
      setHidden(y > 240 && y > lastY);
      lastY = y;
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 bg-white pt-[env(safe-area-inset-top,0px)] transition-transform duration-500 ease-out ${hidden ? "-translate-y-full" : ""}`}>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-header-sm pl-3 pr-4 lg:h-header lg:px-edge">
          <button
            ref={burger}
            className="group justify-self-start size-11 grid content-center gap-1.5 text-olive"
            aria-expanded={open}
            aria-controls="menu"
            aria-label="Apri il menu"
            onClick={() => setMenu(true)}
          >
            {[0, 1, 2].map((i) => (
              <i key={i} className={`block w-6 h-0.5 bg-current transition-transform duration-300 ease-out ${i === 1 ? "group-hover:translate-x-[5px]" : ""}`} />
            ))}
          </button>
          <Link href="/" aria-label="Palazzo Gualbes, torna all'inizio">
            <Image src="/logo.svg" alt="Palazzo Gualbes Design Apartments" width={274} height={49} priority className="h-[26px] lg:h-[clamp(30px,3.6vw,49px)] w-auto" />
          </Link>
          <div className="justify-self-end flex items-center gap-[clamp(12px,3vw,40px)]">
            <span className="hidden lg:inline font-semibold text-small text-olive">Italiano</span>
            <Button variant="header" href={site.bookHref}>Prenota</Button>
          </div>
        </div>
      </header>
      <Menu site={site} open={open} closeRef={close} onClose={() => setMenu(false)} />
    </>
  );
}
