import MoreLink from "@/components/ui/MoreLink";
import Accordion from "./Accordion";
import type { ContactPage } from "@/content/types";

// .arrive: titolo fisso a sinistra (desktop) e accordion
export default function Arrive({ arrive, faq }: Pick<ContactPage, "arrive" | "faq">) {
  return (
    <section className="grid grid-cols-24 gap-x-grid px-gutter items-start py-section">
      <div className="col-span-full mb-7.5 lg:col-[1/9] lg:mb-0 lg:sticky lg:top-30 grid gap-4.5">
        <h2 data-words className="font-display font-semibold text-h4 tracking-tight text-balance text-red">{arrive.title}</h2>
        <p data-fade className="max-w-[24em]">{arrive.text}</p>
        <MoreLink href={arrive.link.href} fade>{arrive.link.label}</MoreLink>
      </div>
      <Accordion items={faq} />
    </section>
  );
}
