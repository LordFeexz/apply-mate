"use client";

import DefaultLoader from "@/components/common/default-loader";
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

export interface PointSectionProps extends LangProps {}

function PointSection({ lang }: PointSectionProps) {
  return (
    <Suspense fallback={<DefaultLoader />}>
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
          <div className="bg-muted/30 p-4 rounded-lg">
            <CurrentPlan plan={PRICING_PLAN.FREE} lang={lang} />
          </div>
        </CardContent>
      </Card>
    </Suspense>
  );
}

export default memo(PointSection);
