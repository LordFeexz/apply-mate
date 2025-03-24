import type { PageProps } from "@/interfaces/global";
import { getServerSideSession } from "@/libs/session";
import { Transaction } from "@/models";
import { BASE_PAGINATION_SCHEMA } from "@/modules/shared/schema";
import { redirect } from "next/navigation";
import TransactionPage from "@/modules/transaction";

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
      `/${lang}/transaction?${new URLSearchParams({
        page: "1",
        limit: "10",
      }).toString()}`
    );

  const session = await getServerSideSession();
  if (!session || !session?.user?.id) redirect(`/${lang}/sign-in`);

  const { rows, count } = await Transaction.findAndCountAll({
    where: { user_id: session.user.id },
    offset: (data.page - 1) * data.limit,
    limit: data.limit,
    order: [
      ["created_at", "DESC"],
      ["amount", "DESC"],
    ],
    raw: true,
  });

  return (
    <TransactionPage
      lang={lang}
      transactions={rows}
      totalData={count}
      totalPage={Math.ceil(count / data.limit)}
      {...data}
    />
  );
}

export const dynamic = "force-dynamic";
