import Text from "@/components/ui/Text";

// .ch / .jh: titolo di pagina con sottotitolo oliva
export default function PageTitle({ title, lead, className = "" }: { title: string; lead: string; className?: string }) {
  return (
    <section className={`grid grid-cols-24 gap-x-grid px-gutter ${className}`}>
      <h1 data-words className="col-span-full lg:col-[1/19] row-1 font-display font-extrabold text-h2 leading-none tracking-tight text-balance text-red">{title}</h1>
      <Text data-fade className="col-span-full lg:col-[1/11] row-2 justify-self-start mt-[clamp(20px,2.4vw,34px)] max-w-[30em] text-olive" text={lead} />
    </section>
  );
}
