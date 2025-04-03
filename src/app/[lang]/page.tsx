import { LANG, LANGS } from "@/enums/global";
import type { PageProps } from "@/interfaces/global";
import Landing from "@/modules/landing";
import type { Metadata } from "next";

export default async function Home({ params }: PageProps) {
  const { lang } = await params;

  return <Landing lang={lang} />;
}

export const dynamic = "force-static";

export const revalidate = false;

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const { DOMAIN } = process.env;

  const title =
    lang === LANG.ID
      ? "Apply Mate - Tool Pencarian Pekerjaan"
      : "Apply Mate - Job Application Tool";

  const description =
    lang === LANG.ID
      ? "Optimalkan pencarian pekerjaan Anda dengan AI untuk memudahkan Anda"
      : "Optimize your job applications with our AI-powered tool to make your job search easier";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${DOMAIN}/${lang}`,
      type: "website",
      siteName: "Apply Mate",
      locale: lang,
      alternateLocale: ["en-US", "id-ID"],
      countryName: "Indonesia",
      images: {
        url: `${DOMAIN}/og/landing-page-${lang}.png`,
        type: "image/png",
        alt: "Apply Mate",
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
