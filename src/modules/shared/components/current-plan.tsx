import { Badge } from "@/components/ui/badge";
import { PRICING_PLAN } from "@/enums/plan";
import type { LangProps } from "@/interfaces/component";
import { cn } from "@/libs/utils";
import { memo } from "react";
import dynamic from "next/dynamic";
import { Crown } from "lucide-react";
import { getCurrentPlanDictionary } from "../i18n";
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
  point?: number;
  endDate?: Date | null;
}

function CurrentPlan({ lang, plan, point = 0, endDate }: CurrentPlanProps) {
  const { subsBadge, title } = getCurrentPlanDictionary(lang);
  return (
    <div className="bg-muted/30 p-0.5 sm:p-4 rounded-lg">
      <hgroup className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{title}</h3>
        <Badge
          className={cn(
            "capitalize",
            plan === PRICING_PLAN.SUBSCRIPTION &&
              "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-2 py-0"
          )}
          variant={
            plan === PRICING_PLAN.PAY_AS_YOU_GO
              ? "secondary"
              : plan === PRICING_PLAN.FREE
                ? "outline"
                : "default"
          }
        >
          {plan === PRICING_PLAN.SUBSCRIPTION ? (
            <>
              <Crown className="w-3 h-3" />
              {subsBadge}
            </>
          ) : (
            plan
          )}
        </Badge>
      </hgroup>
      {plan === PRICING_PLAN.FREE && (
        <FreePlanExplaination lang={lang} credit={point} />
      )}

      {plan === PRICING_PLAN.SUBSCRIPTION && (
        <SubscriptionPlanExplanation
          lang={lang}
          daysLeft={
            endDate
              ? Math.ceil(
                  (new Date(endDate).getTime() - Date.now()) /
                    (1000 * 60 * 60 * 24)
                )
              : 0
          }
        />
      )}

      {plan === PRICING_PLAN.PAY_AS_YOU_GO && <PaygExplaination lang={lang} />}
    </div>
  );
}

export default memo(CurrentPlan);
