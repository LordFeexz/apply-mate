"use client";

import { PAYG_PAYMENT } from "@/enums/global";
import type { LangProps } from "@/interfaces/component";
import { QrCode } from "lucide-react";
import { memo, useActionState } from "react";
import { paygAction, subscribedAction } from "../action";
import SubmitBtn from "@/components/common/submit-btn";
import dynamic from "next/dynamic";
import { getEwalletDictionary } from "../i18n";
import EwalletInstruction from "./ewallet-instruction";
const PriorityImg = dynamic(() => import("@/components/common/priority-img"), {
  ssr: false,
});

export interface EwalletFormProps extends LangProps {
  feature: PAYG_PAYMENT;
}

function EwalletForm({ feature, lang }: EwalletFormProps) {
  const { title } = getEwalletDictionary(lang);
  const [state, formAction, pending] = useActionState(
    feature === PAYG_PAYMENT.NONE ? subscribedAction : paygAction,
    {
      errors: {},
      error: "",
      bank: "BNI",
      type: "va",
      feature,
      qr: "",
    }
  );
  return (
    <form
      action={formAction}
      className="grid gap-4 py-4 max-w-sm h-125"
      id="ewallet-form"
    >
      <input
        type="hidden"
        name="type"
        value="e-wallet"
        readOnly
        aria-readonly
        className="sr-only"
      />
      <input
        type="hidden"
        name="feature"
        value={feature}
        readOnly
        aria-readonly
        className="sr-only"
      />
      <input
        type="hidden"
        name="lang"
        value={lang}
        readOnly
        aria-readonly
        className="sr-only"
      />
      <input
        type="hidden"
        name="provider"
        value="Gopay"
        readOnly
        aria-readonly
        className="sr-only"
      />
      <div className="p-4 border rounded-lg bg-muted/30 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-4 self-start">
          <QrCode className="h-5 w-5 text-primary" />
          <h2 className="font-medium">{title}</h2>
        </div>
        <div className="border flex items-center justify-center border-dashed border-gray-300 p-2 w-48 h-48 bg-white">
          {!!state.qr && (
            <PriorityImg
              fill
              src={state.qr}
              alt="Payment QR Code"
              className="object-contain"
              wrapperClassName="w-48 h-48 relative flex items-center justify-center"
            />
          )}
        </div>
        <EwalletInstruction lang={lang} />
      </div>
      <SubmitBtn className="mt-auto" disabled={pending || !!state.qr}>
        Generate
      </SubmitBtn>
    </form>
  );
}

export default memo(EwalletForm);
