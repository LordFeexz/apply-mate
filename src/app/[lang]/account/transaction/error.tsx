"use client";

import type { ErrorProps } from "@/interfaces/component";
import TransactionError from "@/modules/transaction/error";
import Account from "@/components/layouts/account";
import { ACCOUNT_TAB, LANG } from "@/enums/global";

export default function Error(props: ErrorProps) {
  return (
    <Account lang={LANG.EN} tab={ACCOUNT_TAB.TRANSACTION}>
      <TransactionError {...props} />
    </Account>
  );
}
