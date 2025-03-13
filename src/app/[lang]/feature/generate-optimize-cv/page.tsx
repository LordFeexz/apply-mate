import type { PageProps } from "@/interfaces/global";
import FeatureLayout from "@/components/layouts/feature";
import { FEATURE, LANG, LANGS } from "@/enums/global";
import GenerateOptimizeCv from "@/modules/generate-optimize-cv";
import type { Metadata } from "next";

export default async function Page({ params }: PageProps) {
  const { lang } = await params;

  return (
    <FeatureLayout lang={lang} feature={FEATURE.GENERATE_OPTIMIZE_CV}>
      <GenerateOptimizeCv lang={lang} />
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
    lang === LANG.ID ? "Buat CV yang teroptimalkan" : "Generate Optimize CV";
  const description =
    lang === LANG.ID
      ? "Buat CV yang di personalisasikan untuk lowongan pekerjaan yang spesifik"
      : "Generate personalized CV for specific job applications";

  return {
    title,
    description,
    keywords: [
      "cv",
      "create cv",
      "generate cv",
      "buat cv",
      "buat cv dengan AI",
      "generate cv dengan AI",
      "generate cv dengan AI gratis",
    ],
    openGraph: {
      title,
      description,
      url: `${DOMAIN}/${lang}/feature/generate-optimize-cv`,
      type: "website",
      siteName: "Apply Mate",
      locale: lang,
      alternateLocale: ["en-US", "id-ID"],
      countryName: "Indonesia",
    },
  };
}
