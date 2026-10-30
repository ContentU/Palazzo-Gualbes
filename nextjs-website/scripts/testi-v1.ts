// Testi V1 ("Palazzo Gualbes — Testi sito web — V1.pdf"): content/*.ts → Sanity, su un dataset già popolato.
// Uso: npx -y tsx --env-file=.env.local scripts/testi-v1.ts
//
// - salva prima una copia dei documenti che sostituisce in scripts/backup/ (bozze comprese)
// - sostituisce le pagine (anche le nuove: Servizi, Experience, La Storia), aggiorna la Family Suite e crea la Suite
// - elimina le bozze aperte in Studio di quei documenti, che altrimenti nasconderebbero i testi nuovi
// - non tocca articoli e categorie del Journal; l'articolo in evidenza resta quello scelto in Studio
import { mkdir, writeFile } from "node:fs/promises";
import { site } from "../content/site";
import { home } from "../content/home";
import { about } from "../content/about";
import { rooms } from "../content/rooms";
import { suites } from "../content/suites";
import { journal } from "../content/articles";
import { contact } from "../content/contact";
import { experience, services, story } from "../content/pages";
import { client, conv, ref, uploads } from "./sanity-utils";

const singletons: [string, object][] = [
  ["siteSettings", site],
  ["homePage", home],
  ["aboutPage", about],
  ["storyPage", story],
  ["roomsPage", rooms],
  ["servicesPage", services],
  ["experiencePage", experience],
  ["journalPage", journal],
  ["contactPage", contact],
];

type Doc = { _id: string; _type: string; slug?: { current: string }; featured?: { _ref: string } };

async function main() {
  const raw = client.withConfig({ perspective: "raw" });
  const types = [...singletons.map(([t]) => t), "suite"];
  const current = await raw.fetch<Doc[]>(`*[_type in $types]`, { types });

  // 1. copia di sicurezza
  await mkdir("scripts/backup", { recursive: true });
  const file = `scripts/backup/prima-dei-testi-v1-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
  await writeFile(file, JSON.stringify(current, null, 2));
  console.log(`Copia di sicurezza: ${file} (${current.length} documenti)`);

  const published = current.filter((d) => !d._id.startsWith("drafts."));
  const drafts = current.filter((d) => d._id.startsWith("drafts."));
  const tx = client.transaction();

  // 2. pagine
  for (const [type, data] of singletons) {
    const doc = (await conv(data)) as Record<string, unknown>;
    if (type === "journalPage") {
      const prev = published.find((d) => d._id === "journalPage")?.featured?._ref;
      const bySlug = journal.featured
        ? await client.fetch<string | null>(`*[_type == "article" && slug.current == $s][0]._id`, { s: journal.featured })
        : null;
      const featured = prev ?? bySlug;
      if (featured) doc.featured = ref(featured);
    }
    tx.createOrReplace({ _id: type, _type: type, ...doc });
  }

  // 3. suite: stesso documento se lo slug esiste già, altrimenti nuovo
  for (const { slug, ...s } of suites) {
    const doc = { _type: "suite", slug: { _type: "slug", current: slug }, ...((await conv(s)) as object) };
    const id = published.find((d) => d._type === "suite" && d.slug?.current === slug)?._id;
    if (id) tx.createOrReplace({ _id: id, ...doc });
    else tx.create(doc);
  }

  // 4. bozze dei documenti sostituiti
  const replaced = new Set([...singletons.map(([t]) => t), ...published.filter((d) => d._type === "suite").map((d) => d._id)]);
  const stale = drafts.filter((d) => replaced.has(d._id.replace(/^drafts\./, "")));
  for (const d of stale) tx.delete(d._id);

  await tx.commit();
  console.log(`Fatto: ${singletons.length} pagine, ${suites.length} suite, ${uploads.size} foto; ${stale.length} bozze eliminate.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
