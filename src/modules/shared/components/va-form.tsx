"use client";

import SelectBank from "@/components/common/select-bank";
import type { LangProps } from "@/interfaces/component";
import { PAYG_PAYMENT } from "@/enums/global";
import { Building } from "lucide-react";
import { memo, useActionState } from "react";
import { paygAction, subscribedAction } from "../action";
import { getVaDictionary } from "../i18n";
import type { ISubscribeByBankSchema } from "../schema";
import SubmitBtn from "@/components/common/submit-btn";
import dynamic from "next/dynamic";
import VaInstruction from "./va-instruction";
const VaViewer = dynamic(() => import("./va-viewer"), { ssr: false });

export interface VaFormProps extends LangProps {
  feature: PAYG_PAYMENT;
}

function VaForm({ lang, feature }: VaFormProps) {
  const { title } = getVaDictionary(lang);
  const [state, formAction, pending] = useActionState(
    feature === PAYG_PAYMENT.NONE ? subscribedAction : paygAction,
    {
      errors: {},
      error: "",
      bank: "BNI",
      type: "va",
      feature,
      va: "",
    }
  );

  return (
    <form
      action={formAction}
      className="grid gap-4 py-4 max-w-sm h-125"
      id="va-form"
    >
      <input
        type="hidden"
        name="type"
        value="va"
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
      <div className="p-4 border rounded-lg bg-muted/30 max-h-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Building className="h-5 w-5 text-primary" />
            <h2 className="font-medium">{title}</h2>
          </div>
          <SelectBank
            triggerClassName="w-[110px]"
            name="provider"
            lang={lang}
            defaultValue={(state as ISubscribeByBankSchema)?.bank}
          />
        </div>

        <div className="space-y-4">
          {!!state.va && (
            <VaViewer className="max-w-sm" va={state.va} lang={lang} />
          )}

          <VaInstruction
            bank={(state as ISubscribeByBankSchema)?.bank}
            lang={lang}
          />
        </div>
      </div>
      <SubmitBtn className="mt-auto" disabled={pending || !!state.va}>
        Submit
      </SubmitBtn>
    </form>
  );
}

export default memo(VaForm);
