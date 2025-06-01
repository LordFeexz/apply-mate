import Account from "@/components/layouts/account";
import { ACCOUNT_TAB, LANG } from "@/enums/global";
import HistoryLoading from "@/modules/history-detail/loading";

export default function Loading() {
  return (
    <Account tab={ACCOUNT_TAB.HISTORY} lang={LANG.EN}>
      <HistoryLoading />
    </Account>
  );
}
