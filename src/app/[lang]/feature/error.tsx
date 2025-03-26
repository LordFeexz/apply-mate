"use client";

import type { ErrorProps } from "@/interfaces/component";
import FeatureError from "@/modules/feature/error";
import FeatureLayout from "@/components/layouts/feature";
import { LANG } from "@/enums/global";

export default function Error(props: ErrorProps) {
  return (
    <FeatureLayout lang={LANG.EN} feature="">
      <FeatureError {...props} />
    </FeatureLayout>
  );
}
