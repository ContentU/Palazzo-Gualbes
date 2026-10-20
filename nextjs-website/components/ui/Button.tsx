import Link from "next/link";
import type { ComponentProps } from "react";

const base =
  "inline-flex items-center justify-center font-display font-black tracking-wide uppercase whitespace-nowrap transition-[background-color,color,transform] duration-200 ease-out active:scale-[.97]";

const variants = {
  // .btn (desktop) + override mobile della demo
  primary: "h-11 px-4.5 lg:h-btn lg:min-w-btn-min lg:px-6.5 bg-olive text-ivory text-small hover:bg-olive-deep",
  // .hdr .btn: più compatto su mobile
  header: "h-10 px-3.5 text-caption lg:h-btn lg:min-w-btn-min lg:px-6.5 lg:text-small bg-olive text-ivory hover:bg-olive-deep",
  // .btn--line
  line: "h-btn-sm px-4 border border-olive text-olive bg-transparent text-micro hover:bg-olive hover:text-ivory",
};

type Props = { variant?: keyof typeof variants; className?: string } & (
  | ({ href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">)
  | ({ href?: undefined } & Omit<ComponentProps<"button">, "className">)
);

export default function Button({ variant = "primary", className = "", ...props }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (props.href !== undefined) return <Link {...props} className={cls} />;
  return <button {...(props as ComponentProps<"button">)} className={cls} />;
}
