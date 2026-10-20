import Image from "next/image";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import type { Room } from "@/content/types";

const BIG = "lg:aspect-auto lg:h-[min(78vh,760px)]";
const SMALL = "lg:aspect-auto lg:h-[calc(min(78vh,760px)*.36)]";

// .room / .room--r: blocco camera, alternato a destra e sinistra
export default function RoomBlock({ room, reverse }: { room: Room; reverse?: boolean }) {
  return (
    <article className="grid grid-cols-24 gap-x-grid px-gutter items-start">
      <div className={`col-span-full row-1 grid gap-[clamp(12px,1.2vw,18px)] content-start justify-items-start lg:pt-[1vw] ${reverse ? "lg:col-[17/-1] lg:text-right lg:justify-items-end" : "lg:col-[1/9]"}`}>
        <h2 data-words className="font-display font-semibold text-h4 tracking-tight text-balance text-red">{room.title}</h2>
        <p data-fade className="text-small leading-[1.3]">{room.specs.map((l, i) => <span key={i}>{i > 0 && <br />}{l}</span>)}</p>
        {room.soon && <p data-fade className="text-caption font-semibold text-olive">{room.soon}</p>}
        <span data-fade className="mt-stack-sm"><Button variant="line" href={room.cta.href}>{room.cta.label}</Button></span>
      </div>
      <Photo {...room.big} ratio={`aspect-portrait-soft ${BIG}`} par={8} reveal sizes="(min-width: 901px) 62vw, 100vw" className={`col-span-full row-2 mt-7 lg:mt-0 lg:row-[1/3] ${reverse ? "lg:col-[1/16]" : "lg:col-[10/-1]"}`} />
      <Photo {...room.small} ratio={`aspect-square ${SMALL}`} par={-14} reveal sizes="(min-width: 901px) 21vw, 42vw" className={`col-[1/11] row-3 mt-4 lg:mt-0 lg:row-2 lg:self-end ${reverse ? "lg:col-[20/-1]" : "lg:col-[1/6]"}`} />
      <Image data-rot src="/images/fiore-rosso.webp" alt="" width={600} height={600} className={`col-[13/19] row-3 self-end w-full max-w-[150px] h-auto aspect-square object-contain -mb-[2%] lg:row-2 ${reverse ? "lg:col-[16/19]" : "lg:col-[7/10]"}`} />
    </article>
  );
}
