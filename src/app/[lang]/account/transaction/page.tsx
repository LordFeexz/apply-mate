import type { PageProps } from "@/interfaces/global";
import { getServerSideSession } from "@/libs/session";
import { Transaction } from "@/models";
import { BASE_PAGINATION_SCHEMA } from "@/modules/shared/schema";
import { redirect } from "next/navigation";
import TransactionPage from "@/modules/transaction";
import Account from "@/components/layouts/account";
import { ACCOUNT_TAB } from "@/enums/global";
import { cache } from "react";

const fetcher = cache(
  async (user_id: string, data: { page: number; limit: number }) => {
    const { rows, count } = await Transaction.findAndCountAll({
      where: { user_id },
      offset: (data.page - 1) * data.limit,
      limit: data.limit,
      order: [
        ["created_at", "DESC"],
        ["amount", "DESC"],
      ],
      raw: true,
    });
    return { rows, count };
  }
);

export default async function Page({
  params,
  searchParams: rawSearchParams,
}: PageProps) {
  const [{ lang }, searchParams] = await Promise.all([params, rawSearchParams]);
  const { success, data } = await BASE_PAGINATION_SCHEMA.safeParseAsync(
    searchParams
  );
  if (!success || !data.page || !data.limit)
    redirect(
      `/${lang}/account/transaction?${new URLSearchParams({
        page: "1",
        limit: "10",
      }).toString()}`
    );

  const session = await getServerSideSession();
  if (!session || !session?.user?.id) redirect(`/${lang}/sign-in`);

  const { rows, count } = await fetcher(session.user.id, data);

  return (
    <Account lang={lang} tab={ACCOUNT_TAB.TRANSACTION}>
      <TransactionPage
        lang={lang}
        transactions={rows}
        totalPage={Math.ceil(count / data.limit)}
        {...data}
      />
    </Account>
  );
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const { DOMAIN } = process.env;

  return {
    title: "Transaction",
    description: "Transaction List",
    openGraph: {
      title: "Transaction",
      description: "Transaction List",
      url: `${DOMAIN}/${lang}/transaction`,
      type: "website",
      siteName: "Apply Mate",
      locale: lang,
      alternateLocale: ["en-US", "id-ID"],
      countryName: "Indonesia",
    },
  };
}
