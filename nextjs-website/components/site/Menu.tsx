"use client";

import Link from "next/link";
import Image from "next/image";
import type { RefObject } from "react";
import Button from "@/components/ui/Button";
import type { SiteSettings } from "@/content/types";

type Props = { site: SiteSettings; open: boolean; closeRef: RefObject<HTMLButtonElement | null>; onClose: () => void };

const info = "inline bg-underline bg-[length:0_1px] transition-[background-size] duration-400 ease-out hover:bg-[length:100%_1px]";
const label = "block font-display font-semibold text-micro tracking-caps uppercase opacity-70 mb-0.5";

export default function Menu({ site, open, closeRef, onClose }: Props) {
  return (
    <nav
      id="menu"
      aria-label="Menu principale"
      className={`fixed inset-0 z-60 bg-white grid grid-cols-1 grid-rows-[1fr_auto] lg:grid-cols-[minmax(0,1fr)_minmax(0,.8fr)] lg:grid-rows-1 motion-reduce:transition-none ${
        open
          ? "visible [clip-path:inset(0)] [transition:clip-path_.8s_var(--ease-in-out),visibility_0s]"
          : "invisible [clip-path:inset(0_0_100%_0)] [transition:clip-path_.8s_var(--ease-in-out),visibility_0s_.8s]"
      }`}
    >
      <div className="relative grid content-center px-edge">
        <button
          ref={closeRef}
          className="group absolute top-[calc(28px+env(safe-area-inset-top,0px))] left-edge size-11 grid place-items-center text-olive"
          aria-label="Chiudi il menu"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6.5 transition-transform duration-300 ease-out group-hover:rotate-90">
            <path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
        <ul className="group/list grid gap-[.35em] font-display font-extrabold leading-none tracking-tight text-balance">
          {site.menu.map((l, i) => (
            <li key={l.href} className="overflow-hidden">
              <Link
                href={l.href}
                onClick={onClose}
                style={{ transitionDelay: open ? `${0.22 + i * 0.05}s` : undefined }}
                className={`inline-block text-h4 leading-[1.3] text-red [transition:transform_.9s_var(--ease-out),opacity_.25s_ease] group-hover/list:opacity-35 hover:opacity-100! motion-reduce:translate-none motion-reduce:transition-none ${open ? "" : "translate-y-[110%]"}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative bg-red overflow-hidden min-h-0">
        <Image src="/images/conchiglia-panna.webp" alt="" width={600} height={600} className="hidden lg:block absolute left-1/2 top-[44%] w-[58%] -translate-1/2 opacity-95" />
        <div
          className={`flex flex-col items-start gap-6 pt-7 px-edge pb-[calc(28px+env(safe-area-inset-bottom,0px))] text-white lg:absolute lg:inset-x-[clamp(28px,4vw,64px)] lg:bottom-[clamp(28px,4.4vw,64px)] lg:flex-row lg:items-end lg:justify-between lg:p-0 [transition:opacity_.5s_ease,transform_.8s_var(--ease-out)] motion-reduce:transition-none ${
            open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3.5"
          }`}
          style={{ transitionDelay: open ? ".45s" : undefined }}
        >
          <ul className="grid gap-3 text-caption">
            <li><span className={label}>Indirizzo</span>{site.street} · {site.city}</li>
            <li><span className={label}>Telefono</span><a className={info} href={site.phone.href}>{site.phone.label}</a></li>
            <li><span className={label}>Email</span><a className={info} href={`mailto:${site.email}`}>{site.email}</a></li>
          </ul>
          <Button href={site.bookHref} onClick={onClose} className="flex-none">Prenota</Button>
        </div>
      </div>
    </nav>
  );
}
