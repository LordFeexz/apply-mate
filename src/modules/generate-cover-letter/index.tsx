import type { LangProps } from "@/interfaces/component";
import { memo } from "react";
import GenerateCoverLetterForm from "./components/generate-cover-letter-form";

export interface GenerateCoverLetterProps extends LangProps {}

function GenerateCoverLetter({ lang }: GenerateCoverLetterProps) {
  return (
    <div id="generate-cover-letter" className="space-y-8">
      <GenerateCoverLetterForm lang={lang} />
    </div>
  );
}

export default memo(GenerateCoverLetter);
