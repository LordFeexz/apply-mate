"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import dynamic from "next/dynamic";
import { Coins } from "lucide-react";
import { memo, Suspense, useEffect } from "react";
const CurrentPlan = dynamic(() => import("./components/current-plan"));
import { PRICING_PLAN } from "@/enums/plan";
import type { LangProps } from "@/interfaces/component";
import PointSectionLoader from "./point-section-loader";
import { getCurrentProfile } from "./action";
import useSharedStore from "./store";
import { isValidPremium } from "@/libs/model-helper";
import { cn } from "@/libs/utils";
import { getPointSectionDictionary } from "./i18n";
import usePayment from "./hooks/use-payment";
import { useSession } from "next-auth/react";
const SigninSection = dynamic(() => import("./components/signin-section"), {
  ssr: false,
});

export interface PointSectionProps extends LangProps {
  className?: string;
}

function PointSection({ lang, className }: PointSectionProps) {
  const { title, desc } = getPointSectionDictionary(lang);
  const { setData, data } = useSharedStore();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (session && status === "authenticated" && !data)
      getCurrentProfile().then(setData);
  }, [data, setData, session, status]);

  usePayment();

  return (
    <Suspense fallback={<PointSectionLoader />}>
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
          {!!data ? (
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
          ) : (
            <SigninSection lang={lang} />
          )}
        </CardContent>
      </Card>
    </Suspense>
  );
}

export default memo(PointSection);
