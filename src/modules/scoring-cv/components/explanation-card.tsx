import type { LangProps } from "@/interfaces/component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LANG } from "@/enums/global";
import { FileText } from "lucide-react";
import Markdown from "@/components/common/markdown";
import { memo } from "react";

export interface ExplanationCardProps extends LangProps {
  explanation: string;
}

function ExplanationCard({ lang, explanation }: ExplanationCardProps) {
  return (
    <Card className="border-2 overflow-hidden col-span-2 hover:scale-102 shadow hover:shadow-lg transition-all duration-300">
      <CardHeader className="p-4 bg-secondary/50 border-b">
        <CardTitle as="h3" className="font-semibold flex items-center gap-2">
          <FileText className="h-4 w-4" />
          {lang === LANG.ID ? "Penjelasan" : "Explanation"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Markdown content={explanation} />
      </CardContent>
    </Card>
  );
}

export default memo(ExplanationCard);
