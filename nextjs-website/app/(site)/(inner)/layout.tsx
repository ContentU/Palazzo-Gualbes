// .page-top: le pagine interne partono sotto l'header
export default function InnerLayout({ children }: { children: React.ReactNode }) {
  return <div className="pt-[calc(var(--spacing-header-sm)+28px)] lg:pt-[calc(var(--spacing-header)+clamp(24px,5vw,72px))]">{children}</div>;
}
