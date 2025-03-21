import type { LangProps } from "@/interfaces/component";
import { RefreshCw } from "lucide-react";
import RefreshCountdown from "./refresh-countdown";
import { LANG } from "@/enums/global";
import { memo } from "react";
import SubscribeBtn from "./subscribe-btn";
import { PAYG_PAYMENT } from "@/enums/global";

export interface FreePlanExplainationProps extends LangProps {
  credit?: number;
}

function FreePlanExplaination({ lang, credit = 0 }: FreePlanExplainationProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4 text-green-600" />
          <span className="text-sm">
            {lang === LANG.ID ? "Kredit Gratis" : "Free Credits"}
          </span>
          <span className="font-semibold">{credit}</span>
        </div>
        <SubscribeBtn lang={lang} feature={PAYG_PAYMENT.CV_SCORING} />
      </div>
      <RefreshCountdown lang={lang} />
    </div>
  );
}

export default memo(FreePlanExplaination);
