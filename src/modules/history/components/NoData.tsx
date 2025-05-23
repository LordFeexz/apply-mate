"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { memo } from "react";
import useHistoryParams from "../store";
import type { LangProps } from "@/interfaces/component";
import { getNoDataDictionary } from "../i18n";

export interface NoDataProps extends LangProps {}

function NoData({ lang }: NoDataProps) {
  const { q } = useHistoryParams();
  const { title, btnText, noData, searchedNoData } = getNoDataDictionary(lang);

  return (
    <Card as="article" className="p-8 text-center mb-8">
      <div className="flex flex-col items-center justify-center">
        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">
          {!!q ? searchedNoData : noData}
        </p>
      </div>
      <Button>{btnText}</Button>
    </Card>
  );
}

export default memo(NoData);
