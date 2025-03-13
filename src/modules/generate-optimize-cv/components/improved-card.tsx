import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LangProps } from "@/interfaces/component";
import { Check } from "lucide-react";
import { memo } from "react";
import { getImprovedCardDictionary } from "../i18n";

export interface ImprovedCardProps extends LangProps {
  improvements: string[];
}

function ImprovedCard({ lang, improvements = [] }: ImprovedCardProps) {
  const { title, subTitle } = getImprovedCardDictionary(lang);
  return (
    <Card className="border-2 mt-8 overflow-hidden shadow-lg hover:scale-102 hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-primary/10 border-b pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-2">{subTitle}</h3>
          <ul className="list-none space-y-2">
            {improvements.map((improvement) => (
              <li key={improvement} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(ImprovedCard);
