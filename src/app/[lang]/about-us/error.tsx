"use client";

import type { ErrorProps } from "@/interfaces/component";
import AboutError from "@/modules/about-us/error";

export default function Error(props: ErrorProps) {
  return <AboutError {...props} />;
}
