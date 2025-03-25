import { currencyFormatterID } from "@/constants/formatter";
import { BANK_PAYMENT_METHOD } from "@/constants/payment";
import type { LangProps } from "@/interfaces/component";
import { getVaInstructionDictionary } from "../i18n";
import { memo } from "react";

export interface VaInstructionProps extends LangProps {
  bank: string;
}

function VaInstruction({ lang, bank }: VaInstructionProps) {
  const { instruction, instructions, note } = getVaInstructionDictionary(lang);
  return (
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
            BANK_PAYMENT_METHOD.find((el) => el.name === bank)?.fee ?? 4000
          )}
        </p>
      </div>
    </div>
  );
}

export default memo(VaInstruction);
