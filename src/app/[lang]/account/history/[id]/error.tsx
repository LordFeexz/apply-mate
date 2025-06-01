"use client";

import Account from "@/components/layouts/account";
import { ACCOUNT_TAB, LANG } from "@/enums/global";
import type { ErrorProps } from "@/interfaces/component";
import HistoryError from "@/modules/history-detail/error";

export default function Error(props: ErrorProps) {
  return (
    <Account tab={ACCOUNT_TAB.HISTORY} lang={LANG.EN}>
      <HistoryError {...props} />
    </Account>
  );
}
