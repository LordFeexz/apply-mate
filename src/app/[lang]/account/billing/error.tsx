"use client";

import Account from "@/components/layouts/account";
import { ACCOUNT_TAB, LANG } from "@/enums/global";
import type { ErrorProps } from "@/interfaces/component";
import BillingError from "@/modules/billing/error";

export default function Error(props: ErrorProps) {
  return (
    <Account lang={LANG.EN} tab={ACCOUNT_TAB.BILLING}>
      <BillingError {...props} />
    </Account>
  );
}
