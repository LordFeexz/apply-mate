import { LANG } from "@/enums/global";
import { PRICING } from "@/enums/plan";
import type { LangProps } from "@/interfaces/component";
import Script from "next/script";
import { memo } from "react";
import type { Service, WithContext } from "schema-dts";

export interface SchemaMarkupProps extends LangProps {}

function SchemaMarkup({ lang }: SchemaMarkupProps) {
  const { DOMAIN } = process.env;
  const schema: WithContext<Service> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: lang === LANG.ID ? "Pengecekan Skor CV" : "CV Scoring",
    description:
      lang === LANG.ID
        ? "Periksa kesesuaian CV Anda dengan pekerjaan yang diinginkan menggunakan sistem penilaian berbasis AI."
        : "Check how well your CV matches the job requirements with an AI-powered scoring system.",
    provider: {
      "@type": "Organization",
      name: "Apply Mate",
      url: DOMAIN,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      price: PRICING.SCORING_CV,
      eligibleRegion: "ID",
      url: `${DOMAIN}/${lang}/feature/scoring-cv`,
    },
    brand: {
      "@type": "Organization",
      name: "Apply Mate",
      url: DOMAIN,
    },
    serviceType: "benefits",
    url: `${DOMAIN}/${lang}/feature/scoring-cv`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default memo(SchemaMarkup);
