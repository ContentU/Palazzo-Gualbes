// Migrazione una tantum: content/*.ts → Sanity (dataset vuoto).
// Uso: npx -y tsx --env-file=.env.local scripts/seed-sanity.ts
import { site } from "../content/site";
import { home } from "../content/home";
import { about } from "../content/about";
import { rooms } from "../content/rooms";
import { suites } from "../content/suites";
import { articles, categories, journal } from "../content/articles";
import { contact } from "../content/contact";
import { experience, services, story } from "../content/pages";
import type { ArticleBlock } from "../content/types";
import { client, conv, key, ref, uploads } from "./sanity-utils";

const block = (b: ArticleBlock) => {
  if (b.type !== "p") {
    const { type, ...rest } = b;
    return { _type: type, ...rest };
  }
  return { _type: "block", style: "normal", markDefs: [], children: [{ _type: "span", _key: key(), text: b.text, marks: [] }] };
};

const months = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
// "12 ottobre 2026" → "2026-10-12"
const isoDate = (d: string) => {
  const [day, month, year] = d.split(" ");
  const m = months.indexOf(month) + 1;
  if (!m) throw new Error(`Data non valida: ${d}`);
  return `${year}-${String(m).padStart(2, "0")}-${day.padStart(2, "0")}`;
};

async function main() {
  if (await client.fetch(`count(*[_type in ["category", "suite", "article"]])`))
    throw new Error("Il dataset contiene già dei contenuti: migrazione annullata per non creare duplicati.");

  // uno alla volta: l'ordine di creazione è l'ordine sul sito
  const catIds: Record<string, string> = {};
  for (const c of categories)
    catIds[c.slug] = (await client.create({ _type: "category", title: c.title, slug: { _type: "slug", current: c.slug } }))._id;

  for (const { slug, ...s } of suites)
    await client.create({ _type: "suite", slug: { _type: "slug", current: slug }, ...(await conv(s) as object) });

  const artIds: Record<string, string> = {};
  const relatedBySlug: [string, string[]][] = [];
  for (const { slug, category, date, body, related, ...a } of articles) {
    if (related) relatedBySlug.push([slug, related]);
    const doc = await client.create({
      _type: "article",
      slug: { _type: "slug", current: slug },
      category: ref(catIds[category]),
      date: isoDate(date),
      ...(await conv({ ...a, ...(body && { body: body.map(block) }) }) as object),
    });
    artIds[slug] = doc._id;
  }
  for (const [slug, related] of relatedBySlug)
    await client.patch(artIds[slug]).set({ related: related.map((s) => ({ _key: key(), ...ref(artIds[s]) })) }).commit();

  const singletons: [string, object][] = [
    ["siteSettings", site],
    ["homePage", home],
    ["aboutPage", about],
    ["storyPage", story],
    ["servicesPage", services],
    ["experiencePage", experience],
    ["roomsPage", rooms],
    ["journalPage", journal],
    ["contactPage", contact],
  ];
  for (const [type, data] of singletons) {
    const doc = (await conv(data)) as Record<string, unknown>;
    if (type === "journalPage" && journal.featured) doc.featured = ref(artIds[journal.featured]);
    await client.createOrReplace({ _id: type, _type: type, ...doc });
  }
  console.log(`Fatto: ${categories.length} categorie, ${suites.length} suite, ${articles.length} articoli, ${uploads.size} foto, ${singletons.length} pagine.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
