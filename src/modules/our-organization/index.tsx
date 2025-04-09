import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import type { LangProps } from "@/interfaces/component";
import { Building } from "lucide-react";
import { memo } from "react";
import { getOurOrganizationPageDictionary } from "./i18n";

export interface OurOrganizationPageProps extends LangProps {}

function OurOrganizationPage({ lang }: OurOrganizationPageProps) {
  const { title, subtitle, desc } = getOurOrganizationPageDictionary(lang);
  return (
    <section className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
        {title}
      </h2>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
            <Building className="h-6 w-6" />
            {subtitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm sm:text-base">
          <p className="mb-4">{desc}</p>
        </CardContent>
      </Card>
    </section>
  );
}

export default memo(OurOrganizationPage);
