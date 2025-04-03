import type { LangProps } from "@/interfaces/component";
import { memo } from "react";
import GenerateCoverLetterForm from "./components/generate-cover-letter-form";
import SchemaMarkup from "./components/schema-markup";

export interface GenerateCoverLetterProps extends LangProps {}

function GenerateCoverLetter({ lang }: GenerateCoverLetterProps) {
  return (
    <div id="generate-cover-letter" className="space-y-8">
      <GenerateCoverLetterForm lang={lang} />
      <SchemaMarkup lang={lang} />
    </div>
  );
}

export default memo(GenerateCoverLetter);
