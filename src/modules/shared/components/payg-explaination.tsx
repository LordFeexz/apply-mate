import { LANG } from "@/enums/global";
import type { LangProps } from "@/interfaces/component";
import { CreditCard } from "lucide-react";
import { memo } from "react";

export interface PaygExplainationProps extends LangProps {}

function PaygExplaination({ lang }: PaygExplainationProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-blue-600" />
          <span className="text-sm">
            {lang === LANG.ID ? "Bayar sesuai penggunaan" : "Pay As You Go"}
          </span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        {lang === LANG.ID
          ? "Hanya bayar ketika Anda membutuhkan untuk menghasilkan konten"
          : "Pay only when you need to generate content"}
      </p>
    </div>
  );
}

export default memo(PaygExplaination);
