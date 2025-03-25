import type { PageProps } from "@/interfaces/global";
import Account from "@/components/layouts/account";
import { ACCOUNT_TAB } from "@/enums/global";

export default async function Page({ params }: PageProps) {
  const { lang } = await params;

  return (
    <Account lang={lang} tab={ACCOUNT_TAB.ACCOUNT}>
      <div>OK</div>
    </Account>
  );
}
