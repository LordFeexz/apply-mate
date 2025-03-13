import type { LangProps } from "@/interfaces/component";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, LinkIcon } from "lucide-react";
import { memo } from "react";
import { getHyperlinkCardDictionary } from "../i18n";

export interface HyperlinkCardProps extends LangProps {
  recomendationLinks: string[];
}

function HyperlinkCard({ lang, recomendationLinks }: HyperlinkCardProps) {
  const { title, desc, subTitle, haveLink, note } =
    getHyperlinkCardDictionary(lang);
  return (
    <Card className="border-2 overflow-hidden shadow-lg hover:scale-102 hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-primary/10 border-b pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <LinkIcon className="h-4 w-4" />
          {title}
        </CardTitle>
        <CardDescription as="p" className="text-sm">
          {desc}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div className="bg-muted/50 p-3 rounded-md">
          <h4 className="text-sm font-medium mb-2">{subTitle}</h4>
          <ul className="space-y-1 text-sm">
            {!!recomendationLinks.length ? (
              recomendationLinks.map((link) => (
                <li key={link} className="flex items-center gap-2">
                  <ExternalLink className="h-3 w-3 text-primary" />
                  <span>{link}</span>
                </li>
              ))
            ) : (
              <p className="text-xs text-foreground">{haveLink}</p>
            )}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <p>{note}</p>
      </CardFooter>
    </Card>
  );
}

export default memo(HyperlinkCard);
