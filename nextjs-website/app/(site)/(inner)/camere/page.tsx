import type { Metadata } from "next";
import PageTitle from "@/components/sections/PageTitle";
import Leaves from "@/components/sections/Leaves";
import RoomBlock from "@/components/sections/RoomBlock";
import { getRooms, seoMeta } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return seoMeta((await getRooms()).seo, "Suite e appartamenti");
}

export default async function Camere() {
  const page = await getRooms();
  return (
    <>
      <PageTitle title={page.title} lead={page.lead} />
      <div className="pt-section">
        <Leaves {...page.intro} />
      </div>
      <section className="grid gap-[clamp(110px,11vw,160px)] pt-section pb-section">
        {page.rooms.map((r, i) => <RoomBlock key={r.title} room={r} reverse={i % 2 === 1} />)}
      </section>
    </>
  );
}
