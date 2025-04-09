import { LANG, LANGS } from "@/enums/global";
import type { PageProps } from "@/interfaces/global";
import Signin from "@/modules/signin";
import type { Metadata } from "next";

export default async function Page({ params }: PageProps) {
  const { lang } = await params;

  return <Signin lang={lang} />;
}

export const dynamicParams = false;

export const revalidate = false;

export const dynamic = "force-static";

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const { DOMAIN } = process.env;
  const title = lang === LANG.ID ? "Masuk" : "Sign In";
  const description =
    lang === LANG.ID
      ? "Masuk ke Apply Mate untuk memulai pencarian pekerjaan"
      : "Sign In to Apply Mate to start your job search";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${DOMAIN}/${lang}/sign-in`,
      type: "website",
      siteName: "Apply Mate",
      locale: lang,
      alternateLocale: ["en-US", "id-ID"],
      countryName: "Indonesia",
      images: {
        url: `${DOMAIN}/og/sign-in-${lang}.png`,
        type: "image/png",
        alt: "Apply Mate Sign In",
      },
    },
    applicationName: "Apply Mate",
    keywords: ["masuk", "apply mate sign in", "sign in"],
    alternates: {
      canonical: `${DOMAIN}/${lang}/sign-in`,
      languages: {
        "en-US": `${DOMAIN}/en/sign-in`,
        "id-ID": `${DOMAIN}/id/sign-in`,
      },
    },
  };
}
