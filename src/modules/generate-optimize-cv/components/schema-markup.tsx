import { LANG } from "@/enums/global";
import { PRICING } from "@/enums/plan";
import type { LangProps } from "@/interfaces/component";
import { memo } from "react";
import type { Service, WithContext } from "schema-dts";

export interface SchemaMarkupProps extends LangProps {}

function SchemaMarkup({ lang }: SchemaMarkupProps) {
  const { DOMAIN } = process.env;
  const schema: WithContext<Service> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name:
      lang === LANG.ID ? "Pembuatan dan Optimasi CV" : "Generate & Optimize CV",
    description:
      lang === LANG.ID
        ? "Buat CV pribadi yang disesuaikan untuk lamaran pekerjaan tertentu"
        : "Create a personalized CV based on the job you're applying",
    provider: {
      "@type": "Organization",
      name: "Apply Mate",
      url: DOMAIN,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      price: PRICING.GENERATE_CV,
      eligibleRegion: "ID",
      url: `${DOMAIN}/${lang}/feature/generate-optimize-cv`,
    },
    brand: {
      "@type": "Organization",
      name: "Apply Mate",
      url: DOMAIN,
    },
    serviceType: "benefits",
    url: `${DOMAIN}/${lang}/feature/generate-optimize-cv`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

export default memo(SchemaMarkup);
