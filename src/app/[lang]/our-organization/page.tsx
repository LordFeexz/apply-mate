import { LANG, LANGS } from "@/enums/global";
import type { PageProps } from "@/interfaces/global";
import OurOrganization from "@/modules/our-organization";
import type { Metadata } from "next";

export default async function Page({ params }: PageProps) {
  const { lang } = await params;

  return <OurOrganization lang={lang} />;
}

export const dynamic = "force-static";

export const revalidate = false;

export const dynamicParams = false;

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const { DOMAIN } = process.env;

  const title = lang === LANG.ID ? "Organisasi Kami" : "Our Organization";
  const description =
    lang === LANG.ID
      ? "Pelajari lebih lanjut tentang tim di balik Apply Mate. Kami berdedikasi membantu pencari kerja menciptakan CV dan surat lamaran terbaik dengan bantuan AI."
      : "Learn more about the team behind Apply Mate. We are dedicated to helping job seekers create the best CVs and cover letters with the help of AI.";

  return {
    title,
    description,
    applicationName: "Apply Mate",
    alternates: {
      canonical: `${DOMAIN}/${lang}/our-organization`,
      languages: {
        "en-US": `${DOMAIN}/en/our-organization`,
        "id-ID": `${DOMAIN}/id/our-organization`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${DOMAIN}/${lang}/our-organization`,
      type: "website",
      siteName: "Apply Mate",
      locale: lang,
      alternateLocale: ["en-US", "id-ID"],
      countryName: "Indonesia",
      images: {
        url: `${DOMAIN}/og/our-organization-${lang}.png`,
        type: "image/png",
        alt: "Apply Mate Our Organization",
      },
    },
    keywords: [
      "Apply Mate",
      "AI Resume Generator",
      "AI Cover Letter Generator",
      "AI Resume Builder",
      "AI Cover Letter Builder",
      "AI CV Generator",
      "AI CV Builder",
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
