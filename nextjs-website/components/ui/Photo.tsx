import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** classe aspect-* (anche con prefissi lg:) */
  ratio?: string;
  warm?: boolean;
  par?: number;
  reveal?: boolean;
  px?: boolean;
  sizes: string;
  priority?: boolean;
  className?: string;
  id?: string;
  /** classi extra per l'<img> (posizione, zoom al passaggio) */
  imgClass?: string;
};

// Foto con segnaposto a grana (.ph / .ph__in della demo)
export default function Photo({ src, alt, ratio = "", warm, par, reveal, px, sizes, priority, className = "", id, imgClass = "" }: Props) {
  return (
    <div
      id={id}
      className={`relative max-w-full overflow-hidden bg-placeholder ${ratio} ${className}`}
      data-par={par}
      data-reveal={reveal ? "" : undefined}
      data-px={px ? "" : undefined}
    >
      <div data-ph-in className={`absolute -inset-[10%] will-change-transform ${warm ? "grain-warm" : "grain"}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${imgClass}`} />
      </div>
    </div>
  );
}
