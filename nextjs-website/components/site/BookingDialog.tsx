"use client";

import { useEffect, useRef, useState } from "react";
import { BOOKING_HREF } from "@/content/site";

const BEDDY_ORIGIN = new URL(BOOKING_HREF).origin;

// I pulsanti "Prenota" sono normali link al booking engine Beddy (senza JS aprono la pagina Beddy):
// qui intercettiamo il clic e apriamo il motore in una finestra sul sito, come fa la barra Beddy.
export default function BookingDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // nuova scheda: lasciamo fare al browser
      const a = (e.target as Element).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || !a.href.startsWith(BEDDY_ORIGIN)) return;
      e.preventDefault();
      setSrc(a.href);
      dialog.current?.showModal();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <dialog
      ref={dialog}
      aria-label="Prenota il tuo soggiorno"
      onClose={() => setSrc(null)}
      className="m-0 size-full max-h-none max-w-none bg-white p-0 backdrop:bg-ink/60"
    >
      {src && <iframe src={src} title="Booking engine Palazzo Gualbes" className="block size-full border-0" />}
      <button
        autoFocus
        aria-label="Chiudi la prenotazione"
        onClick={() => dialog.current?.close()}
        className="group absolute top-0 right-4 size-11 grid place-items-center bg-olive text-ivory hover:bg-olive-deep transition-colors"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 transition-transform duration-300 ease-out group-hover:rotate-90">
          <path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
    </dialog>
  );
}
