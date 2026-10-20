// Migrazione una tantum: content/*.ts → Sanity (dataset vuoto).
// Uso: npx -y tsx --env-file=.env.local scripts/seed-sanity.ts
import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import { randomUUID } from "node:crypto";
import { createClient } from "next-sanity";
import { site } from "../content/site";
import { home } from "../content/home";
import { about } from "../content/about";
import { rooms } from "../content/rooms";
import { suites } from "../content/suites";
import { articles, categories, journal } from "../content/articles";
import { contact } from "../content/contact";
import type { ArticleBlock } from "../content/types";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-10-20",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// _type degli elementi di ogni array di oggetti (come in sanity/schemaTypes)
const itemType: Record<string, string> = {
  social: "linkItem", menu: "linkItem", footerLinks: "linkItem", legalLinks: "linkItem",
  suites: "suiteCard", posts: "post", rooms: "room", features: "feature",
  info: "infoItem", faq: "faqItem", details: "detail",
};

const key = () => randomUUID().slice(0, 12);
const ref = (_ref: string) => ({ _type: "reference", _ref });

// ogni file viene caricato una volta sola, anche se usato in più punti
const uploads = new Map<string, Promise<string>>();
const upload = (src: string) => {
  if (!uploads.has(src))
    uploads.set(src, readFile(`public${src}`).then((buf) => client.assets.upload("image", buf, { filename: basename(src) })).then((a) => a._id));
  return uploads.get(src)!;
};

// Img → photo con asset caricato; elementi degli array con _key e _type
async function conv(v: unknown, field = ""): Promise<unknown> {
  if (Array.isArray(v))
    return Promise.all(v.map(async (x) => {
      const c = await conv(x);
      if (!c || typeof c !== "object") return c;
      return { _key: key(), ...(itemType[field] && { _type: itemType[field] }), ...c };
    }));
  if (!v || typeof v !== "object") return v;
  const o = v as Record<string, unknown>;
  if (typeof o.src === "string" && "alt" in o)
    return { _type: "photo", asset: ref(await upload(o.src)), alt: o.alt, ...(o.warm ? { warm: true } : {}) };
  return Object.fromEntries(await Promise.all(Object.entries(o).map(async ([k, x]) => [k, await conv(x, k)])));
}

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
    ["roomsPage", rooms],
    ["journalPage", journal],
    ["contactPage", contact],
  ];
  for (const [type, data] of singletons) {
    const doc = (await conv(data)) as Record<string, unknown>;
    if (type === "journalPage") doc.featured = ref(artIds[journal.featured]);
    await client.createOrReplace({ _id: type, _type: type, ...doc });
  }
  console.log(`Fatto: ${categories.length} categorie, ${suites.length} suite, ${articles.length} articoli, ${uploads.size} foto, 6 pagine.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
