import type { PageProps } from "@/interfaces/global";
import { getServerSideSession } from "@/libs/session";
import { Result } from "@/models";
import { redirect } from "next/navigation";
import { cache } from "react";
import { validate } from "uuid";
import Account from "@/components/layouts/account";
import { ACCOUNT_TAB, LANG } from "@/enums/global";
import type { Metadata } from "next";
import HistoryDetail from "@/modules/history-detail";

const fetcher = cache(async (id: string) => {
  const result = await Result.findByPk(id, { raw: true });
  if (!result) return null;

  return result;
});

export default async function Page({ params }: PageProps) {
  const { lang, id } = await params;
  if (!validate(id)) redirect(`/${lang}/account/transaction`);

  const session = await getServerSideSession();
  if (!session || !session?.user?.id) redirect(`/${lang}/sign-in`);

  const result = fetcher(id);

  return (
    <Account lang={lang} tab={ACCOUNT_TAB.HISTORY}>
      <HistoryDetail lang={lang} session={session} result={result} />
    </Account>
  );
}

export const dynamicParams = true;

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang, id } = await params;
  const result = await fetcher(id);
  if (!result)
    return {
      title: "Not Found",
    };

  const title =
    lang === LANG.ID
      ? `Detail Riwayat ${result.id}`
      : `Result ${result.id} Detail`;

  return {
    title,
    openGraph: {
      title,
      locale: lang,
      type: "website",
      siteName: "Apply Mate",
      alternateLocale: ["en-US", "id-ID"],
      countryName: "Indonesia",
      url: `${process.env.DOMAIN}/${lang}/account/history/${id}`,
    },
  };
}
