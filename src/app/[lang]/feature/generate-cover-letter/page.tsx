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
    lang === LANG.ID
      ? "Buat Cover Letter Profesional"
      : "Generate a Professional Cover Letter";
  const description =
    lang === LANG.ID
      ? "Buat cover letter profesional dengan AI. Sesuaikan cover letter Anda untuk lamaran pekerjaan dan meningkatkan peluang untuk dikenal"
      : "Create professional cover letters effortlessly with AI. Tailor your cover letter for job applications and increase your chances of getting noticed";

  return {
    title,
    description,
    keywords: [
      "Generate Cover Letter",
      "Buat Surat Lamaran Kerja",
      "Surat Lamaran Kerja Profesional",
      "AI Surat Lamaran Kerja",
      "Surat Lamaran Kerja Otomatis",
      "Surat Lamaran Kerja Online",
      "Buat Surat Lamaran dengan AI",
      "Cover Letter Generator",
      "AI Powered Cover Letter",
      "Tailored Cover Letter",
      "Surat Lamaran Kerja Terbaik",
      "Buat Surat Lamaran Kerja Mudah",
      "Cover Letter Builder",
      "Create Professional Cover Letter",
      "Job Application Cover Letter",
      "AI Cover Letter Generator",
      "Personalized Cover Letter",
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
    applicationName: "Apply Mate",
    alternates: {
      canonical: `${DOMAIN}/${lang}/feature/generate-cover-letter`,
      languages: {
        "en-US": `${DOMAIN}/en/feature/generate-cover-letter`,
        "id-ID": `${DOMAIN}/id/feature/generate-cover-letter`,
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
