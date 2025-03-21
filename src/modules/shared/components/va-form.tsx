"use client";

import CopyBtn from "@/components/common/copy-btn";
import SelectBank from "@/components/common/select-bank";
import type { LangProps } from "@/interfaces/component";
import type { PAYG_PAYMENT } from "@/enums/global";
import { Building } from "lucide-react";
import { memo, useActionState } from "react";
import { subscribedAction } from "../action";
import { getVaDictionary } from "../i18n";
import type { ISubscribeByBankSchema } from "../schema";
import { currencyFormatterID } from "@/constants/formatter";
import { BANK_PAYMENT_METHOD } from "@/constants/payment";
import SubmitBtn from "@/components/common/submit-btn";

export interface VaFormProps extends LangProps {
  feature: PAYG_PAYMENT;
}

function VaForm({ lang, feature }: VaFormProps) {
  const { title, accountNo, instruction, instructions, note } =
    getVaDictionary(lang);
  const [state, formAction, pending] = useActionState(subscribedAction, {
    errors: {},
    error: "",
    bank: "BNI",
    type: "va",
    feature,
    va: "",
  });

  return (
    <form action={formAction} className="grid gap-4 py-4 max-w-sm" id="va-form">
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
          {state.va && (
            <div className="bg-muted/50 p-3 rounded-md max-w-sm">
              <div className="text-sm text-muted-foreground mb-1 flex justify-between items-center">
                {accountNo}
                <CopyBtn
                  type="button"
                  variant="ghost"
                  size="sm"
                  textToCopy={state.va}
                  className="h-8 px-2"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="font-mono text-lg font-medium">{state.va}</div>
              </div>
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            <p>{instruction}</p>
            <ol className="list-decimal pl-5 mt-1 space-y-1">
              {instructions.map((instruction) => (
                <li key={instruction}>{instruction}</li>
              ))}
            </ol>
            <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md text-amber-700 dark:text-amber-400">
              <p className="text-xs font-medium">
                {note}{" "}
                {currencyFormatterID.format(
                  BANK_PAYMENT_METHOD.find(
                    (el) => el.name === (state as ISubscribeByBankSchema)?.bank
                  )?.fee ?? 4000
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <SubmitBtn>Submit</SubmitBtn>
    </form>
  );
}

export default memo(VaForm);
