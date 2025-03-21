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

export interface PointSectionProps extends LangProps {}

function PointSection({ lang }: PointSectionProps) {
  const { setData, data } = useSharedStore();

  useRunOnce(async () => {
    setData(await getCurrentProfile());
  });

  return (
    <Suspense fallback={<PointSectionLoader />}>
      <BackOnUnauthenticated />
      <Card className="container border-none mx-auto max-w-7xl px-4 mt-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Credit Options
          </CardTitle>
          <CardDescription>
            Choose the plan that works best for you
          </CardDescription>
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
