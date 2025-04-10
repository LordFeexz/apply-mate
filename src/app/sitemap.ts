import { ACCOUNT_TABS, FEATURES, LANGS } from "@/enums/global";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const { DOMAIN } = process.env;
  const routes: MetadataRoute.Sitemap = [];
  for (const lang of LANGS) {
    FEATURES.forEach((feature) => {
      routes.push({
        url: `${DOMAIN}/${lang}/feature/${feature}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 1,
      });
    });
    routes.push({
      url: `${DOMAIN}/${lang}/feature`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    });

    ACCOUNT_TABS.forEach((tab) => {
      routes.push({
        url: `${DOMAIN}/${lang}/account/${tab}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.5,
      });
    });

    routes.push({
      url: `${DOMAIN}/${lang}/sign-in`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    });

    routes.push({
      url: `${DOMAIN}/${lang}/our-organization`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    });

    routes.push({
      url: `${DOMAIN}/${lang}/about-us`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    });
  }
  return routes;
}
