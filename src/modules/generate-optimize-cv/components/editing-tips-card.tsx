import type { LangProps } from "@/interfaces/component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { memo } from "react";
import { LANG } from "@/enums/global";

export interface EditingTipsCardProps extends LangProps {
  tips: string[];
}

function EditingTipsCard({ lang, tips }: EditingTipsCardProps) {
  return (
    <Card className="border-2 overflow-hidden hover:scale-102 shadow hover:shadow-lg transition-all duration-300">
      <CardHeader className="p-4 bg-secondary/50 border-b">
        <CardTitle as="h3" className="font-semibold">
          {lang === LANG.ID ? "Tips Edit" : "Editing Tips"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ul className="space-y-2 text-sm">
          {!!tips.length &&
            tips.map((tip) => (
              <li key={tip} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default memo(EditingTipsCard);
