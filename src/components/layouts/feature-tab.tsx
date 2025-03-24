"use client";

import { FEATURE } from "@/enums/global";
import type { ChildrenProps, LangProps } from "@/interfaces/component";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  FEATURE_TABS,
  type FeatureTab as IFeatureTab,
} from "@/constants/feature-tab";
import { motion } from "framer-motion";
import { memo, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/libs/utils";
import PointSectionLoader from "@/modules/shared/point-section-loader";
import importDynamic from "next/dynamic";
const PointSection = importDynamic(
  () => import("@/modules/shared/point-section"),
  {
    loading: () => <PointSectionLoader />,
    ssr: false,
  }
);

export interface FeatureTabProps extends ChildrenProps, LangProps {
  feature: FEATURE | "";
}

function FeatureTab({ children, lang, feature }: FeatureTabProps) {
  const [tab, setTab] = useState<IFeatureTab>(
    FEATURE_TABS.find((tab) => tab.url === feature) || FEATURE_TABS[0]
  );
  const router = useRouter();
  const onValueChangeHandler = useCallback(
    (url: string) => {
      setTab(FEATURE_TABS.find((tab) => tab.url === url) || FEATURE_TABS[0]);
      router.push(`/${lang}/feature/${url}`);
    },
    [router, lang]
  );

  return (
    <Tabs
      className="w-full"
      value={tab.url}
      onValueChange={onValueChangeHandler}
    >
      <div className="flex justify-center mb-8">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          {FEATURE_TABS.map(({ url, label, icon }) => (
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
          ))}
        </TabsList>
      </div>
      <motion.div
        key={feature}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <TabsContent value={feature} className="space-y-8">
          {feature && <PointSection lang={lang} />}
          {children}
        </TabsContent>
      </motion.div>
    </Tabs>
  );
}

export default memo(FeatureTab);
