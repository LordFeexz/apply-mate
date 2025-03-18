import { LANG } from "@/enums/global";
import type { LangProps } from "@/interfaces/component";
import { Zap } from "lucide-react";
import { memo } from "react";

export interface SubscriptionPlanExplanationProps extends LangProps {
  daysLeft: number;
}

function SubscriptionPlanExplanation({
  lang,
  daysLeft = 1,
}: SubscriptionPlanExplanationProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-green-600" />
          <span className="text-sm">
            {lang === LANG.ID ? "Pakai tanpa batas" : "Unlimited Generations"}
          </span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        {lang === LANG.ID
          ? `Langganan anda akan berakhir dalam ${daysLeft} hari`
          : `Your subscription will expire in ${daysLeft} days`}
      </p>
    </div>
  );
}

export default memo(SubscriptionPlanExplanation);
