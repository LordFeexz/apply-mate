import Account from "@/components/layouts/account";
import { ACCOUNT_TAB, LANG } from "@/enums/global";
import HistoryNotFound from "@/modules/history-detail/not-found";

export default function NotFound() {
  return (
    <Account tab={ACCOUNT_TAB.HISTORY} lang={LANG.EN}>
      <HistoryNotFound />
    </Account>
  );
}
