import FeatureLoader from "@/modules/feature/loader";
import FeatureLayout from "@/components/layouts/feature";
import { LANG } from "@/enums/global";

export default function Loading() {
  return (
    <FeatureLayout lang={LANG.EN} feature="">
      <FeatureLoader />
    </FeatureLayout>
  );
}
