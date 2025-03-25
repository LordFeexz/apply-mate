"use client";

import TransactionDetailError from "@/modules/transaction-detail/error";
import type { ErrorProps } from "@/interfaces/component";

export default function ErrorPage(props: ErrorProps) {
  return <TransactionDetailError {...props} />;
}
