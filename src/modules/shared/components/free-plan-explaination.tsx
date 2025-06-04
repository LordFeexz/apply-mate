import type { LangProps } from "@/interfaces/component";
import { RefreshCw } from "lucide-react";
// import RefreshCountdown from "./refresh-countdown";
import { LANG } from "@/enums/global";
import { memo } from "react";
import SubscribeBtn from "./subscribe-btn";
import { PAYG_PAYMENT } from "@/enums/global";

export interface FreePlanExplainationProps extends LangProps {
  credit?: number;
}

function FreePlanExplaination({
  lang,
  // credit = 0
}: FreePlanExplainationProps) {
  return (
    <div className="space-y-2 p-2 container mr-12 sm:mr-0">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center flex-wrap sm:flex-nowrap space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row items-center justify-between flex-wrap sm:flex-nowrap gap-1 sm:gap-2">
          <RefreshCw className="h-4 w-4 text-green-600" />
          <span className="text-xs sm:text-sm">
            {lang === LANG.ID ? "Kredit Gratis" : "Free Credits"}
          </span>
          <span className="font-semibold">&infin;</span>
        </div>
        <SubscribeBtn lang={lang} feature={PAYG_PAYMENT.NONE} />
      </div>
      {/* <RefreshCountdown lang={lang} /> */}
      <p className="text-xs text-muted-foreground">
        {lang === LANG.ID
          ? "Gratis selama masa uji coba"
          : "Free for trial period"}
      </p>
    </div>
  );
}

export default memo(FreePlanExplaination);
