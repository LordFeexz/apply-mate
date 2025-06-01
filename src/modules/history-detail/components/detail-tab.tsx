"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { LangProps } from "@/interfaces/component";
import { memo, useState, type ReactNode } from "react";
import { DEFAULT_TAB, TAB_MENU_EN, TAB_MENU_ID } from "../constant";
import { LANG } from "@/enums/global";

export interface DetailTabProps extends LangProps {
  resultTab: ReactNode;
  inputTab: ReactNode;
}

function DetailTab({ lang, resultTab, inputTab }: DetailTabProps) {
  const [tab, setTab] = useState<"result" | "input">(DEFAULT_TAB);
  const onTabChange = (tab: string) => {
    if (["result", "input"].includes(tab)) setTab(tab as any);
  };

  return (
    <Tabs value={tab} onValueChange={onTabChange}>
      <TabsList className="mb-6">
        {(lang === LANG.ID ? TAB_MENU_ID : TAB_MENU_EN).map(
          ({ value, label }) => (
            <TabsTrigger
              className="capitalize cursor-pointer"
              key={value}
              value={value}
            >
              {label}
            </TabsTrigger>
          )
        )}
      </TabsList>
      <TabsContent value="result" className="space-y-6">
        {resultTab}
      </TabsContent>
      <TabsContent value="input" className="space-y-6">
        {inputTab}
      </TabsContent>
    </Tabs>
  );
}

export default memo(DetailTab);
