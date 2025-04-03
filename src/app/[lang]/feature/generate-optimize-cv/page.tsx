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
    lang === LANG.ID
      ? "Buat dan Optimasi CV mu"
      : "Generate & Optimize Your CV";
  const description =
    lang === LANG.ID
      ? "Buat CV pribadi yang disesuaikan untuk lamaran pekerjaan tertentu. Optimalkan resume Anda untuk meningkatkan peluang mendapatkan pekerjaan impian"
      : "Create a personalized CV tailored for specific job applications. Optimize your resume to increase your chances of landing your dream job";

  return {
    title,
    description,
    keywords: [
      "Generate CV",
      "Buat CV Online",
      "Optimasi CV",
      "Generator CV Pribadi",
      "CV untuk Lamaran Kerja",
      "Buat CV Sesuai Pekerjaan",
      "Optimalkan Resume",
      "CV untuk Pekerjaan Impian",
      "Buat CV Profesional",
      "Create Personalized CV",
      "Resume Generator Tool",
      "Tailored CV for Jobs",
      "CV Optimizer",
      "Job Application Resume",
      "Custom CV Generator",
      "Create Resume for Job Applications",
      "CV Tailored for Specific Jobs",
      "Job-Specific Resume Builder",
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
      images: {
        url: `${DOMAIN}/og/generate-optimize-cv-${lang}.png`,
        type: "image/png",
        alt: "Apply Mate Generate Optimize CV",
      },
    },
    applicationName: "Apply Mate",
    alternates: {
      canonical: `${DOMAIN}/${lang}/feature/generate-optimize-cv`,
      languages: {
        "en-US": `${DOMAIN}/en/feature/generate-optimize-cv`,
        "id-ID": `${DOMAIN}/id/feature/generate-optimize-cv`,
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

export const dynamicParams = false;
