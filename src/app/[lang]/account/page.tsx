import type { PageProps } from "@/interfaces/global";
import Account from "@/components/layouts/account";
import { ACCOUNT_TAB, LANG } from "@/enums/global";
import { cache } from "react";
import { User } from "@/models";
import { redirect } from "next/navigation";
import { getServerSideSession } from "@/libs/session";
import AccountPage from "@/modules/account";

const fetcher = cache(async (userId: string, lang: LANG) => {
  const data = await User.findByPk(userId, {
    raw: true,
  });

  if (!data) redirect(`/${lang}/sign-in`);

  return data;
});

export default async function Page({ params }: PageProps) {
  const [{ lang }, session] = await Promise.all([
    params,
    getServerSideSession(),
  ]);
  if (!session || !session?.user?.id) redirect(`/${lang}/sign-in`);

  const user = await fetcher(session.user.id, lang);

  return (
    <Account lang={lang} tab={ACCOUNT_TAB.ACCOUNT}>
      <AccountPage lang={lang} user={user} />
    </Account>
  );
}

export const revalidate = 0;

export const dynamic = "force-dynamic";
