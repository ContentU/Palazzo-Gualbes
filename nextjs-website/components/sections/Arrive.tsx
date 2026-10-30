import Text from "@/components/ui/Text";
import MoreLink from "@/components/ui/MoreLink";
import Accordion from "./Accordion";
import type { ContactPage } from "@/content/types";

// .arrive: titolo fisso a sinistra (desktop), accordion e appendice facoltativa sotto
export default function Arrive({ arrive, faq }: Pick<ContactPage, "arrive" | "faq">) {
  return (
    <section className="grid grid-cols-24 gap-x-grid px-gutter items-start py-section">
      <div className="col-span-full mb-7.5 lg:col-[1/9] lg:mb-0 lg:sticky lg:top-30 grid gap-4.5">
        <h2 data-words className="font-display font-semibold text-h4 tracking-tight text-balance text-red">{arrive.title}</h2>
        <Text data-fade className="max-w-[24em]" text={arrive.text} />
        <MoreLink href={arrive.link.href} fade>{arrive.link.label}</MoreLink>
      </div>
      <Accordion items={faq} />
      {arrive.note && (
        <div data-fade className="col-span-full lg:col-[11/-1] mt-[clamp(28px,3vw,40px)]">
          <h3 className="font-display font-semibold text-micro tracking-caps uppercase text-red mb-2">{arrive.note.title}</h3>
          <Text className="text-small leading-[1.5] max-w-[40em]" text={arrive.note.text} />
        </div>
      )}
    </section>
  );
}
