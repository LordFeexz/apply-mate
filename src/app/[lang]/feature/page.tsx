import { LANG, LANGS } from "@/enums/global";
import type { PageProps } from "@/interfaces/global";
import Feature from "@/modules/feature";
import type { Metadata } from "next";
import FeatureLayout from "@/components/layouts/feature";

export default async function Page({ params }: PageProps) {
  const { lang } = await params;

  return (
    <FeatureLayout lang={lang} feature="">
      <Feature lang={lang} />
    </FeatureLayout>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { DOMAIN } = process.env;
  const { lang } = await params;
  const title = lang === LANG.ID ? "Fitur Kami" : "Our Features";
  const description =
    lang === LANG.ID
      ? "Fitur Kami yang dapat membantu Anda mencari pekerjaan lebih cepat dan efektif"
      : "Our Features that help you find jobs faster and more effectively";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${DOMAIN}/${lang}/feature`,
      type: "website",
      siteName: "Apply Mate",
      locale: lang,
      alternateLocale: ["en-US", "id-ID"],
      countryName: "Indonesia",
      images: {
        url: `${DOMAIN}/og/feature-${lang}.png`,
        type: "image/png",
        alt: "Apply Mate Feature",
      },
    },
    keywords: [
      "AI",
      "Apply Mate",
      "CV",
      "Cover Letter",
      "Feature",
      "Generate CV",
      "Generate Cover Letter",
      "Generate Optimize CV",
      "Generate Optimize Cover Letter",
      "Job Application",
      "Job Application Tool",
      "Job Application Tool AI",
      "Job Application Tool CV",
      "Job Application Tool Cover Letter",
      "Job Application Tool Feature",
      "Job Application Tool Optimization",
      "Job Application Tool Optimization AI",
      "Job Application Tool Optimization CV",
      "Job Application Tool Optimization Cover Letter",
      "Job Application Tool Optimization Feature",
      "Job Application Tool Optimization Tool",
    ],
    applicationName: "Apply Mate",
    alternates: {
      canonical: `${DOMAIN}/${lang}/feature`,
      languages: {
        "en-US": `${DOMAIN}/en/feature`,
        "id-ID": `${DOMAIN}/id/feature`,
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const dynamic = "force-static";

export const revalidate = false;

export const dynamicParams = false;
