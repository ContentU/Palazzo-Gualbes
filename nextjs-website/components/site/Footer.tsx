import Link from "next/link";
import Image from "next/image";
import type { SiteSettings } from "@/content/types";

const u = "transition-colors hover:text-red";

function FLink({ href, children }: { href: string; children: string }) {
  return href.startsWith("/") ? <Link className={u} href={href}>{children}</Link> : <a className={u} href={href}>{children}</a>;
}

const icons: Record<string, React.ReactNode> = {
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-[38%]" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-[38%]" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z" />
    </svg>
  ),
};

const h3 = "font-display font-black text-body text-logo mb-2";

export default function Footer({ site }: { site: SiteSettings }) {
  return (
    <footer className="px-edge pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-[clamp(0px,.9vw,12px)] pb-[clamp(28px,2.6vw,36px)] border-b border-logo">
        <div>
          <h3 className={h3}><Link href="/contatti">Contatti</Link></h3>
          <ul className="text-caption"><li>{site.email}</li><li>{site.phone.label}</li></ul>
        </div>
        <div>
          <h3 className={h3}>Indirizzo</h3>
          <ul className="text-caption"><li>{site.street}</li><li>{site.city}</li></ul>
        </div>
        <div>
          <h3 className={h3}>Seguici</h3>
          <ul className="text-caption">{site.social.map((s) => <li key={s.label}>{s.label}</li>)}</ul>
        </div>
      </div>
      <div className="grid grid-cols-1 justify-items-start lg:grid-cols-[1fr_auto_1fr] lg:justify-items-stretch items-center gap-6 pt-stack-xl pb-[clamp(28px,3vw,40px)]">
        <ul className="grid gap-[clamp(8px,1.4vw,22px)] text-small">
          {site.footerLinks.map((l) => <li key={l.label}><FLink href={l.href}>{l.label}</FLink></li>)}
        </ul>
        <div className="flex flex-col items-start lg:flex-row lg:items-center gap-[clamp(18px,3vw,40px)]">
          <Image src="/logo-stacked.svg" alt="Palazzo Gualbes Design Apartments" width={470} height={238} className="w-[clamp(180px,22vw,300px)] h-auto" />
          <div className="flex gap-4.5">
            {site.social.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="w-[clamp(48px,6.3vw,86px)] aspect-square rounded-full bg-surface grid place-items-center text-logo transition-[background-color,color,transform] duration-200 active:scale-95 hover:bg-logo hover:text-ivory">
                {icons[s.label]}
              </a>
            ))}
          </div>
        </div>
        <ul className="justify-self-start text-left lg:justify-self-end lg:text-right self-end grid gap-3 text-caption text-logo">
          {site.legalLinks.map((l) => <li key={l.label}><FLink href={l.href}>{l.label}</FLink></li>)}
        </ul>
      </div>
      <div className="flex justify-between gap-4 flex-wrap text-caption pt-7 pb-[calc(28px+env(safe-area-inset-bottom,0px))] border-t border-line">
        <span>{site.copyright}</span><span>{site.credits}</span>
      </div>
    </footer>
  );
}
