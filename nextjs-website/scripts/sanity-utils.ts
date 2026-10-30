// Funzioni comuni agli script che scrivono su Sanity (seed-sanity.ts, testi-v1.ts)
import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import { randomUUID } from "node:crypto";
import { createClient } from "next-sanity";

export const client = createClient({
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

export const key = () => randomUUID().slice(0, 12);
export const ref = (_ref: string) => ({ _type: "reference", _ref });

// ogni file viene caricato una volta sola, anche se usato in più punti (Sanity riconosce i file già presenti)
export const uploads = new Map<string, Promise<string>>();
const upload = (src: string) => {
  if (!uploads.has(src))
    uploads.set(src, readFile(`public${src}`).then((buf) => client.assets.upload("image", buf, { filename: basename(src) })).then((a) => a._id));
  return uploads.get(src)!;
};

// Img → photo con asset caricato; elementi degli array con _key e _type
export async function conv(v: unknown, field = ""): Promise<unknown> {
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
