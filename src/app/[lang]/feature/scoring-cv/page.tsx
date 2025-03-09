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

  const title = lang === LANG.ID ? "Cek Skor CV mu" : "Check Your CV Score";
  const description =
    lang === LANG.ID
      ? "Cek kecocokan CV mu dengan pekerjaan yang dilamar"
      : "Check the compatibility of your CV with the job applications";

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
      "Apply Mate Scoring CV",
      "Apply Mate CV Scoring",
      "Apply Mate CV Scoring Indonesia",
      "Apply Mate CV Scoring English",
      "CV Scoring",
      "Cek Skor CV",
      "Cek Skor CV Indonesia",
      "Check CV Score",
    ],
  };
}
