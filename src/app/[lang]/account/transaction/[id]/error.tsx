"use client";

import TransactionDetailError from "@/modules/transaction-detail/error";
import type { ErrorProps } from "@/interfaces/component";
import Account from "@/components/layouts/account";
import { ACCOUNT_TAB, LANG } from "@/enums/global";

export default function ErrorPage(props: ErrorProps) {
  return (
    <Account lang={LANG.EN} tab={ACCOUNT_TAB.TRANSACTION}>
      <TransactionDetailError {...props} />
    </Account>
  );
}
