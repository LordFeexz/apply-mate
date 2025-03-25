"use client";

import { Button } from "@/components/ui/button";
import { memo } from "react";
import useCSRF from "@/hooks/use-csrf";
import { cn } from "@/libs/utils";
import type { LangProps } from "@/interfaces/component";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import type { TransactionAttributes } from "@/models/transaction";
import type { EWalletActionResp } from "midtrans-client";
import { getPayBtnDictionary } from "../i18n";
const VaInstruction = dynamic(
  () => import("@/modules/shared/components/va-instruction")
);
const EWalletInstruction = dynamic(
  () => import("@/modules/shared/components/ewallet-instruction")
);
const VaViewer = dynamic(
  () => import("@/modules/shared/components/va-viewer"),
  { ssr: false }
);
const PriorityImg = dynamic(() => import("@/components/common/priority-img"), {
  ssr: false,
});

export interface PayBtnProps extends LangProps {
  transaction: TransactionAttributes;
}

function PayBtn({ transaction, lang }: PayBtnProps) {
  const { title, btnText } = getPayBtnDictionary(lang);
  const csrf = useCSRF();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "hover:scale-98 transition-all duration-300 hover:shadow shadow-lg hover:opacity-90 cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-40",
            "min-w-20 text-sm",
            "bg-blue-500 hover:bg-blue-600"
          )}
        >
          {btnText}
        </Button>
      </DialogTrigger>
      <DialogContent className="min-h-[40svh]">
        <div className="space-y-8">
          <DialogHeader className="h-fit">
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {transaction.detail?.type === "e-wallet" ? (
            <div className="w-full space-y-2 flex justify-center items-center flex-col">
              <h3 className="flex items-center justify-center">
                {transaction.detail?.provider}
              </h3>
              <PriorityImg
                fill
                src={
                  (transaction.detail?.actions as EWalletActionResp[]).find(
                    (el) => el.name === "generate-qr-code"
                  )?.url ?? ""
                }
                alt="Payment QR Code"
                className="object-contain "
                wrapperClassName="w-48 h-48 relative flex items-center justify-center"
              />
            </div>
          ) : (
            <div className="w-full space-y-2">
              <h3 className="flex items-center justify-center">
                {transaction.detail?.provider}
              </h3>
              <VaViewer
                className="w-full"
                lang={lang}
                va={transaction.detail?.va_number[0]}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          {transaction.detail?.type === "e-wallet" ? (
            <EWalletInstruction
              className="w-full max-w-full flex justify-center items-center"
              lang={lang}
            />
          ) : (
            <VaInstruction bank={transaction.detail?.provider} lang={lang} />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default memo(PayBtn);
