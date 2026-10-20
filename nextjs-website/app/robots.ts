import type { MetadataRoute } from "next";

// Come la demo: niente indicizzazione finché il sito non va in produzione
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
