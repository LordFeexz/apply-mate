import type { LangProps } from "@/interfaces/component";
import { AlertCircle, CheckCircle } from "lucide-react";
import { memo } from "react";
import { getScoreAlertDictionary } from "../i18n";

export interface ScoreAlertProps extends LangProps {
  score: number;
}

function ScoreAlert({ score, lang }: ScoreAlertProps) {
  const { excellent, good, low } = getScoreAlertDictionary(lang);
  switch (true) {
    case score >= 80:
      return (
        <div className="flex items-center text-green-500 text-sm gap-2 p-3 bg-green-500/10 rounded-md">
          <CheckCircle className="h-4 w-4 flex-shrink-0" />
          <span>{excellent}</span>
        </div>
      );
    case score >= 60:
      return (
        <div className="flex items-center text-yellow-500 text-sm gap-2 p-3 bg-yellow-500/10 rounded-md">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{good}</span>
        </div>
      );
    default:
      return (
        <div className="flex items-center text-red-500 text-sm gap-2 p-3 bg-red-500/10 rounded-md">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{low}</span>
        </div>
      );
  }
}

export default memo(ScoreAlert);
