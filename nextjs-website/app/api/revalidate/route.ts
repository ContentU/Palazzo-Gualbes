import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Webhook di Sanity: alla pubblicazione invalida la cache del tipo modificato (tag = _type, vedi lib/content.ts)
export async function POST(req: NextRequest) {
  const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, process.env.SANITY_REVALIDATE_SECRET);
  if (!isValidSignature) return new Response("Firma non valida", { status: 401 });
  if (!body?._type) return new Response("_type mancante", { status: 400 });
  revalidateTag(body._type, { expire: 0 });
  return Response.json({ revalidated: body._type });
}
