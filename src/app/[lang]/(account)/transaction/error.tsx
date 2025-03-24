"use client";

import type { ErrorProps } from "@/interfaces/component";
import TransactionError from "@/modules/transaction/error";

export default function Error(props: ErrorProps) {
  return <TransactionError {...props} />;
}
