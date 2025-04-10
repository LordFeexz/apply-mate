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
      lang === LANG.ID
        ? "Buat Cover Letter Profesional"
        : "Professional Cover Letter Generator",
    description:
      lang === LANG.ID
        ? "Buat cover letter profesional dengan AI. Sesuaikan cover letter Anda untuk lamaran pekerjaan dan meningkatkan peluang untuk dikenal"
        : "Generate personalized cover letters using AI to improve your chances of getting noticed",
    provider: {
      "@type": "Organization",
      name: "Apply Mate",
      url: DOMAIN,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      price: PRICING.COVER_LETTER,
      eligibleRegion: "ID",
      url: `${DOMAIN}/${lang}/feature/generate-cover-letter`,
    },
    brand: {
      "@type": "Organization",
      name: "Apply Mate",
      url: DOMAIN,
    },
    serviceType: "benefits",
    url: `${DOMAIN}/${lang}/feature/generate-cover-letter`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

export default memo(SchemaMarkup);
