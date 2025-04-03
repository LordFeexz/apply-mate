import ScoringCv from "@/modules/scoring-cv";
import FeatureLayout from "@/components/layouts/feature";
import { FEATURE, LANG, LANGS } from "@/enums/global";
import type { PageProps } from "@/interfaces/global";
import type { Metadata } from "next";

export default async function Page({ params }: PageProps) {
  const { lang } = await params;

  return (
    <FeatureLayout lang={lang} feature={FEATURE.SCORING_CV}>
      <ScoringCv lang={lang} />
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
      ? "Cek Skor CV mu secara instan"
      : "Check Your CV Score Instantly";
  const description =
    lang === LANG.ID
      ? "Analisa CV Anda dengan mudah dan cepat. Dapatkan gambaran untuk memperbaiki CV Anda untuk kesempatan pekerjaan yang lebih baik dengan Apply Mate!"
      : "Analyze your CV's compatibility with job applications instantly. Get insights to optimize your resume for better job opportunities with Apply Mate!";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${DOMAIN}/${lang}/feature/scoring-cv`,
      type: "website",
      siteName: "Apply Mate",
      locale: lang,
      alternateLocale: ["en-US", "id-ID"],
      countryName: "Indonesia",
      images: {
        url: `${DOMAIN}/og/cv-score-${lang}.png`,
        type: "image/png",
        alt: "Apply Mate Scoring CV",
      },
    },
    keywords: [
      "Apply Mate",
      "Apply Mate CV Scoring",
      "Cek Skor CV Apply Mate",
      "Skor CV Online",
      "Analisis CV Online",
      "Cek Kesesuaian CV",
      "Cek Skor CV Gratis",
      "Penilaian CV Otomatis",
      "Cara Menilai CV",
      "Optimasi CV untuk Lamaran Kerja",
      "Check CV Score",
      "Free CV Score Check",
      "Online CV Scoring",
      "CV Optimization Tool",
      "Resume Compatibility Check",
      "Job Application CV Score",
      "Improve Your Resume Score",
    ],
    applicationName: "Apply Mate",
    alternates: {
      canonical: `${DOMAIN}/${lang}/feature/scoring-cv`,
      languages: {
        "en-US": `${DOMAIN}/en/feature/scoring-cv`,
        "id-ID": `${DOMAIN}/id/feature/scoring-cv`,
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
