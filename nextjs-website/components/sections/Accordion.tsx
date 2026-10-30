"use client";

import { useState } from "react";
import { ScrollTrigger } from "@/lib/motion";
import type { ContactPage } from "@/content/types";

const line = "before:absolute before:left-0 before:top-1/2 before:w-full before:h-[1.5px] before:bg-current after:absolute after:left-0 after:top-1/2 after:w-full after:h-[1.5px] after:bg-current before:transition-transform after:transition-transform before:duration-450 after:duration-450 before:ease-out after:ease-out";

import Text from "@/components/ui/Text";

// Contatti: accordion "Come arrivare" (uno aperto alla volta)
export default function Accordion({ items }: { items: ContactPage["faq"] }) {
  const [open, setOpen] = useState(0);
  const toggle = (k: number) => {
    setOpen(open === k ? -1 : k);
    setTimeout(() => ScrollTrigger.refresh(), 600);
  };

  return (
    <div className="col-span-full lg:col-[11/-1] border-t border-ink/20">
      {items.map((it, k) => (
        <div key={it.num} className="border-b border-ink/20">
          <button
            id={`accb${k + 1}`}
            aria-expanded={open === k}
            aria-controls={`acc${k + 1}`}
            onClick={() => toggle(k)}
            className="group w-full flex items-center justify-between gap-5 py-[clamp(22px,2.4vw,32px)] text-left text-ink"
          >
            <span className="flex items-baseline gap-stack-sm font-display font-semibold text-h6 group-hover:text-red">
              <em className="not-italic font-display font-black text-micro tracking-caps text-red">{it.num}</em>
              {it.title}
            </span>
            <i aria-hidden="true" className={`relative flex-[0_0_18px] size-4.5 ${line} ${open === k ? "" : "after:rotate-90"}`} />
          </button>
          <div id={`acc${k + 1}`} role="region" aria-labelledby={`accb${k + 1}`} className={`grid transition-[grid-template-rows] duration-550 ease-in-out motion-reduce:transition-none ${open === k ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="overflow-hidden">
              <div className={`grid grid-cols-1 gap-[clamp(18px,2.4vw,36px)] pb-[clamp(28px,3vw,40px)] lg:pl-[calc(clamp(14px,2vw,28px)+2.2em)] ${it.details?.length ? "lg:grid-cols-2" : ""}`}>
                <Text className="text-small leading-[1.5] max-w-[40em]" text={it.text} />
                {!!it.details?.length && <dl className="grid gap-3.5 content-start">
                  {it.details.map((d) => (
                    <div key={d.term}>
                      <dt className="font-display font-semibold text-micro tracking-caps uppercase text-red">{d.term}</dt>
                      <dd className="mt-0.5 text-small">{d.desc}</dd>
                    </div>
                  ))}
                </dl>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
