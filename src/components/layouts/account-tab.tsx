"use client";

import { ACCOUNT_TAB, LANG } from "@/enums/global";
import type { ChildrenProps, LangProps } from "@/interfaces/component";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { memo, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ACCOUNT_TABS_EN,
  ACCOUNT_TABS_ID,
  type AccountTab,
} from "@/constants/feature-tab";
import { cn } from "@/libs/utils";
import { motion } from "framer-motion";

export interface AccountTabProps extends LangProps, ChildrenProps {
  tab: ACCOUNT_TAB;
}

function AccountTab({ tab, lang, children }: AccountTabProps) {
  const [activeTab, setActiveTab] = useState<AccountTab>(
    (lang === LANG.ID ? ACCOUNT_TABS_ID : ACCOUNT_TABS_EN).find(
      ({ url }) => url === tab
    ) || (lang === LANG.ID ? ACCOUNT_TABS_ID : ACCOUNT_TABS_EN)[0]
  );
  const router = useRouter();
  const onValueChangeHandler = useCallback(
    (url: string) => {
      setActiveTab(
        (lang === LANG.ID ? ACCOUNT_TABS_ID : ACCOUNT_TABS_EN).find(
          (tab) => tab.url === url
        ) || (lang === LANG.ID ? ACCOUNT_TABS_ID : ACCOUNT_TABS_EN)[0]
      );
      router.push(`/${lang}/account/${url}`);
    },
    [router, lang]
  );

  return (
    <Tabs
      className="w-full"
      value={activeTab.url}
      onValueChange={onValueChangeHandler}
    >
      <div className="flex justify-center mb-8">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          {(lang === LANG.ID ? ACCOUNT_TABS_ID : ACCOUNT_TABS_EN).map(
            ({ url, label, icon }) => (
              <TabsTrigger
                lang={lang}
                value={url}
                key={label}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 justify-center",
                  "cursor-pointer duration-300 transition-all hover:bg-muted opacity-100 hover:opacity-50",
                  "data-[state=inactive]:hover:shadow-lg data-[state=inactive]:hover:scale-98 data-[state=inactive]:hover:bg-muted",
                  "data-[state=active]:shadow-md"
                )}
                aria-label={label}
              >
                {icon}
                <span className="hidden sm:inline">{label}</span>
              </TabsTrigger>
            )
          )}
        </TabsList>
      </div>
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <TabsContent value={tab} className="space-y-8">
          {children}
        </TabsContent>
      </motion.div>
    </Tabs>
  );
}

export default memo(AccountTab);
