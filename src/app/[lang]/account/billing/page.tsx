import type { PageProps } from "@/interfaces/global";
import Billing from "@/modules/billing";
import Account from "@/components/layouts/account";
import { ACCOUNT_TAB, LANG, LANGS } from "@/enums/global";
import type { Metadata } from "next";

export default async function Page({ params }: PageProps) {
  const { lang } = await params;

  return (
    <Account lang={lang} tab={ACCOUNT_TAB.BILLING}>
      <Billing lang={lang} />
    </Account>
  );
}

export const dynamic = "force-static";

export const revalidate = false;

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const { DOMAIN } = process.env;
  const title = lang === LANG.ID ? `Pembayaran` : `Billing`;

  return {
    title,
    openGraph: {
      title,
      url: `${DOMAIN}/${lang}/account/billing`,
      type: "website",
      siteName: "Apply Mate",
      locale: lang,
      alternateLocale: ["en-US", "id-ID"],
      countryName: "Indonesia",
    },
    keywords: ["pembayaran", "apply mate billing", "billing"],
    applicationName: "Apply Mate",
  };
}
