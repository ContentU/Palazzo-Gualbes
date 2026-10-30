import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & { text?: string; "data-fade"?: boolean };

// Testo da Sanity: ogni a capo diventa un nuovo paragrafo (stesse classi e attributi del <p> singolo)
export default function Text({ text, className = "", ...rest }: Props) {
  const paras = (text ?? "").split(/\n+/).map((s) => s.trim()).filter(Boolean);
  if (!paras.length) return null;
  if (paras.length === 1) return <p className={className} {...rest}>{paras[0]}</p>;
  return (
    <div className={`${className} [&>p+p]:mt-[.9em]`} {...rest}>
      {paras.map((p, i) => <p key={i}>{p}</p>)}
    </div>
  );
}
