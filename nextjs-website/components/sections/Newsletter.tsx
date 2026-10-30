"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { fieldCls, labelCls, inputCls } from "@/components/ui/fields";
import type { NewsletterData } from "@/content/types";

// .nl: iscrizione (prototipo: nessun invio, il pulsante diventa "Iscritto")
export default function Newsletter({ title, text, label, placeholder, button, done }: NewsletterData) {
  const [sent, setSent] = useState(false);
  return (
    <section className="bg-ivory py-section-sm px-gutter grid grid-cols-1 lg:grid-cols-2 gap-[clamp(30px,5vw,80px)] items-end">
      <div>
        <h2 data-words className="font-display font-semibold text-h5 leading-none tracking-tight text-balance text-red">{title}</h2>
        <p data-fade className="mt-4 max-w-[30em]">{text}</p>
      </div>
      <form className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-end" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        <div className={`${fieldCls} flex-1`}>
          <label htmlFor="nlMail" className={labelCls}>{label}</label>
          <input className={inputCls} id="nlMail" type="email" required placeholder={placeholder} autoComplete="email" />
        </div>
        <Button type="submit">{sent ? done : button}</Button>
      </form>
    </section>
  );
}
