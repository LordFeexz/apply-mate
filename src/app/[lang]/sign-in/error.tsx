"use client";

import type { ErrorProps } from "@/interfaces/component";
import SignInError from "@/modules/signin/error";

export default function Error(props: ErrorProps) {
  return <SignInError {...props} />;
}
