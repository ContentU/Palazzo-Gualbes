// Foto reali di Palazzo Gualbes: carica le foto su Sanity e aggiorna SOLO i campi foto (niente testi).
// Uso: npx -y tsx --env-file=.env.local scripts/foto-reali.ts [--dry]
//
// - cambia solo le foto che in content/*.ts puntano a /images/gualbes/ (le altre restano come sono in Studio)
// - salva prima una copia dei documenti toccati in scripts/backup/ (bozze comprese)
// - aggiorna anche le bozze aperte in Studio, così non nascondono le foto nuove
// - non sovrascrive i testi modificati in Studio, a differenza di testi-v1.ts
import { mkdir, writeFile } from "node:fs/promises";
import { home } from "../content/home";
import { about } from "../content/about";
import { rooms } from "../content/rooms";
import { suites } from "../content/suites";
import { services } from "../content/pages";
import { client, conv, uploads } from "./sanity-utils";

const dry = process.argv.includes("--dry");

type Slot = { path: string; img: unknown };

// cerca le foto reali (src /images/gualbes/…) e ne scrive il percorso nel documento: "hero.image", "gallery[2]"…
function collect(v: unknown, path = "", out: Slot[] = []): Slot[] {
  if (Array.isArray(v)) v.forEach((x, i) => collect(x, `${path}[${i}]`, out));
  else if (v && typeof v === "object") {
    const o = v as Record<string, unknown>;
    if (typeof o.src === "string" && "alt" in o) {
      if (o.src.startsWith("/images/gualbes/")) out.push({ path, img: o });
    } else for (const [k, x] of Object.entries(o)) collect(x, path ? `${path}.${k}` : k, out);
  }
  return out;
}

type Doc = { _id: string; _type: string; slug?: { current: string } };

async function main() {
  const targets: { id: (docs: Doc[]) => string | undefined; label: string; data: object }[] = [
    { label: "Home", id: () => "homePage", data: home },
    { label: "Il Palazzo", id: () => "aboutPage", data: about },
    { label: "Camere", id: () => "roomsPage", data: rooms },
    { label: "Servizi", id: () => "servicesPage", data: services },
    ...suites.map(({ slug, ...s }) => ({
      label: `Suite ${slug}`,
      id: (docs: Doc[]) => docs.find((d) => d._type === "suite" && !d._id.startsWith("drafts.") && d.slug?.current === slug)?._id,
      data: s,
    })),
  ];

  const raw = client.withConfig({ perspective: "raw" });
  const docs = await raw.fetch<Doc[]>(`*[_type in ["homePage","aboutPage","roomsPage","servicesPage","suite"]]`);

  const plan = targets.map((t) => ({ ...t, docId: t.id(docs), slots: collect(t.data) }));
  for (const p of plan) {
    if (!p.docId) throw new Error(`Documento non trovato su Sanity: ${p.label}`);
    console.log(`${p.label}: ${p.slots.length} foto → ${p.docId}`);
  }
  if (dry) return console.log("Prova a secco: nessuna modifica.");

  // 1. copia di sicurezza
  const ids = new Set(plan.flatMap((p) => [p.docId!, `drafts.${p.docId}`]));
  const touched = docs.filter((d) => ids.has(d._id));
  await mkdir("scripts/backup", { recursive: true });
  const file = `scripts/backup/prima-delle-foto-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
  await writeFile(file, JSON.stringify(touched, null, 2));
  console.log(`Copia di sicurezza: ${file} (${touched.length} documenti)`);

  // 2. patch dei soli campi foto (documento pubblicato + eventuale bozza)
  const tx = client.transaction();
  let n = 0;
  for (const p of plan) {
    const set: Record<string, unknown> = {};
    for (const s of p.slots) set[s.path] = await conv(s.img);
    for (const id of [p.docId!, `drafts.${p.docId}`])
      if (docs.some((d) => d._id === id)) tx.patch(id, { set });
    n += p.slots.length;
  }
  await tx.commit();
  console.log(`Fatto: ${n} foto aggiornate in ${plan.length} documenti (${uploads.size} file caricati).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
