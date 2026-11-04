"use client";

import Script from "next/script";
import { useEffect } from "react";
import { BEDDY_WIDGET } from "@/content/site";

// Beddy imposta i suoi colori/font con `*{--…Customize}` dentro i propri shadow root: da fuori non si sovrascrivono,
// quindi iniettiamo questo foglio in ogni shadow root Beddy (barra + popup come il calendario, che si aprono in <body>).
// `:host *` + !important vince sul loro `*`; i token del sito arrivano per ereditarietà da <html>.
const THEME = `
:host, :host * {
  --mainColorCustomize: var(--color-olive) !important;
  --titlesCustomize: var(--color-red) !important;
  --labelCustomize: var(--color-olive) !important;
  --selectedValuesCustomize: var(--color-ink) !important;
  --buttonCustomize: var(--color-olive) !important;
  --buttonLighterCustomize: var(--color-olive-deep) !important;
  --buttonFontColorCustomize: var(--color-ivory) !important;
  --buttonColorHoverCustomize: var(--color-ivory) !important;
  --borderCustomize: var(--color-olive) !important;
  --footerMaskBgCustomize: var(--color-surface) !important;
  --fontFamilyCustomize: var(--font-bricolage), ui-sans-serif, system-ui, sans-serif !important;
}
/* angoli retti come il resto del sito */
:host *, :host *::before, :host *::after { border-radius: 0 !important; }
`;

const isBeddy = (el: Element) => /^(BY|BEDDY)-/.test(el.tagName);

function theme(root: ParentNode, observer: MutationObserver) {
  for (const el of root.querySelectorAll("*")) {
    const sr = el.shadowRoot;
    if (!sr || !isBeddy(el) || sr.querySelector("style[data-pg-theme]")) continue;
    const style = document.createElement("style");
    style.dataset.pgTheme = "";
    style.textContent = THEME;
    sr.append(style);
    observer.observe(sr, { childList: true, subtree: true });
    theme(sr, observer);
  }
}

// Barra di ricerca Beddy: al "Cerca" porta al booking engine (URL di destinazione impostato nel pannello Beddy)
export default function BookingBar() {
  useEffect(() => {
    // il root del nodo cambiato è il document o uno shadow root Beddy: lì possono comparire nuovi host
    const observer = new MutationObserver((records) =>
      new Set(records.map((r) => r.target.getRootNode() as ParentNode)).forEach((root) => theme(root, observer)),
    );
    observer.observe(document.body, { childList: true, subtree: true });
    theme(document.body, observer);
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-label="Verifica disponibilità" className="relative z-10 px-gutter pt-[clamp(140px,19vw,270px)]">
      <Script src="https://cdn.beddy.io/bol-v2/prod/beddy-bar-web-component.js" />
      <beddy-bar lang="it" widgetcode={BEDDY_WIDGET} />
    </section>
  );
}
