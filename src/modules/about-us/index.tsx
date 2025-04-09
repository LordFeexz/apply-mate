import { Card } from "@/components/ui/card";
import type { LangProps } from "@/interfaces/component";
import { CheckCircle } from "lucide-react";
import { memo } from "react";
import { getAboutUsPageDictionary } from "./i18n";

export interface AboutUsPageProps extends LangProps {}

function AboutUsPage({ lang }: AboutUsPageProps) {
  const { title, desc, features } = getAboutUsPageDictionary(lang);
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {desc}
        </p>
      </div>

      <Card className="p-6 mb-8 shadow-sm">
        <h3 className="text-xl font-semibold mb-4">What We Offer</h3>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export default memo(AboutUsPage);
