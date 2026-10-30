// Verifica che i testi di un PDF di copywriting siano presenti nel sito (content/, components/, app/).
//
// Uso (dalla cartella nextjs-website):
//   npm run verifica-testi -- "../Testi/Palazzo Gualbes — Testi sito web — V1.pdf"
//   (oppure: node scripts/verifica-testi-pdf.mjs "<file.pdf>" …)
// Opzioni:
//   --inverso   elenca anche i testi di content/ che NON sono nel PDF (es. testi demo rimasti)
//   --tutti     mostra anche le frasi trovate, non solo quelle mancanti
//
// Richiede pdfjs-dist (una volta sola: npm i -D pdfjs-dist).
// Esce con codice 1 se qualche frase del PDF manca, così si può usare anche in CI.
//
// Come funziona: il PDF viene diviso in paragrafi, tolte le etichette ("H2 —", "CTA:", "Card 1 —"…)
// e spezzato in frasi; ogni frase (normalizzata: maiuscole, apostrofi, trattini, spazi) deve comparire
// in uno dei testi del sito. Le parti di sole istruzioni per lo sviluppatore si escludono con le regole qui sotto:
// adattale se un nuovo PDF ha una struttura diversa.

import { readFile, readdir } from "node:fs/promises";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// ───────────── Regole (adattabili a un nuovo PDF) ─────────────

/** Inizio di una sezione numerata ("01 — IL PALAZZO"): il testo prima della prima sezione viene ignorato */
const SECTION = /^\d{2} — /;
/** Titoli (in maiuscolo) di parti di sole istruzioni: ignorate fino al titolo successivo */
const SKIP_HEADINGS = [
  /^NOTA STORICA/, /^\d{2} — APPARTAMENTO/, /^\d{2} — CONTROLLO FINALE/,
  /^ISTRUZIONI DI INTEGRAZIONE/, /^TEAM WEB/, /^NOTE TECNICHE/,
];
/** Paragrafi di istruzioni o note (inizio del paragrafo) */
const SKIP_PARAGRAPHS = [
  /^Nota\b/i, /^NOTE TECNICHE/, /^Stato:/, /^DA COMPLETARE/, /^Layout aggiuntivo/, /^Campi:/, /^Recommended by:/,
  /^Fonte esclusiva/, /^Prima redazione/, /^La pagina “Il Palazzo”/, /^Il brief non contiene/, /^Anteprima articolo/,
  /^Card: usare/, /^Privacy e Cookie/, /^Nome provvisorio/, /^Card Appartamento/, /^Slug proposto/, /^Accessibilità:$/,
  /^━/,
];
/** Etichette davanti ai testi ("H2 — …", "CTA: …"): non vengono cercate nel sito */
const LABEL = /^(H[1-6]|Titolo|Intro|CTA( unica del blocco)?|Card( \d+| [A-Z][\p{L} ]*)?|Dati|Hero|Testo|Menu|Footer|Pulsante principale|Home|SEO title|Meta description|Consenso e privacy)$/iu;
/** Frammenti da non cercare (istruzioni dentro un paragrafo di testo) */
const SKIP_FRAGMENTS = [/^testo legale separato\.?$/i];

