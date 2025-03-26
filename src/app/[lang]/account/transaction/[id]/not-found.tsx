import TransactionDetailNotFound from "@/modules/transaction-detail/not-found";
import Account from "@/components/layouts/account";
import { ACCOUNT_TAB, LANG } from "@/enums/global";

export default function NotFound() {
  return (
    <Account lang={LANG.EN} tab={ACCOUNT_TAB.TRANSACTION}>
      <TransactionDetailNotFound />
    </Account>
  );
}
