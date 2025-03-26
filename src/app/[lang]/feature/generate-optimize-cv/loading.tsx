import FeatureLoader from "@/modules/feature/loader";
import FeatureLayout from "@/components/layouts/feature";
import { FEATURE, LANG } from "@/enums/global";

export default function Loading() {
  return (
    <FeatureLayout lang={LANG.EN} feature={FEATURE.GENERATE_OPTIMIZE_CV}>
      <FeatureLoader />
    </FeatureLayout>
  );
}
