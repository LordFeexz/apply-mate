import type { LangProps } from "@/interfaces/component";
import { memo } from "react";
import GenerateCvForm from "./components/generate-cv-form";
import SchemaMarkup from "./components/schema-markup";

export interface GenerateOptimizeCvPageProps extends LangProps {}

function GenerateOptimizeCvPage({ lang }: GenerateOptimizeCvPageProps) {
  return (
    <div className="space-y-8" id="generate-optimize-cv">
      <GenerateCvForm lang={lang} />
      <SchemaMarkup lang={lang} />
    </div>
  );
}

export default memo(GenerateOptimizeCvPage);
