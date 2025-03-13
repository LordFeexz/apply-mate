import LabelledInput from "@/components/common/labelled-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LangProps } from "@/interfaces/component";
import { Building, BriefcaseBusiness } from "lucide-react";
import { memo } from "react";
import { getCompanyDetailFormDictionary } from "../i18n";

export interface CompanyDetailFormProps extends LangProps {}

function CompanyDetailForm({ lang }: CompanyDetailFormProps) {
  const { company, role, detail } = getCompanyDetailFormDictionary(lang);
  return (
    <Card className="overflow-hidden space-y-2 border-2 card-hover hover:scale-102 shadow hover:shadow-lg transition-all duration-300">
      <CardHeader className="px-6">
        <CardTitle as="h3" className="text-lg font-semibold">
          {detail}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <LabelledInput
          wrapperClassName="space-y-2"
          id="company-name"
          label={
            <>
              {" "}
              <Building size={14} />
              {company}
            </>
          }
          labelClassName="flex items-center gap-2"
          name="company"
          placeholder="e.g., Acme Corporation"
          required
        />

        <LabelledInput
          id="role-name"
          label={
            <>
              <BriefcaseBusiness size={14} />
              {role}
            </>
          }
          wrapperClassName="space-y-2"
          labelClassName="flex items-center gap-2"
          name="role"
          placeholder="e.g., Software Engineer"
          required
        />
      </CardContent>
    </Card>
  );
}

export default memo(CompanyDetailForm);
