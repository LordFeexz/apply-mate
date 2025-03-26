import Account from "@/components/layouts/account";
import { ACCOUNT_TAB, LANG } from "@/enums/global";
import BillingLoading from "@/modules/billing/loading";

export default function Loading() {
  return (
    <Account lang={LANG.EN} tab={ACCOUNT_TAB.BILLING}>
      <BillingLoading />
    </Account>
  );
}
