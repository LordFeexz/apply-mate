"use client";

import type { ErrorProps } from "@/interfaces/component";
import FeatureError from "@/modules/feature/error";
import FeatureLayout from "@/components/layouts/feature";
import { FEATURE, LANG } from "@/enums/global";

export default function Error(props: ErrorProps) {
  return (
    <FeatureLayout lang={LANG.EN} feature={FEATURE.SCORING_CV}>
      <FeatureError {...props} />
    </FeatureLayout>
  );
}