// ──────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const pdfPath = args.find((a) => !a.startsWith("--"));
const opt = (n) => args.includes(`--${n}`);
if (!pdfPath) {
  console.error('Uso: node scripts/verifica-testi-pdf.mjs "<file.pdf>" [--inverso] [--tutti]');
  process.exit(2);
}
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// minuscole, apostrofi e virgolette dritte, trattini uniformi, legature, spazi singoli, senza punteggiatura finale
const norm = (s) =>
  s.normalize("NFKC").toLowerCase()
    .replace(/[’‘`´]/g, "'").replace(/[“”«»]/g, '"').replace(/[–—]/g, "-").replace(/ |­/g, " ")
    .replace(/\s+/g, " ").trim().replace(/[.;:,]+$/, "");
const isCaps = (s) => /\p{Lu}/u.test(s) && !/\p{Ll}/u.test(s.replace(/\(.*?\)/g, ""));

// ── PDF → paragrafi
async function pdfParagraphs(file) {
  let getDocument;
  try {
    ({ getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs"));
  } catch {
    console.error("Manca pdfjs-dist: installalo una volta con  npm i -D pdfjs-dist");
    process.exit(2);
  }
  const doc = await getDocument({ data: new Uint8Array(await readFile(file)), verbosity: 0 }).promise;
  const paras = [];
  for (let n = 1; n <= doc.numPages; n++) {
    const { items } = await (await doc.getPage(n)).getTextContent();
    const lines = [];
    let cur = null;
    for (const it of items) {
      const y = it.transform[5];
      if (it.str) {
        if (!cur || Math.abs(cur.y - y) > 2) lines.push((cur = { y, h: it.height || 11, text: "" }));
        cur.text += it.str;
      }
      if (it.hasEOL) cur = null;
    }
    // nuova riga a più di 1,6 volte l'altezza del testo = nuovo paragrafo (o nuova pagina)
    let para = null;
    for (const l of lines) {
      if (para && para.y - l.y < l.h * 1.6) para.text += " " + l.text.trim();
      else paras.push((para = { text: l.text.trim(), page: n }));
      para.y = l.y;
    }
  }
  return paras.map((p) => ({ text: p.text.replace(/\s+/g, " ").trim(), page: p.page })).filter((p) => p.text);
}

// ── paragrafo → frasi da cercare (senza etichette)
function fragments(text) {
  const out = [];
  for (let rest of text.replace(/^•\s*/, "").split(/(?<=[.!?])\s+(?=[\p{Lu}\d"“])/u)) {
    // etichette o titoli brevi in testa: "H2 — …", "Card 1 — Visite guidate: …", "Dall'aeroporto: …"
    for (let m; (m = rest.match(/^([^:—.?!]{1,50}?)(?::| —) (.+)$/u)) && m[1].split(" ").length <= 6; rest = m[2]) out.push(m[1]);
    out.push(...rest.split(/ [—·|→] /));
  }
  return out
    .map((f) => f.trim())
    .filter((f) => f.length >= 3 && !f.startsWith("/") && !LABEL.test(f) && !isCaps(f) && !SKIP_FRAGMENTS.some((r) => r.test(f)));
}

// ── testi del sito: stringhe e testo JSX, nell'ordine in cui compaiono (righe di titolo consecutive si uniscono)
async function files(dir, ext) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await files(p, ext)));
    else if (ext.test(e.name)) out.push(p);
  }
  return out;
}
function literals(src) {
  const out = [];
  const re = /"((?:[^"\\\n]|\\.)*)"|'((?:[^'\\\n]|\\.)*)'|`((?:[^`\\$]|\\.)*)`|>([^<>{}]*[\p{L}][^<>{}]*)</gu;
  for (let m; (m = re.exec(src)); ) {
    const s = (m[1] ?? m[2] ?? m[3] ?? m[4]).replace(/\\n/g, " ").replace(/\\(.)/g, "$1")
      .replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
    out.push({ s, line: src.slice(0, m.index).split("\n").length });
  }
  return out;
}

const paras = await pdfParagraphs(pdfPath);
const siteFiles = [
  ...(await files(join(root, "content"), /\.ts$/)),
  ...(await files(join(root, "components"), /\.tsx$/)),
  ...(await files(join(root, "app"), /\.tsx$/)),
];
const sources = await Promise.all(siteFiles.map(async (f) => ({ f, lits: literals(await readFile(f, "utf8")) })));
const haystack = sources.map(({ lits }) => lits.map((l) => norm(l.s)).join(" ")).join(" \n ");

// ── PDF → sito
let started = false, skipping = false, section = "", heading = "";
const results = [];
for (const p of paras) {
  const t = p.text;
  if (SECTION.test(t)) started = true;
  if (!started) continue;
  if (isCaps(t)) {
    if (SECTION.test(t)) section = t;
    heading = t;
    skipping = SKIP_HEADINGS.some((r) => r.test(t));
    continue;
  }
  if (skipping || SKIP_PARAGRAPHS.some((r) => r.test(t))) continue;
  for (const f of fragments(t)) results.push({ f, ok: haystack.includes(norm(f)), section, heading, page: p.page });
}

const missing = results.filter((r) => !r.ok);
let last = "";
for (const r of opt("tutti") ? results : missing) {
  const where = `${r.section}${r.heading !== r.section ? "  ›  " + r.heading : ""}`;
  if (where !== last) {
    console.log(`\n${where}`);
    last = where;
  }
  console.log(`  ${r.ok ? "✓" : "✗"} ${r.f}  (p. ${r.page})`);
}
console.log(`\nPDF → sito: ${results.length} frasi controllate, ${results.length - missing.length} trovate, ${missing.length} mancanti.`);

// ── sito → PDF (solo content/): testi che il PDF non contiene
if (opt("inverso")) {
  const pdfText = norm(paras.map((p) => p.text).join(" "));
  console.log("\nTesti in content/ che non sono nel PDF:");
  let n = 0;
  for (const { f, lits } of sources.filter((s) => relative(root, s.f).startsWith("content"))) {
    const extra = lits.filter(({ s }) => s.split(" ").length >= 4 && !/^[/#]|^https?:|\.webp$/.test(s) && !pdfText.includes(norm(s)));
    if (!extra.length) continue;
    console.log(`\n${relative(root, f)}`);
    for (const { s, line } of extra) {
      console.log(`  ${line}: ${s.length > 110 ? s.slice(0, 110) + "…" : s}`);
      n++;
    }
  }
  console.log(`\nSito → PDF: ${n} testi di content/ non presenti nel PDF.`);
}

process.exit(missing.length ? 1 : 0);
