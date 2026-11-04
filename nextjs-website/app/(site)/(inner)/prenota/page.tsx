import type { Metadata } from "next";
import Script from "next/script";
import { BEDDY_WIDGET } from "@/content/site";

export const metadata: Metadata = { title: "Prenota" };

export default function Prenota() {
  return (
    <section className="px-gutter pb-section-lg min-h-[70vh]">
      <Script src="https://cdn.beddy.io/bol/prod/beddybe.js" />
      <beddy-booking-engine lang="it" widgetcode={BEDDY_WIDGET} />
    </section>
  );
}
