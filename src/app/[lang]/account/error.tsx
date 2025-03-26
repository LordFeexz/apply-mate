"use client";

import Account from "@/components/layouts/account";
import { ACCOUNT_TAB, LANG } from "@/enums/global";
import type { ErrorProps } from "@/interfaces/component";
import AccountError from "@/modules/account/error";

export default function Error(props: ErrorProps) {
  return (
    <Account lang={LANG.EN} tab={ACCOUNT_TAB.ACCOUNT}>
      <AccountError {...props} />
    </Account>
  );
}
