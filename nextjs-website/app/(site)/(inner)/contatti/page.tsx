import type { Metadata } from "next";
import PageTitle from "@/components/sections/PageTitle";
import ContactForm from "@/components/sections/ContactForm";
import Arrive from "@/components/sections/Arrive";
import { getContact, getSuites, seoMeta } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return seoMeta((await getContact()).seo, "Contatti");
}

export default async function Contatti() {
  const [page, suites] = await Promise.all([getContact(), getSuites()]);
  return (
    <>
      <PageTitle title={page.title} lead={page.lead} />
      <ContactForm info={page.info} formTitle={page.formTitle} formText={page.formText} apartments={suites.map((s) => s.title)} />
      <Arrive arrive={page.arrive} faq={page.faq} />
    </>
  );
}
