import type { Metadata } from "next";
import PageTitle from "@/components/sections/PageTitle";
import ContactForm from "@/components/sections/ContactForm";
import MapBlock from "@/components/sections/MapBlock";
import Arrive from "@/components/sections/Arrive";
import { getContact } from "@/lib/content";

export const metadata: Metadata = { title: "Contatti" };

export default async function Contatti() {
  const page = await getContact();
  return (
    <>
      <PageTitle title={page.title} lead={page.lead} />
      <ContactForm info={page.info} formTitle={page.formTitle} />
      <MapBlock {...page.map} />
      <Arrive arrive={page.arrive} faq={page.faq} />
    </>
  );
}
