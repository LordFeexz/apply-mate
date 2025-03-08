import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { LangProps } from "@/interfaces/component";
import ScoreAlert from "./score-alert";
import Progress from "@/components/ui/progress";
import { memo } from "react";
import { getMatchScoreCardDictionary } from "../i18n";

export interface MatchScoreCardProps extends LangProps {
  score: number;
}

function MatchScoreCard({ score, lang }: MatchScoreCardProps) {
  const { title, desc } = getMatchScoreCardDictionary(lang);
  return (
    <Card className="border-2 overflow-hidden hover:scale-102 shadow hover:shadow-lg transition-all duration-300">
      <CardHeader className="p-4 bg-secondary/50 border-b flex justify-between items-center">
        <CardTitle as="h3" className="font-semibold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="antialiased">
            <div className="flex justify-between mb-2 text-sm">
              <span>{desc}</span>
              <span className="font-medium">{score}%</span>
            </div>
            <Progress className="h-2" value={score} />
          </div>

          <ScoreAlert score={score} lang={lang} />
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(MatchScoreCard);
