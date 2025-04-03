"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Coins } from "lucide-react";
import { memo, Suspense } from "react";
import CurrentPlan from "./components/current-plan";
import { PRICING_PLAN } from "@/enums/plan";
import type { LangProps } from "@/interfaces/component";
import PointSectionLoader from "./point-section-loader";
import BackOnUnauthenticated from "@/components/lifecycle/back-on-unauthenticated";
import useRunOnce from "@/hooks/use-run-once";
import { getCurrentProfile } from "./action";
import useSharedStore from "./store";
import { isValidPremium } from "@/libs/model-helper";
import { cn } from "@/libs/utils";
import { getPointSectionDictionary } from "./i18n";
import usePayment from "./hooks/use-payment";

export interface PointSectionProps extends LangProps {
  className?: string;
}

function PointSection({ lang, className }: PointSectionProps) {
  const { title, desc } = getPointSectionDictionary(lang);
  const { setData, data } = useSharedStore();

  useRunOnce(async () => {
    if (!data) setData(await getCurrentProfile());
  });

  usePayment();

  return (
    <Suspense fallback={<PointSectionLoader />}>
      <BackOnUnauthenticated />
      <Card
        className={cn(
          "container border-none mx-auto max-w-7xl px-4 mt-8",
          className
        )}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Coins className="h-5 w-5" />
            {title}
          </CardTitle>
          <CardDescription>{desc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CurrentPlan
            plan={
              !!data?.premium_start_date &&
              !!data.premium_end_date &&
              isValidPremium(
                new Date(data.premium_start_date),
                new Date(data.premium_end_date)
              )
                ? PRICING_PLAN.SUBSCRIPTION
                : PRICING_PLAN.FREE
            }
            lang={lang}
            point={data?.points}
            endDate={data?.premium_end_date}
          />
        </CardContent>
      </Card>
    </Suspense>
  );
}

export default memo(PointSection);
