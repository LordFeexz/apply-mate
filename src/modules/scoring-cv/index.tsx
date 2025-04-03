import { memo } from "react";
import ScoringForm from "./components/scoring-form";
import type { LangProps } from "@/interfaces/component";
import SchemaMarkup from "./components/schema-markup";

export interface ScoringCvPageProps extends LangProps {}

function ScoringCvPage({ lang }: ScoringCvPageProps) {
  return (
    <div className="space-y-8" id="scoring">
      <ScoringForm lang={lang} />
      <SchemaMarkup lang={lang} />
    </div>
  );
}

export default memo(ScoringCvPage);
