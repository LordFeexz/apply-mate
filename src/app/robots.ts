import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const { DOMAIN } = process.env;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/*",
    },
    sitemap: `${DOMAIN}/sitemap.xml`,
    host: DOMAIN,
  };
}
