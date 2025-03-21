"use client";

import { memo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, QrCode } from "lucide-react";
import dynamic from "next/dynamic";
const VaForm = dynamic(() => import("./va-form"), { ssr: false });
const EWalletForm = dynamic(() => import("./ewallet-form"), { ssr: false });
import type { LangProps } from "@/interfaces/component";
import type { PAYG_PAYMENT } from "@/enums/global";

export interface PaymentModalProps extends LangProps {
  feature: PAYG_PAYMENT;
}

function PaymentModal({ feature, lang }: PaymentModalProps) {
  return (
    <Tabs defaultValue="va" className="w-full">
      <TabsList className="grid grid-cols-2 mb-4 w-full">
        <TabsTrigger value="va" className="flex items-center gap-1">
          <CreditCard className="h-4 w-4" />
          <span className="hidden sm:inline">VA</span>
        </TabsTrigger>
        <TabsTrigger value="e-wallet" className="flex items-center gap-1">
          <QrCode className="h-4 w-4" />
          <span className="hidden sm:inline">E-Wallet</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="va" className="mt-0 w-full">
        <VaForm lang={lang} feature={feature} />
      </TabsContent>
      <TabsContent value="e-wallet" className="mt-0 w-full">
        <EWalletForm lang={lang} feature={feature} />
      </TabsContent>
    </Tabs>
  );
}

export default memo(PaymentModal);
