import type { LangProps } from "@/interfaces/component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LANG } from "@/enums/global";
import { memo } from "react";
import { getMissingKeywordCardDictionary } from "../i18n";

export interface MissingKeywordCardProps extends LangProps {
  missingKeywords: string[];
}

function MissingKeywordCard({
  missingKeywords,
  lang,
}: MissingKeywordCardProps) {
  const { title, desc } = getMissingKeywordCardDictionary(lang);
  return (
    <Card className="border-2 overflow-hidden hover:scale-102 shadow hover:shadow-lg transition-all duration-300">
      <CardHeader className="p-4 bg-secondary/50 border-b">
        <CardTitle as="h3" className="font-semibold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-2">
          {missingKeywords.length > 0 ? (
            missingKeywords.map((keyword, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-3 py-1 hover:scale-101 shadow hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                {keyword}
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">{desc}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(MissingKeywordCard);
