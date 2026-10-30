import Text from "@/components/ui/Text";
import Image from "next/image";
import type { Suite } from "@/content/types";

// .stay: "Il tuo soggiorno", tre righe di dotazioni con conchiglia sullo sfondo
export default function Stay({ title, features }: Suite["stay"]) {
  return (
    <section id="soggiorno" className="relative overflow-hidden pt-[clamp(90px,8vw,120px)] pb-section">
      <div data-drift="8" className="absolute left-1/2 top-[30%] w-[min(110vw,1500px)] -translate-x-1/2 opacity-60 pointer-events-none">
        <Image src="/images/conchiglia-panna.webp" alt="" width={600} height={600} className="w-full h-auto" />
      </div>
      {title && (
        <div className="relative text-right pl-gutter pr-[calc(var(--spacing-gutter)+4vw)] mb-[clamp(30px,3vw,46px)]">
          <h2 data-words className="font-display font-extrabold text-h3 leading-none tracking-tight text-balance text-red">{title}</h2>
        </div>
      )}
      {features.map((f) => (
        <div key={f.label} className="relative grid grid-cols-24 gap-x-grid px-gutter items-start pt-[clamp(24px,3vw,40px)] pb-[clamp(60px,6.5vw,90px)]">
          <h3 className="col-span-full lg:col-[4/11] flex items-center gap-3 text-red font-display font-semibold text-small uppercase tracking-[.01em]">
            <Image src="/images/rosone.svg" alt="" width={26} height={26} className="w-[clamp(20px,1.8vw,26px)] h-auto" />
            {f.label}
          </h3>
          <div className="col-span-full mt-4 lg:col-[11/21] lg:mt-0 grid gap-[clamp(20px,2.4vw,34px)]">
            <Text data-fade text={f.text} />
            <ul data-fade className="pl-[1.2em] grid gap-0.5 list-disc marker:text-red">
              {f.items.map((it) => <li key={it}>{it}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
}
