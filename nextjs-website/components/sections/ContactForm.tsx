"use client";

import { useRef, useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import { fieldCls, labelCls, inputCls } from "@/components/ui/fields";
import type { ContactPage } from "@/content/types";

const sel = `${inputCls} select-arrow pr-5`;

// Contatti: info + form (prototipo come nella demo: validazione, nessun invio reale fino a Phase 9)
export default function ContactForm({ info, formTitle }: Pick<ContactPage, "info" | "formTitle">) {
  const form = useRef<HTMLFormElement>(null);
  const [bad, setBad] = useState<string[]>([]);
  const [note, setNote] = useState("Ti rispondiamo entro 24 ore.");
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const invalid = [...form.current!.querySelectorAll<HTMLInputElement>("[required]")].filter((i) => !i.checkValidity());
    setBad(invalid.map((i) => i.id));
    if (invalid.length) {
      setNote("Completa i campi obbligatori e accetta l'informativa.");
      invalid[0].focus();
      return;
    }
    setSent(true);
  };
  const cls = (id: string, base = inputCls) => `${base} ${bad.includes(id) ? "border-b-red" : ""}`;

  return (
    <section id="richiesta" className="grid grid-cols-24 gap-x-grid gap-y-10 px-gutter pt-[clamp(50px,6vw,100px)] pb-[clamp(80px,8vw,130px)]">
      <div className="col-span-full lg:col-[1/9] grid gap-[clamp(26px,3vw,40px)] content-start">
        {info.map((b) => (
          <div key={b.title} data-fade>
            <h3 className="font-display font-semibold text-micro tracking-caps uppercase text-red mb-2">{b.title}</h3>
            <p className="text-small leading-[1.4]">
              {b.href ? (
                <a href={b.href} className="bg-underline">{b.lines[0]}</a>
              ) : (
                b.lines.map((l, i) => <span key={i}>{i > 0 && <br />}{l}</span>)
              )}
            </p>
          </div>
        ))}
      </div>
      <div className="col-span-full lg:col-[11/-1]">
        <h2 data-words className="font-display font-semibold text-h5 leading-none tracking-tight text-balance text-red mb-[clamp(26px,3vw,44px)]">{formTitle}</h2>
        <form ref={form} noValidate onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-2 gap-x-[clamp(18px,2.4vw,36px)] gap-y-[clamp(22px,2.4vw,32px)]">
          {sent ? (
            <div role="status" className="col-span-full bg-ivory p-[clamp(28px,3vw,44px)]">
              <h3 className="font-display font-semibold text-h6 leading-none tracking-tight text-balance text-red mb-2.5">Grazie, abbiamo ricevuto la tua richiesta.</h3>
              <p>Ti scriveremo entro un giorno all&apos;indirizzo che ci hai indicato.</p>
            </div>
          ) : (
            <>
              <div className={fieldCls}><label className={labelCls} htmlFor="f-nome">Nome e cognome</label><input className={cls("f-nome")} id="f-nome" name="nome" required autoComplete="name" /></div>
              <div className={fieldCls}><label className={labelCls} htmlFor="f-mail">Email</label><input className={cls("f-mail")} id="f-mail" name="email" type="email" required autoComplete="email" /></div>
              <div className={fieldCls}><label className={labelCls} htmlFor="f-tel">Telefono (facoltativo)</label><input className={inputCls} id="f-tel" name="tel" type="tel" autoComplete="tel" /></div>
              <div className={fieldCls}><label className={labelCls} htmlFor="f-apt">Appartamento</label>
                <select className={sel} id="f-apt" name="apt"><option>Nessuna preferenza</option><option>Family Suite</option><option>Junior Suite</option><option>Deluxe Suite · da marzo 2027</option></select></div>
              <div className={fieldCls}><label className={labelCls} htmlFor="f-in">Arrivo</label><input className={inputCls} id="f-in" name="arrivo" type="date" /></div>
              <div className={fieldCls}><label className={labelCls} htmlFor="f-out">Partenza</label><input className={inputCls} id="f-out" name="partenza" type="date" /></div>
              <div className={fieldCls}><label className={labelCls} htmlFor="f-osp">Ospiti</label>
                <select className={sel} id="f-osp" name="ospiti" defaultValue="2">{[1, 2, 3, 4, 5, 6].map((n) => <option key={n}>{n}</option>)}</select></div>
              <div className={fieldCls}><label className={labelCls} htmlFor="f-mot">Motivo del viaggio</label>
                <select className={sel} id="f-mot" name="motivo"><option>Vacanza</option><option>Lavoro</option><option>Occasione speciale</option><option>Soggiorno lungo</option></select></div>
              <div className={`${fieldCls} col-span-full`}><label className={labelCls} htmlFor="f-msg">Messaggio</label>
                <textarea className={`${inputCls} resize-y min-h-30`} id="f-msg" name="msg" rows={4} placeholder="Raccontaci il tuo viaggio: orari di arrivo, richieste, esigenze particolari." /></div>
              <label className="col-span-full flex gap-3 items-start text-caption leading-[1.4] cursor-pointer">
                <input
                  type="checkbox"
                  required
                  id="f-priv"
                  className="appearance-none flex-[0_0_18px] size-4.5 mt-px border border-ink rounded-none grid place-items-center cursor-pointer checked:bg-olive checked:border-olive checked:after:content-[''] checked:after:w-2 checked:after:h-1 checked:after:border-ivory checked:after:border-l-[1.6px] checked:after:border-b-[1.6px] checked:after:-translate-y-px checked:after:-rotate-45"
                />{" "}
                <span>Ho letto l&apos;<a href="#top" className="underline">informativa sulla privacy</a> e acconsento al trattamento dei dati per ricevere una risposta.</span>
              </label>
              <div className="col-span-full flex justify-between items-center gap-5 flex-wrap">
                <span className="text-caption text-ink/60">{note}</span>
                <Button type="submit">Invia richiesta</Button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
