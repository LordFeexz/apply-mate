"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Crown } from "lucide-react";
import { memo } from "react";
import dynamic from "next/dynamic";
import type { LangProps } from "@/interfaces/component";
import type { PAYG_PAYMENT } from "@/enums/global";
const PaymentModal = dynamic(() => import("./payment-modal"), { ssr: false });

export interface SubscribeBtnProps extends LangProps {
  feature: PAYG_PAYMENT;
}

function SubscribeBtn({ lang, feature }: SubscribeBtnProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 cursor-pointer rounded-lg hover:scale-99 hover:opacity-90 hover:shadow transition-all duration-300 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border-indigo-200 text-indigo-700 dark:from-indigo-950/40 dark:to-purple-950/40 dark:hover:from-indigo-950/60 dark:hover:to-purple-950/60 dark:border-indigo-800 dark:text-indigo-300 px-2 py-0"
        >
          <Crown className="h-4 w-4" />
          Get Unlimited
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{"Quick Payment"}</DialogTitle>
          <DialogDescription>
            Pay ${(0).toFixed(2)} for{" "}
            <span className="capitalize">{feature?.replaceAll("-", " ")}</span>
          </DialogDescription>
        </DialogHeader>
        <PaymentModal lang={lang} feature={feature} />
      </DialogContent>
    </Dialog>
  );
}

export default memo(SubscribeBtn);
