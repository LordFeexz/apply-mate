import { LANG, LANGS } from "@/enums/global";
import type { PageProps } from "@/interfaces/global";
import AboutUs from "@/modules/about-us";
import type { Metadata } from "next";

export default async function Page({ params }: PageProps) {
  const { lang } = await params;

  return <AboutUs lang={lang} />;
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

  const title = lang === LANG.ID ? "Tentang Kami" : "About Us";
  const description =
    lang === LANG.ID
      ? "Apply Mate adalah platform AI yang membantu pencari kerja membuat CV dan surat lamaran yang profesional dan relevan."
      : "Apply Mate is an AI platform that helps job seekers create professional and relevant CVs and cover letters.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${DOMAIN}/${lang}/about-us`,
      siteName: "Apply Mate",
      locale: lang,
      images: {
        url: `${DOMAIN}/og/about-us-${lang}.png`,
        alt: "About Apply Mate",
        type: "image/png",
      },
      countryName: "Indonesia",
    },
    keywords: ["about us", "apply mate about us", "about apply mate"],
    applicationName: "Apply Mate",
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: `${DOMAIN}/${lang}/about-us`,
      languages: {
        "en-US": `${DOMAIN}/en/about-us`,
        "id-ID": `${DOMAIN}/id/about-us`,
      },
    },
  };
}
