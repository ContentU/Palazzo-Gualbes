import Link from "next/link";
import type { ReactNode } from "react";

// .more: "Scopri di più" con sottolineatura che si ritira al passaggio
const cls =
  "group/more inline-flex items-center gap-[.45em] w-fit pb-1.5 font-display font-black text-small leading-none tracking-wide uppercase bg-underline transition-[background-size] duration-500 ease-out hover:bg-[length:0_1px] hover:bg-[position:100%_100%]";

type Props = {
  href?: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  /** attributi data-* per il livello di animazione */
  fade?: boolean;
};

export default function MoreLink({ href, children, className = "", external, fade }: Props) {
  const inner = (
    <>
      {children}{" "}
      <svg aria-hidden="true" className="size-[.7em] transition-transform duration-300 ease-out group-hover/more:translate-x-[3px]">
        <use href="#chev" />
      </svg>
    </>
  );
  const p = { className: `${cls} ${className}`, "data-fade": fade ? "" : undefined };
  // dentro le card l'intera scheda è già un link
  if (!href) return <span {...p}>{inner}</span>;
  if (external) return <a href={href} target="_blank" rel="noopener" {...p}>{inner}</a>;
  if (!href.startsWith("/")) return <a href={href} {...p}>{inner}</a>;
  return <Link href={href} {...p}>{inner}</Link>;
}
