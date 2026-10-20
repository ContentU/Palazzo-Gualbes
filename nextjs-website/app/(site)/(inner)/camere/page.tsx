import type { Metadata } from "next";
import PageTitle from "@/components/sections/PageTitle";
import RoomBlock from "@/components/sections/RoomBlock";
import InfoBlock from "@/components/sections/InfoBlock";
import { getRooms } from "@/lib/content";

export const metadata: Metadata = { title: "Suite e appartamenti" };

export default async function Camere() {
  const page = await getRooms();
  return (
    <>
      <PageTitle title={page.title} lead={page.lead} />
      <section className="grid gap-[clamp(110px,11vw,160px)] pt-section pb-section-sm">
        {page.rooms.map((r, i) => <RoomBlock key={r.title} room={r} reverse={i % 2 === 1} />)}
      </section>
      <InfoBlock {...page.info} />
    </>
  );
}
