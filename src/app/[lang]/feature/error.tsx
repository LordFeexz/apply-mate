"use client";

import type { ErrorProps } from "@/interfaces/component";
import FeatureError from "@/modules/feature/error";

export default function Error(props: ErrorProps) {
  return <FeatureError {...props} />;
}
