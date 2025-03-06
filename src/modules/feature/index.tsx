import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FEATURE_EXPLANATION_EN,
  FEATURE_EXPLANATION_ID,
} from "@/constants/feature-tab";
import { LANG } from "@/enums/global";
import type { LangProps } from "@/interfaces/component";
import { memo } from "react";

export interface FeaturePageProps extends LangProps {}

function FeaturePage({ lang }: FeaturePageProps) {
  return (
    <div
      id="feature-explanation"
      className="grid gap-6 md:grid-cols-2 group/feature-card"
    >
      {(lang === LANG.ID ? FEATURE_EXPLANATION_ID : FEATURE_EXPLANATION_EN).map(
        ({ icon, title, description }) => (
          <Card
            key={title}
            className="overflow-hidden border-2 group-hover/feature-card:[&:not(:hover)]:opacity-50 transition-all shadow duration-300 hover:shadow-lg hover:scale-102 hover:cursor-pointer"
          >
            <CardHeader className="border-b-2 pb-2">
              <CardTitle className="flex items-center gap-2 text-xl">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p>{description}</p>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}

export default memo(FeaturePage);
