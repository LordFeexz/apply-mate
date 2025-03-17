import type { PageProps } from "@/interfaces/global";
import FeatureLayout from "@/components/layouts/feature";
import { FEATURE, LANG, LANGS } from "@/enums/global";
import GenerateCoverLetter from "@/modules/generate-cover-letter";
import type { Metadata } from "next";

export default async function Page({ params }: PageProps) {
  const { lang } = await params;

  return (
    <FeatureLayout lang={lang} feature={FEATURE.GENERATE_COVER_LETTER}>
      <GenerateCoverLetter lang={lang} />
    </FeatureLayout>
  );
}

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const dynamic = "force-static";

export const revalidate = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { DOMAIN } = process.env;
  const { lang } = await params;

  const title =
    lang === LANG.ID ? "Generate Cover Letter" : "Generate Cover Letter";
  const description =
    lang === LANG.ID
      ? "Buat cover letter yang lebih baik dengan AI"
      : "Generate better cover letters with AI";

  return {
    title,
    description,
    keywords: [
      "cover letter",
      "create cover letter",
      "generate cover letter",
      "buat cover letter",
      "buat cover letter dengan AI",
      "generate cover letter dengan AI",
      "generate cover letter dengan AI gratis",
    ],
    openGraph: {
      title,
      description,
      url: `${DOMAIN}/${lang}/feature/generate-cover-letter`,
      type: "website",
      siteName: "Apply Mate",
      locale: lang,
      alternateLocale: ["en-US", "id-ID"],
      countryName: "Indonesia",
      images: {
        url: `${DOMAIN}/og/generate-cover-letter-${lang}.png`,
        type: "image/png",
        alt: "Apply Mate Generate Cover Letter",
      },
    },
  };
}

export const dynamicParams = false;
