import { Badge } from "@/components/ui/badge";
import { PRICING_PLAN } from "@/enums/plan";
import type { LangProps } from "@/interfaces/component";
import { cn } from "@/libs/utils";
import { memo } from "react";
import dynamic from "next/dynamic";
const FreePlanExplaination = dynamic(() => import("./free-plan-explaination"), {
  ssr: false,
});
const SubscriptionPlanExplanation = dynamic(
  () => import("./subscription-plan-explanation"),
  { ssr: false }
);
const PaygExplaination = dynamic(() => import("./payg-explaination"), {
  ssr: false,
});

export interface CurrentPlanProps extends LangProps {
  plan: PRICING_PLAN;
}

function CurrentPlan({ lang, plan }: CurrentPlanProps) {
  return (
    <div className="bg-muted/30 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Current Plan</h3>
        <Badge
          className={cn(
            "capitalize",
            plan === PRICING_PLAN.SUBSCRIPTION && "bg-green-500"
          )}
          variant={
            plan === PRICING_PLAN.PAY_AS_YOU_GO
              ? "secondary"
              : plan === PRICING_PLAN.FREE
              ? "outline"
              : "default"
          }
        >
          {plan === PRICING_PLAN.SUBSCRIPTION ? "Subscribed" : plan}
        </Badge>
      </div>
      {plan === PRICING_PLAN.FREE && (
        <FreePlanExplaination lang={lang} credit={0} />
      )}

      {plan === PRICING_PLAN.SUBSCRIPTION && (
        <SubscriptionPlanExplanation lang={lang} daysLeft={1} />
      )}

      {plan === PRICING_PLAN.PAY_AS_YOU_GO && <PaygExplaination lang={lang} />}
    </div>
  );
}

export default memo(CurrentPlan);
