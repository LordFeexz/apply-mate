"use client";

import type { ErrorProps } from "@/interfaces/component";
import Account from "@/components/layouts/account";
import { ACCOUNT_TAB, LANG } from "@/enums/global";
import HistoryError from "@/modules/history/error";

export default function Error(err: ErrorProps) {
  return (
    <Account tab={ACCOUNT_TAB.HISTORY} lang={LANG.EN}>
      <HistoryError {...err} />
    </Account>
  );
}
