import type { PageProps } from "@/interfaces/global";
import { getServerSideSession } from "@/libs/session";
import { Transaction } from "@/models";
import { notFound, redirect } from "next/navigation";
import TransactionDetail from "@/modules/transaction-detail";
import { cache } from "react";
import Account from "@/components/layouts/account";
import { ACCOUNT_TAB, LANG } from "@/enums/global";
import { validate } from "uuid";
import type { Metadata } from "next";

const fetcher = cache(async (id: string) => {
  const transaction = await Transaction.findByPk(id, { raw: true });
  if (!transaction) notFound();

  return transaction;
});

export default async function Page({ params }: PageProps) {
  const { lang, id } = await params;
  if (!validate(id)) redirect(`/${lang}/account/transaction`);

  const session = await getServerSideSession();
  if (!session || !session?.user?.id) redirect(`/${lang}/sign-in`);

  const transaction = await fetcher(id);
  if (transaction.user_id !== session.user.id)
    redirect(`/${lang}/account/transaction`);

  return (
    <Account lang={lang} tab={ACCOUNT_TAB.TRANSACTION}>
      <TransactionDetail transaction={transaction} lang={lang} />
    </Account>
  );
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang, id } = await params;
  const transaction = await Transaction.findByPk(id, { raw: true });
  if (!transaction)
    return {
      title: "Not Found",
    };

  const title =
    lang === LANG.ID
      ? `Detail Transaksi ${transaction.id}`
      : `Transaction ${transaction.id} Detail`;

  return {
    title,
    description: transaction.description,
    openGraph: {
      title,
      description: transaction.description,
      locale: lang,
      type: "website",
      siteName: "Apply Mate",
      alternateLocale: ["en-US", "id-ID"],
      countryName: "Indonesia",
      url: `${process.env.DOMAIN}/${lang}/account/transaction/${id}`,
    },
  };
}

export const dynamic = "force-dynamic";
