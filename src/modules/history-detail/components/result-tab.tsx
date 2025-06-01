import { Card, CardContent } from "@/components/ui/card";
import { FEATURE } from "@/enums/global";
import type { LangProps } from "@/interfaces/component";
import dynamic from "next/dynamic";
import { memo } from "react";
const ScoreResponse = dynamic(
  () => import("@/modules/scoring-cv/components/score-response")
);
const ResponseMd = dynamic(
  () => import("@/modules/generate-cover-letter/components/response-md")
);
const GeneratedCvResponseWrapper = dynamic(
  () => import("./generated-cv-result-wrapper")
);

export interface ResultTabProps extends LangProps {
  feature: FEATURE;
  data: object;
}

function RenderResult({
  feature,
  data,
  lang,
}: Omit<ResultTabProps, "data"> & { data: any }) {
  switch (feature) {
    case FEATURE.GENERATE_COVER_LETTER:
      return (
        <ResponseMd response={data.generated} loading={false} lang={lang} />
      );
    case FEATURE.GENERATE_OPTIMIZE_CV:
      return <GeneratedCvResponseWrapper lang={lang} {...data} />;
    case FEATURE.SCORING_CV:
      return (
        <ScoreResponse
          lang={lang}
          {...data}
          keywordMatches={data.matchingKeywords}
        />
      );
    default:
      return null;
  }
}

function ResultTab({ feature, data, lang }: ResultTabProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <RenderResult feature={feature} data={data} lang={lang} />
      </CardContent>
    </Card>
  );
}

export default memo(ResultTab);
