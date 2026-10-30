import type { HomePage } from "@/content/types";

// .rec: riconoscimenti; nascosto finché non ci sono loghi documentati
export default function Recommended({ title, logos }: HomePage["recommended"]) {
  if (!logos?.length) return null;
  return (
    <section className="bg-ivory pt-[clamp(60px,5.3vw,74px)] pb-[clamp(80px,9.5vw,130px)]">
      <div className="px-[clamp(20px,10.4vw,143px)]">
        <h2 className="font-display font-extrabold text-h5 leading-none tracking-tight text-balance text-olive">{title}</h2>
        <div className="grid grid-cols-[repeat(2,minmax(0,140px))] lg:grid-cols-[repeat(4,minmax(0,178px))] gap-[clamp(14px,2.2vw,30px)] mt-[clamp(36px,4.4vw,60px)]">
          {logos.map((l, i) => (
            <div key={i} className="aspect-square rounded-full bg-white/75 grid place-items-center text-micro font-semibold text-ink/40">{l}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
