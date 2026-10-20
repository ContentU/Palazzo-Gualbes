import type { ReactNode } from "react";

// .meta: etichetta maiuscola; la parte in grassetto (categoria) è rossa
export default function Meta({ strong, children, className = "", fade }: { strong?: string; children?: ReactNode; className?: string; fade?: boolean }) {
  return (
    <span className={`font-display font-semibold text-micro tracking-caps uppercase ${className}`} data-fade={fade ? "" : undefined}>
      {strong && <b className="font-black text-red">{strong}</b>}
      {strong && children ? " · " : null}
      {children}
    </span>
  );
}
