import ScoringCv from "@/modules/scoring-cv";
import FeatureLayout from "@/components/layouts/feature";
import { FEATURE } from "@/enums/global";
import type { PageProps } from "@/interfaces/global";

export default async function Page({ params }: PageProps) {
  const { lang } = await params;

  return (
    <FeatureLayout lang={lang} feature={FEATURE.SCORING_CV}>
      <ScoringCv lang={lang} />
    </FeatureLayout>
  );
}
