import AccountLoading from "@/modules/account/loading";
import Account from "@/components/layouts/account";
import { ACCOUNT_TAB, LANG } from "@/enums/global";

export default function Loading() {
  return (
    <Account lang={LANG.EN} tab={ACCOUNT_TAB.ACCOUNT}>
      <AccountLoading />
    </Account>
  );
}
